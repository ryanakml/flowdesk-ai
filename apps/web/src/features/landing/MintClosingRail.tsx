import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Radio, Mic, Building2, Smartphone } from "lucide-react";
import { REVEAL_EASE, VIEWPORT_DEFAULT } from "./motionTokens.js";

interface EditorialCardItem {
  id: string;
  icon: React.ElementType;
  title: string;
  body: string;
  actionText: string;
}

const CARDS: EditorialCardItem[] = [
  {
    id: "card-1",
    icon: Radio,
    title: "Stay updated with broadcast channels",
    body: "Follow teams, organizations, and announcements in private broadcast streams designed for high signal-to-noise communication.",
    actionText: "Explore Channels"
  },
  {
    id: "card-2",
    icon: Mic,
    title: "High-clarity interactive voice notes",
    body: "Draft, pause, scrub, and review voice messages with waveform playback before sending to ensure your message is communicated clearly.",
    actionText: "Learn Voice Features"
  },
  {
    id: "card-3",
    icon: Building2,
    title: "Official enterprise automation desk",
    body: "Connect your business systems with verified Meta Cloud API webhooks, shared team inboxes, and zero-data-retention AI grounding.",
    actionText: "View Solutions"
  },
  {
    id: "card-4",
    icon: Smartphone,
    title: "Native apps for every device you own",
    body: "Experience dedicated, lightning-fast native applications tailored specifically for macOS, Windows, iOS, and Android platforms.",
    actionText: "Download Apps"
  }
];

export const MintClosingRail: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);

  const maxIndex = CARDS.length - 1;

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 28
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.05 : 0.55,
        ease: REVEAL_EASE
      }
    }
  };

  return (
    <div className="bg-[#111b21] pb-[40px]">
      {/* Mint Surface with 0 0 45px 45px lower corners */}
      <section className="bg-[#e6ffda] rounded-b-[45px] text-[#1c1e21] pt-24 pb-20 px-6 sm:px-12 lg:px-[60px] overflow-hidden">
        <div className="max-w-[1080px] mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_DEFAULT}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
          >
            {/* Left Column: 60px Heading, Body Support, 48px Circular Controls */}
            <div className="lg:col-span-5 flex flex-col justify-between self-stretch min-h-[360px]">
              <div>
                <h2 className="text-[40px] sm:text-[50px] lg:text-[60px] leading-[1] font-normal tracking-normal text-[#1c1e21] text-balance">
                  Explore what else you can do
                </h2>

                <p className="text-[18px] leading-[25px] font-normal text-[#1c1e21] mt-6 max-w-[400px]">
                  Discover new capabilities to communicate, organize, and streamline your daily
                  conversations across every workflow.
                </p>
              </div>

              {/* 48px Circular Navigation Controls */}
              <div className="flex items-center gap-4 mt-10">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  aria-label="Previous card"
                  className={`w-12 h-12 rounded-full border border-[#1c1e21] flex items-center justify-center transition-opacity duration-200 hover:bg-[#1c1e21] hover:text-white cursor-pointer ${
                    currentIndex === 0
                      ? "opacity-40 cursor-not-allowed hover:bg-transparent hover:text-inherit"
                      : "opacity-100"
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={currentIndex === maxIndex}
                  aria-label="Next card"
                  className={`w-12 h-12 rounded-full border border-[#1c1e21] flex items-center justify-center transition-opacity duration-200 hover:bg-[#1c1e21] hover:text-white cursor-pointer ${
                    currentIndex === maxIndex
                      ? "opacity-40 cursor-not-allowed hover:bg-transparent hover:text-inherit"
                      : "opacity-100"
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Right Column: Horizontally Scrollable Track of 504×497px White Cards */}
            <div className="lg:col-span-7 overflow-visible">
              <div className="relative">
                <motion.div
                  animate={{
                    x: shouldReduceMotion ? 0 : -currentIndex * (340 + 24)
                  }}
                  transition={{
                    duration: shouldReduceMotion ? 0.05 : 0.5,
                    ease: REVEAL_EASE
                  }}
                  className="flex gap-6 items-stretch"
                >
                  {CARDS.map((card) => {
                    const IconComp = card.icon;
                    return (
                      <div
                        key={card.id}
                        className="w-[310px] sm:w-[380px] lg:w-[440px] min-h-[440px] lg:min-h-[497px] rounded-[25px] bg-white border border-[#dedbd6] p-8 sm:p-12 lg:p-[56px] flex flex-col justify-between shadow-none shrink-0"
                      >
                        <div>
                          <div className="w-12 h-12 rounded-full bg-[#fcf5eb] border border-[#dedbd6] flex items-center justify-center text-[#111b21] mb-8">
                            <IconComp className="w-6 h-6 text-[#25d366]" />
                          </div>

                          <h3 className="text-[26px] sm:text-[32px] leading-[1.1] font-normal tracking-normal text-[#1c1e21]">
                            {card.title}
                          </h3>

                          <p className="text-[16px] leading-[22px] font-normal text-[#5e5e5e] mt-4">
                            {card.body}
                          </p>
                        </div>

                        <div className="pt-8">
                          <button
                            type="button"
                            className="wa-pill-outline px-6 py-3 text-[14px] font-medium"
                          >
                            <span>{card.actionText}</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* 40px Dark Reveal Strip between Mint closing lip and Footer */}
    </div>
  );
};
