# Quận 1 homepage rebuild

This bundle rebuilds `index.html` using the existing Locale/Bootstrap-based styles and the current working Hero Morph component, removes the War Remnants Museum/demo listings, restores a coherent location search and guide layout, and replaces the external map iframe with a Leaflet/OpenStreetMap map.

## Install

1. Back up your existing `index.html` (for example, `index-before-rebuild.html`).
2. Extract this ZIP into the **same project folder as your current `index.html`**, allowing the bundle's `index.html` and `assets/` files to be added/replaced.
3. Keep your existing `assets/vendor/bootstrap6/css/bootstrap.min.css`, `assets/css/base.css`, and `assets/css/style.css`. They are referenced by the rebuilt page and are not included in this bundle.
4. Open `index.html` in VS Code Live Server.

## Files in this bundle

- `index.html` — rebuilt homepage with header, animated hero, searchable listings, guide cards, detail drawer, and map section.
- `assets/css/hero-morph.css` — hero styles plus a responsive, centered landmark-detail modal.
- `assets/js/hero-morph.js` — existing animation implementation retained, with approximate coordinates, shared location data, and a detailed modal for all 16 landmarks.
- `assets/css/district1-home.css` — page-level visual styling and responsive layout.
- `assets/js/district1-home.js` — search/filter, destination cards, and Leaflet map.

## Notes

- The hero's main animation parameters remain `IDLE_SPIN = 8`, `MORPH_END = 600`, and `MAX_SCROLL = 1800`.
- The map uses Leaflet 1.9.4 and OpenStreetMap tiles. An Internet connection is required; OpenStreetMap attribution is included on the map.
- Map pins use approximate guide coordinates to place attractions in context. Confirm precise coordinates and verify address, opening hours, ticket prices, and photo licenses before publishing a public visitor guide.
- Location images still reference external URLs. If one fails, the listings show a text fallback; the hero includes its own fallback.
- JavaScript syntax was checked with Node. The page has not been tested in the user's actual project/browser, so please run it in Live Server and review the Console before publishing.

## Landmark details modal

Click a hero card, a listing card’s “Xem thông tin” button, or a map popup’s “Thông tin” button to open a shared detailed modal. Each of the 16 places includes a summary, additional context, highlights, a suggested visit duration, suggested time of day, visitor tips, existing hours/ticket fields, and a Google Maps link. Visit duration and best-time suggestions are editorial guidance; opening hours, tickets, and access conditions must be verified before publication.
