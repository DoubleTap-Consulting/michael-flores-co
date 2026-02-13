---
name: apple-hig-redesign-orchestrator
description: Orchestrate Apple Human Interface Guidelines workstreams across foundations, navigation, controls, accessibility, platform adaptation, and content expression. Use when a redesign task spans multiple UI domains, needs sequencing, or needs a unified Apple-style implementation plan for the personal-site.
---

# Apple HIG Redesign Orchestrator

Use this skill as the entry point for end-to-end Apple-style redesign tasks.

## Workflow

1. Read `references/routing.md`.
2. Classify the request by dominant workstream.
3. Invoke the relevant specialist skill(s):
- `$apple-hig-foundations`
- `$apple-hig-navigation-and-ia`
- `$apple-hig-interaction-controls`
- `$apple-hig-accessibility`
- `$apple-hig-platform-adaptation`
- `$apple-hig-content-brand-expression`
4. Sequence work in this order unless the request requires a different order:
- Foundations
- Navigation and IA
- Interaction Controls
- Platform Adaptation
- Accessibility
- Content and Brand Expression
5. Merge outputs into one implementation plan with dependencies and verification steps.

## Routing Rules

- Route token system, hierarchy, materials, and motion work to `$apple-hig-foundations`.
- Route sitemap, nav model, menus, and wayfinding work to `$apple-hig-navigation-and-ia`.
- Route control semantics, state behavior, and feedback work to `$apple-hig-interaction-controls`.
- Route keyboard/screen reader/contrast/motion audits to `$apple-hig-accessibility`.
- Route breakpoint and cross-input behavior to `$apple-hig-platform-adaptation`.
- Route copy, iconography, imagery, and trust language to `$apple-hig-content-brand-expression`.

## Output Contract

Produce a single redesign package:

1. Ordered implementation phases.
2. Component-level change list.
3. QA checklist mapped to each phase.
4. Risks, assumptions, and unresolved decisions.

