'use client';

import React, { useRef, useLayoutEffect } from 'react'
import projectsData from '@/data/projectsData'
import ProjectsItem from './ProjectsItem'
import styles from './ProjectsList.module.scss';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ProjectsList() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ['1%', '-80%']);

  const headerOpacity = useTransform(
    scrollYProgress, 
    [0, 0.1, 0.9, 1],
    [1, 0, 0, 1]
  );

  useLayoutEffect(() => {
    const handleResize = () => {
      if (targetRef.current) {
        targetRef.current.style.height = '400vh';
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section ref={targetRef} className={styles.scrollSection}>
      <div className={styles.projectsContainer}>
        <motion.div 
          className={styles.projectsHeader}
          style={{ opacity: headerOpacity }}
        >
          <p className={styles.projectsHeader__label}>Think. Code. Ship.</p>
          <h2 className={styles.projectsHeader__title}>
            Things I've <span className='globals_text-gradient'>built</span>
          </h2>
          <p className={styles.projectsHeader__desc}>
            Explore our portfolio of exceptional web design and custom Webflow
            websites that drive results for businesses worldwide.
          </p>
        </motion.div>
        
        <motion.div style={{ x }} className={styles.projectsList}>
          {projectsData.map((proj, index) => {
            return <ProjectsItem index={index} key={`${proj.name}${index}`} {...proj} />
          })}
        </motion.div>
      </div>
    </section>
  )
}
