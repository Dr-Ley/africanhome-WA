# SEO implementation

## Titles and descriptions

Each safari page uses its H1 as the title tag and its opening paragraph as the meta description. Titles name the duration, the main parks, and whether the trip is private, group-joining, or a beach finish. They are not forced into one template.

Slugs that were already clear were kept. `3-day-maasai-mara-safari` stayed. New slugs are short and match the route:

- `3-day-maasai-mara-group-joining-safari`
- `4-day-maasai-mara-safari-nairobi`
- `5-day-lake-nakuru-naivasha-maasai-mara`
- `6-day-ngorongoro-serengeti-maasai-mara`
- `3-day-amboseli-safari-diani-beach`
- `8-day-nakuru-mara-diani-beach-safari`

"Maasai" is the spelling in titles. "Masai" still appears where a proper name from the source uses it, such as Masai Mara Sopa Lodge.

## Search intent covered by real pages

- Private 3-day Maasai Mara safari
- Group-joining Maasai Mara safari
- 4-day Maasai Mara safari
- Lake Nakuru, Lake Naivasha and Maasai Mara safari
- Kenya and Tanzania safari: Ngorongoro, Serengeti, Maasai Mara
- Amboseli to Diani
- Mara and Diani beach safari by train

No extra pages were added just to catch another keyword.

## On-page structure

Safari pages have one H1, then highlights, a day-by-day itinerary, wildlife, transport, included and excluded lists, a short FAQ, a map, and related safaris. Each day has a number, a title, the place, meals where the source gave them, the stay, and the full narrative.

## Technical

- Canonical URLs and Open Graph titles come from `generateMetadata` on the safari page.
- `sitemap.ts` lists every current safari slug.
- Permanent redirects send the seven retired slugs to the replacement page or to `/safaris`, `/fly-in-safaris`, or `/photography-safaris`.
- JSON-LD: `TouristTrip` and `FAQPage` on each safari. `BreadcrumbList` comes from the breadcrumb component. The layout still emits the business entity. No aggregate rating and no Offer/price markup was added.
- Internal links on the homepage, the Diani page, and the safari cards point at the new slugs.

## AI-readable facts

The first paragraph of each safari states what it is, where it goes, how long it lasts, and whether the vehicle is private or shared. FAQs answer the start city, the Naivasha boat, beach nights, and the train in the words of that itinerary. Wildlife is written as something the guide looks for, not something that is guaranteed.
