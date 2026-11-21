-- Migration 0033: resolve automation safety global kill switch via wabrix_system capability
-- Fixes M5 #177: global killswitch rows were invisible to resolve_automation_safety
-- because wabrix.automation_safety_controls has FORCE RLS with a policy excluding
-- global rows, while the function was owned by wabrix_migrator (NOBYPASSRLS).
-- By granting SELECT to wabrix_system (BYPASSRLS) and transferring function ownership,
-- the narrow security-definer boundary can safely inspect global stops without exposing
-- global rows directly to wabrix_runtime.

GRANT USAGE ON SCHEMA wabrix TO wabrix_system;
GRANT SELECT ON wabrix.automation_safety_controls TO wabrix_system;

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

ALTER FUNCTION wabrix.resolve_automation_safety(uuid, uuid, uuid, uuid) OWNER TO wabrix_system;
REVOKE ALL ON FUNCTION wabrix.resolve_automation_safety(uuid, uuid, uuid, uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION wabrix.resolve_automation_safety(uuid, uuid, uuid, uuid)
  TO wabrix_runtime, wabrix_system, wabrix_reporting;
