import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight, Lock, Key, ShieldCheck, Database } from "lucide-react";
import { REVEAL_EASE, VIEWPORT_DEFAULT } from "./motionTokens.js";

const CIPHER_SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?/~0123456789";
const BASE_PHRASE =
  "END-TO-END ENCRYPTED PROTOCOL · ZERO-KNOWLEDGE AUDIT TRAIL · SOVEREIGN KEY DERIVATION";

export const NightBandReveal: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [scrambleText, setScrambleText] = useState(BASE_PHRASE);

  useEffect(() => {
    if (shouldReduceMotion) return;

    let offset = 0;
    const interval = setInterval(() => {
      offset = (offset + 1) % BASE_PHRASE.length;
      const chars = BASE_PHRASE.split("").map((c, i) => {
        if (c === " " || c === "·") return c;
        // Randomly scramble 15% of the characters around the rolling offset
        if (Math.abs(i - offset) < 6 || Math.random() < 0.12) {
          return CIPHER_SYMBOLS[Math.floor(Math.random() * CIPHER_SYMBOLS.length)];
        }
        return c;
      });
      setScrambleText(chars.join(""));
    }, 90);

    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

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
    <section className="bg-[#111b21] text-white py-28 px-6 sm:px-12 lg:px-[60px] relative overflow-hidden">
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
              <div className="absolute inset-0 bg-[#0b141a]/80 border border-[#33463f]/60 rounded-[30px] transform scale-105 pointer-events-none select-none" />

              {/* Narrower Tall Dark Interface Card */}
              <div className="relative z-10 w-full max-w-[420px] rounded-[25px] bg-[#111b21] border border-[#33463f] p-7 shadow-none overflow-hidden select-none">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#33463f] pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#25d366]/20 text-[#25d366] flex items-center justify-center">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-[15px] font-medium text-white leading-none">
                        Cryptographic Vault
                      </h4>
                      <span className="text-[11px] text-[#25d366] mt-1 block">
                        Noise Protocol · Curve25519
                      </span>
                    </div>
                  </div>
                  <ShieldCheck className="w-5 h-5 text-[#25d366]" />
                </div>

                {/* Telemetry rows */}
                <div className="py-6 space-y-3 font-mono text-xs text-white/70">
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-[#33463f]/50">
                    <span className="flex items-center gap-2 text-white/50">
                      <Key className="w-3.5 h-3.5 text-[#25d366]" /> Ephemeral Keypair
                    </span>
                    <span className="text-[#25d366]">0x7F4B…39CA</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-[#33463f]/50">
                    <span className="flex items-center gap-2 text-white/50">
                      <Database className="w-3.5 h-3.5 text-[#25d366]" /> Payload Cipher
                    </span>
                    <span>AES-256-GCM</span>
                  </div>
                </div>

                {/* Continuous Cipher Strip Loop with Horizontal Edge-Fade Mask */}
                <div className="relative my-2 py-3 bg-black/60 border-y border-[#33463f] overflow-hidden">
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
                <div className="pt-4 mt-2 text-center">
                  <p className="text-[12px] text-white/60">
                    Zero raw messages or encryption keys touch intermediate servers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 60px Typography & White Underlined Link */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <h2 className="text-[40px] sm:text-[50px] lg:text-[60px] leading-[1] font-normal tracking-normal text-white text-balance">
              Speak <span className="text-[#25d366]">freely</span> with end-to-end privacy built
              into the core
            </h2>

            <p className="text-[18px] leading-[25px] font-normal text-white/80 mt-6 max-w-[480px]">
              Your personal messages, audio notes, and team files are secured with uncompromising
              cryptographic guarantees. Only you and the recipient hold the keys — not even FlowDesk
              can read or listen to them.
            </p>

            <div className="mt-8">
              <a href="#security" className="wa-link-underline-night">
                <span className="wa-link-text">Read our technical security whitepaper</span>
                <ChevronRight className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
