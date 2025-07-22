import React, { useEffect, useRef, useMemo, useState } from 'react';
import styles from './Hero.module.scss';
import Image from 'next/image';
import { motion, useAnimate, Variants } from 'framer-motion';
import ActivitySign from '@/components/common/ActivitySign';
import useTranslate from '@/hooks/useTranslate';

export default function HeroSection() {
  const [scope, animate] = useAnimate();
  const { t } = useTranslate();
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const [imageHovered, setImageHovered] = useState(false);

  const h1Text = t('hero.title');
  const firstSubtitlePart = t('hero.subtitle-first');
  const secondSubtitlePart = t('hero.subtitle-sec');

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        duration: 2,
        bounce: 0,
        delay: i * 0.05,
      },
    }),
  };

  const titleWords = useMemo(() => {
    return h1Text.split(' ').map((word, index) => (
      <React.Fragment key={index}>
        <motion.span
          custom={index}
          variants={wordVariants}
          initial='hidden'
          animate='visible'
          className={`${styles.hero__word} ${
            word === 'build' || word === 'solve' || word === 'tworzę' || word === 'aplikacje' ? 'globals_text-gradient' : ''
          }`}
        >
          {word}&nbsp;
        </motion.span>
        {word === 'build' && <br />}
      </React.Fragment>
    ));
  }, [h1Text]);

  useEffect(() => {
    const wordCount = h1Text.split(' ').length;
    const lastWordStartTime = (wordCount - 1) * 0.05;
    const totalAnimationTime = lastWordStartTime + 2;

    if (subtitleRef.current) {
      animate(
        subtitleRef.current,
        { opacity: [0, 1], y: [10, 0] },
        {
          type: 'spring',
          duration: 2,
          bounce: 0,
          delay: totalAnimationTime * 0.25,
        }
      );
    }

    if (actionsRef.current) {
      animate(
        actionsRef.current,
        { opacity: [0, 1] },
        {
          type: 'spring',
          duration: 2,
          bounce: 0,
          delay: totalAnimationTime * 0.5,
        }
      );
    }
  }, [animate, h1Text]);

  return (
    <section className={styles.hero} ref={scope} aria-label='Introduction'>
      <video
        autoPlay
        muted
        loop
        playsInline
        preload='auto'
        className={styles.hero__video}
      >
        <source src='/videos/shadergradient.webm' type='video/webm' />
        Your browser does not support the video tag.
      </video>

      <div className={styles.hero__container}>
        <h1 className={styles.hero__title}>{titleWords}</h1>
      </div>

      <h3 className={styles.hero__subtitle} ref={subtitleRef}>
        {firstSubtitlePart}{' '}
        <motion.div
          className={styles.hero__imageContainer}
          whileHover={{ 
            scale: 1.2,
            rotate: [0, -5, 5, 0],
            transition: { rotate: { repeat: Infinity, duration: 1 } }
          }}
          onHoverStart={() => setImageHovered(true)}
          onHoverEnd={() => setImageHovered(false)}
        >
          <Image
            className={styles.hero__image}
            src='/images/me.jpg'
            alt='Robert profile picture'
            width={32}
            height={32}
            priority
          />
          <motion.div 
            className={styles.hero__imageGlow}
            animate={{ 
              opacity: imageHovered ? 1 : 0,
              scale: imageHovered ? 1.5 : 1
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>{' '}
        – {secondSubtitlePart}
      </h3>

      <div className={styles.hero__actions} ref={actionsRef}>
        <motion.button
          className={`${styles.hero__button} ${styles.hero__button_primary}`}
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          Show works
        </motion.button>
        <motion.button
          className={`${styles.hero__button} ${styles.hero__button_secondary}`}
          whileHover={{ 
            scale: 1.05,
            borderColor: 'rgba(var(--primary), 0.8)',
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          <ActivitySign />
          Call me
        </motion.button>
      </div>
    </section>
  );
}