import React, { memo } from 'react';
import { motion } from 'framer-motion';
import ExperienceList from './ExperienceList';
import styles from './Experience.module.scss';

const ExperienceSection = () => (
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
      <p className={styles.experienceHeader__label}>Where did I get it?</p>
      <h2 className={styles.experienceHeader__title}>
        <span className='globals_text-gradient'>Exp</span>erience
      </h2>
    </motion.div>
    <ExperienceList />
  </section>
);

export default memo(ExperienceSection);