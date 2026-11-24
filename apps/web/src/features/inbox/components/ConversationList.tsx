import { useRef, useMemo } from "react";
import type { Conversation, InboxWorkspaceResourcesResponse } from "@flowdesk/contracts";
import { Skeleton } from "@flowdesk/ui";
import { RefreshCw, Search, X, Layers } from "lucide-react";
import { ConversationItem } from "./ConversationItem.js";
import type { StatusFilter, AssigneeFilter } from "../hooks/useConversationFilters.js";

interface ConversationListProps {
  conversations: Conversation[];
  loading: boolean;
  selectedConversationId: string | null;
  sessionUserId: string;
  // Filter state
  statusFilter: StatusFilter;
  assigneeFilter: AssigneeFilter;
  queueFilter: string;
  searchQuery: string;
  // Resources
  resources: InboxWorkspaceResourcesResponse;
  filterName: string;
  selectedSavedFilterId: string;
  // Locale
  locale: "en" | "id";
  // Callbacks
  onSelectConversation: (id: string) => void;
  onStatusFilterChange: (s: StatusFilter) => void;
  onAssigneeFilterChange: (a: AssigneeFilter) => void;
  onQueueFilterChange: (q: string) => void;
  onSearchChange: (q: string) => void;
  onFilterNameChange: (n: string) => void;
  onSavedFilterSelect: (id: string) => void;
  onSaveFilter: () => void;
  onDeleteFilter: () => void;
  onRefresh: () => void;
  onLocaleToggle: () => void;
}

const STATUS_TABS: StatusFilter[] = ["all", "new", "open", "pending", "resolved", "closed"];

