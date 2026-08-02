import { Metadata } from 'next';
import ProductsClient from './ProductsClient';

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }): Promise<Metadata> {
  const isZh = lang === 'zh';
  return {
    title: isZh ? '产品与服务' : 'Products & Services',
    description: isZh
      ? 'FunDAO 四大核心机制：每日通缩销毁、直推奖励、自动收益分配、智能熔断保护。'
      : "FunDAO's four core mechanisms: daily deflation, referral rewards, auto yield distribution, smart circuit breaker.",
    alternates: {
      canonical: `/${lang}/products`,
      languages: { zh: '/zh/products', en: '/en/products' },
    },
  };
}

export default function ProductsPage() {
  return <ProductsClient />;
}
