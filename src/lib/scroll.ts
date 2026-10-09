import type Lenis from 'lenis'

let instance: Lenis | null = null

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis
}

export function scrollToTarget(target: string | number) {
  const el = typeof target === 'number' ? target : document.querySelector<HTMLElement>(target)
  if (el === null) return
  if (instance) {
    instance.scrollTo(el, { duration: 1.8 })
    return
  }
  if (typeof el === 'number') window.scrollTo({ top: el, behavior: 'smooth' })
  else el.scrollIntoView({ behavior: 'smooth' })
}

export function lockScroll(locked: boolean) {
  document.documentElement.classList.toggle('is-locked', locked)
  if (locked) instance?.stop()
  else instance?.start()
}
