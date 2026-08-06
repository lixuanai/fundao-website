import { Metadata } from 'next';
import AboutClient from './AboutClient';

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }): Promise<Metadata> {
  const isZh = lang === 'zh';
  return {
    title: isZh ? '关于FunDAO - 13家顶级机构参投 | 六无安全架构' : 'About FunDAO - 13 Top Crypto Funds | Six-Zero Security Architecture',
    description: isZh
      ? 'FunDAO 使命、愿景、四大创建初心。13家顶级加密基金联合支持（Dragonfly、Animoca Brands等）。六无安全架构：无项目方、无私募、无预留、无鼠仓、无后门、无管理权限。'
      : 'FunDAO mission, vision, and four founding principles. Backed by 13 top crypto funds (Dragonfly, Animoca Brands, etc.). Six-Zero security architecture: no team allocation, no private sale, no reserve, no backdoor, no admin rights.',
    alternates: {
      canonical: `https://www.fundao.fun/${lang}/about`,
      languages: { zh: 'https://www.fundao.fun/zh/about', en: 'https://www.fundao.fun/en/about' },
    },
  };
}

export default function AboutPage() {
  return <AboutClient />;
}
