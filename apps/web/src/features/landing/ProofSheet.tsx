import { useState } from "react";
import { Badge } from "@flowdesk/ui";

interface Testimonial {
  id: string;
  tabLabel: string;
  companyName: string;
  companyTier: string;
  quoteLead: string;
  highlightedPhrase: string;
  quoteTail: string;
  authorName: string;
  authorRole: string;
  metricLabel: string;
  metricValue: string;
}

const testimonials: Testimonial[] = [
  {
    id: "apex",
    tabLabel: "APEX LOGISTICS",
    companyName: "Apex Global Freight & Logistics",
    companyTier: "18,000 Monthly WhatsApp Conversations",
    quoteLead:
      "Before FlowDesk, our operations reps constantly feared sending contradictory answers or breaching Meta's 24-hour service rule. Now,",
    highlightedPhrase:
      "over 58% of repetitive billing tickets are drafted with verified document citations",
    quoteTail:
      "and dispatched with zero operator collision. It is the only platform that treats WhatsApp like enterprise infrastructure.",
    authorName: "Marcus Vance",
    authorRole: "VP of Global Customer Operations",
    metricLabel: "FIRST RESPONSE ACCELERATION",
    metricValue: "< 14 seconds"
  },
  {
    id: "finova",
    tabLabel: "FINOVA GLOBAL",
    companyName: "Finova Cross-Border Payments",
    companyTier: "Enterprise Scale • Official Meta Cloud API",
    quoteLead:
      "In financial services, zero-data-retention and cryptographic tenant isolation are non-negotiable. FlowDesk's PostgreSQL RLS boundary guarantees that",
    highlightedPhrase:
      "customer financial records never leak between workspaces or train public models",
    quoteTail: ". Our compliance audit passed in two days.",
    authorName: "Elena Rostova",
    authorRole: "Head of Infrastructure & Security",
    metricLabel: "DATA COMPLIANCE AUDIT",
    metricValue: "100% Zero-Leakage"
  },
  {
    id: "solaria",
    tabLabel: "SOLARIA CAPITAL",
    companyName: "Solaria Commercial Assets",
    companyTier: "High-Touch VIP Client Desk",
    quoteLead:
      "The live WebSocket collision guard eliminated embarrassing double-replies on day one. When high-net-worth clients message our desk,",
    highlightedPhrase:
      "our reps review grounded drafts in seconds rather than hunting through shared folders",
    quoteTail: ". It changed our operational velocity completely.",
    authorName: "David K. Thornton",
    authorRole: "Managing Director of Client Relations",
    metricLabel: "OPERATOR DEFLECTION GAIN",
    metricValue: "340+ Hours Saved/Mo"
  }
];

export function ProofSheet() {
  const [activeTabId, setActiveTabId] = useState<string>("apex");
  const current = (testimonials.find((t) => t.id === activeTabId) ??
    testimonials[0]) as Testimonial;

  return (
    <div className="mx-auto w-full max-w-5xl">
      {/* Editorial Eyebrow */}
      <div className="mb-8 flex items-center justify-between border-b border-[#e7e7e7] pb-3">
        <div className="flex items-center gap-2">
          <span className="size-2 bg-[#0007cb]" />
          <span className="font-mono text-xs uppercase tracking-wider text-[#111111] dark:text-[#f4f4f5]">
            Verified Customer Outcomes • Enterprise Telemetry
          </span>
        </div>
        <span className="font-mono text-[11px] text-[#a0a0a0]">AUTHENTICATED REVIEWS</span>
      </div>

      {/* Uppercase 12px Mono Tabs */}
      <div className="flex items-stretch border-b border-[#e7e7e7]">
        {testimonials.map((t) => {
          const active = t.id === current.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTabId(t.id)}
              className={`relative flex-1 border-t border-r border-l border-[#e7e7e7] px-4 py-3 text-left font-mono text-xs uppercase tracking-wider transition-colors first:ml-0 -ml-[1px] ${
                active
                  ? "bg-[#ffffff] dark:bg-[#181b20] text-[#111111] dark:text-[#f4f4f5] font-semibold"
                  : "bg-[#faf9f6] dark:bg-[#121417] text-[#a0a0a0] hover:text-[#111111] dark:hover:text-[#f4f4f5]"
              }`}
            >
              {/* Electric blue active indicator line */}
              {active && <span className="absolute top-0 left-0 right-0 h-[2px] bg-[#0007cb]" />}
              <span>{t.tabLabel}</span>
            </button>
          );
        })}
      </div>

      {/* Hairline Proof Sheet Stage */}
      <div className="relative border-r border-b border-l border-[#e7e7e7] bg-[#ffffff] dark:bg-[#181b20] p-6 sm:p-10 shadow-xs">
        {/* Subtle Registration Marks at Stage Edges */}
        <div className="absolute top-2 left-2 size-1.5 bg-[#dedbd6] dark:bg-[#383e48]" />
        <div className="absolute top-2 right-2 size-1.5 bg-[#dedbd6] dark:bg-[#383e48]" />
        <div className="absolute bottom-2 left-2 size-1.5 bg-[#dedbd6] dark:bg-[#383e48]" />
        <div className="absolute bottom-2 right-2 size-1.5 bg-[#dedbd6] dark:bg-[#383e48]" />

        <div className="flex flex-col justify-between gap-8">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#a0a0a0]">
              <span className="font-semibold text-[#111111] dark:text-[#f4f4f5]">
                {current.companyName}
              </span>
              <Badge variant="outline" className="font-mono text-[10px]">
                {current.companyTier}
              </Badge>
            </div>

            {/* Quote with Electric Blue Highlight Badge */}
            <blockquote className="mt-6 text-xl sm:text-2xl md:text-3xl font-normal leading-relaxed text-[#111111] dark:text-[#f4f4f5] tracking-tight">
              &ldquo;{current.quoteLead}{" "}
              <span className="bg-[#0007cb] text-white px-2 py-0.5 inline font-medium">
                {current.highlightedPhrase}
              </span>{" "}
              {current.quoteTail}&rdquo;
            </blockquote>
          </div>

          {/* Attribution and Metric Footer */}
          <div className="flex flex-wrap items-end justify-between gap-4 border-t border-[#e7e7e7] pt-6">
            <div>
              <p className="text-sm font-semibold text-[#111111] dark:text-[#f4f4f5]">
                {current.authorName}
              </p>
              <p className="text-xs text-[#a0a0a0]">{current.authorRole}</p>
            </div>

            <div className="rounded-md border border-[#dedbd6] dark:border-[#383e48] bg-[#f1eee9] dark:bg-[#121417] px-4 py-2 text-right">
              <span className="block font-mono text-[10px] uppercase text-[#a0a0a0]">
                {current.metricLabel}
              </span>
              <span className="font-mono text-base font-bold text-[#0007cb] dark:text-emerald-400">
                {current.metricValue}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
