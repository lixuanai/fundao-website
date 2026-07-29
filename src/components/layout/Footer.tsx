'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const t = useTranslations('footer');
  const tCommon = useTranslations('common');
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'zh';

  const quickLinks = [
    { href: '/news', label: t('quickLinks') === '快速链接' ? '新闻动态' : 'News' },
    { href: '/products', label: t('quickLinks') === '快速链接' ? '产品与服务' : 'Products' },
    { href: '/about', label: t('quickLinks') === '快速链接' ? '关于我们' : 'About' },
    { href: '/contact', label: t('quickLinks') === '快速链接' ? '联系我们' : 'Contact' },
  ];

  const socialLinks = [
    { name: 'Telegram', href: 'https://t.me/fundao', icon: '📱' },
    { name: 'Discord', href: 'https://discord.gg/fundao', icon: '💬' },
    { name: 'Twitter', href: 'https://twitter.com/fundao', icon: '' },
  ];

  return (
    <footer className="relative bg-gray-900 overflow-hidden">
      {/* Top gradient border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4 group">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-lg group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all"></div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                FunDAO
              </span>
            </Link>
            <p className="text-gray-400 text-sm mb-4 max-w-md">
              {t('description')}
            </p>
            <p className="text-xs text-gray-500 bg-gray-800/50 p-3 rounded-lg border border-gray-700">
              {tCommon('riskDisclaimer')}
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${currentLocale}${link.href}`}
                    className="text-gray-400 hover:text-white transition-colors text-sm group flex items-center"
                  >
                    <span className="w-0 group-hover:w-2 h-[2px] bg-blue-400 mr-0 group-hover:mr-2 transition-all"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">{t('socialLinks')}</h3>
            <ul className="space-y-2">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors text-sm flex items-center space-x-2 group"
                  >
                    <span className="group-hover:scale-125 transition-transform">{link.icon}</span>
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-500 text-sm">{t('copyright')}</p>
          <div className="flex space-x-6">
            <Link href={`/${currentLocale}/legal/privacy`} className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
              {t('privacy')}
            </Link>
            <Link href={`/${currentLocale}/legal/terms`} className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
              {t('terms')}
            </Link>
            <Link href={`/${currentLocale}/legal/disclaimer`} className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
              {t('disclaimer')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
