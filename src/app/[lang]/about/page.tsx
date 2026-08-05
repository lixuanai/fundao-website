import { Metadata } from 'next';
import AboutClient from './AboutClient';

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }): Promise<Metadata> {
  const isZh = lang === 'zh';
  return {
    title: isZh ? '关于我们' : 'About Us',
    description: isZh
      ? '了解 FunDAO 的使命、愿景、四大核心原则以及 13 家投资机构。'
      : "Learn about FunDAO's mission, vision, four core principles, and 13 institutional investors.",
    alternates: {
      canonical: `https://www.fundao.fun/${lang}/about`,
      languages: { zh: 'https://www.fundao.fun/zh/about', en: 'https://www.fundao.fun/en/about' },
    },
  };
}

export default function AboutPage() {
  return <AboutClient />;
}
