# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

React single-page app that displays the user's public IP address along with geolocation and network details (city, region, country, ISP, IP type). Uses ipapi.co for data (free, no API key).

## Commands

```bash
npm run dev      # Start dev server (http://localhost:5173)
npm run build    # Production build to dist/
npm run preview  # Preview production build locally
```

## Architecture

```
src/
  App.jsx           — Main component: fetches IP data, renders grid layout, handles copy & error states
  api/ip.js         — Fetch wrapper for ipapi.co with 10s timeout and error handling
  components/
    Card.jsx         — Reusable info card with title + content
    ErrorBanner.jsx  — Error display with retry button
  index.css          — Tailwind imports + dark theme base styles
  main.jsx           — Entry point
```

## Tech Stack

React 18, Vite, Tailwind CSS v4, ipapi.co API

## Key Files

- `vite.config.js` — Vite + React plugin config
- `tailwind.config.js` — Tailwind content glob for `src/**/*.{js,jsx}`
- `postcss.config.js` — Uses `@tailwindcss/postcss` (Tailwind v4)
- `index.html` — Entry HTML, loads Inter font, sets `<div id="root">`

## Development Notes

- Tailwind v4 uses `@import "tailwindcss"` in CSS (not `@tailwind` directives)
- PostCSS plugin is `@tailwindcss/postcss`, not `tailwindcss`
- The app uses ipapi.co which returns JSON with: ip, city, region, country_name, org, ipv4/ipv6 fields
- Layout is responsive: 1 col on mobile, 2 on tablet, 3 on desktop
- Dark theme with slate color palette, cyan accent for IP display
