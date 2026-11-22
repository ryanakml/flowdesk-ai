import { useState } from "react";
import type { ComponentType } from "react";
import { Code2, Database, Globe2, Lock, Shield, Zap } from "lucide-react";

interface Stage {
  id: string;
  stepNumber: string;
  title: string;
  shortDesc: string;
  badge: string;
  metric: string;
  icon: ComponentType<{ className?: string }>;
  explanation: string;
  specLink: string;
  payloadTitle: string;
  payload: string;
}

const stages: Stage[] = [
  {
    id: "ingress",
    stepNumber: "01",
    title: "Meta Webhook Ingress",
    shortDesc: "HMAC SHA-256 verification & Redis idempotency gate.",
    badge: "Official Meta API",
    metric: "12ms Latency",
    icon: Globe2,
    explanation:
      "Every inbound WhatsApp message from Meta Cloud API is verified against your tenant pre-shared secret using HMAC SHA-256. Duplicates from network retries are discarded using Redis atomic locks before reaching application queues.",
    specLink: "RFC 2104 HMAC Verification",
    payloadTitle: "INBOUND META CLOUD WEBHOOK PAYLOAD",
    payload: JSON.stringify(
      {
        object: "whatsapp_business_account",
        entry: [
          {
            id: "WABA_209183019283",
            changes: [
              {
                value: {
                  messaging_product: "whatsapp",
                  metadata: {
                    display_phone_number: "+1 555 019 2834",
                    phone_number_id: "PNID_992104"
                  },
                  contacts: [{ profile: { name: "Marcus Vance" }, wa_id: "15550192834" }],
                  messages: [
                    {
                      from: "15550192834",
                      id: "wamid.HBgLMTU1NTAxOTI4MzQVAgASGBQz",
                      timestamp: "1763802055",
                      text: { body: "Can I get the annual plan difference refunded?" },
                      type: "text"
                    }
                  ]
                },
                field: "messages"
              }
            ]
          }
        ]
      },
      null,
      2
    )
  },
  {
    id: "security",
    stepNumber: "02",
    title: "Tenant RLS Boundary",
    shortDesc: "PostgreSQL Row-Level Security cryptographic isolation.",
    badge: "Zero Cross-Leakage",
    metric: "100% Isolated",
    icon: Lock,
    explanation:
      "Before any database query executes, the transaction session sets `app.current_tenant_id`. PostgreSQL Row-Level Security (RLS) automatically filters all conversations, messages, vector embeddings, and customer profiles at the engine level.",
    specLink: "PostgreSQL 16 Enterprise RLS",
    payloadTitle: "DATABASE RLS POLICY EXECUTION",
    payload: `-- Executed in every tenant connection session
SET LOCAL app.current_tenant_id = '019283-apex-logistics';

-- Enforced at the PostgreSQL engine kernel:
CREATE POLICY tenant_isolation_policy ON conversations
  FOR ALL
  USING (tenant_id = current_setting('app.current_tenant_id')::uuid)
  WITH CHECK (tenant_id = current_setting('app.current_tenant_id')::uuid);

-- Result: Tenant A can NEVER read or scan Tenant B records even in raw queries.`
  },
  {
    id: "rag",
    stepNumber: "03",
    title: "Hybrid Vector RAG",
    shortDesc: "pgvector cosine similarity with exact chunk citations.",
    badge: "Zero Hallucination",
    metric: "98.4% Semantic Match",
    icon: Database,
    explanation:
      "Incoming customer questions are embedded into 1536-dimensional vectors and matched against your uploaded business documentation using pgvector HNSW indexing. Exact document filenames, line ranges, and relevance scores are extracted.",
    specLink: "pgvector HNSW Cosine Index",
    payloadTitle: "RETRIEVED CITATION RECORD",
    payload: JSON.stringify(
      {
        query: "annual plan difference refund policy",
        retrieval_strategy: "hybrid_semantic_bm25",
        matched_chunks: [
          {
            document: "billing-policy-2026.pdf",
            chunk_id: "chk_9921_clause4",
            line_range: "L42-L58",
            similarity_score: 0.9842,
            verified_snippet:
              "Annual-to-monthly adjustments within 72 hours are processed with a full difference credit back to original payment method without penalty."
          }
        ],
        anti_hallucination_bound: true
      },
      null,
      2
    )
  },
  {
    id: "policy",
    stepNumber: "04",
    title: "Deterministic Policy Gate",
    shortDesc: "Safety thresholds, sentiment audit, and break-glass gates.",
    badge: "Human-in-the-Loop",
    metric: "Strict Compliance",
    icon: Shield,
    explanation:
      "FlowDesk never auto-sends blindly. The policy engine checks: (1) Meta 24-hour service window status, (2) Grounding confidence threshold, (3) PII redaction filter, and (4) Workspace automation rules. If criteria aren't 100% satisfied, it routes to an agent.",
    specLink: "FlowDesk Policy Engine v2",
    payloadTitle: "POLICY ENGINE DECISION LOG",
    payload: JSON.stringify(
      {
        decision: "REQUIRE_HUMAN_APPROVAL",
        rule_evaluated: "rule_high_value_billing_refund",
        checks: {
          meta_24h_window_active: true,
          confidence_score: 0.984,
          confidence_threshold: 0.9,
          pii_scrubbed: true,
          financial_refund_intent_detected: true
        },
        action: "GENERATE_GROUNDED_DRAFT_FOR_AGENT_REVIEW",
        escalation_target: "finance_queue",
        sla_deadline_seconds: 600
      },
      null,
      2
    )
  },
  {
    id: "realtime",
    stepNumber: "05",
    title: "Operator Dispatch & Outbox",
    shortDesc: "Sub-second WebSocket streaming with typing collision locks.",
    badge: "High Velocity",
    metric: "< 45ms Sync",
    icon: Zap,
    explanation:
      "The verified ticket and generated draft are broadcast to authorized operators via an event-driven transactional outbox and WebSockets. If two agents open the same conversation, FlowDesk locks the thread in real time to prevent duplicate replies.",
    specLink: "Transactional Outbox Pattern",
    payloadTitle: "REALTIME WEBSOCKET DISPATCH EVENT",
    payload: JSON.stringify(
      {
        event: "conversation.inbound_with_draft",
        conversation_id: "conv_88319028",
        assigned_queue: "billing_tier_1",
        collision_lock: {
          locked_by_agent_id: "usr_agent_sarah_02",
          expires_at: "2026-11-22T06:30:00Z"
        },
        draft_ready: true,
        grounded_citations_count: 1
      },
      null,
      2
    )
  }
];

