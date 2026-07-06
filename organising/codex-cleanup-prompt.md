# Design System Cleanup — Codex Implementation Prompt

> **Goal:** Make the LaunchPad case study consistent with the design system. Zero visual changes — only internal mapping from inline styles to registered tokens and roles.
>
> **Project path:** `/Users/kaiwei/Documents/Playground/organising`

---

## Before you start — read these files in order

1. `AGENTS.md` — working agreement and semantic role registry
2. `src/styles/design-tokens.css` — all CSS custom properties
3. `src/index.css` — semantic role class definitions
4. `src/components/ui/` — reusable components

**Primary rule:** never introduce new styles. Reuse existing tokens and roles. If a token or role doesn't exist and you need it, define it in the correct file before using it. Do not redesign any section.

---

## Stage 1 — Token file cleanup (`src/styles/design-tokens.css`)

1. **Remove** `--border-radius-md: var(--radius-md)`. Replace all usages of `var(--border-radius-md)` in `index.css` with `var(--radius-md)`.

2. **Remove** `--surface-surface: var(--surface-10)`. Replace all usages of `var(--surface-surface)` in component files with `var(--surface-10)`.

3. **Add** under the Typography section, after `--tracking-control`:
   ```css
   --tracking-hero-display: -0.035em;
   --tracking-hero-subtitle: -0.01em;
   --line-height-hero-subtitle: 1.22;
   ```

4. **Add** under the Colour section, after the Accents group:
   ```css
   --color-link: #4f6f9f;
   --color-link-hover: #38587f;
   --color-link-decoration: #9fb2cf;
   --color-link-decoration-hover: #6f8db6;
   ```

---

## Stage 2 — `index.css` role cleanup

### Replace raw pixel values with token references

| Rule | Property | Replace with |
|---|---|---|
| `.case-stat-row` | `gap: 8px` | `gap: var(--space-sm)` |
| `.case-stat-card` | `padding: 10px 14px` | `padding: var(--space-sm) var(--space-md)` |
| `.case-stat-number` | `font-size: 20px` | `font-size: var(--font-heading-lg)` |
| `.case-stat-label` | `font-size: 10px` | `font-size: var(--font-label)` |
| `.phase-code` | `font-size: 13px` | `font-size: var(--font-body-sm)` |
| `.phase-title` | `font-size: 16px` | `font-size: var(--font-body)` |
| `.timeline-translate-button` | `font-size: 11px` | `font-size: var(--font-caption)` |
| `.timeline-translate-button` | `padding: 12px 14px` | `padding: var(--space-md)` |

### Add new roles (after existing definitions)

**`.case-caption-label`** — uppercase metadata variant of caption-copy:
```css
.case-caption-label {
  /* copy case-caption-copy definition */
  /* then explicitly set: */
  text-transform: uppercase;
  letter-spacing: var(--tracking-section-label);
}
```

**`.case-badge`** — base badge shape:
```css
.case-badge {
  display: inline-flex;
  align-items: center;
  border-radius: var(--radius-sm);
  border: var(--border-width) solid;
  padding: var(--space-2xs) var(--space-xs);
  font-family: var(--font-label-family);
  font-size: var(--font-micro);
  font-weight: 500;
  line-height: var(--line-height-tight);
}
.case-badge-danger  { color: #dc2626; border-color: #fca5a5; background: var(--surface-section); }
.case-badge-warning { color: #d97706; border-color: #fcd34d; background: var(--surface-section); }
.case-badge-neutral { color: var(--text-tertiary); border-color: var(--border-soft-color); background: var(--surface-section); }
```

**`.case-callout-quote`** and **`.case-callout-card`**:
```css
.case-callout-quote {
  border-left: var(--border-callout);
  padding: var(--space-sm) var(--space-lg) var(--space-sm) var(--space-2xl);
}
.case-callout-card {
  border-radius: var(--radius-lg);
  background: var(--surface-10);
  padding: var(--space-card-lg);
}
```

---

## Stage 3 — Component updates (`src/components/ui/`)

### `Callout.tsx`
Add `variant?: 'quote' | 'card'` prop. Apply `case-callout-quote` or `case-callout-card` as the base class when set. `className` prop stays for spacing overrides only.

Call site updates in `ContentArea.tsx`:
- Lines 718, 1205: add `variant="quote"` and remove the inline visual classes from `className`
- Line 1046: add `variant="card"` and remove the inline visual classes from `className`

### `FigureFrame.tsx`
Add `variant?: 'default' | 'flush'` prop. When `flush`, use `frameClassName="relative w-full overflow-hidden rounded-[var(--radius-md)] bg-[var(--surface-base)]"` internally. Update `ContentArea.tsx` line 790–794 to `variant="flush"` instead of passing `frameClassName` directly.

### `SegmentedToggle.tsx`
Add `variant?: 'before-after'` prop. When set, hard-code the before/after active classes internally (they are identical at both call sites):
- Before active: `border-[var(--border-before-color)] bg-[var(--surface-active-warm)] text-[var(--accent-before)]`
- After active: `border-[var(--accent-after-border)] bg-[var(--surface-active-cool)] text-[var(--accent-after)]`

Update both call sites (`ContentArea.tsx` line 421, `DesignSystemPage.tsx` line 137) to use `variant="before-after"` and remove their `activeClassName` props.

### `StepImageWalkthrough.tsx`
Replace the two split-border divs (lines 88, 107) with a single `case-card overflow-hidden` wrapper. Use an internal `border-t border-[var(--border-soft-color)]` divider between sections instead of split outer borders.

### `PillTabs.tsx`
Add `@deprecated` JSDoc comment. Do not delete yet — remove after DesignSystemPage is updated (Stage 5).

