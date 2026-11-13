import { siteOrigin } from '../lib/seo.js';

export const dynamic = 'force-static';

export default function robots() {
  return { rules: { userAgent: '*', allow: '/' }, sitemap: `${siteOrigin}/sitemap.xml` };
}
