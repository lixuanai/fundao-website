import { Metadata } from 'next';
import WhitepaperClient from './WhitepaperClient';

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }): Promise<Metadata> {
  const isZh = lang === 'zh';
  return {
    title: isZh ? '白皮书' : 'Whitepaper',
    description: isZh
      ? 'FunDAO 白皮书：代币经济模型、通缩机制、收益分配方案、发展路线图。'
      : 'FunDAO Whitepaper: tokenomics, deflation mechanism, yield distribution, roadmap.',
    alternates: {
      canonical: `/${lang}/whitepaper`,
      languages: { zh: '/zh/whitepaper', en: '/en/whitepaper' },
    },
  };
}

export default function WhitepaperPage() {
  return <WhitepaperClient />;
}
