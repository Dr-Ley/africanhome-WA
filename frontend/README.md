# African Home Adventure

Private Kenya and Tanzania safari website. Next.js App Router prototype for [africanhomeadventure.com](https://www.africanhomeadventure.com/).

## Stack

Next.js 16, React, TypeScript, Tailwind CSS, daisyUI 5, Lucide, React Hook Form, Zod, date-fns, Embla Carousel, Leaflet, Recharts, Playwright.

## Run locally

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000

```bash
npx tsc --noEmit
npm run build
```

## Screenshots

With the dev server running:

```bash
npx tsx tests/capture-screenshots.ts
```

Files are written to `frontend/screenshots/desktop`, `frontend/screenshots/mobile` and `frontend/screenshots/interactions`.

## Enquiries and prices

Forms keep submissions in the browser. They do not send email and they do not confirm a booking. Package figures are labelled indicative. Vehicle seating and luggage are described only where they can be stated without inventing a specification.

Photographs are downloaded from Unsplash for this prototype and stored in `public/images`.
