import { useLayoutEffect, useRef } from 'react'
import { ScrollTrigger } from '../lib/gsap'

export function useFitText<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useLayoutEffect(() => {
    const el = ref.current
    const parent = el?.parentElement
    if (!el || !parent) return
    let active = true

    const fit = () => {
      const styles = getComputedStyle(parent)
      const available = parent.clientWidth - parseFloat(styles.paddingLeft) - parseFloat(styles.paddingRight)
      el.style.fontSize = '100px'
      const width = el.getBoundingClientRect().width
      if (width > 0) el.style.fontSize = `${(100 * available) / width}px`
    }
    const refit = () => {
      if (!active) return
      fit()
      ScrollTrigger.refresh()
    }

    fit()
    document.fonts.ready.then(refit)
    document.fonts.addEventListener('loadingdone', refit)
    const observer = new ResizeObserver(fit)
    observer.observe(parent)

    return () => {
      active = false
      observer.disconnect()
      document.fonts.removeEventListener('loadingdone', refit)
    }
  }, [])

  return ref
}
