import { useRef, useEffect } from "react";
import type { Message } from "@flowdesk/contracts";
import { Skeleton } from "@flowdesk/ui";
import { MessageSquare, ShieldCheck } from "lucide-react";
import { MessageBubble } from "./MessageBubble.js";

interface MessageTimelineProps {
  messages: Message[];
  loading: boolean;
  onRetry: (content: string) => void;
  onRemoveMessage: (msg: Message) => void;
}

export function MessageTimeline({
  messages,
  loading,
  onRetry,
  onRemoveMessage
}: MessageTimelineProps) {
  const endRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (typeof endRef.current?.scrollIntoView === "function") {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div
      className="scrollbar-hidden min-h-0 min-w-0 flex-1 basis-0 space-y-1 overflow-x-hidden overflow-y-auto overscroll-contain px-4 py-4 sm:px-6 sm:py-5 bg-[#fafafa]/50"
      role="log"
      aria-live="polite"
      aria-label="Message history"
      data-testid="thread-timeline"
    >
      {/* End-to-end Encryption Notice */}
      <div className="flex justify-center mb-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fcf5eb] border border-[#dedbd6] text-[11px] text-[#5e5e5e] shadow-2xs">
          <ShieldCheck className="w-3.5 h-3.5 text-[#25d366]" />
          <span>Messages are routed through official WhatsApp Business Cloud API.</span>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4 pt-4" data-testid="timeline-loading">
          {[1, 2, 3].map((i) => (
            <div key={i} className={`flex ${i % 2 === 0 ? "justify-end" : "justify-start"}`}>
              <Skeleton
                className={`h-12 w-48 rounded-2xl ${i % 2 === 0 ? "rounded-tr-sm" : "rounded-tl-sm"}`}
              />
            </div>
          ))}
          <p className="text-center text-xs text-[#5e5e5e] font-medium">
            Loading message history...
          </p>
        </div>
      ) : messages.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center h-48 text-[#5e5e5e] text-center"
          data-testid="timeline-empty"
        >
          <div className="w-10 h-10 rounded-full bg-[#fcf5eb] border border-[#dedbd6] flex items-center justify-center mb-2.5 text-[#5e5e5e]">
            <MessageSquare className="w-4 h-4" />
          </div>
          <p className="text-sm font-medium text-[#111b21]">
            No messages in this conversation yet.
          </p>
          <p className="text-xs text-[#5e5e5e] mt-0.5">
            Send a message below to start the conversation.
          </p>
        </div>
      ) : (
        messages.map((msg, index) => (
          <MessageBubble
            key={msg.id !== "00000000-0000-0000-0000-000000000000" ? msg.id : `msg-${index}`}
            message={msg}
            grouped={
              index > 0 &&
              messages[index - 1]?.senderType === msg.senderType &&
              messages[index - 1]?.direction === msg.direction
            }
            onRetry={(content) => onRetry(content)}
            onRemove={() => onRemoveMessage(msg)}
          />
        ))
      )}
      <div ref={endRef} />
    </div>
  );
}
