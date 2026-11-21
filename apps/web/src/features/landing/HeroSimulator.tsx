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
import { Badge, Button } from "@flowdesk/ui";

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
    customerAvatarBg: "bg-blue-500/20 text-blue-400",
    inboundTime: "2m ago",
    slaRemaining: "08:42",
    slaStatus: "healthy",
    customerMessage:
      "Hi FlowDesk team! I upgraded to the annual Enterprise plan yesterday by mistake instead of monthly. Can I please get the difference credited back to my corporate card?",
    aiDraft:
      "Hi Marcus! Absolutely, no problem at all. Under our 14-day billing guarantee (Clause 4.2), annual-to-monthly adjustments within 72 hours are processed with a full difference credit back to your card. I've prepared a refund of $1,440.00 back to your original payment method. Shall I confirm and execute this for you right now?",
    citationTitle: "docs/kb/billing-policy-2026.pdf",
    citationLine: "Section 4.2 • Lines 42–58",
    citationSnippet:
      "“Customers modifying annual subscriptions within seventy-two (72) hours of payment receipt are entitled to a full pro-rated adjustment back to original payment source without cancellation penalties.”",
    confidenceScore: 98.4,
    safetyChecks: [
      { label: "Meta 24h Window Active (23h 58m left)", passed: true },
      { label: "PII & Card Tokens Redacted", passed: true },
      { label: "Strict Knowledge Base Grounded", passed: true },
      { label: "No Hallucinated Commitments", passed: true }
    ]
  },
  {
    id: "technical",
    name: "Webhook Ingress",
    tag: "Developer",
    customerName: "Devon Reed",
    customerOrg: "HyperScale Systems",
    customerPhone: "+44 20 7946 0912",
    customerAvatarBg: "bg-emerald-500/20 text-emerald-400",
    inboundTime: "4m ago",
    slaRemaining: "04:18",
    slaStatus: "warning",
    customerMessage:
      "Our ingress gateway is rejecting FlowDesk webhook dispatches with 401 Unauthorized. What exact header name and hash algorithm is expected for payload verification?",
    aiDraft:
      "Hey Devon! FlowDesk dispatches the signature in the `X-FlowDesk-Signature` header in `sha256=<hex_digest>` format. Make sure you compute the HMAC SHA-256 over the raw request payload body using your signing secret from Developer Settings > Webhook Keys. I've linked our verification code snippets below if you need a quick drop-in handler!",
    citationTitle: "docs/spec/developer-webhooks.md",
    citationLine: "Authentication • Lines 88–104",
    citationSnippet:
      "“All outbound webhooks include an HMAC SHA-256 signature calculated over the raw UTF-8 payload bytes using the endpoint’s pre-shared signing secret: `X-FlowDesk-Signature: sha256=<digest>`.”",
    confidenceScore: 99.1,
    safetyChecks: [
      { label: "Meta 24h Window Active (23h 56m left)", passed: true },
      { label: "No Sensitive Signing Keys Exposed", passed: true },
      { label: "OpenAPI 3.1 Contract Verified", passed: true },
      { label: "Technical Accuracy Verified", passed: true }
    ]
  },
  {
    id: "template",
    name: "24h Session Expiry",
    tag: "Compliance",
    customerName: "Elena Rostova",
    customerOrg: "Nordic Commerce",
    customerPhone: "+49 30 123456",
    customerAvatarBg: "bg-amber-500/20 text-amber-400",
    inboundTime: "25h ago",
    slaRemaining: "Expired (24h+)",
    slaStatus: "expired",
    customerMessage: "Hello, following up on our hardware shipment status from earlier this week.",
    isTemplateFallback: true,
    templateName: "order_shipping_update_v2",
    aiDraft:
      "Hi Elena, your hardware shipment (Order #FD-88391) has departed the central distribution hub and is scheduled for delivery on Monday, Nov 24. Live GPS tracking: https://track.flowdesk.com/fd-88391",
    citationTitle: "Meta WhatsApp Cloud API Policy",
    citationLine: "Customer Care Window • Rule 3.1",
    citationSnippet:
      "“Outside the 24-hour customer service window, businesses may only communicate using pre-approved Meta message templates (HSM) across utility, marketing, or authentication categories.”",
    confidenceScore: 100.0,
    safetyChecks: [
      { label: "Freeform Message Blocked by Engine", passed: true },
      { label: "Meta Approved HSM Template Selected", passed: true },
      { label: "Parameter Variables Injected Safely", passed: true },
      { label: "Zero Risk of Meta Quality Score Penalty", passed: true }
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
    <div className="relative mx-auto w-full max-w-6xl rounded-2xl border border-white/10 bg-card/60 p-2 shadow-2xl backdrop-blur-xl sm:p-4">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute -top-12 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/90 px-4 py-1.5 text-xs font-medium text-emerald-300 shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-top-2">
          <CheckCheck className="size-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Simulator Top Bar / Scenario Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-3 sm:px-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-lg border border-border/80 bg-background/80 px-2.5 py-1 text-xs font-mono text-muted-foreground">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>SANDBOX RUNTIME: META CLOUD API v20.0</span>
          </div>
          <span className="hidden text-xs text-muted-foreground md:inline">
            Interactive Agent Co-Pilot Simulator
          </span>
        </div>

        {/* Scenario Pills */}
        <div className="flex items-center gap-1.5">
          <span className="hidden text-xs text-muted-foreground lg:inline font-mono mr-1">
            SCENARIO:
          </span>
          {scenarios.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setActiveScenarioId(s.id);
                setIsEditing(false);
              }}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                s.id === scenario.id
                  ? "bg-primary text-primary-foreground shadow-sm font-semibold"
                  : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      {/* 3-Panel Main Workspace */}
      <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-12">
        {/* Left Panel: Triage Queue (3 cols) */}
        <div className="flex flex-col gap-2 rounded-xl border border-border/60 bg-background/50 p-3 lg:col-span-3">
          <div className="flex items-center justify-between border-b border-border/40 pb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-mono">
              INBOX QUEUE (3)
            </span>
            <Badge variant="outline" className="text-[10px] py-0 px-1.5 h-4">
              Real-time
            </Badge>
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
                  className={`group relative cursor-pointer rounded-lg border p-2.5 transition-all ${
                    active
                      ? "border-primary/50 bg-primary/5 shadow-sm"
                      : "border-border/40 bg-card/40 hover:border-border hover:bg-muted/30"
                  }`}
                >
                  <div className="flex items-start justify-between gap-1">
                    <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                      {s.customerName}
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {s.inboundTime}
                    </span>
                  </div>

                  <p className="mt-1 line-clamp-1 text-[11px] text-muted-foreground">
                    {s.customerMessage}
                  </p>

                  <div className="mt-2 flex items-center justify-between">
                    <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
                      {s.tag}
                    </span>

                    <div className="flex items-center gap-1 font-mono text-[10px]">
                      {completed ? (
                        <span className="flex items-center gap-1 text-emerald-500 font-medium">
                          <Check className="size-3" /> Resolved
                        </span>
                      ) : (
                        <span
                          className={`flex items-center gap-1 ${
                            s.slaStatus === "expired"
                              ? "text-amber-500"
                              : s.slaStatus === "warning"
                                ? "text-amber-400"
                                : "text-muted-foreground"
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

          {/* Quick Stats Footnote */}
          <div className="mt-auto rounded-lg border border-border/40 bg-muted/20 p-2 text-[11px] text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>Collision Lock:</span>
              <span className="font-mono text-emerald-500">Active (0 clashes)</span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span>Avg Draft Latency:</span>
              <span className="font-mono text-foreground font-medium">1.4s</span>
            </div>
          </div>
        </div>

        {/* Center Panel: WhatsApp Conversation Stream (5 cols) */}
        <div className="flex flex-col justify-between rounded-xl border border-border/60 bg-muted/10 p-3 lg:col-span-5">
          {/* WhatsApp Header */}
          <div className="flex items-center justify-between border-b border-border/40 pb-2.5">
            <div className="flex items-center gap-2">
              <div
                className={`flex size-8 items-center justify-center rounded-full font-bold text-xs ${scenario.customerAvatarBg}`}
              >
                {scenario.customerName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-foreground">
                    {scenario.customerName}
                  </span>
                  <Badge variant="outline" className="text-[9px] py-0 px-1 h-3.5">
                    {scenario.customerOrg}
                  </Badge>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  <span>{scenario.customerPhone}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {scenario.isTemplateFallback && (
                <span className="rounded bg-amber-500/10 px-2 py-0.5 text-[10px] font-mono text-amber-500 border border-amber-500/20">
                  24h Window Closed
                </span>
              )}
            </div>
          </div>

          {/* WhatsApp Message Bubble Stream */}
          <div className="my-3 flex flex-1 flex-col gap-3 overflow-y-auto pr-1">
            {/* Encryption & Policy Notice */}
            <div className="mx-auto flex items-center gap-1.5 rounded-md bg-muted/40 px-2.5 py-1 text-[10px] text-muted-foreground font-mono">
              <Lock className="size-3 text-muted-foreground" />
              <span>Official Meta Cloud API • End-to-end verified</span>
            </div>

            {/* Inbound Customer Bubble */}
            <div className="flex max-w-[85%] flex-col items-start">
              <div className="rounded-2xl rounded-tl-sm border border-border/60 bg-background p-3 text-xs leading-relaxed text-foreground shadow-sm">
                <p>{scenario.customerMessage}</p>
                <div className="mt-1 flex items-center justify-end gap-1 text-[9px] text-muted-foreground font-mono">
                  <span>{scenario.inboundTime}</span>
                  <CheckCheck className="size-3 text-emerald-500" />
                </div>
              </div>
            </div>

            {/* Outbound Agent Bubble (If sent) */}
            {sent && (
              <div className="flex max-w-[88%] self-end flex-col items-end animate-in fade-in slide-in-from-bottom-2">
                <div className="rounded-2xl rounded-tr-sm border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs leading-relaxed text-foreground shadow-sm">
                  {scenario.isTemplateFallback && (
                    <div className="mb-1.5 flex items-center gap-1 font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
                      <Zap className="size-3" />
                      <span>APPROVED HSM TEMPLATE ({scenario.templateName})</span>
                    </div>
                  )}
                  <p>{currentDraft}</p>
                  <div className="mt-1.5 flex items-center justify-end gap-1 text-[9px] text-emerald-600 dark:text-emerald-400 font-mono">
                    <span>Just now</span>
                    <span>• Delivered</span>
                    <CheckCheck className="size-3.5 text-blue-500" />
                  </div>
                </div>
                <span className="mt-0.5 text-[9px] text-muted-foreground font-mono">
                  Dispatched via Meta Cloud API
                </span>
              </div>
            )}
          </div>

          {/* Bottom Chat Bar Indicator */}
          <div className="rounded-lg border border-border/40 bg-background/60 p-2 text-xs">
            {sent ? (
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5 text-emerald-500 font-medium text-[11px]">
                  <Check className="size-3.5" /> Response delivered to customer
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleReset}
                  className="h-6 text-xs gap-1"
                >
                  <RotateCcw className="size-3" /> Try Again
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="size-3 text-primary animate-spin" />
                  <span>AI Co-pilot generated a grounded reply ready for approval</span>
                </span>
                <span className="font-mono text-[10px] text-primary">Review ➔</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel: Grounded AI Copilot & Policy Gate (4 cols) */}
        <div className="flex flex-col justify-between rounded-xl border border-primary/30 bg-primary/5 p-3.5 lg:col-span-4">
          <div>
            {/* Co-Pilot Header */}
            <div className="flex items-center justify-between border-b border-primary/20 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-primary/20 p-1 text-primary">
                  <Bot className="size-4" />
                </span>
                <div>
                  <h4 className="text-xs font-bold text-foreground">Grounded AI Copilot</h4>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    Deterministic RAG Engine
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono font-semibold text-emerald-400">
                <ShieldCheck className="size-3" />
                <span>{scenario.confidenceScore}% GROUNDED</span>
              </div>
            </div>

            {/* Knowledge Base Citation Source */}
            <div className="mt-3 rounded-lg border border-border/70 bg-background/90 p-2.5 shadow-xs">
              <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                <span className="flex items-center gap-1 text-primary font-medium">
                  <FileText className="size-3" /> CITATION SOURCE
                </span>
                <span>{scenario.citationLine}</span>
              </div>
              <p className="mt-1 text-xs font-semibold text-foreground truncate">
                {scenario.citationTitle}
              </p>
              <p className="mt-1.5 rounded bg-muted/40 p-1.5 text-[11px] italic leading-relaxed text-muted-foreground border-l-2 border-primary">
                {scenario.citationSnippet}
              </p>
            </div>

            {/* Draft Content Box */}
            <div className="mt-3">
              <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground mb-1">
                <span>SUGGESTED RESPONSE</span>
                {isEditing ? (
                  <button
                    onClick={() => setIsEditing(false)}
                    className="text-primary hover:underline"
                  >
                    Done editing
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    disabled={sent}
                    className="text-primary hover:underline disabled:opacity-50"
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
                  className="w-full rounded-lg border border-primary/50 bg-background p-2.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary min-h-[90px]"
                />
              ) : (
                <div className="rounded-lg border border-border/60 bg-background/80 p-2.5 text-xs leading-relaxed text-foreground min-h-[85px]">
                  {currentDraft}
                </div>
              )}
            </div>

            {/* Policy & Safety Checks */}
            <div className="mt-3 space-y-1">
              <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                DETERMINISTIC SAFETY GATES
              </span>
              <div className="grid grid-cols-1 gap-1">
                {scenario.safetyChecks.map((check, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-mono"
                  >
                    <Check className="size-3 text-emerald-500 shrink-0" />
                    <span className="truncate">{check.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Trigger Buttons */}
          <div className="mt-4 pt-2 border-t border-primary/20 flex flex-col gap-2">
            {sent ? (
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="w-full text-xs gap-1.5 font-medium border-border/80"
              >
                <RotateCcw className="size-3.5" /> Reset Scenario
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={handleSend}
                className="w-full text-xs gap-2 font-semibold bg-primary text-primary-foreground shadow-md hover:opacity-95"
              >
                <Send className="size-3.5" />
                {scenario.isTemplateFallback
                  ? "Approve & Send Meta Template"
                  : "Approve & Send to WhatsApp"}
              </Button>
            )}
            <span className="text-center font-mono text-[9px] text-muted-foreground">
              Human-in-the-loop guarantee: AI never sends without your policy's consent.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
