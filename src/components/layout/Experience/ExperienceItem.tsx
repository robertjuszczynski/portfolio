import React from 'react';
import { motion } from 'framer-motion';
import { ExperienceCompany } from '@/types/experience';
import styles from './ExperienceItem.module.scss';
import CompanyInfo from './CompanyInfo';
import PositionsList from './PositionsList';

export default function ExperienceItem({
  company,
  period,
  icon,
  positions,
}: ExperienceCompany) {
  return (
    <div className={styles.item}>
      <CompanyInfo company={company} period={period} icon={icon} />
      <motion.div
        initial={{
          scaleY: 0,
        }}
        whileInView={{
          scaleY: 1,
          transition: {
            duration: 3,
            ease: 'easeInOut',
          },
        }}
        viewport={{ once: true }}
        className={styles.divider}
      />
      <PositionsList positions={positions} />
    </div>
  );
}
