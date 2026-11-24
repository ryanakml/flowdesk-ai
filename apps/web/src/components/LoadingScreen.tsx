import * as React from "react";
import { ShieldCheck } from "lucide-react";
import { FlowDeskIcon } from "./layout/AppSidebar.js";

export function LoadingScreen() {
  return (
    <div className="login-wrap min-h-screen bg-[#f6f6f8] flex flex-col justify-between items-center py-10 px-4 sm:px-6 relative select-none dark:bg-[#0f1013]">
      {/* Top Brand Bar */}
      <header className="w-full max-w-[1080px] flex items-center justify-between z-10 py-2">
        <div className="inline-flex items-center gap-1.5 text-[20px] font-normal tracking-tight text-[#0d0d12] dark:text-white">
          <span className="font-semibold">FlowDesk</span>
          <span className="inline-block w-2 h-2 rounded-full bg-[#25d366]" />
        </div>
        <span className="text-xs font-mono text-[#56576a] bg-white border border-black/[0.08] px-2.5 py-1 rounded-full shadow-2xs dark:bg-[#15171c] dark:border-white/[0.08]">
          v1.4.0
        </span>
      </header>

      {/* Main Glass Card */}
      <main className="w-full max-w-[420px] my-auto py-8 z-10">
        <div
          className="glass-card login-card bg-white border border-black/[0.08] rounded-[24px] p-8 sm:p-10 shadow-lg text-center relative overflow-hidden dark:bg-[#15171c] dark:border-white/[0.08]"
          role="status"
          aria-live="polite"
        >
          {/* Animated Spinner & Brand Mark */}
          <div className="relative w-16 h-16 mx-auto mb-6 flex items-center justify-center">
            {/* Spinning emerald orbital ring */}
            <div className="absolute inset-0 rounded-full border-2 border-[#25d366]/20 border-t-[#25d366] animate-spin" />
            {/* Brand squircle inside */}
            <div className="w-11 h-11 rounded-[14px] bg-[#f6f6f8] border border-black/[0.08] flex items-center justify-center shadow-2xs dark:bg-white/[0.04] dark:border-white/[0.08]">
              <FlowDeskIcon size={26} />
            </div>
          </div>

          {/* Heading (Preserves test expectation: "Loading FlowDesk…") */}
          <h2 className="login-title text-[24px] font-semibold tracking-tight text-[#0d0d12] leading-tight mb-2 dark:text-white">
            Loading FlowDesk…
          </h2>

          {/* Subtitle (Preserves test expectation: "Verifying secure tenant session") */}
          <p className="login-subtitle text-[14px] text-[#56576a] font-normal leading-relaxed flex items-center justify-center gap-2 mb-6 dark:text-zinc-400">
            <span>Verifying secure tenant session</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#25d366] animate-pulse" />
          </p>

          {/* Shimmering Linear Progress Track */}
          <div className="w-full bg-[#f6f6f8] h-1.5 rounded-full overflow-hidden border border-black/[0.06] dark:bg-white/[0.06] dark:border-white/[0.06]">
            <div className="h-full bg-gradient-to-r from-[#25d366]/40 via-[#25d366] to-[#25d366]/40 rounded-full w-2/3 animate-[pulse_1.5s_ease-in-out_infinite]" />
          </div>

          {/* Security & Isolation Footnote */}
          <div className="mt-6 pt-5 border-t border-black/[0.06] flex items-center justify-center gap-1.5 text-[11px] text-[#56576a] dark:border-white/[0.06]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#25d366]" />
            <span>Zero-Trust cryptographic handshake</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-[1080px] text-center text-xs text-[#5e5e5e] py-4 z-10">
        2026 © FlowDesk Systems Inc. All rights reserved.
      </footer>
    </div>
  );
}
