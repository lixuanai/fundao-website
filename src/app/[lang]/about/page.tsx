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
      canonical: `/${lang}/about`,
      languages: { zh: '/zh/about', en: '/en/about' },
    },
  };
}

export default function AboutPage() {
  return <AboutClient />;
}
