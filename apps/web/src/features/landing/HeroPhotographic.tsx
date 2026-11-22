import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, CheckCheck, ThumbsUp, ShieldCheck } from "lucide-react";
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
            alt="Customer conversation on WhatsApp"
            className="w-full h-full object-cover object-center filter brightness-[0.80] contrast-[1.08]"
          />
          {/* Subtle directional vignette to guarantee high legibility for white display type and glass UI */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/65 pointer-events-none" />
        </div>

        {/* Hero Content Grid (Left Copy & Right Glass Conversion) */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center my-auto">
          {/* Left Column: 80px Headline, 18px Support, Staggered Real Chat Fragments */}
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
              into a verified resolution.
            </h1>

            {/* 18px/25px Support Copy */}
            <p className="text-[18px] leading-[25px] font-normal text-white/90 max-w-[520px] mt-5">
              Give your customers immediate, accurate answers on WhatsApp grounded directly in your
              real company documents — backed by your team the moment human judgment matters.
            </p>

            {/* Staggered Floating Chat Fragments Under Support Copy */}
            <div className="mt-8 flex flex-col gap-3.5 max-w-[490px]">
              {/* Fragment 1 (450ms Mount Stagger): Outgoing Customer Message Bubble */}
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
                  <span>Hi! Can I change the delivery address for order #FD-9281?</span>
                  <span className="text-[11px] text-[#5e5e5e] flex items-center gap-0.5 whitespace-nowrap">
                    14:28 <CheckCheck className="w-3.5 h-3.5 text-[#25d366]" />
                  </span>
                </motion.div>
              </motion.div>

              {/* Fragment 2 (900ms Mount Stagger): Incoming Grounded AI Response with Citation & Badge */}
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
                  <div className="w-8 h-8 rounded-full bg-[#25d366] text-[#111b21] border border-white/60 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-sm">
                    FD
                  </div>

                  <div className="relative">
                    <div className="bg-white text-[#111b21] rounded-[18px] rounded-tl-[4px] px-4 py-2.5 shadow-md text-[15px] leading-[20px] max-w-[390px]">
                      <p>
                        Done! Updated to 42 Orchard Rd. We've verified your order and emailed the
                        confirmation.
                      </p>
                      <div className="mt-2 flex items-center justify-between gap-3 text-[11px] text-[#5e5e5e] border-t border-gray-100 pt-1.5">
                        <span className="inline-flex items-center gap-1 text-[#00803e] font-medium">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#25d366]" /> Grounded in Policy
                          v2.4
                        </span>
                        <span className="whitespace-nowrap">14:28</span>
                      </div>
                    </div>

                    {/* Overlapping Emoji Reaction Badge (-10px bottom-left offset) with spring pop */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.25, 1] }}
                      transition={{
                        delay: 1.2,
                        duration: 0.35,
                        ease: "easeOut"
                      }}
                      className="absolute -bottom-2.5 -left-1.5 bg-white border border-gray-100 rounded-full px-2 py-0.5 flex items-center gap-1 shadow-md text-xs cursor-pointer select-none"
                    >
                      <ThumbsUp className="w-3.5 h-3.5 fill-[#25d366] text-[#25d366]" />
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
                  Start in seconds
                </h2>
                <p className="text-[14px] leading-[20px] text-white/80 mt-2.5">
                  Connect your official WhatsApp Business number or test our live demo desk.
                </p>

                <div className="mt-6 space-y-3">
                  <div className="relative">
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+62 812-3456-7890"
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
                  Existing workspace? Sign in
                </a>
                <p className="text-[11px] text-white/60">
                  Official Meta Cloud API partner. Zero setup fees.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Small Note Beneath Opening */}
        <div className="relative z-10 text-right mt-4 hidden sm:block">
          <p className="text-[12px] leading-[16px] text-white/70">
            Certified Meta Business Solution Provider · Multi-Agent Shared Inbox · SOC2 Certified
          </p>
        </div>
      </div>
    </section>
  );
};
