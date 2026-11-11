import '../../styles.css';
import '../../guide.css';
import '../../content.css';
import { siteOrigin } from '../../lib/seo.js';
import Analytics from '../../ui/Analytics.jsx';

export const metadata = {
  metadataBase: new URL(siteOrigin),
  applicationName: 'tiny.tools',
  authors: [{ name: 'tiny.tools' }],
  verification: {
    google: '9XbjKuA0Da8N_DHAFYiLkWYFZ0I9jLTWQijWBzGx9-A',
  },
  robots: { index: true, follow: true },
};

export default function KoreanRootLayout({ children }) {
  return <html lang="ko"><body><Analytics />{children}</body></html>;
}
