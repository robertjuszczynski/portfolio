import { useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { useGsap } from '../../hooks/useGsap'
import { timeline } from '../../data/experience'
import { SectionHead } from '../ui/SectionHead'
import './Experience.scss'

export function Experience() {
  const ref = useRef<HTMLElement>(null)

  useGsap(ref, (el) => {
    gsap.utils.toArray<HTMLElement>('.exp-row', el).forEach((row) => {
      gsap.fromTo(row.children, { clipPath: 'inset(-2px 105% -2px -2px)' }, {
        clipPath: 'inset(-2px -1% -2px -2px)',
        duration: 1.1,
        ease: 'expo.inOut',
        stagger: 0.12,
        clearProps: 'clipPath',
        scrollTrigger: { trigger: row, start: 'top 90%' },
      })
    })
  })

  return (
    <section className="experience section" ref={ref}>
      <SectionHead num={5} title="Experience" />
      <div className="exp-table">
        <div className="exp-row exp-head label muted" aria-hidden="true">
          <span className="cell">Period</span>
          <span className="cell">Role</span>
          <span className="cell">Company</span>
          <span className="cell">Note</span>
        </div>
        {timeline.map((item) => (
          <article key={item.year} className="exp-row">
            <span className="cell exp-year">{item.year}</span>
            <h3 className="cell exp-role">{item.role}</h3>
            <span className="cell exp-company">{item.company}</span>
            <p className="cell exp-note">{item.note}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
