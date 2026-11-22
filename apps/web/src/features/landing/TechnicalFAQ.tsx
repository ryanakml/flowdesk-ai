import { useState } from "react";
import { ChevronDown } from "lucide-react";

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
    <div className="mx-auto w-full max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Heading and Category Stand Alone */}
        <div className="lg:col-span-5 max-w-md">
          <div className="flex items-center gap-2 mb-3">
            <span className="size-2 bg-[#0007cb]" />
            <span className="font-mono text-xs uppercase tracking-wider text-[#111111] dark:text-[#f4f4f5]">
              TECHNICAL QUESTIONS & FAQS
            </span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-normal tracking-[-0.0296em] text-[#111111] dark:text-[#f4f4f5] leading-[1.1]">
            <span className="text-[#a0a0a0]">Questions engineers ask before</span>
            <br />
            deploying to production.
          </h3>
          <p className="mt-4 font-serif text-sm sm:text-base text-[#585858] dark:text-[#a0a0a0] leading-relaxed">
            Concrete answers on zero data training, Meta Cloud API window enforcement, and database
            tenant isolation.
          </p>
        </div>

        {/* Right Column: 696px Stack of FAQ Rows with Clay Separators */}
        <div className="lg:col-span-7 border-t border-b border-[#d3cec6] dark:border-[#383e48]">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border-b last:border-b-0 border-[#d3cec6] dark:border-[#383e48]"
              >
                <button
                  onClick={() => toggle(index)}
                  className="flex w-full items-baseline justify-between py-5 text-left transition-opacity hover:opacity-80"
                >
                  <div className="pr-4">
                    <span className="font-mono text-[10px] text-[#0007cb] block mb-1 uppercase tracking-wider font-semibold">
                      {faq.category}
                    </span>
                    <h4 className="text-base sm:text-lg font-normal text-[#111111] dark:text-[#f4f4f5] tracking-tight">
                      {faq.question}
                    </h4>
                  </div>
                  <ChevronDown
                    className={`size-4 text-[#707070] shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#0007cb]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="pb-5 pt-1 text-xs sm:text-sm leading-relaxed text-[#585858] dark:text-[#a0a0a0] font-sans animate-in fade-in duration-200 max-w-2xl">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
