import { Metadata } from 'next';
import ArticleClient from './ArticleClient';

async function getArticle(id: string) {
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
    return {
      title: isZh ? '文章未找到' : 'Article Not Found',
    };
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

export default function ArticleDetailPage({ params }: { params: { id: string; lang: string } }) {
  return <ArticleClient params={params} />;
}
