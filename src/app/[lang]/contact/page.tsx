import { Metadata } from 'next';
import ContactClient from './ContactClient';

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }): Promise<Metadata> {
  const isZh = lang === 'zh';
  return {
    title: isZh ? '联系我们' : 'Contact Us',
    description: isZh
      ? '联系 FunDAO 团队：Telegram、Discord、微信、QQ 等多渠道联系方式。'
      : 'Contact FunDAO team via Telegram, Discord, WeChat, QQ and more.',
    alternates: {
      canonical: `https://www.fundao.fun/${lang}/contact`,
      languages: { zh: 'https://www.fundao.fun/zh/contact', en: 'https://www.fundao.fun/en/contact' },
    },
  };
}

export default function ContactPage() {
  return <ContactClient />;
}
