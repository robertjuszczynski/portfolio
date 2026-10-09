import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { gsap, ScrollTrigger } from './lib/gsap'
import { setLenis } from './lib/scroll'
import { MotionContext } from './context/motion'
import { Loader } from './components/Loader'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Work } from './components/Work'
import { Capabilities } from './components/Capabilities'
import { Principles } from './components/Principles'
import { Experience } from './components/Experience'
import { Contact } from './components/Contact'
import { Cursor } from './components/Cursor'
import type { Theme } from './components/ui/ThemeSwitch'

const THEME_KEY = 'theme'
const THEME_COLOR: Record<Theme, string> = { light: '#f2f2ef', dark: '#0b0b0b' }

const motionAllowed = () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches

function readTheme(): Theme {
  try {
    const saved = localStorage.getItem(THEME_KEY)
    return saved === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

function saveTheme(theme: Theme) {
  try {
    localStorage.setItem(THEME_KEY, theme)
  } catch {
    return
  }
}

export function App() {
  const [theme, setTheme] = useState<Theme>(readTheme)
  const [motion] = useState(motionAllowed)

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme])
    saveTheme(theme)
  }, [theme])

  useEffect(() => {
    if (!motion) return
    const lenis = new Lenis({ lerp: 0.085 })
    const raf = (time: number) => lenis.raf(time * 1000)
    setLenis(lenis)
    lenis.on('scroll', ScrollTrigger.update)
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
      <SpeedInsights />
      <Analytics />
    </MotionContext.Provider>
  )
}
