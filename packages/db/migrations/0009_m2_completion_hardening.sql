-- M2 completion hardening: durable domain history, contacts, outbound intents,
-- tenant policies, and provider-message idempotency.

CREATE TABLE wabrix.contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES wabrix.organizations(id) ON DELETE RESTRICT,
  channel_id uuid NOT NULL REFERENCES wabrix.channels(id) ON DELETE RESTRICT,
  phone_number text NOT NULL CHECK (length(phone_number) BETWEEN 5 AND 30),
  display_name text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(metadata) = 'object'),
  created_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  updated_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  UNIQUE (organization_id, channel_id, phone_number)
);

CREATE INDEX contacts_org_phone_idx ON wabrix.contacts (organization_id, phone_number);

ALTER TABLE wabrix.conversations ADD COLUMN contact_id uuid;

INSERT INTO wabrix.contacts (organization_id, channel_id, phone_number, display_name)
SELECT organization_id, channel_id, customer_phone, max(customer_name)
FROM wabrix.conversations
GROUP BY organization_id, channel_id, customer_phone
ON CONFLICT (organization_id, channel_id, phone_number) DO NOTHING;

UPDATE wabrix.conversations AS conversation
SET contact_id = contact.id
FROM wabrix.contacts AS contact
WHERE contact.organization_id = conversation.organization_id
  AND contact.channel_id = conversation.channel_id
  AND contact.phone_number = conversation.customer_phone;

ALTER TABLE wabrix.conversations ALTER COLUMN contact_id SET NOT NULL;
ALTER TABLE wabrix.conversations
  ADD CONSTRAINT conversations_contact_fk
  FOREIGN KEY (contact_id) REFERENCES wabrix.contacts(id) ON DELETE RESTRICT;
CREATE INDEX conversations_contact_idx ON wabrix.conversations (organization_id, contact_id);

CREATE TABLE wabrix.message_status_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES wabrix.organizations(id) ON DELETE RESTRICT,
  message_id uuid NOT NULL REFERENCES wabrix.messages(id) ON DELETE CASCADE,
  status text NOT NULL CHECK (status IN ('queued', 'sent', 'delivered', 'read', 'failed')),
  provider_occurred_at timestamptz,
  error_detail text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(metadata) = 'object'),
  created_at timestamptz NOT NULL DEFAULT clock_timestamp()
);

CREATE INDEX message_status_events_timeline_idx
  ON wabrix.message_status_events (organization_id, message_id, created_at);

CREATE TABLE wabrix.conversation_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES wabrix.organizations(id) ON DELETE RESTRICT,
  conversation_id uuid NOT NULL REFERENCES wabrix.conversations(id) ON DELETE CASCADE,
  event_type text NOT NULL,
  actor_user_id uuid REFERENCES wabrix.users(id) ON DELETE SET NULL,
  payload jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(payload) = 'object'),
  created_at timestamptz NOT NULL DEFAULT clock_timestamp()
);

CREATE INDEX conversation_events_timeline_idx
  ON wabrix.conversation_events (organization_id, conversation_id, created_at);

CREATE TABLE wabrix.outbound_intents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES wabrix.organizations(id) ON DELETE RESTRICT,
  message_id uuid NOT NULL UNIQUE REFERENCES wabrix.messages(id) ON DELETE CASCADE,
  conversation_id uuid NOT NULL REFERENCES wabrix.conversations(id) ON DELETE CASCADE,
  channel_id uuid NOT NULL REFERENCES wabrix.channels(id) ON DELETE RESTRICT,
  state text NOT NULL DEFAULT 'queued'
    CHECK (state IN ('queued', 'dispatching', 'sent', 'failed', 'reconcile_required')),
  attempt_count integer NOT NULL DEFAULT 0 CHECK (attempt_count >= 0),
  provider_message_id text,
  last_error text,
  claimed_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  updated_at timestamptz NOT NULL DEFAULT clock_timestamp()
);

CREATE INDEX outbound_intents_dispatch_idx
  ON wabrix.outbound_intents (organization_id, state, created_at);

