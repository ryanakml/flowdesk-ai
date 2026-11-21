import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Badge } from "@flowdesk/ui";

interface FAQItem {
  question: string;
  category: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    category: "AI GROUNDING",
    question: "How does FlowDesk prevent AI hallucinations in customer answers?",
    answer:
      "FlowDesk uses a strict hybrid RAG (Retrieval-Augmented Generation) pipeline backed by PostgreSQL and pgvector. When a customer sends a message, our engine searches your uploaded SOPs and documentation using cosine similarity. If the top matching chunks do not meet the minimum confidence threshold (default 88%), FlowDesk refuses to draft speculative answers, marks the inquiry as ungrounded, and hands the ticket directly to a human operator with highlighted context."
  },
  {
    category: "META COMPLIANCE",
    question: "What happens when the 24-hour WhatsApp customer service window expires?",
    answer:
      "Meta Cloud API strictly prohibits freeform messages once 24 hours have elapsed since the customer's last inbound message. FlowDesk tracks this countdown in real time. Once expired, the freeform editor is locked, and FlowDesk automatically suggests your pre-approved WhatsApp message templates (HSM) with dynamic parameter injection, keeping your business account fully compliant and protected from quality penalties."
  },
  {
    category: "DATA SECURITY",
    question: "Does customer data or conversation history train public AI models?",
    answer:
      "Never. FlowDesk connects exclusively to enterprise LLM endpoints with zero-data-retention (ZDR) agreements. Furthermore, within our database, every tenant's messages, contacts, and vector embeddings are quarantined using PostgreSQL Row-Level Security (RLS) enforced at the database engine level. Tenant A cannot scan or read Tenant B data under any query."
  },
  {
    category: "OPERATIONS",
    question: "How does the operator collision guard prevent double-replies?",
    answer:
      "When any agent opens a conversation or focuses the compose field, FlowDesk issues a heartbeat lock over WebSockets to all active reps. The thread displays a real-time presence pill ('Sarah is reviewing this thread') and disables conflicting reply triggers until the agent submits or navigates away. This eliminates embarrassing duplicate customer responses."
  },
  {
    category: "INFRASTRUCTURE",
    question: "Can we self-host FlowDesk on our own AWS VPC or single-host EC2?",
    answer:
      "Yes. The entire FlowDesk stack is built as a cloud-native monorepo with production Docker Compose and Terraform configurations. You can run FlowDesk on a single AWS EC2 instance (e.g. t3.small or t3.medium with Caddy auto-TLS Let's Encrypt) or scale horizontally on AWS ECS Fargate, RDS PostgreSQL with pgvector, and ElastiCache Redis."
  },
  {
    category: "DEVELOPER API",
    question: "Can we integrate FlowDesk with our backend database or existing CRM?",
    answer:
      "Yes. FlowDesk exposes a full REST API with scoped API keys and publishes transactional webhook events for every incoming message, AI draft, assignment, and delivery confirmation. Every webhook payload is signed with HMAC-SHA256 for cryptographic verification against replay and spoofing attacks."
  }
];

export function TechnicalFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="relative mx-auto w-full max-w-4xl">
      <div className="text-center mb-10">
        <Badge variant="outline" className="mb-3 font-mono text-xs">
          TECHNICAL & OPERATIONAL FAQ
        </Badge>
        <h3 className="text-2xl font-bold tracking-tight sm:text-4xl text-foreground">
          Clear answers for{" "}
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            technical leaders.
          </span>
        </h3>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          Direct engineering details on how FlowDesk handles data security, Meta compliance, and
          model guardrails.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={faq.question}
              className={`rounded-xl border transition-all ${
                isOpen
                  ? "border-primary/50 bg-card/80 shadow-md ring-1 ring-primary/30"
                  : "border-border/70 bg-card/40 hover:border-border hover:bg-muted/30"
              }`}
            >
              <button
                onClick={() => toggle(idx)}
                className="flex w-full items-start justify-between p-4 sm:p-5 text-left"
              >
                <div className="pr-4">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-primary font-bold">
                    {faq.category}
                  </span>
                  <h4 className="mt-1 text-sm sm:text-base font-semibold text-foreground">
                    {faq.question}
                  </h4>
                </div>
                <div
                  className={`mt-1 flex size-6 shrink-0 items-center justify-center rounded-md border border-border/80 bg-background/80 transition-transform ${
                    isOpen ? "rotate-180 border-primary/50 text-primary" : "text-muted-foreground"
                  }`}
                >
                  <ChevronDown className="size-4" />
                </div>
              </button>

              {isOpen && (
                <div className="border-t border-border/40 px-4 pb-5 pt-3 sm:px-5">
                  <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
