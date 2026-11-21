import { useState, useEffect } from "react";
import { ArrowRight, Check, Menu, Moon, Sun, Terminal, X } from "lucide-react";

function GithubIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}
import { Badge, Button } from "@flowdesk/ui";
import { FlowDeskIcon } from "../../components/layout/AppSidebar.js";
import { useTheme } from "../../components/theme-provider.js";
import { HeroSimulator } from "./HeroSimulator.js";
import { ArchitecturePipeline } from "./ArchitecturePipeline.js";
import { CapacityCalculator } from "./CapacityCalculator.js";
import { FeatureBento } from "./FeatureBento.js";
import { ComplianceMatrix } from "./ComplianceMatrix.js";
import { TechnicalFAQ } from "./TechnicalFAQ.js";

const navItems = [
  { label: "Simulator", href: "#simulator" },
  { label: "Architecture", href: "#architecture" },
  { label: "Capabilities", href: "#capabilities" },
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
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      {/* Precision Background Texture */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-40 [background-image:radial-gradient(circle_at_1px_1px,hsl(var(--border))_1px,transparent_0)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />

      {/* Global Sticky Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo & Release Chip */}
          <div className="flex items-center gap-3">
            <a
              href="#hero"
              onClick={(event) => scrollToSection(event, "#hero")}
              className="flex items-center gap-2.5 font-bold tracking-tight text-foreground transition-opacity hover:opacity-90"
            >
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 shadow-xs">
                <FlowDeskIcon size={22} />
              </span>
              <span className="text-lg">FlowDesk</span>
            </a>

            <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-mono text-emerald-400">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>CLOUD API v20.0</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => scrollToSection(event, item.href)}
                className="rounded-md px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Actions & CTA */}
          <div className="hidden items-center gap-2.5 lg:flex">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle theme"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="size-8 rounded-lg text-muted-foreground hover:text-foreground"
            >
              {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </Button>

            <a
              href="https://github.com/ryanakml/flowdesk-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex size-8 items-center justify-center rounded-lg border border-border/60 bg-muted/20 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="GitHub Repository"
            >
              <GithubIcon className="size-4" />
            </a>

            <Button variant="ghost" size="sm" asChild className="text-xs font-semibold">
              <a href={loginHref}>Sign In</a>
            </Button>

            <Button
              size="sm"
              asChild
              className="text-xs font-semibold bg-primary text-primary-foreground shadow-sm hover:opacity-95"
            >
              <a href={loginHref} className="flex items-center gap-1.5">
                <span>Launch Workspace</span>
                <ArrowRight className="size-3.5" />
              </a>
            </Button>
          </div>

          {/* Mobile Menu Trigger */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden size-9"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="size-5" />
          </Button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-background/95 backdrop-blur-2xl lg:hidden">
          <div className="flex h-16 items-center justify-between border-b border-border/60 px-4">
            <div className="flex items-center gap-2 font-bold">
              <FlowDeskIcon size={20} /> FlowDesk
            </div>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            >
              <X className="size-5" />
            </Button>
          </div>
          <nav className="flex flex-col gap-1 p-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => {
                  setMobileOpen(false);
                  scrollToSection(event, item.href);
                }}
                className="rounded-lg px-4 py-3 text-base font-medium text-foreground hover:bg-muted"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-auto grid grid-cols-2 gap-3 border-t border-border/60 p-6">
            <Button variant="outline" asChild>
              <a href={loginHref}>Sign In</a>
            </Button>
            <Button asChild>
              <a href={loginHref}>Launch Workspace</a>
            </Button>
          </div>
        </div>
      )}

      <main className="relative z-10 space-y-24 sm:space-y-32 pb-24">
        {/* =========================================================================
            1. HERO SECTION
           ========================================================================= */}
        <section id="hero" className="relative pt-12 sm:pt-20 lg:pt-28">
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            {/* Top Eyebrow Badge */}
            <div className="mb-6 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-mono font-medium text-primary shadow-xs">
                <span className="size-2 rounded-full bg-primary animate-ping" />
                <span>OFFICIAL META CLOUD API • GROUNDED AI CUSTOMER OPERATIONS</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="mx-auto max-w-5xl text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
              Turn every customer message into a{" "}
              <span className="bg-gradient-to-r from-primary via-orange-400 to-amber-500 bg-clip-text text-transparent">
                grounded operation.
              </span>
            </h1>

            {/* Value Proposition Subhead */}
            <p className="mx-auto mt-6 max-w-3xl text-base sm:text-xl text-muted-foreground leading-relaxed font-normal">
              Stop gambling customer trust on hallucinating chatbots or unverified web scrapers.
              FlowDesk pairs official Meta Cloud API infrastructure with strict vector knowledge
              grounding, real-time multi-agent triage, and deterministic safety gates.
            </p>

            {/* Hero CTAs */}
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
              <Button
                size="lg"
                className="text-sm font-semibold h-12 px-7 bg-primary text-primary-foreground shadow-md hover:opacity-95"
                asChild
              >
                <a href={loginHref} className="flex items-center gap-2">
                  <span>Open FlowDesk</span>
                  <ArrowRight className="size-4" />
                </a>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="text-sm font-semibold h-12 px-7 border-border/80"
                asChild
              >
                <a
                  href="#simulator"
                  onClick={(event) => scrollToSection(event, "#simulator")}
                  className="flex items-center gap-2"
                >
                  <span>Explore Sandbox Simulator</span>
                  <Terminal className="size-4 text-muted-foreground" />
                </a>
              </Button>
            </div>

            {/* Live Metrics Strip */}
            <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4 rounded-xl border border-border/70 bg-card/40 p-4 backdrop-blur-md">
              <div className="border-r border-border/40 last:border-0 p-2">
                <p className="font-mono text-2xl sm:text-3xl font-extrabold text-foreground">
                  1.4s
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">Median Draft Latency</p>
              </div>
              <div className="border-r border-border/40 last:border-0 p-2">
                <p className="font-mono text-2xl sm:text-3xl font-extrabold text-emerald-400">0%</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">Account Ban Risk</p>
              </div>
              <div className="border-r border-border/40 last:border-0 p-2">
                <p className="font-mono text-2xl sm:text-3xl font-extrabold text-foreground">
                  100%
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">Line-Level Citations</p>
              </div>
              <div className="p-2">
                <p className="font-mono text-2xl sm:text-3xl font-extrabold text-primary">58%+</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">Tier-1 FAQ Deflection</p>
              </div>
            </div>

            {/* Interactive Hero Sandbox Simulation */}
            <div id="simulator" className="mt-14 scroll-mt-24">
              <HeroSimulator />
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. ARCHITECTURAL ENGINE ROOM
           ========================================================================= */}
        <section id="architecture" className="scroll-mt-24 px-4 sm:px-6 lg:px-8">
          <ArchitecturePipeline />
        </section>

        {/* =========================================================================
            3. SPECIALIZED ENTERPRISE CAPABILITIES (BENTO)
           ========================================================================= */}
        <section id="capabilities" className="scroll-mt-24 px-4 sm:px-6 lg:px-8">
          <FeatureBento />
        </section>

        {/* =========================================================================
            4. ROI & CAPACITY BENCHMARK CALCULATOR
           ========================================================================= */}
        <section id="calculator" className="scroll-mt-24 px-4 sm:px-6 lg:px-8">
          <CapacityCalculator />
        </section>

        {/* =========================================================================
            5. COMPLIANCE & RISK MATRIX
           ========================================================================= */}
        <section id="compliance" className="scroll-mt-24 px-4 sm:px-6 lg:px-8">
          <ComplianceMatrix />
        </section>

        {/* =========================================================================
            6. TECHNICAL FAQ
           ========================================================================= */}
        <section id="faq" className="scroll-mt-24 px-4 sm:px-6 lg:px-8">
          <TechnicalFAQ />
        </section>

        {/* =========================================================================
            7. COMMAND CENTER FINAL CTA
           ========================================================================= */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-primary/40 bg-gradient-to-b from-primary/10 via-background to-background p-8 sm:p-14 text-center shadow-2xl backdrop-blur-xl">
            <div className="absolute -top-24 left-1/2 size-72 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl pointer-events-none" />

            <Badge variant="outline" className="mb-4 font-mono text-xs">
              READY FOR PRODUCTION TRIAGE
            </Badge>

            <h3 className="mx-auto max-w-3xl text-3xl font-extrabold tracking-tight sm:text-5xl text-foreground">
              Give your support team the quiet confidence of{" "}
              <span className="bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent">
                grounded AI operations.
              </span>
            </h3>

            <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
              Connect your Meta WhatsApp Cloud API credentials in seconds. Ground replies in your
              verified SOPs, protect your business numbers from bans, and accelerate response
              velocity without losing control.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                className="h-12 px-8 text-sm font-semibold bg-primary text-primary-foreground shadow-lg hover:opacity-95"
                asChild
              >
                <a href={loginHref} className="flex items-center gap-2">
                  <span>Launch FlowDesk Workspace</span>
                  <ArrowRight className="size-4" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-8 text-sm font-semibold border-border/80"
                asChild
              >
                <a
                  href="https://github.com/ryanakml/flowdesk-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <GithubIcon className="size-4" />
                  <span>View GitHub Repository</span>
                </a>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] font-mono text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Check className="size-3 text-emerald-500" /> PostgreSQL 16 & pgvector
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="size-3 text-emerald-500" /> Row-Level Security (RLS)
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="size-3 text-emerald-500" /> Docker & Terraform Ready
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="size-3 text-emerald-500" /> Self-Hostable on AWS EC2
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* =========================================================================
          GLOBAL FOOTER
         ========================================================================= */}
      <footer className="border-t border-border/60 bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2.5 font-bold text-base text-foreground">
                <FlowDeskIcon size={24} />
                <span>FlowDesk</span>
              </div>
              <p className="mt-3 max-w-sm text-xs leading-relaxed text-muted-foreground">
                Enterprise AI customer operations platform built on official Meta WhatsApp Cloud
                API. Deterministic knowledge grounding, multi-agent queues, and kernel-level tenant
                isolation.
              </p>
              <div className="mt-4 flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
                <span className="size-2 rounded-full bg-emerald-500" />
                <span>System Status: 100% Operational (Let's Encrypt SSL)</span>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider font-semibold text-foreground">
                Product
              </h4>
              <div className="mt-3 space-y-2.5 text-xs text-muted-foreground">
                <a className="block hover:text-foreground transition-colors" href="#simulator">
                  Sandbox Simulator
                </a>
                <a className="block hover:text-foreground transition-colors" href="#architecture">
                  Architecture Pipeline
                </a>
                <a className="block hover:text-foreground transition-colors" href="#capabilities">
                  Multi-Agent Inbox
                </a>
                <a className="block hover:text-foreground transition-colors" href="#calculator">
                  ROI Benchmark
                </a>
              </div>
            </div>

            {/* Architecture Links */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider font-semibold text-foreground">
                Architecture
              </h4>
              <div className="mt-3 space-y-2.5 text-xs text-muted-foreground">
                <a className="block hover:text-foreground transition-colors" href="#compliance">
                  Meta Compliance Matrix
                </a>
                <a className="block hover:text-foreground transition-colors" href="#faq">
                  pgvector RAG Specs
                </a>
                <a
                  className="block hover:text-foreground transition-colors"
                  href="https://github.com/ryanakml/flowdesk-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terraform Infrastructure
                </a>
                <a
                  className="block hover:text-foreground transition-colors"
                  href="https://flowdesk.nylo.me/livez"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Staging Health Probe
                </a>
              </div>
            </div>

            {/* Security Links */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider font-semibold text-foreground">
                Security
              </h4>
              <div className="mt-3 space-y-2.5 text-xs text-muted-foreground">
                <a
                  className="block hover:text-foreground transition-colors"
                  href="https://github.com/ryanakml/flowdesk-ai/security/advisories/new"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Security Advisories
                </a>
                <a className="block hover:text-foreground transition-colors" href="#faq">
                  Postgres RLS Policies
                </a>
                <a className="block hover:text-foreground transition-colors" href={loginHref}>
                  Operator Sign In
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col justify-between items-center gap-4 border-t border-border/40 pt-6 text-xs text-muted-foreground sm:flex-row font-mono">
            <span>© {new Date().getFullYear()} FlowDesk • All rights reserved.</span>
            <span>Customer operations, made deterministic.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