INSERT INTO wabrix.message_status_events
  (organization_id, message_id, status, provider_occurred_at, error_detail, created_at)
SELECT organization_id, id, status,
       CASE status WHEN 'sent' THEN sent_at WHEN 'delivered' THEN delivered_at
         WHEN 'read' THEN read_at ELSE NULL END,
       error_detail, created_at
FROM wabrix.messages;

INSERT INTO wabrix.conversation_events
  (organization_id, conversation_id, event_type, payload, created_at)
SELECT organization_id, id, 'conversation.created', jsonb_build_object('status', status), created_at
FROM wabrix.conversations;

INSERT INTO wabrix.outbound_intents
  (organization_id, message_id, conversation_id, channel_id, state,
   provider_message_id, last_error, completed_at, created_at, updated_at)
SELECT organization_id, id, conversation_id, channel_id,
       CASE status WHEN 'queued' THEN 'queued' WHEN 'failed' THEN 'failed' ELSE 'sent' END,
       provider_message_id, error_detail,
       CASE WHEN status = 'queued' THEN NULL ELSE updated_at END,
       created_at, updated_at
FROM wabrix.messages
WHERE direction = 'outbound'
ON CONFLICT (message_id) DO NOTHING;

CREATE UNIQUE INDEX messages_org_provider_message_unique
  ON wabrix.messages (organization_id, provider_message_id)
  WHERE provider_message_id IS NOT NULL;

ALTER TABLE wabrix.outbox_events
  ADD COLUMN available_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  ADD COLUMN claimed_until timestamptz,
  ADD COLUMN claim_token uuid,
  ADD COLUMN dead_lettered_at timestamptz;

CREATE INDEX outbox_events_claimable_idx
  ON wabrix.outbox_events (event_type, available_at, occurred_at)
  WHERE published_at IS NULL;

CREATE OR REPLACE FUNCTION wabrix.sync_conversation_contact() RETURNS trigger
LANGUAGE plpgsql AS $$
DECLARE resolved_contact_id uuid;
BEGIN
  INSERT INTO wabrix.contacts (organization_id, channel_id, phone_number, display_name)
  VALUES (NEW.organization_id, NEW.channel_id, NEW.customer_phone, NEW.customer_name)
  ON CONFLICT (organization_id, channel_id, phone_number)
  DO UPDATE SET display_name = COALESCE(EXCLUDED.display_name, wabrix.contacts.display_name),
                updated_at = clock_timestamp()
  RETURNING id INTO resolved_contact_id;
  NEW.contact_id := resolved_contact_id;
  RETURN NEW;
END $$;

CREATE TRIGGER conversations_sync_contact
BEFORE INSERT OR UPDATE OF customer_phone, customer_name ON wabrix.conversations
FOR EACH ROW EXECUTE FUNCTION wabrix.sync_conversation_contact();

CREATE OR REPLACE FUNCTION wabrix.capture_message_lifecycle() RETURNS trigger
LANGUAGE plpgsql AS $$
BEGIN
  IF TG_OP = 'INSERT' OR NEW.status IS DISTINCT FROM OLD.status THEN
    INSERT INTO wabrix.message_status_events
      (organization_id, message_id, status, provider_occurred_at, error_detail)
    VALUES (
      NEW.organization_id, NEW.id, NEW.status,
      CASE NEW.status WHEN 'sent' THEN NEW.sent_at WHEN 'delivered' THEN NEW.delivered_at
        WHEN 'read' THEN NEW.read_at ELSE NULL END,
      NEW.error_detail
    );
  END IF;
  IF TG_OP = 'INSERT' AND NEW.direction = 'outbound' THEN
    INSERT INTO wabrix.outbound_intents
      (organization_id, message_id, conversation_id, channel_id)
    VALUES (NEW.organization_id, NEW.id, NEW.conversation_id, NEW.channel_id)
    ON CONFLICT (message_id) DO NOTHING;
  ELSIF TG_OP = 'UPDATE' AND NEW.direction = 'outbound' AND NEW.status IS DISTINCT FROM OLD.status THEN
    UPDATE wabrix.outbound_intents
    SET state = CASE NEW.status WHEN 'queued' THEN 'queued' WHEN 'failed' THEN 'failed' ELSE 'sent' END,
        provider_message_id = COALESCE(NEW.provider_message_id, provider_message_id),
        last_error = NEW.error_detail,
        completed_at = CASE WHEN NEW.status = 'queued' THEN NULL ELSE clock_timestamp() END,
        updated_at = clock_timestamp()
    WHERE message_id = NEW.id;
  END IF;
  RETURN NEW;
