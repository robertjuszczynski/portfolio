import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { useGsap } from '../../hooks/useGsap'
import { useMotion } from '../../context/motion'
import { projects } from '../../data/projects'
import { introDone } from '../../lib/intro'
import { SectionHead } from '../ui/SectionHead'
import { Cover } from './Cover'
import './Work.scss'
import { Arrow } from '../ui/Arrow'

function splitCategory(category: string) {
  const [cat, year] = category.split(' · ')
  return { cat, year }
}

export function Work() {
  const ref = useRef<HTMLElement>(null)
  const [open, setOpen] = useState<number | null>(null)
  const motion = useMotion()
  const first = useRef(true)

  useLayoutEffect(() => {
    const details = gsap.utils.toArray<HTMLElement>('.row-detail', ref.current)
    if (first.current) {
      first.current = false
      gsap.set(details, { height: 0 })
      return
    }
    details.forEach((detail, i) => {
      gsap.to(detail, {
        height: i === open ? 'auto' : 0,
        duration: motion ? 0.9 : 0,
        ease: 'expo.inOut',
        overwrite: true,
        onComplete: () => ScrollTrigger.refresh(),
      })
    })
  }, [open, motion])

  useEffect(() => {
    let cancelled = false
    introDone.then(() => {
      const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 300))
      idle(() => {
        if (cancelled) return
        projects.forEach((p) => {
          if (!p.imgSrc) return
          const img = new Image()
          img.decoding = 'async'
          img.src = p.imgSrc
        })
      })
    })
    return () => { cancelled = true }
  }, [])

  useGsap(ref, (el) => {
    gsap.from('.work-title .mask > span', {
      yPercent: 110,
      duration: 1.4,
      stagger: 0.1,
      ease: 'expo.out',
      scrollTrigger: { trigger: '.work-title', start: 'top 85%' },
    })
    gsap.utils.toArray<HTMLElement>('.work-row, .work-head', el).forEach((row) => {
      gsap.fromTo(row, { clipPath: 'inset(-2px 105% -2px -2px)' }, {
        clipPath: 'inset(-2px -2px -2px -2px)',
        duration: 1.2,
        ease: 'expo.inOut',
        clearProps: 'clipPath',
        scrollTrigger: { trigger: row, start: 'top 94%' },
      })
    })
  })

  return (
    <section className="work section" id="work" ref={ref}>
      <SectionHead num={2} title="Selected work" />

      <h2 className="work-title">
        <span className="mask"><span>Selected</span></span>{' '}
        <span className="mask"><span><em>work</em></span></span>
      </h2>

      <div className="work-table">
        <div className="work-head label muted" aria-hidden="true">
          <span>No.</span>
          <span>Project</span>
          <span className="row-cat">Type</span>
          <span className="row-year">Year</span>
          <span />
        </div>

        <ol className="work-list">
          {projects.map((p, i) => {
            const { cat, year } = splitCategory(p.category)
            const isOpen = open === i
            return (
              <li
                key={p.number}
                className={`work-row ${isOpen ? 'is-open' : ''}`}
              >
                <button
                  className={`row-main wipe ${isOpen ? 'is-active' : ''}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  data-cursor={isOpen ? 'Close' : 'Open'}
                >
                  <span className="row-num">{p.number}</span>
                  <span className="row-title">{p.title}</span>
                  <span className="row-cat label">{cat}</span>
                  <span className="row-year label">{year}</span>
                  <span className="row-plus" aria-hidden="true">{isOpen ? '−' : '+'}</span>
                </button>
                <div className="row-detail">
                  <div className="row-detail-inner">
                    <div className="row-cover"><Cover project={p} index={i} /></div>
                    <p className="row-lede">{p.lede}</p>
                    <dl className="row-meta">
                      <div><dt className="label muted">Role</dt><dd>{p.role}{p.stackHighlight ? `, ${p.stackHighlight}` : ''}</dd></div>
                      <div><dt className="label muted">Stack</dt><dd>{p.stack.join(', ')}</dd></div>
                      {p.links.length > 0 && (
                        <div>
                          <dt className="label muted">Links</dt>
                          <dd>
                            {p.links.map((l) => (
                              <a key={l.label} className="wipe" href={l.href} target="_blank" rel="noopener noreferrer" data-cursor="Visit">
                                {l.label} <Arrow />
                              </a>
                            ))}
                          </dd>
                        </div>
                      )}
                    </dl>
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
