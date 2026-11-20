import { locales, siteOrigin, toolSlugs } from './seo.js';
import { guideSlugs } from './guides.js';

export default function sitemap() {
  const routes = [
    ...locales.map((locale) => ({ path: `/${locale}/` })),
    ...locales.flatMap((locale) => toolSlugs.map((slug) => ({ path: `/${locale}/tools/${slug}/` }))),
    ...locales.flatMap((locale) => guideSlugs.map((slug) => ({ path: `/${locale}/guides/${slug}/` }))),
  ];

  return routes.map(({ path }) => ({
    url: `${siteOrigin}${path}`,
  }));
}