END $$;

CREATE TRIGGER messages_capture_lifecycle
AFTER INSERT OR UPDATE OF status ON wabrix.messages
FOR EACH ROW EXECUTE FUNCTION wabrix.capture_message_lifecycle();

CREATE OR REPLACE FUNCTION wabrix.capture_conversation_lifecycle() RETURNS trigger
LANGUAGE plpgsql AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO wabrix.conversation_events (organization_id, conversation_id, event_type, payload)
    VALUES (NEW.organization_id, NEW.id, 'conversation.created', jsonb_build_object('status', NEW.status));
  ELSE
    IF NEW.status IS DISTINCT FROM OLD.status THEN
      INSERT INTO wabrix.conversation_events (organization_id, conversation_id, event_type, payload)
      VALUES (NEW.organization_id, NEW.id, 'conversation.status_changed',
              jsonb_build_object('from', OLD.status, 'to', NEW.status));
    END IF;
    IF NEW.assigned_to_user_id IS DISTINCT FROM OLD.assigned_to_user_id THEN
      INSERT INTO wabrix.conversation_events
        (organization_id, conversation_id, event_type, actor_user_id, payload)
      VALUES (NEW.organization_id, NEW.id, 'conversation.assignment_changed',
              NEW.assigned_to_user_id,
              jsonb_build_object('from', OLD.assigned_to_user_id, 'to', NEW.assigned_to_user_id));
    END IF;
  END IF;
  RETURN NEW;
END $$;

CREATE TRIGGER conversations_capture_lifecycle
AFTER INSERT OR UPDATE OF status, assigned_to_user_id ON wabrix.conversations
FOR EACH ROW EXECUTE FUNCTION wabrix.capture_conversation_lifecycle();

ALTER TABLE wabrix.contacts OWNER TO wabrix_migrator;
ALTER TABLE wabrix.message_status_events OWNER TO wabrix_migrator;
ALTER TABLE wabrix.conversation_events OWNER TO wabrix_migrator;
ALTER TABLE wabrix.outbound_intents OWNER TO wabrix_migrator;

GRANT SELECT, INSERT, UPDATE, DELETE ON
  wabrix.contacts, wabrix.message_status_events,
  wabrix.conversation_events, wabrix.outbound_intents
TO wabrix_runtime;
GRANT SELECT ON
  wabrix.contacts, wabrix.message_status_events,
  wabrix.conversation_events, wabrix.outbound_intents
TO wabrix_reporting;

ALTER TABLE wabrix.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE wabrix.contacts FORCE ROW LEVEL SECURITY;
ALTER TABLE wabrix.message_status_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE wabrix.message_status_events FORCE ROW LEVEL SECURITY;
ALTER TABLE wabrix.conversation_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE wabrix.conversation_events FORCE ROW LEVEL SECURITY;
ALTER TABLE wabrix.outbound_intents ENABLE ROW LEVEL SECURITY;
ALTER TABLE wabrix.outbound_intents FORCE ROW LEVEL SECURITY;
ALTER TABLE wabrix.webhook_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE wabrix.webhook_events FORCE ROW LEVEL SECURITY;

CREATE POLICY contacts_tenant ON wabrix.contacts
  USING (organization_id = wabrix.current_organization_id())
  WITH CHECK (organization_id = wabrix.current_organization_id());
CREATE POLICY message_status_events_tenant ON wabrix.message_status_events
  USING (organization_id = wabrix.current_organization_id())
  WITH CHECK (organization_id = wabrix.current_organization_id());
