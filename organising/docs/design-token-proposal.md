# Design Token Proposal

This proposal defines a semantic token architecture for the `organising` case study project. It is intentionally implementation-neutral: no code should adopt these tokens until the design rules are approved.

## Token Principles

- Use semantic names that describe role, not color appearance.
- Preserve the current editorial case-study feel.
- Reduce one-off values without flattening section-specific storytelling.
- Keep phase-specific accents possible, but route them through explicit semantic tokens.
- Introduce tokens in layers: color first, then type, spacing, radius/borders, shadows, layout.

## Colour Tokens

### Current Values Found

**Page and surface values**

- `#ffffff`
- `#fcfbfa`
- `#FFFBF5`
- `#FBF9F5`
- `#FAF7F4`
- `#f4f1ea`
- `#f1eee8`
- `#f4f2ec`
- `#F8F4EF`
- `#fffdf9`
- `#fffaf3`
- `#fff7ef`
- `#F5F1ED`
- `#F5EDEB`
- `#eef7fb`

**Text values**

- Near-black: `#0a0a0a`, `#121212`, `#171717`, `#191919`, `#1b1b1b`, `#1d1d1d`, `#202020`
- Primary warm text: `#2f2926`, `#33302D`, `#3F3833`, `#3a3330`, `#3f3a35`, `#443C37`, `#4F4038`
- Secondary/muted: `#525252`, `#5F534A`, `#6B5E56`, `#737373`, `#747474`, `#7A6354`, `#8A7A6D`, `#9A8878`, `#B0A898`, `#C8BFB5`
- Accent text: `#4A7260`, `#4a7060`, `#7A8A85`, `#A05040`, `#C8754D`, `#7c4a2f`, `#315d73`, `#7a6a7e`

**Border and divider values**

- `#dcd7cd`
- `#d7d1c7`
- `#d8d1c8`
- `#DDD6CE`
- `#E8E0D8`
- `#C8BFB5`
- `#C9D8E1`
- Tailwind neutrals: `neutral-100`, `neutral-200`, `neutral-400`

**Accent values**

- Sage/green: `#3a6b5c`, `#4A7260`, `#4a7060`, `#7A8A85`, `#34d399`
- Brown/copper: `#A5643E`, `#a5643e`, `#b98965`, `#C8754D`, `#7c4a2f`
- Blue mode: `#315d73`, `#6f91a8`, `#eef7fb`
- Violet/indigo one-offs: `#6366f1`, `#7a6a7e`

### Recommended Semantic Tokens

| Token | Suggested current value | Purpose |
| --- | ---: | --- |
| `color.surface.page` | `#FAF7F4` | Global warm page background for case study content. |
| `color.surface.base` | `#ffffff` | Default section/card/image base. |
| `color.surface.subtle` | `#FFFBF5` | Soft content section background. |
| `color.surface.panel` | `#FBF9F5` | Tabbed/interactive section background. |
| `color.surface.muted` | `#F5F1ED` | Muted block background, especially reflective blocks. |
| `color.surface.callout` | `#F5EDEB` | Warm blush callout/direction surface. |
| `color.surface.control` | `#F8F4EF` | Segmented toggle and tab control bed. |
| `color.surface.hover` | `#fffdf9` | Subtle hover for change cards and quiet controls. |
| `color.surface.active-warm` | `#fff7ef` | Warm active state for before/change selection. |
| `color.surface.active-cool` | `#eef7fb` | Cool active state for after mode. |
| `color.text.primary` | `#33302D` | Main editorial body/headline text. |
| `color.text.strong` | `#121212` | Highest contrast text, used sparingly. |
| `color.text.secondary` | `#5F534A` | Supporting body and inactive hover text. |
| `color.text.muted` | `#9A8878` | Descriptions, tab inactive labels, subdued copy. |
| `color.text.faint` | `#B0A898` | Meta numbers, captions, low-emphasis labels. |
| `color.text.on-dark` | `#f4f1ea` | Sidebar active text over dark active state. |
| `color.accent.sage` | `#4A7260` | Positive, active tab number, challenge success. |
| `color.accent.sage-muted` | `#7A8A85` | Low-emphasis sage numbering. |
| `color.accent.copper` | `#A5643E` | Annotation, change active, key emphasis. |
| `color.accent.copper-soft` | `#C8754D` | Arrow accents and callout left rule. |
| `color.accent.before` | `#7c4a2f` | Before-mode text. |
| `color.accent.after` | `#315d73` | After-mode text. |
| `color.border.soft` | `#E8E0D8` | Internal dividers. |
| `color.border.default` | `#DDD6CE` | Frames, panels, tabs container. |
| `color.border.subtle` | `#dcd7cd` | Page/sidebar boundary. |
| `color.border.emphasis` | `#A5643E` | Annotation rectangles and active emphasis. |
| `color.border.cool` | `#C9D8E1` | After-state comparison frame. |
| `color.overlay.scrim` | `rgba(0,0,0,0.05)` | Light image comparison overlay. |
| `color.overlay.modal` | `rgba(0,0,0,0.60)` | Modal backdrop only. |

