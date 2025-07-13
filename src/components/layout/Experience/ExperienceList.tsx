import React from 'react';
import experienceData from '@/data/experienceData';
import ExperienceItem from './ExperienceItem';
import styles from './ExperienceList.module.scss';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

export default function ExperienceList() {

  useEffect(() => {
    console.log('ExperienceList mounted');
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
      }}
      viewport={{ 
        once: true,
        amount: 0.8,
      }}
      className={styles.experienceList}
    >
      {experienceData.map((item) => {
        return <ExperienceItem key={item.company} {...item} />;
      })}
    </motion.div>
  );
}
