import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { REVEAL_EASE, VIEWPORT_DEFAULT } from "./motionTokens.js";

interface AvatarPill {
  id: string;
  name: string;
  message: string;
  avatarBg: string;
  driftDuration: number;
}

const TOP_PILLS: AvatarPill[] = [
  {
    id: "top-1",
    name: "Maya",
    message: "Just landed at Terminal 2 ✈️",
    avatarBg: "#e6ffda",
    driftDuration: 4.6
  },
  {
    id: "top-2",
    name: "Liam",
    message: "Sent over the project deck 📄",
    avatarBg: "#d9fdd3",
    driftDuration: 5.2
  },
  {
    id: "top-3",
    name: "Elena",
    message: "Let's grab a coffee at 10 ☕",
    avatarBg: "#fef08a",
    driftDuration: 4.8
  },
  {
    id: "top-4",
    name: "David",
    message: "Sound check is ready 🎙️",
    avatarBg: "#bfdbfe",
    driftDuration: 5.4
  }
];

const BOTTOM_PILLS: AvatarPill[] = [
  {
    id: "bot-1",
    name: "Sophia",
    message: "Team sync starting now 🔔",
    avatarBg: "#fed7aa",
    driftDuration: 5.0
  },
  {
    id: "bot-2",
    name: "Marcus",
    message: "Contract signed and approved ✅",
    avatarBg: "#e6ffda",
    driftDuration: 4.5
  },
  {
    id: "bot-3",
    name: "Aria",
    message: "Sending voice memo in 2 min 🎧",
    avatarBg: "#ddd6fe",
    driftDuration: 5.3
  },
  {
    id: "bot-4",
    name: "Lucas",
    message: "See you all tomorrow! 👋",
    avatarBg: "#fbcfe8",
    driftDuration: 4.7
  }
];

export const EmotionalAvatarCloud: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-[#fcf5eb] py-28 px-6 sm:px-12 lg:px-[60px] overflow-hidden">
      <div className="max-w-[1080px] mx-auto flex flex-col items-center">
        {/* Phase 1 (0ms): Top Cluster of 4 Floating Avatar + Greeting Pills */}
        <div className="w-full flex flex-wrap justify-center sm:justify-between items-center gap-3 sm:gap-4 mb-10 max-w-[940px]">
          {TOP_PILLS.map((pill, idx) => (
            <motion.div
              key={pill.id}
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_DEFAULT}
              transition={{
                duration: shouldReduceMotion ? 0.05 : 0.48,
                delay: shouldReduceMotion ? 0 : idx * 0.08,
                ease: REVEAL_EASE
              }}
            >
              <motion.div
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        y: [0, -5, 0]
                      }
                }
                transition={{
                  duration: pill.driftDuration,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="inline-flex items-center gap-2.5 bg-white border border-[#dedbd6] rounded-full px-4 py-2 shadow-none select-none"
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-medium text-[#111b21]"
                  style={{ backgroundColor: pill.avatarBg }}
                >
                  {pill.name[0]}
                </div>
                <div className="text-[13px] text-[#1c1e21] flex items-center gap-1.5">
                  <span className="font-medium">{pill.name}:</span>
                  <span className="text-[#5e5e5e]">{pill.message}</span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Phase 2 (+150ms): Centered 48px Statement Typography */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_DEFAULT}
          transition={{
            duration: shouldReduceMotion ? 0.05 : 0.55,
            delay: shouldReduceMotion ? 0 : 0.15,
            ease: REVEAL_EASE
          }}
          className="max-w-[880px] text-center my-6"
        >
          <p className="text-[32px] sm:text-[42px] lg:text-[48px] leading-[1.1] font-normal tracking-normal text-[#1c1e21] text-balance">
            With private messaging and calling, you can be yourself, speak freely and feel close to
            the people who matter most.
          </p>
        </motion.div>

        {/* Phase 3 (+350ms): Bottom Cluster of 4 Floating Avatar + Greeting Pills */}
        <div className="w-full flex flex-wrap justify-center sm:justify-between items-center gap-3 sm:gap-4 mt-10 max-w-[940px]">
          {BOTTOM_PILLS.map((pill, idx) => (
            <motion.div
              key={pill.id}
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_DEFAULT}
              transition={{
                duration: shouldReduceMotion ? 0.05 : 0.48,
                delay: shouldReduceMotion ? 0 : 0.35 + idx * 0.08,
                ease: REVEAL_EASE
              }}
            >
              <motion.div
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        y: [0, -5, 0]
                      }
                }
                transition={{
                  duration: pill.driftDuration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: idx * 0.2
                }}
                className="inline-flex items-center gap-2.5 bg-white border border-[#dedbd6] rounded-full px-4 py-2 shadow-none select-none"
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-medium text-[#111b21]"
                  style={{ backgroundColor: pill.avatarBg }}
                >
                  {pill.name[0]}
                </div>
                <div className="text-[13px] text-[#1c1e21] flex items-center gap-1.5">
                  <span className="font-medium">{pill.name}:</span>
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
