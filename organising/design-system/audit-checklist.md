# Audit Checklist

Run this audit before considering a case study design-system task complete.

## Search Before Create

Before introducing anything new:

1. Search existing semantic roles.
2. Search existing narrative patterns.
3. Search existing reusable components.
4. Reuse first.
5. Extend only when necessary.

Searching is mandatory.

## Audit By Search

Search the codebase for repeated visual utilities:

```text
text-[
font-
tracking
leading-
uppercase
capitalize
bg-[var(
border-[var(
rounded-
shadow-
#[0-9A-Fa-f]
```

Every result must satisfy one of these:

- Layout only
- One-off exception
- References an existing semantic role

Otherwise, refactor.

## Self Review

Before considering work complete:

- Did I search before creating?
- Did I reuse an existing semantic role?
- Did I reuse an existing narrative pattern?
- Did I duplicate typography?
- Did I duplicate visual identity?
- Does every repeated element map back to the system?
- Did this implementation strengthen the system?

If any answer is "No", the implementation is not complete.

## Migration Rules

When updating UI:

1. Check `src/styles/design-tokens.css` first.
2. Check this `design-system/` folder.
3. If a suitable token or role exists, use it.
4. If a new visual value is needed, add a semantic token or role before using it.
5. If the value is image-positioning or annotation geometry, it can remain local.
6. Run `npm run lint` when available.
7. Run `npm run build`.
8. Check the preview page.

## Known Technical Debt

- `ContentArea.tsx` still contains section-specific Tailwind classes.
- `Card` and `Callout` are currently pass-through primitives and need variants.
- Some legacy Framer components contain old hardcoded values and may not match the current editorial system.
- Annotation coordinates are intentionally local and should not be normalized.
- Focus-visible states are not yet standardized across all controls.
