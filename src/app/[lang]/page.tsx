import Script from 'next/script';
import zhMessages from '@/messages/zh.json';
import enMessages from '@/messages/en.json';
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
    title: isZh ? 'FunDAO - 去中心化增值平台 | BSC每日通缩2.5% | DeFi被动收入' : 'FunDAO - Decentralized Yield Platform | Daily 2.5% Deflation | BSC DeFi',
    description: isZh
      ? 'FunDAO 是全球首个去中心化增值平台，BSC每日通缩2.5%，智能熔断保护，自动收益分配，0.1 BNB即可参与DeFi被动收入。13家顶级机构参投，六无安全架构。'
      : 'FunDAO is the first decentralized yield platform on BSC with 2.5% daily deflation, smart circuit breaker protection, auto yield distribution. Start with 0.1 BNB. Backed by 13 top crypto funds.',
    alternates: {
      canonical: `https://www.fundao.fun/${lang}`,
      languages: { zh: 'https://www.fundao.fun/zh', en: 'https://www.fundao.fun/en' },
    },
  };
}


const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'FunDAO',
  url: 'https://www.fundao.fun',
  logo: 'https://www.fundao.fun/og-image.png',
  description: 'FunDAO 是全球首个去中心化增值平台，BSC每日通缩2.5%，智能熔断保护，自动收益分配。',
  foundingDate: '2025',
  sameAs: [
    'https://t.me/fundao_official',
    'https://twitter.com/fundao_official',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    url: 'https://www.fundao.fun/contact',
  },
};


function getFaqSchema(lang: string) {
  const messages = lang === 'zh' ? zhMessages : enMessages;
  const faqItems = messages.home?.faq?.items || [];
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item: { question: string; answer: string }) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export default function HomePage({ params: { lang } }: { params: { lang: string } }) {
  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getFaqSchema(lang)) }}
      />
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
