import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Lock, Key, ShieldCheck, Database, Cpu } from "lucide-react";
import { REVEAL_EASE, VIEWPORT_DEFAULT } from "./motionTokens.js";

const CIPHER_SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?/~0123456789";
const BASE_PHRASE =
  "SOVEREIGN ENCRYPTION · STRICT TENANT ISOLATION · ZERO-KNOWLEDGE AUDIT TRAIL · NO MODEL TRAINING ON YOUR DATA";

export const NightBandReveal: React.FC = () => {
  const [scrambleText, setScrambleText] = useState(BASE_PHRASE);

  useEffect(() => {
    let offset = 0;
    const interval = setInterval(() => {
      offset = (offset + 1) % BASE_PHRASE.length;
      const chars = BASE_PHRASE.split("").map((c, i) => {
        if (c === " " || c === "·") return c;
        if (Math.abs(i - offset) < 6 || Math.random() < 0.15) {
          return CIPHER_SYMBOLS[Math.floor(Math.random() * CIPHER_SYMBOLS.length)];
        }
        return c;
      });
      setScrambleText(chars.join(""));
    }, 75);

    return () => clearInterval(interval);
  }, []);

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
    <section
      id="security"
      className="bg-[#111b21] text-white py-28 px-6 sm:px-12 lg:px-[60px] relative overflow-hidden"
    >
      <div className="max-w-[1080px] mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_DEFAULT}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          {/* Left Column: Dark Layered Interface with Continuous Cipher Loop */}
          <div className="lg:col-span-6 flex justify-center py-6">
            <div className="relative w-full max-w-[500px] flex items-center justify-center">
              {/* Wider Recessed Backing (rgba(0,0,0,0.25) / #0b141a) */}
              <div className="absolute inset-0 bg-[#0b141a]/90 border border-[#33463f]/60 rounded-[30px] transform scale-105 pointer-events-none select-none shadow-2xl" />

              {/* Narrower Tall Dark Interface Card with subtle float */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 w-full max-w-[420px] rounded-[25px] bg-[#111b21] border border-[#33463f] p-7 shadow-2xl overflow-hidden select-none"
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#33463f] pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#25d366]/20 text-[#25d366] flex items-center justify-center">
                      <Lock className="w-4 h-4 animate-pulse" />
                    </div>
                    <div>
                      <h4 className="text-[15px] font-medium text-white leading-none">
                        Sovereign Vault Isolation
                      </h4>
                      <span className="text-[11px] text-[#25d366] mt-1 block font-mono">
                        Hardware HSM · Tenant KMS Key Derivation
                      </span>
                    </div>
                  </div>
                  <ShieldCheck className="w-5 h-5 text-[#25d366]" />
                </div>

                {/* Telemetry rows */}
                <div className="py-5 space-y-2.5 font-mono text-xs text-white/70">
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/50 border border-[#33463f]/50">
                    <span className="flex items-center gap-2 text-white/50">
                      <Key className="w-3.5 h-3.5 text-[#25d366]" /> Session KMS Key
                    </span>
                    <span className="text-[#25d366] font-semibold">0x7F4B…39CA (15m)</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/50 border border-[#33463f]/50">
                    <span className="flex items-center gap-2 text-white/50">
                      <Database className="w-3.5 h-3.5 text-[#25d366]" /> Envelope Cipher
                    </span>
                    <span>AES-256-GCM + SHA-512</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/50 border border-[#33463f]/50">
                    <span className="flex items-center gap-2 text-white/50">
                      <Cpu className="w-3.5 h-3.5 text-[#25d366]" /> LLM Retention
                    </span>
                    <span className="text-emerald-400">Strictly Zero-Training</span>
                  </div>
                </div>

                {/* Continuous Cipher Strip Loop with Horizontal Edge-Fade Mask */}
                <div className="relative my-2 py-3 bg-black/70 border-y border-[#33463f] overflow-hidden">
                  <div
                    className="font-mono text-[13px] tracking-wider text-[#25d366] font-semibold whitespace-nowrap text-center select-none"
                    style={{
                      maskImage:
                        "linear-gradient(90deg, transparent 0%, #000 18%, #000 82%, transparent 100%)",
                      WebkitMaskImage:
                        "linear-gradient(90deg, transparent 0%, #000 18%, #000 82%, transparent 100%)"
                    }}
                  >
                    {scrambleText}
                  </div>
                </div>

                {/* Bottom Verification Note */}
                <div className="pt-4 mt-2 text-center flex items-center justify-center gap-2 text-[12px] text-white/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25d366] animate-ping" />
                  <span>Your enterprise chat logs are never used to train public models.</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column: 60px Typography & White Underlined Link */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <h2 className="text-[40px] sm:text-[50px] lg:text-[60px] leading-[1] font-normal tracking-normal text-white text-balance">
              Zero training on your customer conversations
            </h2>

            <p className="text-[18px] leading-[25px] font-normal text-white/80 mt-6 max-w-[480px]">
              Customer phone numbers, home addresses, and private messages stay strictly yours.
              FlowDesk enforces hardware-backed envelope encryption, tenant KMS key isolation, and a
              strict contract guarantee: your chats are never fed to public LLMs.
            </p>

            <div className="mt-8">
              <a href="#security" className="wa-link-underline-night">
                <span className="wa-link-text">Read the security architecture</span>
                <ChevronRight className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
