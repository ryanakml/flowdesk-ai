import * as React from "react";
import { useState, useId } from "react";
import { Building2, ArrowRight, LogOut, Loader2, Sparkles, ShieldCheck } from "lucide-react";
import { FlowDeskIcon } from "../../components/layout/AppSidebar.js";
import { useAuth } from "../auth/context.js";

export function OnboardingView() {
  const { sessionUser, errorMsg, bootstrapping, handleLogout, handleBootstrap } = useAuth();

  const [newOrgName, setNewOrgName] = useState("");
  const [newOrgSlug, setNewOrgSlug] = useState("");
  const [orgSlugManuallyEdited, setOrgSlugManuallyEdited] = useState(false);

  const newOrgNameId = useId();
  const newOrgSlugId = useId();

  return (
    <div className="app-container min-h-screen bg-[#fcf5eb] flex flex-col justify-between items-center py-8 px-4 sm:px-6 relative select-none">
      {/* Top Navigation Header */}
      <header className="top-nav w-full max-w-[1080px] flex items-center justify-between z-10 py-2">
        <div className="brand-section flex items-center gap-2">
          <a href="/" className="logo-badge inline-flex items-center gap-2 group text-[#111b21]">
            <div className="flex items-center gap-1.5 text-[20px] font-normal tracking-tight">
              <span className="font-medium text-[#111b21]">FlowDesk</span>
              <span className="inline-block w-2 h-2 rounded-full bg-[#25d366]" />
            </div>
          </a>
        </div>

        <div className="user-controls flex items-center gap-3">
          <div className="user-badge flex items-center gap-2 bg-white/80 border border-[#dedbd6] rounded-full px-3 py-1 shadow-2xs">
            <span className="user-avatar w-6 h-6 rounded-full bg-[#25d366] text-[#111b21] flex items-center justify-center text-xs font-bold shrink-0">
              {sessionUser?.displayName?.charAt(0)?.toUpperCase() ??
                sessionUser?.email?.charAt(0)?.toUpperCase() ??
                "U"}
            </span>
            <span className="text-xs text-[#111b21] font-medium max-w-[140px] truncate">
              {sessionUser?.displayName || sessionUser?.email}
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              void handleLogout();
            }}
            className="btn btn-secondary btn-sm inline-flex items-center gap-1.5 text-xs text-[#5e5e5e] hover:text-red-600 transition-colors py-1 px-2.5 rounded-full hover:bg-black/5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign out</span>
          </button>
        </div>
      </header>

      {/* Main Onboarding Card */}
      <main className="main-content w-full max-w-[460px] my-auto py-8 z-10">
        {errorMsg && (
          <div className="toast-banner toast-error mb-4 p-3.5 rounded-[16px] bg-red-50 border border-red-200 text-xs text-red-700 leading-relaxed text-left flex items-center gap-2">
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="glass-card onboarding-wrap bg-white border border-[#dedbd6] rounded-[24px] p-8 sm:p-10 shadow-sm text-left">
          {/* Header Icon */}
          <div className="empty-icon-wrap w-12 h-12 rounded-[16px] bg-[#fcf5eb] border border-[#dedbd6] flex items-center justify-center text-[#111b21] mb-5 shadow-2xs">
            <Building2 className="w-6 h-6 text-[#111b21]" />
          </div>

          <h2 className="empty-title text-[26px] font-normal tracking-tight text-[#111b21] leading-tight mb-2">
            Create your organization
          </h2>
          <p className="empty-desc text-[14px] text-[#5e5e5e] font-normal leading-relaxed mb-6">
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
              <label htmlFor={newOrgNameId} className="text-[13px] font-medium text-[#111b21]">
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
                className="input-field w-full px-3.5 py-2.5 rounded-[12px] bg-[#fcf5eb]/50 border border-[#dedbd6] text-[14px] text-[#111b21] placeholder-[#5e5e5e]/60 focus:outline-none focus:ring-2 focus:ring-[#25d366]/40 focus:border-[#25d366] transition-all"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor={newOrgSlugId} className="text-[13px] font-medium text-[#111b21]">
                  Organization Slug (URL identifier)
                </label>
                {newOrgSlug && (
                  <span className="text-[11px] text-[#5e5e5e] font-mono">
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
                className="input-field w-full px-3.5 py-2.5 rounded-[12px] bg-[#fcf5eb]/50 border border-[#dedbd6] text-[14px] text-[#111b21] placeholder-[#5e5e5e]/60 focus:outline-none focus:ring-2 focus:ring-[#25d366]/40 focus:border-[#25d366] transition-all font-mono text-[13px]"
                required
              />
            </div>

            <button
              type="submit"
              disabled={bootstrapping || !newOrgName.trim() || !newOrgSlug.trim()}
              className="btn btn-primary wa-pill-primary w-full py-3.5 mt-2 text-[14px] font-medium flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
          <div className="mt-6 pt-5 border-t border-[#dedbd6] flex items-center gap-2 text-[11px] text-[#5e5e5e]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#25d366]" />
            <span>Dedicated tenant isolation with AES-256 encrypted storage.</span>
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
