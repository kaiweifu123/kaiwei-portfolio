# Token Restructure — Codex Prompt

> **Goal:** Introduce a primitive → semantic → component token hierarchy. Fix alias proliferation, give differentiated values to surface tokens, unify naming convention. Zero visual change expected on any component.
>
> **Project path:** `/Users/kaiwei/Documents/Playground/organising`

---

## Problem summary

`src/styles/design-tokens.css` has three structural issues:

1. **Alias proliferation** — tokens like `--text-app`, `--text-tertiary-neutral`, `--color-text-primary` are pure aliases that add naming surface without adding meaning
2. **Undifferentiated surface values** — 12 surface tokens all resolve to `#FFFBF5`; `--surface-active-warm` and `--surface-active-cool` are literally the same color
3. **Misleading names** — `--accent-brown` and `--accent-brown-soft` both resolve to the red primary color

---

## Stage 1 — Add a primitive color palette

At the top of `:root` in `design-tokens.css`, **before the Colour Tokens section**, add a new section:

```css
/* ======================================================
   Primitive Palette
   Internal values. Reference only from semantic tokens.
   Never use --_* tokens directly in components or index.css.
   ====================================================== */

/* Warm neutrals */
--_warm-50: #FFFBF5;
--_warm-100: #F5EDE0;

/* Cool neutrals */
--_neutral-0: #ffffff;
--_neutral-50: #FAFAFA;
--_neutral-100: #F5F5F5;
--_neutral-150: #F8F8F8;

/* Text scale */
--_ink-900: #121212;
--_ink-800: #33302D;
--_ink-700: #5F534A;
--_ink-600: #4a4a4a;
--_ink-500: #6f6f6f;
--_ink-400: #9A8878;
--_ink-300: #B0A898;
--_ink-200: #C8BFB5;

/* Brand / accent */
--_red-500: #db3334;
--_red-50: rgba(219, 51, 52, 0.06);
--_red-30: rgba(219, 51, 52, 0.04);
--_slate-700: #315d73;
--_slate-500: #6f91a8;
--_sage-600: #4A7260;
--_sage-400: #7A8A85;

/* Active state surfaces (before/after toggle) */
--_surface-warm-active: #FFF5EE;
--_surface-cool-active: #EFF4F8;
```

---

## Stage 2 — Restructure semantic colour tokens

Replace the entire **Colour Tokens** section of `:root` with the following. Read through the changes carefully — comments mark what changed and why.

### Surfaces

```css
/* Surfaces */
--surface-app:            var(--_neutral-0);       /* app bg — white */
--surface-page:           var(--_neutral-0);       /* same as app */
--surface-base:           var(--_neutral-0);       /* card/content base — white */
--surface-section:        var(--_warm-50);         /* warm content sections — #FFFBF5 */
--surface-10:             var(--_neutral-50);      /* subtle lift — #FAFAFA */
--surface-section-subtle: var(--_neutral-150);    /* neutral section bg — #F8F8F8 */
--surface-panel:          var(--_neutral-100);    /* UI chrome, tabs, sidebar bg — #F5F5F5 (was same as section) */
--surface-inverse:        #191919;

/* Interactive surfaces — now actually differentiated */
--surface-control:        var(--_warm-50);         /* input/toggle wrapper bg */
--surface-control-hover:  var(--_warm-100);        /* input/toggle hover — darker warm (was same as control) */
--surface-active-warm:    var(--_surface-warm-active);  /* before-state active — #FFF5EE (was same as cool) */
--surface-active-cool:    var(--_surface-cool-active);  /* after-state active — #EFF4F8 (was same as warm) */

/* Sidebar */
--surface-sidebar:        var(--_warm-50);
--surface-sidebar-hover:  var(--_warm-100);        /* now actually differs from sidebar bg */
--surface-app-hover:      var(--_warm-100);

/* Annotation (walkthrough badge bg) */
--surface-annotation:     var(--_warm-50);

/* Scrollbar */
--surface-scrollbar:       #dcd7cd;
--surface-scrollbar-hover: #bbb6ac;
```

**Remove these tokens** (pure aliases with no distinct value):
- `--surface-muted` — one usage in `ContentArea.tsx` line 620; replace with `var(--surface-section)`
- `--surface-callout` — no usages in components (only defined in tokens); delete

### Text

