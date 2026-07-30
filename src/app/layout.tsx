import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FunDAO - 全球首个去中心化增值平台',
  description: 'FunDAO 通过每日 2.5% 通缩 + 智能熔断 + 自动收益分配 + 流动性缓冲池四重机制，打造去中心化金融新生态',
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
