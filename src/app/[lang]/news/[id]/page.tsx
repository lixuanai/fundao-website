import Script from 'next/script';
import { Metadata } from 'next';
import ArticleClient from './ArticleClient';
import articlesData from '@/data/seed-articles.json';

async function getArticle(id: string) {
  const localArticle = (articlesData as any[]).find(a => a.id === id || a.slug === id);
  if (localArticle) return localArticle;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'https://fundao.fun'}/api/articles/${id}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { id: string; lang: string } }): Promise<Metadata> {
  const article = await getArticle(params.id);
  const isZh = params.lang === 'zh';

  if (!article) {
    return { title: isZh ? '文章未找到' : 'Article Not Found' };
  }

  const title = isZh ? article.title_zh : article.title_en;
  const content = isZh ? article.content_zh : article.content_en;
  const description = content.replace(/<[^>]+>/g, '').slice(0, 160);

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.fundao.fun/${params.lang}/news/${params.id}`,
      languages: { zh: `https://www.fundao.fun/zh/news/${params.id}`, en: `https://www.fundao.fun/en/news/${params.id}` },
    },
    openGraph: {
      title,
      description,
      type: 'article',
      images: article.cover_image ? [{ url: article.cover_image }] : undefined,
    },
  };
}

export default async function ArticleDetailPage({ params }: { params: { id: string; lang: string } }) {
  const article = await getArticle(params.id);

  const articleSchema = article
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: params.lang === 'zh' ? article.title_zh : article.title_en,
        description:
          article.excerpt_zh || article.content_zh.replace(/<[^>]+>/g, '').slice(0, 160),
        image: article.cover_image
          ? `https://www.fundao.fun${article.cover_image}`
          : 'https://www.fundao.fun/og-image.png',
        datePublished: article.created_at,
        dateModified: article.updated_at,
        author: {
          '@type': 'Person',
          name: 'Mr.Xuan',
          url: 'https://www.fundao.fun',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Mr.Xuan',
          logo: {
            '@type': 'ImageObject',
            url: 'https://www.fundao.fun/og-image.png',
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://www.fundao.fun/${params.lang}/news/${params.id}`,
        },
      }
    : null;

  return (
    <>
      {articleSchema && (
        <Script
          id="article-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      )}
      <ArticleClient articleId={params.id} lang={params.lang} initialArticle={article} />
    </>
  );
}
