import { Metadata } from 'next';
import NewsClient from './NewsClient';

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }): Promise<Metadata> {
  const isZh = lang === 'zh';
  return {
    title: isZh ? 'DeFi投资洞察 - 通缩模型与收益分析 | FunDAO新闻' : 'DeFi Insights - Deflationary Tokenomics & Passive Income | FunDAO News',
    description: isZh
      ? 'FunDAO 最新资讯：DeFi行业动态、通缩代币分析、收益策略、生态合作、项目进展。了解去中心化金融最新趋势。'
      : 'Latest FunDAO news: DeFi industry trends, deflationary token analysis, yield strategies, ecosystem partnerships, project updates. Stay informed about decentralized finance.',
    alternates: {
      canonical: `https://www.fundao.fun/${lang}/news`,
      languages: { zh: 'https://www.fundao.fun/zh/news', en: 'https://www.fundao.fun/en/news' },
    },
  };
}

export default function NewsPage() {
  return <NewsClient />;
}
