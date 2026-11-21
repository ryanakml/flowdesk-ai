\set ON_ERROR_STOP on

SELECT format(
  'CREATE ROLE wabrix_app LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE INHERIT NOBYPASSRLS PASSWORD %L',
  :'runtime_password'
)
WHERE NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'wabrix_app')
\gexec

SELECT format(
  'ALTER ROLE wabrix_app LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE INHERIT NOBYPASSRLS PASSWORD %L',
  :'runtime_password'
)
\gexec

GRANT wabrix_runtime TO wabrix_app;
