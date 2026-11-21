import { Check, Minus, X } from "lucide-react";
import { Badge } from "@flowdesk/ui";

interface Criterion {
  feature: string;
  description: string;
  flowdesk: { status: "full" | "partial" | "none"; label: string };
  legacyCrm: { status: "full" | "partial" | "none"; label: string };
  scrapers: { status: "full" | "partial" | "none"; label: string };
}

const criteria: Criterion[] = [
  {
    feature: "Meta Cloud API Compliance",
    description: "Official Meta WABA & Phone ID onboarding (zero QR code hacks)",
    flowdesk: { status: "full", label: "Official Cloud API" },
    legacyCrm: { status: "full", label: "Third-party BSP / Twilio" },
    scrapers: { status: "none", label: "Unofficial Browser Hack" }
  },
  {
    feature: "WhatsApp Number Ban Risk",
    description: "Protection against permanent Meta business account blacklisting",
    flowdesk: { status: "full", label: "0% Ban Risk" },
    legacyCrm: { status: "full", label: "0% Ban Risk" },
    scrapers: { status: "none", label: "Critical Ban Risk (90%+)" }
  },
  {
    feature: "Grounded AI Citations",
    description: "Responses bound to exact document chunk line numbers (zero hallucination)",
    flowdesk: { status: "full", label: "Line-level citations" },
    legacyCrm: { status: "partial", label: "Generic LLM / Black box" },
    scrapers: { status: "none", label: "None / Raw Prompt" }
  },
  {
    feature: "24-Hour Session Enforcement",
    description: "Real-time window timer with automated HSM template fallback",
    flowdesk: { status: "full", label: "Automated Template Gate" },
    legacyCrm: { status: "partial", label: "Manual Template Picking" },
    scrapers: { status: "none", label: "Silent Message Drops" }
  },
  {
    feature: "Operator Collision Lock",
    description: "Real-time thread locking to prevent multiple agents double-replying",
    flowdesk: { status: "full", label: "Sub-50ms WebSocket Lock" },
    legacyCrm: { status: "partial", label: "Slow Polling / Collision Risk" },
    scrapers: { status: "none", label: "No Collision Prevention" }
  },
  {
    feature: "Data Isolation & RLS",
    description: "Cryptographic tenant isolation via PostgreSQL Row-Level Security",
    flowdesk: { status: "full", label: "Kernel-level Postgres RLS" },
    legacyCrm: { status: "full", label: "Proprietary Multi-tenant" },
    scrapers: { status: "none", label: "Single Flat SQLite / File" }
  },
  {
    feature: "Self-Hostable on AWS / Docker",
    description: "Deploy in your own VPC or single-host EC2 under your data governance",
    flowdesk: { status: "full", label: "Full Docker & Terraform" },
    legacyCrm: { status: "none", label: "Closed SaaS Only" },
    scrapers: { status: "partial", label: "Local script only" }
  }
];

function RenderStatus({ status, label }: { status: "full" | "partial" | "none"; label: string }) {
  if (status === "full") {
    return (
      <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-400">
        <span className="rounded-full bg-emerald-500/20 p-0.5 text-emerald-400">
          <Check className="size-3.5" />
        </span>
        <span>{label}</span>
      </div>
    );
  }
  if (status === "partial") {
    return (
      <div className="flex items-center gap-1.5 text-xs text-amber-400">
        <span className="rounded-full bg-amber-500/20 p-0.5 text-amber-400">
          <Minus className="size-3.5" />
        </span>
        <span>{label}</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <span className="rounded-full bg-destructive/20 p-0.5 text-destructive">
        <X className="size-3.5" />
      </span>
      <span>{label}</span>
    </div>
  );
}

export function ComplianceMatrix() {
  return (
    <div className="relative mx-auto w-full max-w-6xl rounded-2xl border border-white/10 bg-card/40 p-4 shadow-2xl backdrop-blur-xl sm:p-8">
      <div className="mx-auto max-w-3xl text-center mb-10">
        <Badge variant="outline" className="mb-3 font-mono text-xs">
          ARCHITECTURE MATRIX • RISK EVALUATION
        </Badge>
        <h3 className="text-2xl font-bold tracking-tight sm:text-4xl text-foreground">
          Why enterprise operations choose{" "}
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            FlowDesk.
          </span>
        </h3>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          Do not stake your business phone numbers on browser automation scripts or bloated CRM
          add-ons with hallucinating chatbots.
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border/80 bg-background/80 shadow-xs">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-border/60 bg-muted/40 font-mono text-xs">
              <th className="p-4 font-semibold text-foreground">CAPABILITY & COMPLIANCE</th>
              <th className="p-4 font-bold text-primary bg-primary/5 border-x border-primary/20">
                FLOWDESK (OFFICIAL)
              </th>
              <th className="p-4 font-medium text-muted-foreground">LEGACY CRM ADD-ONS</th>
              <th className="p-4 font-medium text-muted-foreground">UNOFFICIAL SCRAPERS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {criteria.map((item, index) => (
              <tr
                key={item.feature}
                className={index % 2 === 0 ? "bg-background/40" : "bg-muted/10"}
              >
                <td className="p-4">
                  <p className="font-semibold text-foreground">{item.feature}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">{item.description}</p>
                </td>
                <td className="p-4 bg-primary/5 border-x border-primary/20 font-medium">
                  <RenderStatus status={item.flowdesk.status} label={item.flowdesk.label} />
                </td>
                <td className="p-4">
                  <RenderStatus status={item.legacyCrm.status} label={item.legacyCrm.label} />
                </td>
                <td className="p-4">
                  <RenderStatus status={item.scrapers.status} label={item.scrapers.label} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
