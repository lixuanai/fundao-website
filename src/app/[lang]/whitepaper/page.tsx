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

  const phaseColors = ['border-blue-500', 'border-green-500', 'border-purple-500'];
  const phaseTextColors = ['text-blue-400', 'text-green-400', 'text-purple-400'];
  const mechanismIcons = ['🔥', '🛡️', '💰', '🏊'];
  const mechanismColors = ['from-red-500 to-orange-500', 'from-yellow-500 to-amber-500', 'from-green-500 to-emerald-500', 'from-blue-500 to-cyan-500'];
  const keyDataColors = ['from-blue-400 to-cyan-400', 'from-green-400 to-emerald-400', 'from-purple-400 to-pink-400', 'from-yellow-400 to-amber-400', 'from-cyan-400 to-blue-400', 'from-pink-400 to-rose-400', 'from-orange-400 to-red-400', 'from-indigo-400 to-violet-400'];

  return (
    <div className="min-h-screen bg-gray-950 pt-24 pb-20 bg-grid">
      {/* Floating orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl animate-float-orb-1"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-full blur-3xl animate-float-orb-2"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 text-gradient-animated bg-clip-text text-transparent text-glow">
            {t('title')}
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">{t('subtitle')}</p>
          <p className="text-gray-500 text-sm mt-2">{t('version')}</p>
        </div>

        {/* Key Data Grid */}
        <div className="mb-16 gradient-border p-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {currentLocale === 'zh' ? '核心数据一览' : 'Key Data Summary'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {keyData.map((item, i) => (
              <div key={i} className="bg-gray-900/50 rounded-lg p-4 text-center card-glow">
                <div className={`text-xl font-bold bg-gradient-to-r ${keyDataColors[i % keyDataColors.length]} bg-clip-text text-transparent`}>
                  {item.value}
                </div>
                <div className="text-gray-400 text-xs mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 1: Overview */}
        <div className="gradient-border p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xl">📋</span>
            {t('sections.overview.title')}
          </h2>
          <p className="text-gray-300 leading-relaxed mb-6">{t('sections.overview.content')}</p>
          <div className="bg-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              {currentLocale === 'zh' ? '项目亮点' : 'Project Highlights'}
            </h3>
            <ul className="space-y-3">
              {overviewHighlights.map((h, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-0.5">✦</span>
                  <span className="text-gray-300 text-sm">{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Section 2: Tokenomics */}
        <div className="gradient-border p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-xl"></span>
            {t('sections.tokenomics.title')}
          </h2>
          <p className="text-gray-300 leading-relaxed mb-6">{t('sections.tokenomics.content')}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800/50 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-white mb-3">
                {currentLocale === 'zh' ? '代币信息' : 'Token Info'}
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-400">{currentLocale === 'zh' ? '代币名称' : 'Name'}</span><span className="text-white">{tokenomics.tokenName}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">{currentLocale === 'zh' ? '总供应量' : 'Total Supply'}</span><span className="text-green-400 font-semibold">{tokenomics.totalSupply}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">{currentLocale === 'zh' ? '底池注入' : 'LP Injection'}</span><span className="text-blue-400 font-semibold">{tokenomics.lpInjection}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">{currentLocale === 'zh' ? '公域引流' : 'Public Distribution'}</span><span className="text-purple-400 font-semibold">{tokenomics.publicDistribution}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">{currentLocale === 'zh' ? '每日通缩' : 'Daily Deflation'}</span><span className="text-red-400 font-semibold">{tokenomics.deflationRate}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">{currentLocale === 'zh' ? '底层链' : 'Chain'}</span><span className="text-yellow-400 font-semibold">{tokenomics.chain}</span></div>
              </div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-white mb-3">
                {currentLocale === 'zh' ? '资金分配' : 'Fund Allocation'}
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1"><span className="text-gray-300">{fundAllocation.lp}</span><span className="text-blue-400 font-bold">60%</span></div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" style={{ width: '60%' }}></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1"><span className="text-gray-300">{fundAllocation.sharing}</span><span className="text-green-400 font-bold">25%</span></div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style={{ width: '25%' }}></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1"><span className="text-gray-300">{fundAllocation.weekly}</span><span className="text-purple-400 font-bold">15%</span></div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: '15%' }}></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Core Mechanisms */}
        <div className="gradient-border p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl">⚙️</span>
            {t('sections.mechanism.title')}
          </h2>
          <p className="text-gray-300 leading-relaxed mb-6">{t('sections.mechanism.content')}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fourMechanisms.map((m, i) => (
              <div key={i} className="bg-gray-800/50 rounded-lg p-5 card-glow border-l-4 border-blue-500 group">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${mechanismColors[i]} flex items-center justify-center text-xl group-hover:scale-110 transition-transform`}>
                    {mechanismIcons[i]}
                  </div>
                  <h3 className="text-lg font-semibold text-white">{m.name}</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{m.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Rewards */}
        <div className="gradient-border p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-xl">💰</span>
            {t('sections.rewards.title')}
          </h2>
          <p className="text-gray-300 leading-relaxed mb-6">{t('sections.rewards.content')}</p>

          <div className="space-y-4">
            {rewardPillars.map((p, i) => {
              const colors = ['from-blue-500 to-cyan-500', 'from-purple-500 to-pink-500', 'from-green-500 to-emerald-500'];
              return (
                <div key={i} className="bg-gray-800/50 rounded-lg p-5 card-glow">
                  <h3 className={`text-lg font-semibold bg-gradient-to-r ${colors[i]} bg-clip-text text-transparent mb-2`}>{p.name}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-3">{p.description}</p>
                  <div className="bg-gray-900/50 rounded p-3 border border-gray-700">
                    <p className="text-blue-300 text-sm italic">{p.example}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 5: Security */}
        <div className="gradient-border p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-xl"></span>
            {t('sections.security.title')}
          </h2>
          <p className="text-gray-300 leading-relaxed mb-6">{t('sections.security.content')}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800/50 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-white mb-3">
                {currentLocale === 'zh' ? '「六无」安全架构' : '"Six-No" Security'}
              </h3>
              <ul className="space-y-2">
                {sixNo.map((item, i) => (
                  <li key={i} className="flex items-start text-sm">
                    <span className="text-green-400 mr-2">✓</span>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-white mb-3">
                {currentLocale === 'zh' ? '五大核心模块' : 'Five Core Modules'}
              </h3>
              <ul className="space-y-2">
                {modules.map((item, i) => (
                  <li key={i} className="flex items-start text-sm">
                    <span className="text-blue-400 mr-2">{i + 1}.</span>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Section 6: Governance */}
        <div className="gradient-border p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-xl">🏛️</span>
            {t('sections.governance.title')}
          </h2>
          <p className="text-gray-300 leading-relaxed mb-6">{t('sections.governance.content')}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800/50 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-white mb-3">
                {currentLocale === 'zh' ? '治理原则' : 'Governance Principles'}
              </h3>
              <ul className="space-y-2">
                {govPrinciples.map((item, i) => (
                  <li key={i} className="flex items-start text-sm">
                    <span className="text-purple-400 mr-2">◆</span>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-white mb-3">
                {currentLocale === 'zh' ? '演进方向' : 'Evolution'}
              </h3>
              <ul className="space-y-2">
                {govEvolution.map((item, i) => (
                  <li key={i} className="flex items-start text-sm">
                    <span className="text-cyan-400 mr-2">→</span>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Section 7: Roadmap */}
        <div className="gradient-border p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-xl">️</span>
            {t('sections.roadmap.title')}
          </h2>
          <p className="text-gray-300 leading-relaxed mb-6">{t('sections.roadmap.content')}</p>

          <div className="space-y-4">
            {roadmapPhases.map((phase, i) => (
              <div key={i} className={`bg-gray-800/50 rounded-lg p-5 border-l-4 ${phaseColors[i % phaseColors.length]} card-glow`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white">{phase.phase}</h3>
                  <span className={`text-sm font-medium ${phaseTextColors[i % phaseTextColors.length]}`}>{phase.date}</span>
                </div>
                <p className="text-gray-400 text-sm">{phase.items}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
