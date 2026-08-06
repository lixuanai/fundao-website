import { Metadata } from 'next';
import ContactClient from './ContactClient';

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }): Promise<Metadata> {
  const isZh = lang === 'zh';
  return {
    title: isZh ? '加入FunDAO - 连接钱包参与DeFi被动收入' : 'Join FunDAO - Connect Wallet & Start Earning DeFi Passive Income',
    description: isZh
      ? '加入 FunDAO 社区，开启DeFi被动收入之旅。0.1 BNB即可参与，每日通缩2.5%。联系官方：Telegram、Discord、微信、QQ。'
      : 'Join FunDAO community and start your DeFi passive income journey. Start with 0.1 BNB, enjoy 2.5% daily deflation. Contact us via Telegram, Discord, WeChat, QQ.',
    alternates: {
      canonical: `https://www.fundao.fun/${lang}/contact`,
      languages: { zh: 'https://www.fundao.fun/zh/contact', en: 'https://www.fundao.fun/en/contact' },
    },
  };
}

export default function ContactPage() {
  return <ContactClient />;
}
