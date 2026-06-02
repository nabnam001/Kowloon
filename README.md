# Kowloon Aarhus — Website

A modern, animated, fully static rebuild of [kowloon.dk](https://www.kowloon.dk) — the Chinese, Thai & Vietnamese restaurant in central Aarhus, serving since 1999.

No backend. Everything is a static export, so it deploys anywhere (Vercel, Netlify, any static host) and there are no servers, databases, or APIs to maintain. The services the restaurant offers stay exactly as they are: **table booking and take-away are handled by phone or in person — never online.**

## Tech stack

- **Next.js 14** (App Router) with `output: "export"` → pure static HTML/CSS/JS
- **Tailwind CSS** for styling (brand colors pulled from the original logo: indigo `#2C2276`, chilli red `#DD2627`)
- **Framer Motion** for scroll-triggered reveals, parallax, and micro-interactions
- **TypeScript** throughout

## Features

- Cinematic Hong Kong–night hero with parallax + the real restaurant interior
- Interactive, filterable menu (all 88 dishes): filter by cuisine, vegetarian, vegan, new, or spicy; live search; dish detail modal with allergens and a chilli heat meter
- Full set-menu builder (2-course 165,- / 3-course 205,-), take-away box prices, and extras
- Drinks & wine browser (tabbed), including the full 201–212 wine list
- Two-location section with real photos, click-to-call, and map links
- Opening hours that highlight today, plus contact + Facebook
- Danish 🇩🇰 / English 🇬🇧 language toggle (persists in localStorage, updates `<html lang>`)
- Fully responsive, WCAG-minded accessibility: visible focus rings on every control, skip link, `aria-pressed`/`aria-current`/`aria-live`, modal focus management, and full `prefers-reduced-motion` support that disables parallax and looping animations
- SEO + JSON-LD structured data, generated Open Graph share image, web manifest, branded SVG favicon

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build & deploy

```bash
npm run build    # outputs static site to ./out
```

Deploy the `out/` folder to any static host. Config for **Vercel** (`vercel.json`) and **Netlify** (`netlify.toml`) is included, both with security headers (HSTS, X-Frame-Options, CSP via `public/_headers`).

## Assets

The original food/logo images live in the source folders (`forretter/`, `kina/`, `thailand/`, etc.) with messy unicode filenames. The script `scripts/prepare-images.mjs` copies them into clean web paths under `public/images/` and runs automatically before `dev` and `build`. To map a new dish photo, add an entry to that script.

## Content

All menu items, prices, descriptions, allergens, hours, and contact details are transcribed from the live kowloon.dk site into `data/` (`menu.ts`, `drinks.ts`, `site.ts`, `i18n.ts`). Update those files to change content — no code changes needed.

## Notes

All menu items now have a photo. Every dish, drink, and wine maps to a real image via `scripts/prepare-images.mjs`. To add or swap a photo, drop the file into the relevant source folder and add/update one line in that script.
