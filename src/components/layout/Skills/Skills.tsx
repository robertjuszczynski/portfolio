'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import styles from './Skills.module.scss';
import TechTag from '../../common/TechTag';

const SkillsSection = () => {
  const technologies = [
    'React.js',
    'Next.js',
    'TypeScript',
    'JavaScript',
    'Nuxt.js',
    'Vue',
    'Node.js',
    'Laravel',
    'PHP',
    'PostgreSQL',
    'MySQL',
    'Tailwind CSS',
    'Vuetify',
    'Framer Motion',
    'HTML',
    'CSS',
    'Git',
  ];

  return (
    <section id="skillsTech" className={styles.skills}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.5 },
        }}
        viewport={{ amount: 1, once: true }}
        className={styles.skillsHeader}
      >
        <p className={styles.skillsHeader__label}>
          Learn it. Use it. Master it.
        </p>
        <div className={styles.skillsHeader__title}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '48px'
          }}>
            Skills &
            <motion.div
              viewport={{ once: true }}
              className={styles.skillsHeader__divider}
            />
          </div>
          <span className='globals_text-gradient'>Technologies</span>
        </div>
      </motion.div>

      <div className={styles.skills__techContainer}>
        {technologies.map((tech, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.3, delay: index * 0.1 }
            }}
            viewport={{ once: true }}
          >
            <TechTag technology={tech as any} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default memo(SkillsSection);