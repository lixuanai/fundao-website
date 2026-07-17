'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { useTranslation } from '@/lib/i18n/useTranslation'
import type { RawDictionary } from '@/lib/i18n/dictionaries'

interface HeaderProps {
  lang: string
  dict: RawDictionary
}

export function Header({ lang, dict }: HeaderProps) {
  const { t } = useTranslation(dict)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { href: `/${lang}`, label: t('nav.home') },
    { href: `/${lang}/about`, label: t('nav.about') },
    { href: `/${lang}/products`, label: t('nav.products') },
    { href: `/${lang}/news`, label: t('nav.news') },
    { href: `/${lang}/industry`, label: t('nav.industry') },
    { href: `/${lang}/contact`, label: t('nav.contact') },
  ]

  function isActive(href: string) {
    if (href === `/${lang}`) return pathname === `/${lang}` || pathname === `/${lang}/`
    return pathname.startsWith(href)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-surface/80 backdrop-blur-xl">
      <nav className="container-main flex items-center justify-between h-16">
        {/* Logo */}
        <Link href={`/${lang}`} className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-cyan to-brand-purple flex items-center justify-center">
            <span className="text-white font-bold text-sm">F</span>
          </div>
          <span className="text-white font-bold text-lg">FunDAO</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
                isActive(item.href)
                  ? 'text-brand-cyan border-b-2 border-brand-cyan'
                  : 'text-white/60 hover:text-brand-cyan hover:bg-white/5'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher currentLang={lang} />
          <Link href={`/${lang}/contact`} className="btn-primary hidden md:inline-flex text-xs px-4 py-2">
            {t('nav.cta')}
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-white/60 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="border-t border-white/[0.06] bg-surface/95 backdrop-blur-xl">
          <div className="container-main py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm transition-all duration-300 ${
                  isActive(item.href)
                    ? 'text-brand-cyan bg-brand-cyan/10'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={`/${lang}/contact`}
              onClick={() => setMobileOpen(false)}
              className="btn-primary block text-center mt-4"
            >
              {t('nav.cta')}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
