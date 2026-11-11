import { notFound } from 'next/navigation';
import ToolApp from '../../../../ui/ToolApp.jsx';
import { locales, toolMetadata, toolSlugs } from '../../../../lib/seo.js';

export function generateStaticParams({ params }) {
  return toolSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  if (!locales.includes(locale) || !toolSlugs.includes(slug)) return {};
  return toolMetadata(locale, slug);
}

export default async function ToolRoute({ params }) {
  const { locale, slug } = await params;
  if (!locales.includes(locale) || !toolSlugs.includes(slug)) notFound();
  return <ToolApp locale={locale} slug={slug} />;
}
