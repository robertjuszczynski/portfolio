import { useEffect, useRef, useState } from 'react'
import { gsap } from '../../lib/gsap'
import { lockScroll } from '../../lib/scroll'
import { finishIntro } from '../../lib/intro'
import { useMotion } from '../../context/motion'
import './Loader.scss'

const pad = (n: number) => String(Math.round(n)).padStart(3, '0')

const pageReady = () =>
  Promise.all([
    document.fonts?.ready ?? Promise.resolve(),
    document.readyState === 'complete' ? Promise.resolve() : new Promise((r) => window.addEventListener('load', r, { once: true })),
  ])

export function Loader() {
  const ref = useRef<HTMLDivElement>(null)
  const countRef = useRef<HTMLSpanElement>(null)
  const lineRef = useRef<HTMLElement>(null)
  const motion = useMotion()
  const [done, setDone] = useState(!motion)

  useEffect(() => {
    if (!motion) {
      finishIntro()
      return
    }
    const el = ref.current
    if (!el) return
    lockScroll(true)
    const progress = { v: 0 }
    const render = () => {
      if (countRef.current) countRef.current.textContent = pad(progress.v)
      if (lineRef.current) lineRef.current.style.transform = `scaleX(${progress.v / 100})`
    }
    const crawl = gsap.to(progress, { v: 86, duration: 2.4, ease: 'power2.out', onUpdate: render })
    let cancelled = false

    Promise.all([pageReady(), new Promise((r) => setTimeout(r, 900))]).then(() => {
      if (cancelled) return
      crawl.kill()
      gsap
        .timeline({
          onComplete: () => {
            lockScroll(false)
            setDone(true)
          },
        })
        .to(progress, { v: 100, duration: 0.5, ease: 'power2.out', onUpdate: render })
        .to('.loader-inner', { yPercent: -101, duration: 0.7, ease: 'power3.inOut' }, '+=0.1')
        .to(el, { yPercent: -100, duration: 1.1, ease: 'expo.inOut' }, '<0.3')
        .add(finishIntro, '-=0.55')
    })

    return () => {
      cancelled = true
      crawl.kill()
      lockScroll(false)
    }
  }, [motion])

  if (done) return null

  return (
    <div className="loader invert" ref={ref} aria-hidden="true">
      <div className="loader-bottom">
        <div className="loader-inner">
          <span className="loader-count" ref={countRef}>000</span>
          <i className="loader-line"><b ref={lineRef} /></i>
        </div>
      </div>
    </div>
  )
}
