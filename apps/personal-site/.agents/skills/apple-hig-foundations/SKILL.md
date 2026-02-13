---
name: apple-hig-foundations
description: Apply Apple Human Interface Guidelines foundations to web redesigns, including hierarchy, consistency, layout rhythm, color, typography, imagery, materials, and motion. Use when defining or refactoring the core visual language and design tokens for the personal-site.
---

# Apple HIG Foundations

Use this skill to define the baseline visual system before building screens.

## Workflow

1. Read `references/foundations.md`.
2. Audit the target page for hierarchy, consistency, and readability failures.
3. Define or update tokens first: type scale, spacing, radius, color roles, elevation/material roles, motion durations.
4. Map tokens to concrete UI primitives in the page (headers, cards, buttons, links, sections).
5. Verify that visual effects support content and interaction, not decoration.

## Implementation Rules

- Prioritize content and actions over chrome.
- Keep a clear primary focal point per viewport.
- Use consistent spacing and alignment patterns across sections.
- Keep typography highly legible at all common breakpoints.
- Use color and material to communicate structure, state, and emphasis.
- Use motion to explain changes in state or hierarchy.
- Keep visual language cohesive across every page of the personal-site.

## Personal-Site Output

Produce these artifacts when asked for a redesign:

1. Token table (`color`, `type`, `space`, `radius`, `shadow/material`, `motion`).
2. Section hierarchy map for each page.
3. Before/after implementation plan with concrete component changes.

