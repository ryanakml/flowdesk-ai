import React from "react";
import { motion } from "framer-motion";
import { REVEAL_EASE, VIEWPORT_DEFAULT } from "./motionTokens.js";

interface AvatarPill {
  id: string;
  name: string;
  role: string;
  message: string;
  avatarBg: string;
  driftDuration: number;
  driftRange: number;
}

const TOP_PILLS: AvatarPill[] = [
  {
    id: "top-1",
    name: "Maya",
    role: "Support Lead",
    message: "Order #8291 rerouted to Jakarta hub ✅",
    avatarBg: "#e6ffda",
    driftDuration: 3.4,
    driftRange: -10
  },
  {
    id: "top-2",
    name: "David",
    role: "Customer",
    message: "Got my refund confirmation in 30 seconds 🙌",
    avatarBg: "#d9fdd3",
    driftDuration: 4.0,
    driftRange: -12
  },
  {
    id: "top-3",
    name: "Sarah",
    role: "Operations",
    message: "Exchange policy updated with holiday hours 📋",
    avatarBg: "#fef08a",
    driftDuration: 3.6,
    driftRange: -9
  },
  {
    id: "top-4",
    name: "Carlos",
    role: "Client",
    message: "Signed service agreement received on WhatsApp 📄",
    avatarBg: "#bfdbfe",
    driftDuration: 4.2,
    driftRange: -11
  }
];

const BOTTOM_PILLS: AvatarPill[] = [
  {
    id: "bot-1",
    name: "Elena",
    role: "Billing Desk",
    message: "Invoice #INV-204 dispatched and paid via QRIS 💳",
    avatarBg: "#fed7aa",
    driftDuration: 3.8,
    driftRange: -10
  },
  {
    id: "bot-2",
    name: "Marcus",
    role: "Store Manager",
    message: "VIP tier activated after 3rd re-order 🌟",
    avatarBg: "#e6ffda",
    driftDuration: 3.5,
    driftRange: -12
  },
  {
    id: "bot-3",
    name: "Aria",
    role: "AI Co-pilot",
    message: "Grounded in Return_Policy_v2.4 (99% match) 🛡️",
    avatarBg: "#ddd6fe",
    driftDuration: 4.1,
    driftRange: -9
  },
  {
    id: "bot-4",
    name: "Lucas",
    role: "Warehouse",
    message: "Tracking link delivered to customer in 42ms ⚡",
    avatarBg: "#fbcfe8",
    driftDuration: 3.7,
    driftRange: -11
  }
];

export const EmotionalAvatarCloud: React.FC = () => {
  return (
    <section className="bg-[#fcf5eb] py-28 px-6 sm:px-12 lg:px-[60px] overflow-hidden">
      <div className="max-w-[1080px] mx-auto flex flex-col items-center">
        {/* Phase 1 (0ms): Top Cluster of 4 Floating Avatar + Interaction Pills */}
        <div className="w-full flex flex-wrap justify-center sm:justify-between items-center gap-3 sm:gap-4 mb-10 max-w-[940px]">
          {TOP_PILLS.map((pill, idx) => (
            <motion.div
              key={pill.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_DEFAULT}
              transition={{
                duration: 0.48,
                delay: idx * 0.08,
                ease: REVEAL_EASE
              }}
            >
              <motion.div
                animate={{
                  y: [0, pill.driftRange, 0],
                  x: [0, idx % 2 === 0 ? 3 : -3, 0]
                }}
                transition={{
                  duration: pill.driftDuration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: idx * 0.3
                }}
                whileHover={{ scale: 1.06, y: -4 }}
                className="inline-flex items-center gap-2.5 bg-white border border-[#dedbd6] rounded-full px-4 py-2 shadow-sm select-none cursor-pointer transition-shadow hover:shadow-md"
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold text-[#111b21] shadow-2xs"
                  style={{ backgroundColor: pill.avatarBg }}
                >
                  {pill.name[0]}
                </div>
                <div className="text-[13px] text-[#1c1e21] flex items-center gap-1.5">
                  <span className="font-medium">{pill.name}</span>
                  <span className="text-[11px] text-gray-400">({pill.role}):</span>
                  <span className="text-[#5e5e5e]">{pill.message}</span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Phase 2 (+150ms): Centered 48px Statement Typography */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_DEFAULT}
          transition={{
            duration: 0.55,
            delay: 0.15,
            ease: REVEAL_EASE
          }}
          className="max-w-[880px] text-center my-6"
        >
          <p className="text-[32px] sm:text-[42px] lg:text-[48px] leading-[1.1] font-normal tracking-normal text-[#1c1e21] text-balance">
            When customer questions are answered in under a minute, trust follows naturally.
          </p>
        </motion.div>

        {/* Phase 3 (+350ms): Bottom Cluster of 4 Floating Avatar + Interaction Pills */}
        <div className="w-full flex flex-wrap justify-center sm:justify-between items-center gap-3 sm:gap-4 mt-10 max-w-[940px]">
          {BOTTOM_PILLS.map((pill, idx) => (
            <motion.div
              key={pill.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_DEFAULT}
              transition={{
                duration: 0.48,
                delay: 0.35 + idx * 0.08,
                ease: REVEAL_EASE
              }}
            >
              <motion.div
                animate={{
                  y: [0, pill.driftRange, 0],
                  x: [0, idx % 2 === 0 ? -3 : 3, 0]
                }}
                transition={{
                  duration: pill.driftDuration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4 + idx * 0.25
                }}
                whileHover={{ scale: 1.06, y: -4 }}
                className="inline-flex items-center gap-2.5 bg-white border border-[#dedbd6] rounded-full px-4 py-2 shadow-sm select-none cursor-pointer transition-shadow hover:shadow-md"
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold text-[#111b21] shadow-2xs"
                  style={{ backgroundColor: pill.avatarBg }}
                >
                  {pill.name[0]}
                </div>
                <div className="text-[13px] text-[#1c1e21] flex items-center gap-1.5">
                  <span className="font-medium">{pill.name}</span>
                  <span className="text-[11px] text-gray-400">({pill.role}):</span>
                  <span className="text-[#5e5e5e]">{pill.message}</span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
