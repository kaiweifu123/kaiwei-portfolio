# Design Primitive Specification

This document records the current design language behind the shared UI primitives in the `organising` working copy. It is a specification baseline only; it does not introduce tokens or implementation changes yet.

## System Direction

The current case study UI is editorial, restrained, and document-like. It uses a narrow reading column for narrative sections, warm off-white surfaces for case study artifacts, small mono labels for structure, and quiet borders for separation.

Recommended direction for token work:

- Keep the page feeling like a high-quality UX case study, not an app dashboard.
- Prefer low-contrast warm neutrals, sage accents, and muted brown emphasis.
- Use section structure, spacing, and typography hierarchy before decorative surfaces.
- Standardize primitives gradually without flattening the storytelling differences between phases.

## SectionShell

**Purpose**

Provides the outer shell for each major phase section. It owns the section anchor, phase metadata attribute, focused background state, shared header, and inner content container.

**Where It's Used**

- Generated phase sections in `ContentArea.tsx` for `PH-01` through `PH-06`.
- Anchors currently map to:
  - `#research-1`
  - `#research-2`
  - `#design-1`
  - `#design-2`
  - `#iteration-1`
  - `#iteration-2`

**Variants**

- Default white background.
- Focused state uses `bg-neutral-50/40`.
- `PH-05` forces white background to preserve its internal custom section surfaces.

**Current Visual Characteristics**

- Full-width section.
- Relative positioning.
- Background transition: `transition-colors duration-300`.
- Inner content max width: `1200px`.
- Horizontal padding: `24px` mobile, `48px` desktop.
- Top content padding: `24px`.
- Bottom content padding: `32px` mobile, `48px` desktop.
- Inner layout uses a two-column grid at large breakpoint: section category / signal on the left, main title and content on the right.

**Recommended Unified Visual Language**

- Keep `SectionShell` as the canonical major-page section primitive.
- Treat it as structural rather than decorative.
- Use a single section background token for default sections.
- Use focused state only if the sidebar or phase navigation needs scroll feedback.
- Keep special phase-specific art direction inside children, not in `SectionShell`.

**Typography**

- Standard section title and category typography are owned by `SectionShell`.

**Spacing**

- Section header, left category column, and body spacing should be controlled by `SectionShell`.
- Recommended token direction:
  - `section.content.maxWidth`: `1200px`
  - `section.body.maxWidth`: `720px`
  - `section.padding.x.mobile`: `24px`
  - `section.padding.x.desktop`: `48px`
  - `section.body.paddingTop`: `24px`
  - `section.body.paddingBottom`: `48px`
  - `section.body.elementGap`: `16px`
  - `section.text.stackGap`: `8px`
  - `section.aside.width`: `240px`

**Radius**

- None.

**Borders**

- None on the shell.
- Header owns the divider.

**Background Treatment**

- Default white.
- Focused state is very subtle neutral tint.
- `PH-05` is handled as a special child layout.

**Interaction States**

- Scroll-focus visual state through `isFocused`.
- No direct pointer interaction.

**Remaining Inconsistencies**

- `PH-05` is visually a page-within-page and still owns its own section spacing.
- Some child sections create their own full-width surfaces, while others rely on the default reading column.
- The `lg:grid-cols-3` wrapper is not always semantically needed because many sections use `lg:col-span-3`.

## SectionHeader

**Purpose**

Standard header for major phase sections. It gives each phase an eyebrow/category, title, system ID, and chapter label.

**Where It's Used**

- Inside `SectionShell` for all generated phase sections.

**Variants**

- No formal variants.
- Content changes based on first section vs later sections:
  - First section chapter label: `STARTING CHAPTER`
  - Others: `CORE CHAPTER PARTITION`

**Current Visual Characteristics**

- Container max width: `1200px`.
- Horizontal padding: `24px` mobile, `48px` desktop.
- Top padding: `48px`.
- Bottom padding: `12px`.
- Bottom border: `border-neutral-100`.
- Eyebrow row includes `Compass` icon.
- Eyebrow text:
  - mono
  - `12px`
  - uppercase
  - `0.2em` tracking
  - neutral gray
- Title:
  - sans
  - `24px`
  - `600`
  - tight line height `1.15`
  - `var(--color-brutal-dark)`
- Metadata row:
  - `sysId` in mono `12px`
  - chapter label in mono `10px`

**Recommended Unified Visual Language**

