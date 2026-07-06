# Tokens

All recurring visual values should originate from:

- `src/styles/design-tokens.css`

Do not introduce hardcoded colors, spacing, typography, radius, border, shadow, or layout values in components unless the value is a one-off artifact position or screenshot-specific annotation.

## Design Intent

The project is an editorial UX case study, not a SaaS dashboard. The design language should remain:

- restrained
- warm
- document-like
- easy to scan
- clear in hierarchy
- sparse with decoration

Avoid visual styles that make the page feel like a generic template.

## Color

Use semantic surface, text, border, and accent tokens.

Primary groups:

- `--surface-*`
- `--text-*`
- `--accent-*`
- `--border-*-color`
- `--overlay-*`

Rules:

- Use `--surface-base` for neutral white containers.
- Use `--surface-panel` for tabbed or interactive panels.
- Use `--surface-section` for soft editorial sections.
- Use `--text-primary` for main copy and titles.
- Use `--text-muted` for descriptions, labels, and inactive tabs.
- Use `--accent-brown` for annotation and active change emphasis.
- Use `--accent-sage` for positive or selected informational accents.

## Typography

Primary groups:

- `--font-*-family`
- `--font-heading-*`
- `--font-body`
- `--font-label`
- `--font-meta`
- `--line-height-*`
- `--tracking-*`

Rules:

- Use the defined body family for ordinary body copy.
- Use the defined heading family for section and card headings.
- Use label/meta fonts only through semantic label roles.
- Use the editorial display family only for approved display moments.
- Main body text should stay around the body scale.
- Section titles should use the section heading scale, not hero scale.

## Spacing

Primary groups:

- `--space-*`
- `--space-component`
- `--space-section`
- `--space-section-padding-y`
- `--space-page-x`
- `--space-card-*`
- `--space-control-*`

Rules:

- Use `--space-component` for ordinary component gaps.
- Use `--space-component-lg` or `--space-3xl` for image/content separation.
- Use `--space-section` for major vertical spacing.
- Use `--space-section-padding-y` for major section top and bottom padding.
- Use `--space-page-x` and `--space-page-x-desktop` for reading-column horizontal padding.
- Use semantic rhythm tokens before primitive spacing tokens inside narrative sections.

## Radius

Primary groups:

- `--radius-none`
- `--radius-xs`
- `--radius-sm`
- `--radius-md`
- `--radius-lg`
- `--radius-pill`

Rules:

- Use `--radius-pill` for tabs, segmented controls, and small badges.
- Use `--radius-md` for cards, figures, and callouts.
- Use `--radius-lg` for large panels.
- Use `--radius-none` for strict editorial rows and sidebar items.

## Borders

Primary groups:

- `--border-width`
- `--border-soft`
- `--border-default`
- `--border-frame`
- `--border-sidebar`
- `--border-emphasis`
- `--border-callout`

Rules:

- Use `--border-soft` for internal dividers.
- Use `--border-frame` for screenshots and image frames.
- Use `--border-emphasis` for annotation rectangles only.
- Avoid dark borders unless the component is intentionally high contrast.

## Shadows

Primary groups:

- `--shadow-control`
- `--shadow-card`
- `--shadow-floating`
- `--shadow-showcase`
- `--shadow-active-indicator`

Rules:

- Most editorial content should remain flat.
- Use `--shadow-control` for active tabs and small floating controls.
- Use `--shadow-card` for cards that need slight separation.
- Use `--shadow-showcase` for portfolio display modules that need artifact depth.
- Use modal-strength shadows only for overlays.

## Layout

Primary groups:

- `--container-main`
- `--container-content`
- `--container-section-body`
- `--container-showcase`
- `--container-artifact`
- `--sidebar-width`
- `--hero-media-width`

Rules:

- `--container-main` defines the main case study content column.
- `--container-section-body` defines the canonical width for all non-hero case-study body sections, including prose, figures, galleries, evidence blocks, metadata, reflection, and project-menu content.
- Except for the hero, case-study content should stay within `--container-section-body`.
- `--container-showcase` is a legacy/special-component token. Do not use it for ordinary case-study body sections or source figure galleries unless the Design System explicitly introduces a named component that requires it.
- `--sidebar-width` must stay in sync with content offsets and hero media width.
- Use `--container-artifact` only inside a named component whose implementation already defines that behavior. Do not use it as a local escape hatch for wider body content.
