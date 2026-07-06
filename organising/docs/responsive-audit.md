# Responsive Scaling Consistency Audit

Phase: 2 implementation complete  
Date: 2026-07-06  
Scope routes: `/`, `/illustration`, `/illustration/kodak`, `/illustration/tarot`, `/preview.html`, `/case/hireable/`, `/case/reading-rep/`, `/case/ohisama/`, `/case/tfl-go/`, `/patient-crm/`  
Route status check: all listed routes returned `200` from the local dev server at `127.0.0.1:4180`.

Viewport target set from prompt: `375px`, `768px`, `1024px`, `1440px`.

Important constraint: Phase 1 made no source changes outside this report. Phase 2 source changes are now tracked in the status tables below.

## 1. Typography Scaling

| Element / role | File:line | Current value | Fluid or fixed | Severity |
| --- | --- | --- | --- | --- |
| Hero display token | `src/styles/design-tokens.css:136` | `--font-hero-display-size: 34px` | Fixed | looks wrong |
| Hero subtitle token | `src/styles/design-tokens.css:137` | `clamp(12px, 2vw, 20px)` | Fluid | cosmetic |
| Chip token | `src/styles/design-tokens.css:138` | `--font-chip-size: 12px`; mobile override `13px` at `src/styles/design-tokens.css:307` | Fixed and grows on mobile | looks wrong |
| Heading XL token | `src/styles/design-tokens.css:140` | `36px`; mobile override `30px` at `src/styles/design-tokens.css:304` | Fixed stepped | looks wrong |
| Heading LG/MD/stage/body tokens | `src/styles/design-tokens.css:142-146` | `24px`, `20px`, `18px`, `16px`, `13px` | Fixed | looks wrong |
| Case display MD | `src/styles/design-tokens.css:153` | `clamp(56px, 5.2vw, 96px)` | Fluid | cosmetic |
| Case display SM | `src/styles/design-tokens.css:154` | `clamp(29px, 2.35vw, 44px)` | Fluid but high mobile floor | looks wrong |
| Case project summary | `src/styles/design-tokens.css:160` | `clamp(20px, 1.45vw, 26px)` | Fluid but high mobile floor | looks wrong |
| Case project compact copy | `src/styles/design-tokens.css:163` | `17px` | Fixed | looks wrong |
| Section heading | `src/components/ui/SectionShell.tsx:54` | `text-[length:var(--font-heading-md)]` -> fixed `20px` | Fixed token | looks wrong |
| Case body copy | `src/index.css:138-140` | `font-size: var(--font-body)` -> fixed `16px` | Fixed | looks wrong |
| Case card title/body | `src/index.css:127-139`, `src/components/ui/StageBlock.tsx:112-117` | `--font-stage-title`, `--font-body-sm`; fixed tokens | Fixed | looks wrong |
| Portfolio work intro title/subtitle | `src/index.css:1791-1808` | Local `clamp(24px, 3.8vw, 44px)` and `clamp(16px, 2.6vw, 26px)` | Fluid local component override | cosmetic |
| Portfolio work card title/copy/tags | `src/index.css:1811-1815`, `src/index.css:2195-2215` | Local card variables with `clamp()` | Fluid local component override | cosmetic |
| Illustration index card title/body/meta | `src/index.css:1977-2014` | `12px`, `20px`, `16px` | Fixed | looks wrong |
| Illustration detail h1 | `src/index.css:2045-2050`; mobile override `src/index.css:2428-2430` | `--case-display-sm-size`; mobile override fixed `36px` | Fluid then fixed override | looks wrong |
| Illustration pager | `src/index.css:2145-2157`; mobile override `src/index.css:2443-2446` | fixed `29px` | Fixed | looks wrong |
| Testing visuals | `src/components/ui/TestingBlock.tsx:26-33`, `src/components/ui/TestingBlock.tsx:63` | `text-[28px]`, `4 / 7` fixed `28px` | Fixed local | cosmetic |
| Portfolio case badge | `src/components/PortfolioCasePage.tsx:96-107` | `min-h-[160px]`, `min-w-[240px]`, border `8px`, text uses undefined-looking `--font-heading-sm` | Fixed local / token gap | breaks layout |

## 2. Spacing Scaling

