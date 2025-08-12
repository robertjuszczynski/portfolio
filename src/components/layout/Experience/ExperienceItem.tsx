import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExperienceCompany } from '@/types/experience';
import styles from './ExperienceItem.module.scss';
import CompanyInfo from './CompanyInfo';
import PositionsList from './PositionsList';
import useMediaQuery from '@/hooks/useMediaQuery';

export default function ExperienceItem({
  company,
  period,
  icon,
  positions,
}: ExperienceCompany) {
  const { isMobile } = useMediaQuery();
  const itemContainerRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: itemContainerRef,
    offset: ['start center', 'end center'],
  });

  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);


  return (
    <div
      ref={itemContainerRef}
      className={styles.item}
      id={`experience-${company.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {isMobile ? (
        <div className={styles.itemContainer}>
          <div className={styles.dividerContainer}>
            <motion.div
              ref={dividerRef}
              className={styles.divider}
              style={{ height }}
            />
          </div>
          <div>
            <CompanyInfo company={company} period={period} icon={icon} />
            <PositionsList positions={positions} />
          </div>
        </div>
      ) : (
        <>
          <CompanyInfo company={company} period={period} icon={icon} />
          <motion.div
            className={styles.divider}
          />
          <PositionsList positions={positions} />
        </>
      )}
    </div>
  );
}