### Why These Should Become Tokens

- The project currently uses several near-identical warm whites. Without tokens, small visual changes require many manual edits.
- Text colors are split between Tailwind neutrals and hardcoded warm grays, causing inconsistent hierarchy.
- Accent colors encode meaning: before/after, annotation, positive/sage, callout. These are semantic and should be stable.
- Border colors are used as structure, not decoration; semantic border tokens will prevent over-dark or mismatched dividers.

### Merge or Remove

- Merge `#FAF7F4`, `#f4f1ea`, and `#f1eee8` into a smaller page/sidebar surface set:
  - Keep `surface.page`.
  - Keep a sidebar-specific surface only if sidebar remains visually distinct.
- Merge `#FBF9F5`, `#FFFBF5`, and `#fffdf9` only if section hierarchy still reads clearly. Recommended: keep all three roles at first because they serve different surfaces.
- Merge near-black values into:
  - `text.strong`
  - `text.primary`
  - `surface.inverse`
- Remove one-off `#6366f1` unless it remains tied to architecture mock metadata.
- Replace `#34d399` from legacy Framer components with the approved sage accent or isolate it as deprecated.

### Risks Before Implementation

- Changing warm whites globally may visibly alter section rhythm.
- Sidebar uses a more brutal black/cream language than the newer case study sections; tokens need to decide whether sidebar is a separate layout system or part of the same editorial system.
- Accent names must describe behavior, not phase number, or future sections will become harder to maintain.
- Some hex values live in legacy/Framer files that may not be active in the visible page; tokenizing those blindly could waste effort.

## Typography Tokens

### Current Values Found

**Fonts**

- Sans: `Inter`
- Mono: `JetBrains Mono`
- Serif: `Playfair Display`

**Font sizes in active components**

- `7px`, `8px`, `9px`, `10px`, `11px`, `12px`, `13px`, `16px`, `22px`, `24px`, `40px`
- Tailwind aliases also appear: `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`

**Common line heights**

- `1`
- `1.1`
- `1.15`
- `1.3`
- `1.4`
- `1.5`
- `1.55`
- `1.7`
- `snug`, `tight`, `relaxed`

**Common weights**

- `300`, `400`, `500`, `600`, `700`
- Most case-study content uses `400` or `500`.

### Recommended Semantic Tokens

