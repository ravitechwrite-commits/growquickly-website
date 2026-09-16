# GrowQuickly website

Standalone React + Vite source for the GrowQuickly local-business growth website.

## Requirements

- Node.js 20 or newer
- npm 10+ or pnpm 9+

## Run locally

```bash
cd growquickly
npm install
npm run dev
```

Open http://localhost:5173.

## Build for production

```bash
npm run build
npm run serve
```

## Before publishing

Replace the placeholder phone number, WhatsApp number, and email near the top of `src/App.tsx`. The current contact form displays a confirmation state; connect it to your preferred email, WhatsApp, or form service before using it for live leads.
