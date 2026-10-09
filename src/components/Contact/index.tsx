import { useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { useGsap } from '../../hooks/useGsap'
import { useFitText } from '../../hooks/useFitText'
import { SectionHead } from '../ui/SectionHead'
import { Star } from '../ui/Star'
import './Contact.scss'
import { Arrow } from '../ui/Arrow'

const EMAIL = 'robert.j.dev@icloud.com'
const MAILTO = 'mailto:robert.j.dev+website@icloud.com'
const LINKEDIN = 'https://www.linkedin.com/in/robert-juszczynski'

const MARK = "Let's talk..."

export function Contact() {
  const ref = useRef<HTMLElement>(null)
  const markRef = useFitText<HTMLSpanElement>()

  useGsap(ref, (el) => {
    gsap.from('.contact-title .mask > span', {
      yPercent: 110,
      stagger: 0.1,
      duration: 1.4,
      ease: 'expo.out',
      scrollTrigger: { trigger: '.contact-title', start: 'top 85%' },
    })
    gsap.fromTo('.contact-mail', { clipPath: 'inset(-2px 105% -2px -2px)' }, {
      clipPath: 'inset(-2px -2px -2px -2px)',
      duration: 1.2,
      ease: 'expo.inOut',
      stagger: 0.08,
      clearProps: 'clipPath',
      scrollTrigger: { trigger: '.contact-mail', start: 'top 90%' },
    })
    const mark = el.querySelector('.footer-mark')
    const letters = gsap.utils.toArray<HTMLElement>('.footer-mark .mask > span', el)
    gsap.set(letters, { yPercent: 105 })
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      gsap.to(letters, { yPercent: 0, duration: 1.4, ease: 'expo.out', stagger: 0.04 })
      observer.disconnect()
    }, { threshold: 0.2 })
    if (mark) observer.observe(mark)
    return () => observer.disconnect()
  })

  return (
    <footer className="contact section" id="contact" ref={ref}>
      <SectionHead num={6} title="Contact" />

      <h2 className="contact-title">
        <span className="mask"><span>Ideas are cheap.</span></span>
        <br />
        <span className="mask"><span><em>Shipping</em> isn't.</span></span>
      </h2>

      <a className="cell wipe contact-mail" href={LINKEDIN} target="_blank" rel="noopener noreferrer" data-cursor="Message">
        <span className="label">(Preferred. Prototype that needs to become a product? Message me.)</span>
        <span className="mail-text">LinkedIn</span>
        <span className="mail-arrow"><Arrow /></span>
      </a>

      <a className="cell wipe contact-mail" href={MAILTO} data-cursor="Write">
        <span className="label">(Rather email? Works just as well.)</span>
        <span className="mail-text">{EMAIL}</span>
        <span className="mail-arrow"><Arrow /></span>
      </a>

      <a className="footer-mark" href={LINKEDIN} target="_blank" rel="noopener noreferrer" aria-label={MARK} data-cursor="Write">
        <span ref={markRef} className="mark-fit" aria-hidden="true">
          {MARK.split('').map((ch, i) => (
            <span key={i} className="mask"><span>{ch === ' ' ? '\u00a0' : ch}</span></span>
          ))}
        </span>
      </a>

      <div className="footer-bottom label">
        <span className="cell"><Star spin={false} /> © {new Date().getFullYear()} Robert Juszczyński</span>
      </div>
    </footer>
  )
}