- Use this as the only major section heading pattern.
- Keep heading size around `22-24px` for case-study phase headers.
- Use icon sparingly; if every section has the same icon, consider whether the icon is structural or decorative.
- Keep metadata secondary and low-contrast.

**Typography**

- Eyebrow: mono, 10-12px, uppercase, letter-spaced.
- H2: sans, 22-24px, medium/semi-bold.
- Meta: mono, 10-12px.

**Spacing**

- Eyebrow to title: currently controlled by eyebrow margin and title margin.
- Header bottom to section body: `24px` via `SectionShell`.
- Recommended: keep header compact; avoid oversized hero-style spacing inside phase sections.

**Radius**

- None.

**Borders**

- Bottom divider only.
- Recommended divider color: soft neutral, no more than `0.5-1px` visual weight.

**Background Treatment**

- Transparent over section background.

**Interaction States**

- None.

**Remaining Inconsistencies**

- The opening hero/context section does not use this pattern and intentionally has a different hierarchy.
- Internal subsections in `PH-05` use similar labels but are not represented by this component yet.

## SplitNarrativeIntro

**Purpose**

Creates a two-column editorial opening inside a section. The left column carries a short signal label, while the right column carries a serif title, optional quote, and body copy.

**Where It's Used**

- `PH-05` user feedback / market signal opening.

**Current Visual Characteristics**

- Two-column desktop layout.
- Single-column mobile layout.
- Left column uses uppercase label styling with red primary emphasis on the first line and faint secondary signal text below.
- Right title uses the case heading serif family.
- Quote uses the quote family, italic style, and the callout left rule.

**Spacing**

- Internal element gap: `--space-section-body-element` (`16px`).
- Quote padding uses text/callout tokens.
- It sits inside `SectionShell`, so header-to-body spacing remains `--space-section-header-body` (`24px`).

**Usage Rules**

- Use only inside a section when a nested narrative turn needs its own local left/right framing. Standard section-level category/title layout belongs to `SectionShell`.
- Do not use for ordinary content blocks, metrics, or screenshot panels.

## FigureFrame

**Purpose**

Displays a single image with optional wrapper, frame, image class overrides, and optional caption.

**Where It's Used**

- Context workflow image.
- `PH-01` workshop board image with caption.
- `PH-04` Brand surface screenshots.
- `PH-05` research image.

**Variants**

- Default framed image.
- Raw image mode when `frameClassName` is empty.
- Captioned frame.
- Rounded soft surface frame for product screenshots.

**Current Visual Characteristics**

- Default frame:
  - `overflow-hidden`
  - `border border-neutral-200`
  - `bg-white`
- Default image:
  - block
  - full width
- Variant overrides introduce:
  - rounded corners
  - warm gray background
  - no border
  - hover scale in the workshop image
  - caption row with mono metadata

**Recommended Unified Visual Language**

- Use `FigureFrame` for all static screenshot/image presentation.
- Define clear variants:
  - `plain`: no border, image only.
  - `screenshot`: subtle border, white or warm surface, 8-12px radius.
  - `artifact`: allows caption and light shadow.
  - `fullBleed`: no horizontal padding, used only in hero-like image regions.
- Avoid each call site redefining full frame styles once tokens exist.

**Typography**

- Captions should use mono or small sans, 10-12px.
- Captions should remain secondary and not compete with section copy.

**Spacing**

- Image top margins currently controlled externally.
- Recommended:
  - figure top margin after paragraph: `24-32px`.
  - caption padding: `8-12px`.

**Radius**

- Current defaults do not include radius.
- Variants use `rounded`, `rounded-lg`.
- Recommended:
  - screenshot radius: `8px`.
  - large artifact radius: `12px`.
  - raw research imagery can remain unradiused if it is already designed as a full composition.

**Borders**

- Default neutral border.
- Some variants intentionally remove borders.
- Recommended: screenshot frames use `#DDD6CE` or neutral equivalent at 1px; raw editorial images use no border.

**Background Treatment**

- Default white.
- Screenshot variants may use warm neutral surface behind images.

**Interaction States**

- Mostly static.
- Workshop image currently has hover scale through custom override.

**Remaining Inconsistencies**

- Borders, radius, padding, and backgrounds vary by call site.
- Caption treatment exists only for the workshop board.
- `frameClassName=""` is an implicit raw mode; this should become an explicit variant later.

## Card

**Purpose**

Thin wrapper for repeated bounded content blocks while preserving existing local classes.

**Where It's Used**

- `PH-01` strategy board mini cards.
- `PH-02` infrastructure capability cards.
- `PH-02` customer comparison cards.

