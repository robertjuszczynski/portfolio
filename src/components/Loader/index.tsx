import { useEffect } from 'react'
import { gsap } from '../../lib/gsap'
import { lockScroll } from '../../lib/scroll'
import { finishIntro } from '../../lib/intro'
import { useMotion } from '../../context/motion'
import './Loader.scss'

const MIN_DURATION = 700

const pad = (n: number) => String(Math.round(n)).padStart(3, '0')

const pageReady = () =>
  Promise.all([
    document.fonts.ready,
    document.readyState === 'complete' ? Promise.resolve() : new Promise<void>((resolve) => window.addEventListener('load', () => resolve(), { once: true })),
  ])

export function Loader() {
  const motion = useMotion()

  useEffect(() => {
    const el = document.getElementById('boot')
    const count = el?.querySelector<HTMLElement>('.bc')
    const line = el?.querySelector<HTMLElement>('.bl b')
    const inner = el?.querySelector<HTMLElement>('.bi')
    if (!motion || !el || !count || !line || !inner) {
      el?.remove()
      finishIntro()
      return
    }

    lockScroll(true)
    const progress = { v: 0 }
    const render = () => {
      count.textContent = pad(progress.v)
      line.style.transform = `scaleX(${progress.v / 100})`
    }
    const crawl = gsap.to(progress, { v: 86, duration: 2.4, ease: 'power2.out', onUpdate: render })
    let cancelled = false

    Promise.all([pageReady(), new Promise<void>((resolve) => window.setTimeout(resolve, MIN_DURATION))]).then(() => {
      if (cancelled) return
      crawl.kill()
      gsap
        .timeline({
          onComplete: () => {
            lockScroll(false)
            el.remove()
          },
        })
        .to(progress, { v: 100, duration: 0.5, ease: 'power2.out', onUpdate: render })
        .to(inner, { yPercent: -101, duration: 0.7, ease: 'power3.inOut' }, '+=0.1')
        .to(el, { yPercent: -100, duration: 1.1, ease: 'expo.inOut' }, '<0.3')
        .add(finishIntro, '-=0.55')
    })

    return () => {
      cancelled = true
      crawl.kill()
      lockScroll(false)
    }
  }, [motion])

  return null
}
