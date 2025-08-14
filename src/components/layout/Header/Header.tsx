'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import styles from './Header.module.scss';
import LanguageSwitcher from './LanguageSwitcher';
import { smoothScrollTo } from '@/lib/utils';
import useTranslate from '@/hooks/useTranslate';

export default function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [initialRender, setInitialRender] = useState(true);
  const { t } = useTranslate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialRender(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (initialRender) return;
    
    const direction = latest > prevScrollY;
    const scrollDifference = Math.abs(latest - prevScrollY);

    if (scrollDifference > 10) {
      setHidden(direction);
      setPrevScrollY(latest);
    }
  });

  return (
    <motion.header 
      className={styles.header}
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: hidden ? -100 : 42,
        opacity: hidden ? 0 : 1
      }}
      transition={{ 
        duration: 0.5,
        ease: "easeInOut"
      }}
    >
      <div className={styles.header__logo}>
        JR
      </div>
      <nav className={styles.header__nav}>
        <ul className={styles.header__nav_list}>
          <li className={styles.header__nav_item} onClick={() => smoothScrollTo('projects')}>{t('navigation.projects')}</li>
          <li className={styles.header__nav_item} onClick={() => smoothScrollTo('experience')}>{t('navigation.experience')}</li>
          <li className={styles.header__nav_item} onClick={() => smoothScrollTo('skillsTech')}>{t('navigation.skills')}</li>
          <li className={styles.header__nav_item} onClick={() => smoothScrollTo('aboutMe')}>{t('navigation.about')}</li>
          <li className={styles.header__nav_item} onClick={() => smoothScrollTo('footer')}>{t('navigation.contact')}</li>
        </ul>
      </nav>
      <div className={styles.header__actions}>
        <LanguageSwitcher />
      </div>
    </motion.header>
  );
}