import * as React from "react";
import type { Conversation } from "@flowdesk/contracts";
import { PanelRightClose, PanelRightOpen, CheckCircle2, RotateCcw, UserPlus } from "lucide-react";
import { cn } from "@flowdesk/ui";

interface ConversationHeaderProps {
  conversation: Conversation;
  sessionUserId: string;
  canAssign: boolean;
  canResolve: boolean;
  onAssignToMe: () => void;
  contextCollapsed?: boolean;
  onToggleContext?: () => void;
  onResolve: () => void;
  onReopen: () => void;
}

export function ConversationHeader({
  conversation: conv,
  sessionUserId,
  canAssign,
  canResolve,
  onAssignToMe,
  contextCollapsed = false,
  onToggleContext,
  onResolve,
  onReopen
}: ConversationHeaderProps) {
  const isOpen = conv.status === "open" || conv.status === "pending";
  const isResolved = conv.status === "resolved" || conv.status === "closed";
  const isAssignedToMe = conv.assignedToUserId === sessionUserId;
  const initials = (conv.customerName ?? conv.customerPhone).slice(0, 2).toUpperCase();

  return (
    <header className="flex shrink-0 items-center justify-between border-b border-[#dedbd6] bg-white px-4 py-3 shadow-2xs">
      {/* Customer Identity */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="relative flex-shrink-0" aria-hidden="true">
          <div className="w-9 h-9 rounded-full bg-[#fcf5eb] border border-[#dedbd6] text-[#111b21] text-xs font-semibold flex items-center justify-center shadow-2xs">
            {initials}
          </div>
          <span
            className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#25d366] border-2 border-white shadow-2xs"
            title="WhatsApp Cloud Active"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-[14px] font-semibold text-[#111b21] tracking-tight">
              {conv.customerName ?? `+${conv.customerPhone}`}
            </h3>
            <span
              className={cn(
                "capitalize text-[10px] font-semibold px-2 py-0.5 rounded-full border",
                conv.status === "new" && "bg-blue-50 text-blue-700 border-blue-200/80",
                conv.status === "open" && "bg-[#e6ffda] text-[#00803e] border-[#25d366]/30",
                conv.status === "pending" && "bg-amber-50 text-amber-700 border-amber-200/80",
                conv.status === "resolved" && "bg-zinc-100 text-zinc-600 border-zinc-200",
                conv.status === "closed" && "bg-zinc-100 text-zinc-400 border-zinc-200"
              )}
            >
              {conv.status}
            </span>
          </div>

          <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-[#5e5e5e] font-mono">
            <span>+{conv.customerPhone}</span>
            <span aria-hidden="true" className="text-[#dedbd6]">
              •
            </span>
            <span className="font-sans">WhatsApp Cloud</span>
            <span aria-hidden="true" className="text-[#dedbd6]">
              •
            </span>
            <span className="capitalize font-sans">{conv.status}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="ml-2 flex shrink-0 items-center gap-2">
        {!isAssignedToMe && canAssign && (
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#111b21] hover:bg-[#242c32] text-white shadow-2xs transition-colors cursor-pointer"
            onClick={onAssignToMe}
            data-testid="btn-assign-me"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Assign to Me</span>
          </button>
        )}

        {canResolve && isOpen && (
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#25d366] hover:bg-[#20ba59] active:scale-[0.98] text-[#111b21] border border-[#111b21]/20 shadow-xs transition-all cursor-pointer"
            onClick={onResolve}
            data-testid="btn-resolve"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Resolve</span>
          </button>
        )}

        {canResolve && isResolved && (
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-[#dedbd6] bg-white hover:bg-[#fcf5eb] text-[#111b21] shadow-2xs transition-colors cursor-pointer"
            onClick={onReopen}
            data-testid="btn-reopen"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reopen</span>
          </button>
        )}

        {onToggleContext && (
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-[#dedbd6] bg-white hover:bg-[#fcf5eb] text-xs font-medium text-[#5e5e5e] hover:text-[#111b21] shadow-2xs transition-colors cursor-pointer"
            onClick={onToggleContext}
            aria-label={contextCollapsed ? "Expand context panel" : "Collapse context panel"}
            data-testid="context-panel-toggle"
          >
            {contextCollapsed ? (
              <PanelRightOpen className="w-3.5 h-3.5" />
            ) : (
              <PanelRightClose className="w-3.5 h-3.5" />
            )}
            <span className="hidden xl:inline">{contextCollapsed ? "Context" : "Collapse"}</span>
          </button>
        )}
      </div>
    </header>
  );
}
