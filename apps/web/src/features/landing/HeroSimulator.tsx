import { useState } from "react";
import {
  Bot,
  Check,
  CheckCheck,
  Clock,
  FileText,
  Lock,
  RotateCcw,
  Send,
  ShieldCheck,
  Sparkles,
  Zap
} from "lucide-react";

interface Scenario {
  id: string;
  name: string;
  tag: string;
  customerName: string;
  customerOrg: string;
  customerPhone: string;
  customerAvatarBg: string;
  inboundTime: string;
  slaRemaining: string;
  slaStatus: "healthy" | "warning" | "expired";
  customerMessage: string;
  aiDraft: string;
  citationTitle: string;
  citationLine: string;
  citationSnippet: string;
  confidenceScore: number;
  safetyChecks: { label: string; passed: boolean }[];
  isTemplateFallback?: boolean;
  templateName?: string;
}

const scenarios: Scenario[] = [
  {
    id: "billing",
    name: "Billing Adjustment",
    tag: "Finance",
    customerName: "Marcus Vance",
    customerOrg: "Apex Logistics",
    customerPhone: "+1 (555) 019-2834",
    customerAvatarBg: "bg-blue-500/10 text-blue-600",
    inboundTime: "2m ago",
    slaRemaining: "12m left",
    slaStatus: "healthy",
    customerMessage:
      "Hi, we switched from monthly to annual tier yesterday, but our card was billed the full annual fee without deducting the $420 credit balance. Can you adjust this?",
    aiDraft:
      "Hello Marcus, thanks for reaching out. I verified your account credit. Under our Annual Billing Policy (Section 4), your unused $420 credit has been refunded to your original payment method. The net annual charge is now corrected.",
    citationTitle: "billing-policy-2026.pdf",
    citationLine: "Clause 4.2 • Lines 42–58",
    citationSnippet:
      "Annual upgrades process within 72 hours with full credit balance applied to original card.",
    confidenceScore: 98,
    safetyChecks: [
      { label: "Meta 24h Service Window: Active", passed: true },
      { label: "PII & Card Number Masked: Enforced", passed: true },
      { label: "Grounded Confidence Score > 90%: Passed (98%)", passed: true },
      { label: "Postgres Tenant RLS: Quarantined", passed: true }
    ]
  },
  {
    id: "webhook",
    name: "Webhook Ingress Spike",
    tag: "API & Dev",
    customerName: "Elena Rostova",
    customerOrg: "Finova Global",
    customerPhone: "+44 20 7946 0912",
    customerAvatarBg: "bg-purple-500/10 text-purple-600",
    inboundTime: "4m ago",
    slaRemaining: "06m left",
    slaStatus: "warning",
    customerMessage:
      "We're receiving 429 rate limit responses on the developer webhooks endpoint since 06:00 UTC. Are payloads backed up in Redis DLQ?",
    aiDraft:
      "Hi Elena, our webhook ingress gateway auto-scaled 3 workers to drain the queue. Your tenant HMAC signature verification is intact, and zero payloads were dropped; Redis retry locks are processing remaining batches with ~35ms latency.",
    citationTitle: "webhook-dlq-runbook.md",
    citationLine: "Ingress SLA • Lines 110–134",
    citationSnippet:
      "Webhook bursts exceeding 1,200 req/sec trigger atomic Redis buffering with zero event loss.",
    confidenceScore: 95,
    safetyChecks: [
      { label: "HMAC-SHA256 Signature: Cryptographically Valid", passed: true },
      { label: "Redis DLQ Idempotency: Deduplicated", passed: true },
      { label: "Tenant Context Boundary: Isolated", passed: true },
      { label: "Operator Collision Guard: Active", passed: true }
    ]
  },
  {
    id: "expiry",
    name: "24h Session Expiry",
    tag: "Compliance",
    customerName: "David K. Thornton",
    customerOrg: "Solaria Capital",
    customerPhone: "+1 (555) 839-2041",
    customerAvatarBg: "bg-amber-500/10 text-amber-600",
    inboundTime: "25h ago",
    slaRemaining: "EXPIRED (Meta 24h Window)",
    slaStatus: "expired",
    customerMessage:
      "Checking in on yesterday's wire transfer confirmation document for account #FD-9921.",
    aiDraft:
      "Meta 24-hour service window expired. Freeform reply is locked by Cloud API compliance policy. Switched to approved WhatsApp Utility HSM Template: 'transaction_document_ready'.",
    citationTitle: "meta-cloud-api-policy.md",
    citationLine: "Section 3.1 • 24h Window Rules",
    citationSnippet:
      "Freeform messages sent 24 hours after last inbound message will fail with Meta error code 131047.",
    confidenceScore: 100,
    isTemplateFallback: true,
    templateName: "transaction_document_ready",
    safetyChecks: [
      { label: "Meta Cloud API Compliance: 24h Window Expired", passed: true },
      { label: "Freeform Typing: Automatically Disabled", passed: true },
      { label: "Official HSM Template: Pre-Approved by Meta", passed: true },
      { label: "Zero Ban Risk: Guaranteed", passed: true }
    ]
  }
];

