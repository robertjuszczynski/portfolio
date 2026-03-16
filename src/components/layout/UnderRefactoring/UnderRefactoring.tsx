'use client';

import { motion } from 'motion/react';
import useTranslate from '@/hooks/useTranslate';
import styles from './UnderRefactoring.module.scss';

export default function UnderRefactoring() {
  const { t } = useTranslate();

  return (
    <div className={styles.wrapper}>
      <motion.div
        className={styles.glow}
        animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.div
          className={styles.badge}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <span className={styles.dot} />
          {t('refactoring.badge')}
        </motion.div>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {t('refactoring.title')}
          <span className={styles.accent}> {t('refactoring.titleAccent')}</span>
        </motion.h1>

        <motion.p
          className={styles.desc}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {t('refactoring.desc')}
        </motion.p>

        <motion.div
          className={styles.progressBar}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <motion.div
            className={styles.progressFill}
            initial={{ width: '0%' }}
            animate={{ width: '42%' }}
            transition={{ delay: 1, duration: 1.5, ease: 'easeOut' }}
          />
        </motion.div>
      </motion.div>

      <div className={styles.particles} aria-hidden>
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={styles.particle}
            style={{ left: `${10 + i * 15}%`, top: `${20 + (i % 3) * 20}%` }}
            animate={{ y: [0, -20, 0], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
          />
        ))}
      </div>
    </div>
  );
}
