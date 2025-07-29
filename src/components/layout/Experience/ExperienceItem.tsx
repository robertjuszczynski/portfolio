import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExperienceCompany } from '@/types/experience';
import styles from './ExperienceItem.module.scss';
import CompanyInfo from './CompanyInfo';
import PositionsList from './PositionsList';
import useMediaQuery from '@/hooks/useMediaQuery';

type DividerProps = {
  itemContainerRef?: React.RefObject<HTMLDivElement | null>;
};

function Divider({ itemContainerRef }: DividerProps) {
  const { scrollYProgress } = useScroll({
    target: itemContainerRef,
    offset: ['start center', 'end center'],
  });

  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div className={styles.dividerContainer}>
      <motion.div className={styles.divider} style={{ height }} />
    </div>
  );
}

export default function ExperienceItem({
  company,
  period,
  icon,
  positions,
}: ExperienceCompany) {
  const { isMobile } = useMediaQuery();
  const itemContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={itemContainerRef} className={styles.item}>
      {isMobile ? (
        <div className={styles.itemContainer}>
          <Divider itemContainerRef={itemContainerRef} />
          <div>
            <CompanyInfo company={company} period={period} icon={icon} />
            <PositionsList positions={positions} />
          </div>
        </div>
      ) : (
        <>
          <CompanyInfo company={company} period={period} icon={icon} />
          <motion.div
            initial={{
              scaleY: 0,
            }}
            whileInView={{
              scaleY: 1,
              transition: {
                duration: 1.5,
                ease: 'easeInOut',
              },
            }}
            viewport={{ once: true }}
            className={styles.divider}
          />
          <PositionsList positions={positions} />
        </>
      )}
    </div>
  );
}
