'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import styles from './Header.module.scss';
import LanguageSwitcher from './LanguageSwitcher';
import { smoothScrollTo } from '@/lib/utils';
export default function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [initialRender, setInitialRender] = useState(true);

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
          <li className={styles.header__nav_item} onClick={() => smoothScrollTo('projects')}>Projects</li>
          <li className={styles.header__nav_item} onClick={() => smoothScrollTo('experience')}>Experience</li>
          <li className={styles.header__nav_item} onClick={() => smoothScrollTo('skillsTech')}>Skills & Technologies</li>
          <li className={styles.header__nav_item} onClick={() => smoothScrollTo('aboutMe')}>About me</li>
          <li className={styles.header__nav_item} onClick={() => smoothScrollTo('footer')}>Contact</li>
        </ul>
      </nav>
      <div className={styles.header__actions}>
        <LanguageSwitcher />
      </div>
    </motion.header>
  );
}