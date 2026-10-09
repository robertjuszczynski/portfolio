import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from '../../lib/gsap'
import { lockScroll, scrollToTarget } from '../../lib/scroll'
import { useMotion } from '../../context/motion'
import { Star } from '../ui/Star'
import { ThemeSwitch, type Theme } from '../ui/ThemeSwitch'
import { Chatbot } from '../Chatbot'
import './Nav.scss'
import { Arrow } from '../ui/Arrow'

const LINKS = [
  { label: 'Work', target: '#work' },
  { label: 'About', target: '#about' },
  { label: 'Process', target: '#process' },
  { label: 'Contact', target: '#contact' },
]

interface Props {
  theme: Theme
  onTheme: () => void
}

export function Nav({ theme, onTheme }: Props) {
  const motion = useMotion()
  const [open, setOpen] = useState(false)
  const [shown, setShown] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const pendingRef = useRef<string | number | null>(null)

  useEffect(() => {
    if (open) {
      setShown(true)
      lockScroll(true)
      return
    }
    if (!shown) return
    const menu = menuRef.current
    const finish = () => {
      setShown(false)
      lockScroll(false)
      const target = pendingRef.current
      pendingRef.current = null
      if (target !== null) requestAnimationFrame(() => scrollToTarget(target))
    }
    if (!menu || !motion) {
      finish()
      return
    }
    tlRef.current?.kill()
    tlRef.current = gsap
      .timeline({ onComplete: finish })
      .to(menu.querySelectorAll('.menu-link > span'), { yPercent: -110, duration: 0.5, ease: 'expo.in', stagger: 0.03 })
      .to(menu.querySelectorAll('.menu-foot > *'), { opacity: 0, duration: 0.3 }, 0)
      .to(menu, { clipPath: 'inset(0 0 100% 0)', duration: 0.8, ease: 'expo.inOut' }, 0.25)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  useLayoutEffect(() => {
    const menu = menuRef.current
    if (!shown || !open || !menu || !motion) return
    tlRef.current?.kill()
    tlRef.current = gsap
      .timeline()
      .fromTo(menu, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.9, ease: 'expo.inOut' })
      .fromTo(menu.querySelectorAll('.menu-link > span'), { yPercent: 110 }, { yPercent: 0, duration: 1, ease: 'expo.out', stagger: 0.06 }, 0.35)
      .fromTo(menu.querySelectorAll('.menu-foot > *'), { opacity: 0 }, { opacity: 1, duration: 0.6, stagger: 0.05 }, 0.6)
  }, [shown, open, motion])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  function go(target: string | number) {
    if (!open) {
      scrollToTarget(target)
      return
    }
    pendingRef.current = target
    setOpen(false)
  }

  return (
    <header className={`nav ${open ? 'is-open' : ''} ${shown ? 'has-menu' : ''}`}>
      <button className="cell wipe nav-mark" onClick={() => go(0)} aria-label="Back to top">
        <Star spin={false} />
        <span>R.J.</span>
      </button>
      <span className="cell nav-role"><span>Software Engineer</span></span>
      <nav className="nav-links" aria-label="Primary">
        {LINKS.map((l, i) => (
          <button key={l.target} className="cell wipe" onClick={() => scrollToTarget(l.target)}>
            <span className="muted">0{i + 1}</span> {l.label}
          </button>
        ))}
      </nav>
      <ThemeSwitch theme={theme} onTheme={onTheme} className="cell nav-theme" />
      <Chatbot />
      <button className="cell nav-talk" onClick={() => go(document.documentElement.scrollHeight)}>
        <span>Let's talk</span>
      </button>
      <button
        className="cell nav-burger"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? 'Close menu' : 'Open menu'}
      >
        <span>{open ? 'Close' : 'Menu'}</span>
        <i aria-hidden="true" />
      </button>

      <div id="mobile-menu" className="menu invert" ref={menuRef} hidden={!shown}>
        <nav className="menu-links" aria-label="Mobile">
          {LINKS.map((l, i) => (
            <button key={l.target} className="menu-link mask" onClick={() => go(l.target)}>
              <span>
                <sup>0{i + 1}</sup>
                {l.label}
              </span>
            </button>
          ))}
        </nav>
        <div className="menu-foot">
          <a href="https://github.com/robertjuszczynski" target="_blank" rel="noopener noreferrer">GitHub <Arrow /></a>
          <a href="https://linkedin.com/in/robert-juszczynski" target="_blank" rel="noopener noreferrer">LinkedIn <Arrow /></a>
          <ThemeSwitch theme={theme} onTheme={onTheme} />
        </div>
      </div>
    </header>
  )
}
