'use client'

import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { ReactNode } from 'react'

export function ScrollReveal({ children }: { children: ReactNode }) {
  const ref = useScrollAnimation()

  return (
    <div ref={ref as any} className="animate-on-scroll">
      {children}
    </div>
  )
}
