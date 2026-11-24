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
        className="composer-disabled-banner px-4 py-3 bg-[#fcf5eb] border-t border-[#dedbd6] text-xs text-[#5e5e5e] flex items-center gap-2"
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
        className="composer-disabled-banner px-4 py-3 bg-[#fcf5eb] border-t border-[#dedbd6] text-xs text-[#5e5e5e] flex items-center gap-2"
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
        className="composer-disabled-banner px-4 py-3 bg-[#fcf5eb] border-t border-[#dedbd6] text-xs text-[#5e5e5e] flex items-center gap-2"
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
        className="border-t border-[#dedbd6] bg-white p-3 sm:p-4 shadow-2xs"
        data-testid="composer-window-expired"
      >
        <form className="flex flex-col gap-2.5" onSubmit={(event) => event.preventDefault()}>
          <div className="p-3 rounded-[12px] bg-amber-50 border border-amber-200/80 text-xs text-amber-800 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-900">24-hour service window expired</p>
              <p className="text-amber-700 mt-0.5 leading-relaxed">
                Free-form replies are restricted by Meta policy. Send an approved template message
                to restart the conversation.
              </p>
            </div>
          </div>

          <textarea
            className="min-h-[64px] w-full resize-none rounded-[12px] border border-[#dedbd6] bg-[#fcf5eb]/30 px-3 py-2 text-xs text-[#5e5e5e] cursor-not-allowed"
            placeholder="Messaging unavailable — 24h window expired"
            disabled
            aria-label="Reply message"
          />

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#25d366] hover:bg-[#20ba59] text-[#111b21] border border-[#111b21]/20 shadow-2xs transition-colors cursor-pointer"
              onClick={onOpenTemplate}
              data-testid="btn-open-template-composer"
            >
              <Layout className="w-3.5 h-3.5" />
              <span>Select WhatsApp Template</span>
            </button>
            <Button
              type="button"
              size="sm"
              disabled
              aria-label="Generate Draft"
              className="rounded-full"
            >
              <Sparkles className="size-3.5" />
              Draft
            </Button>
            <Button
              type="button"
              size="sm"
              disabled
              data-testid="composer-send-btn"
              className="rounded-full"
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