| Token | Suggested style | Purpose |
| --- | --- | --- |
| `font.family.body` | `Inter` | Main interface and editorial body text. |
| `font.family.meta` | `JetBrains Mono` | Eyebrows, labels, ids, badges. |
| `font.family.quote` | `Playfair Display` | Quotes and reflective callouts. |
| `type.hero.title` | `36px / 1.1 / 600` | Opening case study title. |
| `type.section.title` | `24px / 1.15 / 600` | Major phase section title. |
| `type.subsection.title` | `22px / 1.3 / 500` | Internal section title such as design judgment. |
| `type.block.title` | `16px / 1.4-1.55 / 500` | Direction cards, challenge blocks. |
| `type.body.md` | `16px / 1.7 / 400` | Main narrative copy. |
| `type.body.sm` | `13px / 1.5-1.6 / 400` | Card body and dense descriptions. |
| `type.caption` | `11px / 1.5 / 400` | Figure caption and helper text. |
| `type.label` | `10px / 1.5 / 500` | Uppercase labels, change labels. |
| `type.meta` | `12px / 1.5 / 400` | Section eyebrows and system ids. |
| `type.tab` | `12px / 1.5 / 400-500` | Pill tab labels. |
| `type.tab.index` | `10px / 1.5 / 400-500` | Tab number/index. |
| `type.annotation.badge` | `10px / 1 / 700` | Walkthrough badges. |
| `type.micro` | `8-9px / snug / 500-600` | Dense mini-card metadata. |

### Why These Should Become Tokens

- Typography is currently consistent in spirit but scattered through arbitrary Tailwind classes.
- Main body copy is reliably `16px / 1.7`; this should become the default editorial reading style.
- Label and tab typography appear repeatedly and need controlled tracking/weight.
- Internal section titles should not drift between 22, 24, and 40 without intentional semantic roles.

### Merge or Remove

- Merge `text-[11px]` and `text-[12px]` where possible:
  - Use `caption` for helper/caption.
  - Use `meta` for labels/section ids.
- Merge `text-[13px]` and `text-sm` into `body.sm` where semantically equivalent.
- Keep `type.hero.title` separate from `type.section.title`.
- Keep `type.micro` for dense mini cards; do not force it into body tokens.
- The `40px` PH06 tab panel title should become either `type.story.title` or be reduced to `section.title` later, but do not merge yet because it affects hierarchy.

### Risks Before Implementation

- Chinese and English typography have different perceived sizes; direct token application may make Chinese sections feel heavier.
- `Playfair Display` is used for narrative tone; replacing it globally would change the case study voice.
- Reducing all labels to one size may make dense artifacts less readable.

## Spacing Tokens

### Current Values Found

Common Tailwind spacing classes:

- `1.5` scale: `6px`
- `2`: `8px`
- `2.5`: `10px`
- `3`: `12px`
- `4`: `16px`
- `5`: `20px`
- `6`: `24px`
- `7`: `28px`
- `8`: `32px`
- `10`: `40px`
- `12`: `48px`
- `16`: `64px`
- `20`: `80px`

Most frequent values:

- `mt-8`, `gap-2`, `mb-1.5`, `p-2.5`, `mt-2`, `px-6`, `mt-5`, `space-y-6`, `gap-4`.

### Recommended Semantic Tokens

| Token | Suggested value | Purpose |
| --- | ---: | --- |
| `space.inline.xs` | `4px` | Tiny inline separation. |
| `space.inline.sm` | `6px` | Badge/internal micro gaps. |
| `space.component.xs` | `8px` | Small element gaps, tab gaps. |
| `space.component.sm` | `12px` | Label-to-title, compact stacks. |
| `space.component.md` | `16px` | Standard component gap, tab-to-content gap. |
| `space.component.lg` | `24px` | Card padding, small section internals. |
| `space.component.xl` | `32px` | Image after copy, content blocks. |
| `space.section.sm` | `40px` | Minor section split. |
| `space.section.md` | `48px` | Standard major section internal spacing. |
| `space.section.lg` | `64px` | Opening/context section spacing. |
| `space.page.x` | `24px` mobile / `48px` desktop | Reading column horizontal padding. |
| `space.sidebar.x` | `24px` | Sidebar item/content horizontal padding. |
| `space.control.y` | `6px` | Pill vertical padding. |
| `space.control.x` | `12px` | Pill horizontal padding. |
| `space.card.sm` | `8px` | Mini cards. |
| `space.card.md` | `16px` | Dense content cards. |
| `space.card.lg` | `20-24px` | Narrative cards/callouts. |

