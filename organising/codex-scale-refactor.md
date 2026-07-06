# Type Scale & Spacing Refactor — Codex Prompt

> **Goal:** Replace the incoherent 10-stop type scale with a 7-stop logical scale, and enforce a 3-tier spacing rule throughout the page. Zero content changes. Zero visual redesign beyond scale correction.
>
> **Project path:** `/Users/kaiwei/Documents/Playground/organising`

---

## Problem summary (do not skip reading this)

**Type scale is broken in three ways:**

1. Five sizes (9/10/11/12/13px) crammed into a 4px range — imperceptibly different
2. `--font-heading-lg: 20px` is *smaller* than `--font-heading-md: 22px` — names are inverted
3. Section headings (20px) vs body copy (16px) are only 4px apart — no editorial hierarchy

**Spacing has no governing rule** — token values are fine but choices are arbitrary per location.

---

## Stage 1 — Token value changes (`src/styles/design-tokens.css`)

### Type scale: change these values

| Token | Old value | New value | Reason |
|---|---|---|---|
| `--font-label` | 10px | **11px** | Slight readability lift |
| `--font-caption` | 11px | **12px** | Create gap vs label |
| `--font-meta` | 12px | **remove** | Replace `case-section-label` usage with `var(--font-caption)` (12px, unchanged). Replace all other usages with `var(--font-body-sm)` (13px). |
| `--font-body-sm` | 13px | **13px** | Unchanged; absorbs ex-meta role |
| `--font-body` | 16px | **15px** | Tighten body; creates cleaner gap from headings |
| `--font-block-title` | 16px | **remove** | Identical to body; replace all usages with `var(--font-body)` |
| `--font-micro` | 9px | **remove** | Unreadably small; replace all usages with `var(--font-label)` |
| `--font-heading-md` | 22px | **20px** | Becomes the "sub-heading" size (callout titles, secondary headings) |
| `--font-heading-lg` | 20px | **28px** | Becomes the main section heading size — this is the key hierarchy fix |
| `--font-heading-xl` | 36px | **36px** | Hero — unchanged |

**After this change the scale reads:** 11 → 13 → 15 → 20 → 28 → 36px

Each size maps to a clear semantic role — no two roles should share a size:

| Size | Token | Role |
|---|---|---|
| 11px | `--font-label` | Labels, chips, badges, metadata — decorative info |
| 13px | `--font-body-sm` | Card titles, card support, captions — subordinate UI |
| 15px | `--font-body` | Body copy — the narrative main line |
| 20px | `--font-heading-md` | Sub-headings, secondary headings, callout titles |
| 28px | `--font-heading-lg` | Section headings — one per section, the anchor |
| 36px | `--font-heading-xl` | Hero — once per page |

**The key principle: card titles must be smaller than body copy.**
Cards are illustrations of the narrative, not parallel content. If `case-card-title` is the same size as `case-body-copy`, they compete. At 13px vs 15px, cards clearly subordinate to the text that introduces them.

### Line-height: add one new token

Section headings at 28px need a tighter line-height than body text. Add this under the existing line-height tokens:

```css
--line-height-heading: 1.15;
```

