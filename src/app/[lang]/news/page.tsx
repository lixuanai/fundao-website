import { Metadata } from 'next';
import NewsClient from './NewsClient';

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }): Promise<Metadata> {
  const isZh = lang === 'zh';
  return {
    title: isZh ? '新闻动态' : 'News',
    description: isZh
      ? 'FunDAO 最新资讯：行业新闻、生态合作、项目动态。'
      : 'Latest FunDAO news: industry updates, ecosystem partnerships, project milestones.',
    alternates: {
      canonical: `https://www.fundao.fun/${lang}/news`,
      languages: { zh: 'https://www.fundao.fun/zh/news', en: 'https://www.fundao.fun/en/news' },
    },
  };
}

export default function NewsPage() {
  return <NewsClient />;
}
