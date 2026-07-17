'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LANGS, LANG_NAMES, isValidLang } from '@/lib/i18n/config'
import { Globe } from 'lucide-react'

interface LanguageSwitcherProps {
  currentLang: string
}

export function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
  const pathname = usePathname()

  // Get the path without the lang prefix
  function getAlternatePath(lang: string) {
    const segments = pathname.split('/').filter(Boolean)
    if (segments.length > 0 && isValidLang(segments[0])) {
      segments[0] = lang
      return `/${segments.join('/')}`
    }
    return `/${lang}`
  }

  return (
    <div className="relative group">
      <button className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors">
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{LANG_NAMES[currentLang as keyof typeof LANG_NAMES]}</span>
      </button>

      {/* Dropdown */}
      <div className="absolute right-0 top-full mt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="rounded-xl bg-surface-card border border-white/[0.06] shadow-xl py-1 min-w-[120px]">
          {LANGS.map((lang) => (
            <Link
              key={lang}
              href={getAlternatePath(lang)}
              className={`block px-4 py-2 text-sm transition-colors ${
                lang === currentLang
                  ? 'text-brand-cyan bg-white/5'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              {LANG_NAMES[lang]}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