(The existing `--line-height-tight` is probably already close — check its value first. If it's already 1.1–1.2, use that instead of adding a new token.)

---

## Stage 2 — `index.css` role updates

### `case-card-title` — change from body size to subordinate size

Currently `case-card-title` uses `var(--font-body)` (15px after Stage 1). This makes card titles the same size as body paragraphs — they compete with the narrative instead of supporting it.

Change `.case-card-title` font-size to `var(--font-body-sm)` (13px).

Also update `case-card-body` if it uses anything smaller than 11px — set minimum to `var(--font-label)` (11px).

### Roles that reference removed or changed tokens

**`.case-stat-number`** (line ~306)
Currently: `font-size: var(--font-heading-lg)` → after Stage 1 this becomes 28px, which is too large for a metric number inside a card.
Fix: change to `font-size: var(--font-heading-md)` (20px — still prominent, not oversized).

**`.case-badge`** (line ~163)
Currently uses `var(--font-micro)` (9px — unreadable).
Fix: change to `var(--font-label)` (11px).

**Any rule using `var(--font-meta)`**
Replace with `var(--font-body-sm)` (13px).

**Any rule using `var(--font-block-title)`**
Replace with `var(--font-body)` (15px).

**Any rule using `var(--font-micro)`**
Replace with `var(--font-label)` (11px).

### Line-height on `.case-heading`

After changing `--font-heading-lg` to 28px, the heading line-height needs updating.
In the `.case-heading` rule: set `line-height: var(--line-height-heading)` (the new 1.15 token, or the existing tight token if it's in the 1.1–1.2 range).

---

## Stage 3 — Component updates (`src/components/ui/`)

### `SectionHeader.tsx` (line 24) and `ContentBlock.tsx` (line 46)

Both use `text-[length:var(--font-heading-lg)]` inline as a size override.
After the token change these will automatically render at 28px — **no code change needed**. Just verify visually after Stage 1.

### `EditorialHeader.tsx` (line 43)

The brand name link currently uses `text-[length:var(--font-heading-lg)]`.
After Stage 1 this would become 28px — too large for a nav brand name.
Fix: change to `text-[length:var(--font-heading-md)]` (20px).

### `src/components/ContentArea.tsx` (line 963)

One inline usage of `var(--font-block-title)`:
```
text-[length:var(--font-block-title)]
```
Replace with `text-[length:var(--font-body)]`.

---

## Stage 4 — Proximity-based spacing system

The problem is not isolated to one section — **every section in ContentArea.tsx has the same issue**: large spacing tokens are used uniformly everywhere, so every gap looks the same size regardless of whether it separates two paragraphs or two major sections. The fix is a full pass through ContentArea.tsx applying one rule consistently.

### The rule — 5 proximity levels

**Memorise this table. Apply it everywhere.**

| Level | Relationship | Target gap | Token |
|---|---|---|---|
| 1 | `case-section-label` → `case-heading` (they are one unit) | **8px** | `--space-sm` |
| 2 | `case-heading` → first body paragraph | **16px** | `--space-lg` |
| 3 | paragraph → paragraph (same narrative block) | **16px** | `--space-lg` |
| 4 | body text block → card/callout/figure below (same section) | **32px** | `--space-3xl` |
| 5 | section → section (handled by SectionShell) | **64px** | `--space-6xl` — do not touch |

The principle: **the weaker the relationship, the larger the gap.** Currently everything is 32–48px regardless of context, which makes all content feel equally unrelated.

### How to audit — run this grep first

```bash
# Find every spacing token used inside ContentArea.tsx
grep -n 'space-y-\[var\|mt-\[var\|gap-\[var\|pb-\[var\|pt-\[var' src/components/ContentArea.tsx
```

For each match, ask: **what is the relationship between the elements this spacing separates?**
- If it separates two paragraphs → must be `--space-lg` (16px) max
- If it separates a paragraph group from a card/figure → `--space-3xl` (32px)
- If it separates sections → leave it, SectionShell handles it
- If it's inside a card → `--space-sm` or `--space-md` (8–12px)

### Specific patterns to fix throughout ContentArea.tsx

**Pattern A — Large `space-y` wrapping mixed content**
The most common mistake: a single `space-y-[var(--space-3xl)]` div wraps BOTH body paragraphs AND cards/callouts below them. This makes para→para the same 32px as para→cards.

Fix: split the wrapper into two groups:
```jsx
// Before (everything 32px apart)
<div className="space-y-[var(--space-3xl)]">
  <p className="case-body-copy">...</p>
  <p className="case-body-copy">...</p>
  <div className="grid ...">cards</div>
</div>

// After (paragraphs 16px, then 32px before cards)
<div className="space-y-[var(--space-lg)]">
  <p className="case-body-copy">...</p>
  <p className="case-body-copy">...</p>
</div>
<div className="mt-[var(--space-3xl)] grid ...">cards</div>
```

**Pattern B — `mt-[var(--space-4xl)]` or larger on card grids inside sections**
Any card grid, FigureFrame, or callout that uses `mt-[var(--space-4xl)]` (40px), `mt-[var(--space-5xl)]` (48px), or `mt-[var(--space-6xl)]` (64px) inside a section body → reduce to `mt-[var(--space-3xl)]` (32px).

**Pattern C — heading → body gap too large**
The heading → first paragraph gap is currently ~33px across all sections. The heading and the body below it should feel like one block. Find the spacing between `SectionHeader` and the first content div in each section and reduce to `var(--space-lg)` (16px).

**Pattern D — SectionHeader internal spacing**
Inside `SectionHeader.tsx`, check the margin between `case-section-label` and `case-heading`. Should be `var(--space-sm)` (8px). If larger, reduce it.

### Empty element in Research section
There is a visually empty block between the FigureFrame (workshop slides card) and the "So we reframed the question..." paragraph — a blank rectangular area with no visible content.
- Find the element (likely a component with no data, or a conditional that resolves to an empty div)
- If it is a component with no props/data in this context: add a null/empty guard so it doesn't render
- If it is a spacer div: remove it entirely

### What NOT to touch
- Spacing *inside* cards (card padding, internal card gaps)
- Hero section padding
- `EditorialHeader` spacing
- `SectionShell` inter-section padding (Level 5)

---

## Stage 5 — Component-internal typography

### The rule: max 3 type levels inside any single component

Every card, tile, or walkthrough step should have at most:
- **Level A** — primary label or title (the first thing the eye lands on)
- **Level B** — support description (explains Level A)
- **Level C** — metadata/category tag (smallest, uppercase)

More than 3 levels inside one component means something is competing that shouldn't be.

---

### Fix 1 — Customer comparison cards (PH-02, `ContentArea.tsx` lines ~864–935)

**Current problem:** 5 competing type treatments inside each card:
1. `PAST CUSTOMER BASE` — card header label
2. `Established enterprises` — card title (bold)
3. Description body text
4. `OPENLOOP COVERS` — sub-label inside the card
5. `SETUP TECH` / `CLINICAL OPS` / `COMPLIANCE` — service tile headers (uppercase bold, same visual weight as item 2)

Items 2 and 5 fight each other — both feel like "titles."

**Fix — reduce to 3 levels:**

| Element | Current treatment | Change to |
|---|---|---|
| `PAST CUSTOMER BASE` / `OPENLOOP COVERS` | uppercase label | `case-caption-label` (Level C) — already correct, keep |
| `Established enterprises` / `Creators & small wellness brands` | bold card title | `case-card-title` (Level A) — keep |
| Description body text | `case-card-support` | `case-card-support` (Level B) — keep |
| `SETUP TECH` / `CLINICAL OPS` / `COMPLIANCE` tile headers | uppercase bold (inline utilities) | `case-label` (Level C) — **remove bold, same visual level as PAST CUSTOMER BASE** |
| `Storefront + intake` / `Clinical + pharmacy` tile support | tiny inline font | `case-card-support` (Level B) |

The key change: `SETUP TECH` etc. should NOT be bold uppercase. They are sub-items inside the card, same level as the card's own category label. Remove any `font-medium` or `font-semibold` from these tiles and use `case-label` consistently.

---

### Fix 2 — Step walkthrough description text (`StepImageWalkthrough.tsx` or `ContentArea.tsx`)

**Current problem:** The introductory sentence above each step screenshot ("Let users confirm the brand name, slogan, and brief...") uses `case-body-copy` (15px). In this context it is a caption describing a screenshot, not a main narrative paragraph. It reads as too large and dominant.

**Fix:** Change `case-body-copy` to `case-card-support` (13px) for the description text inside `StepImageWalkthrough`. This makes the screenshot the focal point and the text its caption, not the other way around.

Locate the `<p className="case-body-copy">` inside `StepImageWalkthrough.tsx` (or the call sites in `ContentArea.tsx` that pass description text into this component) and change to `case-card-support`.

---

### Fix 3 — In-component uppercase labels ("AI SCRIBE", "WEBSITE EXAMPLE", "THEME CONTROLS" etc.)

**The problem:** Uppercase category labels inside components are rendering with the same visual weight as page-level section labels. They feel like announcements when they should feel like quiet organizational whispers.

These labels appear in at least two places:
1. Column headers inside the AI capability comparison card (`AI SCRIBE`, `CLINICAL ASST`, `COMPLIANCE`, `ANALYTICS`)
2. Sub-section dividers within step cards (`WEBSITE EXAMPLE`, `THEME CONTROLS`, `CONFIRM STORE INFORMATION`, `CHOOSE A BRAND COLOR`)

**The rule:** Page-level section labels (`RESEARCH`, `OVERVIEW`) live at the top of a section and use `case-section-label`. Component-internal labels are subordinate — they must be visually quieter in three ways simultaneously:

| Property | Page section label | Component-internal label |
|---|---|---|
| Size | 12px (`case-section-label`) | 11px (`case-caption-label`) |
| Color | `var(--text-primary)` | `var(--text-tertiary)` or `var(--text-muted)` |
| Weight | 400 (tracking does the work) | 400 (same — do NOT add bold) |
| Border/box | none | none — remove any border wrapper |

**Fix:**

For every uppercase label that appears *inside* a card, step, or component (not at the page section level):
- Change class to `case-caption-label` if not already
- Add `text-[var(--text-tertiary)]` color override (or wire `--text-tertiary` into the `.case-caption-label` rule in `index.css` directly)
- Remove any `font-medium`, `font-semibold`, or `font-bold` applied to it
- If it has a border or box wrapping it (`border`, `rounded`, `ring`), remove those — the uppercase + tracking treatment is sufficient visual differentiation on its own

**Specific locations to find:**
- The comparison card column headers (`AI SCRIBE` etc.) in `ContentArea.tsx` — search for the text or the wrapping element above the badge chips
- The `WEBSITE EXAMPLE`, `THEME CONTROLS`, `CONFIRM STORE INFORMATION`, `CHOOSE A BRAND COLOR` labels in the step walkthrough section — these are likely `case-section-label` or a `case-label` with a border; remove the border and reduce color

### Fix 4 — Verify all 24 `case-card-title` instances after Stage 1

Stage 1 changes `case-card-title` from 16px → 13px (via `--font-body-sm`). There are 24 instances in the DOM. After applying Stage 1, visually check each section to confirm:
- Every `case-card-title` is inside a card or tile context (not used as a standalone heading)
- None of the 24 instances was being used as a substitute for `case-heading` at section level

If any instance looks too small in context, it was likely misused — reclassify it to the correct role rather than overriding the size.

---

## What NOT to change

- Do not change any content, headings, or copy
- Do not change `--font-heading-xl` (36px hero) — it's correct
- Do not change spacing token *values* — only their *usage*
- Do not add new font families or weights
- Do not change `AGENTS.md`
- Do not touch `FramerContentArea.tsx`

---

## Verification

After all stages, check:

```bash
# No remaining usages of removed tokens
grep -rn 'font-micro\|font-meta\b\|font-block-title' src/ --include="*.css" --include="*.tsx"

# Confirm heading-lg is now used correctly (section headings only, not stat numbers)
grep -rn 'font-heading-lg' src/ --include="*.css" --include="*.tsx"
```

Visual check: open `http://127.0.0.1:4177/preview.html` and confirm:
1. Section headings ("Can AI Create New Revenue?" etc.) are clearly larger than body paragraphs
2. Stat numbers inside cards are not oversized vs the card they sit in
3. Badge text is readable (was 9px, now 11px)
4. Body copy feels slightly tighter (15px vs 16px — subtle)
5. The editorial header brand name is not oversized
