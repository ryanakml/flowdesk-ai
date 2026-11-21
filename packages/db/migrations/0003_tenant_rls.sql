-- M1-03: tenant policies. Runtime queries require transaction-scoped app.organization_id.
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA wabrix TO wabrix_runtime;

ALTER TABLE wabrix.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE wabrix.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE wabrix.memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE wabrix.organization_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE wabrix.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE wabrix.idempotency_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE wabrix.outbox_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE wabrix.organizations FORCE ROW LEVEL SECURITY;
ALTER TABLE wabrix.roles FORCE ROW LEVEL SECURITY;
ALTER TABLE wabrix.memberships FORCE ROW LEVEL SECURITY;
ALTER TABLE wabrix.organization_settings FORCE ROW LEVEL SECURITY;
ALTER TABLE wabrix.audit_logs FORCE ROW LEVEL SECURITY;
ALTER TABLE wabrix.idempotency_keys FORCE ROW LEVEL SECURITY;
ALTER TABLE wabrix.outbox_events FORCE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION wabrix.current_organization_id() RETURNS uuid
LANGUAGE sql STABLE AS $$ SELECT NULLIF(current_setting('app.organization_id', true), '')::uuid $$;

CREATE POLICY organizations_tenant ON wabrix.organizations
  USING (id = wabrix.current_organization_id()) WITH CHECK (id = wabrix.current_organization_id());
CREATE POLICY roles_tenant ON wabrix.roles
  USING (organization_id = wabrix.current_organization_id()) WITH CHECK (organization_id = wabrix.current_organization_id());
CREATE POLICY memberships_tenant ON wabrix.memberships
  USING (organization_id = wabrix.current_organization_id()) WITH CHECK (organization_id = wabrix.current_organization_id());
CREATE POLICY organization_settings_tenant ON wabrix.organization_settings
  USING (organization_id = wabrix.current_organization_id()) WITH CHECK (organization_id = wabrix.current_organization_id());
CREATE POLICY audit_logs_tenant ON wabrix.audit_logs
  USING (organization_id = wabrix.current_organization_id()) WITH CHECK (organization_id = wabrix.current_organization_id());
CREATE POLICY idempotency_keys_tenant ON wabrix.idempotency_keys
  USING (organization_id = wabrix.current_organization_id()) WITH CHECK (organization_id = wabrix.current_organization_id());
CREATE POLICY outbox_events_tenant ON wabrix.outbox_events
  USING (organization_id = wabrix.current_organization_id()) WITH CHECK (organization_id = wabrix.current_organization_id());
