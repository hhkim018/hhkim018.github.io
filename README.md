# tiny.tools

An international collection of 13 browser-based utilities and practical format guides, rendered as static pages with Next.js App Router.

## Development

```sh
npm install
npm run dev
```

The site uses `/ko`, `/ja`, `/zh`, and `/en` locale paths. Tool slugs are shared across locales, for example `/ko/tools/json-formatter/` and `/ja/tools/json-formatter/`. The barcode and QR tools link to cited usage guides in each language.

## Static export and sitemap

`npm run build` creates the static site in `out/`. It includes a separate HTML page for each language home, tool route, and guide, plus generated `sitemap.xml` and `robots.txt`. Set `SITE_URL` to the canonical production origin before building; the default `https://example.com` is only a placeholder.

```sh
SITE_URL=https://your-domain.example npm run build
```

Barcode and QR image scanning run in the browser. Camera scanning requires HTTPS (or localhost) and camera permission. All tool inputs remain on the device.
