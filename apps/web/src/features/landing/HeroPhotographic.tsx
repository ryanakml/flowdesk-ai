import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, CheckCheck, Heart } from "lucide-react";
import { REVEAL_EASE, SPRING_POP } from "./motionTokens.js";

interface HeroPhotographicProps {
  onOpenApp?: () => void;
}

export const HeroPhotographic: React.FC<HeroPhotographicProps> = ({ onOpenApp }) => {
  const [phoneNumber, setPhoneNumber] = useState("");

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
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/60 pointer-events-none" />
        </div>

        {/* Hero Content Grid (Left Copy & Right Glass Conversion) */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center my-auto">
          {/* Left Column: 80px Headline, 18px Support, Staggered Chat Fragments */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: REVEAL_EASE
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
            <div className="mt-8 flex flex-col gap-3.5 max-w-[460px]">
              {/* Fragment 1 (450ms Mount Stagger): Outgoing Pale-Green Bubble */}
              <motion.div
                initial={{ opacity: 0, scale: 0.88, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  ...SPRING_POP,
                  delay: 0.45
                }}
                className="self-end"
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 4.2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="bg-[#d9fdd3] text-[#111b21] rounded-[18px] rounded-tr-[4px] px-4 py-2.5 shadow-md text-[15px] leading-[20px] flex items-end gap-2"
                >
                  <span>Are we still on for the 3pm sync? Notes are ready.</span>
                  <span className="text-[11px] text-[#5e5e5e] flex items-center gap-0.5 whitespace-nowrap">
                    14:58 <CheckCheck className="w-3.5 h-3.5 text-[#25d366]" />
                  </span>
                </motion.div>
              </motion.div>

              {/* Fragment 2 (900ms Mount Stagger): Incoming White Bubble with Avatar & Emoji */}
              <motion.div
                initial={{ opacity: 0, scale: 0.88, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  ...SPRING_POP,
                  delay: 0.9
                }}
                className="self-start relative flex items-start gap-2.5 mt-1"
              >
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{
                    duration: 4.6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="flex items-start gap-2.5"
                >
                  {/* Circular Avatar */}
                  <div className="w-8 h-8 rounded-full bg-[#e6ffda] text-[#111b21] border border-white/60 flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5 shadow-sm">
                    SM
                  </div>

                  <div className="relative">
                    <div className="bg-white text-[#111b21] rounded-[18px] rounded-tl-[4px] px-4 py-2.5 shadow-md text-[15px] leading-[20px] flex items-end gap-2">
                      <span>Yes, jumping in now! Just sent the summary.</span>
                      <span className="text-[11px] text-[#5e5e5e] whitespace-nowrap">14:59</span>
                    </div>

                    {/* Overlapping Emoji Reaction Badge (-10px bottom-left offset) with pop spring */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.25, 1] }}
                      transition={{
                        delay: 1.2,
                        duration: 0.35,
                        ease: "easeOut"
                      }}
                      className="absolute -bottom-2.5 -left-1.5 bg-white border border-gray-100 rounded-full px-1.5 py-0.5 flex items-center gap-1 shadow-md text-xs cursor-pointer select-none"
                    >
                      <Heart className="w-3.5 h-3.5 fill-[#ea0038] text-[#ea0038]" />
                      <span className="text-[10px] text-gray-700 font-bold">1</span>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: 396×390px Translucent Glass Conversion Panel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: REVEAL_EASE
            }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-[396px] min-h-[390px] rounded-[28.5px] bg-black/40 backdrop-blur-[17.8px] border border-white/15 p-8 text-white flex flex-col justify-between shadow-2xl">
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

                  <motion.a
                    href="/inbox"
                    onClick={onOpenApp}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="wa-pill-primary w-full py-3.5 text-[15px] font-medium"
                  >
                    <span>Open FlowDesk</span>
                    <ArrowDown className="w-4 h-4" />
                  </motion.a>
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
