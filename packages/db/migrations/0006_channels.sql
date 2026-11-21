-- M2-01: Channels table and tenant isolation RLS policy.

CREATE TABLE wabrix.channels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES wabrix.organizations(id) ON DELETE RESTRICT,
  type text NOT NULL CHECK (type IN ('whatsapp')),
  name text NOT NULL CHECK (length(trim(name)) >= 1 AND length(name) <= 100),
  phone_number_id text NOT NULL,
  waba_id text NOT NULL,
  encrypted_credentials text NOT NULL,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'connecting', 'active', 'degraded', 'disconnected')),
  status_reason text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  updated_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  UNIQUE (organization_id, phone_number_id)
);

CREATE INDEX channels_org_status_idx ON wabrix.channels (organization_id, status, id);
CREATE INDEX channels_phone_number_id_idx ON wabrix.channels (phone_number_id);

ALTER TABLE wabrix.channels OWNER TO wabrix_migrator;
GRANT SELECT, INSERT, UPDATE, DELETE ON wabrix.channels TO wabrix_runtime;
GRANT SELECT ON wabrix.channels TO wabrix_reporting;

ALTER TABLE wabrix.channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE wabrix.channels FORCE ROW LEVEL SECURITY;

CREATE POLICY channels_tenant ON wabrix.channels
  USING (organization_id = wabrix.current_organization_id())
  WITH CHECK (organization_id = wabrix.current_organization_id());
