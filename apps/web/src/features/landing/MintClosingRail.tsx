import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Megaphone, Zap, Webhook, BarChart3 } from "lucide-react";
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
    icon: Megaphone,
    title: "Targeted broadcast campaigns at scale",
    body: "Dispatch personalized updates and notifications to 100k+ opted-in customers using Meta-approved HSM templates with 99.98% delivery rate.",
    actionText: "Explore Campaigns"
  },
  {
    id: "card-2",
    icon: Zap,
    title: "Canned snippets & instant shortcuts",
    body: "Slash response times with /shortcut snippets, customer variable interpolation, rich media attachments, and automated ticket classification.",
    actionText: "View Productivity"
  },
  {
    id: "card-3",
    icon: Webhook,
    title: "Real-time webhook and CRM synchronization",
    body: "Stream incoming WhatsApp events directly into Shopify, Salesforce, PostgreSQL, or your custom internal APIs in under 50 milliseconds.",
    actionText: "Browse Integrations"
  },
  {
    id: "card-4",
    icon: BarChart3,
    title: "Granular SLA tracking & deflection analytics",
    body: "Monitor first-response time, AI autonomous deflection percentages, and individual agent resolution volume across shifting work hours.",
    actionText: "See Analytics"
  }
];

export const MintClosingRail: React.FC = () => {
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
    <div className="bg-[#111b21] pb-[40px]">
      {/* Mint Surface with 0 0 45px 45px lower corners */}
      <section
        id="solutions"
        className="bg-[#e6ffda] rounded-b-[45px] text-[#1c1e21] pt-24 pb-20 px-6 sm:px-12 lg:px-[60px] overflow-hidden"
      >
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
                  Explore what your team can build
                </h2>

                <p className="text-[18px] leading-[25px] font-normal text-[#1c1e21] mt-6 max-w-[400px]">
                  From automated outbound dispatch to compliant team collaboration, equip your
                  support operations with tools designed specifically for WhatsApp.
                </p>
              </div>

              {/* 48px Circular Navigation Controls */}
              <div className="flex items-center gap-4 mt-10">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  aria-label="Previous card"
                  className={`w-12 h-12 rounded-full border border-[#1c1e21] flex items-center justify-center transition-all duration-200 hover:bg-[#1c1e21] hover:text-white cursor-pointer active:scale-95 ${
                    currentIndex === 0
                      ? "opacity-35 cursor-not-allowed hover:bg-transparent hover:text-inherit"
                      : "opacity-100 shadow-xs"
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={currentIndex === maxIndex}
                  aria-label="Next card"
                  className={`w-12 h-12 rounded-full border border-[#1c1e21] flex items-center justify-center transition-all duration-200 hover:bg-[#1c1e21] hover:text-white cursor-pointer active:scale-95 ${
                    currentIndex === maxIndex
                      ? "opacity-35 cursor-not-allowed hover:bg-transparent hover:text-inherit"
                      : "opacity-100 shadow-xs"
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Dots indicator */}
                <div className="flex items-center gap-2 ml-4">
                  {CARDS.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        currentIndex === idx
                          ? "w-6 bg-[#1c1e21]"
                          : "w-2 bg-[#1c1e21]/25 hover:bg-[#1c1e21]/50"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Horizontally Scrollable Track of 504×497px White Cards */}
            <div className="lg:col-span-7 overflow-visible">
              <div className="relative">
                <motion.div
                  animate={{
                    x: -currentIndex * (340 + 24)
                  }}
                  transition={{
                    duration: 0.5,
                    ease: REVEAL_EASE
                  }}
                  className="flex gap-6 items-stretch"
                >
                  {CARDS.map((card) => {
                    const IconComp = card.icon;
                    return (
                      <motion.div
                        key={card.id}
                        whileHover={{ y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="w-[310px] sm:w-[380px] lg:w-[440px] min-h-[440px] lg:min-h-[497px] rounded-[25px] bg-white border border-[#dedbd6] p-8 sm:p-12 lg:p-[56px] flex flex-col justify-between shadow-lg shrink-0 cursor-default"
                      >
                        <div>
                          <div className="w-12 h-12 rounded-full bg-[#fcf5eb] border border-[#dedbd6] flex items-center justify-center text-[#111b21] mb-8 shadow-xs">
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
                      </motion.div>
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
