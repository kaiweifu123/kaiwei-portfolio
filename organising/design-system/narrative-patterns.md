# Narrative Patterns

The portfolio should reuse narrative structures. Pages should be assembled from patterns instead of built from scratch.

## Registered Patterns

- Hero
- Context
- Research
- Opportunity
- SectionShell centered section frame
- SplitNarrativeIntro for nested editorial turns only
- Insight
- Figure
- Comparison
- Timeline
- Decision
- Learning
- Quote
- Gallery
- Result

## Pattern Ownership

Each pattern owns:

- Structure
- Spacing
- Section surface rhythm
- Typography hierarchy
- Figure placement
- Caption behavior

Pages should compose patterns. Pages should not invent new layouts.

## Hero Pattern

Use for the opening screen of a case study.

The hero is a narrative pattern, not necessarily a reusable component. It defines how the first viewport introduces the project before the reader enters the long-form case study.

### Structure

The default hero uses a left/right composition:

- Left side: project framing and case study promise.
- Right side: primary product, interface, or visual artifact.

This is a full-width split first-screen band, not a centered content island. On desktop, the hero grid should span the full page width below the top chrome and fill the remaining visible viewport:

```css
.hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  min-height: calc(100dvh - var(--editorial-header-height) - var(--case-study-top-nav-height, 44px));
}
```

The two hero panels each occupy roughly half of the viewport width. Do not wrap the entire hero in a narrow `max-width` container.

### Left Column Content

The left side should carry the reading hierarchy:

- one hero headline written as the project promise or project identity
- one inline primary-color emphasis phrase inside the headline when it sharpens the case promise
- one short italic subtitle that explains what the project does or why it mattered
- two to three compact metadata chips, such as year, domain, product type, or project mode

### Left Column Typography

Use hero-specific semantic tokens instead of local values:

- Headline family: `--font-hero-display-family`
- Headline size: `--font-hero-display-size`
- Headline line-height: `--line-height-hero-display`
- Headline tracking: `--tracking-hero-display`
- Headline color: `--text-hero-display`
- Inline emphasis color: `--color-primary`
- Subtitle family: `--font-hero-subtitle-family`
- Subtitle size: `--font-hero-subtitle-size`
- Subtitle line-height: `--line-height-hero-subtitle`
- Subtitle tracking: `--tracking-hero-subtitle`
- Subtitle color: `--text-primary`
- Chip family: `--font-chip-family`
- Chip size: `--font-chip-size`
- Chip tracking: `--tracking-chip`
- Chip text color: `--text-secondary`
- Chip background: `--surface-section`
- Chip border: `--border-soft-color`
- Chip radius: `--radius-pill`

Current implementation classes:

- `font-hero-display`
- `font-hero-subtitle`
- `font-chip`

### Left Column Spacing

Use a compact vertical stack:

- Headline to subtitle: `--space-2xl`
- Subtitle to chips: `--space-2xl`
- Chip horizontal and vertical gap: `--space-sm`
- Chip padding: `--space-xs` vertical and `--space-md` horizontal

The left column may use centered alignment when the hero has a strong editorial/display feel. If the project needs a more operational or dashboard-like reading mode, left alignment can be used, but the same hierarchy and tokens still apply.

When centered, center the left stack inside the hero viewport that remains after top chrome, not inside the full browser viewport. Do not use local optical hacks such as `transform: translateY(...)` to compensate for the editorial header or section navigation.

Default desktop anatomy:

```css
.hero-copy-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100dvh - var(--editorial-header-height) - var(--case-study-top-nav-height, 44px));
  padding: var(--space-6xl) var(--space-page-x-desktop);
}

.hero-copy-inner {
  width: 100%;
  max-width: 640px;
  text-align: center;
}
```

### Right Column Visual

The right side should carry the visual proof:

- actual product interface
- product workflow
- demo artifact
- case-specific visual system
- image or video that reveals the product rather than decorating the page

### Right Column Layout

The right column should:

- occupy roughly half of the hero on desktop
- preserve stable responsive dimensions
- use real product or project visuals
- avoid decorative cards around 3D, video, or full-bleed interface media unless the artifact requires framing
- crop intentionally with `object-cover` when the visual is immersive
- use `object-contain` when the user needs to inspect the full artifact

Default desktop anatomy:

```css
.hero-artifact-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100dvh - var(--editorial-header-height) - var(--case-study-top-nav-height, 44px));
  padding: var(--space-4xl) 0;
  border-left: var(--border-soft);
  background: var(--surface-base);
  overflow: hidden;
}

.hero-artifact {
  width: min(100%, 760px);
  border: 0;
  border-radius: 0;
  background: var(--surface-base);
  box-shadow: none;
  overflow: hidden;
}

.hero-artifact img {
  width: 100%;
  max-height: min(76vh, 780px);
  object-fit: contain;
}
```

### Hero Band Height

When `EditorialHeader` and `CaseStudyTopNav` sit above the hero, the hero should start directly below that chrome and fill the remaining first screen:

```css
min-height: calc(100dvh - var(--editorial-header-height) - var(--case-study-top-nav-height, 44px));
```

The hero top edge should touch the bottom edge of `CaseStudyTopNav` with no visual gap. Left and right hero content should be centered within the hero band.

The Overview section should begin after the first screen. Do not fake the alignment by translating the hero content up or down.

### Rules

- Do not treat the hero as a marketing landing page unless the case study explicitly needs that.
- Do not create a centered `max-width` hero grid floating inside a large blank first screen. The hero itself should be a full-width split band.
- Do not use generic illustration, decorative gradients, or abstract atmosphere when a product artifact is available.
- Do not bury the project identity in tiny nav text; the project should be immediately legible in the first viewport.
- The hero should fill the first screen below the top chrome while keeping the next section immediately after it, so the page still reads as a case study rather than a disconnected splash screen.
- The visual side should support the case study argument, not compete with the text hierarchy.
- Hero typography can use display scale, but it must remain connected to the token system.
- The hero can be implemented with a local layout when the case is unique, but recurring visual language still comes from tokens and semantic roles.
- The hero should sit directly below `EditorialHeader` and `CaseStudyTopNav`, then center content within the opening band.
- Do not put a repeated section eyebrow above the hero headline. The editorial header already carries case-study type.
- Do not use long context lists, metadata tables, or card stacks in the left hero column. Move that material into the Introduction or Overview section.
- The default left hero stack should match this rhythm: headline, italic subtitle, compact chips.

### When To Componentize

Only turn the Hero Pattern into a reusable component after two or more case studies share the same structure.

Until then, document the pattern here and keep implementation-specific layout in the page.

## Example Page Composition

LaunchPad:

```text
Hero Pattern
↓
Overview Pattern
↓
Research Pattern
↓
Opportunity Pattern
↓
First Demo Pattern
↓
Design Pattern
↓
Iteration Pattern
↓
Result Pattern
```

## Pattern Rules

- Use `SectionShell` for every major phase section.
- Use nested patterns only when the content has a meaningful narrative turn.
- Do not create nested chapters inside a major section unless the narrative requires it.
- Figures, cards, quotes, and comparison modules should inherit the parent section surface rhythm.
- Subsections should not alternate background surfaces independently.
