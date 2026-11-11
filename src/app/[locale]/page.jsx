import { notFound } from 'next/navigation';
import ToolApp from '../../ui/ToolApp.jsx';
import { homeMetadata, locales } from '../../lib/seo.js';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (!locales.includes(locale)) return {};
  return homeMetadata(locale);
}

export default async function LocaleHomePage({ params }) {
  const { locale } = await params;
  if (!locales.includes(locale)) notFound();
  return <ToolApp locale={locale} />;
}
