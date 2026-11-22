import React from "react";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Search,
  CheckCheck,
  Sparkles,
  UserCheck,
  CornerDownLeft,
  Users
} from "lucide-react";
import { REVEAL_EASE, VIEWPORT_DEFAULT } from "./motionTokens.js";

export const AppWindowSpotlight: React.FC = () => {
  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 28
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
    <section id="inbox" className="bg-[#fcf5eb] py-24 px-6 sm:px-12 lg:px-[60px] overflow-hidden">
      <div className="max-w-[1080px] mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_DEFAULT}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          {/* Left: Layered Desktop Windows (Multi-Agent Team Inbox & AI Co-pilot) */}
          <div className="lg:col-span-7 relative flex justify-center py-6">
            {/* Back Window (Queue & Assignee Sidebar with gentle float) */}
            <motion.div
              animate={{ y: [0, -8, 0], x: [0, -3, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="w-[320px] sm:w-[400px] h-[360px] rounded-[20px] bg-[#f0f4f9] border border-[#dedbd6] p-4 absolute -top-5 -left-2 sm:left-2 opacity-80 pointer-events-none select-none shadow-sm"
            >
              <div className="flex items-center justify-between border-b border-[#dedbd6] pb-2.5 mb-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="text-[12px] font-medium text-[#1c1e21] ml-2">All Inboxes</span>
                </div>
                <span className="text-[11px] font-mono text-[#00803e] bg-[#e6ffda] px-2 py-0.5 rounded-full">
                  12 Active
                </span>
              </div>

              {/* Thread list */}
              <div className="space-y-2 text-[12px]">
                <div className="p-2.5 rounded-lg bg-white shadow-2xs border border-[#dedbd6] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#e6ffda] text-[#111b21] flex items-center justify-center font-bold text-[10px]">
                      AL
                    </div>
                    <div>
                      <p className="font-medium text-[#1c1e21] leading-none">Apex Logistics</p>
                      <p className="text-[10px] text-gray-500 mt-0.5">Assigned to Sarah M.</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-600 font-medium">1.4m SLA</span>
                </div>

                <div className="p-2.5 rounded-lg bg-white/70 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#bfdbfe] text-[#111b21] flex items-center justify-center font-bold text-[10px]">
                      FB
                    </div>
                    <div>
                      <p className="font-medium text-[#1c1e21] leading-none">Finova Digital</p>
                      <p className="text-[10px] text-gray-500 mt-0.5">Assigned to Carlos R.</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-400">Resolved</span>
                </div>

                <div className="p-2.5 rounded-lg bg-white/70 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#fed7aa] text-[#111b21] flex items-center justify-center font-bold text-[10px]">
                      SH
                    </div>
                    <div>
                      <p className="font-medium text-[#1c1e21] leading-none">Solaria Health</p>
                      <p className="text-[10px] text-gray-500 mt-0.5">AI Copilot Handover</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-amber-600 font-medium">Waiting reply</span>
                </div>
              </div>
            </motion.div>

            {/* Front Window (Live Conversation & AI Grounded Resolution) */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 w-full max-w-[470px] rounded-[25px] bg-white border border-[#dedbd6] p-5 shadow-xl overflow-hidden"
            >
              {/* Window Header */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#e6ffda] text-[#111b21] flex items-center justify-center font-bold text-sm shadow-2xs">
                    AL
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-[15px] font-medium text-[#1c1e21] leading-none">
                        Apex Logistics Desk
                      </h4>
                      <span className="text-[10px] bg-[#f0f4f9] text-[#1c1e21] px-1.5 py-0.5 rounded font-mono">
                        #FD-1092
                      </span>
                    </div>
                    <span className="text-[12px] text-[#25d366] font-normal flex items-center gap-1.5 mt-1">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25d366] opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25d366]" />
                      </span>
                      Live Sync · 3 Agents Active
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[#5e5e5e]">
                  <span className="text-xs bg-[#f0f4f9] px-2 py-1 rounded-full flex items-center gap-1 text-[#1c1e21]">
                    <Users className="w-3.5 h-3.5" /> Sarah M.
                  </span>
                  <Search className="w-4 h-4 cursor-pointer hover:text-[#1c1e21]" />
                </div>
              </div>

              {/* Chat Thread Messages */}
              <div className="py-4 space-y-3 min-h-[190px] flex flex-col justify-end text-[14px]">
                {/* Customer Incoming Query */}
                <div className="self-start max-w-[85%] bg-[#f0f4f9] text-[#1c1e21] rounded-[18px] rounded-tl-[4px] px-3.5 py-2">
                  <p className="text-[13px] leading-relaxed">
                    Can we pool our team subscription quota across our 3 regional branch offices?
                  </p>
                  <span className="text-[10px] text-gray-500 block text-right mt-0.5">
                    11:04 AM
                  </span>
                </div>

                {/* AI Co-pilot Grounded Suggestion Card */}
                <div className="self-end max-w-[92%] bg-[#fcf5eb] border border-[#dedbd6] rounded-[18px] p-3 text-[13px] shadow-sm">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#00803e]">
                      <Sparkles className="w-3.5 h-3.5 text-[#25d366]" /> AI Copilot Suggestion
                    </span>
                    <span className="text-[10px] font-mono text-gray-500">
                      Licensing_Guide.pdf #L42
                    </span>
                  </div>
                  <p className="text-[#1c1e21] leading-relaxed">
                    "Yes, multi-branch quota pooling is enabled by default with isolated billing
                    codes for each site."
                  </p>
                  <div className="mt-2.5 flex items-center gap-2 pt-2 border-t border-[#dedbd6]">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 bg-[#25d366] text-[#111b21] hover:bg-[#1c1e21] hover:text-white rounded-full px-3 py-1 text-[11px] font-medium transition-colors cursor-pointer"
                    >
                      <CornerDownLeft className="w-3 h-3" /> Approve & Send
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 bg-white border border-[#dedbd6] text-[#1c1e21] hover:bg-gray-50 rounded-full px-3 py-1 text-[11px] transition-colors cursor-pointer"
                    >
                      <UserCheck className="w-3 h-3" /> Assign Human
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Input Field */}
              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1 text-[#00803e] font-medium">
                  <CheckCheck className="w-3.5 h-3.5 text-[#25d366]" /> Real-time collision
                  protection active
                </span>
                <span className="font-mono text-[11px]">SLA: 0m 42s</span>
              </div>
            </motion.div>
          </div>

          {/* Right: 60px Headline & Underlined Link */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <h2 className="text-[40px] sm:text-[50px] lg:text-[60px] leading-[1] font-normal tracking-normal text-[#1c1e21] text-balance">
              One shared inbox for your whole team
            </h2>

            <p className="text-[18px] leading-[25px] font-normal text-[#1c1e21] mt-5">
              Stop passing around a shared office phone. Your agents can reply from the same
              WhatsApp number at the same time, assign threads, and leave internal notes without the
              customer ever noticing.
            </p>

            <div className="mt-8">
              <a href="#inbox" className="wa-link-underline">
                <span className="wa-link-text">See how the team inbox works</span>
                <ChevronRight className="w-4 h-4 text-[#1c1e21]" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
