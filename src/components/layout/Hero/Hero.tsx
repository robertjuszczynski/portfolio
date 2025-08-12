'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import styles from './Hero.module.scss';
import { motion, useAnimate, Variants } from 'framer-motion';
import ActivitySign from '@/components/common/ActivitySign';
import useTranslate from '@/hooks/useTranslate';
import useMediaQuery from '@/hooks/useMediaQuery';
import { Robot } from './Robot';
import { ChevronRightIcon } from 'lucide-react';

export default function HeroSection({
  onReady,
  startAnimation,
}: {
  onReady: () => void;
  startAnimation: boolean;
}) {
  const [scope, animate] = useAnimate();
  const { t } = useTranslate();
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useMediaQuery();

  const h1Text = isMobile ? t('hero.title-mobile') : t('hero.title');
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
          animate={startAnimation ? 'visible' : 'hidden'}
          className={`${styles.hero__word} ${
            word === 'build' ||
            word === 'solve' ||
            word === 'tworzę' ||
            word === 'aplikacje'
              ? 'globals_text-gradient'
              : ''
          }`}
        >
          {word}&nbsp;
        </motion.span>
        {(!isMobile && word === 'build') && <br />}
      </React.Fragment>
    ));
  }, [h1Text, startAnimation]);

  useEffect(() => {
    onReady();
  }, []);

  useEffect(() => {
    if (!startAnimation) return;

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
  }, [animate, h1Text, startAnimation]);

  return (
    <section className={styles.hero} ref={scope} aria-label='Introduction'>
      <div className={styles.hero__announcement}>
        <div className={styles.hero__announcementNew}>
          {t('common.new')}
        </div>
        <span className={styles.hero__announcementText}>
          {t('hero.announcement')} <ChevronRightIcon  width={16} height={21} />
        </span>
      </div>
      <div className={styles.hero__container}>
        <h1 className={styles.hero__title}>{titleWords}</h1>
      </div>

      <h2
        className={styles.hero__subtitle}
        ref={subtitleRef}
        style={{ opacity: 0 }}
      >
        <span className={styles.hero__subtitleItem}>{firstSubtitlePart}{' '}</span>
        <span className="waving-hand">👋</span>{' '}
        <span className={styles.hero__subtitleItem}>{secondSubtitlePart}</span>
      </h2>

      <div
        className={styles.hero__actions}
        ref={actionsRef}
        style={{ opacity: 0 }}
      >
        <motion.button
          className={`${styles.hero__button} ${styles.hero__button_primary}`}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() =>
            document.getElementById('projects')?.scrollIntoView({
              behavior: 'smooth',
            })
          }
        >
          {t('hero.actions.viewProjects')}
        </motion.button>
        <motion.a
          className={`${styles.hero__button} ${styles.hero__button_secondary}`}
          whileHover={{
            scale: 1.05,
            borderColor: 'rgba(var(--primary), 0.8)',
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.95 }}
          href='tel:515-177-920'
        >
          <ActivitySign />
          <span>{t('hero.actions.callMe')}</span>
        </motion.a>
      </div>
      {/* <Robot onReady={onReady} /> */}
    </section>
  );
}