'use client'

import { useEffect, useRef, useState } from 'react'

export function useCountUp(target: string, duration = 2000) {
  const [value, setValue] = useState('0')
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          animateValue(target, duration)
          observer.unobserve(el)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  function animateValue(finalValue: string, ms: number) {
    // Extract numeric part and suffix (e.g. "50,000+" → num=50000, suffix="+")
    const cleaned = finalValue.replace(/[^0-9.]/g, '')
    const suffix = finalValue.replace(/[0-9.,]/g, '')
    const end = parseFloat(cleaned)

    if (isNaN(end)) {
      setValue(finalValue)
      return
    }

    const start = 0
    const startTime = performance.now()

    function step(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / ms, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(start + (end - start) * eased)

      // Format with commas
      setValue(current.toLocaleString() + suffix)

      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        setValue(finalValue)
      }
    }

    requestAnimationFrame(step)
  }

  return { value, ref }
}
