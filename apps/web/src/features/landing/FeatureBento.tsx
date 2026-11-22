import { useState } from "react";
import { Check, Copy, Lock } from "lucide-react";

type CapabilityKey = "collision" | "window" | "developer";

export function FeatureBento() {
  const [activeCap, setActiveCap] = useState<CapabilityKey>("collision");
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
    "body": "Your adjustment has been processed to card ending in 4921.",
    "mode": "agent_approved",
    "operator_id": "usr_sarah_02"
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
      {/* Chapter Lead */}
      <div className="mb-10 max-w-3xl">
        <div className="flex items-center gap-2 mb-3">
          <span className="size-2 bg-[#0007cb]" />
          <span className="font-mono text-xs uppercase tracking-wider text-[#111111] dark:text-[#f4f4f5]">
            CAPABILITY DEMONSTRATION • ARCHITECTED FOR RIGOR
          </span>
        </div>
        <h3 className="text-3xl sm:text-5xl font-normal tracking-[-0.0296em] text-[#111111] dark:text-[#f4f4f5] leading-[1.05]">
          <span className="text-[#a0a0a0]">Enterprise infrastructure,</span>
          <br />
          not brittle marketing wrappers.
        </h3>
        <p className="mt-4 font-serif text-base sm:text-lg text-[#585858] dark:text-[#a0a0a0] leading-relaxed max-w-2xl">
          Every layer is designed around official Meta Cloud API specifications, multi-agent queue
          dynamics, and verifiable knowledge grounding.
        </p>
      </div>

      {/* 60:40 Split Demonstration Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 border border-[#dedbd6] dark:border-[#2b3038] bg-white dark:bg-[#121417]">
        {/* Left Demonstration Stage (7 cols / approx 60%) */}
        <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-[#dedbd6] dark:border-[#2b3038] bg-[#f1eee9] dark:bg-[#181b20] p-6 sm:p-8 flex flex-col justify-between relative min-h-[460px]">
          {/* Subtle registration marks */}
          <span className="absolute top-2 left-2 size-1.5 bg-[#d3cec6] dark:bg-[#383e48]" />
          <span className="absolute bottom-2 left-2 size-1.5 bg-[#d3cec6] dark:bg-[#383e48]" />

          {/* Interactive Screen Display Based on Selected Capability */}
          {activeCap === "collision" && (
            <div className="flex-1 flex flex-col justify-center">
              <div className="border border-[#dedbd6] dark:border-[#2b3038] bg-white dark:bg-[#121417] p-5 shadow-sm">
                <div className="flex items-center justify-between border-b border-[#e7e7e7] dark:border-[#242830] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-[#0007cb] animate-pulse" />
                    <span className="font-mono text-xs font-semibold text-[#111111] dark:text-[#f4f4f5]">
                      CONVERSATION #FD-9941 • APEX LOGISTICS VIP
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 border border-[#ff5600]/30 bg-[#ff5600]/10 px-2 py-0.5 text-[10px] font-mono text-[#ff5600] font-semibold">
                    <Lock className="size-3" />
                    <span>THREAD LOCKED BY SARAH CHEN</span>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="border border-[#dedbd6] dark:border-[#2b3038] bg-[#faf9f6] dark:bg-[#181b20] p-3 text-xs text-[#111111] dark:text-[#f4f4f5]">
                    <p className="font-medium text-[#707070] text-[11px] mb-1">Customer Inbound:</p>
                    <p>
                      &ldquo;Please confirm if the 500-unit shipment tracking number has
                      updated.&rdquo;
                    </p>
                  </div>

                  <div className="border border-[#0007cb]/20 bg-[#0007cb]/5 p-3 text-xs text-[#111111] dark:text-[#f4f4f5]">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="size-5 bg-[#0007cb] text-white flex items-center justify-center font-bold text-[9px]">
                        SC
                      </div>
                      <span className="text-[11px] font-mono text-[#0007cb] font-semibold">
                        Sarah Chen is drafting an approved reply (Lock heartbeat: 800ms)
                      </span>
                    </div>
                    <p className="text-[#585858] dark:text-[#a0a0a0] italic text-[11px]">
                      Other operators attempting to reply will see a real-time lock barrier to
                      prevent double-replies.
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-2 border-t border-[#e7e7e7] dark:border-[#242830] pt-4 text-center font-mono">
                  <div>
                    <p className="text-lg font-bold text-[#111111] dark:text-[#f4f4f5]">0%</p>
                    <p className="text-[10px] text-[#707070]">Duplicate Replies</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-[#0007cb]">&lt; 45ms</p>
                    <p className="text-[10px] text-[#707070]">WebSocket Lock Sync</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-[#111111] dark:text-[#f4f4f5]">100%</p>
                    <p className="text-[10px] text-[#707070]">Audit Traceability</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeCap === "window" && (
            <div className="flex-1 flex flex-col justify-center">
              <div className="border border-[#dedbd6] dark:border-[#2b3038] bg-white dark:bg-[#121417] p-5 shadow-sm">
                <div className="flex items-center justify-between border-b border-[#e7e7e7] dark:border-[#242830] pb-3">
                  <span className="font-mono text-xs font-semibold text-[#111111] dark:text-[#f4f4f5]">
                    META 24-HOUR SERVICE WINDOW COMPLIANCE
                  </span>
                  <span className="font-mono text-[10px] text-[#0007cb] bg-[#0007cb]/10 border border-[#0007cb]/30 px-2 py-0.5">
                    POLICY ENFORCED
                  </span>
                </div>

                <div className="mt-5 text-center">
                  <div className="inline-flex size-20 items-center justify-center border-2 border-[#111111] dark:border-[#f4f4f5] bg-[#faf9f6] dark:bg-[#181b20]">
                    <span className="font-mono text-sm font-bold text-[#111111] dark:text-[#f4f4f5]">
                      23h 48m
                    </span>
                  </div>
                  <p className="mt-2 font-mono text-xs font-semibold text-[#111111] dark:text-[#f4f4f5]">
                    Active Care Session Window
                  </p>
                  <p className="mt-1 text-xs text-[#707070]">
                    Freeform customer replies allowed without template fees
                  </p>

                  <div className="mt-4 border border-[#dedbd6] dark:border-[#2b3038] bg-[#faf9f6] dark:bg-[#181b20] p-3 text-left">
                    <span className="font-mono text-[10px] uppercase text-[#a0a0a0] block mb-1">
                      EXPIRATION SAFEGUARD:
                    </span>
                    <p className="text-xs text-[#585858] dark:text-[#a0a0a0]">
                      Upon window expiration, freeform editor automatically locks and suggests your
                      pre-approved WhatsApp Utility HSM templates, protecting your WABA from quality
                      rating penalties.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeCap === "developer" && (
            <div className="flex-1 flex flex-col justify-center">
              <div className="border border-[#dedbd6] dark:border-[#2b3038] bg-white dark:bg-[#121417] p-5 shadow-sm">
                <div className="flex items-center justify-between border-b border-[#e7e7e7] dark:border-[#242830] pb-3">
                  <div className="flex items-center gap-1.5 font-mono text-xs">
                    {(["typescript", "curl", "python"] as const).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setActiveTab(lang)}
                        className={`px-2.5 py-1 text-xs font-mono uppercase transition-colors border ${
                          activeTab === lang
                            ? "bg-[#111111] dark:bg-[#f4f4f5] text-white dark:text-[#111111] border-[#111111] dark:border-[#f4f4f5]"
                            : "bg-[#faf9f6] dark:bg-[#181b20] text-[#707070] border-[#dedbd6] dark:border-[#2b3038] hover:text-[#111111]"
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleCopy}
                    className="h-7 px-2.5 text-xs font-mono border border-[#dedbd6] dark:border-[#2b3038] bg-white dark:bg-[#121417] text-[#111111] dark:text-[#f4f4f5] flex items-center gap-1 hover:border-[#111111]"
                  >
                    {copied ? (
                      <Check className="size-3 text-[#0007cb]" />
                    ) : (
                      <Copy className="size-3" />
                    )}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </button>
                </div>

                <div className="mt-3 border border-[#dedbd6] dark:border-[#2b3038] bg-[#faf9f6] dark:bg-[#181b20] p-3 overflow-x-auto max-h-[220px]">
                  <pre className="font-mono text-[11px] leading-relaxed text-[#111111] dark:text-[#f4f4f5]">
                    <code>{codeSnippets[activeTab]}</code>
                  </pre>
                </div>

                <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-[#a0a0a0]">
                  <span>• HMAC SHA-256 Signatures</span>
                  <span>• Scoped API Tokens</span>
                  <span className="text-[#0007cb] font-semibold">99.99% Delivery SLA</span>
                </div>
              </div>
            </div>
          )}

          <div className="mt-4 flex items-center justify-between font-mono text-[10px] text-[#a0a0a0] pt-2 border-t border-[#dedbd6] dark:border-[#2b3038]">
            <span>FLOWDESK OPERATIONAL ENGINE v20.0</span>
            <span className="text-[#0007cb]">● VERIFIED IN PRODUCTION</span>
          </div>
        </div>

        {/* Right Feature Selectors (5 cols / approx 40%) */}
        <div className="lg:col-span-5 flex flex-col justify-between divide-y divide-[#dedbd6] dark:divide-[#2b3038]">
          {/* Selector 1: Collision Guard */}
          <button
            onClick={() => setActiveCap("collision")}
            className={`relative p-6 text-left transition-all ${
              activeCap === "collision"
                ? "bg-[#f7f7f7] dark:bg-[#181b20]"
                : "bg-white dark:bg-[#121417] hover:bg-[#faf9f6] dark:hover:bg-[#15181e]"
            }`}
          >
            {activeCap === "collision" && (
              <span className="absolute top-0 left-0 right-0 h-[2px] bg-[#0007cb]" />
            )}
            <div className="flex items-center gap-2 mb-2">
              <span className="size-2 bg-[#0007cb]" />
              <span className="font-mono text-xs uppercase tracking-wider text-[#707070]">
                COLLISION PREVENTION
              </span>
            </div>
            <h4 className="text-xl font-semibold text-[#111111] dark:text-[#f4f4f5] tracking-tight">
              Shared Inbox with WebSocket Collision Guard
            </h4>
            <p className="mt-2 text-xs sm:text-sm text-[#585858] dark:text-[#a0a0a0] leading-relaxed">
              Eliminate duplicate customer responses forever. When any agent opens a ticket or
              focuses the compose field, FlowDesk broadcasts a sub-second heartbeat lock across all
              active operator screens.
            </p>
          </button>

          {/* Selector 2: Meta 24h Window */}
          <button
            onClick={() => setActiveCap("window")}
            className={`relative p-6 text-left transition-all ${
              activeCap === "window"
                ? "bg-[#f7f7f7] dark:bg-[#181b20]"
                : "bg-white dark:bg-[#121417] hover:bg-[#faf9f6] dark:hover:bg-[#15181e]"
            }`}
          >
            {activeCap === "window" && (
              <span className="absolute top-0 left-0 right-0 h-[2px] bg-[#0007cb]" />
            )}
            <div className="flex items-center gap-2 mb-2">
              <span className="size-2 bg-[#ff5600]" />
              <span className="font-mono text-xs uppercase tracking-wider text-[#707070]">
                META CLOUD API COMPLIANCE
              </span>
            </div>
            <h4 className="text-xl font-semibold text-[#111111] dark:text-[#f4f4f5] tracking-tight">
              24-Hour Service Window Enforcer & HSM Fallback
            </h4>
            <p className="mt-2 text-xs sm:text-sm text-[#585858] dark:text-[#a0a0a0] leading-relaxed">
              Official WhatsApp Cloud API policy strictly forbids freeform replies after 24 hours.
              FlowDesk tracks the window countdown dynamically and auto-suggests verified utility
              templates to protect your number from quality bans.
            </p>
          </button>

          {/* Selector 3: Developer API */}
          <button
            onClick={() => setActiveCap("developer")}
            className={`relative p-6 text-left transition-all ${
              activeCap === "developer"
                ? "bg-[#f7f7f7] dark:bg-[#181b20]"
                : "bg-white dark:bg-[#121417] hover:bg-[#faf9f6] dark:hover:bg-[#15181e]"
            }`}
          >
            {activeCap === "developer" && (
              <span className="absolute top-0 left-0 right-0 h-[2px] bg-[#0007cb]" />
            )}
            <div className="flex items-center gap-2 mb-2">
              <span className="size-2 bg-[#0007cb]" />
              <span className="font-mono text-xs uppercase tracking-wider text-[#707070]">
                INTEGRATION & EXTENSIBILITY
              </span>
            </div>
            <h4 className="text-xl font-semibold text-[#111111] dark:text-[#f4f4f5] tracking-tight">
              Developer-First REST API & Webhooks
            </h4>
            <p className="mt-2 text-xs sm:text-sm text-[#585858] dark:text-[#a0a0a0] leading-relaxed">
              Integrate WhatsApp customer support events directly into your ERP, billing database,
              or internal microservices. Fully specified under OpenAPI 3.1 with cryptographic HMAC
              signatures.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