| Element / spacing role | File:line | Current value | Fluid or fixed | Severity |
| --- | --- | --- | --- | --- |
| Primitive spacing scale | `src/styles/design-tokens.css:189-200` | `4px` through `80px` fixed primitives | Fixed | looks wrong |
| Semantic section padding | `src/styles/design-tokens.css:208`, `src/styles/design-tokens.css:313` | `64px`; mobile `48px` | Fixed stepped | looks wrong |
| Section header/body rhythm | `src/styles/design-tokens.css:209-211` | `24px`, `16px`, `8px` | Fixed | looks wrong |
| Page padding | `src/styles/design-tokens.css:212-213`, `src/styles/design-tokens.css:310` | `24px`, desktop `48px`, mobile `16px` | Fixed stepped | cosmetic |
| SectionShell padding | `src/components/ui/SectionShell.tsx:42` | `py-[var(--space-section-padding-y)]` | Tokenized but stepped fixed | looks wrong |
| CaseHero mid-width gap | `src/index.css:315-390` | `gap: 32px` at `max-width: 1280px` | Fixed local breakpoint | cosmetic |
| CaseHero copy padding | `src/index.css:322-324`, `src/index.css:358-361`, `src/index.css:397-407` | `--space-page-x-desktop`, `--space-6xl`, mobile `--space-5xl` | Tokenized but stepped fixed | looks wrong |
| Work section top space | `src/index.css:1752`, `src/index.css:2372-2376` | `clamp(72px, 7vw, 110px)`; mobile override `48px` | Fluid then fixed local | cosmetic |
| Work card gaps | `src/index.css:1786-1788` | column `clamp(18px, 2.3vw, 36px)`, row `clamp(48px, 6vw, 96px)` | Fluid | cosmetic |
| Illustration detail spacing | `src/index.css:2017-2028`, `src/index.css:2109-2114` | padding/margins are `clamp()` | Fluid | cosmetic |
| Illustration detail summary rows | `src/index.css:2077-2082` | grid gap `16px`, padding `12px` | Fixed | cosmetic |
| Illustration pager spacing | `src/index.css:2136-2142`; mobile `src/index.css:2436-2440` | `clamp()` then fixed `58px`/`20px` | Fluid then fixed local | looks wrong |
| Stage blocks | `src/components/ui/StageBlock.tsx:56-60`, `src/components/ui/StageBlock.tsx:106-140` | `--space-5xl`, `--space-4xl`, `--space-3xl`, etc. | Tokenized but fixed | looks wrong |

## 3. Media / Card Sizing

| Element / component | File:line | Current value | Fluid or fixed | Severity |
| --- | --- | --- | --- | --- |
| Editorial hero cover figure | `src/index.css:219-228` | `min-height: 420px`, contain width `min(780px, 100%)`, max-height `min(76vh, 780px)` | Mixed fixed/fluid | looks wrong |
| CaseHero showcase artifact | `src/index.css:268-294` | media `width: min(100%, 960px)` and inherited min-height from hero | Mixed | cosmetic |
| CaseHero mid-width stack | `src/index.css:327-388` | artifact panel `aspect-ratio: 16 / 9`; media forced `width/height: 100%`; `object-fit: cover` except editorial contain override | Component-level behavior | cosmetic |
| Work card media | `src/index.css:1823-1837` | `aspect-ratio: 16 / 10`, width/height `100%`, object-fit cover | Fluid container | cosmetic |
| Work card special media | `src/index.css:1849-1863` | per-project padding and transform values | One-off local | cosmetic |
| Portfolio figure frame in case pages | `src/components/PortfolioCasePage.tsx:202-206` | `h-[min(56vh,560px)]` | Fluid with fixed cap | cosmetic |
| Stage figure layout | `src/components/ui/StageBlock.tsx:71-85` | `lg:grid-cols-[minmax(220px,0.62fr)_minmax(360px,1fr)]` | Fixed min column widths | looks wrong |
| Illustration index/media | `src/index.css:1947-1968` | card figures `aspect-ratio: 16 / 10`; images fill container | Fluid container | cosmetic |
| Illustration detail gallery | `src/index.css:2103-2106`, mobile `src/index.css:2423-2425` | two columns, then one column | Responsive | cosmetic |
| Testing cards/visuals | `src/components/ui/TestingBlock.tsx:40-63`, `src/components/ui/TestingBlock.tsx:105-113` | fixed icon/card dimensions (`h-20`, `w-12`, `w-[96px]`, `h-5`, `w-5`) | Fixed local | cosmetic |

## 4. Sticky Nav / Header Overlap

