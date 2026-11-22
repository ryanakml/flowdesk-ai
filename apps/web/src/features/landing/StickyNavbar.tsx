import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, ChevronRight } from "lucide-react";

interface StickyNavbarProps {
  onOpenApp?: () => void;
}

export const StickyNavbar: React.FC<StickyNavbarProps> = ({ onOpenApp }) => {
  return (
    <header className="sticky top-0 z-50 h-[80px] bg-[#fcf5eb] border-b border-[#fcf5eb] px-6 sm:px-12 lg:px-[60px] flex items-center justify-between transition-colors duration-300">
      {/* Brand Slot Left */}
      <div className="flex items-center gap-2">
        <a
          href="/"
          className="flex items-center gap-1.5 text-[22px] font-normal tracking-tight text-[#1c1e21] hover:opacity-90 transition-opacity"
        >
          <span className="font-medium">FlowDesk</span>
          <span className="inline-block w-2 h-2 rounded-full bg-[#25d366]" />
        </a>
      </div>

      {/* Center Links (Product Capabilities) */}
      <nav className="hidden md:flex items-center gap-8 text-[16px] font-normal text-[#1c1e21]">
        <a href="#inbox" className="hover:text-[#00803e] transition-colors">
          Team Inbox
        </a>
        <a href="#knowledge" className="hover:text-[#00803e] transition-colors">
          AI Knowledge
        </a>
        <a href="#broadcasts" className="hover:text-[#00803e] transition-colors">
          Meta Cloud API
        </a>
        <a href="#security" className="hover:text-[#00803e] transition-colors">
          Security
        </a>
        <a href="#integrations" className="hover:text-[#00803e] transition-colors">
          Integrations
        </a>
      </nav>

      {/* Right Action Pills */}
      <div className="flex items-center gap-3">
        <motion.a
          href="/inbox"
          onClick={onOpenApp}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="wa-pill-outline hidden sm:inline-flex px-5 py-2.5 text-[14px]"
        >
          <span>Sign In</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </motion.a>
        <motion.a
          href="/inbox"
          onClick={onOpenApp}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="wa-pill-primary px-5 py-2.5 text-[14px]"
        >
          <span>Open FlowDesk</span>
          <ArrowDown className="w-3.5 h-3.5" />
        </motion.a>
      </div>
    </header>
  );
};
