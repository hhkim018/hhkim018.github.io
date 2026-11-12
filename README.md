# tiny.tools

An international collection of browser-based utilities and practical format guides, rendered as static pages with Next.js App Router.

## Development

```sh
npm install
npm run dev
```

The site uses `/ko`, `/ja`, `/zh`, and `/en` locale paths. Tool slugs are shared across locales, for example `/ko/tools/json-formatter/` and `/ja/tools/json-formatter/`. The barcode and QR tools link to cited usage guides in each language.

## Build and GitHub Pages

`npm run build` creates a static site in `out/`, ready to publish with GitHub Pages. Pages are generated for each language home, tool, and guide, along with `sitemap.xml` and `robots.txt`. In GitHub Actions, set `SITE_URL` to the Pages origin and `NEXT_PUBLIC_BASE_PATH` to the Pages path before building. For a repository site these are typically `https://<owner>.github.io` and `/<repository>`; for a user or organization site the base path is empty. `actions/configure-pages` provides both values as workflow outputs.

Barcode and QR image scanning run in the browser. Camera scanning requires HTTPS (or localhost) and camera permission. All tool inputs remain on the device.
