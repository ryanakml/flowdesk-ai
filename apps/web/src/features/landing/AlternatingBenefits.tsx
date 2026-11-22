import React from "react";
import { motion } from "framer-motion";
import {
  ChevronRight,
  PhoneCall,
  Mic,
  Calendar,
  FileText,
  Smile,
  Laptop,
  Smartphone,
  CheckCheck,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { REVEAL_EASE, SPRING_POP, VIEWPORT_DEFAULT } from "./motionTokens.js";

interface BenefitSectionProps {
  reverse?: boolean;
  heading: string;
  body: string;
  linkText: string;
  linkHref: string;
  children: React.ReactNode;
}

const BenefitPair: React.FC<BenefitSectionProps> = ({
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
    <div className="py-24 first:pt-16 last:pb-24">
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
      {/* Benefit Pair 1 (Section 4): Voice & Calls */}
      <BenefitPair
        heading="Never miss a moment with voice and group calls"
        body="From quick check-ins to deep team brainstorms, feel like you are in the same room with high-fidelity audio and video designed for clarity."
        linkText="Explore voice features"
        linkHref="#voice"
      >
        <div className="relative w-[325px] h-[647px] rounded-[25px] bg-[#111b21] border border-[#dedbd6] p-6 text-white flex flex-col justify-between shadow-xl select-none">
          {/* Card Top Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#25d366] text-[#111b21] flex items-center justify-center font-bold text-sm shadow-sm">
                MK
              </div>
              <div>
                <h4 className="text-[16px] font-medium leading-none">Mira K.</h4>
                <span className="text-[12px] text-[#25d366] mt-1 block font-medium">
                  Active Call · 12:45
                </span>
              </div>
            </div>
            <PhoneCall className="w-5 h-5 text-[#25d366]" />
          </div>

          {/* Central Call Visualization with animated waveform */}
          <div className="flex flex-col items-center justify-center space-y-4 my-auto">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#25d366] to-[#e6ffda] p-1 flex items-center justify-center shadow-lg">
              <div className="w-full h-full rounded-full bg-[#111b21] flex items-center justify-center text-2xl font-medium">
                MK
              </div>
            </div>
            <div className="text-center">
              <p className="text-[18px] font-normal">Mira Karim</p>
              <p className="text-[13px] text-white/60 mt-0.5">End-to-end encrypted audio</p>
            </div>

            {/* Continuous Lively Audio Waveform Animation */}
            <div className="flex items-center gap-1.5 h-10">
              {[16, 32, 22, 38, 20, 30, 14, 34, 24, 18].map((h, i) => (
                <motion.div
                  key={i}
                  animate={{
                    height: [h * 0.4, h, h * 0.6, h * 0.9, h * 0.4]
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.1
                  }}
                  className="w-1.5 bg-[#25d366] rounded-full"
                />
              ))}
            </div>
          </div>

          {/* Card Bottom Controls */}
          <div className="flex items-center justify-around pt-4 border-t border-white/10">
            <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
              <Mic className="w-5 h-5 text-white" />
            </div>
            <div className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center text-white shadow-md hover:bg-red-600 transition-colors cursor-pointer">
              <PhoneCall className="w-6 h-6 rotate-[135deg]" />
            </div>
            <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
              <ShieldCheck className="w-5 h-5 text-[#25d366]" />
            </div>
          </div>

          {/* Detached Overlays (+180ms Stagger Pop + Ambient Float) */}
          {/* Top-Right Detached Floating Card */}
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
                TL
              </div>
              <div>
                <p className="text-[13px] font-medium leading-none">Team Lead</p>
                <p className="text-[11px] text-[#5e5e5e] mt-0.5">Joined voice stage</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom-Left Detached Waveform Pill */}
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
              <span className="text-[12px] font-medium">Ultra-low latency audio</span>
            </motion.div>
          </motion.div>
        </div>
      </BenefitPair>

      {/* Benefit Pair 2 (Section 6): Organized Spaces / Channels (Media Left) */}
      <BenefitPair
        reverse
        heading="Transform teamwork with organized spaces"
        body="Keep announcements, project channels, and customer queries structured without losing the personal touch of direct messaging."
        linkText="See shared spaces"
        linkHref="#spaces"
      >
        <div className="relative w-[325px] h-[647px] rounded-[25px] bg-white border border-[#dedbd6] p-5 text-[#1c1e21] flex flex-col justify-between shadow-xl select-none">
          {/* Workspace Channels List Header */}
          <div>
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h4 className="text-[17px] font-medium text-[#1c1e21]">All Channels</h4>
              <span className="text-[12px] text-[#25d366] font-semibold">8 new</span>
            </div>

            <div className="mt-4 space-y-3">
              {[
                { name: "Product Launch 2026", time: "11:20 AM", unread: 3, active: true },
                { name: "Executive Announcements", time: "09:45 AM", unread: 0 },
                { name: "Enterprise Customer Desk", time: "Yesterday", unread: 12 },
                { name: "Design System RFC", time: "Yesterday", unread: 0 },
                { name: "Security Audit Logs", time: "Nov 20", unread: 0 }
              ].map((c, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-[16px] flex items-center justify-between transition-colors ${
                    c.active ? "bg-[#fcf5eb] border border-[#dedbd6]" : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#f0f4f9] text-[#1c1e21] flex items-center justify-center text-xs font-medium">
                      #
                    </div>
                    <div>
                      <p className="text-[14px] font-medium leading-snug">{c.name}</p>
                      <p className="text-[12px] text-[#5e5e5e]">Active team discussion</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-gray-400">{c.time}</span>
                    {c.unread > 0 && (
                      <span className="block mt-1 w-5 h-5 rounded-full bg-[#25d366] text-[#111b21] text-[10px] font-bold text-center leading-5 ml-auto">
                        {c.unread}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span>Synchronized across organization</span>
            <CheckCheck className="w-4 h-4 text-[#25d366]" />
          </div>

          {/* Detached Overlays (+180ms Stagger Pop + Ambient Float) */}
          {/* Top-Left Detached Calendar Card */}
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
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[13px] font-medium leading-none">Sprint Review</p>
                <p className="text-[11px] text-white/70 mt-0.5">Today at 4:00 PM</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom-Right Detached File Progress Card */}
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
                <FileText className="w-4 h-4 text-[#00803e]" />
              </div>
              <div>
                <p className="text-[13px] font-medium leading-none">Q4_Report.pdf</p>
                <p className="text-[11px] text-[#25d366] font-semibold mt-0.5">
                  Verified & Grounded
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </BenefitPair>

      {/* Benefit Pair 3 (Section 7): Expressive Tools */}
      <BenefitPair
        heading="Say what you feel with rich expressions"
        body="Reactions, stickers, and ephemeral updates let your personality shine through every conversation without cluttering the thread."
        linkText="Discover expressive tools"
        linkHref="#stickers"
      >
        <div className="relative w-[325px] h-[647px] rounded-[25px] bg-[#fcf5eb] border border-[#dedbd6] p-5 text-[#1c1e21] flex flex-col justify-between shadow-xl select-none">
          {/* Messages with Rich Reactions */}
          <div className="space-y-4 my-auto">
            <div className="bg-white rounded-[20px] p-4 border border-[#dedbd6] relative shadow-xs">
              <p className="text-[15px] leading-relaxed">
                "The presentation went amazing! Everyone loved the live prototype."
              </p>
              <div className="mt-3 flex items-center gap-1.5">
                <span className="bg-[#f0f4f9] rounded-full px-2 py-0.5 text-xs">🚀 3</span>
                <span className="bg-[#f0f4f9] rounded-full px-2 py-0.5 text-xs">🎉 5</span>
                <span className="bg-[#e6ffda] text-[#111b21] rounded-full px-2 py-0.5 text-xs font-semibold">
                  ❤️ 8
                </span>
              </div>
            </div>

            <div className="bg-[#d9fdd3] text-[#111b21] rounded-[20px] p-4 self-end ml-6 border border-[#c3ebb8] shadow-xs">
              <p className="text-[15px] leading-relaxed">"Celebrating with team coffee! ☕🥳"</p>
              <span className="text-[11px] text-gray-500 block text-right mt-1">11:42 AM</span>
            </div>
          </div>

          {/* Reaction Bar */}
          <div className="bg-white rounded-full p-2 border border-[#dedbd6] flex items-center justify-around text-lg shadow-sm">
            <span className="hover:scale-125 transition-transform cursor-pointer">👍</span>
            <span className="hover:scale-125 transition-transform cursor-pointer">❤️</span>
            <span className="hover:scale-125 transition-transform cursor-pointer">😂</span>
            <span className="hover:scale-125 transition-transform cursor-pointer">😮</span>
            <span className="hover:scale-125 transition-transform cursor-pointer">🙏</span>
            <Smile className="w-5 h-5 text-[#5e5e5e] hover:text-[#1c1e21] cursor-pointer" />
          </div>

          {/* Detached Overlays (+180ms Stagger Pop + Ambient Float) */}
          {/* Top-Right Detached Sticker Badge */}
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
              className="bg-white text-[#1c1e21] rounded-[20px] p-4 border border-[#dedbd6] shadow-xl flex items-center gap-3"
            >
              <span className="text-3xl animate-bounce">✨</span>
              <div>
                <p className="text-[13px] font-medium leading-none">Custom Reactions</p>
                <p className="text-[11px] text-[#5e5e5e] mt-1">Instant emotion</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom-Left Detached Floating Sticker */}
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
              <Sparkles className="w-4 h-4 text-[#25d366]" />
              <span className="text-[12px] font-medium">Lightweight & expressive</span>
            </motion.div>
          </motion.div>
        </div>
      </BenefitPair>

      {/* Benefit Pair 4 (Section 8): Cross-Screen Synchrony (Media Left) */}
      <BenefitPair
        reverse
        heading="Keep conversations flowing across every screen"
        body="Pick up right where you left off on your phone, tablet, or browser with end-to-end synchronized state that never drops a beat."
        linkText="Download on all platforms"
        linkHref="#downloads"
      >
        <div className="relative w-[325px] h-[647px] rounded-[25px] bg-[#111b21] border border-[#dedbd6] p-6 text-white flex flex-col justify-between shadow-xl select-none">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h4 className="text-[16px] font-medium">Connected Devices</h4>
            <span className="text-[12px] text-[#25d366] font-semibold">4 Active</span>
          </div>

          {/* Devices Grid */}
          <div className="space-y-4 my-auto">
            {[
              { icon: Laptop, name: 'MacBook Pro 16"', status: "Active now", sync: "100%" },
              { icon: Smartphone, name: "iPhone 16 Pro", status: "Active 2m ago", sync: "100%" },
              { icon: Laptop, name: "Windows Workstation", status: "Active 1h ago", sync: "100%" }
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
                    <p className="text-[14px] font-medium leading-none">{d.name}</p>
                    <p className="text-[12px] text-white/60 mt-1">{d.status}</p>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-[#25d366] font-semibold">{d.sync}</span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 text-center">
            <p className="text-[12px] text-white/70">
              End-to-end encryption maintained across all linked devices.
            </p>
          </div>

          {/* Detached Overlays (+180ms Stagger Pop + Ambient Float) */}
          {/* Top-Left Detached Sync Indicator */}
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
                <p className="text-[13px] font-medium leading-none">Instant Handover</p>
                <p className="text-[11px] text-[#5e5e5e] mt-0.5">0.02s sync latency</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom-Right Detached Battery/Sync Pill */}
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
              <span className="w-2 h-2 rounded-full bg-[#111b21] animate-ping" />
              <span className="text-[12px] font-bold">Zero battery drain sync</span>
            </motion.div>
          </motion.div>
        </div>
      </BenefitPair>
    </section>
  );
};
