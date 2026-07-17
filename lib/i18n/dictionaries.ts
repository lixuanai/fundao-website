import { Lang } from './config'
import zhDict from './zh'
import enDict from './en'

// Raw dictionary type (serializable, safe to pass to Client Components)
export type RawDictionary = typeof zhDict

const dictionaries: Record<Lang, RawDictionary> = {
  zh: zhDict,
  en: enDict,
}

/**
 * Get raw dictionary object — safe to pass to Client Components.
 * Use createTranslator() on the client to get a t() function.
 */
export function getRawDictionary(lang: Lang): RawDictionary {
  return dictionaries[lang]
}

/**
 * Server-side only: get dictionary with t() function.
 * Do NOT pass the result to Client Components.
 */
export function getDictionary(lang: Lang) {
  return {
    t: (key: string): string => getNestedValue(dictionaries[lang], key),
    raw: dictionaries[lang],
  }
}

// Deep get a translation value by dot-notation key
function getNestedValue(obj: Record<string, any>, path: string): string {
  const keys = path.split('.')
  let current: any = obj
  for (const key of keys) {
    if (current == null || typeof current !== 'object') return path
    current = current[key]
  }
  return typeof current === 'string' ? current : path
}
