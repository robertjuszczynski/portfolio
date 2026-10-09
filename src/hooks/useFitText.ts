import { useLayoutEffect, useRef } from 'react'
import { ScrollTrigger } from '../lib/gsap'

export function useFitText<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useLayoutEffect(() => {
    const el = ref.current
    const parent = el?.parentElement
    if (!el || !parent) return

    const fit = () => {
      const styles = getComputedStyle(parent)
      const available = parent.clientWidth - parseFloat(styles.paddingLeft) - parseFloat(styles.paddingRight)
      el.style.fontSize = '100px'
      const width = el.getBoundingClientRect().width
      if (width > 0) el.style.fontSize = `${(100 * available) / width}px`
    }

    fit()
    document.fonts?.ready.then(() => {
      fit()
      ScrollTrigger.refresh()
    })
    const observer = new ResizeObserver(fit)
    observer.observe(parent)
    const refit = () => {
      fit()
      ScrollTrigger.refresh()
    }
    document.fonts?.addEventListener('loadingdone', refit)
    return () => {
      observer.disconnect()
      document.fonts?.removeEventListener('loadingdone', refit)
    }
  }, [])

  return ref
}
