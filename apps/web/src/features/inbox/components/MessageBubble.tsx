import type { Message } from "@flowdesk/contracts";
import { cn } from "@flowdesk/ui";
import { Sparkles, Check, CheckCheck, Clock, AlertTriangle } from "lucide-react";
import { MarkdownContent } from "./MarkdownContent.js";

type AuthorType = "customer" | "agent" | "system" | "bot";

interface MessageBubbleProps {
  message: Message;
  grouped?: boolean;
  onRetry?: (content: string) => void;
  onRemove?: () => void;
}

function renderStatusCheckmark(msg: Message) {
  if (msg.direction !== "outbound") return null;

  switch (msg.status) {
    case "queued":
      return (
        <span
          className="msg-check queued text-xs text-[#5e5e5e] inline-flex items-center"
          title="Queued for dispatch"
          aria-label="Queued"
        >
          <Clock className="w-3 h-3" />
        </span>
      );
    case "sent":
      return (
        <span
          className="msg-check sent text-xs text-[#5e5e5e] inline-flex items-center"
          title="Sent to WhatsApp"
          aria-label="Sent"
        >
          <Check className="w-3 h-3" />
        </span>
      );
    case "delivered":
      return (
        <span
          className="msg-check delivered text-xs text-[#5e5e5e] inline-flex items-center"
          title="Delivered to customer"
          aria-label="Delivered"
        >
          <CheckCheck className="w-3.5 h-3.5" />
        </span>
      );
    case "read":
      return (
        <span
          className="msg-check read text-xs text-[#00803e] inline-flex items-center"
          title="Read by customer"
          aria-label="Read"
        >
          <CheckCheck className="w-3.5 h-3.5 text-[#00803e]" />
        </span>
      );
    case "failed":
      return (
        <span
          className="msg-check failed text-xs text-red-600 inline-flex items-center"
          title={`Failed: ${msg.errorDetail ?? "Unknown error"}`}
          aria-label="Failed"
        >
          <AlertTriangle className="w-3 h-3 text-red-600" />
        </span>
      );
    default:
      return null;
  }
}

function getAuthorType(msg: Message): AuthorType {
  if (msg.senderType === "system") return "system";
  if (msg.senderType === "bot") return "bot";
  if (msg.direction === "inbound") return "customer";
  return "agent";
}

function formatTime(isoString: string): string {
  try {
    return new Date(isoString).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
}

export function MessageBubble({
  message: msg,
  grouped = false,
  onRetry,
  onRemove
}: MessageBubbleProps) {
  const authorType = getAuthorType(msg);
  const isInbound = authorType === "customer";
  const isSystem = authorType === "system";
  const isBot = authorType === "bot";

  if (isSystem) {
    return (
      <div className="flex justify-center my-3" data-testid={`msg-bubble-${msg.id}`}>
        <span className="px-3 py-1 rounded-full bg-[#fcf5eb] border border-[#dedbd6] text-[#5e5e5e] text-[11px] font-medium shadow-2xs">
          {msg.content}
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex w-full min-w-0 message-bubble-wrapper",
        grouped ? "mb-1" : "mb-3",
        isInbound ? "justify-start inbound" : "justify-end outbound"
      )}
      data-testid={`msg-bubble-${msg.id}`}
    >
      <div
        className={cn(
          "flex min-w-0 max-w-[min(72%,38rem)] flex-col max-[640px]:max-w-[88%]",
          isInbound ? "items-start" : "items-end"
        )}
      >
        {/* Bot Origin Pill */}
        {isBot && !grouped && (
          <div className="flex items-center gap-1 mb-1 px-2 py-0.5 rounded-full bg-[#e6ffda] border border-[#25d366]/30 text-[10px] font-semibold text-[#00803e] shadow-2xs">
            <Sparkles className="w-2.5 h-2.5" />
            <span>AI Copilot • Auto-response</span>
          </div>
        )}

        {/* Message Bubble Body */}
        <div
          className={cn(
            "message-bubble w-fit min-w-0 max-w-full px-4 py-2.5 rounded-[16px] text-[13.5px] leading-relaxed shadow-2xs",
            isInbound
              ? cn(
                  "bg-white text-[#111b21] border border-[#dedbd6]/80 rounded-tl-[4px]",
                  grouped && "rounded-tl-[16px]"
                )
              : cn(
                  "bg-[#e7f8ee] text-[#111b21] border border-[#25d366]/30 rounded-tr-[4px]",
                  grouped && "rounded-tr-[16px]"
                )
          )}
        >
          <div className="message-text min-w-0 [overflow-wrap:anywhere] leading-relaxed">
            <MarkdownContent content={msg.content} />
          </div>

          <div
            className={cn(
              "message-meta flex items-center gap-1.5 mt-1 text-[10.5px] font-mono",
              isInbound ? "text-[#5e5e5e]" : "text-[#00803e]"
            )}
          >
            <span className="message-time">{formatTime(msg.createdAt)}</span>
            {renderStatusCheckmark(msg)}
          </div>
        </div>

        {/* Failed message retry/remove actions */}
        {msg.status === "failed" && (
          <div className="failed-message-actions flex items-center gap-2 mt-1 px-1">
            {onRetry && (
              <button
                type="button"
                className="text-xs font-semibold text-red-600 hover:underline cursor-pointer"
                onClick={() => onRetry(msg.content)}
              >
                Retry
              </button>
            )}
            {onRemove && (
              <button
                type="button"
                className="text-xs text-[#5e5e5e] hover:text-red-600 cursor-pointer"
                onClick={onRemove}
              >
                Remove
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
