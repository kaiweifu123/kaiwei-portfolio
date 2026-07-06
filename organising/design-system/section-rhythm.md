# Section Rhythm

The portfolio should establish a clear visual rhythm as readers move through long-form content.

## Section Surface Rhythm

Major narrative sections alternate between two semantic background surfaces:

- `surface/default`
- `surface/subtle`

Example:

```text
surface/default
↓
surface/subtle
↓
surface/default
↓
surface/subtle
```

This alternating rhythm helps readers distinguish chapters without relying on heavy dividers.

## Surface Rules

- Background colors must come from the Design System.
- Never introduce custom section backgrounds.
- Use semantic surfaces only, such as `surface/default` and `surface/subtle`.
- Do not hardcode colors.

## When To Alternate

Alternate backgrounds only for major narrative sections.

Examples:

- Overview
- Research
- Opportunity
- Design
- Validation
- Iteration
- Results
- Reflection

Do not alternate every small subsection.

Subsections inherit the background of their parent section.

## Consistency

Background changes should feel intentional and predictable.

Readers should subconsciously recognize the transition into a new chapter through both spacing and surface changes.

## Section Spacing Rhythm

Major narrative sections use one semantic vertical padding token:

- Section top and bottom padding: `--space-section-padding-y`

Current values:

- Desktop / default: `64px`
- Mobile: `48px`

Section interiors follow one canonical spacing pattern:

- Header to body content: `--space-section-header-body` (`24px`)
- Body elements to other body elements: `--space-section-body-element` (`16px`)
- Text-to-text stacking: `--space-text-stack` (`8px`)

Use semantic rhythm tokens before primitive `--space-*` values.

If a section needs a different rhythm, treat it as a named narrative pattern rather than a local one-off.
