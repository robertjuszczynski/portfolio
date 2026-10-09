import { useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { useGsap } from '../../hooks/useGsap'
import { SectionHead } from '../ui/SectionHead'
import './About.scss'

const TEXT: { w: string; em?: boolean }[] = [
  'Five years of shipping production software. Most of it'.split(' ').map((w) => ({ w })),
  [{ w: 'not', em: true }, { w: 'from', em: true }, { w: 'a', em: true }, { w: 'perfectly', em: true }, { w: 'described', em: true }, { w: 'ticket.', em: true }],
  'I figure out the architecture, build it, and stay around long enough to own what happens next. AI writes a lot of the code now. I decide which of it ships.'.split(' ').map((w) => ({ w })),
].flat()

const META = [
  { k: 'Based', v: 'Dobre Miasto, PL. Remote, UK / EU hours' },
  { k: 'Experience', v: '5+ years' },
  { k: 'Builds', v: 'Web apps, mobile apps, AI agents' },
  { k: 'Languages', v: 'Polish, native. English, B2.' },
]

export function About() {
  const ref = useRef<HTMLElement>(null)

  useGsap(ref, (el) => {
    gsap.fromTo(
      '.about-text .word',
      { opacity: 0.15 },
      {
        opacity: 1,
        stagger: 0.1,
        ease: 'none',
        scrollTrigger: { trigger: '.about-text', start: 'top 80%', end: 'bottom 50%', scrub: true },
      }
    )
    gsap.fromTo('.about-photo', { clipPath: 'inset(-2px -2px 105% -2px)' }, {
      clipPath: 'inset(-2px -2px -2px -2px)',
      duration: 1.1,
      ease: 'expo.inOut',
      clearProps: 'clipPath',
      scrollTrigger: { trigger: '.about-photo', start: 'top 85%' },
    })
    gsap.fromTo('.about-photo img', { yPercent: -8 }, {
      yPercent: 8,
      ease: 'none',
      scrollTrigger: { trigger: '.about-photo', start: 'top bottom', end: 'bottom top', scrub: true },
    })
    gsap.fromTo('.about-meta > div', { clipPath: 'inset(-2px 105% -2px -2px)' }, {
      clipPath: 'inset(-2px -2px -2px -2px)',
      duration: 1.1,
      ease: 'expo.inOut',
      stagger: 0.1,
      clearProps: 'clipPath',
      scrollTrigger: { trigger: el.querySelector('.about-meta'), start: 'top 92%' },
    })
  })

  return (
    <section className="about section" id="about" ref={ref}>
      <SectionHead num={1} title="About" />

      <div className="about-grid">
        <figure className="cell about-photo">
          <img src="/assets/robert.jpeg" alt="Portrait of Robert Juszczyński" loading="lazy" decoding="async" width="460" height="460" />
        </figure>

        <span className="about-note label muted">
          What works is often simple.
          <br />
          What lasts is often intentional.
        </span>

        <p className="about-text">
          {TEXT.map((t, i) => (
            <span key={i} className={`word ${t.em ? 'em' : ''}`}>{t.w} </span>
          ))}
        </p>
      </div>

      <dl className="about-meta">
        {META.map((m, i) => (
          <div key={m.k} className="cell">
            <dt className="label"><span className="muted">0{i + 1}</span> {m.k}</dt>
            <dd>{m.v}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
