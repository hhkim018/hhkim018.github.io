import '../../styles.css';
import '../../guide.css';
import '../../content.css';
import { notFound } from 'next/navigation';
import { locales, siteOrigin } from '../../lib/seo.js';

export const metadata = {
  metadataBase: new URL(siteOrigin),
  applicationName: 'tiny.tools',
  authors: [{ name: 'tiny.tools' }],
  verification: {
    google: '9XbjKuA0Da8N_DHAFYiLkWYFZ0I9jLTWQijWBzGx9-A',
  },
  robots: { index: true, follow: true },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleRootLayout({ children, params }) {
  const { locale } = await params;
  if (!locales.includes(locale)) notFound();
  return <html lang={locale}><body>{children}</body></html>;
}
