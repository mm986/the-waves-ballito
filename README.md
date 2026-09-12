# The Waves Beachfront Stay

Static marketing website for **The Waves**, a 3-bedroom beachfront apartment in Salt Rock, Ballito (KwaZulu-Natal, South Africa). The site is a single-page brochure that showcases the property and sends visitors to Booking.com / Airbnb to check availability and book — there's no booking engine or backend here.

**Live site:** https://the-waves-ballito-production.up.railway.app

## Stack

Plain HTML/CSS/JS — no framework, no build step.

```
index.html          Single-page site (hero, gallery, amenities, location, reviews, house rules, booking links)
css/style.css        All styles (design tokens, layout, responsive breakpoints)
js/script.js          Sticky header, mobile nav, scroll-reveal animation, gallery lightbox
assets/images/        Property photos (sourced from the Booking.com / Airbnb listing)
package.json          Only used so Railway can serve the static files (via `serve`)
```

## Running locally

No install needed to just open the file:

```bash
open index.html
```

Or serve it properly (recommended, so relative asset paths behave like production):

```bash
python3 -m http.server 4173
```

Then visit `http://localhost:4173`.

## Deployment

Hosted on [Railway](https://railway.app) as a static site (Nixpacks detects `package.json` and runs `serve -s . -l $PORT`).

```bash
railway up            # deploy the current directory
railway domain        # generate/inspect the public URL
```

## Content sources

Property details, amenities, house rules, and photos were pulled from the live listings:
- Booking.com: https://www.booking.com/Share-FTQgid
- Airbnb: https://www.airbnb.co.za/rooms/1359226054401859183
- Location: https://maps.app.goo.gl/8pE68Bpx9n8nbdH4A
