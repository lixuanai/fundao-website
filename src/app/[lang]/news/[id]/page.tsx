import Script from 'next/script';
import { Metadata } from 'next';
import Link from 'next/link';
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
  const isZh = params.lang === 'zh';

  if (!article) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📭</div>
          <p className="text-gray-400 text-lg">{isZh ? '文章未找到' : 'Article not found'}</p>
          <Link href={`/${params.lang}/news`} className="text-purple-600 hover:text-purple-800 mt-4 inline-block">
            ← {isZh ? '返回新闻列表' : 'Back to News'}
          </Link>
        </div>
      </div>
    );
  }

  const title = isZh ? article.title_zh : article.title_en;
  const content = isZh ? article.content_zh : article.content_en;
  const coverImage = isZh ? (article.cover_image_en || article.cover_image) : article.cover_image;
  const category = isZh ? (article.category_en || article.category) : article.category;
  const dateStr = article.created_at?.split('T')[0] || '';

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: article.excerpt_zh || article.content_zh.replace(/<[^>]+>/g, '').slice(0, 160),
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
  };

  return (
    <>
      <Script
        id="article-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="min-h-screen pt-24 pb-20">
        <div className="mesh-gradient opacity-30"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={`/${params.lang}/news`}
            className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-8 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {isZh ? '返回新闻列表' : 'Back to News'}
          </Link>

          <article className="glass-card rounded-3xl p-6 sm:p-8">
            <div className="flex items-center space-x-2 mb-6">
              <span className="tag-purple">{category}</span>
              <span className="text-sm text-gray-500">By Mr.Xuan · {dateStr}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text mb-6 sm:mb-8 leading-tight">
              {title}
            </h1>

            {coverImage && (
              <img
                src={coverImage}
                alt={title}
                className="w-full rounded-2xl mb-8 shadow-lg"
              />
            )}

            <div
              className="prose max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </article>
        </div>
      </div>
    </>
  );
}