CREATE POLICY conversation_events_tenant ON wabrix.conversation_events
  USING (organization_id = wabrix.current_organization_id())
  WITH CHECK (organization_id = wabrix.current_organization_id());
CREATE POLICY outbound_intents_tenant ON wabrix.outbound_intents
  USING (organization_id = wabrix.current_organization_id())
  WITH CHECK (organization_id = wabrix.current_organization_id());
CREATE POLICY webhook_events_tenant ON wabrix.webhook_events
  USING (organization_id = wabrix.current_organization_id())
  WITH CHECK (organization_id = wabrix.current_organization_id());

-- Cross-tenant queue discovery is exposed only through narrow, non-login
-- security-definer capabilities. Tenant business work still runs as
-- wabrix_runtime with FORCE RLS after an event has been claimed.
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'wabrix_system') THEN
    CREATE ROLE wabrix_system NOLOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE NOINHERIT BYPASSRLS;
  END IF;
END $$;

ALTER ROLE wabrix_system NOLOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE NOINHERIT BYPASSRLS;
GRANT USAGE ON SCHEMA wabrix TO wabrix_system;
GRANT SELECT ON wabrix.channels, wabrix.outbound_intents TO wabrix_system;
GRANT SELECT, INSERT, UPDATE ON wabrix.webhook_events, wabrix.outbox_events TO wabrix_system;

