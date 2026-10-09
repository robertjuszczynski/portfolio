import { useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { useGsap } from '../../hooks/useGsap'
import { useMotion } from '../../context/motion'
import { SectionHead } from '../ui/SectionHead'
import { Star } from '../ui/Star'
import './Principles.scss'
import { Arrow } from '../ui/Arrow'

const STEPS = [
  { title: 'Idea', text: "We start with the problem, not the feature list. I ask the annoying questions now, so nobody pays for them later." },
  { title: 'Architecture', text: "A plan cheap enough to throw away before it costs anything. Data model, boundaries, and what we're not building." },
  { title: 'Build', text: "Small, reviewable steps you can see every week. Agents are my crew, I'm the site manager. When it needs a careful hand, I write it myself." },
  { title: 'Ship', text: "Deployed to production, monitored, documented. Not \"works on my machine\". Then I stay around for what happens next." },
]

const pad = (n: number) => String(n).padStart(2, '0')

export function Principles() {
  const ref = useRef<HTMLElement>(null)
  const numRef = useRef<HTMLSpanElement>(null)
  const motion = useMotion()
  const [index, setIndex] = useState(0)

  useGsap(ref, (el) => {
    const fills = gsap.utils.toArray<HTMLElement>('.rules-progress i', el)
    const total = el.querySelector<HTMLElement>('.rp-total')
    const tracks = gsap.utils.toArray<HTMLElement>('.reel-track', el)
    const reel = el.querySelector<HTMLElement>('.rt-reel')
    const items = gsap.utils.toArray<HTMLElement>('.rt-reel .rt-body', el)
    const last = STEPS.length - 1
    const roll = gsap.parseEase('sine.inOut')

    const measure = () => {
      if (!reel) return
      reel.style.removeProperty('--reel-h')
      reel.style.setProperty('--reel-h', `${Math.max(...items.map((item) => item.offsetHeight))}px`)
    }
    measure()
    document.fonts?.ready.then(measure)

    ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: () => `+=${STEPS.length * 70}%`,
      pin: true,
      anticipatePin: 1,
      onRefresh: measure,
      onUpdate: (self) => {
        const raw = self.progress * STEPS.length
        const step = Math.min(last, Math.floor(raw))
        const local = gsap.utils.clamp(0, 1, (raw - step - 0.2) / 0.8)
        const pos = Math.min(last, step + (step < last ? roll(local) : 0))
        tracks.forEach((track) => { track.style.transform = `translateY(${(-pos / STEPS.length) * 100}%)` })
        fills.forEach((fill, i) => { fill.style.clipPath = `inset(0 ${(1 - gsap.utils.clamp(0, 1, raw - i)) * 100}% 0 0)` })
        if (total) total.textContent = `${String(Math.round(self.progress * 100)).padStart(3, '0')}`
        setIndex(Math.round(pos))
      },
    })
  })

  if (!motion) {
    return (
      <section className="rules invert section is-static" id="process">
        <SectionHead num={4} title="How I work" />
        <ol className="rules-list">
          {STEPS.map((step, i) => (
            <li key={i} className="cell">
              <span className="label">(Step {pad(i + 1)})</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>
    )
  }

  return (
    <section className="rules invert section" id="process" ref={ref}>
      <SectionHead num={4} title="How I work" />

      <div className="rules-board">
        <div className="cell rules-count">
          <span className="label"></span>
          <span className="rc-big" aria-hidden="true">
            <span className="rc-reel">
              <span className="reel-track">
                {STEPS.map((_, i) => <span key={i}>{pad(i + 1)}</span>)}
              </span>
            </span>
            <sup>/{pad(STEPS.length)}</sup>
          </span>
        </div>

        <div className="cell rules-text">
          <span className="label muted"></span>
          <div className="rt-reel" aria-live="polite">
            <div className="reel-track">
              {STEPS.map((step, i) => (
                <div key={i} className="rt-body" aria-hidden={i !== index}>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              ))}
            </div>
          </div>
          <span className="rt-star"><Star /></span>
        </div>

        <div className="rules-progress" aria-hidden="true">
          {STEPS.map((step, i) => {
            const label = <b>{pad(i + 1)} {step.title}{i === index && <> <Arrow dir="left" /></>}</b>
            return (
              <span key={i} className={`cell ${i === index ? 'is-current' : ''}`}>
                {label}
                <i>{label}</i>
              </span>
            )
          })}
        </div>
      </div>
    </section>
  )
}