**Variants**

- Mini dense card.
- Capability card.
- Customer comparison card.

**Current Visual Characteristics**

- `Card` itself has no default visual style.
- All visuals are passed through `className`.
- Current card treatments include:
  - white background
  - subtle neutral border
  - 6-8px radius
  - occasional light shadow
  - compact padding between `8px` and `20px`

**Recommended Unified Visual Language**

- Keep `Card` as a semantic container, but introduce variants only when repetition is stable.
- Recommended variants:
  - `mini`: dense, small text, used for supporting evidence.
  - `content`: standard white card with subtle border.
  - `comparison`: larger explanatory card.
- Do not use cards for page sections or large decorative wrappers.

**Typography**

- Mini card:
  - label 8-10px mono.
  - body 9-11px.
- Content card:
  - label 10px mono.
  - title 13-18px depending on hierarchy.
  - body 11-16px depending on section.

**Spacing**

- Mini cards: `8px` padding.
- Standard cards: `16-20px` padding.
- Gap between repeated cards: `8-16px`.

**Radius**

- Current range: `6-8px`.
- Recommended default: `8px`.

**Borders**

- Subtle neutral border.
- Avoid high-contrast borders unless the card is selected or actionable.

**Background Treatment**

- White or warm near-white.
- Avoid nested card-on-card unless it represents real content hierarchy.

**Interaction States**

- Current cards are mostly static.
- If interactive cards are introduced later, use hover only when clickable.

**Remaining Inconsistencies**

- `Card` is still a pass-through wrapper and does not enforce a visual system.
- Several non-Card divs elsewhere behave visually like cards but are semantically custom and should be reviewed before consolidation.

## Callout

**Purpose**

Displays emphasized narrative content such as quotes, stakeholder feedback, or design judgment.

**Where It's Used**

- Generic phase quote callout.
- `PH-03` stakeholder feedback.
- `PH-05` final design judgment statement.

**Variants**

- Quote callout.
- Feedback callout.
- Judgment callout.

**Current Visual Characteristics**

- `Callout` itself has no default visual style.
- Visuals are passed through `className`.
- Current treatments include:
  - left border emphasis.
  - neutral light background.
  - warm blush background.
  - serif italic text for quotes/judgment.
  - bordered neutral feedback panel.

**Recommended Unified Visual Language**

- Define semantic variants:
  - `quote`: serif italic, low-contrast surface, left border.
  - `feedback`: neutral surface, small label, body text.
  - `judgment`: warm blush surface, stronger left accent, used for key takeaway.
- Keep callouts compact and editorial; avoid oversized PPT-style blocks.

**Typography**

- Quote/judgment:
  - serif italic.
  - 13-16px depending on context.
  - line height around `1.7`.
- Feedback:
  - label mono 10-12px uppercase.
  - body sans or serif matching section context.

**Spacing**

- Current padding varies from `8px 24px` to `24px 28px`.
- Recommended:
  - compact quote: `8px 20-24px`.
  - content callout: `20-24px`.
  - judgment callout: `24px 28px`.

**Radius**

- Current range: none, rounded right, rounded-lg.
- Recommended:
  - quote with left border can use `0-4px`.
  - larger callout uses `8px`.

**Borders**

- Use one meaningful border direction where possible.
- Avoid full border plus strong background unless the callout needs containment.

**Background Treatment**

- Neutral or warm low-saturation surfaces.
- Judgment uses muted blush.

**Interaction States**

- None.

**Remaining Inconsistencies**

- Some callouts are typographic emphasis, others are content cards.
- Variant semantics are not encoded yet.

## MetaGrid

**Purpose**

Presents project metadata in a 4-column grid.

**Where It's Used**

- Opening context section, below the "At a glance" copy.

**Variants**

- No formal variants.

**Current Visual Characteristics**

- Mobile: 1 column.
- Desktop: 4 columns.
- Each item has a left border and `24px` left padding.
- Minimum desktop item height: `132px`.
- Label:
  - `12px`
  - normal weight
  - neutral gray
- Values:
  - `16px`
  - normal weight
  - line height `1.7`
  - neutral gray
  - vertical gap `8px`.

**Recommended Unified Visual Language**

- Use this as the canonical project facts grid.
- Labels should be visually distinct but not overly decorative.
- Keep dividers vertical and lightweight.
- Consider a slightly smaller value size if aligning with the rest of the case-study body scale.

**Typography**

