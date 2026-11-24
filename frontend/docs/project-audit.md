# Project audit

Inspected 23 November 2026. The app lives in `frontend/`. There is no database client, no payment code, and no CMS.

## Architecture

- Next.js 16.4.6 App Router, React 19, TypeScript, Tailwind CSS 4, daisyUI 5.
- Tour content is a typed array in `src/data/safari-packages.ts`, loaded by `/safaris` and `/safaris/[slug]`.
- Other content lives in `src/data/destinations.ts`, `vehicles.ts`, `accommodation.ts`, `site-content.ts`, and `navigation.ts`.
- Enquiry forms use React Hook Form and Zod and keep the result in component state. Nothing is emailed.
- SEO helpers: `src/lib/metadata.ts`, `src/app/sitemap.ts`, `src/app/robots.ts`, JSON-LD in the root layout and on safari pages.
- Maps use Leaflet. The luxury page uses Recharts. Galleries use Embla.

## Visual identity kept

- Forest `#183C2B`, olive `#7C8052`, sand `#E9DFC9`, cream `#FAF8F2`, charcoal `#242824`, gold `#B99A5A`.
- Cormorant Garamond for headings, Inter for interface text.
- White header, forest footer, pill buttons, photo cards.

## What the catalogue was before this pass

Eight prototype safaris with invented indicative USD prices and short day notes. Slugs included `3-day-maasai-mara-safari`, `5-day-kenya-wildlife-safari`, `7-day-kenya-safari`, `8-day-kenya-tanzania-safari`, `10-day-kenya-tanzania-safari`, `kenya-safari-diani-beach`, `kenya-fly-in-safari`, and `kenya-photography-safari`.

## Recommended changes, now made

- Replace prototype itineraries with curated outlines that match the company website or the detailed previous-project text.
- Stop printing unverified USD totals.
- Redirect retired slugs.
- Point trust content at TripAdvisor instead of invented named quotations.
- Leave fly-in and photography as planning pages, because no full verified itinerary was available for those products.

## Not changed

- No database, schema, or seed script.
- No payment gateway or checkout.
- No new font or colour system.
