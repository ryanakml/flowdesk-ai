import { Check, Minus, X } from "lucide-react";

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

export function ComplianceMatrix() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      {/* Chapter Lead */}
      <div className="max-w-3xl mb-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="size-2 bg-[#0007cb]" />
          <span className="font-mono text-xs uppercase tracking-wider text-[#111111] dark:text-[#f4f4f5]">
            AUDITED ENTERPRISE MATRIX • RISK EVALUATION
          </span>
        </div>
        <h3 className="text-3xl sm:text-5xl font-normal tracking-[-0.0296em] text-[#111111] dark:text-[#f4f4f5] leading-[1.05]">
          <span className="text-[#a0a0a0]">Architectural contrast:</span>
          <br />
          FlowDesk vs legacy customer stacks.
        </h3>
        <p className="mt-4 font-serif text-base sm:text-lg text-[#585858] dark:text-[#a0a0a0] leading-relaxed max-w-2xl">
          Why enterprise teams migrate away from brittle browser QR-code scrapers and generic
          helpdesk add-ons.
        </p>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto border border-[#dedbd6] dark:border-[#2b3038] bg-white dark:bg-[#121417]">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#dedbd6] dark:border-[#2b3038] bg-[#faf9f6] dark:bg-[#181b20] font-mono text-[11px] text-[#707070]">
              <th className="p-4 uppercase tracking-wider font-semibold text-[#111111] dark:text-[#f4f4f5] w-[40%]">
                CAPABILITY CRITERION
              </th>
              <th className="p-4 uppercase tracking-wider font-semibold text-[#0007cb] bg-[#0007cb]/5 w-[25%] border-r border-l border-[#dedbd6] dark:border-[#2b3038]">
                ● FLOWDESK (OFFICIAL CLOUD API)
              </th>
              <th className="p-4 uppercase tracking-wider font-semibold text-[#585858] dark:text-[#a0a0a0] w-[18%]">
                LEGACY CRM ADD-ONS
              </th>
              <th className="p-4 uppercase tracking-wider font-semibold text-[#ff5600] w-[17%]">
                UNOFFICIAL WEB SCRAPERS
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#dedbd6] dark:divide-[#2b3038]">
            {criteria.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-[#faf9f6] dark:hover:bg-[#15181e] transition-colors"
              >
                {/* Criterion Details */}
                <td className="p-4 align-top">
                  <p className="font-semibold text-[#111111] dark:text-[#f4f4f5] text-xs">
                    {item.feature}
                  </p>
                  <p className="mt-1 text-[11px] text-[#707070] font-serif leading-relaxed">
                    {item.description}
                  </p>
                </td>

                {/* FlowDesk (Highlighted Column) */}
                <td className="p-4 align-top bg-[#0007cb]/5 border-r border-l border-[#dedbd6] dark:border-[#2b3038]">
                  <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-[#0007cb]">
                    <Check className="size-4 shrink-0" />
                    <span>{item.flowdesk.label}</span>
                  </div>
                </td>

                {/* Legacy CRM */}
                <td className="p-4 align-top font-mono text-xs text-[#585858] dark:text-[#a0a0a0]">
                  <div className="flex items-center gap-1.5">
                    {item.legacyCrm.status === "full" && (
                      <Check className="size-3.5 text-emerald-500 shrink-0" />
                    )}
                    {item.legacyCrm.status === "partial" && (
                      <Minus className="size-3.5 text-amber-500 shrink-0" />
                    )}
                    {item.legacyCrm.status === "none" && (
                      <X className="size-3.5 text-rose-500 shrink-0" />
                    )}
                    <span>{item.legacyCrm.label}</span>
                  </div>
                </td>

                {/* Unofficial Web Scrapers */}
                <td className="p-4 align-top font-mono text-xs text-[#707070]">
                  <div className="flex items-center gap-1.5">
                    {item.scrapers.status === "none" && (
                      <X className="size-3.5 text-[#ff5600] shrink-0" />
                    )}
                    {item.scrapers.status === "partial" && (
                      <Minus className="size-3.5 text-amber-500 shrink-0" />
                    )}
                    <span className={item.scrapers.status === "none" ? "text-[#ff5600]" : ""}>
                      {item.scrapers.label}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
