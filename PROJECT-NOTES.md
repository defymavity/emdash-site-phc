# Prairie Homebrewing Companions: EmDash site notes

Read this first when picking up work on this project.

## About the owner
- Sara is a web designer (HTML/CSS; reads PHP/JS but doesn't write them). Strong in WordPress/Divi, newer to EmDash/Astro.
- Wants complete, ready-to-paste code (whole files, not snippets), short bulleted explanations, and no em dashes.
- Runs the site locally on her Mac with `npm run dev` at http://localhost:4321 (admin at /_emdash/admin).

## Stack
- EmDash 1.5 (Astro 7), Node adapter, SQLite (`data.db`), started from the EmDash **Starter** template.
- Design came from a bundled HTML export ("Prairie Homebrewing Companions Homepage"). Colors: green #183D34, dark green #0F2B24, cream #F4EEDD, gold #BF9D5E. Fonts: Montserrat (headings), DM Sans (body), loaded from Google Fonts in Base.astro.

## Files
- `src/layouts/Base.astro`: page shell, fonts, EmDashHead/BodyStart/BodyEnd, Header + Footer.
- `src/components/Header.astro`: logo, site title, `primary` menu, `header_cta` menu (gold button).
- `src/components/Footer.astro`: logo, tagline, `footer_explore` and `footer_contact` menus.
- `src/pages/index.astro`: homepage. All text comes from the `homepage` collection entry with slug `home`; the next 3 upcoming events come from the `events` collection.
- `src/pages/[slug].astro`: template for admin Pages (green title banner + Portable Text). The page with slug `events` also lists all upcoming events.
- `src/pages/404.astro`: styled not-found page.
- `src/styles/global.css`: global styles, hover effects, pattern backgrounds, `.phc-content` rich-text styles.
- `src/live.config.ts`: EmDash loader boilerplate. Required, don't delete.
- `public/images/`: logo.png, pattern-line.png, pattern-green.png.
- `seed/phc-homepage.seed.json`: defines the `homepage` and `events` collections, the 4 menus, settings and starting content. Already applied to data.db with `npx emdash seed seed/phc-homepage.seed.json --on-conflict update`.
- `backups/`: the old hard-coded homepage, old Base.astro, and a copy of data.db from before the homepage/events seed.

## Content model
- `homepage` collection: one entry (slug `home`) with a labeled field for every piece of homepage text/link. `hero_headline` is one line per row; `card3_tags` is comma-separated; `join_perks` is a repeater.
- `events` collection: title, event_date (datetime), time_label, location, summary, details_url. Past events are hidden automatically. Dates display in America/Chicago.
- Menus: `primary`, `header_cta`, `footer_explore`, `footer_contact`.

## Open items
- Delete the 3 sample events marked [SAMPLE] and the empty `homepages` collection (an earlier manual attempt) in the admin.
- Replace placeholders: club email, Facebook/social link, Hoppy Halloween description.
- Consider pointing the "Events" menu items and homepage "All club events" link to `/events` instead of `/#events`.
- Delete the `_to_delete` folder.
- Starter template's posts, category and tag pages were removed; add styled versions back if a blog/news section is needed.

## Resources page (added)
- `src/pages/resources.astro` at `/resources`, built from Sara's resources.html design. Link lists are arrays at the top of the file (edit there). Styles are scoped in the file's `<style>` block.
- The "PHC events" block at the bottom shows the next upcoming event from the `events` collection.
- Menu links updated: primary "Resources" -> /resources, footer "Great Beer Near Here" -> /resources#breweries.
- UPDATE: Resources page is now CMS-driven. `resources_page` collection (entry slug `resources`) holds all section titles/descriptions, the featured shop card and the Facebook link. `resources` collection ("Resource Links") holds each link: title, category (select: Associations, Regional clubs, Supplies, Brewing resources, Breweries: North Dakota, Breweries: Minnesota), url, meta (town/note), sort_order. Defined in `seed/phc-resources.seed.json`. Old hard-coded version in `backups/resources.astro.hardcoded`.

## Hoppy Halloween page (added)
- `src/pages/hoppyhalloween.astro` at `/hoppyhalloween` (same URL as the old site, for SEO). Built from Sara's hoppy-halloween.html design.
- `hoppy_halloween` collection: one entry per competition year (slug = year, e.g. `2026`). The page shows the newest published year (by the `year` field). Fields cover all text, links, banner image, key dates (repeater), banquet schedule (repeater), and 7 theme colors (hex strings, invalid values fall back to defaults). Colors apply to the page body; site header/footer keep the club brand.
- Banner currently points to the external image on prairiehomebrewers.org (seed couldn't download it); replace by uploading in the admin.
- Defined in `seed/phc-hoppy-halloween.seed.json`. Menu "Hoppy Halloween" and homepage feature card link now go to /hoppyhalloween.

## Color picker plugin (added)
- Local native plugin in `plugins/color-picker/` (`index.ts` = plugin definition, `admin.tsx` = React field widget with a swatch + hex input). Registered in `astro.config.mjs` as `phc-colors`.
- Any `string` field with `"widget": "phc-colors:color"` uses it. The 7 Hoppy Halloween `color_*` fields use it.
