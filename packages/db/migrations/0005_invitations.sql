-- M1-05: invitations table, organization bootstrap function, and atomic invitation consumption.

CREATE TABLE wabrix.invitations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES wabrix.organizations(id) ON DELETE RESTRICT,
  email text NOT NULL CHECK (email = lower(email)),
  role_id uuid NOT NULL REFERENCES wabrix.roles(id) ON DELETE RESTRICT,
  token_hash text NOT NULL UNIQUE,
  invited_by_user_id uuid NOT NULL REFERENCES wabrix.users(id) ON DELETE RESTRICT,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'revoked', 'expired')),
  expires_at timestamptz NOT NULL,
  accepted_at timestamptz,
  revoked_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  updated_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  CHECK (expires_at > created_at)
);

CREATE INDEX invitations_org_status_idx ON wabrix.invitations (organization_id, status, id);
CREATE INDEX invitations_token_hash_idx ON wabrix.invitations (token_hash);

ALTER TABLE wabrix.invitations OWNER TO wabrix_migrator;
GRANT SELECT, INSERT, UPDATE, DELETE ON wabrix.invitations TO wabrix_runtime;
GRANT SELECT ON wabrix.invitations TO wabrix_reporting;

ALTER TABLE wabrix.invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE wabrix.invitations FORCE ROW LEVEL SECURITY;

CREATE POLICY invitations_tenant ON wabrix.invitations
  USING (organization_id = wabrix.current_organization_id())
  WITH CHECK (organization_id = wabrix.current_organization_id());

-- Atomic organization bootstrap function
CREATE OR REPLACE FUNCTION wabrix.bootstrap_organization(
  p_slug text,
  p_display_name text,
  p_user_id uuid
) RETURNS TABLE (
  organization_id uuid,
  slug text,
  display_name text,
  owner_role_id uuid,
  membership_id uuid
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = wabrix, pg_temp
AS $$
DECLARE
  v_org_id uuid;
  v_owner_role_id uuid;
  v_membership_id uuid;
BEGIN
  -- Insert organization
  INSERT INTO wabrix.organizations (slug, display_name)
  VALUES (p_slug, p_display_name)
  RETURNING id INTO v_org_id;

  -- Insert standard roles
  INSERT INTO wabrix.roles (organization_id, key, label)
  VALUES (v_org_id, 'owner', 'Owner')
  RETURNING id INTO v_owner_role_id;

  INSERT INTO wabrix.roles (organization_id, key, label) VALUES
    (v_org_id, 'admin', 'Administrator'),
    (v_org_id, 'supervisor', 'Supervisor'),
    (v_org_id, 'agent', 'Agent'),
    (v_org_id, 'analyst', 'Analyst'),
    (v_org_id, 'billing_admin', 'Billing Administrator');

  -- Insert initial owner membership
  INSERT INTO wabrix.memberships (organization_id, user_id, role_id, status, accepted_at)
  VALUES (v_org_id, p_user_id, v_owner_role_id, 'active', clock_timestamp())
  RETURNING id INTO v_membership_id;

  -- Insert default organization settings
  INSERT INTO wabrix.organization_settings (organization_id, settings, version)
  VALUES (v_org_id, '{}'::jsonb, 1);

  -- Insert audit log
  INSERT INTO wabrix.audit_logs (organization_id, actor_user_id, action, target_type, target_id, result)
  VALUES (v_org_id, p_user_id, 'organization.bootstrap', 'organization', v_org_id, 'allowed');

  RETURN QUERY SELECT v_org_id, p_slug, p_display_name, v_owner_role_id, v_membership_id;
END;
$$;

REVOKE ALL ON FUNCTION wabrix.bootstrap_organization(text, text, uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION wabrix.bootstrap_organization(text, text, uuid) TO wabrix_runtime;

-- Atomic invitation acceptance function
CREATE OR REPLACE FUNCTION wabrix.consume_invitation(
  p_token_hash text,
  p_user_id uuid
) RETURNS TABLE (
  organization_id uuid,
  role_id uuid,
  membership_id uuid
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = wabrix, pg_temp
AS $$
DECLARE
  v_invitation wabrix.invitations%ROWTYPE;
  v_membership_id uuid;
BEGIN
  SELECT * INTO v_invitation
  FROM wabrix.invitations
  WHERE token_hash = p_token_hash
    AND status = 'pending'
    AND expires_at > clock_timestamp()
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN;
  END IF;

  UPDATE wabrix.invitations
  SET status = 'accepted', accepted_at = clock_timestamp(), updated_at = clock_timestamp()
  WHERE id = v_invitation.id;

  INSERT INTO wabrix.memberships (organization_id, user_id, role_id, status, accepted_at)
  VALUES (v_invitation.organization_id, p_user_id, v_invitation.role_id, 'active', clock_timestamp())
  ON CONFLICT (organization_id, user_id)
  DO UPDATE SET
    role_id = EXCLUDED.role_id,
    status = 'active',
    accepted_at = clock_timestamp(),
    updated_at = clock_timestamp()
  RETURNING id INTO v_membership_id;

  RETURN QUERY SELECT v_invitation.organization_id, v_invitation.role_id, v_membership_id;
END;
$$;

REVOKE ALL ON FUNCTION wabrix.consume_invitation(text, uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION wabrix.consume_invitation(text, uuid) TO wabrix_runtime;
