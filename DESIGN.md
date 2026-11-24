# FlowDesk Design System (DESIGN.md)

_Benchmark: Lemni.com & Linear Design Standard_

This document defines the visual identity, tokens, component patterns, and layout ergonomics for FlowDesk. All web components in `@flowdesk/web` and `@flowdesk/ui` must adhere to these standards to eliminate generic, anonymous, or templated "AI slop".

---

## 1. Core Visual Principles

1. **Hardware-grade Physical Elevation**:
   Instead of flat, washed-out shadows or generic gray borders, components use multi-layered physical shadows with inset light-reflections (`inset 1px 1px 1px 0px #FFF`). This makes buttons, inputs, and cards feel like tactile physical hardware.

2. **Calm, High-density Neutral Surfaces**:
   - Canvas background: `#F6F6F8` (Technical warm white-slate)
   - Navigation sidebar: `#F1F3F4`
   - Active surfaces & cards: `#FFFFFF`
   - Inset hairline dividers: `rgba(0, 0, 0, 0.05)` (Light mode) / `rgba(255, 255, 255, 0.08)` (Dark mode)

3. **Fluid Multi-pane Workspace**:
   Standard enterprise SaaS dashboards are 3 or 4-pane workspaces with drag-resizable panels, snap widths (300px), and frosted glass headers (`backdrop-filter: blur(10px)`).

4. **Purposeful Color System**:
   - Primary Ink: `#0D0D12` (Crisp technical dark)
   - Secondary / Muted: `#56576A`
   - Tertiary / Subtle: `#9B9B9C`
   - Brand Accent: `#25D366` (Official WhatsApp Emerald)
   - Priority Highlights:
     - Urgent: `#DC2626` (Red-600)
     - High: `#D97706` (Amber-600)
     - Normal / Low: `#4B5563` (Slate-600)

---

## 2. Design Tokens

### Physical Inset Shadows

```css
/* Input & Form Controls */
--shadow-lemni-input:
  0px 1px 2px rgba(95, 122, 143, 0.25), inset -1px -1px 1px rgba(0, 0, 0, 0.03),
  inset 1px 1px 1px 0px rgba(255, 255, 255, 1);

/* Interactive Cards & Tiles */
--shadow-lemni-tile:
  0px 1px 3px rgba(95, 122, 143, 0.22), inset 1px 1px 1px 0px rgba(255, 255, 255, 1);
--shadow-lemni-tile-hover:
  0px 6px 14px rgba(95, 122, 143, 0.22), inset 1px 1px 1px 0px rgba(255, 255, 255, 1);

/* Action Buttons */
--shadow-lemni-btn:
  0px 1px 2px rgba(95, 122, 143, 0.25), inset 1px 1px 1px 0px rgba(255, 255, 255, 1);
--shadow-lemni-btn-hover:
  0px 2px 3px rgba(95, 122, 143, 0.25), inset 1px 1px 1px 0px rgba(255, 255, 255, 1);
```

---

## 3. Workspace Layout Architecture

```
┌─────────────────┬────────────────────────┬─────────────────────────────────────┬──────────────────┐
│ Left Sidebar    │ Sub-Sidebar            │ Conversation Canvas                 │ Context Panel    │
│ (260px)         │ (Resizable, Snap 300px)│ (Center Stage)                      │ (Right Inspector)│
│ • Workspace     │ • Filter Tabs          │ • Frosted Header (56px)             │ • Customer Info  │
│ • Inbox         │   (All/Open/Pending...)│   (Breadcrumbs + Team Presence)     │ • Tags & SLA     │
│ • Knowledge     │ • Search + ⌘K          │ • WhatsApp Timeline                 │ • Citations      │
│ • Channels      │ • Thread Cards with    │ • Smart Composer with               │ • Private Notes  │
│ • Settings      │   AI Summary & Priority│   Draft Cache & Tool Pills          │                  │
└─────────────────┴────────────────────────┴─────────────────────────────────────┴──────────────────┘
```

### Component Guidelines

1. **ConversationItem**: Must display contact name, priority accent bar, snippet/waiting reason, status pill, and relative compact timestamp.
2. **ConversationHeader**: Must use frosted glass background (`backdrop-blur-md bg-[#f6f6f8]/85`), breadcrumbs, and explicit action buttons (`Assign to Me`, `Resolve`, `Context`).
3. **MessageComposer**: Must persist drafts in `localStorage` per conversation ID (`flowdesk.draft.${id}`), expose quick action pills (`Knowledge Base`, `Template`, `AI Draft`), and provide a tactile emerald send action.
