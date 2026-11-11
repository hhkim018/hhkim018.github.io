import { locales, siteOrigin, toolSlugs } from '../lib/seo.js';
import { guideSlugs } from '../lib/guides.js';

export const dynamic = 'force-static';

export default function sitemap() {
  const routes = [
    ...locales.map((locale) => ({ path: `/${locale}/`, priority: 1 })),
    ...locales.flatMap((locale) => toolSlugs.map((slug) => ({ path: `/${locale}/tools/${slug}/`, priority: 0.7 }))),
    ...locales.flatMap((locale) => guideSlugs.map((slug) => ({ path: `/${locale}/guides/${slug}/`, priority: 0.65 }))),
  ];
  return routes.map(({ path, priority }) => {
    const alternatePath = path.replace(/^\/(ko|ja|zh|en)\//, '/');
    const alternates = Object.fromEntries(locales.map((locale) => [locale, `${siteOrigin}/${locale}${alternatePath}`]));
    alternates['x-default'] = `${siteOrigin}/ko${alternatePath}`;
    return { url: `${siteOrigin}${path}`, changeFrequency: 'monthly', priority, alternates: { languages: alternates } };
  });
}
