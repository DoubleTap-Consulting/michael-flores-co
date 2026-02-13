---
name: apple-hig-platform-adaptation
description: Apply Apple Human Interface Guidelines platform adaptation principles to cross-device web experiences. Use when adapting layouts and interaction models for phone, tablet, desktop, and Apple ecosystem expectations while preserving a coherent personal-site brand.
---

# Apple HIG Platform Adaptation

Use this skill to adapt one design language across contexts without fragmentation.

## Workflow

1. Read `references/platform-adaptation.md`.
2. Define invariant design principles (brand, tone, core hierarchy).
3. Define platform-adaptive behavior (navigation style, density, control sizing, interaction affordances).
4. Map responsive breakpoints to behavior changes, not only visual resizing.
5. Validate each critical flow on touch-first and pointer-first environments.

## Implementation Rules

- Keep core information architecture stable across devices.
- Adapt navigation and controls to input model and available space.
- Keep desktop layouts from becoming dense clones of mobile and vice versa.
- Keep advanced controls contextual and progressively disclosed.
- Keep page performance and responsiveness high on all device classes.

## Personal-Site Output

Produce these artifacts when asked:

1. Breakpoint behavior matrix.
2. Per-platform interaction deltas.
3. Shared component contract with adaptive variants.
4. Cross-device QA checklist.

