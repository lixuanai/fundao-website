import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'FunDAO - 去中心化增值平台 | BSC每日通缩2.5% | DeFi被动收入',
    template: '%s | FunDAO',
  },
  description: 'FunDAO 是全球首个去中心化增值平台，BSC每日通缩2.5%，智能熔断保护，自动收益分配，0.1 BNB即可参与DeFi被动收入。13家顶级机构参投，六无安全架构。',
  metadataBase: new URL('https://www.fundao.fun'),
  alternates: {
    canonical: 'https://www.fundao.fun/',
    languages: {
      'zh': 'https://www.fundao.fun/zh',
      'en': 'https://www.fundao.fun/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    alternateLocale: ['en_US'],
    siteName: 'FunDAO',
    title: 'FunDAO - 去中心化增值平台 | BSC每日通缩2.5% | 0.1BNB即可参与',
    description: 'FunDAO 是全球首个去中心化增值平台，BSC每日通缩2.5%，智能熔断保护，自动收益分配，0.1 BNB即可参与DeFi被动收入。13家顶级机构参投，六无安全架构。',
    url: 'https://www.fundao.fun',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'FunDAO' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FunDAO - 去中心化增值平台 | BSC每日通缩2.5% | 0.1BNB即可参与',
    description: 'FunDAO 是全球首个去中心化增值平台，BSC每日通缩2.5%，智能熔断保护，自动收益分配，0.1 BNB即可参与DeFi被动收入。13家顶级机构参投，六无安全架构。',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: ['FunDAO', 'DeFi', 'decentralized finance', 'deflation token', 'passive income crypto', 'BSC projects', 'yield farming', 'circuit breaker', '去中心化金融', '通缩代币', '被动收入', 'DeFi投资', 'BSC项目', '每日通缩', '熔断机制', '收益分配', 'FUN代币', '币安智能链'],
  authors: [{ name: 'FunDAO Team' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