```css
/* Text */
--text-strong:            var(--_ink-900);   /* #121212 — headings, high emphasis */
--text-primary:           var(--_ink-800);   /* #33302D — body primary */
--text-secondary:         var(--_ink-700);   /* #5F534A — softer body */
--text-secondary-neutral: var(--_ink-600);   /* #4a4a4a — neutral secondary */
--text-tertiary:          var(--_ink-500);   /* #6f6f6f — labels, captions */
--text-muted:             var(--_ink-400);   /* #9A8878 — placeholder, muted */
--text-subtle:            var(--_ink-300);   /* #B0A898 — very light */
--text-faint:             var(--_ink-200);   /* #C8BFB5 — faintest */
--text-hero-display:      var(--_ink-900);
--text-inverse:           #f4f1ea;
--text-sidebar-primary:   #202020;
--text-sidebar-secondary: #747474;
```

**Remove these aliases** and replace their usages (see Stage 3):
- `--text-app` (= `--text-strong`) → replace with `var(--text-strong)`
- `--text-tertiary-neutral` (= `--text-tertiary`) → replace with `var(--text-tertiary)`
- `--color-text-primary` (= `--text-strong`) → replace with `var(--text-strong)`
- `--color-text-secondary` (= `--text-secondary-neutral`) → replace with `var(--text-secondary-neutral)`

### Accents

```css
/* Accents */
--color-primary:          var(--_red-500);
--color-primary-hover:    var(--_red-50);
--color-primary-active:   var(--_red-30);
--accent-before:          var(--color-primary);   /* semantic: "before" state colour */
--accent-after:           var(--_slate-700);
--accent-after-border:    var(--_slate-500);
--accent-sage:            var(--_sage-600);
--accent-sage-muted:      var(--_sage-400);
```

**Remove these misleading aliases** (both are just `--color-primary`, not brown):
- `--accent-brown` → replace usages with `var(--color-primary)`
- `--accent-brown-soft` → replace usages with `var(--color-primary)`

### Links, badges, borders, overlays, shadows

No structural changes to these groups. Keep as-is, but update the two `--border-*` and `--shadow-*` rules that reference removed tokens:

```css
/* was: var(--border-width-callout) solid var(--accent-brown-soft) */
--border-callout: var(--border-width-callout) solid var(--color-primary);

/* was: inset 0 2px 0 var(--accent-brown) */
--shadow-active-indicator: inset 0 2px 0 var(--color-primary);
```

---

## Stage 3 — Update usages of removed tokens

Run these replacements across `src/` (exclude `FramerContentArea.tsx`):

| Remove token | Replace with | Files to check |
|---|---|---|
| `var(--text-app)` | `var(--text-strong)` | `src/index.css` (lines 46, 468) |
| `var(--text-tertiary-neutral)` | `var(--text-tertiary)` | `src/components/FramerProgressingBar.tsx` line 166 — check if file is safe to edit; if not, leave it |
| `var(--color-text-primary)` | `var(--text-strong)` | `src/index.css` (line 331 — `case-stat-number`) |
| `var(--color-text-secondary)` | `var(--text-secondary-neutral)` | `src/index.css` (lines 88, 340 — `case-heading-secondary`, `case-stat-label`) |
| `var(--accent-brown)` | `var(--color-primary)` | `src/styles/design-tokens.css` (already handled in Stage 2) |
| `var(--accent-brown-soft)` | `var(--color-primary)` | `src/styles/design-tokens.css` (already handled in Stage 2) |
| `var(--surface-muted)` | `var(--surface-section)` | `src/components/ContentArea.tsx` line 620 |

Also update `src/index.css` `@theme` block:
```css
/* was: var(--surface-app-hover) */
--color-brutal-bg-hover: var(--surface-app-hover);   /* keep — token still exists */

/* was: var(--text-app) */
--color-brutal-dark: var(--text-strong);
```

---

## Stage 4 — Verify

```bash
# No usages of removed tokens remain
grep -rn 'text-app\b\|text-tertiary-neutral\|color-text-primary\|color-text-secondary\|accent-brown\b\|accent-brown-soft\|surface-muted\|surface-callout\b' src/ \
  --include="*.css" --include="*.tsx" --include="*.ts" \
  | grep -v 'design-tokens.css'

# No component directly references a primitive token
grep -rn 'var(--_' src/ --include="*.tsx" --include="*.css" | grep -v 'design-tokens.css'
```

Visual check: open `http://127.0.0.1:4177/preview.html` and confirm:

1. **Before/After toggle** — the two active states should now look visibly different (warm amber vs cool blue-grey)
2. **Sidebar hover** — hovering a phase item in the sidebar should look slightly darker than the resting state
3. **Everything else** — no visual change expected anywhere else; this is a structure-only refactor

---

## What NOT to change

- Spacing tokens — they are correctly structured
- Typography tokens — already refactored
- `AGENTS.md`
- `FramerContentArea.tsx`
- Any content or copy
