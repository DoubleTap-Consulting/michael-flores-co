---
name: apple-hig-interaction-controls
description: Apply Apple Human Interface Guidelines interaction and control behavior to web UI implementation. Use when defining buttons, toggles, text fields, pickers, gestures, pointer behavior, feedback states, and interaction responsiveness for the personal-site.
---

# Apple HIG Interaction And Controls

Use this skill to make controls feel direct, responsive, and consistent.

## Workflow

1. Read `references/interaction-controls.md`.
2. Inventory all interactive elements and map each to a clear semantic role.
3. Standardize states: default, hover, focus, active, disabled, loading, success, error.
4. Validate touch, pointer, and keyboard operation for every interaction.
5. Add immediate feedback for user actions and async events.
6. Remove gesture-only critical actions.

## Implementation Rules

- Use native semantics first (`button`, `a`, `input`, `select`) and enhance styling.
- Keep control labels explicit and action-oriented.
- Keep state transitions short and purposeful.
- Keep pointer affordances clear on desktop.
- Keep focus behavior visible and predictable.
- Keep input error handling actionable and specific.
- Keep gestures supplemental, not exclusive.

## Personal-Site Output

Produce these artifacts when asked:

1. Interaction state matrix per component.
2. Form interaction spec (validation + errors + success).
3. Desktop pointer and keyboard behavior checklist.
4. Motion and feedback rules tied to event types.

