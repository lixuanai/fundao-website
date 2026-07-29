'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentLocale = pathname.split('/')[1] || 'zh';
  const otherLocale = currentLocale === 'zh' ? 'en' : 'zh';

  const navItems = [
    { href: '/', label: t('home') },
    { href: '/news', label: t('news') },
    { href: '/products', label: t('products') },
    { href: '/whitepaper', label: t('whitepaper') },
    { href: '/about', label: t('about') },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-950/60 backdrop-blur-xl border-b border-gray-800/50">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-lg group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all"></div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              FunDAO
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={`/${currentLocale}${item.href}`}
                className="relative text-gray-300 hover:text-white transition-colors text-sm font-medium group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              href={`/${otherLocale}${pathname.replace(`/${currentLocale}`, '')}`}
              className="text-sm text-gray-400 hover:text-white transition-colors px-3 py-1 rounded-full border border-gray-700 hover:border-blue-500/50 hover:bg-blue-500/10"
            >
              {otherLocale === 'zh' ? '中文' : 'EN'}
            </Link>
          </div>

          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={`/${currentLocale}${item.href}`}
                  className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={`/${otherLocale}${pathname.replace(`/${currentLocale}`, '')}`}
                className="text-sm text-gray-400 hover:text-white transition-colors pt-4 border-t border-gray-800"
              >
                {otherLocale === 'zh' ? '中文' : 'EN'}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