export function HeroSimulator() {
  const [activeScenarioId, setActiveScenarioId] = useState<string>("billing");
  const [isSent, setIsSent] = useState<Record<string, boolean>>({});
  const [editedText, setEditedText] = useState<Record<string, string>>({});
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const scenario = (scenarios.find((s) => s.id === activeScenarioId) ?? scenarios[0]) as Scenario;
  const sent = Boolean(isSent[scenario.id]);
  const currentDraft = editedText[scenario.id] ?? scenario.aiDraft;

  const handleSend = () => {
    setIsSent((prev) => ({ ...prev, [scenario.id]: true }));
    setIsEditing(false);
    setToastMessage(
      scenario.isTemplateFallback
        ? `HSM Template '${scenario.templateName}' delivered via Meta Cloud API (200 OK)`
        : `Grounded response approved & dispatched to ${scenario.customerPhone} (Latency: 240ms)`
    );
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleReset = () => {
    setIsSent((prev) => ({ ...prev, [scenario.id]: false }));
    setEditedText((prev) => {
      const next = { ...prev };
      delete next[scenario.id];
      return next;
    });
    setIsEditing(false);
    setToastMessage(null);
  };

  return (
    <div className="relative mx-auto w-full max-w-6xl rounded-none border border-[#dedbd6] dark:border-[#2b3038] bg-[#f1eee9] dark:bg-[#181b20] p-3 sm:p-5 shadow-sm">
      {/* 8px Corner Registration Marks */}
      <span className="absolute top-2 left-2 size-2 bg-[#d3cec6] dark:bg-[#383e48]" />
      <span className="absolute top-2 right-2 size-2 bg-[#d3cec6] dark:bg-[#383e48]" />
      <span className="absolute bottom-2 left-2 size-2 bg-[#d3cec6] dark:bg-[#383e48]" />
      <span className="absolute bottom-2 right-2 size-2 bg-[#d3cec6] dark:bg-[#383e48]" />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute -top-12 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-sm border border-[#0007cb] bg-[#0007cb] px-4 py-1.5 text-xs font-mono text-white shadow-xl animate-in fade-in slide-in-from-top-2">
          <CheckCheck className="size-4 text-white" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Simulator Top Bar / Scenario Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#dedbd6] dark:border-[#2b3038] pb-3 sm:px-1">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-none border border-[#dedbd6] dark:border-[#2b3038] bg-white dark:bg-[#121417] px-2.5 py-1 text-xs font-mono text-[#111111] dark:text-[#f4f4f5]">
            <span className="size-2 bg-[#0007cb]" />
            <span>SANDBOX RUNTIME: META CLOUD API v20.0</span>
          </div>
          <span className="hidden text-xs text-[#707070] md:inline font-mono">
            Grounding & Policy Gate Sandbox
          </span>
        </div>

        {/* Scenario Selectors */}
        <div className="flex items-center gap-1">
          <span className="hidden text-xs text-[#a0a0a0] lg:inline font-mono mr-1 uppercase">
            SCENARIO:
          </span>
          {scenarios.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setActiveScenarioId(s.id);
                setIsEditing(false);
              }}
              className={`rounded-none px-3 py-1 text-xs font-mono transition-all border ${
                s.id === scenario.id
                  ? "bg-[#111111] dark:bg-[#f4f4f5] text-white dark:text-[#111111] border-[#111111] dark:border-[#f4f4f5] font-semibold"
                  : "bg-white dark:bg-[#121417] text-[#585858] border-[#dedbd6] dark:border-[#2b3038] hover:text-[#111111] dark:hover:text-[#f4f4f5]"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      {/* 3-Panel Main Workspace */}
      <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-12">
        {/* Left Panel: Triage Queue (3 cols) */}
        <div className="flex flex-col gap-2 rounded-none border border-[#dedbd6] dark:border-[#2b3038] bg-white dark:bg-[#121417] p-3 lg:col-span-3">
          <div className="flex items-center justify-between border-b border-[#e7e7e7] dark:border-[#242830] pb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#111111] dark:text-[#f4f4f5]">
              INBOX QUEUE (3)
            </span>
            <span className="font-mono text-[10px] text-[#0007cb] font-semibold">LIVE</span>
          </div>

          <div className="space-y-2">
            {scenarios.map((s) => {
              const active = s.id === scenario.id;
              const completed = Boolean(isSent[s.id]);
              return (
                <div
                  key={s.id}
                  onClick={() => {
                    setActiveScenarioId(s.id);
                    setIsEditing(false);
                  }}
                  className={`group relative cursor-pointer border p-2.5 transition-all ${
                    active
                      ? "border-[#0007cb] bg-[#f7f7f7] dark:bg-[#1e2128]"
                      : "border-[#e7e7e7] dark:border-[#242830] bg-white dark:bg-[#121417] hover:border-[#dedbd6]"
                  }`}
                >
                  {/* Selection indicator line */}
                  {active && (
                    <span className="absolute top-0 left-0 bottom-0 w-[2px] bg-[#0007cb]" />
                  )}

                  <div className="flex items-start justify-between gap-1 pl-1">
                    <span className="text-xs font-semibold text-[#111111] dark:text-[#f4f4f5]">
                      {s.customerName}
                    </span>
                    <span className="font-mono text-[10px] text-[#a0a0a0]">{s.inboundTime}</span>
                  </div>

                  <p className="mt-1 line-clamp-1 text-[11px] text-[#585858] dark:text-[#a0a0a0] pl-1">
                    {s.customerMessage}
                  </p>

                  <div className="mt-2 flex items-center justify-between pl-1">
                    <span className="bg-[#f1eee9] dark:bg-[#181b20] px-1.5 py-0.5 text-[10px] font-mono text-[#585858] dark:text-[#a0a0a0]">
                      {s.tag}
                    </span>

                    <div className="flex items-center gap-1 font-mono text-[10px]">
                      {completed ? (
                        <span className="flex items-center gap-1 text-[#0007cb] font-medium">
                          <Check className="size-3" /> Sent
                        </span>
                      ) : (
                        <span
                          className={`flex items-center gap-1 ${
                            s.slaStatus === "expired"
                              ? "text-[#ff5600] font-semibold"
                              : s.slaStatus === "warning"
                                ? "text-amber-600 font-medium"
                                : "text-[#0007cb]"
                          }`}
                        >
                          <Clock className="size-3" />
                          {s.slaRemaining}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center Panel: WhatsApp Conversation Stream (5 cols) */}
        <div className="flex flex-col justify-between rounded-none border border-[#dedbd6] dark:border-[#2b3038] bg-white dark:bg-[#121417] p-4 lg:col-span-5 min-h-[420px]">
          <div>
            {/* Thread Header */}
            <div className="flex items-center justify-between border-b border-[#e7e7e7] dark:border-[#242830] pb-3">
              <div className="flex items-center gap-2.5">
                <div
                  className={`flex size-8 items-center justify-center font-bold text-xs ${scenario.customerAvatarBg}`}
                >
                  {scenario.customerName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#111111] dark:text-[#f4f4f5]">
                    {scenario.customerName}
                  </h4>
                  <p className="text-[10px] text-[#707070]">
                    {scenario.customerOrg} •{" "}
                    <span className="font-mono">{scenario.customerPhone}</span>
                  </p>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-1.5 text-right font-mono text-[10px]">
                {scenario.isTemplateFallback ? (
                  <span className="bg-[#ff5600]/10 text-[#ff5600] px-2 py-0.5 border border-[#ff5600]/30">
                    24h Expired
                  </span>
                ) : (
                  <span className="bg-[#0007cb]/10 text-[#0007cb] px-2 py-0.5 border border-[#0007cb]/30">
                    24h Active
                  </span>
                )}
              </div>
            </div>

            {/* Conversation Messages */}
            <div className="mt-4 space-y-3">
              {/* Customer Inbound Bubble */}
              <div className="flex flex-col items-start">
                <div className="max-w-[85%] border border-[#dedbd6] dark:border-[#2b3038] bg-[#faf9f6] dark:bg-[#181b20] p-3 text-xs leading-relaxed text-[#111111] dark:text-[#f4f4f5]">
                  <p>{scenario.customerMessage}</p>
                  <div className="mt-1 flex items-center justify-end gap-1 font-mono text-[9px] text-[#a0a0a0]">
                    <span>{scenario.inboundTime}</span>
                    <span>✓ Delivered</span>
                  </div>
                </div>
              </div>

              {/* Agent Outbound Status or Sent Bubble */}
              {sent ? (
                <div className="flex flex-col items-end">
                  <div className="max-w-[85%] border border-[#0007cb]/30 bg-[#0007cb]/5 p-3 text-xs leading-relaxed text-[#111111] dark:text-[#f4f4f5]">
                    {scenario.isTemplateFallback && (
                      <div className="mb-1.5 flex items-center gap-1 text-[10px] font-mono text-[#0007cb] font-semibold">
                        <Lock className="size-3" />
                        <span>APPROVED HSM TEMPLATE ({scenario.templateName})</span>
                      </div>
                    )}
                    <p>{currentDraft}</p>
                    <div className="mt-1 flex items-center justify-end gap-1 font-mono text-[9px] text-[#0007cb]">
                      <span>Just now</span>
                      <CheckCheck className="size-3.5" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-none border border-dashed border-[#dedbd6] dark:border-[#2b3038] bg-[#f7f7f7] dark:bg-[#181b20] p-3 text-center">
                  <div className="flex items-center justify-center gap-1.5 text-xs text-[#707070] font-mono">
                    <Sparkles className="size-3.5 text-[#0007cb]" />
                    <span>AI Knowledge Draft Ready for Human Approval</span>
                  </div>
                  <p className="mt-1 text-[11px] text-[#a0a0a0]">
                    Grounded with 1 citation from official knowledge base
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Input Simulation Bar */}
          <div className="mt-4 border-t border-[#e7e7e7] dark:border-[#242830] pt-3">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#a0a0a0]">
              <span className="flex items-center gap-1 text-[#0007cb]">
                <ShieldCheck className="size-3.5" />
                <span>OFFICIAL META CLOUD API CONNECTOR</span>
              </span>
              <span>TLS 1.3 ENCRYPTED</span>
            </div>
          </div>
        </div>

        {/* Right Panel: Grounded AI Co-Pilot & Safety Gates (4 cols) */}
        <div className="flex flex-col justify-between rounded-none border border-[#dedbd6] dark:border-[#2b3038] bg-white dark:bg-[#121417] p-4 lg:col-span-4">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#e7e7e7] dark:border-[#242830] pb-2.5">
              <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-[#111111] dark:text-[#f4f4f5]">
                <Bot className="size-4 text-[#0007cb]" />
                <span>GROUNDED COPILOT</span>
              </div>
              <div className="flex items-center gap-1 font-mono text-[10px] text-[#0007cb] font-bold">
                <Zap className="size-3" />
                <span>{scenario.confidenceScore}% GROUNDED</span>
              </div>
            </div>

            {/* Knowledge Base Citation Source */}
            <div className="mt-3 border border-[#dedbd6] dark:border-[#2b3038] bg-[#faf9f6] dark:bg-[#181b20] p-2.5">
              <div className="flex items-center justify-between text-[10px] font-mono text-[#707070]">
                <span className="flex items-center gap-1 text-[#0007cb] font-semibold">
                  <FileText className="size-3" /> CITATION SOURCE
                </span>
                <span>{scenario.citationLine}</span>
              </div>
              <p className="mt-1 text-xs font-semibold text-[#111111] dark:text-[#f4f4f5] truncate">
                {scenario.citationTitle}
              </p>
              <p className="mt-1.5 p-1.5 text-[11px] leading-relaxed text-[#585858] dark:text-[#a0a0a0] border-l-2 border-[#0007cb] bg-white dark:bg-[#121417]">
                {scenario.citationSnippet}
              </p>
            </div>

            {/* Draft Content Box */}
            <div className="mt-3">
              <div className="flex items-center justify-between text-[10px] font-mono text-[#707070] mb-1">
                <span>SUGGESTED RESPONSE</span>
                {isEditing ? (
                  <button
                    onClick={() => setIsEditing(false)}
                    className="text-[#0007cb] hover:underline"
                  >
                    Done editing
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    disabled={sent}
                    className="text-[#0007cb] hover:underline disabled:opacity-50"
                  >
                    Edit draft
                  </button>
                )}
              </div>

              {isEditing ? (
                <textarea
                  value={currentDraft}
                  onChange={(e) =>
                    setEditedText((prev) => ({ ...prev, [scenario.id]: e.target.value }))
                  }
                  className="w-full border border-[#0007cb] bg-white dark:bg-[#121417] p-2.5 text-xs text-[#111111] dark:text-[#f4f4f5] focus:outline-none min-h-[85px]"
                />
              ) : (
                <div className="border border-[#e7e7e7] dark:border-[#242830] bg-[#f7f7f7] dark:bg-[#181b20] p-2.5 text-xs leading-relaxed text-[#111111] dark:text-[#f4f4f5] min-h-[85px]">
                  {currentDraft}
                </div>
              )}
            </div>

            {/* Policy & Safety Checks */}
            <div className="mt-3 space-y-1">
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#a0a0a0]">
                DETERMINISTIC SAFETY GATES
              </span>
              <div className="grid grid-cols-1 gap-1">
                {scenario.safetyChecks.map((check, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 text-[10px] text-[#585858] dark:text-[#a0a0a0] font-mono"
                  >
                    <Check className="size-3 text-[#0007cb] shrink-0" />
                    <span className="truncate">{check.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Trigger Buttons (40px Height, 4px Corner, #111111 Fill) */}
          <div className="mt-4 pt-2 border-t border-[#e7e7e7] dark:border-[#242830] flex flex-col gap-2">
            {sent ? (
              <button
                onClick={handleReset}
                className="w-full h-10 px-3.5 rounded-[4px] border border-[#111111] dark:border-[#f4f4f5] bg-transparent text-[#111111] dark:text-[#f4f4f5] text-xs font-mono font-medium hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="size-3.5" /> Reset Scenario
              </button>
            ) : (
              <button
                onClick={handleSend}
                className="w-full h-10 px-3.5 rounded-[4px] bg-[#111111] dark:bg-[#f4f4f5] text-white dark:text-[#111111] hover:bg-[#0007cb] dark:hover:bg-[#0007cb] dark:hover:text-white transition-colors text-xs font-mono font-semibold shadow-xs flex items-center justify-center gap-2"
              >
                <Send className="size-3.5" />
                {scenario.isTemplateFallback
                  ? "Approve & Send Meta Template"
                  : "Approve & Send to WhatsApp"}
              </button>
            )}
            <span className="text-center font-mono text-[9px] text-[#a0a0a0]">
              Human-in-the-loop guarantee: AI never sends without your policy's consent.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
