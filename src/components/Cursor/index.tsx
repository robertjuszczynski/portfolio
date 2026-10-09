import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { useMotion } from '../../context/motion'
import { introDone } from '../../lib/intro'
import './Cursor.scss'

export function Cursor() {
  const motion = useMotion()
  const ref = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    const label = labelRef.current
    if (!el || !label || !motion || !window.matchMedia('(pointer: fine)').matches) return

    document.body.classList.add('has-cursor')
    const xTo = gsap.quickTo(el, 'x', { duration: 0.25, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.25, ease: 'power3.out' })

    let ready = false
    let moved = false
    const timer = { id: 0 }
    introDone.then(() => {
      timer.id = window.setTimeout(() => {
        ready = true
        if (moved) el.classList.add('is-visible')
      }, 700)
    })

    const move = (e: PointerEvent) => {
      if (!moved) gsap.set(el, { x: e.clientX, y: e.clientY })
      moved = true
      xTo(e.clientX)
      yTo(e.clientY)
      if (ready) el.classList.add('is-visible')
      const target = (e.target as Element | null)?.closest<HTMLElement>('[data-cursor], a, button')
      const text = target?.dataset.cursor
      const hasLabel = !!text && text !== 'hover'
      el.classList.toggle('is-active', !!target)
      el.classList.toggle('has-label', hasLabel)
      if (hasLabel && label.textContent !== text) label.textContent = text
    }
    const leave = () => el.classList.remove('is-visible')
    const down = () => el.classList.add('is-down')
    const up = () => el.classList.remove('is-down')

    window.addEventListener('pointermove', move)
    document.documentElement.addEventListener('pointerleave', leave)
    window.addEventListener('pointerdown', down)
    window.addEventListener('pointerup', up)
    return () => {
      clearTimeout(timer.id)
      document.body.classList.remove('has-cursor')
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', leave)
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
    }
  }, [motion])

  return (
    <div className="cursor" ref={ref} aria-hidden="true">
      <span className="cursor-box" />
      <span className="cursor-label" ref={labelRef} />
    </div>
  )
}
