# Migrating From The Old Starter

This guide is for developers who used the previous template and are starting work in this one.

## What Changed

1. Theme-first setup is stricter.

- Design tokens live in [app/theme/theme.css](app/theme/theme.css).
- Typography variants live in [app/theme/text.ts](app/theme/text.ts).
- Button variants/sizes live in [app/theme/button.ts](app/theme/button.ts).
- Layout width presets live in [app/theme/layoutConfig.ts](app/theme/layoutConfig.ts).

2. Tailwind color utilities are generated from CSS variables.

- [app/globals.css](app/globals.css) maps `--semantic-*` variables to utility tokens such as `bg-bg-canvas` and `text-text-primary`.
- The source of truth for color values is [app/theme/theme.css](app/theme/theme.css).

3. Text style preview is derived from `textStyles`.

- [app/(site)/text-hierarchy/page.tsx](<app/(site)/text-hierarchy/page.tsx>) now reads keys from [app/theme/text.ts](app/theme/text.ts).
- Adding/removing a `textStyle` in [app/theme/text.ts](app/theme/text.ts) updates the preview list automatically.

4. Color preview list is derived from theme CSS.

- [app/theme/colours.ts](app/theme/colours.ts) parses [app/theme/theme.css](app/theme/theme.css) and builds primitive and semantic token lists.
- You no longer need to maintain separate color lists in the preview page.

5. Sanity setup remains code-config based.

- Project ID, dataset, title, and API version are in [sanityConfig.js](sanityConfig.js).
- Studio config is in [sanity.config.ts](sanity.config.ts) (mounted at `/admin`).

## Old To New Mental Model

Old approach:

- Update component classes directly first.
- Keep style values close to each component.

New approach:

1. Set core tokens in [app/theme/theme.css](app/theme/theme.css).
2. Set type scale in [app/theme/text.ts](app/theme/text.ts).
3. Set button and layout presets in [app/theme/button.ts](app/theme/button.ts) and [app/theme/layoutConfig.ts](app/theme/layoutConfig.ts).
4. Build components/blocks using these shared tokens.

If a component needs a new design value, add or adjust it in theme first, then consume it in the component.

## Common Migration Pitfalls

1. Updating only utility classes and forgetting theme variables.

- If a color is not in [app/theme/theme.css](app/theme/theme.css), it is not part of the system.

2. Editing old file names.

- Width/layout config is [app/theme/layoutConfig.ts](app/theme/layoutConfig.ts), not `layout.ts`.

3. Global Sanity CLI mismatch.

- Prefer `npx sanity ...` so the project and CLI versions stay aligned.

4. Assuming preview pages are manually listed.

- Text hierarchy and token previews are now generated from theme sources.

## Quick Verification Checklist

1. Run `npm run dev` and open `/text-hierarchy`.
2. Confirm text variants and color swatches reflect your theme edits.
3. Open `/admin` and confirm schema options still match frontend style tokens.
4. Run `npm run lint` before your first PR.
