import { useState } from "react";
import { Check, Clock, Code2, Copy, Database, FileText, Lock, Users } from "lucide-react";
import { Badge, Button } from "@flowdesk/ui";

export function FeatureBento() {
  const [activeTab, setActiveTab] = useState<"curl" | "typescript" | "python">("typescript");
  const [copied, setCopied] = useState<boolean>(false);

  const codeSnippets = {
    typescript: `import { FlowDeskClient } from "@flowdesk/sdk";

const flowdesk = new FlowDeskClient({
  apiKey: process.env.FLOWDESK_API_KEY!,
  webhookSecret: process.env.FLOWDESK_WEBHOOK_SECRET!
});

// Handle verified inbound WhatsApp webhook
export async function handleWebhook(req: Request) {
  const event = await flowdesk.webhooks.verifyAndParse(req);

  if (event.type === "conversation.ai_draft_ready") {
    console.log(\`Draft ready for \${event.data.customer.phone}: \${event.data.draft.text}\`);
    console.log(\`Citation: \${event.data.draft.citations[0].document} (Confidence: \${event.data.draft.confidence})\`);
  }
}`,
    curl: `curl -X POST https://api.flowdesk.nylo.me/v1/conversations/conv_88192/reply \\
  -H "Authorization: Bearer fd_live_99a8b7c6d5e4" \\
  -H "Content-Type: application/json" \\
  -d '{
    "body": "Your hardware shipment has departed hub. Tracking: https://track.co/881",
    "mode": "agent_approved",
    "operator_id": "usr_alex_01"
  }'`,
    python: `from flowdesk import FlowDesk

client = FlowDesk(api_key="fd_live_99a8b7c6d5e4")

# Trigger deterministic grounded knowledge extraction
draft = client.copilot.generate_draft(
    conversation_id="conv_88192",
    strict_citations=True,
    min_confidence=0.90
)

print(f"Confidence: {draft.confidence}% | Source: {draft.citations[0].document}")`
  };

  const handleCopy = () => {
    void navigator.clipboard.writeText(codeSnippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="mx-auto max-w-3xl text-center mb-12">
        <Badge variant="outline" className="mb-3 font-mono text-xs">
          ENTERPRISE CAPABILITIES • BUILT FOR RELIABILITY
        </Badge>
        <h3 className="text-3xl font-bold tracking-tight sm:text-5xl text-foreground">
          Engineered for operational rigor,{" "}
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            not demo tricks.
          </span>
        </h3>
        <p className="mt-4 text-sm text-muted-foreground sm:text-lg">
          Every layer is designed around official Meta guidelines, multi-agent queue dynamics, and
          verifiable knowledge grounding.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Bento 1: Shared Inbox with Collision Guard (8 cols) */}
        <div className="md:col-span-8 rounded-2xl border border-border/80 bg-card/60 p-5 sm:p-7 shadow-sm backdrop-blur-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="rounded-lg bg-blue-500/10 p-2 text-blue-400">
                <Users className="size-5" />
              </span>
              <Badge variant="outline" className="font-mono text-[10px]">
                Active Collision Detection
              </Badge>
            </div>
            <h4 className="mt-4 text-lg sm:text-xl font-bold text-foreground">
              Multi-Agent Shared Inbox with Real-Time Collision Guard
            </h4>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Eliminate double-replies forever. When an agent opens a ticket or starts typing,
              FlowDesk instantaneously locks the thread across all other connected operators via
              WebSockets.
            </p>

            {/* Interactive Mock Triage Card */}
            <div className="mt-6 rounded-xl border border-border/70 bg-background/80 p-3.5 shadow-xs">
              <div className="flex items-center justify-between border-b border-border/40 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-xs font-semibold text-foreground">
                    Thread #FD-9941 • Apex Logistics VIP
                  </span>
                </div>
                <div className="flex items-center gap-1.5 rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-mono text-amber-400">
                  <Lock className="size-3" />
                  <span>THREAD LOCKED BY SARAH CHEN</span>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="size-6 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-[10px]">
                    SC
                  </div>
                  <span className="text-muted-foreground text-[11px]">
                    Sarah is currently drafting an approved reply (Typing...)
                  </span>
                </div>
                <span className="font-mono text-[10px] text-muted-foreground">SLA: 06m 12s</span>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 border-t border-border/50 pt-4 text-center">
            <div>
              <p className="font-mono text-base sm:text-lg font-bold text-foreground">0%</p>
              <p className="text-[11px] text-muted-foreground">Duplicate Replies</p>
            </div>
            <div>
              <p className="font-mono text-base sm:text-lg font-bold text-foreground">&lt; 50ms</p>
              <p className="text-[11px] text-muted-foreground">WebSocket Lock Sync</p>
            </div>
            <div>
              <p className="font-mono text-base sm:text-lg font-bold text-foreground">100%</p>
              <p className="text-[11px] text-muted-foreground">Audit Log Traceability</p>
            </div>
          </div>
        </div>

        {/* Bento 2: Meta 24-Hour Service Window Enforcer (4 cols) */}
        <div className="md:col-span-4 rounded-2xl border border-border/80 bg-card/60 p-5 sm:p-7 shadow-sm backdrop-blur-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="rounded-lg bg-emerald-500/10 p-2 text-emerald-400">
                <Clock className="size-5" />
              </span>
              <Badge variant="outline" className="font-mono text-[10px]">
                Meta Compliance
              </Badge>
            </div>
            <h4 className="mt-4 text-lg font-bold text-foreground">Meta 24h Window Enforcer</h4>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              Official WhatsApp Cloud API policy forbids freeform replies after 24 hours. FlowDesk
              tracks the countdown and auto-switches to approved utility templates.
            </p>

            <div className="mt-5 rounded-xl border border-border/70 bg-background/80 p-3.5 text-center">
              <div className="inline-flex size-16 items-center justify-center rounded-full border-2 border-primary/40 bg-primary/10">
                <span className="font-mono text-xs font-bold text-primary">23h 48m</span>
              </div>
              <p className="mt-2 text-[11px] font-mono text-muted-foreground">
                Session Window Active
              </p>
              <div className="mt-2 rounded bg-muted/40 py-1 text-[10px] font-mono text-emerald-400">
                ✓ Freeform Customer Care Allowed
              </div>
            </div>
          </div>

          <p className="mt-4 text-[11px] text-muted-foreground border-t border-border/50 pt-3">
            Automatic template fallback prevents WhatsApp account quality penalties and bans.
          </p>
        </div>

        {/* Bento 3: Grounded Knowledge Base & Semantic Search (4 cols) */}
        <div className="md:col-span-4 rounded-2xl border border-border/80 bg-card/60 p-5 sm:p-7 shadow-sm backdrop-blur-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="rounded-lg bg-purple-500/10 p-2 text-purple-400">
                <Database className="size-5" />
              </span>
              <Badge variant="outline" className="font-mono text-[10px]">
                pgvector HNSW
              </Badge>
            </div>
            <h4 className="mt-4 text-lg font-bold text-foreground">Grounded Knowledge Base</h4>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              Upload your official PDFs, Markdown, and product SOPs. FlowDesk chunks, embeds, and
              links every AI response directly to source paragraph line numbers.
            </p>

            <div className="mt-5 space-y-2">
              <div className="flex items-center justify-between rounded-lg border border-border/60 bg-background/80 p-2 text-[11px]">
                <span className="flex items-center gap-1.5 font-medium truncate">
                  <FileText className="size-3.5 text-primary" /> return-policy-v3.pdf
                </span>
                <span className="font-mono text-[10px] text-emerald-500">98.4% Match</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border/60 bg-background/80 p-2 text-[11px]">
                <span className="flex items-center gap-1.5 font-medium truncate">
                  <FileText className="size-3.5 text-primary" /> api-spec-v2.md
                </span>
                <span className="font-mono text-[10px] text-emerald-500">97.1% Match</span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3 text-[11px] text-muted-foreground">
            <span>Vector Dimensions: 1536</span>
            <span className="text-primary font-mono font-medium">Zero Hallucinations</span>
          </div>
        </div>

        {/* Bento 4: Developer Platform & Webhook Subscriptions (8 cols) */}
        <div className="md:col-span-8 rounded-2xl border border-border/80 bg-card/60 p-5 sm:p-7 shadow-sm backdrop-blur-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-primary/10 p-2 text-primary">
                  <Code2 className="size-5" />
                </span>
                <div className="flex items-center gap-1 rounded-lg border border-border/60 bg-muted/40 p-0.5">
                  {(["typescript", "curl", "python"] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setActiveTab(lang)}
                      className={`rounded px-2.5 py-0.5 text-xs font-mono font-medium transition-all ${
                        activeTab === lang
                          ? "bg-background text-foreground shadow-xs"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="h-7 text-xs gap-1 font-mono text-muted-foreground hover:text-foreground"
              >
                {copied ? (
                  <Check className="size-3 text-emerald-500" />
                ) : (
                  <Copy className="size-3" />
                )}
                <span>{copied ? "Copied" : "Copy"}</span>
              </Button>
            </div>

            <h4 className="mt-4 text-lg sm:text-xl font-bold text-foreground">
              Developer-First REST API & Webhook Subscriptions
            </h4>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Integrate WhatsApp conversations into your CRM, ERP, or internal microservices.
              FlowDesk publishes HMAC-signed events for every message, draft, and delivery
              milestone.
            </p>

            <div className="mt-4 overflow-hidden rounded-xl border border-border/80 bg-background/90 shadow-inner">
              <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-foreground max-h-[170px] scrollbar-hidden">
                <code>{codeSnippets[activeTab]}</code>
              </pre>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border/50 pt-3 text-[11px] text-muted-foreground font-mono">
            <span>• Scoped API Keys</span>
            <span>• HMAC-SHA256 Signatures</span>
            <span>• OpenAPI 3.1 Specification</span>
            <span className="text-emerald-500">● 99.99% Webhook Delivery SLA</span>
          </div>
        </div>
      </div>
    </div>
  );
}
