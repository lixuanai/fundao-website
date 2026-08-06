import { Metadata } from 'next';
import WhitepaperClient from './WhitepaperClient';

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }): Promise<Metadata> {
  const isZh = lang === 'zh';
  return {
    title: isZh ? 'FunDAO白皮书 - 全球首个去中心化增值平台 | 完整代币经济学' : 'FunDAO Whitepaper - Decentralized Value Growth Protocol | Complete Tokenomics',
    description: isZh
      ? 'FunDAO 白皮书：FUN代币经济模型（总供应21亿枚）、每日2.5%通缩销毁机制、60/25/15收益分配方案、智能熔断保护、2026-2027发展路线图。'
      : 'FunDAO Whitepaper: FUN tokenomics (2.1B total supply), 2.5% daily deflation burn mechanism, 60/25/15 yield distribution, smart circuit breaker protection, 2026-2027 roadmap.',
    alternates: {
      canonical: `https://www.fundao.fun/${lang}/whitepaper`,
      languages: { zh: 'https://www.fundao.fun/zh/whitepaper', en: 'https://www.fundao.fun/en/whitepaper' },
    },
  };
}

export default function WhitepaperPage() {
  return <WhitepaperClient />;
}
