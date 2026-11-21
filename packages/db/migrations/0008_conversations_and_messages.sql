-- M2-05: Conversations and messages domain tables with tenant isolation RLS.

CREATE TABLE wabrix.conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES wabrix.organizations(id) ON DELETE RESTRICT,
  channel_id uuid NOT NULL REFERENCES wabrix.channels(id) ON DELETE RESTRICT,
  customer_phone text NOT NULL CHECK (length(customer_phone) >= 5 AND length(customer_phone) <= 30),
  customer_name text,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'open', 'pending', 'resolved', 'closed')),
  priority text NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  assigned_to_user_id uuid REFERENCES wabrix.users(id) ON DELETE SET NULL,
  version integer NOT NULL DEFAULT 1 CHECK (version > 0),
  last_message_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  updated_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  CHECK (jsonb_typeof(metadata) = 'object'),
  UNIQUE (organization_id, channel_id, customer_phone)
);

CREATE INDEX conversations_org_status_idx ON wabrix.conversations (organization_id, status, last_message_at DESC);
CREATE INDEX conversations_org_assigned_idx ON wabrix.conversations (organization_id, assigned_to_user_id, last_message_at DESC);
CREATE INDEX conversations_channel_phone_idx ON wabrix.conversations (channel_id, customer_phone);

CREATE TABLE wabrix.messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES wabrix.organizations(id) ON DELETE RESTRICT,
  conversation_id uuid NOT NULL REFERENCES wabrix.conversations(id) ON DELETE CASCADE,
  channel_id uuid NOT NULL REFERENCES wabrix.channels(id) ON DELETE RESTRICT,
  direction text NOT NULL CHECK (direction IN ('inbound', 'outbound')),
  sender_type text NOT NULL CHECK (sender_type IN ('customer', 'agent', 'system', 'bot')),
  sender_user_id uuid REFERENCES wabrix.users(id) ON DELETE SET NULL,
  provider_message_id text,
  content text NOT NULL,
  status text NOT NULL DEFAULT 'queued' CHECK (status IN ('queued', 'sent', 'delivered', 'read', 'failed')),
  error_detail text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  sent_at timestamptz,
  delivered_at timestamptz,
  read_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  updated_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  CHECK (jsonb_typeof(metadata) = 'object')
);

CREATE INDEX messages_conv_idx ON wabrix.messages (conversation_id, created_at ASC);
CREATE INDEX messages_org_created_idx ON wabrix.messages (organization_id, created_at DESC);
CREATE INDEX messages_provider_id_idx ON wabrix.messages (provider_message_id) WHERE provider_message_id IS NOT NULL;

ALTER TABLE wabrix.conversations OWNER TO wabrix_migrator;
ALTER TABLE wabrix.messages OWNER TO wabrix_migrator;

GRANT SELECT, INSERT, UPDATE, DELETE ON wabrix.conversations TO wabrix_runtime;
GRANT SELECT, INSERT, UPDATE, DELETE ON wabrix.messages TO wabrix_runtime;
GRANT SELECT ON wabrix.conversations TO wabrix_reporting;
GRANT SELECT ON wabrix.messages TO wabrix_reporting;

ALTER TABLE wabrix.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE wabrix.conversations FORCE ROW LEVEL SECURITY;

ALTER TABLE wabrix.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE wabrix.messages FORCE ROW LEVEL SECURITY;

CREATE POLICY conversations_tenant ON wabrix.conversations
  USING (organization_id = wabrix.current_organization_id())
  WITH CHECK (organization_id = wabrix.current_organization_id());

CREATE POLICY messages_tenant ON wabrix.messages
  USING (organization_id = wabrix.current_organization_id())
  WITH CHECK (organization_id = wabrix.current_organization_id());
