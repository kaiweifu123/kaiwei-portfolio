# Semantic Roles

Semantic roles define recurring visual identity. Pages and components should reference roles instead of recreating appearance with utilities.

## Rule

One role has one implementation.

If two elements look the same, they must reference the same semantic role.

Good:

```tsx
<h2 className="case-heading" />
```

Bad:

```tsx
<h2 className="text-[20px] font-serif tracking-[0.12em]" />
```

## Typography Roles

Always reuse registered roles whenever possible.

- `font-hero-display`
- `font-hero-subtitle`
- `font-chip`
- `case-section-label`
- `case-heading`
- `case-stage-title`
- `case-body-copy`
- `case-label`
- `case-caption-copy`
- `case-card-title`
- `case-card-title-primary`
- `case-card-body`
- `case-metric`

## Section Header Writing Roles

`case-section-label` and `case-heading` must not carry the same meaning.

- `case-section-label` is categorical and presentation-oriented. Use short labels like `Research`, `Design`, `Testing`, `Result`.
- `case-heading` is narrative and content-specific. It should explain the section's turn, question, evidence, or outcome.

If the source only provides a generic title, write a concise narrative heading from the section content and keep the generic word as the label.

## Surface Roles

- `case-card`
- `case-surface`
- `case-surface-base`
- `case-divider`
- `case-callout-quote`
- `case-callout-card`

## Interaction Roles

- `case-chip`
- `case-chip-active`
- `case-badge`

## Spacing Rhythm Roles

Use these semantic spacing tokens inside narrative sections:

- Header to body content: `--space-section-header-body` (`24px`)
- Body element to body element: `--space-section-body-element` (`16px`)
- Text stack / paragraph-to-paragraph: `--space-text-stack` (`8px`)

## Tailwind Rules

Tailwind utilities may be used for:

- Flex
- Grid
- Gap
- Margin
- Padding
- Responsive layout
- Width
- Height
- Position
- Visibility

Tailwind should not define recurring visual language:

- Typography
- Colors
- Radius
- Borders
- Surface
- Shadow

If a visual value repeats twice, move it into the Design System.

## New Role Rules

New roles exist because content has a different purpose, not because visuals are different.

These are not valid reasons by themselves:

- Different font size
- Different spacing
- Different color
- Different border
- Local page requirement

If no suitable role exists:

1. Stop.
2. Explain why existing roles do not work.
3. Propose a new semantic role.
4. Wait for approval before introducing it.
