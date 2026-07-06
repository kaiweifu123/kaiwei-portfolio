# Components

Reusable components own their visual language. Consumers compose components; consumers should not restyle components.

## Component Source

Primary implementation lives in:

- `src/components/ui/`

## SectionShell

Use for every major phase section. It owns:

- section id
- `data-phase-id`
- section background state
- section category / signal label
- section title
- main content column
- main content container width and padding

Do not place unrelated layout behavior inside `SectionShell`.

### Section Label And Title Semantics

Section headers use two different text roles:

- `case-section-label` is the presentation/category label. It tells readers what kind of material they are entering, such as `Research`, `Design`, `Testing`, or `Reflection`.
- `case-heading` is the narrative title. It should say what happens in that section, what changed, or what the reader should understand next.

Rules:

- Do not repeat the same phrase in both roles.
- Do not use the category label as the title unless the source has no section story and the user explicitly wants a skeletal outline.
- If the source heading is generic, create a concise narrative title from the section's own content instead of duplicating the label.
- Keep navigation labels short and categorical; keep section titles more descriptive.

Examples:

- Label: `Research`; Title: `Tracing wait-time friction from reviews to restaurant operations`
- Label: `Design`; Title: `Turning menu assistance into self-service ordering`
- Label: `Testing`; Title: `Testing whether the digital menu reduced staff dependency`
- Label: `Reflection`; Title: `What small restaurants reveal about practical product adoption`

## EditorialHeader

Use for the case study top chrome: project type, brand lockup, year, and case badge.

Implementation:

- `src/components/ui/EditorialHeader.tsx`

It owns:

- top sticky page header structure
- left metadata label
- centered brand / project lockup
- right year and badge action

Rules:

- Use once per case study page.
- Keep it visually quiet and system-level.
- Do not use it as a section header.
- Do not pass or render major section links inside this component. Use `CaseStudyTopNav` directly below it.
- Do not duplicate its layout inside page content.
- It should stay independent from major narrative section rhythm.

## CaseStudyTopNav

Use for the horizontal sticky section navigation directly under the editorial header.

Implementation:

- `src/components/ui/CaseStudyTopNav.tsx`

It owns:

- major section labels
- active section state
- click-to-scroll section navigation
- sticky navigation behavior when composed at the page level
- scroll-direction chrome behavior with `EditorialHeader`

Rules:

- Place `CaseStudyTopNav` immediately after `EditorialHeader` and before the page hero/content. It is top chrome, not a hero-section child.
- Include only major narrative sections, such as Overview, Research, Opportunity, Design, Iteration, Result.
- Do not include small subsections.
- Do not replace section headers; it is navigation, not content hierarchy.
- Keep labels short and consistent with `SectionShell` categories.
- Active state should use the system navigation active role and primary color.
- Nav labels should be horizontally centered on desktop.
- On downward scroll, the top `EditorialHeader` collapses and `CaseStudyTopNav` sticks to the top edge.
- On upward scroll, `EditorialHeader` expands and `CaseStudyTopNav` sticks directly underneath it.
- Do not reimplement this behavior locally in page files. Use the component and shared `.editorial-header`, `.case-study-top-nav`, and `case-study-chrome-collapsed` styles.

## SectionHeader

Legacy standalone header primitive. Standard case study pages should prefer `SectionShell`, which owns the section header layout.

Use `SectionHeader` only for isolated design-system examples or non-standard pages.

Do not use hero-scale typography inside section headers.

## FigureFrame

Use for static screenshots or research images.

Current supported modes:

- default framed figure
- raw image by passing an empty `frameClassName`
- custom caption through `caption`

Use the raw mode when the source artifact already carries its own white field, crop, or composition and an added border/shadow would make it look like a card. Common examples include testimonial illustrations, full-bleed source diagrams, and assets that were designed to sit directly on the page.

Future improvement: replace broad `frameClassName` overrides with named variants.

## Card

Use for bounded repeated content blocks.

Current implementation is intentionally thin. It preserves existing visual styles while allowing semantic grouping.

Future improvement: introduce variants such as `mini`, `content`, and `comparison`.

For small coded illustrations inside cards, use the system primary color for labels, icons, strokes, and simple dividers by default. Introduce a separate accent only when the visual has a clear semantic role such as success, warning, or error.

## Callout

Use for emphasized narrative moments:

- quote
- feedback
- judgment

Implementation:

- `src/components/ui/Callout.tsx`
- `variant="quote"` maps to `case-callout-quote`
- `variant="card"` maps to `case-callout-card`

Quote callouts own the left emphasis rule and quote inset spacing.

Current implementation is intentionally thin. Future work should introduce semantic variants instead of raw class strings.

## MetaGrid

Use for project metadata or comparable fact groups.

Do not use for ordinary card grids.

Implementation:

- `src/components/ui/MetaGrid.tsx`

Primary use:

- Overview project metadata
- Four-column case study facts
- Common labels such as My Role, Platform, Team, and Timeline

It owns:

- responsive metadata grid layout
- left divider for each metadata column
- label typography via `case-label`
- value typography via `case-body-copy`
- compact text stacking via `--space-text-stack`

Rules:

- Use in Overview or comparable summary moments.
- Do not use for narrative cards, research method cards, or metric cards.
- Keep labels short and factual.
- Use values as short stacked lines rather than long paragraphs.

## CaseStudyDisplay

Use `src/components/ui/CaseStudyDisplay.tsx` for reusable case-study display modules that carry more visual weight than prose:

- `ContextMediaExtension`
- `ResearchMethodCards`
- `ResearchSummaryPanel`
- `CaseStudyCardGrid`
- `PainPointDecisionMatrix`
- `SuccessCriteriaPanel`
- `ConceptDirectionToggle`
- `ReviewerQuoteCard`
- `VideoShowcase`

Rules:

- Prefer these components before building one-off card grids inside a page file.
- Keep visual values tied to existing semantic text, border, surface, spacing, and shadow tokens.
- Use `ContextMediaExtension` inside `SectionShell`; it extends the Context Pattern and does not replace section layout.
- Use `ResearchMethodCards` inside Research Pattern sections before `PainPointDecisionMatrix` when a case needs to show how research was gathered.
- Use `ResearchSummaryPanel` when research should read as one consolidated portfolio artifact.
- These modules can feel more like portfolio artifacts than ordinary body copy, but they should remain restrained and document-like.

## PillTabs

Use for switching among content categories or steps within a section.

Rules:

- Keep active state as a white pill with subtle shadow.
- Keep tab-to-content spacing stable.
- Do not use for binary before/after mode; use `SegmentedToggle`.

## SegmentedToggle

Use for mutually exclusive view modes such as before/after.

Rules:

- Active state may carry semantic mode color.
- Inactive state should remain transparent and low contrast.
- Keep `aria-pressed`.

## ImageCarousel

Use when a section has multiple related screenshots.

Rules:

- Do not show controls for a single image.
- Use `FigureFrame` instead for a single static image.
- Keep controls quiet and secondary.

## SplitNarrativeIntro

Use when a section needs an editorial two-column opening: a left-side signal label and a right-side serif narrative block.

Rules:

- Use only for nested narrative turns that need a local left/right frame inside the main content.
- Standard section-level category/title layout belongs to `SectionShell`.
- Preserve section rhythm tokens.
- Do not use this for ordinary card grids or product screenshots.
