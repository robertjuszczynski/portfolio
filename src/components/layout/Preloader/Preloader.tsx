import { useEffect, useState } from 'react';
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
  loaded: () => void;
};

export default function Preloader({ loaded }: PreloaderProps) {
  const [index, setIndex] = useState(0);
  const [delay] = useState(600);
  const [visible, setVisible] = useState(true);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    document.fonts.ready.then(() => {
      if (isMounted) setFontsLoaded(true);
    });

    const cycle = (i = 0, currentDelay = 550) => {
      if (!isMounted) return;
      setIndex((prev) => (prev + 1) % texts.length);

      const nextDelay = currentDelay > 200 ? currentDelay - 100 : 200;

      setTimeout(() => cycle(i + 1, nextDelay), nextDelay);
    };

    const timeout = setTimeout(() => cycle(), delay);

    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, [delay]);

  useEffect(() => {
    if (!fontsLoaded) return;

    const hideTimeout = setTimeout(() => {
      setVisible(false);
    }, 3000);

    const loadedTimeout = setTimeout(() => {
      loaded();
    }, 3500);

    return () => {
      clearTimeout(hideTimeout);
      clearTimeout(loadedTimeout);
    };
  }, [fontsLoaded, loaded]);

  return (
    <AnimatePresence mode="wait">
      {visible ? (
        <motion.div
          key="textContainer"
          exit={{ y: '-100%' }}
          transition={{
            duration: 1.25,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: '300',
            zIndex: '1000',
            backgroundColor: 'var(--foreground)',
            top: 0,
            left: 0,
            overflow: 'hidden',
          }}
        >
          <motion.span
            key={texts[index]}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            style={{
              color: 'rgb(var(--secondary-text))',
              fontSize: '2.2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              fontWeight: 300,
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
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
