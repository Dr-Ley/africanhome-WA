# Implementation report

## 1. What was inspected

The Next.js 16 app in `frontend/`, especially `src/data/safari-packages.ts`, the safari list and detail routes, the homepage, About, Diani, fly-in and photography pages, enquiry forms, sitemap, and visual tokens. `tours_rows.json` (11 tours). The public homepage at https://africahomeadventure.com/ and the published 5-day tour page on www.africanhomeadventure.com. TripAdvisor was searched. The UK review URL timed out.

## 2. What changed

The safari catalogue was rewritten in the existing data file and components. Cards no longer show a dollar figure. Filters no longer pretend to filter by an unverified budget, and the empty “9+ days” option was removed because no published safari is that long. Detail pages show highlights, meals, accommodation, and a FAQ. Retired slugs redirect. Invented named traveller quotations were removed and replaced with a TripAdvisor link. The About page now repeats the company's stated FE/459 and KATO claim. The trust line and the header no longer say every departure is private, because the site also sells group-joining trips. Illustrative USD nightly bands on the luxury page were removed. The comparison of camping, lodges and fly-in travel remains.

No database and no payment flow were added.

## 3. Tours selected

Seven, because each one has a full day-by-day source and a reason to be on the site:

1. Private 3-day Maasai Mara. Named on the company homepage.
2. Group-joining 3-day Maasai Mara. The homepage recommends group joining for a lower spend.
3. Private 4-day Maasai Mara. A longer Mara stay from the detailed outline. It is not the website's separate 4-day Nakuru and Mara page.
4. 5-day Nakuru, Naivasha and Mara. Named on the homepage and on its own tour page.
5. 6-day Ngorongoro, Serengeti and Mara. Named on the homepage. This outline starts in Nairobi.
6. 3-day Amboseli finishing in Diani. Supports the bush-and-beach section. Beach nights are not included.
7. 8-day Nakuru, Mara and Diani by train. The detailed bush-and-beach itinerary.

## 4. JSON records used as references

Used for wording: 1, 17, 14, 19, 21, 16, 22.

Not published: 18 (near-duplicate group 4-day), 11 (6-day balloon tour with an extra Day 0), 20 (migration routing that is not the website's Amboseli 6-day), 23 (9-day Ol Pejeta circuit that does not match the website's 8-day or 10-day length).

## 5. Official website

Used for the office, phones, WhatsApp, the 25-year claim, FE/459, KATO, private versus group-joining vehicles, the named tour list, and the 5-day page's inclusion of the Naivasha boat ride. The email spelling on the live site was not copied over the project email.

## 6. TripAdvisor

Used only as a link to the Nairobi listing the brief supplied. No review was copied. No star rating or review count is shown, because the UK page did not load and two other country snippets disagreed by one review.

## 7. Titles and slugs

Listed in `docs/seo-implementation.md`. The original 3-day slug was kept. The other prototype slugs redirect.

## 8. How itineraries were rewritten

Each published day keeps the source activities, times, stops, meals, border posts, and optional extras. The sentences were rewritten in plain travel English. Guarantees were softened: rhinos, the Big Five, migration crossings, and Kilimanjaro views are things to look for, not promises. Dollar amounts for balloon flights and village visits were removed. Camp names remain, with a line that they must be confirmed.

The balloon record's Day 0 was not renumbered and not deleted. The whole record was left unpublished until the balloon inclusion and the day count are confirmed.

## 9. SEO

Unique titles and descriptions, canonicals, sitemap entries, redirects, TouristTrip and FAQ schema, breadcrumbs, and internal links. No price or rating schema.

## 10. Decisions that need the business

- Which email domain is current: africanhomeadventure.com or africahomeadventure.com.
- Whether FE/459 and the KATO bond are still the right numbers to print.
- Whether +254 788 788 754 and +254 793 852 450 should be public.
- Enchoro, Nyati, Zebra Plains, Sopa, Angata, and Baobab Beach Resort for the dates you sell.
- Naivasha boat: included, as on the live 5-day page, or optional, as in the JSON.
- Does the 6-day crater safari start in Nairobi or Arusha?
- Is the 3 pm train still the Diani connection?
- Should the unpublished Day 0 balloon safari, the 4-day group safari, the migration 6-day, and the 9-day Ol Pejeta safari be added once their current itineraries are confirmed?
- Currency and current price for every tour. Nothing numeric is on the cards.

## 11. Tests

- `npx tsc --noEmit` completed with exit code 0.
- `npm run build` completed with exit code 0. Next.js generated the seven safari pages as static HTML.
- There is no lint script in `package.json`.
- There is no automated test suite.
- The Cursor browser could not open the local server. Checks were run with Playwright against `http://127.0.0.1:3000`, which was already serving this project.
- Homepage: TripAdvisor link is present, the invented “Sarah M.” quotation is gone, the header reads as Kenya and Tanzania safaris, and the featured private Mara safari is listed. No dollar amount on the page. No horizontal overflow at 390px.
- Catalogue: Diani Beach leaves 2 of 7. Diani plus 6–8 days leaves 1 of 7. Group joining leaves the group safari. No horizontal overflow at 390px.
- The 5-day Nakuru, Naivasha and Mara page shows days 1 to 5, meals, the FAQ, “On request”, and loaded images. The enquiry confirmation says the note has not been sent and is not a confirmed booking.
- `/safaris/8-day-kenya-tanzania-safari` returns HTTP 308 to `/safaris/6-day-ngorongoro-serengeti-maasai-mara`, and that page shows days 1 to 6. No horizontal overflow at 390px.
- The luxury page still compares camping, lodges and fly-in travel, and it no longer prints a USD range.
- `sitemap.xml` includes the private and group Mara slugs and does not include `7-day-kenya-safari`.

## 12. Remaining issues

- Several photographs are shared across parks and are labelled for what they actually show.
- The Diani page still explains a Tsavo road and a Ukunda flight as alternative plans. The only full itinerary on that page is the train outline.
- Fly-in and photography pages no longer embed a sample week, because those sample itineraries were prototype text.
- The redirect from the old 8-day Kenya and Tanzania URL lands on a 6-day itinerary. Anyone with the old link should read the new duration before enquiring.
- The luxury comparison no longer charts a dollar range. Recharts remains installed and is unused.
- The in-IDE browser could not reach the local server, so the page checks above used Playwright on this machine instead.
- The header now says “Kenya & Tanzania safaris” so it matches the group-joining itinerary.
