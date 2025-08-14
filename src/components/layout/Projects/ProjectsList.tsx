'use client';

import React, { useRef } from 'react'
import projectsData from '@/data/projectsData'
import ProjectsItem from './ProjectsItem'
import styles from './ProjectsList.module.scss';
import { motion, useScroll, useTransform } from 'framer-motion';
import useTranslate from '@/hooks/useTranslate';

export default function ProjectsList() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslate();
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ['1%', '-80%']);

  const headerOpacity = useTransform(
    scrollYProgress, 
    [0, 0.1, 0.9, 1],
    [1, 0, 0, 1]
  );

  return (
    <section ref={targetRef} className={styles.scrollSection}>
      <div className={styles.projectsContainer}>
        <motion.div 
          className={styles.projectsHeader}
          style={{ opacity: headerOpacity }}
        >
          <p className={styles.projectsHeader__label}>{t('projects.header.label')}</p>
          <h2 className={styles.projectsHeader__title}>
            {t('projects.header.title').split('<span>').map((part, index, array) => {
              if (index < array.length - 1) {
                const [text, rest] = part.split('</span>');
                return (
                  <React.Fragment key={index}>
                    {text}<span className='globals_text-gradient'>built</span>{rest}
                  </React.Fragment>
                );
              }
              return part;
            })}
          </h2>
          <p className={styles.projectsHeader__desc}>
            {t('projects.header.description')}
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
