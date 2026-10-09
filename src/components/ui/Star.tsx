import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { useMotion } from '../../context/motion'
import { cx } from '../../lib/cx'

const POINTS = Array.from({ length: 16 }, (_, i) => {
  const r = i % 2 ? 24 : 43
  const a = (i / 16) * Math.PI * 2 - Math.PI / 2
  return `${(50 + r * Math.cos(a)).toFixed(2)},${(50 + r * Math.sin(a)).toFixed(2)}`
}).join(' ')

export function Star({ spin = true, className }: { spin?: boolean; className?: string }) {
  const ref = useRef<SVGSVGElement>(null)
  const motion = useMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || !motion || !spin) return
    const tween = gsap.to(el, { rotation: 360, transformOrigin: '50% 50%', duration: 16, ease: 'none', repeat: -1 })
    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        gsap.to(tween, {
          timeScale: self.direction * (1 + Math.min(Math.abs(self.getVelocity()) / 140, 14)),
          duration: 0.2,
          overwrite: true,
          onComplete: () => { gsap.to(tween, { timeScale: 1, duration: 1.6 }) },
        })
      },
    })
    return () => {
      tween.kill()
      st.kill()
    }
  }, [motion, spin])

  return (
    <svg ref={ref} viewBox="0 0 100 100" className={cx('star', className)} aria-hidden="true">
      <polygon points={POINTS} fill="currentColor" stroke="currentColor" strokeWidth="9" strokeLinejoin="round" />
    </svg>
  )
}