export function ArchitecturePipeline() {
  const [activeStageId, setActiveStageId] = useState<string>("ingress");
  const stage = (stages.find((s) => s.id === activeStageId) ?? stages[0]) as Stage;

  return (
    <div className="relative mx-auto w-full max-w-6xl border border-[#dedbd6] dark:border-[#2b3038] bg-white dark:bg-[#121417] p-4 sm:p-8 shadow-xs">
      {/* 8px Corner Registration Marks */}
      <span className="absolute top-2 left-2 size-2 bg-[#d3cec6] dark:bg-[#383e48]" />
      <span className="absolute top-2 right-2 size-2 bg-[#d3cec6] dark:bg-[#383e48]" />
      <span className="absolute bottom-2 left-2 size-2 bg-[#d3cec6] dark:bg-[#383e48]" />
      <span className="absolute bottom-2 right-2 size-2 bg-[#d3cec6] dark:bg-[#383e48]" />

      {/* Section Header */}
      <div className="max-w-3xl mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="size-2 bg-[#0007cb]" />
          <span className="font-mono text-xs uppercase tracking-wider text-[#111111] dark:text-[#f4f4f5]">
            THE ENGINE ROOM • DETERMINISTIC PIPELINE
          </span>
        </div>
        <h3 className="text-3xl sm:text-5xl font-normal tracking-[-0.0296em] text-[#111111] dark:text-[#f4f4f5] leading-[1.05]">
          <span className="text-[#a0a0a0]">How customer messages move through</span>
          <br />
          verifiable enterprise guardrails.
        </h3>
        <p className="mt-4 font-serif text-base sm:text-lg text-[#585858] dark:text-[#a0a0a0] leading-relaxed max-w-2xl">
          Unlike brittle wrappers, FlowDesk executes an audited pipeline that validates
          cryptographic signatures, isolates tenant data, retrieves grounded knowledge, and enforces
          mandatory human approval.
        </p>
      </div>

      {/* 5-Stage Uppercase 12px Mono Tabs */}
      <div className="flex flex-wrap sm:flex-nowrap items-stretch border-t border-b border-[#dedbd6] dark:border-[#2b3038]">
        {stages.map((st) => {
          const active = st.id === stage.id;
          const Icon = st.icon;
          return (
            <button
              key={st.id}
              onClick={() => setActiveStageId(st.id)}
              className={`relative flex-1 p-3.5 text-left transition-all border-r last:border-r-0 border-[#dedbd6] dark:border-[#2b3038] ${
                active
                  ? "bg-[#f1eee9] dark:bg-[#181b20] text-[#111111] dark:text-[#f4f4f5]"
                  : "bg-white dark:bg-[#121417] text-[#707070] hover:bg-[#faf9f6] dark:hover:bg-[#15181e] hover:text-[#111111]"
              }`}
            >
              {/* Electric Blue top line */}
              {active && <span className="absolute top-0 left-0 right-0 h-[2px] bg-[#0007cb]" />}

              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-xs font-bold text-[#0007cb]">{st.stepNumber}</span>
                <Icon className="size-3.5 text-[#707070]" />
              </div>
              <h4 className="font-mono text-xs font-semibold text-[#111111] dark:text-[#f4f4f5] truncate">
                {st.title}
              </h4>
              <p className="mt-1 font-mono text-[10px] text-[#a0a0a0] truncate">{st.metric}</p>
            </button>
          );
        })}
      </div>

      {/* Interactive Stage Deep-Dive Inspector */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12 items-stretch">
        {/* Left Explanation Column (5 cols) */}
        <div className="flex flex-col justify-between space-y-5 lg:col-span-5 p-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-[#0007cb] font-semibold bg-[#0007cb]/10 border border-[#0007cb]/30 px-2 py-0.5">
                {stage.badge}
              </span>
              <span className="font-mono text-xs text-[#a0a0a0]">
                STAGE {stage.stepNumber} OF 05
              </span>
            </div>

            <h4 className="mt-4 text-2xl font-normal text-[#111111] dark:text-[#f4f4f5] tracking-tight">
              {stage.title}
            </h4>

            <p className="mt-3 font-serif text-sm leading-relaxed text-[#585858] dark:text-[#a0a0a0]">
              {stage.explanation}
            </p>
          </div>

          <div className="border border-[#dedbd6] dark:border-[#2b3038] bg-[#faf9f6] dark:bg-[#181b20] p-3.5">
            <span className="font-mono text-[10px] uppercase text-[#a0a0a0] block mb-1">
              GUARANTEED SPECIFICATION
            </span>
            <div className="flex items-center justify-between text-xs font-semibold text-[#111111] dark:text-[#f4f4f5] font-mono">
              <span>{stage.specLink}</span>
              <span className="text-[#0007cb]">100% Enforced</span>
            </div>
          </div>
        </div>

        {/* Right Code/JSON Inspector Column (7 cols) */}
        <div className="border border-[#dedbd6] dark:border-[#2b3038] bg-[#f1eee9] dark:bg-[#181b20] p-3.5 lg:col-span-7 flex flex-col justify-between relative">
          <span className="absolute top-1.5 left-1.5 size-1.5 bg-[#d3cec6] dark:bg-[#383e48]" />
          <span className="absolute top-1.5 right-1.5 size-1.5 bg-[#d3cec6] dark:bg-[#383e48]" />

          <div className="flex items-center justify-between border-b border-[#dedbd6] dark:border-[#2b3038] pb-2 mb-2 bg-white dark:bg-[#121417] px-3 py-1.5">
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#111111] dark:text-[#f4f4f5]">
              <Code2 className="size-3.5 text-[#0007cb]" />
              <span>{stage.payloadTitle}</span>
            </div>
            <span className="font-mono text-[10px] text-[#a0a0a0]">VERIFIED SCHEMA</span>
          </div>

          <pre className="flex-1 overflow-x-auto bg-white dark:bg-[#121417] p-3.5 font-mono text-[11px] leading-relaxed text-[#111111] dark:text-[#f4f4f5] border border-[#dedbd6] dark:border-[#2b3038] max-h-[250px] scrollbar-hidden">
            <code>{stage.payload}</code>
          </pre>

          <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono text-[#707070] pt-1 px-1">
            <span>Latency check: {stage.metric}</span>
            <span className="text-[#0007cb] font-medium">✓ Cryptographically Auditable</span>
          </div>
        </div>
      </div>
    </div>
  );
}
