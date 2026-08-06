import { Metadata } from 'next';
import AgentClient from './AgentClient';

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }): Promise<Metadata> {
  const isZh = lang === 'zh';
  return {
    title: isZh ? 'FunDAO Agent门户 - API文档与开发者资源' : 'FunDAO Agent Portal - API Documentation & Developer Resources',
    description: isZh
      ? 'FunDAO Agent 门户：完整API文档、操作端口、开发者资源。集成FunDAO协议，构建去中心化应用。'
      : 'FunDAO Agent Portal: Complete API documentation, operation endpoints, developer resources. Integrate FunDAO protocol and build decentralized applications.',
    alternates: {
      canonical: `https://www.fundao.fun/${lang}/agent`,
      languages: { zh: 'https://www.fundao.fun/zh/agent', en: 'https://www.fundao.fun/en/agent' },
    },
  };
}

export default function AgentPage() {
  return <AgentClient />;
}
