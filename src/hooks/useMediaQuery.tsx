import { useEffect, useState } from 'react';

export default function useMediaQuery(): { isMobile: boolean; isTablet: boolean; isDesktop: boolean } {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const updateWidth = () => setWidth(window.innerWidth);
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  return { isMobile, isTablet, isDesktop };
}