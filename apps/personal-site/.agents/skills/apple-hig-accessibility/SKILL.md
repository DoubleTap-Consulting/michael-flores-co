---
name: apple-hig-accessibility
description: Apply Apple Human Interface Guidelines accessibility practices to web interfaces. Use when auditing or building for VoiceOver/screen readers, keyboard navigation, contrast, motion sensitivity, inclusive language, and adaptive UI behavior in the personal-site.
---

# Apple HIG Accessibility

Use this skill to make the redesign broadly usable and robust.

## Workflow

1. Read `references/accessibility.md`.
2. Audit semantic structure and heading hierarchy.
3. Audit focus order and full keyboard operation.
4. Audit non-color state communication and contrast.
5. Audit motion, animation, and timing sensitivity.
6. Audit text alternatives and control labels.
7. Document remediation with severity and implementation order.

## Implementation Rules

- Use semantic HTML and ARIA only when needed.
- Keep keyboard access first-class for all interactive paths.
- Keep visible focus indicators in every theme and state.
- Keep motion optional and honor reduced-motion preferences.
- Keep labels, helper text, and errors explicit.
- Keep language inclusive and localization-ready.
- Keep privacy and trust cues transparent and understandable.

## Personal-Site Output

Produce these artifacts when asked:

1. Accessibility issue list ordered by severity.
2. Remediation plan with exact component-level changes.
3. QA checklist for keyboard, screen reader, contrast, and motion.
4. Post-fix verification notes.

