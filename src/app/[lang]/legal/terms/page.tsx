import { Metadata } from 'next';
import LegalClient from './LegalClient';

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }): Promise<Metadata> {
  const isZh = lang === 'zh';
  return {
    title: isZh ? '服务条款' : 'Terms of Service',
    description: isZh ? 'FunDAO 服务条款：使用 FunDAO 平台前请阅读以下条款。' : 'FunDAO Terms of Service: please read before using the FunDAO platform.',
    alternates: {
      canonical: `/${lang}/legal/terms`,
      languages: { zh: `/zh/legal/terms`, en: `/en/legal/terms` },
    },
  };
}

export default function LegalPage() {
  return <LegalClient />;
}
