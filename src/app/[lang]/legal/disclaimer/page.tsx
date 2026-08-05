import { Metadata } from 'next';
import LegalClient from './LegalClient';

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }): Promise<Metadata> {
  const isZh = lang === 'zh';
  return {
    title: isZh ? '风险声明' : 'Risk Disclaimer',
    description: isZh ? 'FunDAO 风险声明：投资加密货币存在风险，请谨慎决策。' : 'FunDAO Risk Disclaimer: cryptocurrency investment carries risks, please decide carefully.',
    alternates: {
      canonical: `https://www.fundao.fun/${lang}/legal/disclaimer`,
      languages: { zh: `https://www.fundao.fun/zh/legal/disclaimer`, en: `https://www.fundao.fun/en/legal/disclaimer` },
    },
  };
}

export default function LegalPage() {
  return <LegalClient />;
}
