# NFVCB — National Film and Video Censors Board

The official website of the National Film and Video Censors Board, built with Next.js 16
(App Router), Tailwind CSS v4 and Convex.

## Getting started

```bash
yarn dev
```

## Content: static vs. Convex

Most of the site is **static content** committed to the repo under `lib/data/`:

| File | Covers |
| --- | --- |
| `nav.ts` | Header mega-menu and footer columns |
| `board.ts` | Mandate, mission, vision, timeline, departments, leadership |
| `zones.ts` | Head office, six zonal offices, state centres, verification desks |
| `licensing.ts` | Licence categories and fees, downloadable forms, submission steps |
| `classification.ts` | Rating symbols, fee schedules, censorship criteria |
| `charter.ts` | Service charter, 8-point action plan, infringements |
| `associations.ts` | 26 registered guilds and associations |
| `faq.ts` | Frequently asked questions |

Three areas are **editable content read from Convex** (read-only from the site):

| Route | Convex table |
| --- | --- |
| `/news`, `/news/[slug]` | `news` |
| `/approved-movies`, `/approved-movies/[slug]` | `approvedMovies` + `approvedMovieItems` |
| (available for use) | `managementStaff` |

### Connecting Convex

1. Create the deployment and generate the typed API:

   ```bash
   npx convex dev
   ```

   This writes `convex/_generated/` (git-ignored by Convex convention) and prints your
   deployment URL.

2. Add the URL to `.env.local`:

   ```
   NEXT_PUBLIC_CONVEX_URL=https://<your-deployment>.convex.cloud
   ```

3. Deploy the schema and queries to production:

   ```bash
   npx convex deploy
   ```

**Until `NEXT_PUBLIC_CONVEX_URL` is set, the Convex-backed pages serve placeholder
records** from `lib/data/sample-content.ts` — five news items and two monthly approved-film
listings (August and September 2026) — so the layouts can be reviewed before the deployment
exists. Both pages display a visible "Placeholder content" banner while this is happening.

Setting `NEXT_PUBLIC_CONVEX_URL` switches every reader in `lib/convex-server.ts` to live
Convex data, hides the banner, and stops the samples being read at all. **Delete
`lib/data/sample-content.ts` and `components/site/placeholder-notice.tsx` once real content
is in Convex.** If a configured deployment errors at runtime, reads fall back to empty —
never to the samples.

Reads address functions through `anyApi`, so `convex/_generated/api` is not required at
build time.

Convex-backed routes use `revalidate = 300`, so published changes appear within five
minutes without a redeploy. `dynamicParams` is enabled on the detail routes, so articles
and listings added after a build render on demand.

## Theming

Both themes are defined as CSS custom properties in `app/globals.css`: light on `:root`,
dark on `.dark`. **Dark is the default** and the only two options are light and dark —
`next-themes` is configured with `enableSystem={false}`, so the OS preference is not
followed. The choice persists in `localStorage` and is applied by an inline script before
first paint, so there is no flash.

The navbar carries a `ThemeToggle` (icon button, sun/moon crossfade); the mobile drawer
carries a `ThemeSwitcher` (explicit two-way selector). Both live in
`components/site/theme-toggle.tsx`.

Components never hardcode `white`/`black`. Surfaces use `bg-surface`/`bg-card`, hairlines
use `border-border`, translucent chips use `bg-foreground/[0.04]`, and shadows use
`shadow-[color:var(--shadow-tint)]`. Classification chips get their colour from
`ratingStyle()` in `lib/data/classification.ts`, which reads `--rating-l` so the same hue
reads correctly on either background.

## Sharing

`components/site/share-menu.tsx` exports `ShareBar` (article pages) and `ShareButton`
(news cards). Targets are X, Facebook, Instagram, WhatsApp, LinkedIn and copy-link.

**Instagram is a copy action, not a link.** Instagram publishes no web endpoint for
sharing a URL, so the button copies the link and opens instagram.com for the user to paste
into a story, bio or DM. On phones `ShareButton` uses the OS share sheet instead, which
reaches Instagram natively.

## Design system

One cinematic identity across both themes — Nigerian emerald `--primary`, reel gold
`--gold`, against either deep theatre black or a bright federal daylight surface. Shared
primitives are in `components/site/kit.tsx`; `components/site/reveal.tsx` provides the
IntersectionObserver scroll-reveal used throughout. All motion respects
`prefers-reduced-motion`.

## Checks

```bash
npx tsc --noEmit
npx eslint .
yarn build
```
