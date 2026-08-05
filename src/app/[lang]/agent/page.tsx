import { Metadata } from 'next';
import AgentClient from './AgentClient';

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }): Promise<Metadata> {
  const isZh = lang === 'zh';
  return {
    title: isZh ? 'Agent 门户' : 'Agent Portal',
    description: isZh
      ? 'FunDAO Agent 门户：API 文档、操作端口、开发者资源。'
      : 'FunDAO Agent Portal: API docs, operation endpoints, developer resources.',
    alternates: {
      canonical: `https://www.fundao.fun/${lang}/agent`,
      languages: { zh: 'https://www.fundao.fun/zh/agent', en: 'https://www.fundao.fun/en/agent' },
    },
  };
}

export default function AgentPage() {
  return <AgentClient />;
}