### Why These Should Become Tokens

- The site’s rhythm depends heavily on 24, 32, and 48px spacing.
- Tabs and content panels need a stable `16px` relationship to avoid visual jitter.
- Section and component spacing are currently mixed through local classes, making global rhythm difficult to tune.

### Merge or Remove

- Merge most `10px` values (`p-2.5`) into either `8px` or `12px` unless they are form controls.
- Keep `6px` for pill vertical padding and micro spacing.
- Keep `28px` only for specific callout padding if needed; otherwise merge into 24 or 32.
- Avoid tokenizing every `mt-1`/`mt-2` usage as unique semantics; map them to small stack tokens.

### Risks Before Implementation

- Global spacing normalization can break carefully positioned screenshot annotations.
- PH06 comparison layout uses reserved heights and percentages; avoid broad spacing changes there until image annotations are locked.
- Some spacing values are inherited from modal/form components, not the case study page.

## Border Radius Tokens

### Current Values Found

- `0`
- `2px`
- `3px`
- `4px`
- `6px`
- Tailwind `rounded`
- `rounded-md`
- `rounded-lg`
- `rounded-xl`
- `rounded-full`
- `rounded-r`

### Recommended Semantic Tokens

| Token | Suggested value | Purpose |
| --- | ---: | --- |
| `radius.none` | `0` | Sidebar rows, change rows, strict dividers. |
| `radius.xs` | `4px` | Small badges and annotation labels. |
| `radius.sm` | `6px` | Annotation rectangles. |
| `radius.md` | `8px` | Cards, callouts, screenshot frames. |
| `radius.lg` | `12px` | Large comparison panels. |
| `radius.pill` | `999px` | Tabs, segmented controls, badges. |

### Why These Should Become Tokens

- Rounded values are semantically meaningful: pills for navigation, 8px for cards, 12px for large panels.
- Explicit radius tokens prevent card radius from drifting into overly soft UI.

### Merge or Remove

- Merge `rounded`, `rounded-md`, and many `rounded-lg` usages into `radius.md` unless large panel semantics require `radius.lg`.
- Keep `radius.sm` for annotations because current target rectangles use 6px.
- Keep `radius.none` for sidebar and row interactions.

### Risks Before Implementation

- If `rounded-lg` maps differently than expected in Tailwind, visual shifts may happen during migration.
- Image frames vary between raw editorial images and framed screenshots; radius should be variant-driven.

## Border Tokens

### Current Values Found

- `1px solid #dcd7cd`
- `1px solid #d7d1c7`
- `1px solid #d8d1c8`
- `1px solid #DDD6CE`
- `1px solid #E8E0D8`
- `1px solid #C9D8E1`
- `1px solid #a5643e`
- `1.5px solid #a5643e`
- `border-neutral-100`
- `border-neutral-200`
- `border-black/10`
- `border-transparent`
- Tailwind red/amber/orange/rose/emerald borders in mini artifacts.

### Recommended Semantic Tokens

| Token | Suggested value | Purpose |
| --- | --- | --- |
| `border.divider` | `1px solid #E8E0D8` | Internal content dividers. |
| `border.section` | `1px solid #DDD6CE` | Section panel boundaries. |
| `border.frame` | `1px solid #d8d1c8` | Screenshot/image frames. |
| `border.sidebar` | `1px solid #d7d1c7` | Sidebar boundary and item rows. |
| `border.card` | `1px solid neutral-200 equivalent` | Standard content cards. |
| `border.control` | `1px solid transparent` | Inactive segmented buttons to prevent layout shift. |
| `border.control-active-warm` | `1px solid #b98965` | Before active toggle. |
| `border.control-active-cool` | `1px solid #6f91a8` | After active toggle. |
| `border.annotation` | `1.5px solid #A5643E` | Walkthrough target rectangles. |
| `border.emphasis` | `2px solid #C8754D` | Callout left rule. |

