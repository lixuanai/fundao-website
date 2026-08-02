import { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import AdvantagesSection from '@/components/home/AdvantagesSection';
import RewardsSection from '@/components/home/RewardsSection';
import LatestNewsSection from '@/components/home/LatestNewsSection';
import PartnersSection from '@/components/home/PartnersSection';
import FAQSection from '@/components/home/FAQSection';
import CTASection from '@/components/home/CTASection';

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }): Promise<Metadata> {
  const isZh = lang === 'zh';
  return {
    title: isZh ? 'FunDAO - 全球首个去中心化增值平台' : 'FunDAO - Decentralized Value Growth Protocol',
    description: isZh
      ? 'FunDAO 通过每日 2.5% 通缩 + 智能熔断 + 自动收益分配 + 流动性缓冲池四重机制，打造去中心化金融新生态。'
      : 'FunDAO — the first decentralized value growth protocol with 2.5% daily deflation, smart circuit breaker, auto yield distribution, and liquidity buffer pool.',
    alternates: {
      canonical: `/${lang}`,
      languages: { zh: '/zh', en: '/en' },
    },
  };
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AdvantagesSection />
      <RewardsSection />
      <LatestNewsSection />
      <PartnersSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
