import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getGuide, getGuideMetadata, guideSlugs } from '../../../../lib/guides.js';
import { locales } from '../../../../lib/seo.js';

const generatorFor = { 'barcode-formats': 'barcode', 'qr-code-basics': 'qr-code' };

export function generateStaticParams() {
  return guideSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  if (!locales.includes(locale) || !guideSlugs.includes(slug)) return {};
  return getGuideMetadata(locale, slug);
}

export default async function GuidePage({ params }) {
  const { locale, slug } = await params;
  const guide = getGuide(locale, slug);
  if (!guide) notFound();
  const toolHref = `/${locale}/tools/${generatorFor[slug]}/`;
  return <main className="guide-page-main">
    <nav className="guide-breadcrumb"><Link href={`/${locale}/`}>tiny.tools</Link><span>/</span><span>{guide.title}</span></nav>
    <article className="guide-article">
      <span className="section-kicker">{guide.relatedTitle}</span>
      <h1>{guide.title}</h1>
      <p className="guide-lead">{guide.lead}</p>
      {guide.table && <div className="guide-table-wrap"><table className="guide-table"><thead><tr>{guide.table.headers.map((heading) => <th key={heading}>{heading}</th>)}</tr></thead><tbody>{guide.table.rows.map((row) => <tr key={row[0]}>{row.map((cell, i) => <td key={i}>{cell}</td>)}</tr>)}</tbody></table></div>}
      {guide.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}</section>)}
      {guide.privacy && <aside className="guide-privacy"><strong>{locale === 'ko' ? '개인정보 처리' : locale === 'ja' ? 'プライバシー' : locale === 'zh' ? '隐私说明' : 'Privacy'}:</strong> {guide.privacy}</aside>}
      <section className="guide-faq-section"><h2>{locale === 'ko' ? '자주 묻는 질문' : locale === 'ja' ? 'よくある質問' : locale === 'zh' ? '常见问题' : 'Frequently asked questions'}</h2>{guide.faqs.map((faq) => <div className="guide-faq" key={faq.q}><h3>{faq.q}</h3><p>{faq.a}</p></div>)}</section>
      <section className="guide-sources"><h2>{locale === 'ko' ? '참고 자료' : locale === 'ja' ? '参考資料' : locale === 'zh' ? '参考资料' : 'References'}</h2><ul>{guide.sources.map((source) => <li key={source.href}><a href={source.href} target="_blank" rel="noopener noreferrer">{source.label}</a></li>)}</ul></section>
      <div className="guide-callout"><p>{guide.cta}</p><Link className="button button-primary" href={toolHref}>{guide.cta}</Link></div>
      <div className="guide-related">{guide.related.map(([relatedSlug, label]) => <Link href={`/${locale}/guides/${relatedSlug}/`} key={relatedSlug}>{label}</Link>)}</div>
    </article>
  </main>;
}
