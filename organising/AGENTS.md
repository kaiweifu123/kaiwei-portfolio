# AGENTS.md

# Case Study System Working Agreement

## Purpose

This portfolio is not a collection of independent pages.

It is a reusable Case Study System.

Every implementation should improve the system rather than solve an isolated page.

The system should become simpler, more reusable, and easier to maintain over time.

## Design System Source Of Truth

The Design System lives in:

- `design-system/README.md`
- `design-system/tokens.md`
- `design-system/semantic-roles.md`
- `design-system/narrative-patterns.md`
- `design-system/section-rhythm.md`
- `design-system/responsive.md`
- `design-system/components.md`
- `design-system/audit-checklist.md`

Before changing case study UI, read the relevant files in `design-system/`.

Do not treat pages or local component overrides as the source of truth.

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

Never work backwards.

Never design directly at the page level.

## Core Rules

- Search before creating anything new.
- Reuse existing tokens, semantic roles, narrative patterns, and components first.
- Each semantic role has exactly one implementation.
- JSX should describe meaning, not appearance.
- Tailwind utilities are for layout, not recurring visual identity.
- New roles need semantic meaning, not just different visuals.
- Major narrative sections must follow the section rhythm rules in `design-system/section-rhythm.md`.
- Pages compose patterns; pages do not invent new layouts.
- The only app is this folder (`organising`). Never create or edit code in `case-study-archived` or any second app. All routes, including `/illustration`, live here.

## Implementation Order

Always implement in this order:

1. Tokens
2. Semantic Roles
3. Components
4. Narrative Patterns
5. Page Composition

Never start from page-specific styling.

## Before Extending The System

If no suitable role, component, or pattern exists:

1. Stop.
2. Search again.
3. Explain the conflict.
4. Propose a new semantic role, component, or pattern.
5. Wait for approval before introducing it.

## Completion Audit

Before considering work complete, run the audit in:

- `design-system/audit-checklist.md`

At minimum, verify:

- Did I search before creating?
- Did I reuse an existing semantic role?
- Did I reuse an existing narrative pattern?
- Did I duplicate typography?
- Did I duplicate visual identity?
- Does every repeated element map back to the system?
- Did this implementation strengthen the system?

If any answer is "No", the implementation is not complete.

## Final Principle

Never ask:

> How do I build this page?

Always ask:

> How can this page strengthen the Case Study System?

AI may compose roles.

AI may compose patterns.

AI may not extend the system without approval.