CREATE OR REPLACE FUNCTION wabrix.claim_outbox_events(
  input_event_type text,
  input_limit integer
) RETURNS TABLE (
  id uuid,
  organization_id uuid,
  aggregate_type text,
  aggregate_id uuid,
  event_type text,
  payload jsonb,
  correlation_id uuid,
  causation_id uuid,
  occurred_at timestamptz,
  attempts integer
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, wabrix
AS $$
BEGIN
  IF input_event_type NOT IN ('webhook.received', 'message.outbound.created') THEN
    RAISE EXCEPTION 'Unsupported outbox event type';
  END IF;
  IF input_limit < 1 OR input_limit > 100 THEN
    RAISE EXCEPTION 'Outbox claim limit must be between 1 and 100';
  END IF;

  RETURN QUERY
  WITH candidates AS (
    SELECT event.id
    FROM wabrix.outbox_events AS event
    WHERE event.event_type = input_event_type
      AND event.published_at IS NULL
      AND event.available_at <= clock_timestamp()
      AND (event.claimed_until IS NULL OR event.claimed_until < clock_timestamp())
    ORDER BY event.occurred_at ASC
    FOR UPDATE SKIP LOCKED
    LIMIT input_limit
  ), claimed AS (
    UPDATE wabrix.outbox_events AS event
    SET claim_token = gen_random_uuid(),
        claimed_until = clock_timestamp() + interval '30 seconds'
    FROM candidates
    WHERE event.id = candidates.id
    RETURNING event.id, event.organization_id, event.aggregate_type,
      event.aggregate_id, event.event_type, event.payload, event.correlation_id,
      event.causation_id, event.occurred_at, event.attempts
  )
  SELECT claimed.id, claimed.organization_id, claimed.aggregate_type,
    claimed.aggregate_id, claimed.event_type, claimed.payload,
    claimed.correlation_id, claimed.causation_id, claimed.occurred_at,
    claimed.attempts
  FROM claimed;
END $$;

CREATE OR REPLACE FUNCTION wabrix.messaging_operational_snapshot()
RETURNS TABLE (
  pending_events bigint,
  oldest_event_age_seconds double precision,
  dead_letter_events bigint
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = pg_catalog, wabrix
AS $$
  SELECT
    (SELECT count(*) FROM wabrix.outbox_events WHERE published_at IS NULL),
    COALESCE((
      SELECT extract(epoch FROM clock_timestamp() - min(occurred_at))
      FROM wabrix.outbox_events WHERE published_at IS NULL
    ), 0),
    (SELECT count(*) FROM wabrix.outbox_events WHERE dead_lettered_at IS NOT NULL)
$$;

ALTER FUNCTION wabrix.claim_outbox_events(text, integer) OWNER TO wabrix_system;
ALTER FUNCTION wabrix.messaging_operational_snapshot() OWNER TO wabrix_system;
REVOKE ALL ON FUNCTION wabrix.claim_outbox_events(text, integer) FROM PUBLIC;
REVOKE ALL ON FUNCTION wabrix.messaging_operational_snapshot() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION wabrix.claim_outbox_events(text, integer) TO wabrix_runtime;
GRANT EXECUTE ON FUNCTION wabrix.messaging_operational_snapshot() TO wabrix_runtime;

-- The public ingress does not know a tenant until it maps Meta's phone number
-- ID. Expose one narrowly-scoped, atomic capability instead of granting the
-- ingress process unrestricted cross-tenant table access.
CREATE OR REPLACE FUNCTION wabrix.record_whatsapp_webhook(
  input_payload_hash text,
  input_raw_payload text,
  input_phone_number_id text,
  input_correlation_id uuid DEFAULT NULL
) RETURNS TABLE (
  id uuid,
  provider text,
  payload_hash text,
  phone_number_id text,
  organization_id uuid,
  raw_payload text,
  status text,
  correlation_id uuid,
  processing_error text,
  received_at timestamptz,
  processed_at timestamptz,
  created_at timestamptz,
  updated_at timestamptz,
  deduplicated boolean
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, wabrix
AS $$
DECLARE
  resolved_organization_id uuid;
  stored_event wabrix.webhook_events%ROWTYPE;
BEGIN
  SELECT channel.organization_id
  INTO resolved_organization_id
  FROM wabrix.channels AS channel
  WHERE channel.phone_number_id = input_phone_number_id
    AND channel.status != 'disconnected'
  LIMIT 1;

  INSERT INTO wabrix.webhook_events AS webhook
    (provider, payload_hash, phone_number_id, organization_id, raw_payload, correlation_id)
  VALUES
    ('whatsapp', input_payload_hash, input_phone_number_id, resolved_organization_id,
     input_raw_payload, COALESCE(input_correlation_id, pg_catalog.gen_random_uuid()))
  ON CONFLICT ON CONSTRAINT webhook_events_provider_payload_hash_key DO NOTHING
  RETURNING webhook.* INTO stored_event;

  IF stored_event.id IS NULL THEN
    SELECT webhook.* INTO stored_event
    FROM wabrix.webhook_events AS webhook
    WHERE webhook.provider = 'whatsapp'
      AND webhook.payload_hash = input_payload_hash;
    deduplicated := true;
  ELSE
    deduplicated := false;
    IF resolved_organization_id IS NOT NULL THEN
      INSERT INTO wabrix.outbox_events
        (organization_id, aggregate_type, aggregate_id, event_type,
         schema_version, payload, correlation_id)
      VALUES
        (resolved_organization_id, 'webhook_event', stored_event.id, 'webhook.received', 1,
         pg_catalog.jsonb_build_object(
           'webhookEventId', stored_event.id,
           'provider', stored_event.provider,
           'phoneNumberId', stored_event.phone_number_id
         ), stored_event.correlation_id);
    END IF;
  END IF;

  RETURN QUERY SELECT
    stored_event.id, stored_event.provider, stored_event.payload_hash,
    stored_event.phone_number_id, stored_event.organization_id,
    stored_event.raw_payload, stored_event.status, stored_event.correlation_id,
    stored_event.processing_error, stored_event.received_at, stored_event.processed_at,
    stored_event.created_at, stored_event.updated_at, deduplicated;
END $$;

REVOKE ALL ON FUNCTION wabrix.record_whatsapp_webhook(text, text, text, uuid) FROM PUBLIC;
ALTER FUNCTION wabrix.record_whatsapp_webhook(text, text, text, uuid) OWNER TO wabrix_system;
GRANT EXECUTE ON FUNCTION wabrix.record_whatsapp_webhook(text, text, text, uuid)
TO wabrix_runtime;
