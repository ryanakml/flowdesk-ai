-- Migration 0032: Add matched_policy_rule_id to wabrix.routing_logs (#180 defect)
-- Supports string-identified embedded rules from automation policies without violating foreign key constraints on wabrix.routing_rules.

ALTER TABLE wabrix.routing_logs
  ADD COLUMN IF NOT EXISTS matched_policy_rule_id text;
