# FlowDesk

![FlowDesk landing page with the "Scale your WhatsApp with AI" headline](apps/web/public/landing-hero.webp)

**An enterprise-grade shared WhatsApp inbox with AI-assisted replies, backed by a durable PostgreSQL message pipeline.**

[Live Hosted Demo](https://flowdesk.nylo.me) · [Product preview](#product-preview) · [Architecture](#architecture) · [Stack](#stack-and-repository-layout) · [Run locally](#run-locally) · [Testing](#testing) · [Documentation](#documentation) · [Contributing](#contributing)

Support teams can connect WhatsApp Business numbers, route incoming conversations to queues and agents, and draft replies from their workspace knowledge base. The backend verifies and stores incoming webhooks before acknowledging them, then lets workers handle normalization, routing, AI, and delivery.

## Product workflows

| Workflow            | What the application supports                                                                                                                                           |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Connect WhatsApp    | Connect a WhatsApp Business Account through Meta Embedded Signup when configured, or enter credentials manually. Manage channels and sync approved templates.           |
| Triage and reply    | Work from a live inbox with queues, assignments, tags, internal notes, and delivery status. Use approved templates when the WhatsApp service window has closed.         |
| Assist with AI      | Ingest knowledge sources, retrieve relevant chunks, and review or edit drafted replies. Optional automatic replies depend on workspace policy and runtime safety gates. |
| Operate a workspace | Invite teammates, assign roles, review audit activity, and inspect conversation, SLA, and workload analytics.                                                           |
| Integrate           | Create scoped API keys and subscribe to signed developer webhooks.                                                                                                      |

## Product preview

| Inbox                                                                                                                            | Analytics                                                                                                                     |
| -------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| ![FlowDesk inbox with a conversation list, an open thread, and automation controls](apps/web/public/landing-dashboard-dark.webp) | ![FlowDesk analytics dashboard with conversation, automation, and SLA metrics](apps/web/public/landing-dashboard-dark-1.webp) |

## Architecture

FlowDesk is a [modular monolith with separate process roles](docs/adr/001-modular-monolith-process-roles.md). The web app, REST API, webhook ingress, worker, and scheduler live in a pnpm/Turborepo workspace. PostgreSQL stores application state and durable work.

```mermaid
sequenceDiagram
    participant Meta as WhatsApp Cloud API
    participant Ingress as Express ingress
    participant DB as PostgreSQL
    participant Worker as Background worker
    participant API as Express API
    participant Inbox as React inbox

    Meta->>Ingress: POST /webhooks/whatsapp
    Ingress->>Ingress: Verify signature against raw body
    Ingress->>DB: Store webhook and enqueue work for known channel
    DB-->>Ingress: Commit
    Ingress-->>Meta: 200 (503 if persistence fails)
    Worker->>DB: Claim work, normalize message or status, route
    Inbox->>API: Load thread or submit a reply
    API->>DB: Read inbox or commit outbound intent and outbox event
    Worker->>DB: Claim outbound event
    Worker->>Meta: Submit message or template
    Meta-->>Ingress: Delivery status webhook
    API-->>Inbox: Socket.IO invalidation hints
```

### Webhook reliability and message delivery

- **Durable intake.** [Ingress](apps/ingress/src/app.ts) validates Meta's HMAC-SHA256 signature before parsing the body. With PostgreSQL configured, [persistence](packages/db/src/webhooks.ts) deduplicates by provider and SHA-256 hash of the raw body. A new event for a known channel and its outbox entry are committed together. The request returns HTTP 503 if persistence fails so Meta can retry.
- **Transactional outbox.** The API records outbound intent and enqueues work in PostgreSQL in the same transaction. Workers claim batches with `FOR UPDATE SKIP LOCKED`, apply bounded retries and backoff, and dead-letter terminal failures. Ingress deduplication and outbound idempotency keys protect different boundaries; a network timeout at the provider is still ambiguous. See the [outbox and recovery runbook](docs/runbooks/whatsapp-outbox-dlq.md) and [vertical slice integration tests](apps/worker/src/vertical-slice.integration.test.ts).
- **Delivery and realtime state.** The worker dispatches WhatsApp text, templates, or media. Status webhooks flow through the same ingress and update stored message state. The API uses Socket.IO to signal clients to refetch inbox data; Redis can relay those signals between API instances.

### AI, media, and tenant operations

- **Knowledge and AI.** Ingestion jobs extract and chunk source content, call a Gemini or OpenAI embedding adapter, and store vectors in pgvector. The draft worker retrieves relevant chunks and adds them to the conversation prompt. [Automatic sending](apps/worker/src/auto-send.ts) checks confidence, the WhatsApp service window, safety policy, budget and rate limits, and whether a human has already taken over.
- **Two Redis roles.** Redis backs Socket.IO broadcasts across API instances. An independent, opt-in [query embedding cache](docs/runbooks/query-embedding-cache.md) uses tenant-scoped keys and falls back to the embedding provider on cache failures. PostgreSQL owns durable work in both cases.
- **Media.** Attachments use an S3-compatible store, with [quarantine and ClamAV scanning](docs/runbooks/media-quarantine.md) before access and retention cleanup afterward.
- **Tenant operations.** OIDC sessions, workspace roles, and [PostgreSQL row-level security](docs/adr/002-postgresql-rls-tenant-boundary.md) enforce access. The scheduler aggregates analytics per tenant. The worker delivers signed developer webhooks with retry and dead-letter handling.

## Stack and repository layout

| Area                  | Code and tools                                                                                                                                                                                                                                                     |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Web                   | [`apps/web`](apps/web) — React 19, Vite, TanStack Router/Query/Table, Tailwind CSS, Radix UI, Recharts                                                                                                                                                             |
| HTTP                  | [`apps/api`](apps/api) and [`apps/ingress`](apps/ingress) — Node.js 22, strict TypeScript, Express 5, Zod, OIDC sessions, Socket.IO                                                                                                                                |
| Background processing | [`apps/worker`](apps/worker) for durable jobs; [`apps/scheduler`](apps/scheduler) for periodic analytics aggregation                                                                                                                                               |
| Data and contracts    | [`packages/db`](packages/db) — PostgreSQL 16, pgvector, `pg` queries and SQL migrations; Prisma schema for data modeling. [`packages/contracts`](packages/contracts) contains Zod schemas and the OpenAPI generator.                                               |
| Shared packages       | [`packages`](packages) — domain policies, WhatsApp/AI/storage provider adapters, security, configuration, observability, shared UI, and test fixtures                                                                                                              |
| Local infrastructure  | [`infra/compose`](infra/compose) — Docker Compose, Redis, MinIO, ClamAV, Mailpit, OpenTelemetry Collector, Prometheus and Grafana; application logs use pino                                                                                                       |
| Deployment reference  | [`infra/docker`](infra/docker), [`infra/deploy`](infra/deploy), and [`infra/terraform`](infra/terraform) — service images, a [single-host Compose staging runbook](docs/runbooks/single-host-staging.md), and AWS/ECS reference infrastructure and release tooling |

The repository retains internal package, schema, and integration identifiers for compatibility.

## Run locally

Requires **Node.js 22** (see `.nvmrc`), **pnpm 10**, **Docker with Compose v2**, and **Make**.

```bash
git clone https://github.com/ryanakml/wabrix-ai.git
cd wabrix-ai
nvm use
make bootstrap
make compose-up
make db-migrate
make dev
```

`make bootstrap` installs from the lockfile and copies [`.env.example`](.env.example) to `.env` if needed. Wait for local PostgreSQL to become healthy before migrating. The sample environment enables local mock sign-in and mock AI. Real OIDC, WhatsApp, and AI provider calls require their own credentials and settings; see the [configuration guide](docs/delivery/CONFIGURATION.md) and [Meta signup runbook](docs/runbooks/meta-embedded-signup.md).

| Service                     | Default local address                            |
| --------------------------- | ------------------------------------------------ |
| Web                         | `http://localhost:3000`                          |
| API                         | `http://localhost:4000`                          |
| Webhook ingress             | `http://localhost:4001`                          |
| Worker and scheduler health | `http://localhost:4002`, `http://localhost:4003` |
| PostgreSQL                  | `localhost:5433`                                 |
| Redis                       | `localhost:6379`                                 |
| MinIO API and console       | `http://localhost:9000`, `http://localhost:9001` |
| Mailpit                     | `http://localhost:8025`                          |
| Prometheus and Grafana      | `http://localhost:9090`, `http://localhost:3001` |

Use `make compose-down` to stop local services. Use `make db-reset` only for disposable local data; it wipes and recreates the local database volume. See the [migration runbook](docs/runbooks/database-migrations.md).

## Testing

```bash
make verify                          # format, OpenAPI drift, lint, types, tests, and build
pnpm --filter ./apps/web test      # web component and route tests
pnpm --filter ./apps/web test:e2e  # Playwright browser tests (install a browser first)
```

Vitest covers signature validation, webhook deduplication, routing, delivery retries, tenant isolation, and AI policy. PostgreSQL and Redis integration cases require the corresponding test services and environment variables; see the [testing guide](docs/delivery/TESTING.md) and [CI configuration](.github/workflows/ci.yml).

## Documentation

- [Architecture decision records](docs/adr) — decisions that are expensive to reverse.
- [Operations runbooks](docs/runbooks) — migrations, delivery recovery, realtime, media quarantine, and staging.
- [Configuration guide](docs/delivery/CONFIGURATION.md) — environment variables and provider credentials.
- [Testing guide](docs/delivery/TESTING.md) — unit, integration, and end-to-end test setup.
- [OpenAPI specification](docs/api/openapi.json) — REST API contract.
- [Security policy](SECURITY.md) — how to report vulnerabilities.

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) for the development workflow and commit conventions. Run `make verify` before opening a pull request.
