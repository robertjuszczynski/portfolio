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

  const masks = lines.map((_, index) => {
    const start = index * (1 / lines.length);
    const end = start + 1 / lines.length;
    const width = useTransform(scrollYProgress, [start, end], ['0%', '100%']);
    return useMotionTemplate`linear-gradient(to right, black ${width}, transparent ${width})`;
  });

  return (
    <div ref={ref} className={styles.wrapper}>
      <div className={styles.stickyContainer}>
        <motion.div className={styles.scaledContent} style={{ scale }}>
          {lines.map((item, index) => (
            <div key={index} className={styles.lineContainer}>
              <div className={styles.summaryGrey}>{item}</div>
              <motion.div
                className={styles.summaryWhite}
                style={{
                  WebkitMaskImage: masks[index],
                  maskImage: masks[index],
                }}
              >
                {item}
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default memo(Summary);