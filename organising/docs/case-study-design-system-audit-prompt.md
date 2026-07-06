# Case Study Design System Audit Prompt

Please audit this portfolio case study UI against the existing Case Study Design System.

This is not a redesign task. This is a design-system consistency audit and cleanup planning task.

The current page feels inconsistent in font sizes, padding, gaps, section spacing, cards, tabs, captions, and component hierarchy. I want a systematic cleanup plan that strengthens the existing design system instead of adding new visual decisions.

Do not implement changes yet. First inspect the codebase and produce a structured cleanup prompt / plan.

## First, Read The System

Before judging the UI, please inspect:

1. `AGENTS.md`
2. Existing design tokens
3. Existing semantic roles
4. Existing reusable components
5. Existing page / section composition patterns

Start from these files and folders:

- `AGENTS.md`
- `src/styles/design-tokens.css`
- `src/index.css`
- `src/components/ui/`
- `src/components/ContentArea.tsx`
- `src/components/DesignSystemPage.tsx`

Treat `src/styles/design-tokens.css`, `src/index.css`, and `src/components/ui/` as the primary design-system source of truth unless the codebase shows a newer centralized system.

Judge the page according to this hierarchy:

```txt
Foundation
-> Semantic Roles
-> Narrative Patterns
-> Pages
```

Do not judge each section as an isolated design.

## Core Rule

Do not introduce new typography, spacing, color, surface, card, tab, chip, badge, caption, or shadow styles unless you can prove the existing design system has no suitable role.

If something looks inconsistent, first ask:

- Is there an existing token for this?
- Is there an existing semantic role for this?
- Is there an existing component for this pattern?
- Is this a true new semantic need, or just a local visual variation?

Prefer refactoring usage to existing roles over creating new CSS.

## Audit Areas

### 1. Typography

Audit all font usage across the portfolio.

Look for:

- Font-size inconsistencies
- Font-family drift
- Font-weight drift
- Line-height inconsistencies
- Letter-spacing inconsistencies
- Text color inconsistencies
- Hardcoded typography utilities
- Repeated text patterns that should use one semantic role

Check whether repeated roles are consistently using system classes such as:

- `case-section-label`
- `case-heading`
- `case-body-copy`
- `case-label`
- `case-caption-copy`
- `case-card-title`
- `case-card-body`
- `case-card-support`
- `case-metric`

Flag any text that visually belongs to one of these roles but is implemented differently.

### 2. Spacing

Audit spacing across:

- Section padding
- Section header spacing
- Body copy spacing
- Card padding
- Card inner gaps
- Figure spacing
- Caption spacing
- Tab spacing
- Grid gaps
- Mobile spacing
- Desktop spacing

Look for:

- Hardcoded spacing values
- Repeated but differently implemented gaps
- Similar sections with different vertical rhythm
- Nested wrappers creating accidental extra spacing
- Components that do not use spacing tokens

Recommend a smaller, clearer spacing system if needed, but prefer existing tokens first.

### 3. Components

Audit reusable UI patterns:

- Section headers
- Cards
- Figure frames
- Captions
- Tabs
- Pills
- Stats
- Callouts
- Quotes
- Comparison blocks
- Walkthrough sections
- Image carousels
- Feedback blocks

Look for:

- Similar visual patterns implemented as different components
- Components that duplicate styling internally
- Components that accept too many page-specific style overrides
- Components that should own their visual language
- Page-level code recreating an existing component

For every duplicated pattern, recommend which component should become the source of truth.

### 4. Layout

Audit layout consistency across desktop and mobile.

Look for:

- Inconsistent container widths
- Inconsistent max-widths
- Horizontal overflow risks
- Images not fitting their containers
- UI screenshots too small or too padded
- Nested containers creating unnecessary inset
- Tabs behaving differently across sections
- Section backgrounds not following a clear rhythm
- Sticky nav / progress behavior inconsistencies
- Mobile layout issues

Check whether every section follows the same portfolio structure:

```txt
Section category
-> Section title
-> Divider / header spacing
-> Supporting copy
-> Primary visual content
-> Supporting evidence / conclusion
```

Flag sections that break this hierarchy without a clear reason.

### 5. Tokens

Audit design tokens.

Look for repeated raw values in:

- Font sizes
- Font families
- Font weights
- Line heights
- Letter spacing
- Colors
- Background colors
- Borders
- Radius
- Shadows
- Padding
- Gaps
- Widths
- Max-widths

Search for patterns like:

```txt
text-[
font-
tracking
leading-
uppercase
capitalize
bg-[var(
border-[var(
rounded-
shadow-
#[0-9A-Fa-f]
```

For each match, decide:

- Is this layout-only?
- Is this a one-off exception?
- Should it use an existing token?
- Should it use an existing semantic role?
- Should it become a new token or role?

Do not create new tokens casually. Only propose new tokens when there is a repeated semantic need.

## Output Format

Please produce the audit in this structure:

### 1. Diagnosis

A short summary of the main design-system problems causing the page to feel inconsistent.

### 2. Findings

Group findings by:

- Typography
- Spacing
- Components
- Layout
- Tokens

For each finding, include:

- What is inconsistent
- Why it matters
- Relevant file(s), component(s), class(es), or token(s)
- Whether this should be fixed by:
  - Reusing an existing token
  - Reusing an existing semantic role
  - Consolidating a component
  - Creating a new approved role/token
  - Removing page-level styling

### 3. Cleanup Strategy

Propose a staged cleanup plan:

1. Token cleanup
2. Semantic role cleanup
3. Component consolidation
4. Page-level refactor
5. Responsive / mobile pass
6. Final design-system audit

### 4. Implementation Prompt

End with a concrete implementation prompt that I can give to another coding agent.

The implementation prompt should be specific, sequenced, and safe.

It should say:

- What files to inspect first
- What roles/tokens to reuse
- What not to change
- What order to refactor in
- How to verify the result
- How to avoid inventing new styles

## Important Constraints

- Do not implement changes yet.
- Do not redesign the portfolio.
- Do not introduce a new visual direction.
- Do not add new CSS before checking existing tokens and semantic roles.
- Do not solve inconsistencies with local one-off fixes.
- Do not create duplicate roles for the same visual pattern.
- Do not change content or storytelling unless needed for layout consistency.
- Prioritize system consistency and maintainability over quick visual fixes.

The goal is:

- Design-system cleanup plan, not redesign.
- Reduce visual drift.
- Make the current portfolio consistently reuse the Case Study Design System.
