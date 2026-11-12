import '../../styles.css';
import '../../guide.css';
import '../../content.css';
import { siteOrigin } from '../../lib/seo.js';
import Analytics from '../../ui/Analytics.jsx';

export const metadata = {
  metadataBase: new URL(siteOrigin),
  applicationName: 'Tools',
  authors: [{ name: 'Tools' }],
  other: { 'google-adsense-account': 'ca-pub-5537642356328146' },
  verification: { google: 'RjegwsZIjygPtCp8UKzWMQNRuBlBc4wAED6wxa7QFFo' },
  robots: { index: true, follow: true },
};

export default function KoreanRootLayout({ children }) {
  return <html lang="ko"><body><Analytics />{children}</body></html>;
}
