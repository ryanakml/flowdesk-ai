import * as React from "react";
import type { Conversation } from "@flowdesk/contracts";
import { cn } from "@flowdesk/ui";

interface ConversationItemProps {
  conversation: Conversation;
  isSelected: boolean;
  sessionUserId: string;
  onClick: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
  tabIndex: number;
  buttonRef?: (el: HTMLButtonElement | null) => void;
}

function formatTime(isoString: string): string {
  try {
    const d = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 1) return "just now";
    if (diffMinutes < 60) return `${diffMinutes}m`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays === 1) return "yesterday";
    if (diffDays < 7) return `${diffDays}d`;
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
}

export function ConversationItem({
  conversation: conv,
  isSelected,
  sessionUserId,
  onClick,
  onKeyDown,
  tabIndex,
  buttonRef
}: ConversationItemProps) {
  const initials = (conv.customerName ?? conv.customerPhone).slice(0, 2).toUpperCase();

  return (
    <button
      type="button"
      role="option"
      aria-selected={isSelected}
      data-testid={`conv-item-${conv.id}`}
      tabIndex={tabIndex}
      ref={buttonRef}
      onClick={onClick}
      onKeyDown={onKeyDown}
      className={cn(
        "inbox-conv-item w-full text-left px-3.5 py-3 flex items-start gap-3 transition-all",
        "border-b border-[#dedbd6]/60 hover:bg-[#fcf5eb]/50 focus:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer group",
        isSelected && "selected bg-[#fcf5eb] border-l-[3px] border-l-[#25d366] shadow-2xs"
      )}
    >
      {/* Avatar with Signature WhatsApp Dot */}
      <div className="relative flex-shrink-0 mt-0.5" aria-hidden="true">
        <div className="w-9 h-9 rounded-full bg-white border border-[#dedbd6] text-[#111b21] text-xs font-semibold flex items-center justify-center shadow-2xs group-hover:border-[#25d366]/40 transition-colors">
          {initials}
        </div>
        <span
          className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#25d366] border-2 border-white shadow-2xs"
          title="WhatsApp Channel"
        />
      </div>

      {/* Info & Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1.5 mb-0.5">
          <span className="text-[13px] font-semibold text-[#111b21] truncate tracking-tight">
            {conv.customerName ?? `+${conv.customerPhone}`}
          </span>
          <span className="text-[11px] text-[#5e5e5e] font-mono flex-shrink-0">
            {formatTime(conv.lastMessageAt)}
          </span>
        </div>

        {conv.customerName && (
          <p className="text-[11.5px] text-[#5e5e5e]/80 truncate font-mono mb-1">
            +{conv.customerPhone}
          </p>
        )}

        {/* Waiting Reason or Context Snippet */}
        {conv.waitingReason && (
          <p className="text-[11.5px] text-[#5e5e5e] line-clamp-1 leading-snug mb-1.5">
            {conv.waitingReason}
          </p>
        )}

        {/* Badges Row */}
        <div className="flex items-center gap-1.5 flex-wrap text-xs mt-1">
          <span className="text-muted-foreground text-[10.5px] font-medium">WhatsApp</span>

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

          {conv.priority === "urgent" && (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9.5px] font-semibold bg-red-50 text-red-700 border border-red-200 animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
              Urgent
            </span>
          )}

          {conv.priority === "high" && (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9.5px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
              High
            </span>
          )}

          {conv.assignedToUserId === sessionUserId && (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9.5px] font-semibold bg-[#111b21] text-white">
              Me
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
