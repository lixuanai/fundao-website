'use client'

import type { RawDictionary } from './dictionaries'

/**
 * Client-side translator — creates a t() function from a raw dictionary object.
 * Use this in Client Components instead of passing dict.t directly.
 */
export function useTranslation(dict: RawDictionary) {
  function t(key: string): string {
    const keys = key.split('.')
    let current: any = dict
    for (const k of keys) {
      if (current == null || typeof current !== 'object') return key
      current = current[k]
    }
    return typeof current === 'string' ? current : key
  }
  return { t }
}
