import { useLayoutEffect, type DependencyList, type RefObject } from 'react'
import { gsap } from '../lib/gsap'
import { useMotion } from '../context/motion'

type Cleanup = () => void

export function useGsap(scope: RefObject<HTMLElement | null>, setup: (el: HTMLElement) => Cleanup | void, deps: DependencyList = []) {
  const motion = useMotion()

  useLayoutEffect(() => {
    const el = scope.current
    if (!el || !motion) return
    const ctx = gsap.context(() => setup(el), el)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [motion, ...deps])
}
