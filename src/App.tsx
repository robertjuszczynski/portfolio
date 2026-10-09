import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './lib/gsap'
import { setLenis } from './lib/scroll'
import { MotionContext } from './context/motion'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Work } from './components/Work'
import { Capabilities } from './components/Capabilities'
import { Principles } from './components/Principles'
import { Experience } from './components/Experience'
import { Contact } from './components/Contact'
import { Cursor } from './components/Cursor'
import { Loader } from './components/Loader'
import { SpeedInsights } from '@vercel/speed-insights/react'
import type { Theme } from './components/ui/ThemeSwitch'

const motionAllowed = () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches

function initialTheme(): Theme {
  try {
    const saved = localStorage.getItem('theme')
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    return 'light'
  }
  return 'light'
}

export function App() {
  const [theme, setTheme] = useState<Theme>(initialTheme)
  const [motion] = useState(motionAllowed)

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#f2f2ef' : '#0b0b0b')
    try {
      localStorage.setItem('theme', theme)
    } catch {
      return
    }
  }, [theme])

  useEffect(() => {
    if (!motion) return
    const lenis = new Lenis({ lerp: 0.085 })
    setLenis(lenis)
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      setLenis(null)
    }
  }, [motion])

  return (
    <MotionContext.Provider value={motion}>
      <Loader />
      <SpeedInsights />
      <Nav theme={theme} onTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Work />
        <Capabilities />
        <Principles />
        <Experience />
      </main>
      <Contact />
      <Cursor />
    </MotionContext.Provider>
  )
}
