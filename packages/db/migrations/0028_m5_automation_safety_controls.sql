-- Migration 0028: durable M5 automation safety controls and takeover cancellation support

CREATE TABLE IF NOT EXISTS wabrix.automation_safety_controls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES wabrix.organizations(id) ON DELETE CASCADE,
  scope text NOT NULL CHECK (scope IN ('global', 'tenant', 'bot', 'channel', 'conversation')),
  scope_id uuid,
  disabled boolean NOT NULL DEFAULT true,
  reason text NOT NULL CHECK (length(trim(reason)) BETWEEN 1 AND 500),
  actor_user_id uuid REFERENCES wabrix.users(id) ON DELETE SET NULL,
  expires_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  updated_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  CHECK (
    (scope = 'global' AND organization_id IS NULL AND scope_id IS NULL)
    OR (scope = 'tenant' AND organization_id IS NOT NULL AND scope_id IS NULL)
    OR (scope IN ('bot', 'channel', 'conversation') AND organization_id IS NOT NULL AND scope_id IS NOT NULL)
  )
);

CREATE UNIQUE INDEX IF NOT EXISTS automation_safety_global_unique
  ON wabrix.automation_safety_controls ((scope)) WHERE scope = 'global';
CREATE UNIQUE INDEX IF NOT EXISTS automation_safety_tenant_unique
  ON wabrix.automation_safety_controls (organization_id, scope) WHERE scope = 'tenant';
CREATE UNIQUE INDEX IF NOT EXISTS automation_safety_scoped_unique
  ON wabrix.automation_safety_controls (organization_id, scope, scope_id)
  WHERE scope IN ('bot', 'channel', 'conversation');
CREATE INDEX IF NOT EXISTS automation_safety_active_lookup
  ON wabrix.automation_safety_controls (organization_id, scope, scope_id, disabled, expires_at);

ALTER TABLE wabrix.automation_safety_controls ENABLE ROW LEVEL SECURITY;
ALTER TABLE wabrix.automation_safety_controls FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS tenant_isolation_automation_safety_controls ON wabrix.automation_safety_controls;
CREATE POLICY tenant_isolation_automation_safety_controls
  ON wabrix.automation_safety_controls
  FOR ALL
  TO PUBLIC
  USING (
    scope <> 'global'
    AND organization_id = wabrix.current_organization_id()
  )
  WITH CHECK (
    scope <> 'global'
    AND organization_id = wabrix.current_organization_id()
  );

ALTER TABLE wabrix.automation_safety_controls OWNER TO wabrix_migrator;
GRANT SELECT, INSERT, UPDATE, DELETE ON wabrix.automation_safety_controls TO wabrix_runtime;
GRANT SELECT ON wabrix.automation_safety_controls TO wabrix_reporting;

