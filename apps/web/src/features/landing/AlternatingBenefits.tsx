import React from "react";
import { motion } from "framer-motion";
import {
  ChevronRight,
  ShieldCheck,
  FileCheck,
  Sparkles,
  CheckCheck,
  Zap,
  Package,
  Clock,
  Lock,
  Smartphone,
  Laptop
} from "lucide-react";
import { REVEAL_EASE, SPRING_POP, VIEWPORT_DEFAULT } from "./motionTokens.js";

interface BenefitSectionProps {
  id?: string;
  reverse?: boolean;
  heading: string;
  body: string;
  linkText: string;
  linkHref: string;
  children: React.ReactNode;
}

const BenefitPair: React.FC<BenefitSectionProps> = ({
  id,
  reverse = false,
  heading,
  body,
  linkText,
  linkHref,
  children
}) => {
  const baseVariants = {
    hidden: {
      opacity: 0,
      y: 32
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: REVEAL_EASE
      }
    }
  };

  return (
    <div id={id} className="py-24 first:pt-16 last:pb-24">
      <div className="max-w-[1080px] mx-auto">
        <motion.div
          variants={baseVariants}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_DEFAULT}
          className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
            reverse ? "lg:flex-row-reverse" : ""
          }`}
        >
          {/* Text Column (450px max width) */}
          <div
            className={`flex flex-col justify-center ${
              reverse ? "lg:col-span-6 lg:order-2" : "lg:col-span-6 lg:order-1"
            }`}
          >
            <div className="max-w-[450px]">
              <h2 className="text-[38px] sm:text-[48px] lg:text-[60px] leading-[1] font-normal tracking-normal text-[#1c1e21] text-balance">
                {heading}
              </h2>

              <p className="text-[18px] leading-[25px] font-normal text-[#1c1e21] mt-5">{body}</p>

              <div className="mt-8">
                <a href={linkHref} className="wa-link-underline">
                  <span className="wa-link-text">{linkText}</span>
                  <ChevronRight className="w-4 h-4 text-[#1c1e21]" />
                </a>
              </div>
            </div>
          </div>

          {/* Media Column (325×647px Card with detached fragments) */}
          <div
            className={`flex justify-center items-center ${
              reverse ? "lg:col-span-6 lg:order-1" : "lg:col-span-6 lg:order-2"
            }`}
          >
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export const AlternatingBenefits: React.FC = () => {
  return (
    <section className="bg-[#fcf5eb] px-6 sm:px-12 lg:px-[60px]">
      {/* Benefit Pair 1 (Section 4): Deterministic AI Knowledge Grounding */}
      <BenefitPair
        id="knowledge"
        heading="Answers verified against your documents, not guesses"
        body="Upload your return policy, shipping guidelines, and price sheets. FlowDesk cites exact line numbers in your PDFs before answering, so your bot never invents discounts or promises you cannot keep."
        linkText="See how grounding works"
        linkHref="#knowledge"
      >
        <div className="relative w-[325px] h-[647px] rounded-[25px] bg-[#111b21] border border-[#dedbd6] p-6 text-white flex flex-col justify-between shadow-2xl select-none">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#25d366]/20 text-[#25d366] flex items-center justify-center">
                <FileCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-[15px] font-medium leading-none text-white">
                  Knowledge Extractor
                </h4>
                <span className="text-[11px] text-[#25d366] mt-1 block">
                  Return_Policy_2026.pdf
                </span>
              </div>
            </div>
            <ShieldCheck className="w-5 h-5 text-[#25d366]" />
          </div>

          {/* Document Grounding Visualization */}
          <div className="space-y-4 my-auto">
            <div className="p-3.5 rounded-[18px] bg-white/5 border border-white/10 text-xs font-mono space-y-2">
              <div className="flex items-center justify-between text-[#25d366]">
                <span>Chunk #0829 · Vector Cosine: 0.94</span>
                <span className="bg-[#25d366]/20 text-[#25d366] px-1.5 py-0.5 rounded text-[10px]">
                  99.2% Match
                </span>
              </div>
              <p className="text-white/80 font-sans text-[12px] leading-relaxed bg-[#25d366]/10 p-2 rounded border border-[#25d366]/30">
                "Items may be exchanged within 14 business days of delivery if packaging is intact.
                Receipt #FD is required."
              </p>
              <div className="text-[10px] text-white/50 text-right">Lines 42–49 verified</div>
            </div>

            {/* Generated Verified Draft */}
            <div className="p-3.5 rounded-[18px] bg-[#d9fdd3] text-[#111b21] shadow-md text-xs space-y-1.5">
              <div className="flex items-center justify-between font-semibold text-[#00803e] text-[11px]">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#25d366]" /> Verified AI Draft
                </span>
                <span>Ready to dispatch</span>
              </div>
              <p className="text-[12px] leading-snug">
                "Yes! You can exchange your item within 14 days of delivery. Just have your order
                receipt ready."
              </p>
            </div>
          </div>

          {/* Bottom Telemetry */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
            <span>Confidence Gate: STRICT</span>
            <span className="text-[#25d366] font-mono">0 Hallucinations</span>
          </div>

          {/* Detached Overlays (+180ms Stagger Pop + Ambient Float) */}
          {/* Top-Right Detached Citation Chip */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 16 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={VIEWPORT_DEFAULT}
            transition={{ ...SPRING_POP, delay: 0.25 }}
            className="absolute -top-5 -right-8 sm:-right-12 z-20 pointer-events-none"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
              className="bg-white text-[#1c1e21] rounded-[18px] p-3.5 border border-[#dedbd6] shadow-xl flex items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded-full bg-[#e6ffda] text-[#111b21] flex items-center justify-center text-xs font-semibold shadow-2xs">
                DOC
              </div>
              <div>
                <p className="text-[13px] font-medium leading-none">Exact Source Cited</p>
                <p className="text-[11px] text-[#00803e] font-mono mt-0.5">Policy_v2.4.pdf #L42</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom-Left Detached Latency Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 16 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={VIEWPORT_DEFAULT}
            transition={{ ...SPRING_POP, delay: 0.35 }}
            className="absolute -bottom-5 -left-6 sm:-left-10 z-20 pointer-events-none"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="bg-[#e6ffda] text-[#111b21] rounded-full px-4 py-2 border border-[#dedbd6] shadow-xl flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-[#25d366] animate-ping" />
              <span className="text-[12px] font-semibold">184ms Retrieval Latency</span>
            </motion.div>
          </motion.div>
        </div>
      </BenefitPair>

      {/* Benefit Pair 2 (Section 6): Official Meta Cloud API & Template Messaging (Media Left) */}
      <BenefitPair
        id="broadcasts"
        reverse
        heading="Send 10,000 updates without getting your number banned"
        body="Unofficial scrapers get flagged in days. FlowDesk routes through Meta Cloud API with pre-approved HSM templates, 99.98% delivery rate, and green-tier phone reputation."
        linkText="See official template rules"
        linkHref="#broadcasts"
      >
        <div className="relative w-[325px] h-[647px] rounded-[25px] bg-white border border-[#dedbd6] p-5 text-[#1c1e21] flex flex-col justify-between shadow-2xl select-none">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#25d366]" />
                <h4 className="text-[16px] font-medium text-[#1c1e21]">FlowDesk Official</h4>
              </div>
              <span className="text-[11px] font-mono text-[#00803e] bg-[#e6ffda] px-2 py-0.5 rounded-full font-medium">
                Meta Verified
              </span>
            </div>

            {/* Template Card Mockup */}
            <div className="mt-5 space-y-4">
              <div className="p-4 rounded-[20px] bg-[#fcf5eb] border border-[#dedbd6] shadow-xs space-y-2.5">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="font-mono text-[10px] uppercase tracking-wide">
                    TEMPLATE: order_dispatch_v2
                  </span>
                  <span className="text-[#00803e] font-semibold">Approved</span>
                </div>
                <p className="text-[13px] leading-relaxed text-[#1c1e21]">
                  {
                    '"Hello {{customer_name}}, your order #FD-{{order_id}} is out for delivery with courier {{courier_name}}."'
                  }
                </p>
                {/* Interactive Action Pills */}
                <div className="pt-2 border-t border-[#dedbd6] flex flex-col gap-1.5 text-xs">
                  <div className="w-full bg-white text-[#1c1e21] border border-[#dedbd6] rounded-full py-1.5 text-center font-medium shadow-2xs">
                    🚚 Track Live Delivery
                  </div>
                  <div className="w-full bg-white text-[#1c1e21] border border-[#dedbd6] rounded-full py-1.5 text-center font-medium shadow-2xs">
                    📅 Reschedule Drop-off
                  </div>
                </div>
              </div>

              {/* Template Stats */}
              <div className="p-3.5 rounded-[16px] bg-[#f0f4f9] text-xs space-y-2">
                <div className="flex justify-between items-center text-gray-600">
                  <span>Batch Throughput:</span>
                  <span className="font-mono font-semibold text-[#1c1e21]">5,000 msg / min</span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                  <span>Phone Reputation:</span>
                  <span className="text-[#00803e] font-semibold">High (Green Tier)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span>Meta Cloud API v20.0</span>
            <CheckCheck className="w-4 h-4 text-[#25d366]" />
          </div>

          {/* Detached Overlays (+180ms Stagger Pop + Ambient Float) */}
          {/* Top-Left Detached Meta Tier Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 16 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={VIEWPORT_DEFAULT}
            transition={{ ...SPRING_POP, delay: 0.25 }}
            className="absolute -top-6 -left-8 sm:-left-12 z-20 pointer-events-none"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
              className="bg-[#111b21] text-white rounded-[18px] p-3.5 border border-[#33463f] shadow-xl flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-[#25d366] text-[#111b21] flex items-center justify-center shadow-sm">
                <CheckCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[13px] font-medium leading-none">Meta Cloud API</p>
                <p className="text-[11px] text-white/70 mt-0.5">Tier 3 Verified Partner</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom-Right Detached Delivery Rate Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 16 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={VIEWPORT_DEFAULT}
            transition={{ ...SPRING_POP, delay: 0.35 }}
            className="absolute -bottom-6 -right-8 sm:-right-12 z-20 pointer-events-none"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4.0, repeat: Infinity, ease: "easeInOut" }}
              className="bg-white text-[#1c1e21] rounded-[18px] p-3.5 border border-[#dedbd6] shadow-xl flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-[#e6ffda] text-[#111b21] flex items-center justify-center shadow-2xs">
                <Zap className="w-4 h-4 text-[#00803e]" />
              </div>
              <div>
                <p className="text-[13px] font-medium leading-none">99.98% Delivery</p>
                <p className="text-[11px] text-[#25d366] font-semibold mt-0.5">Zero Ban Risk</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </BenefitPair>

      {/* Benefit Pair 3 (Section 7): Automated Tool Resolution & Workflows */}
      <BenefitPair
        id="integrations"
        heading="Track orders and process requests directly in chat"
        body="Connect FlowDesk to Shopify, your CRM, or internal APIs. Customers can track live courier checkpoints, update delivery addresses, and pay invoices right on WhatsApp."
        linkText="Browse tool integrations"
        linkHref="#integrations"
      >
        <div className="relative w-[325px] h-[647px] rounded-[25px] bg-[#fcf5eb] border border-[#dedbd6] p-5 text-[#1c1e21] flex flex-col justify-between shadow-2xl select-none">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#dedbd6] pb-3">
            <h4 className="text-[15px] font-medium text-[#1c1e21]">In-Chat Order Resolution</h4>
            <span className="text-[11px] text-[#00803e] bg-[#e6ffda] px-2 py-0.5 rounded-full font-mono">
              Tool: shipping_api
            </span>
          </div>

          {/* Workflow Sequence */}
          <div className="space-y-4 my-auto">
            {/* Customer Prompt */}
            <div className="bg-white rounded-[18px] p-3.5 border border-[#dedbd6] shadow-xs">
              <span className="text-[10px] text-gray-400 block mb-1">Customer Query</span>
              <p className="text-[13px] leading-snug">"Can you track shipment #FD-9921 for me?"</p>
            </div>

            {/* Resolved Tool Card */}
            <div className="bg-[#111b21] text-white rounded-[20px] p-4 border border-[#33463f] shadow-lg space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-[#25d366] font-medium">
                  <Package className="w-4 h-4" /> Transit Status: ON THE WAY
                </span>
                <span className="text-white/60 font-mono text-[10px]">ETA: 16:30</span>
              </div>

              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="w-3/4 h-full bg-[#25d366] rounded-full" />
              </div>

              <div className="text-[12px] text-white/80 space-y-1 pt-1">
                <p>Courier: JNE Express · Driver: Budi S.</p>
                <p className="text-white/60 text-[11px]">Last checkpoint: Hub Cilandak Selatan</p>
              </div>

              <div className="pt-2 border-t border-white/10 text-center">
                <button
                  type="button"
                  className="w-full bg-[#25d366] text-[#111b21] py-1.5 rounded-full text-xs font-semibold"
                >
                  View Live Map Pin
                </button>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#dedbd6] flex items-center justify-between text-xs text-gray-500">
            <span>Automated without agent intervention</span>
            <span className="font-mono text-[#00803e]">0 human hours</span>
          </div>

          {/* Detached Overlays (+180ms Stagger Pop + Ambient Float) */}
          {/* Top-Right Detached API Execution Chip */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 16 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={VIEWPORT_DEFAULT}
            transition={{ ...SPRING_POP, delay: 0.25 }}
            className="absolute -top-6 -right-8 sm:-right-12 z-20 pointer-events-none"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
              className="bg-white text-[#1c1e21] rounded-[20px] p-3.5 border border-[#dedbd6] shadow-xl flex items-center gap-3"
            >
              <span className="text-2xl">⚡</span>
              <div>
                <p className="text-[13px] font-medium leading-none">Webhook Executed</p>
                <p className="text-[11px] text-[#00803e] font-mono mt-0.5">42ms latency · 200 OK</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom-Left Detached Zero-Touch Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 16 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={VIEWPORT_DEFAULT}
            transition={{ ...SPRING_POP, delay: 0.35 }}
            className="absolute -bottom-6 -left-8 sm:-left-10 z-20 pointer-events-none"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
              className="bg-[#e6ffda] text-[#111b21] rounded-full px-4 py-2 border border-[#dedbd6] shadow-xl flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-[#25d366]" />
              <span className="text-[12px] font-semibold">Zero-touch automated resolution</span>
            </motion.div>
          </motion.div>
        </div>
      </BenefitPair>

      {/* Benefit Pair 4 (Section 8): Multi-Device Team Handoff & Omnichannel Presence (Media Left) */}
      <BenefitPair
        reverse
        heading="Never send two different replies to the same customer"
        body="Real-time presence indicators show who is viewing or drafting a response. Collision guard locks the thread the second an agent types, preventing awkward duplicate answers."
        linkText="See collision protection in action"
        linkHref="#inbox"
      >
        <div className="relative w-[325px] h-[647px] rounded-[25px] bg-[#111b21] border border-[#dedbd6] p-6 text-white flex flex-col justify-between shadow-2xl select-none">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h4 className="text-[16px] font-medium">Team Presence</h4>
            <span className="text-[12px] text-[#25d366] font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#25d366] animate-pulse" />
              Live Sync
            </span>
          </div>

          {/* Agent Presence & Collision Banner */}
          <div className="space-y-4 my-auto">
            {/* Collision Guard Warning Banner */}
            <div className="p-3.5 rounded-[18px] bg-amber-500/15 border border-amber-500/40 text-amber-200 text-xs flex items-center gap-2.5">
              <Lock className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <p className="font-semibold text-white">Collision Guard Active</p>
                <p className="text-[11px] text-amber-200/80">
                  Sarah M. is currently drafting a reply
                </p>
              </div>
            </div>

            {/* Connected Workstations List */}
            <div className="space-y-3">
              {[
                {
                  icon: Laptop,
                  name: "Sarah M. (Lead)",
                  status: "Drafting response...",
                  badge: "Active"
                },
                {
                  icon: Smartphone,
                  name: "Carlos R. (Support)",
                  status: "Viewing thread",
                  badge: "Sync"
                },
                {
                  icon: Laptop,
                  name: "David T. (Tier 2)",
                  status: "Internal note added",
                  badge: "Sync"
                }
              ].map((d, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-[18px] bg-white/5 border border-white/10 flex items-center justify-between hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#25d366]/20 text-[#25d366] flex items-center justify-center">
                      <d.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[13px] font-medium leading-none text-white">{d.name}</p>
                      <p className="text-[11px] text-white/60 mt-1">{d.status}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-[#25d366] bg-[#25d366]/10 px-2 py-0.5 rounded-full">
                    {d.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 text-center">
            <p className="text-[12px] text-white/70">
              Zero collision conflicts across 100+ concurrent team agents.
            </p>
          </div>

          {/* Detached Overlays (+180ms Stagger Pop + Ambient Float) */}
          {/* Top-Left Detached Collision Protection Chip */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 16 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={VIEWPORT_DEFAULT}
            transition={{ ...SPRING_POP, delay: 0.25 }}
            className="absolute -top-6 -left-8 sm:-left-12 z-20 pointer-events-none"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.1, repeat: Infinity, ease: "easeInOut" }}
              className="bg-white text-[#1c1e21] rounded-[18px] p-3.5 border border-[#dedbd6] shadow-xl flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-[#e6ffda] text-[#111b21] flex items-center justify-center shadow-2xs">
                <CheckCheck className="w-4 h-4 text-[#25d366]" />
              </div>
              <div>
                <p className="text-[13px] font-medium leading-none">Collision Lock</p>
                <p className="text-[11px] text-[#5e5e5e] mt-0.5">0 duplicate customer replies</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom-Right Detached SLA Chip */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 16 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={VIEWPORT_DEFAULT}
            transition={{ ...SPRING_POP, delay: 0.35 }}
            className="absolute -bottom-6 -right-8 sm:-right-12 z-20 pointer-events-none"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
              className="bg-[#25d366] text-[#111b21] rounded-full px-4 py-2 border border-[#111b21] shadow-xl flex items-center gap-2"
            >
              <Clock className="w-3.5 h-3.5 text-[#111b21]" />
              <span className="text-[12px] font-bold">&lt; 90s First Response SLA</span>
            </motion.div>
          </motion.div>
        </div>
      </BenefitPair>
    </section>
  );
};
