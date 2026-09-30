# Golden Leaf Properties

Responsive real-estate website for Golden Leaf Properties Private Limited.

## Local Development

```bash
npm install
npm run dev -- --host 127.0.0.1 --port 3002
```

## Vercel Deployment

Import this repository into Vercel. The included `vercel.json` uses:

- Build command: `npm run build:vercel`
- Output directory: `vercel-dist`
- SPA rewrites for all routes

The local Codex/Sites preview can still use `npm run dev`; Vercel should use the static Vite build path above.