### Why These Should Become Tokens

- Border colors currently carry section structure, screenshot framing, control state, and annotations.
- A single generic `border-default` would be too blunt; semantic roles should be preserved.

### Merge or Remove

- Merge `#dcd7cd`, `#d7d1c7`, `#d8d1c8`, and `#DDD6CE` only after visual testing. They are similar but used in different contexts.
- Keep annotation and callout borders separate.
- Replace Tailwind alert-color borders in strategy mini cards only if those cards remain in the final story.

### Risks Before Implementation

- Border contrast changes are very visible in the sidebar and framed screenshots.
- Changing annotation border width can make target boxes feel inaccurate.

## Shadow Tokens

### Current Values Found

- `shadow-sm`
- `shadow`
- `shadow-md`
- `shadow-xs`
- `shadow-2xl`
- `shadow-[0_1px_3px_rgba(18,18,18,0.05)]`
- CSS inset active marker: `inset 0 2px 0 #a5643e`

### Recommended Semantic Tokens

| Token | Suggested value | Purpose |
| --- | --- | --- |
| `shadow.none` | `none` | Default for most editorial content. |
| `shadow.control` | Tailwind `shadow-sm` equivalent | Active tabs and small floating controls. |
| `shadow.card` | `0 1px 3px rgba(18,18,18,0.05)` | Small content cards. |
| `shadow.figure` | subtle medium shadow, optional | Large image artifacts if needed. |
| `shadow.modal` | Tailwind `shadow-2xl` equivalent | Modal only. |
| `shadow.active-indicator` | `inset 0 2px 0 var(--color.accent.copper)` | Active change trigger. |

### Why These Should Become Tokens

- The current design should stay mostly flat; shadows are used only for active state and light artifact elevation.
- Tokenizing shadows prevents the page from drifting into card-heavy SaaS styling.

### Merge or Remove

- Remove generic `shadow` and `shadow-md` from content unless hover interaction is intentional.
- Keep `shadow-sm` for active pills.
- Keep `shadow-2xl` scoped to modal overlays only.

### Risks Before Implementation

- Removing shadows from images/cards can reduce affordance in dense sections.
- Active pill shadows help tabs read as selected; replacing them with borders may change the design language.

## Container Width Tokens

### Current Values Found

- Main reading max width: `800px`
- Internal title max width: `640px`
- PH06 image/content width: `92%`
- Hero image width: `calc(100vw - 320px)`
- Sidebar width: `320px`
- Modal max width: `2xl`
- Various min-heights: `88px`, `96px`, `126px`, `132px`, `150px`, `260px`, `270px`, `340px`, `90vh`

### Recommended Semantic Tokens

| Token | Suggested value | Purpose |
| --- | ---: | --- |
| `container.reading` | `800px` | Main narrative column. |
| `container.text.narrow` | `640px` | Internal titles and focused text blocks. |
| `container.artifact` | `92%` of reading/panel area | Large screenshots within interactive sections. |
| `container.fullBleed.available` | `calc(100vw - var(--layout.sidebar.width))` | Hero image spanning available content area. |
| `container.modal.md` | Tailwind `max-w-2xl` equivalent | Edit modal. |
| `container.annotation.minHeight` | section-specific | Reserved height for PH06 comparison/change area. |

### Why These Should Become Tokens

- `800px` defines the whole reading experience and should be stable.
- `92%` is repeated for artifacts and should have a semantic reason.
- Full-bleed content depends on sidebar width; tokenizing both avoids layout mismatch.

