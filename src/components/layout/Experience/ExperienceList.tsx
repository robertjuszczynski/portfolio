import React from 'react';
import experienceData from '@/data/experienceData';
import ExperienceItem from './ExperienceItem';
import styles from './ExperienceList.module.scss';
import { motion } from 'framer-motion';
import useMediaQuery from '@/hooks/useMediaQuery';

export default function ExperienceList() {
  const { isMobile } = useMediaQuery();

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
        amount: isMobile ? 0.1 : 0.8,
      }}
      className={styles.experienceList}
    >
      {experienceData.map((item) => {
        return <ExperienceItem key={item.company} {...item} />;
      })}
    </motion.div>
  );
}