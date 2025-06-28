import React from 'react';
import { motion } from 'framer-motion';
import styles from './ActivitySign.module.scss';

export default function ActivitySign() {
  return (
    <div className={styles.activitySign}>
      <div className={styles.activitySign__dot} />
      <motion.div 
        className={styles.activitySign__ripple}
        animate={{ 
          scale: [0, 2.5],
          opacity: [0.7, 0]
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          repeatDelay: 0.3,
          ease: "easeOut"
        }}
      />
    </div>
  );
}