export type Lang = 'zh' | 'en'

export const LANGS: Lang[] = ['zh', 'en']
export const DEFAULT_LANG: Lang = 'zh'

export const LANG_NAMES: Record<Lang, string> = {
  zh: '中文',
  en: 'English',
}

// Used for <html lang> and hreflang
export const LANG_LOCALES: Record<Lang, string> = {
  zh: 'zh-CN',
  en: 'en',
}

export function isValidLang(lang: string): lang is Lang {
  return LANGS.includes(lang as Lang)
}
