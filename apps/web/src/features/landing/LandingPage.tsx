import { useState, useEffect } from "react";
import { ArrowRight, Menu, Moon, Sun, X } from "lucide-react";
import { FlowDeskIcon } from "../../components/layout/AppSidebar.js";
import { useTheme } from "../../components/theme-provider.js";
import { HeroSimulator } from "./HeroSimulator.js";
import { ArchitecturePipeline } from "./ArchitecturePipeline.js";
import { CapacityCalculator } from "./CapacityCalculator.js";
import { FeatureBento } from "./FeatureBento.js";
import { ProofSheet } from "./ProofSheet.js";
import { ComplianceMatrix } from "./ComplianceMatrix.js";
import { TechnicalFAQ } from "./TechnicalFAQ.js";

const navItems = [
  { label: "Simulator", href: "#simulator" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Architecture", href: "#architecture" },
  { label: "Proof", href: "#proof" },
  { label: "ROI Benchmark", href: "#calculator" },
  { label: "Compliance", href: "#compliance" },
  { label: "FAQ", href: "#faq" }
];

const loginHref = "/api/v1/auth/login?returnTo=/inbox";

function scrollToSection(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
  if (!href.startsWith("#")) return;
  const target = document.querySelector(href);
  if (!target) return;
  event.preventDefault();
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function LandingPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark =
    mounted &&
    (theme === "dark" ||
      (theme === "system" &&
        typeof window !== "undefined" &&
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches));

  return (
    <div className="min-h-screen bg-white dark:bg-[#111317] text-[#111111] dark:text-[#f4f4f5] selection:bg-[#0007cb] selection:text-white">
      {/* Fixed 66px Navigation Shell */}
      <header className="sticky top-0 z-50 w-full border-b border-[#dedbd6] dark:border-[#2b3038] bg-white/95 dark:bg-[#111317]/95 backdrop-blur-md">
        <div className="mx-auto flex h-[66px] max-w-[1440px] items-center justify-between px-4 sm:px-8">
          {/* Logo & Category Marker */}
          <div className="flex items-center gap-3">
            <a
              href="#hero"
              onClick={(event) => scrollToSection(event, "#hero")}
              className="flex items-center gap-2.5 font-bold tracking-tight text-[#111111] dark:text-[#f4f4f5] transition-opacity hover:opacity-85"
            >
              <span className="flex size-8 items-center justify-center rounded-[4px] bg-[#111111] dark:bg-[#f4f4f5] text-white dark:text-[#111111]">
                <FlowDeskIcon size={18} />
              </span>
              <span className="text-lg font-semibold tracking-tight">FlowDesk</span>
            </a>

            <div className="hidden sm:flex items-center gap-1.5 border border-[#dedbd6] dark:border-[#2b3038] bg-[#faf9f6] dark:bg-[#181b20] px-2.5 py-0.5 text-[10px] font-mono text-[#111111] dark:text-[#f4f4f5]">
              <span className="size-1.5 bg-[#0007cb]" />
              <span>CLOUD API v20.0</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => scrollToSection(event, item.href)}
                className="text-xs font-mono uppercase tracking-wider text-[#707070] dark:text-[#a0a0a0] transition-colors hover:text-[#111111] dark:hover:text-[#f4f4f5]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Action Stack */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="flex size-9 items-center justify-center border border-[#dedbd6] dark:border-[#2b3038] bg-white dark:bg-[#181b20] text-[#111111] dark:text-[#f4f4f5] transition-colors hover:border-[#111111]"
              title="Toggle color theme"
              aria-label="Toggle color theme"
            >
              {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>

            {/* Primary Action Button (40px Height, 4px Radius) */}
            <a
              href={loginHref}
              className="h-10 px-4 rounded-[4px] bg-[#111111] dark:bg-[#f4f4f5] text-white dark:text-[#111111] hover:bg-[#0007cb] dark:hover:bg-[#0007cb] dark:hover:text-white transition-colors text-xs font-mono font-semibold flex items-center justify-center gap-2"
            >
              <span>Open FlowDesk</span>
              <ArrowRight className="size-3.5" />
            </a>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex size-9 items-center justify-center border border-[#dedbd6] dark:border-[#2b3038] lg:hidden text-[#111111] dark:text-[#f4f4f5]"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileOpen && (
          <div className="border-t border-[#dedbd6] dark:border-[#2b3038] bg-white dark:bg-[#111317] p-4 lg:hidden">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(event) => {
                    scrollToSection(event, item.href);
                    setMobileOpen(false);
                  }}
                  className="p-2 font-mono text-xs uppercase tracking-wider text-[#707070] dark:text-[#a0a0a0] hover:text-[#111111] dark:hover:text-[#f4f4f5]"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-2 border-t border-[#dedbd6] dark:border-[#2b3038]">
                <a
                  href={loginHref}
                  className="flex h-10 w-full items-center justify-center rounded-[4px] bg-[#111111] text-white text-xs font-mono font-semibold"
                >
                  Open FlowDesk
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content Stream */}
      <main>
        {/* Band 1: First Screen: Editorial Clearing Opening (White Canvas) */}
        <section
          id="hero"
          className="relative min-h-[calc(100vh-66px)] flex flex-col justify-center border-b border-[#dedbd6] dark:border-[#2b3038] px-4 py-20 sm:px-8 bg-white dark:bg-[#111317]"
        >
          {/* Corner Registration Marks */}
          <span className="absolute top-4 left-4 size-2 bg-[#d3cec6] dark:bg-[#383e48]" />
          <span className="absolute top-4 right-4 size-2 bg-[#d3cec6] dark:bg-[#383e48]" />
          <span className="absolute bottom-4 left-4 size-2 bg-[#d3cec6] dark:bg-[#383e48]" />
          <span className="absolute bottom-4 right-4 size-2 bg-[#d3cec6] dark:bg-[#383e48]" />

          <div className="mx-auto max-w-5xl text-center">
            {/* Review & Status Lead */}
            <div className="inline-flex items-center gap-2 border border-[#dedbd6] dark:border-[#2b3038] bg-[#faf9f6] dark:bg-[#181b20] px-3 py-1 font-mono text-xs text-[#111111] dark:text-[#f4f4f5] mb-6">
              <span className="size-2 bg-[#0007cb]" />
              <span className="tracking-wider uppercase">
                OFFICIAL META CLOUD API • POSTGRESQL RLS ISOLATION
              </span>
            </div>

            {/* Monumental 80px Display Headline with Pale Clause Framing */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-normal leading-[1.03] tracking-[-0.03em] text-[#111111] dark:text-[#f4f4f5] max-w-5xl mx-auto">
              <span className="text-[#a0a0a0]">For customer teams that scale on WhatsApp:</span>
              <br />
              Turn every customer message into a grounded operation.
            </h1>

            {/* 640px Centered Editorial Literary Serif Support Paragraph */}
            <p className="mt-6 max-w-[640px] mx-auto font-serif text-base sm:text-lg leading-relaxed text-[#585858] dark:text-[#a0a0a0]">
              FlowDesk replaces fragile browser workarounds with official Meta Cloud API
              infrastructure, kernel-level PostgreSQL tenant isolation, and deterministic AI drafts
              verified against your real operational documents.
            </p>

            {/* Paired 40px Actions */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={loginHref}
                className="h-10 px-5 rounded-[4px] bg-[#111111] dark:bg-[#f4f4f5] text-white dark:text-[#111111] hover:bg-[#0007cb] dark:hover:bg-[#0007cb] dark:hover:text-white transition-colors text-xs font-mono font-semibold flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Open FlowDesk</span>
                <ArrowRight className="size-3.5" />
              </a>

              <a
                href="#architecture"
                onClick={(event) => scrollToSection(event, "#architecture")}
                className="h-10 px-5 rounded-[4px] border border-[#111111] dark:border-[#f4f4f5] bg-transparent text-[#111111] dark:text-[#f4f4f5] hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-xs font-mono font-medium flex items-center justify-center gap-2"
              >
                <span>Technical Architecture</span>
              </a>
            </div>

            {/* Trial Reassurance */}
            <p className="mt-4 font-mono text-[11px] text-[#a0a0a0]">
              Official Meta Business Solution • Zero Model Training on Customer Conversations
            </p>

            {/* Enterprise Telemetry Strip */}
            <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-[#dedbd6] dark:border-[#2b3038] pt-8 text-center font-mono">
              <div>
                <p className="text-xl sm:text-2xl font-bold text-[#111111] dark:text-[#f4f4f5]">
                  &lt; 15s
                </p>
                <p className="text-[11px] text-[#707070]">First Response Acceleration</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-[#0007cb]">0%</p>
                <p className="text-[11px] text-[#707070]">WhatsApp Account Ban Risk</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-[#111111] dark:text-[#f4f4f5]">
                  98.4%
                </p>
                <p className="text-[11px] text-[#707070]">Grounded Semantic Match</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-[#111111] dark:text-[#f4f4f5]">
                  99.99%
                </p>
                <p className="text-[11px] text-[#707070]">Webhook Ingress SLA</p>
              </div>
            </div>
          </div>
        </section>

        {/* Band 2: Photographic Product Stage: Interactive Co-Pilot Simulator (Warm White Band) */}
        <section
          id="simulator"
          className="border-b border-[#dedbd6] dark:border-[#2b3038] bg-[#faf9f6] dark:bg-[#15171c] px-4 py-16 sm:px-8"
        >
          <div className="mx-auto max-w-6xl mb-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="size-2 bg-[#0007cb]" />
              <span className="font-mono text-xs uppercase tracking-wider text-[#111111] dark:text-[#f4f4f5]">
                STAGED WORKSPACE DEMONSTRATION
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-normal tracking-[-0.0296em] text-[#111111] dark:text-[#f4f4f5]">
              Experience the verified co-pilot workflow.
            </h2>
          </div>
          <HeroSimulator />
        </section>

        {/* Band 3: 60:40 Split Capability Demonstration (White Canvas) */}
        <section
          id="capabilities"
          className="border-b border-[#dedbd6] dark:border-[#2b3038] bg-white dark:bg-[#111317] px-4 py-20 sm:px-8"
        >
          <FeatureBento />
        </section>

        {/* Band 4: The Engine Room: 5-Stage Deterministic Pipeline (Warm White Band) */}
        <section
          id="architecture"
          className="border-b border-[#dedbd6] dark:border-[#2b3038] bg-[#faf9f6] dark:bg-[#15171c] px-4 py-20 sm:px-8"
        >
          <ArchitecturePipeline />
        </section>

        {/* Band 5: Annotated Customer Proof Sheet (White Canvas) */}
        <section
          id="proof"
          className="border-b border-[#dedbd6] dark:border-[#2b3038] bg-white dark:bg-[#111317] px-4 py-20 sm:px-8"
        >
          <ProofSheet />
        </section>

        {/* Band 6: Compact Commercial & Capacity Estimator (Warm White Band) */}
        <section
          id="calculator"
          className="border-b border-[#dedbd6] dark:border-[#2b3038] bg-[#faf9f6] dark:bg-[#15171c] px-4 py-20 sm:px-8"
        >
          <CapacityCalculator />
        </section>

        {/* Band 7: Audited Enterprise Compliance Matrix (White Canvas) */}
        <section
          id="compliance"
          className="border-b border-[#dedbd6] dark:border-[#2b3038] bg-white dark:bg-[#111317] px-4 py-20 sm:px-8"
        >
          <ComplianceMatrix />
        </section>

        {/* Band 8: Two-Column Questions & FAQ (Warm White Band) */}
        <section
          id="faq"
          className="border-b border-[#dedbd6] dark:border-[#2b3038] bg-[#faf9f6] dark:bg-[#15171c] px-4 py-20 sm:px-8"
        >
          <TechnicalFAQ />
        </section>

        {/* Signature Closing Section: Registration Lattice Closing */}
        <section className="relative px-4 py-24 sm:px-8 bg-white dark:bg-[#111317] border-b border-[#dedbd6] dark:border-[#2b3038] overflow-hidden">
          {/* Blue Micro-Square Lattice Background (180px Interval) */}
          <div
            className="pointer-events-none absolute inset-0 opacity-20 dark:opacity-30"
            style={{
              backgroundImage: "radial-gradient(circle, #0007cb 1.5px, transparent 1.5px)",
              backgroundSize: "160px 160px"
            }}
          />

          <div className="relative mx-auto max-w-4xl text-center">
            <span className="font-mono text-xs uppercase tracking-wider text-[#0007cb] font-semibold block mb-4">
              ENTERPRISE READINESS GUARANTEED
            </span>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-normal tracking-[-0.03em] leading-tight text-[#111111] dark:text-[#f4f4f5]">
              Build your customer operations on official infrastructure.
            </h2>

            <p className="mt-5 max-w-xl mx-auto font-serif text-base sm:text-lg text-[#585858] dark:text-[#a0a0a0] leading-relaxed">
              Connect your WhatsApp Business Account in minutes or inspect the self-hosted
              deployment architecture.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={loginHref}
                className="h-10 px-6 rounded-[4px] bg-[#111111] dark:bg-[#f4f4f5] text-white dark:text-[#111111] hover:bg-[#0007cb] dark:hover:bg-[#0007cb] dark:hover:text-white transition-colors text-xs font-mono font-semibold flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Open FlowDesk</span>
                <ArrowRight className="size-3.5" />
              </a>

              <a
                href="https://github.com/ryanakml/flowdesk-ai"
                target="_blank"
                rel="noreferrer"
                className="h-10 px-5 rounded-[4px] border border-[#111111] dark:border-[#f4f4f5] bg-transparent text-[#111111] dark:text-[#f4f4f5] hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-xs font-mono font-medium flex items-center justify-center gap-2"
              >
                <span>GitHub Repository</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Open 5-Column Footer Navigation (White Canvas) */}
      <footer className="bg-white dark:bg-[#111317] px-4 py-16 sm:px-8 border-t border-[#dedbd6] dark:border-[#2b3038]">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
            {/* Col 1: Identity */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 font-bold text-sm tracking-tight text-[#111111] dark:text-[#f4f4f5]">
                <span className="flex size-7 items-center justify-center rounded-[4px] bg-[#111111] dark:bg-[#f4f4f5] text-white dark:text-[#111111]">
                  <FlowDeskIcon size={14} />
                </span>
                <span>FlowDesk</span>
              </div>
              <p className="mt-3 text-xs text-[#707070] leading-relaxed font-serif">
                Enterprise WhatsApp automation & shared team inbox with grounded AI citations.
              </p>
              <div className="mt-3 font-mono text-[10px] text-[#a0a0a0]">
                Official Meta Cloud API Partner
              </div>
            </div>

            {/* Col 2: Platform */}
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-[#111111] dark:text-[#f4f4f5] font-semibold mb-3">
                PLATFORM
              </p>
              <ul className="space-y-2 text-xs font-sans text-[#707070] dark:text-[#a0a0a0]">
                <li>
                  <a
                    href="#simulator"
                    className="hover:text-[#111111] dark:hover:text-[#f4f4f5] transition-colors"
                  >
                    Shared Team Inbox
                  </a>
                </li>
                <li>
                  <a
                    href="#capabilities"
                    className="hover:text-[#111111] dark:hover:text-[#f4f4f5] transition-colors"
                  >
                    Collision Guard
                  </a>
                </li>
                <li>
                  <a
                    href="#capabilities"
                    className="hover:text-[#111111] dark:hover:text-[#f4f4f5] transition-colors"
                  >
                    24h Window Enforcer
                  </a>
                </li>
                <li>
                  <a
                    href="#simulator"
                    className="hover:text-[#111111] dark:hover:text-[#f4f4f5] transition-colors"
                  >
                    Grounded Copilot
                  </a>
                </li>
                <li>
                  <a
                    href="#architecture"
                    className="hover:text-[#111111] dark:hover:text-[#f4f4f5] transition-colors"
                  >
                    Hybrid Vector RAG
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Architecture */}
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-[#111111] dark:text-[#f4f4f5] font-semibold mb-3">
                INFRASTRUCTURE
              </p>
              <ul className="space-y-2 text-xs font-sans text-[#707070] dark:text-[#a0a0a0]">
                <li>
                  <a
                    href="#architecture"
                    className="hover:text-[#111111] dark:hover:text-[#f4f4f5] transition-colors"
                  >
                    PostgreSQL RLS Boundary
                  </a>
                </li>
                <li>
                  <a
                    href="#architecture"
                    className="hover:text-[#111111] dark:hover:text-[#f4f4f5] transition-colors"
                  >
                    Transactional Outbox
                  </a>
                </li>
                <li>
                  <a
                    href="#architecture"
                    className="hover:text-[#111111] dark:hover:text-[#f4f4f5] transition-colors"
                  >
                    Redis DLQ Idempotency
                  </a>
                </li>
                <li>
                  <a
                    href="#compliance"
                    className="hover:text-[#111111] dark:hover:text-[#f4f4f5] transition-colors"
                  >
                    AWS EC2 / ECS Staging
                  </a>
                </li>
                <li>
                  <a
                    href="#compliance"
                    className="hover:text-[#111111] dark:hover:text-[#f4f4f5] transition-colors"
                  >
                    Caddy TLS Ingress
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 4: Developers */}
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-[#111111] dark:text-[#f4f4f5] font-semibold mb-3">
                DEVELOPERS
              </p>
              <ul className="space-y-2 text-xs font-sans text-[#707070] dark:text-[#a0a0a0]">
                <li>
                  <a
                    href="#capabilities"
                    className="hover:text-[#111111] dark:hover:text-[#f4f4f5] transition-colors"
                  >
                    REST API Reference
                  </a>
                </li>
                <li>
                  <a
                    href="#capabilities"
                    className="hover:text-[#111111] dark:hover:text-[#f4f4f5] transition-colors"
                  >
                    HMAC Webhooks
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/ryanakml/flowdesk-ai"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#111111] dark:hover:text-[#f4f4f5] transition-colors"
                  >
                    GitHub Monorepo
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    className="hover:text-[#111111] dark:hover:text-[#f4f4f5] transition-colors"
                  >
                    Architecture Runbooks
                  </a>
                </li>
                <li>
                  <a
                    href="#compliance"
                    className="hover:text-[#111111] dark:hover:text-[#f4f4f5] transition-colors"
                  >
                    Zero-Training Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 5: Security */}
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-[#111111] dark:text-[#f4f4f5] font-semibold mb-3">
                COMPLIANCE
              </p>
              <ul className="space-y-2 text-xs font-sans text-[#707070] dark:text-[#a0a0a0]">
                <li>
                  <span className="text-[#0007cb] font-mono">● Official Meta Cloud API</span>
                </li>
                <li>
                  <span className="text-[#707070]">PostgreSQL Row-Level Security</span>
                </li>
                <li>
                  <span className="text-[#707070]">SOC2 / ISO27001 Aligned</span>
                </li>
                <li>
                  <span className="text-[#707070]">Zero Data Retention AI</span>
                </li>
                <li>
                  <span className="text-[#707070]">TLS 1.3 Transport Encryption</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Legal Row with House Rule 1 License Credit */}
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[#dedbd6] dark:border-[#2b3038] pt-6 font-mono text-[11px] text-[#a0a0a0]">
            <div>
              &copy; {new Date().getFullYear()} FlowDesk Technologies Inc. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <span>Jakarta • Singapore</span>
              <span>•</span>
              <span>flowdesk.nylo.me</span>
              <span>•</span>
              <span className="text-[#707070]">License Stand-ins: Wikimedia Commons / CC0</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
