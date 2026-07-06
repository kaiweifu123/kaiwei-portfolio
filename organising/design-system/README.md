# Case Study Design System

This folder is the source of truth for the `organising` portfolio case study system.

The portfolio is not a collection of independent pages. It is a reusable Case Study System. Every implementation should improve the system, reduce duplication, and make future case studies easier to build.

## System Hierarchy

Always think in this order:

```text
Foundation
↓
Semantic Roles
↓
Narrative Patterns
↓
Pages
```

Never work backwards. Never design directly at the page level.

## Files

- `tokens.md` documents foundation tokens and where they live in code.
- `semantic-roles.md` documents reusable typography, surface, interaction, and spacing roles.
- `narrative-patterns.md` documents reusable case study structures.
- `section-rhythm.md` documents major section background and spacing rhythm.
- `responsive.md` documents breakpoint, container, media, and section padding behavior.
- `components.md` documents reusable UI primitives and when to use them.
- `audit-checklist.md` documents the required design-system audit.

## Code Source

The implementation currently lives in:

- `src/styles/design-tokens.css`
- `src/index.css`
- `src/components/ui/`

Components and pages should compose the system. They should not invent recurring visual language locally.

## Core Rules

- The Design System is the source of truth.
- Search before creating anything new.
- One semantic role has one implementation.
- JSX should describe meaning, not appearance.
- Tailwind utilities are for layout, not recurring visual identity.
- New roles need semantic meaning, not just a different visual.
- Major sections use the section rhythm rules in this folder.
- Every completed task requires an audit by search.