-- Resolve active safety state through a narrow SECURITY DEFINER boundary so a runtime tenant can
-- observe the global stop without receiving direct RLS access to the global row.
CREATE OR REPLACE FUNCTION wabrix.resolve_automation_safety(
  input_organization_id uuid,
  input_bot_config_id uuid DEFAULT NULL,
  input_channel_id uuid DEFAULT NULL,
  input_conversation_id uuid DEFAULT NULL
)
RETURNS TABLE (
  control_id uuid,
  scope text,
  reason text,
  expires_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = wabrix, pg_temp
AS $$
  SELECT control.id, control.scope, control.reason, control.expires_at
  FROM wabrix.automation_safety_controls AS control
  WHERE control.disabled = true
    AND (control.expires_at IS NULL OR control.expires_at > now())
    AND (
      control.scope = 'global'
      OR (control.scope = 'tenant' AND control.organization_id = input_organization_id)
      OR (
        control.scope = 'bot'
        AND control.organization_id = input_organization_id
        AND control.scope_id = input_bot_config_id
      )
      OR (
        control.scope = 'channel'
        AND control.organization_id = input_organization_id
        AND control.scope_id = input_channel_id
      )
      OR (
        control.scope = 'conversation'
        AND control.organization_id = input_organization_id
        AND control.scope_id = input_conversation_id
      )
    )
  ORDER BY CASE control.scope
    WHEN 'global' THEN 1
    WHEN 'tenant' THEN 2
    WHEN 'bot' THEN 3
    WHEN 'channel' THEN 4
    WHEN 'conversation' THEN 5
    ELSE 99 END
  LIMIT 1;
$$;

ALTER FUNCTION wabrix.resolve_automation_safety(uuid, uuid, uuid, uuid) OWNER TO wabrix_migrator;
REVOKE ALL ON FUNCTION wabrix.resolve_automation_safety(uuid, uuid, uuid, uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION wabrix.resolve_automation_safety(uuid, uuid, uuid, uuid)
  TO wabrix_runtime, wabrix_system, wabrix_reporting;

-- Cancel pending AUTO work inside the same transaction that records a human takeover signal.
CREATE OR REPLACE FUNCTION wabrix.cancel_pending_auto_for_conversation(
  input_organization_id uuid,
  input_conversation_id uuid,
  input_reason text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = wabrix, pg_temp
AS $$
BEGIN
  UPDATE wabrix.bot_runs
  SET status = 'cancelled',
      error_code = 'AUTO_TAKEOVER_CANCELLED',
      error_detail = input_reason,
      metadata = metadata || jsonb_build_object(
        'cancelReason', input_reason,
        'cancelledAt', clock_timestamp()
      ),
      updated_at = clock_timestamp()
  WHERE organization_id = input_organization_id
    AND conversation_id = input_conversation_id
    AND mode = 'auto'
    AND status IN ('queued', 'processing', 'completed')
    AND operator_action IS NULL;

  UPDATE wabrix.outbound_intents AS intent
  SET state = 'failed', last_error = input_reason, updated_at = clock_timestamp()
  FROM wabrix.messages AS message
  WHERE intent.organization_id = input_organization_id
    AND message.organization_id = intent.organization_id
    AND message.id = intent.message_id
    AND message.conversation_id = input_conversation_id
    AND message.sender_type = 'bot'
    AND message.metadata ? 'aiBotRunId'
    AND intent.state = 'queued';

  UPDATE wabrix.messages AS message
  SET status = 'failed', error_detail = input_reason, updated_at = clock_timestamp()
  WHERE message.organization_id = input_organization_id
    AND message.conversation_id = input_conversation_id
    AND message.sender_type = 'bot'
    AND message.metadata ? 'aiBotRunId'
    AND message.status = 'queued';
END;
$$;

ALTER FUNCTION wabrix.cancel_pending_auto_for_conversation(uuid, uuid, text) OWNER TO wabrix_migrator;
REVOKE ALL ON FUNCTION wabrix.cancel_pending_auto_for_conversation(uuid, uuid, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION wabrix.cancel_pending_auto_for_conversation(uuid, uuid, text)
  TO wabrix_runtime, wabrix_system;

CREATE OR REPLACE FUNCTION wabrix.invalidate_auto_on_conversation_takeover()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = wabrix, pg_temp
AS $$
DECLARE
  takeover_reason text;
BEGIN
  IF NEW.bot_paused = true AND OLD.bot_paused IS DISTINCT FROM NEW.bot_paused THEN
    takeover_reason := 'Conversation automation was paused by an operator.';
  ELSIF NEW.assigned_to_user_id IS NOT NULL
    AND OLD.assigned_to_user_id IS DISTINCT FROM NEW.assigned_to_user_id THEN
    takeover_reason := 'Conversation was claimed or handed off to a human operator.';
  ELSIF NEW.status IN ('resolved', 'closed') AND OLD.status IS DISTINCT FROM NEW.status THEN
    takeover_reason := 'Conversation state no longer permits pending automation.';
  ELSE
    RETURN NEW;
  END IF;

  PERFORM wabrix.cancel_pending_auto_for_conversation(
    NEW.organization_id,
    NEW.id,
    takeover_reason
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS conversations_invalidate_pending_auto ON wabrix.conversations;
CREATE TRIGGER conversations_invalidate_pending_auto
AFTER UPDATE OF bot_paused, assigned_to_user_id, status ON wabrix.conversations
FOR EACH ROW
EXECUTE FUNCTION wabrix.invalidate_auto_on_conversation_takeover();

CREATE OR REPLACE FUNCTION wabrix.invalidate_auto_on_manual_agent_message()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = wabrix, pg_temp
AS $$
BEGIN
  IF NEW.direction = 'outbound'
    AND NEW.sender_type = 'agent'
    AND NOT (NEW.metadata ? 'aiBotRunId') THEN
    PERFORM wabrix.cancel_pending_auto_for_conversation(
      NEW.organization_id,
      NEW.conversation_id,
      'Manual agent message superseded pending automation.'
    );
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS messages_invalidate_pending_auto ON wabrix.messages;
CREATE TRIGGER messages_invalidate_pending_auto
AFTER INSERT ON wabrix.messages
FOR EACH ROW
EXECUTE FUNCTION wabrix.invalidate_auto_on_manual_agent_message();

CREATE OR REPLACE FUNCTION wabrix.invalidate_auto_on_emergency_disable()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = wabrix, pg_temp
AS $$
DECLARE
  conversation_record record;
BEGIN
  IF NEW.emergency_disabled = true
    AND OLD.emergency_disabled IS DISTINCT FROM NEW.emergency_disabled THEN
    FOR conversation_record IN
      SELECT id
      FROM wabrix.conversations
      WHERE organization_id = NEW.organization_id
    LOOP
      PERFORM wabrix.cancel_pending_auto_for_conversation(
        NEW.organization_id,
        conversation_record.id,
        'Tenant emergency stop disabled automation.'
      );
    END LOOP;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS bot_configs_invalidate_pending_auto ON wabrix.bot_configs;
CREATE TRIGGER bot_configs_invalidate_pending_auto
AFTER UPDATE OF emergency_disabled ON wabrix.bot_configs
FOR EACH ROW
EXECUTE FUNCTION wabrix.invalidate_auto_on_emergency_disable();
