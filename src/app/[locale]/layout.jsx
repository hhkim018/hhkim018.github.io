import '../../styles.css';
import '../../guide.css';
import '../../content.css';
import { notFound } from 'next/navigation';
import { locales, siteOrigin } from '../../lib/seo.js';
import Analytics from '../../ui/Analytics.jsx';

export const metadata = {
  metadataBase: new URL(siteOrigin),
  applicationName: 'Tools',
  authors: [{ name: 'Tools' }],
  other: { 'google-adsense-account': 'ca-pub-5537642356328146' },
  verification: { google: 'RjegwsZIjygPtCp8UKzWMQNRuBlBc4wAED6wxa7QFFo' },
  robots: { index: true, follow: true },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleRootLayout({ children, params }) {
  const { locale } = await params;
  if (!locales.includes(locale)) notFound();
  return <html lang={locale}><body><Analytics />{children}</body></html>;
}