### Merge or Remove

- Keep `800px` as canonical reading width.
- Convert `640px` to a narrow text token.
- Avoid tokenizing all min-heights immediately; many are content-specific.
- Replace `w-[calc(100vw-320px)]` with a layout token once sidebar width is tokenized.

### Risks Before Implementation

- The current visual composition depends on sidebar width. Changing it affects hero image and main content alignment.
- PH06 aspect ratios and annotations depend on exact image container behavior.

## Sidebar and Layout Tokens

### Current Values Found

- Sidebar width: `320px`
- Sidebar z-index: `50`
- Sidebar background: `#f1eee8`
- Sidebar border: `#d7d1c7`
- Sidebar item height: `80px`
- Sidebar item padding: `0 24px 0 48px`
- Sidebar bottom padding: `92px`
- Translate button bottom offset: `22px`
- Main content likely offset to account for sidebar.
- Timeline active state:
  - background `#191919`
  - text `#f4f1ea`
- Hover state: `#e8e3da`

### Recommended Semantic Tokens

| Token | Suggested value | Purpose |
| --- | ---: | --- |
| `layout.sidebar.width` | `320px` | Fixed timeline sidebar width. |
| `layout.sidebar.zIndex` | `50` | Keep sidebar above content. |
| `layout.sidebar.itemHeight` | `80px` | Phase row rhythm. |
| `layout.sidebar.paddingX` | `24px` | Sidebar inner horizontal padding. |
| `layout.sidebar.phaseIndent` | `48px` | Phase item left text indent. |
| `layout.sidebar.bottomReserve` | `92px` | Space for translate button. |
| `layout.content.offsetLeft` | `320px` | Main content offset when sidebar is visible. |
| `layout.hero.availableWidth` | `calc(100vw - 320px)` | Full-width hero media inside content area. |
| `layout.scrollbar.size` | `6px` | Custom scrollbar width/height. |

### Why These Should Become Tokens

- Sidebar width affects the entire page layout and hero calculations.
- Sidebar states are separate from the case study body but should still belong to the same token system.
- Scrollbar styling and sidebar z-index are layout-level decisions, not component internals.

### Merge or Remove

- If the original requirement still expects a `210px` sidebar, decide before token implementation. Current implementation is `320px`.
- Merge sidebar surface colors with page surfaces only if the sidebar should become less distinct.
- Keep sidebar active inverse state separate; it is the only dark surface in the visible UI.

### Risks Before Implementation

- Changing sidebar width can break hero image span and content positioning.
- Dark active state may clash with the newer warm editorial language, but removing it would reduce navigation clarity.
- Mobile behavior is not fully specified in the current token architecture.

## Recommended Implementation Sequence

1. **Create token definitions only**
   - Add CSS custom properties or Tailwind theme tokens without replacing usages yet.

2. **Map primitives to tokens**
   - Start with `SectionShell`, `SectionHeader`, `PillTabs`, and `SegmentedToggle`.
   - These have the highest reuse and lowest semantic ambiguity.

3. **Tokenize image/frame primitives**
   - `FigureFrame` and `ImageCarousel`.
   - Be careful with PH06 annotation positioning.

4. **Tokenize editorial content**
   - `Callout`, `Card`, `MetaGrid`.
   - Add named variants before removing local class overrides.

5. **Tokenize layout/sidebar**
   - Only after confirming sidebar width and desired active-state language.

6. **Clean up deprecated values**
   - Remove legacy `brutal-*` names or alias them to semantic tokens after visual parity is confirmed.

## Highest-Risk Areas

- PH06 image comparison and annotation overlay.
- Sidebar width and hero media alignment.
- Chinese typography weight/size after type token normalization.
- Warm surface consolidation, especially between `#FAF7F4`, `#FBF9F5`, and `#FFFBF5`.
- Legacy Framer components that may not represent the active page but still contain many hardcoded values.
