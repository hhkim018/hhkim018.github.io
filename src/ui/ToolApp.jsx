'use client';

import App from './App.jsx';

export default function ToolApp({ locale, slug = null }) {
  const initialPath = `/${locale}${slug ? `/tools/${slug}` : ''}`;
  return <App key={initialPath} initialPath={initialPath} />;
}