- Label: mono or small sans, 10-12px, uppercase if the visual language moves toward stronger editorial labels.
- Values: sans, 14-16px, regular.

**Spacing**

- Column gap currently implicit through grid and left padding.
- Recommended:
  - left padding after divider: `20-24px`.
  - item min height only if needed for consistent rhythm.
  - vertical mobile gap: `24-32px`.

**Radius**

- None.

**Borders**

- Left border per item.
- Recommended divider color: low-contrast neutral.

**Background Treatment**

- Transparent over page background.

**Interaction States**

- None.

**Remaining Inconsistencies**

- The reference style uses stronger vertical dividers and bold labels, while current implementation is softer.
- It is currently only used once, so future reuse should validate whether this primitive remains specific to the opening summary.

## PillTabs

**Purpose**

Horizontal pill navigation for switching between steps, architecture tabs, and redesign walkthrough tabs.

**Where It's Used**

- `PH-06` redesign flow tabs.
- `PH-03` demo step walkthrough tabs.
- `PH-04` product architecture tabs.

**Variants**

- Default pill tabs.
- Demo tabs with larger mono number.
- Architecture tabs with text-left button override.
- PH06 tabs with warmer inactive hover color.

**Current Visual Characteristics**

- Container:
  - flex
  - wrap
  - `8px` gap by default.
- Button:
  - rounded full.
  - horizontal padding `12px`.
  - vertical padding `6px`.
  - `12px` text.
  - medium weight by default.
- Active:
  - white background.
  - dark text.
  - subtle shadow.
- Inactive:
  - muted warm gray.
  - hover darkens text.
- Number:
  - mono.
  - default `10px`.
  - active sage.
  - inactive muted gray.

**Recommended Unified Visual Language**

- Use as the canonical tab primitive for content switching inside sections.
- Keep active state as a white pill on a warm section surface.
- Avoid borders on inactive tabs.
- Keep tab content distance at `16px` where the tabs directly control a panel.
- Use stable min-height or reserved content space to avoid layout jumps when tab content changes.

**Typography**

- Tab number: mono, 10-12px.
- Tab label: sans, 12-13px, regular/medium.
- Avoid all-caps tab labels unless they are technical labels.

**Spacing**

- Button padding: `6px 12px`.
- Internal gap between number and label: `8px`.
- Gap between tabs: `8px`.
- Gap below tabs to content: target `16px`.

**Radius**

- Full pill.

**Borders**

- None by default.
- Active state relies on white surface and shadow.

**Background Treatment**

- Active pill: white.
- Parent section should provide the soft warm background where needed.

**Interaction States**

- Active.
- Inactive.
- Hover on inactive.
- No explicit focus-visible style yet.

**Remaining Inconsistencies**

- Some call sites override font weight and number size.
- Container margins differ by section.
- Focus-visible state should be added when tokenizing interactions.

## SegmentedToggle

**Purpose**

Two-option segmented control for switching the `PH-06` comparison between before and after states.

**Where It's Used**

- `SelectProductsComparison` before/after control.

**Variants**

- Current options:
  - Before active: warm brown accent.
  - After active: muted blue accent.
- No other variants yet.

**Current Visual Characteristics**

- Outer container:
  - rounded full.
  - warm off-white background `#F8F4EF`.
  - `4px` padding.
- Button:
  - height `32px`.
  - rounded full.
  - border.
  - horizontal padding `12px`.
  - mono `10px`.
  - bold.
  - uppercase.
  - letter spacing `0.08em`.
- Inactive:
  - transparent border/background.
  - muted warm gray.
  - hover darkens.
- Active before:
  - `#fff7ef` background.
  - `#b98965` border.
  - `#7c4a2f` text.
- Active after:
  - `#eef7fb` background.
  - `#6f91a8` border.
  - `#315d73` text.

**Recommended Unified Visual Language**

- Keep this separate from `PillTabs`; it changes mode rather than navigating content categories.
- Use only for mutually exclusive binary or small-set modes.
- Use restrained color to make active state legible without feeling like a primary CTA.

**Typography**

- Mono, 10px, uppercase, bold.
- Keep label short.

**Spacing**

- Outer padding: `4px`.
- Button height: `32px`.
- Button horizontal padding: `12px`.

**Radius**

- Full pill.

**Borders**

- Active buttons use a visible 1px border.
- Inactive buttons use transparent border to avoid layout shift.

**Background Treatment**

- Outer group uses warm off-white.
- Active states use lightly tinted surfaces.

