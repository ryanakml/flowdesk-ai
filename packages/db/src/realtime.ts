import type { DbClient } from "./auth.js";

export type RealtimeRoom =
  { type: "organization" } | { type: "team"; id: string } | { type: "conversation"; id: string };

export async function getRealtimeVersion(db: DbClient, organizationId: string): Promise<number> {
  await db.query(
    `INSERT INTO wabrix.realtime_versions (organization_id, version)
     VALUES ($1, 0) ON CONFLICT (organization_id) DO NOTHING`,
    [organizationId]
  );
  const result = await db.query<{ version: string | number }>(
    `SELECT version FROM wabrix.realtime_versions WHERE organization_id = $1`,
    [organizationId]
  );
  return Number(result.rows[0]?.version ?? 0);
}

export async function canAccessRealtimeRoom(
  db: DbClient,
  input: { organizationId: string; userId: string; room: RealtimeRoom }
): Promise<boolean> {
  if (input.room.type === "organization") {
    const result = await db.query(
      `SELECT 1 FROM wabrix.memberships
       WHERE organization_id = $1 AND user_id = $2 AND status = 'active'`,
      [input.organizationId, input.userId]
    );
    return Boolean(result.rows[0]);
  }

  if (input.room.type === "team") {
    const result = await db.query(
      `SELECT 1
       FROM wabrix.memberships AS membership
       JOIN wabrix.roles AS role ON role.id = membership.role_id
       WHERE membership.organization_id = $1 AND membership.user_id = $2
         AND membership.status = 'active'
         AND (
           role.key IN ('owner', 'admin', 'supervisor')
           OR EXISTS (
             SELECT 1 FROM wabrix.team_memberships AS team_member
             WHERE team_member.organization_id = membership.organization_id
               AND team_member.team_id = $3 AND team_member.user_id = membership.user_id
               AND team_member.status = 'active'
           )
         )`,
      [input.organizationId, input.userId, input.room.id]
    );
    return Boolean(result.rows[0]);
  }

  const result = await db.query(
    `SELECT 1
     FROM wabrix.conversations AS conversation
     JOIN wabrix.memberships AS membership
       ON membership.organization_id = conversation.organization_id
      AND membership.user_id = $2 AND membership.status = 'active'
     JOIN wabrix.roles AS role ON role.id = membership.role_id
     WHERE conversation.organization_id = $1 AND conversation.id = $3
       AND (
         conversation.queue_id IS NULL
         OR role.key IN ('owner', 'admin', 'supervisor')
         OR EXISTS (
           SELECT 1 FROM wabrix.queue_memberships AS queue_member
           WHERE queue_member.organization_id = conversation.organization_id
             AND queue_member.queue_id = conversation.queue_id
             AND queue_member.user_id = membership.user_id
             AND queue_member.status = 'active'
         )
       )`,
    [input.organizationId, input.userId, input.room.id]
  );
  return Boolean(result.rows[0]);
}
