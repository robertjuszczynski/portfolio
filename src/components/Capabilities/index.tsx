import { useRef } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { useGsap } from '../../hooks/useGsap'
import { stackItems } from '../../data/stack'
import { SectionHead } from '../ui/SectionHead'
import { Star } from '../ui/Star'
import './Capabilities.scss'

const WORDS = ['TypeScript', 'Rust', 'React', 'Node.js', 'Vue', 'PostgreSQL', 'Supabase', 'LangChain', 'React Native', 'Kubernetes', 'Docker', 'GraphQL']

function MarqueeGroup() {
  return (
    <div className="marquee-group">
      {WORDS.map((w, i) => (
        <span key={w} className={i % 2 ? 'alt' : ''}>
          {w}
          <i><Star spin={false} /></i>
        </span>
      ))}
    </div>
  )
}

export function Capabilities() {
  const ref = useRef<HTMLElement>(null)

  useGsap(ref, (el) => {
    const loop = gsap.to('.marquee-track', { xPercent: -50, duration: 60, ease: 'none', repeat: -1 })
    const skewTo = gsap.quickTo('.marquee-track', 'skewX', { duration: 0.8, ease: 'power3.out' })

    ScrollTrigger.create({
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const v = self.getVelocity()
        gsap.to(loop, {
          timeScale: self.direction * (1 + Math.min(Math.abs(v) / 300, 6)),
          duration: 0.3,
          overwrite: true,
          onComplete: () => { gsap.to(loop, { timeScale: self.direction, duration: 1.4 }) },
        })
        skewTo(gsap.utils.clamp(-10, 10, -v / 260))
      },
    })

    gsap.utils.toArray<HTMLElement>('.cap-row', el).forEach((row) => {
      gsap
        .timeline({ scrollTrigger: { trigger: row, start: 'top 90%' } })
        .fromTo(row.querySelector('.cap-line'), { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.4, ease: 'expo.inOut' })
        .from(row.querySelectorAll('.cap-reveal'), { yPercent: 100, opacity: 0, duration: 1.2, ease: 'expo.out', stagger: 0.06 }, 0.3)
    })
  })

  return (
    <section className="caps" id="capabilities" ref={ref}>
      <div className="section">
        <SectionHead num={3} title="Capabilities" />
        <p className="caps-intro">
          No percentages. Nobody is <em>87% good</em> at React. Here's what I reach for, and why.
        </p>
      </div>

      <div className="section cap-list">
        {stackItems.map((item, i) => (
          <article key={item.category} className="cap-row">
            <i className="cap-line" />
            <span className="cap-num label muted"><span className="cap-reveal">03.{String(i + 1).padStart(2, '0')}</span></span>
            <h3 className="cap-name"><span className="cap-reveal">{item.category}</span></h3>
            <ul className="cap-tech">
              {item.technologies.map((t) => (
                <li key={t} className="cap-reveal">{t}</li>
              ))}
            </ul>
            <p className="cap-note"><span className="cap-reveal">{item.note}</span></p>
          </article>
        ))}
      </div>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          <MarqueeGroup />
          <MarqueeGroup />
        </div>
      </div>
    </section>
  )
}