**Interaction States**

- Active.
- Inactive.
- Hover inactive.
- `aria-pressed` is set.
- No explicit focus-visible style yet.

**Remaining Inconsistencies**

- Active color rules are passed per option, so future mode toggles may drift unless tokenized.
- Only tested as two options, though component supports more.

## ImageCarousel

**Purpose**

Displays one or more images with previous/next controls and dot navigation when multiple images exist.

**Where It's Used**

- `PH-03` demo step image walkthrough.
- `PH-04` architecture image carousel.

**Variants**

- Default bordered, padded image frame.
- Architecture variant with rounded warm image surface and no internal padding.
- Custom dot spacing in architecture section.

**Current Visual Characteristics**

- Outer:
  - centered.
  - full width.
  - `92%` desktop width.
- Default frame:
  - relative.
  - overflow hidden.
  - border `#d8d1c8`.
  - white background.
  - padding `16px`.
- Image:
  - full width.
  - object contain.
- Navigation buttons:
  - absolute vertical center.
  - 36px circle.
  - border black at 10% opacity.
  - white 85% opacity.
  - subtle shadow.
  - hover to white.
- Dots:
  - inactive `6px` circle.
  - active `24px` pill.
  - sage active color.

**Recommended Unified Visual Language**

- Use for image sets where sequence or comparison matters.
- Use `FigureFrame` for single static images.
- Define frame variants:
  - `screenshot`: border, white, 16px padding.
  - `surface`: warm background, rounded, no padding.
- Keep controls quiet and only visible when multiple images exist.

**Typography**

- None.

**Spacing**

- Frame padding default: `16px`.
- Dot gap: `8px`.
- Dot top margin: `8-12px`.
- Recommended outer margin controlled by parent section, not carousel.

**Radius**

- Default frame currently has no radius.
- Architecture variant uses `8px`.
- Recommended default screenshot frame radius: `8px`.

**Borders**

- Default border: warm neutral.
- Architecture variant relies on background rather than border.

**Background Treatment**

- White for default screenshot frame.
- Warm neutral for designed screenshot surface.

**Interaction States**

- Previous and next buttons.
- Dot buttons.
- Hover on navigation buttons.
- No keyboard shortcut handling.
- No explicit focus-visible style yet.

**Remaining Inconsistencies**

- Default frame has no radius, while architecture variant does.
- Navigation button styling is fixed and not tokenized.
- Active dot color is hardcoded.

## Cross-Primitive Issues To Resolve During Tokenization

1. **Hardcoded colors**
   - Many primitives and call sites still use direct hex values such as `#FBF9F5`, `#9A8878`, `#DDD6CE`, `#F5EDEB`, and `#E8F0EB`.
   - These should become semantic tokens before broad visual changes.

2. **Class override surface area**
   - `Card`, `Callout`, `FigureFrame`, `PillTabs`, and `ImageCarousel` rely heavily on `className` overrides.
   - This was useful for preserving visuals during refactor, but token work should narrow the allowed variants.

3. **Typography scale drift**
   - Common sizes include 10, 11, 12, 13, 16, 22, 24, and 40px.
   - The 40px PH06 internal title is intentionally more prominent but may need a named storytelling-display token.

4. **Spacing drift**
   - Section-level spacing is mostly stable, but internal artifacts use many local margins.
   - Common values to standardize first: 8, 12, 16, 20, 24, 32, 48px.

5. **Radius drift**
   - Current radius values include none, small, `rounded`, `rounded-md`, `rounded-lg`, `rounded-xl`, and full pill.
   - Recommended token set: `4px`, `8px`, `12px`, and full pill.

6. **Border language**
   - Borders range from neutral gray to warm tan and accent colors.
   - Need semantic border tokens:
     - divider
     - frame
     - card
     - active mode
     - emphasis

7. **Interaction states**
   - Hover exists for tabs, segmented toggle, carousel controls, and some images.
   - Focus-visible states are not standardized yet.

## Recommended Token Introduction Order

1. Colors
   - Page backgrounds, warm surfaces, sage accents, blush accents, text hierarchy, borders.

2. Typography
   - Eyebrow, section title, block title, body, caption, meta, tab label.

3. Spacing
   - Section padding, content gaps, card padding, tab-to-content gap.

4. Radius and Borders
   - Frame, card, callout, pill.

5. Interaction States
   - Active, inactive, hover, focus-visible.

6. Primitive Variants
   - Replace broad class overrides with named variants after tokens are stable.
