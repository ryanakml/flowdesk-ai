import React from "react";
import { ArrowDown, Globe } from "lucide-react";

interface DarkFooterProps {
  onOpenApp?: () => void;
}

const SocialIcons = [
  // X / Twitter
  (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  // Instagram
  (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  // YouTube
  (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  // Facebook
  (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...props}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  // LinkedIn
  (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...props}>
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  )
];

export const DarkFooter: React.FC<DarkFooterProps> = ({ onOpenApp }) => {
  return (
    <footer className="bg-[#111b21] text-white pt-24 pb-12 px-6 sm:px-12 lg:px-[60px]">
      <div className="max-w-[1080px] mx-auto">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-16">
          {/* Left Column: Brand & Primary Green Action Pill */}
          <div className="lg:col-span-4 flex flex-col justify-between items-start space-y-8">
            <div className="flex items-center gap-1.5 text-[24px] font-normal tracking-tight">
              <span className="font-medium text-white">FlowDesk</span>
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#25d366]" />
            </div>

            <div>
              <p className="text-[16px] text-white/70 max-w-[280px] mb-6">
                Simple, reliable, sovereign customer messaging and team automation.
              </p>

              <a
                href="/inbox"
                onClick={onOpenApp}
                className="wa-pill-primary px-8 py-3.5 text-[15px]"
              >
                <span>Open FlowDesk</span>
                <ArrowDown className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right 4 Link Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {/* Column 1: Capabilities */}
            <div>
              <span className="text-[12px] leading-[1.3] text-[#25d366] uppercase tracking-wider block mb-4">
                Capabilities
              </span>
              <ul className="space-y-3.5 text-[16px] text-white/80">
                <li>
                  <a href="#inbox" className="hover:text-white transition-colors">
                    Team Inbox
                  </a>
                </li>
                <li>
                  <a href="#knowledge" className="hover:text-white transition-colors">
                    AI Knowledge Grounding
                  </a>
                </li>
                <li>
                  <a href="#meta-api" className="hover:text-white transition-colors">
                    Meta Cloud API
                  </a>
                </li>
                <li>
                  <a href="#solutions" className="hover:text-white transition-colors">
                    Outbound Broadcasts
                  </a>
                </li>
                <li>
                  <a href="#integrations" className="hover:text-white transition-colors">
                    Webhook Integrations
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Resources */}
            <div>
              <span className="text-[12px] leading-[1.3] text-[#25d366] uppercase tracking-wider block mb-4">
                Resources
              </span>
              <ul className="space-y-3.5 text-[16px] text-white/80">
                <li>
                  <a href="#api" className="hover:text-white transition-colors">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#policy" className="hover:text-white transition-colors">
                    Meta Policy Guide
                  </a>
                </li>
                <li>
                  <a href="#webhooks" className="hover:text-white transition-colors">
                    WhatsApp Webhooks
                  </a>
                </li>
                <li>
                  <a href="#security" className="hover:text-white transition-colors">
                    Security Whitepaper
                  </a>
                </li>
                <li>
                  <a href="#handbook" className="hover:text-white transition-colors">
                    WhatsApp Handbook
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Trust & Platform */}
            <div>
              <span className="text-[12px] leading-[1.3] text-[#25d366] uppercase tracking-wider block mb-4">
                Trust & Platform
              </span>
              <ul className="space-y-3.5 text-[16px] text-white/80">
                <li>
                  <a href="#security" className="hover:text-white transition-colors">
                    Sovereign Encryption
                  </a>
                </li>
                <li>
                  <a href="#zero-training" className="hover:text-white transition-colors">
                    Zero-Training Guarantee
                  </a>
                </li>
                <li>
                  <a href="#compliance" className="hover:text-white transition-colors">
                    SOC 2 Type II
                  </a>
                </li>
                <li>
                  <a href="#gdpr" className="hover:text-white transition-colors">
                    GDPR & DPPA
                  </a>
                </li>
                <li>
                  <a href="#status" className="hover:text-white transition-colors">
                    System Status
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Company */}
            <div>
              <span className="text-[12px] leading-[1.3] text-[#25d366] uppercase tracking-wider block mb-4">
                Company
              </span>
              <ul className="space-y-3.5 text-[16px] text-white/80">
                <li>
                  <a href="#about" className="hover:text-white transition-colors">
                    About FlowDesk
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-white transition-colors">
                    Enterprise Pricing
                  </a>
                </li>
                <li>
                  <a href="#changelog" className="hover:text-white transition-colors">
                    Release Notes
                  </a>
                </li>
                <li>
                  <a href="#brand" className="hover:text-white transition-colors">
                    Brand Assets
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white transition-colors">
                    Contact Sales
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Top-Ruled (#33463f) Utility Bar */}
        <div className="pt-8 border-t border-[#33463f] flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Legal / Copyright */}
          <div className="flex flex-wrap items-center gap-6 text-[14px] text-white/60">
            <span>2026 © FlowDesk Systems Inc.</span>
            <a href="#terms" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#privacy" className="hover:text-white transition-colors">
              Privacy
            </a>
          </div>

          {/* Five 48px Outlined Social Circles */}
          <div className="flex items-center gap-6">
            {SocialIcons.map((IconComp, idx) => (
              <a
                key={idx}
                href={`#social-${idx}`}
                aria-label="Social Link"
                className="w-12 h-12 rounded-full border border-[#33463f] flex items-center justify-center text-white/80 hover:text-white hover:border-[#25d366] transition-colors"
              >
                <IconComp />
              </a>
            ))}
          </div>

          {/* Language Selector Pill */}
          <div>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-[#33463f] px-4 py-2 text-[14px] text-white hover:border-white transition-colors cursor-pointer"
            >
              <Globe className="w-4 h-4 text-[#25d366]" />
              <span>English (US)</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
