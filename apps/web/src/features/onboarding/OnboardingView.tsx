import * as React from "react";
import { useState, useId } from "react";
import { Building2, ArrowRight, LogOut, Loader2, ShieldCheck } from "lucide-react";
import { useAuth } from "../auth/context.js";

export function OnboardingView() {
  const { sessionUser, errorMsg, bootstrapping, handleLogout, handleBootstrap } = useAuth();

  const [newOrgName, setNewOrgName] = useState("");
  const [newOrgSlug, setNewOrgSlug] = useState("");
  const [orgSlugManuallyEdited, setOrgSlugManuallyEdited] = useState(false);

  const newOrgNameId = useId();
  const newOrgSlugId = useId();

  return (
    <div className="app-container min-h-screen bg-[#f6f6f8] flex flex-col justify-between items-center py-6 px-4 sm:px-8 relative select-none dark:bg-[#0f1013]">
      {/* Top Navigation Header */}
      <header className="top-nav w-full max-w-[1140px] flex items-center justify-between z-10 py-3">
        <div className="brand-section flex items-center gap-2">
          <a
            href="/"
            className="logo-badge inline-flex items-center gap-2 group text-[#0d0d12] dark:text-white"
          >
            <div className="flex items-center gap-1.5 text-[20px] font-normal tracking-tight">
              <span className="font-semibold text-[#0d0d12] dark:text-white">FlowDesk</span>
              <span className="inline-block w-2 h-2 rounded-full bg-[#25d366]" />
            </div>
          </a>
        </div>

        <div className="user-controls flex items-center gap-3">
          <div className="user-badge flex items-center gap-2 bg-white border border-black/[0.08] rounded-full px-3 py-1 shadow-2xs dark:bg-[#15171c] dark:border-white/[0.08]">
            <span className="user-avatar w-6 h-6 rounded-full bg-[#25d366] text-[#0d0d12] flex items-center justify-center text-xs font-bold shrink-0">
              {sessionUser?.displayName?.charAt(0)?.toUpperCase() ??
                sessionUser?.email?.charAt(0)?.toUpperCase() ??
                "U"}
            </span>
            <span className="text-xs text-[#0d0d12] dark:text-zinc-200 font-medium max-w-[140px] truncate">
              {sessionUser?.displayName || sessionUser?.email}
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              void handleLogout();
            }}
            className="inline-flex items-center gap-1.5 text-xs text-[#56576a] hover:text-red-600 transition-colors py-1.5 px-3 rounded-full hover:bg-black/5 cursor-pointer border border-black/[0.08] bg-white shadow-2xs dark:bg-[#15171c] dark:border-white/[0.08]"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign out</span>
          </button>
        </div>
      </header>

      {/* Main Onboarding Card */}
      <main className="main-content w-full max-w-[480px] my-auto py-6 z-10">
        {errorMsg && (
          <div className="toast-banner toast-error mb-4 p-3.5 rounded-[16px] bg-red-50 border border-red-200 text-xs text-red-700 leading-relaxed text-left flex items-center gap-2">
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="glass-card bg-white border border-black/[0.08] rounded-[24px] p-8 sm:p-10 shadow-lg text-left dark:bg-[#15171c] dark:border-white/[0.08]">
          {/* Top Step Pill & Header Icon */}
          <div className="flex items-center justify-between mb-5">
            <div className="empty-icon-wrap w-12 h-12 rounded-[16px] bg-[#f6f6f8] border border-black/[0.08] flex items-center justify-center text-[#0d0d12] shadow-2xs dark:bg-white/[0.04] dark:border-white/[0.08] dark:text-zinc-100">
              <Building2 className="w-6 h-6 text-[#0d0d12] dark:text-zinc-100" />
            </div>
            <span className="text-[11px] font-semibold text-[#00803e] bg-[#e6ffda] border border-[#25d366]/30 px-3 py-1 rounded-full uppercase tracking-wider">
              Step 1 • Workspace Setup
            </span>
          </div>

          <h2 className="empty-title text-[26px] font-semibold tracking-tight text-[#0d0d12] leading-tight mb-2 dark:text-white">
            Create your organization
          </h2>
          <p className="empty-desc text-[14px] text-[#56576a] font-normal leading-relaxed mb-6 dark:text-zinc-400">
            Bootstrap an isolated multi-tenant organization to start customer support operations.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!newOrgName.trim() || !newOrgSlug.trim()) return;
              void handleBootstrap(newOrgName.trim(), newOrgSlug.trim().toLowerCase()).then(() => {
                setNewOrgName("");
                setNewOrgSlug("");
                setOrgSlugManuallyEdited(false);
              });
            }}
            className="flex flex-col gap-4.5 w-full text-left"
          >
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor={newOrgNameId}
                className="text-[13px] font-medium text-[#0d0d12] dark:text-zinc-200"
              >
                Organization Name
              </label>
              <input
                id={newOrgNameId}
                type="text"
                placeholder="e.g. Acme Corp"
                value={newOrgName}
                onChange={(e) => {
                  const val = e.target.value;
                  setNewOrgName(val);
                  if (!orgSlugManuallyEdited) {
                    setNewOrgSlug(
                      val
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/^-|-$/g, "")
                    );
                  }
                }}
                disabled={bootstrapping}
                className="input-field w-full px-3.5 py-2.5 rounded-[10px] bg-white border border-black/[0.12] text-[14px] text-[#0d0d12] placeholder-[#8e8e93] shadow-lemni-input focus:outline-none focus:ring-1 focus:ring-[#25d366] transition-all dark:bg-[#1c1f26] dark:border-white/[0.1] dark:text-white"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor={newOrgSlugId}
                  className="text-[13px] font-medium text-[#0d0d12] dark:text-zinc-200"
                >
                  Organization Slug (URL identifier)
                </label>
                {newOrgSlug && (
                  <span className="text-[11px] text-[#56576a] font-mono">
                    flowdesk.nylo.me/{newOrgSlug}
                  </span>
                )}
              </div>
              <input
                id={newOrgSlugId}
                type="text"
                placeholder="e.g. acme-corp"
                value={newOrgSlug}
                onChange={(e) => {
                  setOrgSlugManuallyEdited(true);
                  setNewOrgSlug(
                    e.target.value
                      .toLowerCase()
                      .replace(/[^a-z0-9-]/g, "")
                      .replace(/-+/g, "-")
                  );
                }}
                disabled={bootstrapping}
                className="input-field w-full px-3.5 py-2.5 rounded-[10px] bg-white border border-black/[0.12] text-[14px] text-[#0d0d12] placeholder-[#8e8e93] shadow-lemni-input focus:outline-none focus:ring-1 focus:ring-[#25d366] transition-all font-mono text-[13px] dark:bg-[#1c1f26] dark:border-white/[0.1] dark:text-white"
                required
              />
            </div>

            {/* Signature Emerald Action Pill */}
            <button
              type="submit"
              disabled={bootstrapping || !newOrgName.trim() || !newOrgSlug.trim()}
              className="w-full py-3 mt-2 text-[14px] font-semibold text-white bg-[#0d0d12] hover:bg-[#202028] active:scale-[0.99] rounded-full flex items-center justify-center gap-2 cursor-pointer shadow-lemni-btn transition-all disabled:opacity-40 disabled:cursor-not-allowed dark:bg-white dark:text-[#0d0d12]"
            >
              {bootstrapping ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Provisioning…</span>
                </>
              ) : (
                <>
                  <span>Create Organization</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quiet Trust Footnote */}
          <div className="mt-6 pt-5 border-t border-black/[0.06] flex items-center gap-2 text-[11px] text-[#56576a] dark:border-white/[0.06]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#25d366]" />
            <span>Dedicated tenant isolation with AES-256 encrypted storage.</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-[1140px] text-center text-xs text-[#56576a] py-4 z-10">
        2026 © FlowDesk Systems Inc. All rights reserved.
      </footer>
    </div>
  );
}
