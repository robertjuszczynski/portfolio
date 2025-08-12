'use client';

import { useLayoutEffect, useState } from 'react';

type MediaQueryResult = {
  isMini: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
};

const getWidth = () => (typeof window !== 'undefined' ? window.innerWidth : 0);

const compute = (w: number): MediaQueryResult => ({
  isMini: w <= 414,
  isMobile: w < 768,
  isTablet: w >= 768 && w < 1024,
  isDesktop: w >= 1024 && w < 1280,
  isLargeDesktop: w >= 1280,
});

export default function useMediaQuery(): MediaQueryResult {
  const [state, setState] = useState<MediaQueryResult>(() => compute(getWidth()));

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    let frame: number | null = null;

    const handleResize = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const next = compute(getWidth());
        setState(prev =>
          prev.isMini === next.isMini &&
          prev.isMobile === next.isMobile &&
          prev.isTablet === next.isTablet &&
          prev.isDesktop === next.isDesktop &&
          prev.isLargeDesktop === next.isLargeDesktop
            ? prev
            : next
        );
      });
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    window.visualViewport?.addEventListener('resize', handleResize);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      window.visualViewport?.removeEventListener('resize', handleResize);
    };
  }, []);

  return state;
}