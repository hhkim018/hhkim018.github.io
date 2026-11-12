import '../../styles.css';
import '../../guide.css';
import '../../content.css';
import Script from 'next/script';
import { siteOrigin } from '../../lib/seo.js';
import Analytics from '../../ui/Analytics.jsx';

export const metadata = {
  metadataBase: new URL(siteOrigin),
  applicationName: 'tiny.tools',
  authors: [{ name: 'tiny.tools' }],
  verification: { google: 'RjegwsZIjygPtCp8UKzWMQNRuBlBc4wAED6wxa7QFFo' },
  robots: { index: true, follow: true },
};

export default function KoreanRootLayout({ children }) {
  return <html lang="ko"><body><Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5537642356328146" crossOrigin="anonymous" strategy="beforeInteractive" /><Analytics />{children}</body></html>;
}