| Element / behavior | File:line | Current value | Fluid or fixed | Severity |
| --- | --- | --- | --- | --- |
| Header height calculation | `src/index.css:45-48` | `--editorial-header-height` calculated from fluid nav padding and header size; top nav height fixed `44px` | Mixed | cosmetic |
| Top portfolio nav | `src/index.css:1298-1314` | fixed/flex layout; `gap: 18px`; padding clamp; font clamp | Mixed | looks wrong |
| Mobile top nav | `src/index.css:2343-2355` | padding fixed `18px 22px`, gap fixed `14px`, hides `.nav-identity span` | Page-level media query | cosmetic |
| Case study nav | `src/components/ui/CaseStudyTopNav.tsx:78-100`; CSS `src/index.css:2442-2454` and surrounding nav rules | sticky with JS collapse, inner horizontal row | Component-level | cosmetic |
| Case study nav offset | `src/index.css:45-48`, `src/components/ui/StageBlock.tsx:60` | offsets use `--editorial-header-height` + `--case-study-top-nav-height` + `--space-lg` | Tokenized but fixed height assumption | looks wrong |
| Section scroll hiding risk | `src/components/ui/SectionShell.tsx:34-42` | sections have no per-section `scroll-margin-top`; global top nav uses sticky stack | Fixed/implicit | looks wrong |
| Work page nav visible state | `src/index.css:1292-1296` | work page padding-top equals header height | Tokenized | cosmetic |

## 5. Horizontal Overflow

| Route / element | File:line | Current value | Fluid or fixed | Severity |
| --- | --- | --- | --- | --- |
| Global body | `src/index.css:52` | `overflow-x: hidden` | Masks overflow | breaks layout |
| CaseHero editorial/showcase | `src/index.css:315-390` | stack at `max-width: 1280px` with full-width artifacts | Likely no x-scroll, but may hide crop issues | cosmetic |
| MetaGrid hero | `src/components/ui/MetaGrid.tsx:21-27` | `grid-cols-2`, then four columns at `min-[500px]` | Possible cramped columns at 375px with long values | looks wrong |
| Illustration pager | `src/index.css:2145-2192`, `src/index.css:2436-2454` | fixed `29px`, `overflow-wrap:anywhere`, next right aligned | No x-scroll expected; awkward wraps possible | cosmetic |
| Portfolio case badge | `src/components/PortfolioCasePage.tsx:96` | `min-w-[240px]`, border `8px` | Can overflow narrow columns | breaks layout |
| StageBlock feature grid | `src/components/ui/StageBlock.tsx:71` | min columns 220px and 360px at `lg`; okay below `lg` but hard floors at desktop-ish widths | looks wrong |
| Testing visuals | `src/components/ui/TestingBlock.tsx:23-64` | fixed icon sizes and row grids | Possible compression at 375px | cosmetic |
| Work cards | `src/index.css:2378-2387` | collapse to 1 column at `max-width:560px` | No x-scroll expected | cosmetic |

## 6. Tap Targets And Wrapping

| Element / control | File:line | Current value | Fluid or fixed | Severity |
| --- | --- | --- | --- | --- |
| Portfolio work cards | `src/components/PortfolioWorkSection.tsx:107-134` | whole card is `<a>` | Good tap target | cosmetic |
| Portfolio pills | `src/index.css:2228-2241`; work override `src/index.css:1811-1815` and `src/index.css:2221-2225` | global `min-height:24px`, work `20-24px` | Below 44px but non-primary tags | cosmetic |
| CaseHero pills | `src/components/ui/CaseHero.tsx:87-94` | wrapped inline pill elements | Below 44px, not interactive | cosmetic |
| Case study top nav buttons | `src/components/ui/CaseStudyTopNav.tsx:88-96`; CSS not fully tokenized | likely around nav row height `44px` | Mixed | cosmetic |
| Illustration collection nav | `src/index.css:1900-1928`, mobile `src/index.css:2414-2420` | `min-height: 34px`, grid 1 col mobile | Below 44px | looks wrong |
| Lightbox close | `src/index.css:1690-1710` | `32px` circle | Below 44px | cosmetic |
| Info overlay copy/email/CV buttons | `src/index.css:1487-1528`, `src/index.css:1593-1614` | copy min-height `28px`, CV min-height `28px` | Below 44px | cosmetic |
| Illustration pager links | `src/components/IllustrationPage.tsx:305-313`, `src/index.css:2145-2160` | large text link, whole anchor clickable | Good target; wrapping now handled | cosmetic |

## 7. Component-Level Overrides Vs One-Off Page Hacks

