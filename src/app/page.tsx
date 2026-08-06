import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FunDAO - Decentralized Value Growth Protocol',
  description: 'FunDAO — the first decentralized value growth protocol.',
  other: {
    'baidu-site-verification': 'codeva-SUNQeBA20G',
  },
};

export default function RootPage() {
  return (
    <div>
      <meta name="baidu-site-verification" content="codeva-SUNQeBA20G" />
      <p>Redirecting to <a href="/zh">FunDAO</a>...</p>
    </div>
  );
}
