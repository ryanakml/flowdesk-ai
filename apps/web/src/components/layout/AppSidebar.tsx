import * as React from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { useAuth } from "../../features/auth/context.js";
import {
  navigationGroups,
  workspaceSettingsItem,
  isRouteActive,
  type NavItem
} from "./navigation.js";
import { OrgSwitcher } from "./OrgSwitcher.js";
import { UserNav } from "./UserNav.js";
import { activeNavClassName } from "./nav-styles.js";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@flowdesk/ui";

export function FlowDeskIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="32" rx="8" fill="#111b21" />
      <path
        d="M9 7.5h11a1.5 1.5 0 0 1 0 3H12v4h6.5a1.5 1.5 0 0 1 0 3H12v6.5a1.5 1.5 0 0 1-3 0v-16.5z"
        fill="#ffffff"
      />
      <circle cx="23" cy="23" r="3" fill="#25d366" />
    </svg>
  );
}

export const WabrixIcon = FlowDeskIcon;

interface AppSidebarProps {
  collapsed?: boolean;
  onNavigate?: () => void;
  className?: string;
}

export function AppSidebar({ collapsed = false, onNavigate, className = "" }: AppSidebarProps) {
  const { checkPermission } = useAuth();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const renderNavItem = (item: NavItem) => {
    const Icon = item.icon;
    const active = isRouteActive(pathname, item.href, item.exact);

    const linkContent = (
      <Link
        to={item.href}
        onClick={() => onNavigate?.()}
        className={`group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring ${
          active
            ? activeNavClassName
            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
        } ${collapsed ? "justify-center px-0 w-10 h-10" : "w-full"}`}
        data-active={active ? "true" : undefined}
        aria-current={active ? "page" : undefined}
        aria-label={collapsed ? item.title : undefined}
        data-testid={`nav-link-${item.href}`}
      >
        <Icon
          className={`h-4 w-4 shrink-0 transition-colors ${active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`}
        />
        {!collapsed && <span className="truncate">{item.title}</span>}
      </Link>
    );

    if (collapsed) {
      return (
        <Tooltip key={item.href} delayDuration={0}>
          <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
          <TooltipContent side="right" className="font-medium text-sm">
            {item.title}
          </TooltipContent>
        </Tooltip>
      );
    }

    return <React.Fragment key={item.href}>{linkContent}</React.Fragment>;
  };

  return (
    <TooltipProvider>
      <aside
        aria-label="Sidebar"
        className={`flex h-full flex-col border-r border-border/70 bg-sidebar text-sidebar-foreground select-none transition-all duration-200 ${
          collapsed ? "w-16" : "w-64"
        } ${className}`}
        data-testid="app-sidebar"
      >
        <div className="flex h-12 flex-none items-center px-3">
          <OrgSwitcher collapsed={collapsed} compact />
        </div>

        {/* Navigation Groups Container */}
        <div className="scrollbar-hidden min-h-0 flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {navigationGroups.map((group) => {
            const visibleItems = group.items.filter((item) => {
              if (item.permission) {
                return checkPermission(item.permission);
              }
              return true;
            });

            if (visibleItems.length === 0) return null;

            return (
              <div key={group.heading} className="space-y-1.5">
                {!collapsed && (
                  <h3 className="px-3 text-[10.5px] font-semibold tracking-wider text-[#8e8e93] uppercase">
                    {group.heading}
                  </h3>
                )}
                <nav className="space-y-0.5" aria-label={group.heading}>
                  {visibleItems.map(renderNavItem)}
                </nav>
              </div>
            );
          })}

          <div className="pt-2 border-t border-border/40">
            {renderNavItem(workspaceSettingsItem)}
          </div>
        </div>

        {/* Sidebar Footer: User Profile & Account Actions */}
        <div className="z-10 flex-none border-t border-border/60 bg-sidebar p-3">
          <UserNav collapsed={collapsed} onNavigate={onNavigate} />
        </div>
      </aside>
    </TooltipProvider>
  );
}
