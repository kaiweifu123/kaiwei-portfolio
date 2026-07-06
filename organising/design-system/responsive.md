# Responsive System

The case study must work as a long-form portfolio page across desktop browsers, laptop screens, tablets, and mobile viewports.

Responsive behavior is part of the Design System. Do not solve responsiveness with local one-off widths, padding, or typography unless the value is artifact-specific.

## Breakpoint Model

The project currently uses Tailwind's responsive prefixes and token overrides:

- Mobile default: base styles
- Tablet / small desktop: `md:`
- Wide layouts and dense grids: `lg:`
- Token overrides for small screens: `@media (max-width: 767px)` in `src/styles/design-tokens.css`

Rules:

- Write mobile-safe layout first.
- Add `md:` or `lg:` only when the content benefits from extra horizontal room.
- Do not create new arbitrary breakpoints unless a component has a proven need.

## Page Widths

Use container tokens:

- Main page shell: `--container-main`
- Reading content: `--container-content`
- Section body: `--container-section-body`
- Showcase modules: `--container-showcase` legacy/special-component only
- Large artifacts: `--container-artifact` named-component only

Rules:

- Long prose should stay inside readable content widths.
- All non-hero case-study body content should stay inside `--container-section-body`, including screenshots, source figures, galleries, evidence blocks, metadata, reflections, and project menus.
- Do not widen ordinary body figures or galleries to `--container-showcase`.
- Do not let body copy stretch full width on desktop.
- Do not force artifact cards wider than the viewport on mobile.
- Only a named DS component may opt into a wider artifact token. Do not add local `max-width` overrides in page files.

## Page Padding

Use page padding tokens:

- Horizontal page padding: `--space-page-x`
- Desktop horizontal page padding: `--space-page-x-desktop`

Rules:

- Mobile uses the base `--space-page-x`.
- Desktop may use `--space-page-x-desktop`.
- Do not hardcode page padding in sections.

## Section Vertical Padding

Major narrative sections use one semantic vertical padding token:

- `--space-section-padding-y`

Current values:

- Desktop / default: `64px`
- Mobile: `48px`

Rules:

- Use the same top and bottom padding for major narrative sections.
- Do not locally set different top and bottom padding unless the section is a named pattern with documented behavior.
- `SectionShell` owns the standard section padding.
- Custom major sections, such as Overview, must use `--space-section-padding-y`.
- Subsections should use internal rhythm tokens, not section padding tokens.

## Hero Responsive Behavior

The default hero is a left/right pattern on desktop:

- Left: title, subtitle, chips.
- Right: product visual or artifact.

On smaller screens, the hero should collapse into a single column:

- Text first.
- Visual second.
- Maintain readable text width.
- Keep chips wrapping naturally.

Rules:

- Hero should use stable viewport-aware height, such as `100dvh`, only when the first viewport benefits from it.
- When `EditorialHeader` and `CaseStudyTopNav` appear above the hero, calculate hero height from the remaining visible viewport:

```css
min-height: calc(100dvh - var(--editorial-header-height) - var(--case-study-top-nav-height));
```

- The hero should begin immediately under the sticky section nav. There should be no gap between the nav and hero.
- Center hero text and visual media inside this nav-adjusted visible region, not inside the full browser viewport.
- Do not use `transform: translateY(...)` or arbitrary negative margins to visually correct hero centering around sticky chrome.
- Visual media should use stable min/max height constraints.
- Use `object-cover` for immersive visual proof.
- Use `object-contain` when the full artifact must be inspectable.

## Grids

Use responsive grid collapse:

- Metadata grids: one column on mobile, four columns on desktop.
- Comparison cards: one column on mobile, two columns on desktop.
- Small card sets: one column on mobile, then two to four columns depending on content.

Rules:

- Do not keep four-column layouts on mobile.
- Do not shrink text to preserve columns.
- Prefer stacking over cramped cards.

## Media

Images, videos, and iframes must fit their containers.

Rules:

- Use `width: 100%` behavior for media.
- Use aspect-ratio for fixed-format media.
- Do not let media overflow horizontally.
- Do not lazy-render content so late that users reach an empty section.
- It is acceptable to preload key case-study assets when the portfolio is meant for smooth guided reading.

## Sticky Navigation

Sticky case-study navigation should remain readable and non-blocking.

Rules:

- Top-level navigation should include only major narrative sections.
- Sticky navigation should not cover section headings.
- Offset calculations should account for the editorial header and top nav.
- If mobile sticky navigation becomes cramped, prefer horizontal scroll or simplified section labels.

## Testing

Before considering responsive work complete, check:

- Desktop wide viewport.
- Laptop viewport.
- Tablet-width viewport.
- Mobile-width viewport.
- First screen hero.
- At least one prose-heavy section.
- At least one image-heavy section.
- At least one card/grid-heavy section.
