import { Metadata } from 'next';
import LegalClient from './LegalClient';

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }): Promise<Metadata> {
  const isZh = lang === 'zh';
  return {
    title: isZh ? '隐私政策' : 'Privacy Policy',
    description: isZh ? 'FunDAO 隐私政策：我们如何收集、使用和保护您的个人信息。' : 'FunDAO Privacy Policy: how we collect, use and protect your personal information.',
    alternates: {
      canonical: `https://www.fundao.fun/${lang}/legal/privacy`,
      languages: { zh: `https://www.fundao.fun/zh/legal/privacy`, en: `https://www.fundao.fun/en/legal/privacy` },
    },
  };
}

export default function LegalPage() {
  return <LegalClient />;
}
