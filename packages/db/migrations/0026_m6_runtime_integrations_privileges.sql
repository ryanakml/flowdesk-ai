-- M6 runtime repair: grant least-privilege access to developer integration tables.

GRANT SELECT, INSERT, UPDATE, DELETE ON
  wabrix.api_keys,
  wabrix.webhook_subscriptions
TO wabrix_runtime;

GRANT SELECT ON
  wabrix.api_keys,
  wabrix.webhook_subscriptions
TO wabrix_reporting;
