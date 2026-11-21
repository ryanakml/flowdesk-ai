-- M2-04: Durable webhook event persistence and SHA-256 de-duplication
CREATE TABLE wabrix.webhook_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider text NOT NULL CHECK (provider IN ('whatsapp')),
  payload_hash text NOT NULL,
  phone_number_id text,
  organization_id uuid REFERENCES wabrix.organizations(id) ON DELETE RESTRICT,
  raw_payload text NOT NULL,
  status text NOT NULL DEFAULT 'received' CHECK (status IN ('received', 'processing', 'processed', 'failed', 'ignored')),
  correlation_id uuid NOT NULL DEFAULT gen_random_uuid(),
  processing_error text,
  received_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  processed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  updated_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  UNIQUE (provider, payload_hash)
);

CREATE INDEX webhook_events_status_idx ON wabrix.webhook_events (status, received_at);
CREATE INDEX webhook_events_phone_number_id_idx ON wabrix.webhook_events (phone_number_id);
CREATE INDEX webhook_events_org_idx ON wabrix.webhook_events (organization_id, received_at DESC);

ALTER TABLE wabrix.webhook_events OWNER TO wabrix_migrator;
GRANT SELECT, INSERT, UPDATE, DELETE ON wabrix.webhook_events TO wabrix_runtime;
GRANT SELECT ON wabrix.webhook_events TO wabrix_reporting;
