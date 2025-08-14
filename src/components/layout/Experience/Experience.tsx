'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import ExperienceList from './ExperienceList';
import styles from './Experience.module.scss';
import useTranslate from '@/hooks/useTranslate';

const ExperienceSection = () => {
  const { t } = useTranslate();

  return (
    <section id="experience" className={styles.experience}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.5 },
        }}
        viewport={{ amount: 1, once: true }}
        className={styles.experienceHeader}
      >
        <p className={styles.experienceHeader__label}>{t('experience.subtitle')}</p>
        <h2 className={styles.experienceHeader__title}>
          <span className='globals_text-gradient'>{t('experience.title1')}</span>{t('experience.title2')}
        </h2>
      </motion.div>
      <ExperienceList />
    </section>
  );
};

export default memo(ExperienceSection);