import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Search, Phone, Video, Send, CheckCheck } from "lucide-react";
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
    <section className="bg-[#fcf5eb] py-24 px-6 sm:px-12 lg:px-[60px] overflow-hidden">
      <div className="max-w-[1080px] mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_DEFAULT}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          {/* Left: Layered Desktop Windows (Back Window + Offset Front Window) */}
          <div className="lg:col-span-7 relative flex justify-center py-6">
            {/* Back Window (Offset top-left with gentle ambient float) */}
            <motion.div
              animate={{ y: [0, -8, 0], x: [0, -3, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="w-[320px] sm:w-[380px] h-[340px] rounded-[20px] bg-[#f0f4f9] border border-[#dedbd6] p-4 absolute -top-4 -left-2 sm:left-2 opacity-75 pointer-events-none select-none shadow-sm"
            >
              <div className="flex items-center gap-1.5 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="text-[11px] text-[#5e5e5e] ml-2">Channels & Threads</span>
              </div>
              <div className="space-y-2.5">
                <div className="h-6 bg-white rounded-md w-3/4 shadow-2xs" />
                <div className="h-4 bg-white/70 rounded w-1/2" />
                <div className="h-4 bg-white/70 rounded w-2/3" />
                <div className="h-4 bg-white/70 rounded w-5/6" />
                <div className="h-4 bg-white/70 rounded w-3/5" />
              </div>
            </motion.div>

            {/* Front Window (Offset bottom-right with independent subtle float) */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 w-full max-w-[460px] rounded-[25px] bg-white border border-[#dedbd6] p-5 shadow-lg overflow-hidden"
            >
              {/* Window Header */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#e6ffda] text-[#111b21] flex items-center justify-center font-medium text-xs shadow-2xs">
                    FD
                  </div>
                  <div>
                    <h4 className="text-[15px] font-medium text-[#1c1e21] leading-none">
                      Team Coordination Desk
                    </h4>
                    <span className="text-[12px] text-[#25d366] font-normal flex items-center gap-1.5 mt-1">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25d366] opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25d366]" />
                      </span>
                      Online across all devices
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-[#5e5e5e]">
                  <Search className="w-4 h-4 cursor-pointer hover:text-[#1c1e21]" />
                  <Phone className="w-4 h-4 cursor-pointer hover:text-[#1c1e21]" />
                  <Video className="w-4 h-4 cursor-pointer hover:text-[#1c1e21]" />
                </div>
              </div>

              {/* Chat Thread Messages */}
              <div className="py-4 space-y-3 min-h-[200px] flex flex-col justify-end text-[14px]">
                <div className="self-start max-w-[80%] bg-[#f0f4f9] text-[#1c1e21] rounded-[18px] rounded-tl-[4px] px-3.5 py-2">
                  <p>Client confirmation for the logistics rollout has been verified.</p>
                  <span className="text-[10px] text-gray-500 block text-right mt-0.5">
                    10:14 AM
                  </span>
                </div>

                <div className="self-end max-w-[80%] bg-[#d9fdd3] text-[#111b21] rounded-[18px] rounded-tr-[4px] px-3.5 py-2 shadow-2xs">
                  <p>All automated triggers deployed. Instant response active.</p>
                  <span className="text-[10px] text-gray-500 flex items-center justify-end gap-1 mt-0.5">
                    10:15 AM <CheckCheck className="w-3.5 h-3.5 text-[#25d366]" />
                  </span>
                </div>
              </div>

              {/* Bottom Input Field */}
              <div className="pt-2 border-t border-gray-100 flex items-center gap-2">
                <div className="flex-1 bg-[#f0f4f9] rounded-full px-4 py-2 text-sm text-gray-400 flex items-center gap-1">
                  <span>Type a secure message</span>
                  <span className="animate-pulse">|</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#25d366] text-[#111b21] flex items-center justify-center cursor-pointer hover:bg-[#1c1e21] hover:text-white transition-colors">
                  <Send className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: 60px Headline & Underlined Link */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <h2 className="text-[40px] sm:text-[50px] lg:text-[60px] leading-[1] font-normal tracking-normal text-[#1c1e21] text-balance">
              Never miss a beat with seamless desktop sync
            </h2>

            <p className="text-[18px] leading-[25px] font-normal text-[#1c1e21] mt-5">
              Keep conversations flowing effortlessly between your phone, tablet, and desktop. Every
              message, draft, and media transfer stays synchronized with instant responsiveness.
            </p>

            <div className="mt-8">
              <a href="#sync" className="wa-link-underline">
                <span className="wa-link-text">Learn about multi-device sync</span>
                <ChevronRight className="w-4 h-4 text-[#1c1e21]" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
