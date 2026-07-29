'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ArticleDetailPage({ params }: { params: { id: string; lang: string } }) {
  
  const tCommon = useTranslations('common');
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'zh';

  const article = {
    id: params.id,
    title: currentLocale === 'zh' ? 'FunDAO 生态再创新高' : 'FunDAO Ecosystem Reaches New Heights',
    content: currentLocale === 'zh'
      ? `
        <p>FunDAO 生态系统持续蓬勃发展，最新数据显示持币人数已突破 7,700 人，30天内涨幅超过18倍，社区规模持续壮大。</p>
        
        <h2>生态数据亮眼</h2>
        <p>自上线以来，FunDAO 凭借其创新的 DAO 治理模式和收益分配机制，吸引了大量用户参与。目前持币地址数已达到 7,739 个，较上月增长超过 200%。</p>
        
        <h2>社区驱动发展</h2>
        <p>FunDAO 的成功离不开社区的积极参与。通过透明的治理机制和公平的收益分配，越来越多的用户选择加入 FunDAO 生态。社区成员不仅获得了可观的收益，更参与到了项目的决策过程中。</p>
        
        <h2>未来展望</h2>
        <p>FunDAO 团队表示，将继续坚持"质量优于数量"的发展理念，严格筛选优质项目，为社区成员创造更大价值。同时，将进一步完善 DAO 治理机制，让更多社区成员参与到生态建设中来。</p>
      `
      : `
        <p>The FunDAO ecosystem continues to thrive, with the latest data showing token holders exceeding 7,700, and growth over 18x in 30 days, as the community continues to expand.</p>
        
        <h2>Impressive Ecosystem Data</h2>
        <p>Since launch, FunDAO has attracted a large number of users with its innovative DAO governance model and reward distribution mechanism. The number of token holding addresses has reached 7,739, an increase of over 200% from last month.</p>
        
        <h2>Community-Driven Development</h2>
        <p>FunDAO's success is inseparable from the active participation of the community. Through transparent governance mechanisms and fair reward distribution, more and more users choose to join the FunDAO ecosystem. Community members not only gain considerable returns, but also participate in the project's decision-making process.</p>
        
        <h2>Future Outlook</h2>
        <p>The FunDAO team stated that it will continue to adhere to the development concept of "quality over quantity," strictly select high-quality projects, and create greater value for community members. At the same time, it will further improve the DAO governance mechanism to allow more community members to participate in ecosystem construction.</p>
      `,
    date: '2024-07-28',
    category: currentLocale === 'zh' ? '新闻' : 'News',
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="mesh-gradient opacity-30"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href={`/${currentLocale}/news`}
          className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-8 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {tCommon('back')}
        </Link>

        <article className="glass-card rounded-3xl p-8">
          <div className="flex items-center space-x-2 mb-6">
            <span className="tag-purple">
              {article.category}
            </span>
            <span className="text-sm text-gray-500">{article.date}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-8">
            {article.title}
          </h1>

          <div 
            className="prose max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>
      </div>
    </div>
  );
}
