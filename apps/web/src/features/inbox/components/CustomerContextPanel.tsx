import type {
  Conversation,
  GenerateBotDraftResponse,
  ConversationDetailResponse
} from "@flowdesk/contracts";
import { Skeleton } from "@flowdesk/ui";
import { User, Clock, Tag, FileText, Bot } from "lucide-react";
import { BotConfiguration } from "./BotConfiguration.js";

function formatDate(isoString: string): string {
  try {
    return new Date(isoString).toLocaleString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  } catch {
    return "";
  }
}

interface CustomerContextPanelProps {
  organizationId: string;
  canManageAutomation: boolean;
  fetcher?: typeof fetch;
  conversation: Conversation | null;
  notes?: ConversationDetailResponse["notes"];
  tags?: ConversationDetailResponse["tags"];
  allTags?: Array<{ id: string; name: string; color: string }>;
  copilotDraft?: GenerateBotDraftResponse | null;
  showCitations?: boolean;
  loading?: boolean;
  onToggleTag?: (tagId: string, applied: boolean) => void;
  onAddNote?: (body: string) => void;
}

export function CustomerContextPanel({
  organizationId,
  canManageAutomation,
  fetcher,
  conversation: conv,
  notes = [],
  tags = [],
  allTags = [],
  copilotDraft,
  showCitations = false,
  loading = false,
  onToggleTag,
  onAddNote
}: CustomerContextPanelProps) {
  if (loading) {
    return (
      <div className="scrollbar-hidden h-full overflow-y-auto p-4 space-y-4 bg-white border-l border-black/[0.06]">
        <Skeleton className="h-5 w-2/3 rounded-md" />
        <Skeleton className="h-3.5 w-1/2 rounded-md" />
        <Skeleton className="h-20 w-full rounded-[12px]" />
      </div>
    );
  }

  if (!conv) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-[#56576a] text-xs p-6 bg-white border-l border-black/[0.06] text-center">
        <User className="w-8 h-8 text-black/20 mb-2" />
        <p className="font-medium text-[#0d0d12]">No conversation selected</p>
        <p className="text-[11px] text-[#56576a] mt-0.5">
          Select a customer to view operational context.
        </p>
      </div>
    );
  }

  return (
    <div className="scrollbar-hidden h-full min-w-0 overflow-y-auto bg-white border-l border-black/[0.06] [overflow-wrap:anywhere] [&_input]:min-w-0 divide-y divide-black/[0.06]">
      {/* Customer Profile Header */}
      <div className="p-4 bg-[#f6f6f8]/60">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-white border border-black/[0.08] text-[#0d0d12] text-xs font-semibold flex items-center justify-center flex-shrink-0 shadow-2xs">
            {(conv.customerName ?? conv.customerPhone).slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[14px] font-semibold text-[#0d0d12] truncate tracking-tight">
              {conv.customerName ?? `+${conv.customerPhone}`}
            </p>
            {conv.customerName && (
              <p className="text-[11.5px] text-[#56576a] font-mono truncate">
                +{conv.customerPhone}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Conversation Attributes */}
      <div className="p-4 space-y-2.5">
        <h4 className="text-[10.5px] font-semibold text-[#8e8e93] uppercase tracking-wider">
          Conversation Attributes
        </h4>

        <div className="flex items-center justify-between text-xs">
          <span className="text-[#56576a]">Status</span>
          <span className="font-semibold capitalize text-[#0d0d12] dark:text-zinc-100">
            {conv.status}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-[#56576a]">Priority</span>
          <span className="font-semibold capitalize text-[#0d0d12] dark:text-zinc-100">
            {conv.priority}
          </span>
        </div>

        {conv.assignedToUserId ? (
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#56576a]">Assigned to</span>
            <div className="flex items-center gap-1.5 font-medium text-[#0d0d12] dark:text-zinc-100">
              <User className="w-3.5 h-3.5 text-[#56576a]" />
              <span>Assigned Agent</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#56576a]">Assigned to</span>
            <span className="text-[#56576a] italic">Unassigned</span>
          </div>
        )}

        <div className="flex items-center justify-between text-xs">
          <span className="text-[#56576a]">Created</span>
          <div className="flex items-center gap-1.5 text-[#0d0d12] dark:text-zinc-200 font-mono text-[11px]">
            <Clock className="w-3 h-3 text-[#56576a]" />
            <span>{formatDate(conv.createdAt)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-[#56576a]">Last message</span>
          <span className="text-[#0d0d12] dark:text-zinc-200 font-mono text-[11px]">
            {formatDate(conv.lastMessageAt)}
          </span>
        </div>
      </div>

      {/* Automation & 24h Window */}
      <div className="p-4 space-y-2.5">
        <h4 className="text-[10.5px] font-semibold text-[#8e8e93] uppercase tracking-wider flex items-center gap-1.5">
          <Bot className="w-3.5 h-3.5 text-[#25d366]" />
          <span>Automation & Policy</span>
        </h4>
        <BotConfiguration
          key={organizationId}
          orgId={organizationId}
          canManage={canManageAutomation}
          fetcher={fetcher}
        />
        {conv.botPaused && (
          <p className="text-[11px] text-[#56576a] bg-zinc-50 border border-black/[0.08] p-2 rounded-[8px] dark:bg-zinc-900/50 dark:border-white/[0.08]">
            Bot paused for this conversation.
          </p>
        )}
        <div className="flex items-center justify-between text-xs pt-1">
          <span className="text-[#56576a]">WhatsApp Window</span>
          <span
            className={
              conv.serviceWindow?.isOpen === false
                ? "font-semibold text-amber-700 bg-amber-500/[0.08] border border-amber-500/20 px-2.5 py-0.5 rounded-full text-[10.5px] dark:text-amber-300"
                : "font-semibold text-[#00803e] bg-[#e6ffda] border border-[#25d366]/30 px-2.5 py-0.5 rounded-full text-[10.5px]"
            }
          >
            {conv.serviceWindow
              ? conv.serviceWindow.isOpen
                ? "Open (Active)"
                : "Expired (Template Only)"
              : "Standard"}
          </span>
        </div>
      </div>

      {/* Tags */}
      <div className="p-4">
        <div className="flex items-center gap-1.5 mb-2.5">
          <Tag className="w-3.5 h-3.5 text-[#56576a]" />
          <h4 className="text-[10.5px] font-semibold text-[#8e8e93] uppercase tracking-wider">
            Tags
          </h4>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {allTags.length > 0
            ? allTags.map((t) => {
                const applied = tags.some(
                  (it: NonNullable<ConversationDetailResponse["tags"]>[number]) => it.id === t.id
                );
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => onToggleTag?.(t.id, applied)}
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border transition-all cursor-pointer shadow-2xs ${
                      applied
                        ? "bg-[#0d0d12] text-white border-[#0d0d12] dark:bg-white dark:text-[#0d0d12]"
                        : "bg-white text-[#56576a] border-black/[0.08] hover:bg-[#f6f6f8] hover:text-[#0d0d12] dark:bg-[#15171c] dark:border-white/[0.08] dark:text-zinc-300 dark:hover:bg-[#1f2229]"
                    }`}
                  >
                    {t.name}
                  </button>
                );
              })
            : tags.map((tag: NonNullable<ConversationDetailResponse["tags"]>[number]) => (
                <span
                  key={tag.id}
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#f6f6f8] border border-black/[0.08] text-[#0d0d12] dark:bg-white/[0.04] dark:border-white/[0.08] dark:text-zinc-200"
                >
                  {tag.name}
                </span>
              ))}
        </div>
      </div>

      {/* AI Citations Context */}
      {copilotDraft &&
        copilotDraft.status === "drafted" &&
        copilotDraft.citations &&
        copilotDraft.citations.length > 0 &&
        showCitations && (
          <div className="p-4 space-y-2">
            <h4 className="text-[10.5px] font-semibold text-[#8e8e93] uppercase tracking-wider flex items-center gap-1.5">
              <Bot className="w-3.5 h-3.5 text-emerald-600" />
              <span>AI Citations ({copilotDraft.citations.length})</span>
            </h4>
            <ul className="space-y-2">
              {copilotDraft.citations.map((cit, idx) => (
                <li
                  key={cit.chunkId}
                  className="text-xs p-2.5 rounded-[10px] bg-[#f6f6f8] border border-black/[0.08] dark:bg-white/[0.04] dark:border-white/[0.08]"
                >
                  <p className="font-semibold text-[#0d0d12] dark:text-zinc-100">
                    {idx + 1}. {cit.documentTitle}
                  </p>
                  <p className="text-[#56576a] line-clamp-2 mt-0.5 text-[11.5px] leading-relaxed dark:text-zinc-400">
                    {cit.snippet}
                  </p>
                  <p className="text-[#00803e] font-mono text-[10.5px] mt-1 font-medium">
                    {Math.round(cit.score * 100)}% match
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}

      {/* Internal Private Notes */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2.5">
          <h4 className="text-[10.5px] font-semibold text-[#8e8e93] uppercase tracking-wider flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-amber-600" />
            <span>Internal Notes {notes.length > 0 && `(${notes.length})`}</span>
          </h4>
        </div>

        {onAddNote && (
          <form
            className="mb-3 flex gap-1.5"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const input = form.elements.namedItem("noteInput") as HTMLInputElement;
              if (input && input.value.trim()) {
                onAddNote(input.value.trim());
                input.value = "";
              }
            }}
          >
            <input
              name="noteInput"
              placeholder="Add private note..."
              className="flex-1 h-8 px-2.5 text-xs rounded-[8px] border border-black/[0.08] bg-white text-[#0d0d12] placeholder:text-[#56576a]/50 shadow-lemni-input focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#25d366] dark:bg-[#15171c] dark:border-white/[0.08] dark:text-zinc-100"
            />
            <button
              type="submit"
              className="px-3 py-1 text-xs font-semibold rounded-full bg-[#0d0d12] hover:bg-[#202028] text-white shadow-lemni-btn transition-colors cursor-pointer dark:bg-white dark:text-[#0d0d12]"
            >
              Add
            </button>
          </form>
        )}

        {notes.length > 0 ? (
          <ol className="space-y-2">
            {notes.map((note: NonNullable<ConversationDetailResponse["notes"]>[number]) => (
              <li
                key={note.id}
                className="text-xs text-amber-900 bg-amber-500/[0.08] rounded-[10px] p-2.5 border border-amber-500/20 shadow-2xs leading-relaxed dark:text-amber-200"
              >
                {note.body}
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-[11.5px] text-[#56576a] italic">No internal notes yet.</p>
        )}
      </div>
    </div>
  );
}
