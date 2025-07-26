'use client';

import React, { useRef, memo } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useSpring
} from 'framer-motion';
import styles from './Summary.module.scss';

const lines = [
  'From dedicated systems to simple websites',
  '— I create tailored solutions that combine',
  'functionality with clean design. I focus on',
  'delivering reliable, user-centered products',
  'that meet real-world needs.',
];

const SummaryLine = memo(function SummaryLine({
  item,
  index,
  scrollYProgress,
  linesCount,
}: {
  item: string;
  index: number;
  scrollYProgress: any;
  linesCount: number;
}) {
  const start = index * (1 / linesCount);
  const end = start + 1 / linesCount;
  const width = useTransform(scrollYProgress, [start, end], ['0%', '100%']);
  const mask = useMotionTemplate`linear-gradient(to right, black ${width}, transparent ${width})`;

  return (
    <div className={styles.lineContainer}>
      <div className={styles.summaryGrey}>{item}</div>
      <motion.div
        className={styles.summaryWhite}
        style={{
          WebkitMaskImage: mask,
          maskImage: mask,
        }}
      >
        {item}
      </motion.div>
    </div>
  );
});

const Summary = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  });

  const rawScale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const scale = useSpring(rawScale, {
    stiffness: 100,
    damping: 20,
    mass: 0.5
  });

  return (
    <div ref={ref} className={styles.wrapper}>
      <div className={styles.stickyContainer}>
        <motion.div className={styles.scaledContent} style={{ scale }}>
          {lines.map((item, index) => (
            <SummaryLine
              key={index}
              item={item}
              index={index}
              scrollYProgress={scrollYProgress}
              linesCount={lines.length}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default memo(Summary);