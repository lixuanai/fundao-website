import { Metadata } from 'next';
import LegalClient from './LegalClient';

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }): Promise<Metadata> {
  const isZh = lang === 'zh';
  return {
    title: isZh ? '风险声明' : 'Risk Disclaimer',
    description: isZh ? 'FunDAO 风险声明：投资加密货币存在风险，请谨慎决策。' : 'FunDAO Risk Disclaimer: cryptocurrency investment carries risks, please decide carefully.',
    alternates: {
      canonical: `/${lang}/legal/disclaimer`,
      languages: { zh: `/zh/legal/disclaimer`, en: `/en/legal/disclaimer` },
    },
  };
}

export default function LegalPage() {
  return <LegalClient />;
}
