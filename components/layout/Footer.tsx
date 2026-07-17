'use client'

import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/constants'
import { useTranslation } from '@/lib/i18n/useTranslation'
import type { RawDictionary } from '@/lib/i18n/dictionaries'

interface FooterProps {
  lang: string
  dict: RawDictionary
}

export function Footer({ lang, dict }: FooterProps) {
  const { t } = useTranslation(dict)

  const quickLinks = [
    { href: `/${lang}/about`, label: t('nav.about') },
    { href: `/${lang}/products`, label: t('nav.products') },
    { href: `/${lang}/news`, label: t('nav.news') },
    { href: `/${lang}/contact`, label: t('nav.contact') },
  ]

  const resourceLinks = [
    { href: '#', label: t('footer.whitepaper') },
    { href: '#', label: t('footer.docs') },
    { href: '#', label: t('footer.faq') },
  ]

  const socialLinks = [
    { href: '#', label: 'Telegram' },
    { href: '#', label: 'Twitter' },
    { href: '#', label: 'Discord' },
  ]

  return (
    <footer className="border-t border-white/[0.06] bg-surface">
      <div className="container-main py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href={`/${lang}`} className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-cyan to-brand-purple flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <span className="text-white font-bold text-lg">FunDAO</span>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">
              {t('footer.resources')}
            </h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">
              {t('footer.community')}
            </h3>
            <ul className="space-y-2">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            {t('footer.copyright')}
          </p>
          <p className="text-xs text-white/30">
            {SITE_CONFIG.token.chain} · {SITE_CONFIG.token.symbol} ({SITE_CONFIG.token.standard})
          </p>
        </div>
      </div>
    </footer>
  )
}