---

## Stage 4 — `ContentArea.tsx` page-level refactor

### Hero (lines 617–631)
- `tracking-[-0.035em]` → `tracking-[var(--tracking-hero-display)]`
- `leading-[1.22]` → `leading-[var(--line-height-hero-subtitle)]`
- `tracking-[-0.01em]` → `tracking-[var(--tracking-hero-subtitle)]`

### Inline link (line 167)
Replace the four hardcoded hex colour classes:
```
text-[#4f6f9f] decoration-[#9fb2cf] hover:text-[#38587f] hover:decoration-[#6f8db6]
```
With token references:
```
text-[var(--color-link)] decoration-[var(--color-link-decoration)] hover:text-[var(--color-link-hover)] hover:decoration-[var(--color-link-decoration-hover)]
```

### Spacing — replace all raw Tailwind spacing

| Line(s) | Raw | Replace with |
|---|---|---|
| 666 | `mt-8` | `mt-[var(--space-3xl)]` |
| 707 | `space-y-6` | `space-y-[var(--space-3xl)]` |
| 784 | `mt-1.5` | `mt-[var(--space-xs)]` |
| 812, 821 | `space-y-2.5` | `space-y-[var(--space-sm)]` |
| 840 | `gap-3` | `gap-[var(--space-md)]` |
| 870 | `mt-4` | `mt-[var(--space-xl)]` |
| 907 | `gap-4` | `gap-[var(--space-xl)]` |
| 941 | `mt-8` | `mt-[var(--space-3xl)]` |
| 1076 | `mt-8` | `mt-[var(--space-3xl)]` |
| 1295 | `mt-4 space-y-6` | `mt-[var(--space-xl)] space-y-[var(--space-3xl)]` |

### PH-01 (lines 749–831)
- Replace inline badge `div` (line 781) with `<span className="case-badge case-badge-[danger|warning|neutral]">` per card
- Remove the inline `border-red-200 bg-[...] text-red-600` etc. colour classes

### PH-02 infrastructure diagram (lines 840–935) — highest priority
Every text element in this block uses inline Tailwind instead of registered roles:

| Line | Current | Replace with |
|---|---|---|
| 864 `h4` | `font-[family:var(--font-label-family)] text-sm font-medium leading-tight` | `case-card-title` |
| 867 `p` | `font-serif text-xs leading-[1.5]` | `case-card-support` |
| 883 service name `span` | inline font utilities | `case-label` |
| 883 service detail `span` | inline font utilities | `case-caption-copy` |
| 892 "New build" badge | inline colour classes | `case-badge case-badge-danger` |
| 912 `p` | `font-[family:var(--font-label-family)] text-[13px]...` | `case-card-title` |
| 915 `p` | `font-serif text-xs leading-[1.5]` | `case-card-support` |
| 919 `div "+"` | `text-base` | `text-[length:var(--font-body)]` (layout only, keep) |
| 926 `p` | inline font + colour | `case-card-title text-[var(--color-primary)]` |
| 929 `p` | `font-serif text-xs leading-[1.5]` | `case-card-support` |

### PH-03 (lines 938–1071)
- Line 1046 Callout: `variant="card"` (visual classes removed)
- Lines 1057, 1066: remove `text-[length:15px]` from `case-body-copy` — use the role at its natural 16px
- Line 1060: replace `case-caption-copy normal-case tracking-normal` with just `case-caption-copy`

### PH-05 (lines 1203–1290)
- Lines 718, 1205 Callout: `variant="quote"` (visual classes removed)

### PH-06 `SelectProductsComparison` (line 479)
- Replace `case-caption-copy normal-case tracking-normal` with `case-caption-copy`

### PH-07 (lines 808, 823)
- `case-body-copy font-medium` → `case-body-copy` (or wrap emphasis text in `<strong>` if the weight is semantic)

---

## Stage 5 — `DesignSystemPage.tsx`

- Line 26: `px-[var(--space-5xl)]` → `px-[var(--space-page-x)] md:px-[var(--space-page-x-desktop)]`
- Line 31 `h1`: add `case-heading` to class list; keep `text-[length:var(--font-heading-xl)]` as a size override
- Lines 64, 77, 94, 111, 123, 136, 156 `h2`: add `case-heading`; keep size modifier
- Line 84 `h3`: replace `text-[length:var(--font-block-title)] font-medium` with `case-card-title`
- Replace the `PillTabs` showcase component instance with `CaseSegmentTabs`
- Delete `PillTabs.tsx`

---

## Do not change

- Any content text, headings, or storytelling copy
- `FramerContentArea.tsx` — parallel implementation, hardcoded styles by design
- `SyllabusModalForm.tsx` — dev-only admin UI
- `AGENTS.md`
- The `SectionShell` grid structure (`grid-cols-3` / `lg:col-span-3`) — flagged but out of scope; requires a separate structural decision

---

## Verification — run after each stage

```bash
# Rule 11 check — every match should be a layout utility or token reference
grep -rn 'text-\[' src/components/ContentArea.tsx | grep -v 'text-\[var(' | grep -v 'text-\[length:var('
grep -rn 'leading-\[' src/components/ContentArea.tsx | grep -v 'leading-\[var('
grep -rn 'tracking-\[' src/components/ContentArea.tsx | grep -v 'tracking-\[var('
grep -rn '#[0-9A-Fa-f]' src/components/ContentArea.tsx
```

After all stages: open `http://127.0.0.1:4177/preview.html` and compare section by section. The goal is **zero visible change** — only internal consistency. If any section looks different, a new style was introduced instead of mapped to an existing role.
