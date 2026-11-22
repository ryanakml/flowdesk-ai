import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, CheckCheck, Heart } from "lucide-react";
import { REVEAL_EASE } from "./motionTokens.js";

interface HeroPhotographicProps {
  onOpenApp?: () => void;
}

export const HeroPhotographic: React.FC<HeroPhotographicProps> = ({ onOpenApp }) => {
  const shouldReduceMotion = useReducedMotion();
  const [phoneNumber, setPhoneNumber] = useState("");

  const baseEase = REVEAL_EASE;

  return (
    <section className="bg-[#fcf5eb] px-4 sm:px-8 py-6">
      <div className="max-w-[1376px] mx-auto min-h-[720px] rounded-[25px] overflow-hidden relative shadow-none flex flex-col justify-between p-6 sm:p-12 lg:p-16">
        {/* Environmental Photographic Background Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src="/landing-hero.webp"
            alt="Authentic conversational connection"
            className="w-full h-full object-cover object-center filter brightness-[0.82] contrast-[1.05]"
          />
          {/* Subtle gradient vignette to preserve left text readability and right glass texture */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/60 pointer-events-none" />
        </div>

        {/* Hero Content Grid (Left Copy & Right Glass Conversion) */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center my-auto">
          {/* Left Column: 80px Headline, 18px Support, Staggered Chat Fragments */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0.05 : 0.5,
              ease: baseEase
            }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* 80px/80px Weight 400 Headline */}
            <h1 className="text-[44px] sm:text-[64px] lg:text-[80px] leading-[1.05] sm:leading-[1] font-normal tracking-normal text-white text-balance">
              Turn every customer message <br className="hidden sm:inline" />
              into a direct connection.
            </h1>

            {/* 18px/25px Support Copy */}
            <p className="text-[18px] leading-[25px] font-normal text-white/90 max-w-[500px] mt-5">
              Simple, reliable messaging that keeps you close to the people and teams that matter
              most, with zero delays and complete privacy.
            </p>

            {/* Staggered Floating Chat Fragments Under Support Copy */}
            <div className="mt-8 flex flex-col gap-3 max-w-[460px]">
              {/* Fragment 1 (450ms Mount Stagger): Outgoing Pale-Green Bubble */}
              <motion.div
                initial={
                  shouldReduceMotion
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 14, scale: 0.95 }
                }
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: shouldReduceMotion ? 0.05 : 0.42,
                  delay: shouldReduceMotion ? 0 : 0.45,
                  ease: baseEase
                }}
                className="self-end bg-[#d9fdd3] text-[#111b21] rounded-[18px] rounded-tr-[4px] px-4 py-2.5 shadow-sm text-[15px] leading-[20px] flex items-end gap-2"
              >
                <span>Are we still on for the 3pm sync? Notes are ready.</span>
                <span className="text-[11px] text-[#5e5e5e] flex items-center gap-0.5 whitespace-nowrap">
                  14:58 <CheckCheck className="w-3.5 h-3.5 text-[#25d366]" />
                </span>
              </motion.div>

              {/* Fragment 2 (900ms Mount Stagger): Incoming White Bubble with Avatar & Emoji */}
              <motion.div
                initial={
                  shouldReduceMotion
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 14, scale: 0.95 }
                }
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: shouldReduceMotion ? 0.05 : 0.42,
                  delay: shouldReduceMotion ? 0 : 0.9,
                  ease: baseEase
                }}
                className="self-start relative flex items-start gap-2.5 mt-1"
              >
                {/* Circular Avatar */}
                <div className="w-8 h-8 rounded-full bg-[#e6ffda] text-[#111b21] border border-white/60 flex items-center justify-center text-xs font-medium shrink-0 mt-0.5">
                  SM
                </div>

                <div className="relative">
                  <div className="bg-white text-[#111b21] rounded-[18px] rounded-tl-[4px] px-4 py-2.5 shadow-sm text-[15px] leading-[20px] flex items-end gap-2">
                    <span>Yes, jumping in now! Just sent the summary.</span>
                    <span className="text-[11px] text-[#5e5e5e] whitespace-nowrap">14:59</span>
                  </div>

                  {/* Overlapping Emoji Reaction Badge (-10px bottom-left offset) */}
                  <div className="absolute -bottom-2.5 -left-1.5 bg-white border border-gray-100 rounded-full px-1.5 py-0.5 flex items-center gap-1 shadow-sm text-xs">
                    <Heart className="w-3.5 h-3.5 fill-[#ea0038] text-[#ea0038]" />
                    <span className="text-[10px] text-gray-600 font-medium">1</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: 396×390px Translucent Glass Conversion Panel */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0.05 : 0.5,
              ease: baseEase
            }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-[396px] min-h-[390px] rounded-[28.5px] bg-black/40 backdrop-blur-[17.8px] border border-white/15 p-8 text-white flex flex-col justify-between shadow-none">
              <div>
                <h2 className="text-[32px] leading-[1.1] font-normal text-white">
                  Connect seamlessly
                </h2>
                <p className="text-[14px] leading-[20px] text-white/80 mt-2.5">
                  Enter your business phone number to start communicating securely across every
                  platform.
                </p>

                <div className="mt-6 space-y-3">
                  <div className="relative">
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full rounded-full bg-white text-[#1c1e21] placeholder-gray-400 px-5 py-3.5 text-[15px] outline-none focus:ring-2 focus:ring-[#25d366]"
                    />
                  </div>

                  <a
                    href="/inbox"
                    onClick={onOpenApp}
                    className="wa-pill-primary w-full py-3.5 text-[15px] font-medium"
                  >
                    <span>Open FlowDesk</span>
                    <ArrowDown className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 text-center space-y-1.5">
                <a
                  href="/inbox"
                  onClick={onOpenApp}
                  className="text-[13px] text-white/90 hover:text-white underline underline-offset-2"
                >
                  Already using FlowDesk? Log in
                </a>
                <p className="text-[11px] text-white/60">
                  Carrier SMS rates may apply. No credit card required.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Small Note Beneath Opening */}
        <div className="relative z-10 text-right mt-4 hidden sm:block">
          <p className="text-[12px] leading-[16px] text-white/70">
            Available on iOS, Android, Mac, and Windows.
          </p>
        </div>
      </div>
    </section>
  );
};
