# Next + Sanity Starter

A theme-first starter for building Next.js + Sanity websites from design handoff.

## If you used the old template

Start with the migration guide:

- [docs/migrating-from-old-template.md](docs/migrating-from-old-template.md)

## Clone To Running In 5 Minutes

1. Clone and install dependencies.

```bash
git clone <your-repo-url>
cd next-sanity-starter
npm install
```

2. Start the app.

```bash
npm run dev
```

3. Open:

- Site: [http://localhost:3000](http://localhost:3000)
- Studio: [http://localhost:3000/admin](http://localhost:3000/admin)

## New Project Setup Flow (Recommended)

Follow this order when creating a new client project from the template.

1. Configure Sanity project settings in [sanityConfig.js](sanityConfig.js).

- `sanityProjectId`
- `sanityDataset`
- `sanityTitle`
- `sanityApiVersion`

2. Import starter content into the connected Sanity project.

Run this after the project ID and dataset are set in [sanityConfig.js](sanityConfig.js):

```bash
npx sanity dataset import seedData.tar.gz production
```

3. Add environment values from [example.env](example.env) into `.env`.

**Required for revalidation:**

- `SANITY_REVALIDATE_SECRET` — generate with `openssl rand -hex 32`

**Required for draft preview:**

- `SANITY_PREVIEW_TOKEN` — generate with `openssl rand -hex 32`
- `NEXT_PUBLIC_PREVIEW_TOKEN` — must match `SANITY_PREVIEW_TOKEN` exactly
- `NEXT_PUBLIC_BASE_URL` — your frontend URL, no trailing slash (e.g. `https://yoursite.com`)
- `SANITY_API_READ_TOKEN` — a Sanity API token with viewer role; create at [sanity.io/manage](https://sanity.io/manage) → project → API → Tokens

**Set up the Sanity webhook:**

In [sanity.io/manage](https://sanity.io/manage), go to your project → API → Webhooks and create a new webhook:

- URL: `https://yoursite.com/api/sanity/revalidate`
- HTTP method: `POST`
- Trigger on: Create, Update, Delete
- Projection: `{ _type, _id, "slug": slug.current, "operation": delta::operation() }`
- Secret: the value of `SANITY_REVALIDATE_SECRET`
- HTTP Headers: `Authorization: Bearer <SANITY_REVALIDATE_SECRET>`

4. Paste design tokens into [app/theme/theme.css](app/theme/theme.css).

- Primitive tokens (`--black`, `--accent`, etc.)
- Semantic tokens (`--semantic-bg-canvas`, `--semantic-text-primary`, etc.)

5. Configure fonts.

- [app/theme/fonts.ts](app/theme/fonts.ts)
- [app/theme/theme.css](app/theme/theme.css) (`--font-body-family`, `--font-heading-family`)

6. Configure typography variants in [app/theme/text.ts](app/theme/text.ts).

- Update `textStyles` values.

7. Configure buttons and layout presets.

- [app/theme/button.ts](app/theme/button.ts)
- [app/theme/layoutConfig.ts](app/theme/layoutConfig.ts)

8. Verify theme output.

- Open [http://localhost:3000/text-hierarchy](http://localhost:3000/text-hierarchy)
- Confirm text styles and color tokens render as expected.

9. Run quality checks.

```bash
npm run lint
npm run build
```

## Theme Source Of Truth

Keep design decisions in theme files first, then consume in components.

1. Colors: [app/theme/theme.css](app/theme/theme.css)
2. Typography: [app/theme/text.ts](app/theme/text.ts)
3. Buttons: [app/theme/button.ts](app/theme/button.ts)
4. Layout widths: [app/theme/layoutConfig.ts](app/theme/layoutConfig.ts)

Notes:

- Text hierarchy previews derive from [app/theme/text.ts](app/theme/text.ts).
- Color token previews derive from variables defined in [app/theme/theme.css](app/theme/theme.css) via [app/theme/colours.ts](app/theme/colours.ts).

## Sanity CLI Notes

Prefer local execution to avoid global version conflicts:

```bash
npx sanity versions
```

If you intentionally use a global CLI, keep it updated:

```bash
npm install -g @sanity/cli@latest
```

## Useful Commands

```bash
npm run dev
npm run lint
npm run build
npx sanity versions
```
