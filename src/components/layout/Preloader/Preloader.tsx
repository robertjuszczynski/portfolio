'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const texts = [
  'Cześć!',
  'Hello!',
  'Hola!',
  'こんにちは！',
  'Guten Tag!',
  'Привет!',
  '안녕하세요!',
  'Olá!',
  'Ciao!',
  '你好！',
  'Merhaba!',
  'Sawa dee!',
];

type PreloaderProps = {
  visible: boolean;
};

export default function Preloader({ visible }: PreloaderProps) {
  const [index, setIndex] = useState(0);
  const [showTexts, setShowTexts] = useState(false);
  const [shouldShow, setShouldShow] = useState(true);
  const cycleTimeout = useRef<NodeJS.Timeout | null>(null);
  const hideTimeout = useRef<NodeJS.Timeout | null>(null);
  const delayRef = useRef(600);

  useEffect(() => {
    if (!visible) {
      setShowTexts(true);
      setIndex(0);
      delayRef.current = 600;

      // Cykl tekstów
      const cycle = () => {
        setIndex((prev) => (prev + 1) % texts.length);
        delayRef.current = Math.max(delayRef.current - 100, 150);
        cycleTimeout.current = setTimeout(cycle, delayRef.current);
      };
      cycleTimeout.current = setTimeout(cycle, delayRef.current);

      // Ukryj preloader po 3s
      hideTimeout.current = setTimeout(() => {
        setShouldShow(false);
      }, 3000);
    } else {
      setShowTexts(false);
      setShouldShow(true);
      if (cycleTimeout.current) clearTimeout(cycleTimeout.current);
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    }
    return () => {
      if (cycleTimeout.current) clearTimeout(cycleTimeout.current);
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          key='preloader'
          initial={{ y: 0 }}
          animate={{ y: 0, pointerEvents: 'auto' }}
          exit={{ y: '-100%', pointerEvents: 'none' }}
          transition={{ duration: 1.25, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: '300',
            zIndex: 1000,
            backgroundColor: 'var(--foreground)',
            top: 0,
            left: 0,
            overflow: 'hidden',
          }}
        >
          {showTexts && (
            <motion.span
              key={texts[index]}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              style={{
                color: 'rgb(var(--secondary-text))',
                fontSize: '2.2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                fontWeight: 300,
                position: 'absolute',
              }}
            >
              <span
                style={{
                  fontSize: '3rem',
                  lineHeight: '1',
                  display: 'inline-block',
                  position: 'relative',
                  top: '2px',
                }}
              >
                •
              </span>
              {texts[index]}
            </motion.span>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}