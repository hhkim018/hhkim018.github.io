import ToolApp from '../../ui/ToolApp.jsx';
import { homeMetadata } from '../../lib/seo.js';

export const metadata = homeMetadata('ko');

export default function RootPage() {
  return <ToolApp locale="ko" />;
}