export function ConversationList({
  conversations,
  loading,
  selectedConversationId,
  sessionUserId,
  statusFilter,
  assigneeFilter,
  queueFilter,
  searchQuery,
  resources,
  filterName,
  selectedSavedFilterId,
  locale,
  onSelectConversation,
  onStatusFilterChange,
  onAssigneeFilterChange,
  onQueueFilterChange,
  onSearchChange,
  onFilterNameChange,
  onSavedFilterSelect,
  onSaveFilter,
  onDeleteFilter,
  onRefresh,
  onLocaleToggle
}: ConversationListProps) {
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const isInbox = locale === "en";
  const heading = isInbox ? "Inbox" : "Kotak Masuk";
  const searchPlaceholder = isInbox ? "Search phone or name..." : "Cari nomor atau nama...";

  const statusCounts = useMemo(() => {
    const counts: Record<StatusFilter, number> = {
      all: conversations.length,
      new: 0,
      open: 0,
      pending: 0,
      resolved: 0,
      closed: 0
    };
    for (const c of conversations) {
      if (counts[c.status] !== undefined) {
        counts[c.status]++;
      }
    }
    return counts;
  }, [conversations]);

  const filteredConversations = conversations.filter((c) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      c.customerPhone.toLowerCase().includes(q) || (c.customerName ?? "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white border-r border-black/[0.06]">
      {/* Header Bar */}
      <div className="flex-shrink-0 px-3.5 pt-3.5 pb-2.5 border-b border-black/[0.06] bg-[#f6f6f8]/80">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <h2 className="text-[14px] font-semibold tracking-tight text-[#0d0d12]">{heading}</h2>
            <span className="text-[11px] font-medium text-[#56576a] bg-white border border-black/[0.08] px-2 py-0.5 rounded-full shadow-2xs font-mono">
              {filteredConversations.length}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              className="px-2 py-0.5 rounded-full border border-black/[0.08] bg-white hover:bg-[#f6f6f8] text-[11px] font-medium text-[#56576a] hover:text-[#0d0d12] transition-colors shadow-2xs"
              onClick={onLocaleToggle}
              aria-label={`Switch language: ${locale.toUpperCase()}`}
              data-testid="locale-toggle"
            >
              {locale.toUpperCase()}
            </button>
            <button
              type="button"
              className="p-1 rounded-full border border-black/[0.08] bg-white hover:bg-[#f6f6f8] text-[#56576a] hover:text-[#0d0d12] transition-colors shadow-2xs"
              onClick={onRefresh}
              title="Refresh inbox"
              aria-label="Refresh conversations"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Search Input with Shortcut Badge & Lemni Shadow */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#56576a] pointer-events-none" />
          <input
            type="text"
            className="w-full h-8.5 pl-8.5 pr-8 text-xs rounded-[10px] border border-black/[0.08] bg-white text-[#0d0d12] placeholder:text-[#56576a]/60 shadow-lemni-input focus:outline-none focus:ring-1 focus:ring-[#25d366] transition-all cursor-text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search conversations"
          />
          {searchQuery ? (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded hover:bg-black/5 text-[#56576a] hover:text-[#0d0d12]"
              aria-label="Clear search"
            >
              <X className="w-3 h-3" />
            </button>
          ) : (
            <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 hidden sm:inline-block text-[10px] text-[#56576a]/70 bg-[#f6f6f8] border border-black/[0.08] px-1.5 py-0.5 rounded font-mono shadow-2xs">
              ⌘K
            </kbd>
          )}
        </div>
      </div>

      {/* Status Filter Tabs (Sleek Lemni Pill Bar) */}
      <div
        className="scrollbar-hidden flex-shrink-0 px-3 py-2 border-b border-black/[0.06] flex gap-1.5 overflow-x-auto bg-[#fafafa]/80"
        role="tablist"
        aria-label="Status filters"
      >
        {STATUS_TABS.map((tab) => {
          const isSelected = statusFilter === tab;
          const count = statusCounts[tab];
          return (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={isSelected}
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                isSelected
                  ? "bg-[#0d0d12] text-white shadow-lemni-btn"
                  : "bg-white text-[#56576a] border border-black/[0.08] hover:bg-[#f6f6f8] hover:text-[#0d0d12] shadow-2xs"
              }`}
              onClick={() => onStatusFilterChange(tab)}
            >
              <span>{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
              {count > 0 && (
                <span
                  className={`text-[9.5px] px-1 rounded-full font-mono ${
                    isSelected ? "bg-white/20 text-white" : "bg-black/5 text-[#56576a]"
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Quick Filters (Assignee & Queues) */}
      <div className="flex-shrink-0 px-3 py-2 border-b border-black/[0.06] flex flex-col gap-1.5 bg-white">
        {/* Assignee Segmented Switcher */}
        <div className="grid grid-cols-3 gap-1 p-0.5 rounded-[8px] bg-[#f1f3f4] border border-black/[0.06]">
          {(
            [
              { id: "all", label: "All" },
              { id: "me", label: "Me" },
              { id: "unassigned", label: "Unassigned" }
            ] as const
          ).map((item) => {
            const active = assigneeFilter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onAssigneeFilterChange(item.id)}
                className={`py-1 text-[11px] font-medium rounded-[6px] transition-all cursor-pointer ${
                  active
                    ? "bg-white text-[#0d0d12] shadow-lemni-btn font-semibold"
                    : "text-[#56576a] hover:text-[#0d0d12]"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Hidden select kept for tests & form compatibility */}
        <select
          className="sr-only"
          value={assigneeFilter}
          onChange={(e) => onAssigneeFilterChange(e.target.value as AssigneeFilter)}
          aria-label="Filter by assignee"
        >
          <option value="all">All Assignees</option>
          <option value="me">Assigned to Me</option>
          <option value="unassigned">Unassigned</option>
        </select>

        {/* Queue Selector */}
        {resources.queues.length > 0 && (
          <div className="relative">
            <select
              className="w-full h-7 px-2.5 text-[11px] rounded-[8px] border border-black/[0.08] bg-white text-[#0d0d12] focus:outline-none focus:ring-1 focus:ring-[#25d366] cursor-pointer shadow-2xs"
              value={queueFilter}
              onChange={(e) => onQueueFilterChange(e.target.value)}
              aria-label="Filter by queue"
              data-testid="queue-filter"
            >
              <option value="all">All Queues</option>
              {resources.queues.map((queue) => (
                <option key={queue.id} value={queue.id}>
                  {queue.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Saved Filters Bar (if present) */}
        {resources.savedFilters.length > 0 && (
          <div className="flex gap-1">
            <select
              id="saved-filter-select"
              className="flex-1 h-7 px-2 text-[11px] rounded-[8px] border border-black/[0.08] bg-white text-[#0d0d12] shadow-lemni-input focus:outline-none focus:ring-1 focus:ring-[#25d366]"
              value={selectedSavedFilterId}
              onChange={(e) => onSavedFilterSelect(e.target.value)}
            >
              <option value="">Saved Filters</option>
              {resources.savedFilters.map((filter) => (
                <option key={filter.id} value={filter.id}>
                  {filter.name}
                </option>
              ))}
            </select>
            {selectedSavedFilterId && (
              <button
                type="button"
                className="px-2 py-1 text-[11px] rounded-[8px] border border-red-200 text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                onClick={onDeleteFilter}
                aria-label="Delete saved filter"
              >
                ✕
              </button>
            )}
          </div>
        )}

        {/* Save current filter input (compact) */}
        <div className="flex gap-1">
          <input
            className="flex-1 h-6.5 px-2 text-[11px] rounded-[6px] border border-black/[0.08] bg-white text-[#0d0d12] placeholder:text-[#56576a]/50 shadow-lemni-input focus:outline-none focus:ring-1 focus:ring-[#25d366]"
            value={filterName}
            onChange={(e) => onFilterNameChange(e.target.value)}
            placeholder="Save filter view..."
            aria-label="Filter name"
          />
          <button
            type="button"
            className="px-2 py-0.5 text-[11px] font-medium rounded-[6px] border border-black/[0.08] bg-white hover:bg-[#f6f6f8] text-[#0d0d12] transition-colors disabled:opacity-40 cursor-pointer shadow-lemni-btn"
            disabled={!filterName.trim()}
            onClick={onSaveFilter}
            aria-label="Save filter"
          >
            +
          </button>
        </div>
      </div>

      {/* Conversation List */}
      <div
        className="scrollbar-hidden flex-1 overflow-y-auto divide-y divide-black/[0.06]"
        role="listbox"
        aria-label="Conversations"
      >
        {loading && conversations.length === 0 ? (
          <div className="p-3.5 space-y-3" data-testid="inbox-loading">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start gap-3 p-1">
                <Skeleton className="w-9 h-9 rounded-full flex-shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-3.5 w-2/3" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
            <p className="sr-only">Loading conversations...</p>
          </div>
        ) : filteredConversations.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center h-48 px-4 text-center"
            data-testid="inbox-empty"
          >
            <div className="w-10 h-10 rounded-full bg-[#f6f6f8] border border-black/[0.06] flex items-center justify-center mb-2.5 text-[#56576a]">
              <Layers className="w-4 h-4" />
            </div>
            <p className="text-[13px] font-medium text-[#0d0d12]">No conversations found</p>
            <p className="text-[11px] text-[#56576a] mt-0.5">
              Try adjusting your search query or status filter.
            </p>
          </div>
        ) : (
          filteredConversations.map((conv, index) => (
            <ConversationItem
              key={conv.id}
              conversation={conv}
              isSelected={conv.id === selectedConversationId}
              sessionUserId={sessionUserId}
              tabIndex={
                conv.id === selectedConversationId ||
                (!selectedConversationId && conv === filteredConversations[0])
                  ? 0
                  : -1
              }
              buttonRef={(el) => {
                buttonRefs.current[index] = el;
              }}
              onClick={() => onSelectConversation(conv.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectConversation(conv.id);
                }
                const target =
                  e.key === "ArrowDown"
                    ? index + 1
                    : e.key === "ArrowUp"
                      ? index - 1
                      : e.key === "Home"
                        ? 0
                        : e.key === "End"
                          ? filteredConversations.length - 1
                          : null;
                if (target !== null) {
                  e.preventDefault();
                  const next = Math.max(0, Math.min(filteredConversations.length - 1, target));
                  buttonRefs.current[next]?.focus();
                }
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}
