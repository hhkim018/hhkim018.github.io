# tiny.tools

An international collection of 13 browser-based utilities and practical format guides, rendered as static pages with Next.js App Router.

## Development

```sh
npm install
npm run dev
```

The site uses `/ko`, `/ja`, `/zh`, and `/en` locale paths. Tool slugs are shared across locales, for example `/ko/tools/json-formatter/` and `/ja/tools/json-formatter/`. The barcode and QR tools link to cited usage guides in each language.

## Build and sitemap

`npm run build` creates a standalone Next.js server bundle in `.next/standalone/`, including the server manifests required by the deployment environment. Pages are statically generated where possible, including each language home, tool route, and guide, plus `sitemap.xml` and `robots.txt`. The canonical production origin defaults to `https://tools.gogo-tools.workers.dev`; set `SITE_URL` only when building for a different domain.

```sh
SITE_URL=https://tools.gogo-tools.workers.dev npm run build
```

Barcode and QR image scanning run in the browser. Camera scanning requires HTTPS (or localhost) and camera permission. All tool inputs remain on the device.
