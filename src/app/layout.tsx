import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'FunDAO - Decentralized Value Growth Protocol',
    template: '%s | FunDAO',
  },
  description: 'FunDAO — the first decentralized value growth protocol. Daily 2.5% deflation, smart circuit breaker, auto yield distribution, and liquidity buffer pool.',
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
    title: 'FunDAO - Decentralized Value Growth Protocol',
    description: 'FunDAO — the first decentralized value growth protocol with 2.5% daily deflation, smart circuit breaker, auto yield distribution, and liquidity buffer pool.',
    url: 'https://www.fundao.fun',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'FunDAO' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FunDAO - Decentralized Value Growth Protocol',
    description: 'FunDAO — the first decentralized value growth protocol with 2.5% daily deflation, smart circuit breaker, auto yield distribution, and liquidity buffer pool.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: ['FunDAO', 'DeFi', 'decentralized finance', 'deflation', 'yield', 'blockchain', 'crypto', '去中心化金融', '通缩', '收益分配'],
  authors: [{ name: 'FunDAO Team' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <head>
        <meta name="baidu-site-verification" content="codeva-SUNQeBA20G" />
      </head>
      <body>{children}</body>
    </html>
  );
}