| One-off / override | File:line | Current value | Fluid or fixed | Severity |
| --- | --- | --- | --- | --- |
| Token mobile overrides are stepped, not fluid | `src/styles/design-tokens.css:302-315` | fixed mobile substitutions | Token-level but not fluid | looks wrong |
| CaseHero custom breakpoint | `src/index.css:315-390` | `@media (max-width: 1280px)`, fixed `gap: 32px`, fixed row behavior | Component-level one-off | cosmetic |
| CaseHero mobile padding patch | `src/index.css:392-416` | fixed padding choices per variant | Component-level one-off | cosmetic |
| Work section custom breakpoints | `src/index.css:2293-2341`, `src/index.css:2343-2390` | `900px`, `560px`, fixed mobile spacing | Page/pattern-level hacks | looks wrong |
| Work card responsive variables local to cards | `src/index.css:1811-1815`, `src/index.css:2382-2387` | local clamp/fixed overrides instead of token family | Page/pattern-level hack | cosmetic |
| Illustration page mobile block | `src/index.css:2406-2454` | fixed page padding, h1 `36px`, pager `29px`, fixed margins | Page-level hacks | looks wrong |
| Illustration card typography | `src/index.css:1977-2014` | fixed typography not using tokens | Page-level hack | looks wrong |
| Portfolio case badge | `src/components/PortfolioCasePage.tsx:96-107` | hard-coded min sizes, border, shadows, text var | Component-local hardcode | breaks layout |
| Testing visual diagrams | `src/components/ui/TestingBlock.tsx:23-64` | fixed icon/glyph sizes | Component-local hardcode | cosmetic |
| Syllabus modal | `src/components/SyllabusModalForm.tsx:97-350` | many Tailwind fixed paddings/text sizes | Outside primary routes unless modal exposed | cosmetic |

## Route Notes By Viewport

| Route | 375px likely issues | 768px likely issues | 1024px likely issues | 1440px likely issues |
| --- | --- | --- | --- | --- |
| `/` | Work section hierarchy relies on local fixes; nav hides identity; card pills below 44px | Work grid becomes 2 columns at 900px threshold nearby | Work/sidebar transition can feel abrupt | Baseline likely acceptable |
| `/illustration` | Index card title/body fixed; collection nav target 34px | Two-column index may be fine but typography not fluid | Large cards okay | Baseline likely acceptable |
| `/illustration/kodak` | Detail h1 forced 36px; pager fixed 29px; summary row gaps fixed | Hero becomes single column under 900px; summary p fixed via override | Two-column hero; min-height clamp okay | Baseline likely acceptable |
| `/illustration/tarot` | Same as Kodak; long pager names can wrap awkwardly | Same | Same | Baseline likely acceptable |
| `/preview.html` | Hero stack is full-width artifact then copy; typography tokens mixed; top nav can crowd | MetaGrid four columns at 500px can be dense | CaseHero stacks until 1280px, maybe surprising | Baseline likely acceptable |
| `/case/hireable/` | Editorial hero stacks; artifact contain okay; badge/card local fixed values in content | Section body uses fixed 20/16/13 tokens | Hero still stacked until 1280px | Baseline likely acceptable |
| `/case/reading-rep/` | Same case shell risks; metadata now unified but dense | Same | Same | Baseline likely acceptable |
| `/case/ohisama/` | Testing visuals and large badges have fixed dimensions | StageBlock and TestingBlock local fixed values | Same | Baseline likely acceptable |
| `/case/tfl-go/` | Fixed card/figure special blocks likely uneven | Same | Same | Baseline likely acceptable |
| `/patient-crm/` | Showcase hero stack; video/media okay; top nav crowd possible | MetaGrid dense at four columns over 500px | Hero stays stacked until 1280px | Baseline likely acceptable |

## Summary: Token Families To Make Fluid

