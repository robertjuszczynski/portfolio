import { useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { introDone } from '../../lib/intro'
import { scrollToTarget } from '../../lib/scroll'
import { useFitText } from '../../hooks/useFitText'
import { useGsap } from '../../hooks/useGsap'
import { useLocalTime } from '../../hooks/useLocalTime'
import { GITHUB } from '../../data/links'
import { Arrow } from '../ui/Arrow'
import { Blob } from './Blob'
import './Hero.scss'

const NAME = 'Robert Juszczyński'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const nameRef = useFitText<HTMLSpanElement>()
  const time = useLocalTime()

  useGsap(ref, () => {
    let active = true
    const intro = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } })
    introDone.then(() => {
      if (active) intro.play()
    })
    intro
      .from('.hero-statement .mask > span', { yPercent: 110, duration: 1.4, stagger: 0.09 }, 0.1)
      .from('.hero-name .mask > span', { yPercent: 140, duration: 1.6, stagger: 0.025 }, 0.25)
      .from('.hero-visual', { opacity: 0, scale: 0.85, duration: 1.8 }, 0.2)
      .from('.hero-sub, .hero-kicker', { opacity: 0, y: 16, duration: 1.2, stagger: 0.1 }, 0.7)
      .from('.hero-meta > *', { opacity: 0, duration: 1, stagger: 0.06, ease: 'power2.out' }, 0.9)
    return () => {
      active = false
    }
  })

  return (
    <section className="hero" ref={ref}>
      <div className="hero-top">
        <div className="hero-lead">
          <span className="hero-kicker">(Software Engineer, 5+ years in production)</span>
          <h1 className="hero-statement">
            <span className="mask"><span>I take an idea,</span></span>
            <br />
            <span className="mask"><span>design the architecture,</span></span>
            <br />
            <span className="mask"><span>build it, and <em>ship it.</em></span></span>
          </h1>
          <p className="hero-sub">
            Full-stack, AI-native by default. I run several agents in parallel and review every line they write,
            because <em>unsupervised AI ships slop</em>, same as a junior nobody reviews.
          </p>
        </div>

        <aside className="hero-side">
          <div className="hero-visual">
            <Blob />
          </div>
        </aside>
      </div>

      <p className="hero-name">
        <span className="sr-only">{NAME}</span>
        <span ref={nameRef} className="name-fit" aria-hidden="true">
          {NAME.split('').map((ch, i) => (
            <span key={i} className="mask"><span>{ch === ' ' ? '\u00a0' : ch}</span></span>
          ))}
        </span>
      </p>

      <div className="hero-meta label">
        <span className="cell">TypeScript / Node.JS / React / Vue / Postgres / AI</span>
        <span className="cell">Poland / {time}</span>
        <a className="cell wipe" href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub <Arrow /></a>
        <button type="button" className="cell wipe" onClick={() => scrollToTarget('#about')}>Scroll <Arrow dir="down" /></button>
      </div>
    </section>
  )
}
