'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Header() {
  const t = useTranslations('nav');
  const tLang = useTranslations('common');
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const currentLocale = pathname.split('/')[1] || 'zh';
  const otherLocale = currentLocale === 'zh' ? 'en' : 'zh';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/', label: t('home') },
    { href: '/news', label: t('news') },
    { href: '/products', label: t('products') },
    { href: '/whitepaper', label: t('whitepaper') },
    { href: '/about', label: t('about') },
    { href: '/contact', label: t('contact') },
  ];

  const langLabel = otherLocale === 'zh' ? tLang('switchToZh') : tLang('switchToEn');

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-purple-500/5 border-b border-purple-100/50'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          {/* Logo */}
          <Link href={`/${currentLocale}`} className="flex items-center space-x-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40 transition-all group-hover:scale-105">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span className="text-xl font-extrabold gradient-text-hero">
              FunDAO
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={`/${currentLocale}${item.href}`}
                className="nav-link text-gray-600 hover:text-purple-600 transition-colors text-sm font-medium px-4 py-2 rounded-lg hover:bg-purple-50/50"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              href={`/${otherLocale}${pathname.replace(`/${currentLocale}`, '')}`}
              className="text-sm font-medium text-gray-500 hover:text-purple-600 transition-colors px-4 py-2 rounded-full border border-gray-200 hover:border-purple-300 hover:bg-purple-50/50"
            >
              {langLabel}
            </Link>
            <Link
              href={`/${currentLocale}/contact`}
              className="btn-gradient text-sm !py-2 !px-5 !rounded-full !text-base"
            >
              {t('contact')}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-600 hover:text-purple-600 p-2 rounded-lg hover:bg-purple-50/50 transition-colors"
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

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-purple-100/50 bg-white/95 backdrop-blur-xl rounded-b-2xl shadow-xl">
            <nav className="flex flex-col space-y-1 px-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={`/${currentLocale}${item.href}`}
                  className="text-gray-600 hover:text-purple-600 hover:bg-purple-50/50 transition-colors text-sm font-medium px-4 py-3 rounded-xl"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex items-center gap-3 pt-3 mt-3 border-t border-purple-100/50 px-4">
                <Link
                  href={`/${otherLocale}${pathname.replace(`/${currentLocale}`, '')}`}
                  className="text-sm text-gray-500 hover:text-purple-600 transition-colors px-4 py-2 rounded-full border border-gray-200"
                >
                  {langLabel}
                </Link>
                <Link
                  href={`/${currentLocale}/contact`}
                  className="btn-gradient text-sm !py-2 !px-5 !rounded-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('contact')}
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