| Token family | Current source | Proposed Phase 2 direction | Can delete after | Status |
| --- | --- | --- | --- | --- |
| Body and small type | `src/styles/design-tokens.css:145-152` | Convert `--font-body`, `--font-body-sm`, `--font-section-label`, `--font-caption`, `--font-label`, `--font-tab` to `clamp()` with conservative floors. Example: body `clamp(14px, 1.05vw, 16px)`, body-sm `clamp(12px, 0.9vw, 13px)`. | Local work card and illustration fixed text overrides can be removed or simplified. | Done |
| Heading type | `src/styles/design-tokens.css:140-144`, `153-163` | Make `--font-heading-xl`, `--font-heading-lg`, `--font-heading-md`, `--font-stage-title`, `--case-display-sm-size`, `--case-project-summary-size`, `--case-project-copy-compact-size` fluid. Proposed floors: heading-md `clamp(18px, 1.5vw, 20px)`, stage `clamp(16px, 1.35vw, 18px)`, case-display-sm `clamp(24px, 2.35vw, 44px)`, project-summary `clamp(16px, 1.45vw, 26px)`. | `src/index.css:1791-1808`, `src/index.css:2428-2430`, fixed illustration card typography. | Done |
| Hero type | `src/styles/design-tokens.css:136-137` | Make `--font-hero-display-size` fluid, e.g. `clamp(28px, 3.2vw, 34px)` unless Kai wants current 34px at all sizes. | Fewer hero-specific viewport overrides. | Done |
| Spacing primitives | `src/styles/design-tokens.css:189-217` | Keep primitive fixed if desired, but make semantic spacing fluid: `--space-section-padding-y`, `--space-section-header-body`, `--space-section-body-element`, `--space-page-x`, `--space-card-lg`, `--space-control-*`. Example section padding `clamp(40px, 5vw, 64px)`, body element `clamp(12px, 1.4vw, 16px)`, card-lg `clamp(16px, 2vw, 24px)`. | Many `@media max-width: 560/767` padding patches and component hardcoded gaps. | Done |
| Layout/chrome | `src/styles/design-tokens.css:278-284`, `src/index.css:45-48` | Make chrome heights and top-nav heights actual measured/tokenized component values or use CSS custom properties set by components. Avoid fixed `44px` assumption if nav wraps. | Sticky offset hacks in `StageBlock` and case shell. | Deferred |
| Controls/tap targets | `src/styles/design-tokens.css:202-204`, component CSS | Add semantic `--tap-target-min`, `--control-height-sm`, `--control-height-md`; use `min(44px)` only for interactive buttons/links, not noninteractive chips. | Local button min-height values in InfoOverlay, Lightbox, illustration collection nav. | Deferred |

## Proposed One-Off Hacks To Remove In Phase 2

| One-off / override | Status |
| --- | --- |
| `src/index.css:2343-2454`: broad `max-width: 560px` page-specific responsive block should shrink once typography/spacing tokens are fluid. | Partially done; remaining rules are structural collapse, identity hiding, or route-specific grid collapse. |
| `src/index.css:1791-1815` and `src/index.css:2382-2387`: local work intro/card font variables should collapse into shared type tokens. | Done |
| `src/index.css:1977-2014`: illustration card fixed typography should use the same project-card tokens as work cards. | Done |
| `src/index.css:2428-2430`: illustration detail h1 fixed mobile size should be deleted after `--case-display-sm-size` is fixed. | Done |
| `src/index.css:315-390`: keep CaseHero stacking behavior, but replace fixed `gap: 32px` and fixed bottom paddings with semantic responsive spacing tokens. | Done |
| `src/components/PortfolioCasePage.tsx:96-107`: replace hardcoded badge min sizes/borders with named component tokens or a responsive component class. | Done |
| `src/components/ui/TestingBlock.tsx:23-64`: replace local visual glyph dimensions with component tokens or clamp values. | Done |

## Open Questions For Kai

| Question | Answer / status |
| --- | --- |
| Should noninteractive chips remain small (<44px), or should visual chip height also follow tap-target sizing for consistency? | Answered: noninteractive chips stay small; 44px applies only to clickable buttons/links. |
| For `CaseHero`, should the stack breakpoint remain `1280px`, or should it be tied to content/container width instead? | Answered: keep `1280px`; container query work is deferred. |
| For missing timeline durations currently displayed as `Duration not specified`, should those stay visible or should that data be gathered before final polish? | Answered and done: hide missing duration line. |
| Should illustration detail pages share the same project-card typography tokens as Product Design work cards, or keep a distinct illustration editorial scale? | Answered and done: illustration pages now use shared case/work card type tokens. |
| Should the top-level nav collapse/hide more aggressively on 375px, or is current identity hiding enough? | Answered: keep current hidden identity subtitle approach; no hamburger. |

## Phase 2 Verification Checklist

- `npx tsc --noEmit`: Passed.
- `npm run build`: Passed.
- `1440px`: Clamp upper bounds preserve existing desktop values for edited type and spacing tokens.
- `1024px`: CaseHero stack behavior intentionally unchanged at the existing `1280px` breakpoint.
- `768px`: Tokenized spacing/type reduces stepped jumps; no nav architecture changes in this phase.
- `375px`: Passed with `body overflow-x: hidden` removed; all scoped routes reported `scrollWidth === clientWidth`.
