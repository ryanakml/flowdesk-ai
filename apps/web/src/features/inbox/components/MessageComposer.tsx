import { useRef, useId } from "react";
import { cn, Button } from "@flowdesk/ui";
import { Send, Paperclip, Layout, Sparkles, AlertCircle } from "lucide-react";

type ConnectionState = "connecting" | "connected" | "reconnecting" | "offline";

interface MessageComposerProps {
  conversationStatus: string;
  serviceWindowOpen: boolean | null; // null means no service window concept
  canSend: boolean;
  connectionState: ConnectionState;
  composerText: string;
  isSending: boolean;
  mediaState: string | null;
  onComposerChange: (text: string) => void;
  onSend: () => void;
  onOpenTemplate: () => void;
  onGenerateDraft?: () => void;
  onMediaSelected: (file: File | undefined) => void;
}

export function MessageComposer({
  conversationStatus,
  serviceWindowOpen,
  canSend,
  connectionState,
  composerText,
  isSending,
  mediaState,
  onComposerChange,
  onSend,
  onOpenTemplate,
  onGenerateDraft = () => {},
  onMediaSelected
}: MessageComposerProps) {
  const mediaInputRef = useRef<HTMLInputElement>(null);
  const textareaId = useId();

  const isOffline = connectionState === "offline";
  const isClosed = conversationStatus === "closed";
  const isWindowExpired = serviceWindowOpen === false;

  // Disabled states
  if (isOffline) {
    return (
      <div
        className="composer-disabled-banner px-4 py-2.5 bg-[#f6f6f8] border-t border-black/[0.06] text-xs text-[#56576a] flex items-center gap-2 dark:bg-[#111317] dark:border-white/[0.06] dark:text-zinc-400"
        data-testid="composer-offline"
      >
        <AlertCircle className="w-4 h-4 text-amber-600" />
        <span>You are offline. Check your connection.</span>
      </div>
    );
  }

  if (!canSend) {
    return (
      <div
        className="composer-disabled-banner px-4 py-2.5 bg-[#f6f6f8] border-t border-black/[0.06] text-xs text-[#56576a] flex items-center gap-2 dark:bg-[#111317] dark:border-white/[0.06] dark:text-zinc-400"
        data-testid="composer-disabled"
      >
        <AlertCircle className="w-4 h-4 text-amber-600" />
        <span>You need the Agent or Administrator role to send WhatsApp messages.</span>
      </div>
    );
  }

  if (isClosed) {
    return (
      <div
        className="composer-disabled-banner px-4 py-2.5 bg-[#f6f6f8] border-t border-black/[0.06] text-xs text-[#56576a] flex items-center gap-2 dark:bg-[#111317] dark:border-white/[0.06] dark:text-zinc-400"
        data-testid="composer-closed"
      >
        <AlertCircle className="w-4 h-4 text-zinc-500" />
        <span>This conversation is closed. Reopen it to send a reply.</span>
      </div>
    );
  }

  if (isWindowExpired) {
    return (
      <footer
        className="border-t border-black/[0.06] bg-[#f6f6f8]/80 p-3 sm:p-4 backdrop-blur-xs"
        data-testid="composer-window-expired"
      >
        <form className="flex flex-col gap-2" onSubmit={(event) => event.preventDefault()}>
          <div className="p-2.5 rounded-[10px] bg-amber-500/[0.08] border border-amber-500/20 text-xs text-amber-900 dark:text-amber-300 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="truncate font-medium text-[11.5px]">
                24-hour service window expired. Free-form replies restricted by Meta.
              </span>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#0d0d12] hover:bg-[#202028] text-white shadow-lemni-btn transition-all cursor-pointer whitespace-nowrap dark:bg-white dark:text-[#0d0d12]"
              onClick={onOpenTemplate}
              data-testid="btn-open-template-composer"
            >
              <Layout className="w-3.5 h-3.5" />
              <span>Select WhatsApp Template</span>
            </button>
          </div>

          <textarea
            className="min-h-[56px] w-full resize-none rounded-[12px] border border-black/[0.06] bg-white/50 px-3 py-2 text-xs text-[#8e8e93] cursor-not-allowed shadow-2xs dark:bg-white/[0.02] dark:border-white/[0.06]"
            placeholder="Messaging unavailable — 24h window expired"
            disabled
            aria-label="Reply message"
          />

          <div className="flex items-center justify-end gap-2">
            <Button
              type="button"
              size="sm"
              disabled
              aria-label="Generate Draft"
              className="rounded-full opacity-40"
            >
              <Sparkles className="size-3.5" />
              Draft
            </Button>
            <Button
              type="button"
              size="sm"
              disabled
              data-testid="composer-send-btn"
              className="rounded-full opacity-40"
            >
              <Send className="size-3.5" />
              Send
            </Button>
          </div>
        </form>
      </footer>
    );
  }

  return (
    <footer className="thread-composer-wrapper border-t border-black/[0.06] bg-[#f6f6f8]/80 p-3 sm:p-4 backdrop-blur-xs">
      <form
        className="thread-composer flex flex-col gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          onSend();
        }}
        data-testid="thread-composer-form"
      >
        <label htmlFor={textareaId} className="sr-only">
          Reply message
        </label>
        <textarea
          id={textareaId}
          className={cn(
            "composer-textarea w-full resize-none rounded-[12px] border border-black/[0.08] bg-white px-3.5 py-2.5",
            "text-[13px] text-[#0d0d12] placeholder:text-[#56576a]/60 shadow-lemni-input focus:outline-none focus:ring-1 focus:ring-[#25d366] transition-all",
            "min-h-[72px] max-h-[180px]"
          )}
          rows={2}
          placeholder="Type a WhatsApp reply... (Cmd+Enter to send)"
          value={composerText}
          onChange={(e) => onComposerChange(e.target.value)}
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
              e.preventDefault();
              onSend();
            }
          }}
          disabled={isSending}
          aria-label="Reply message"
          data-testid="composer-input"
        />

        <div className="composer-actions flex items-center justify-between gap-2 pt-0.5">
          {/* Hidden file input */}
          <input
            ref={mediaInputRef}
            type="file"
            className="sr-only"
            accept="image/jpeg,image/png,image/webp,application/pdf,audio/ogg,audio/mpeg,video/mp4"
            onChange={(e) => onMediaSelected(e.target.files?.[0])}
            data-testid="media-input"
            aria-label="Attach media"
          />

          {/* Left tools: Attach & Template (Lemni attached action pills) */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => mediaInputRef.current?.click()}
              disabled={mediaState !== null}
              aria-label="Attach"
              data-testid="btn-attach-media"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-black/[0.08] bg-white hover:bg-[#f6f6f8] text-xs font-medium text-[#0d0d12] shadow-lemni-btn transition-all disabled:opacity-40 cursor-pointer"
            >
              <Paperclip className="w-3.5 h-3.5 text-[#56576a]" />
              <span>
                {mediaState ? (mediaState === "scanning" ? "Scanning…" : "Sending…") : "Attach"}
              </span>
            </button>

            <button
              type="button"
              onClick={onOpenTemplate}
              data-testid="btn-open-template-composer"
              title="Send WhatsApp Template"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-black/[0.08] bg-white hover:bg-[#f6f6f8] text-xs font-medium text-[#0d0d12] shadow-lemni-btn transition-all cursor-pointer"
            >
              <Layout className="w-3.5 h-3.5 text-[#56576a]" />
              <span>Template</span>
            </button>
          </div>

          {/* Right tools: AI Draft & Send */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onGenerateDraft}
              disabled={isSending}
              data-testid="composer-generate-draft-btn"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 hover:bg-purple-100/80 border border-purple-200/80 text-xs font-medium text-purple-700 shadow-2xs transition-all cursor-pointer disabled:opacity-40"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>AI Draft</span>
            </button>

            <button
              type="submit"
              disabled={!composerText.trim() || isSending}
              data-testid="composer-send-btn"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-[#25d366] hover:bg-[#20ba59] active:scale-[0.98] text-[#0d0d12] shadow-lemni-btn transition-all disabled:opacity-40 disabled:hover:bg-[#25d366] cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSending ? "Sending…" : "Send"}</span>
            </button>
          </div>
        </div>
      </form>
    </footer>
  );
}
