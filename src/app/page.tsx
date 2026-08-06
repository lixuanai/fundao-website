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
    <>
      <meta httpEquiv="refresh" content="0;url=/zh" />
      <div style={{ textAlign: 'center', paddingTop: '40vh', fontFamily: 'system-ui, sans-serif' }}>
        <p style={{ fontSize: '18px', color: '#666' }}>Redirecting to FunDAO...</p>
        <p><a href="/zh" style={{ color: '#7c3aed' }}>Click here if not redirected</a></p>
      </div>
    </>
  );
}
