'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

export default function WhitepaperPage() {
  const t = useTranslations('whitepaper');
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'zh';

  const keyData = t.raw('keyData') as Array<{ label: string; value: string }>;
  const overviewHighlights = t.raw('sections.overview.highlights') as string[];
  const tokenomics = {
    tokenName: t('sections.tokenomics.tokenName'),
    totalSupply: t('sections.tokenomics.totalSupply'),
    lpInjection: t('sections.tokenomics.lpInjection'),
    publicDistribution: t('sections.tokenomics.publicDistribution'),
    deflationRate: t('sections.tokenomics.deflationRate'),
    chain: t('sections.tokenomics.chain'),
  };
  const fundAllocation = {
    lp: t('sections.tokenomics.allocation.lp'),
    sharing: t('sections.tokenomics.allocation.sharing'),
    weekly: t('sections.tokenomics.allocation.weekly'),
  };
  const fourMechanisms = t.raw('sections.mechanism.fourMechanisms') as Array<{ name: string; description: string }>;
  const rewardPillars = t.raw('sections.rewards.pillars') as Array<{ name: string; description: string; example: string }>;
  const sixNo = t.raw('sections.security.sixNo') as string[];
  const modules = t.raw('sections.security.modules') as string[];
  const govPrinciples = t.raw('sections.governance.principles') as string[];
  const govEvolution = t.raw('sections.governance.evolution') as string[];
  const roadmapPhases = t.raw('sections.roadmap.phases') as Array<{ phase: string; date: string; items: string }>;

  const phaseColors = ['border-purple-500', 'border-cyan-500', 'border-pink-500'];
  const phaseTextColors = ['text-purple-600', 'text-cyan-600', 'text-pink-600'];
  const mechanismIcons = ['🔥', '🛡️', '💰', '🏊'];
  const mechanismColors = ['from-red-500 to-orange-500', 'from-yellow-500 to-amber-500', 'from-green-500 to-emerald-500', 'from-blue-500 to-cyan-500'];
  const keyDataColors = ['from-blue-500 to-cyan-500', 'from-green-500 to-emerald-500', 'from-purple-500 to-pink-500', 'from-yellow-500 to-amber-500', 'from-cyan-500 to-blue-500', 'from-pink-500 to-rose-500', 'from-orange-500 to-red-500', 'from-indigo-500 to-violet-500'];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="mesh-gradient opacity-30"></div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="tag-purple mb-4 inline-block">
            {currentLocale === 'zh' ? '技术文档' : 'Technical Document'}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">
            {t('title')}
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">{t('subtitle')}</p>
          <p className="text-gray-500 text-sm mt-2">{t('version')}</p>
        </div>

        {/* Key Data Grid */}
        <div className="glass-card rounded-3xl p-8 mb-16 card-hover">
          <h2 className="text-2xl font-bold text-center gradient-text mb-6">
            {currentLocale === 'zh' ? '核心数据一览' : 'Key Data Summary'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {keyData.map((item, i) => (
              <div key={i} className="bg-white/50 rounded-2xl p-4 text-center card-hover">
                <div className={`text-xl font-bold bg-gradient-to-r ${keyDataColors[i % keyDataColors.length]} bg-clip-text text-transparent`}>
                  {item.value}
                </div>
                <div className="text-gray-600 text-xs mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 1: Overview */}
        <div className="glass-card rounded-3xl p-8 mb-8 card-hover">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl">📋</span>
            {t('sections.overview.title')}
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">{t('sections.overview.content')}</p>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {currentLocale === 'zh' ? '项目亮点' : 'Project Highlights'}
            </h3>
            <ul className="space-y-3">
              {overviewHighlights.map((h, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-purple-600 mr-2 text-xl">✦</span>
                  <span className="text-gray-700">{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Section 2: Tokenomics */}
        <div className="glass-card rounded-3xl p-8 mb-8 card-hover">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-xl">💎</span>
            {t('sections.tokenomics.title')}
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">{t('sections.tokenomics.content')}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {currentLocale === 'zh' ? '代币信息' : 'Token Info'}
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between"><span className="text-gray-600">{currentLocale === 'zh' ? '代币名称' : 'Token Name'}</span><span className="font-semibold text-gray-900">{tokenomics.tokenName}</span></li>
                <li className="flex justify-between"><span className="text-gray-600">{currentLocale === 'zh' ? '总供应量' : 'Total Supply'}</span><span className="font-semibold text-gray-900">{tokenomics.totalSupply}</span></li>
                <li className="flex justify-between"><span className="text-gray-600">{currentLocale === 'zh' ? '底池注入' : 'LP Injection'}</span><span className="font-semibold text-gray-900">{tokenomics.lpInjection}</span></li>
                <li className="flex justify-between"><span className="text-gray-600">{currentLocale === 'zh' ? '公域分配' : 'Public Distribution'}</span><span className="font-semibold text-gray-900">{tokenomics.publicDistribution}</span></li>
                <li className="flex justify-between"><span className="text-gray-600">{currentLocale === 'zh' ? '通缩率' : 'Deflation Rate'}</span><span className="font-semibold text-gray-900">{tokenomics.deflationRate}</span></li>
                <li className="flex justify-between"><span className="text-gray-600">{currentLocale === 'zh' ? '区块链' : 'Chain'}</span><span className="font-semibold text-gray-900">{tokenomics.chain}</span></li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {currentLocale === 'zh' ? '资金分配' : 'Fund Allocation'}
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{currentLocale === 'zh' ? 'LP 流动性池' : 'LP Pool'}</span>
                    <span className="font-semibold text-purple-600">{fundAllocation.lp}</span>
                  </div>
                  <div className="w-full bg-white/50 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{width: '60%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{currentLocale === 'zh' ? '分享收益' : 'Sharing Rewards'}</span>
                    <span className="font-semibold text-cyan-600">{fundAllocation.sharing}</span>
                  </div>
                  <div className="w-full bg-white/50 rounded-full h-2">
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full" style={{width: '25%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{currentLocale === 'zh' ? '周分红' : 'Weekly Dividend'}</span>
                    <span className="font-semibold text-pink-600">{fundAllocation.weekly}</span>
                  </div>
                  <div className="w-full bg-white/50 rounded-full h-2">
                    <div className="bg-gradient-to-r from-pink-500 to-rose-500 h-2 rounded-full" style={{width: '15%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Mechanism */}
        <div className="glass-card rounded-3xl p-8 mb-8 card-hover">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-xl">⚙️</span>
            {t('sections.mechanism.title')}
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">{t('sections.mechanism.content')}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fourMechanisms.map((m, i) => (
              <div key={i} className="bg-white/50 rounded-2xl p-5 card-hover">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${mechanismColors[i]} flex items-center justify-center text-2xl`}>
                    {mechanismIcons[i]}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{m.name}</h3>
                </div>
                <p className="text-gray-700 text-sm">{m.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Rewards */}
        <div className="glass-card rounded-3xl p-8 mb-8 card-hover">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-xl">💰</span>
            {t('sections.rewards.title')}
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">{t('sections.rewards.content')}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {rewardPillars.map((p, i) => {
              const colors = ['from-purple-500 to-pink-500', 'from-cyan-500 to-blue-500', 'from-green-500 to-emerald-500'];
              return (
                <div key={i} className="bg-white/50 rounded-2xl p-5 card-hover">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors[i]} flex items-center justify-center text-white font-bold text-xl mb-3`}>
                    {i + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{p.name}</h3>
                  <p className="text-gray-700 text-sm mb-3">{p.description}</p>
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-3">
                    <p className="text-purple-600 text-sm italic">{p.example}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 5: Security */}
        <div className="glass-card rounded-3xl p-8 mb-8 card-hover">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-xl">🔒</span>
            {t('sections.security.title')}
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">{t('sections.security.content')}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {currentLocale === 'zh' ? '「六无」安全架构' : '"Six-No" Security'}
              </h3>
              <ul className="space-y-2">
                {sixNo.map((item, i) => (
                  <li key={i} className="flex items-start text-sm">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {currentLocale === 'zh' ? '五大核心模块' : 'Five Core Modules'}
              </h3>
              <ul className="space-y-2">
                {modules.map((item, i) => (
                  <li key={i} className="flex items-start text-sm">
                    <span className="text-blue-600 mr-2">{i + 1}.</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Section 6: Governance */}
        <div className="glass-card rounded-3xl p-8 mb-8 card-hover">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-xl">🏛️</span>
            {t('sections.governance.title')}
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">{t('sections.governance.content')}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {currentLocale === 'zh' ? '治理原则' : 'Governance Principles'}
              </h3>
              <ul className="space-y-2">
                {govPrinciples.map((item, i) => (
                  <li key={i} className="flex items-start text-sm">
                    <span className="text-purple-600 mr-2">◆</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {currentLocale === 'zh' ? '演进方向' : 'Evolution'}
              </h3>
              <ul className="space-y-2">
                {govEvolution.map((item, i) => (
                  <li key={i} className="flex items-start text-sm">
                    <span className="text-cyan-600 mr-2">→</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Section 7: Roadmap */}
        <div className="glass-card rounded-3xl p-8 mb-8 card-hover">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-xl">🗺️</span>
            {t('sections.roadmap.title')}
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">{t('sections.roadmap.content')}</p>

          <div className="space-y-4">
            {roadmapPhases.map((phase, i) => (
              <div key={i} className={`bg-white/50 rounded-2xl p-5 border-l-4 ${phaseColors[i % phaseColors.length]} card-hover`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{phase.phase}</h3>
                  <span className={`text-sm font-medium ${phaseTextColors[i % phaseTextColors.length]}`}>{phase.date}</span>
                </div>
                <p className="text-gray-600 text-sm">{phase.items}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
