# Case App Index

This folder is the active React/Vite workspace for portfolio case study previews.

The older app now lives at `/Users/kaiwei/Documents/Playground/case-study-archived` and is retired. `organising` is the only active app and owns all portfolio routes, including `/illustration` and `/illustration/:slug`.

## App Root

- React app: `/Users/kaiwei/Documents/Playground/organising`
- Main LaunchPad preview route: `/preview.html`
- Design system docs: `/design-system`
- Illustration index route: `/illustration`
- Illustration detail route: `/illustration/:slug`

## Case Routes

These case studies are available from the same `organising` app:

| Case | Route | Source |
| --- | --- | --- |
| LaunchPad redesigned case | `/preview.html` | `src/components/ContentArea.tsx` |
| Patient CRM | `/patient-crm` | `src/components/PatientCrmCaseStudy.tsx` |
| Hireable | `/case/hireable` | `src/portfolioCases.ts` |
| Fuze | `/case/fuze` | `src/portfolioCases.ts` |
| Reading Rep | `/case/reading-rep` | `src/portfolioCases.ts` |
| Ohisama | `/case/ohisama` | `src/portfolioCases.ts` |
| TfL Go | `/case/tfl-go` | `src/portfolioCases.ts` |

## Shared Assets

Portfolio case assets live in:

- `public/case-assets`

This includes migrated assets from the older `/Users/kaiwei/Documents/Playground/case-study` React app, including Hireable, CRM, LaunchPad, Reading Rep, Ohisama, Fuze, and TfL Go assets.

## Design System

Reusable case study system documentation lives in:

- `design-system/README.md`
- `design-system/tokens.md`
- `design-system/semantic-roles.md`
- `design-system/components.md`
- `design-system/narrative-patterns.md`
- `design-system/section-rhythm.md`
- `design-system/responsive.md`
- `design-system/audit-checklist.md`

New case work should reuse the design system before creating new visual roles or components.
