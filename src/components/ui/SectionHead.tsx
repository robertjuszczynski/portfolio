import { useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { useGsap } from '../../hooks/useGsap'

export const TOTAL_SECTIONS = 6

export function SectionHead({ num, title }: { num: number; title: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const n = String(num).padStart(2, '0')

  useGsap(ref, (el) => {
    gsap.from(el.querySelector('i'), {
      scaleX: 0,
      duration: 1.4,
      ease: 'expo.inOut',
      scrollTrigger: { trigger: el, start: 'top 92%' },
    })
  })

  return (
    <div className="sec-head" ref={ref}>
      <span>({n})</span>
      <span>{title}</span>
      <i />
      <span className="sh-index">{n} / {String(TOTAL_SECTIONS).padStart(2, '0')}</span>
    </div>
  )
}
