'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const t = useTranslations('footer');
  const tCommon = useTranslations('common');
  const tNav = useTranslations('nav');
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'zh';

  const quickLinks = [
    { href: '/news', label: tNav('news') },
    { href: '/products', label: tNav('products') },
    { href: '/about', label: tNav('about') },
    { href: '/contact', label: tNav('contact') },
  ];

  const socialLinks = [
    { name: 'Telegram', href: 'https://t.me/funadoculb', icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
    )},
    { name: 'Twitter', href: 'https://twitter.com/fundao', icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
    )},
    { name: 'Discord', href: 'https://discord.gg/fundao', icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
    )},
  ];

  return (
    <footer className="relative bg-gray-950 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400"></div>
      <div className="absolute bottom-0 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-pink-500/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2">
            <Link href={`/${currentLocale}`} className="flex items-center space-x-2.5 mb-4 sm:mb-5 group">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-all">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <span className="text-lg sm:text-xl font-extrabold text-white">
                Fun<span className="gradient-text-hero">DAO</span>
              </span>
            </Link>
            <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-5 max-w-md leading-relaxed">
              {t('description')}
            </p>
            <p className="text-xs text-gray-500 bg-gray-900/50 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-800/50 leading-relaxed">
              {tCommon('riskDisclaimer')}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-bold mb-4 sm:mb-5 text-xs sm:text-sm uppercase tracking-wider">{t('quickLinks')}</h3>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${currentLocale}${link.href}`}
                    className="text-gray-400 hover:text-purple-400 transition-colors text-xs sm:text-sm flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500/50 mr-2 sm:mr-3 group-hover:bg-purple-400 transition-colors"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-bold mb-4 sm:mb-5 text-xs sm:text-sm uppercase tracking-wider">{t('socialLinks')}</h3>
            <ul className="space-y-2 sm:space-y-3">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-purple-400 transition-colors text-xs sm:text-sm flex items-center space-x-2 sm:space-x-3 group"
                  >
                    <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gray-800/50 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors text-gray-400 group-hover:text-purple-400">
                      {link.icon}
                    </span>
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-gray-800/50 flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 gap-3">
          <p className="text-gray-500 text-xs sm:text-sm">{t('copyright')}</p>
          <div className="flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-2">
            <Link href={`/${currentLocale}/legal/privacy`} className="text-gray-500 hover:text-purple-400 text-xs sm:text-sm transition-colors">
              {t('privacy')}
            </Link>
            <Link href={`/${currentLocale}/legal/terms`} className="text-gray-500 hover:text-purple-400 text-xs sm:text-sm transition-colors">
              {t('terms')}
            </Link>
            <Link href={`/${currentLocale}/legal/disclaimer`} className="text-gray-500 hover:text-purple-400 text-xs sm:text-sm transition-colors">
              {t('disclaimer')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
