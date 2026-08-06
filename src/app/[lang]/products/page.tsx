import { Metadata } from 'next';
import ProductsClient from './ProductsClient';

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }): Promise<Metadata> {
  const isZh = lang === 'zh';
  return {
    title: isZh ? '每日通缩2.5% + 三级熔断 - FunDAO核心机制' : 'Daily Deflation 2.5% + Circuit Breaker - FunDAO Core Mechanisms',
    description: isZh
      ? 'FunDAO 四大核心机制：每日通缩2.5%销毁、直推奖励15%、社区激励35%、周分红15%、智能熔断保护。60/25/15透明资金分配，0.1 BNB即可参与。'
      : 'FunDAO four core mechanisms: 2.5% daily deflation burn, 15% direct referral rewards, 35% community incentives, 15% weekly dividends, smart circuit breaker protection. Transparent 60/25/15 fund allocation, start with 0.1 BNB.',
    alternates: {
      canonical: `https://www.fundao.fun/${lang}/products`,
      languages: { zh: 'https://www.fundao.fun/zh/products', en: 'https://www.fundao.fun/en/products' },
    },
  };
}

export default function ProductsPage() {
  return <ProductsClient />;
}
