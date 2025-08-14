import TechTag from '@/components/common/TechTag';
import styles from './PositionsList.module.scss';
import { ExperiencePosition } from '@/types/experience';
import { motion } from 'framer-motion';
import useTranslate from '@/hooks/useTranslate';

interface PositionsListProps {
  positions: ExperiencePosition[];
}

export default function PositionsList({ positions }: PositionsListProps) {
  return (
    <div className={styles.positions}>
      {positions.map((position, index) => (
        <PositionItem key={index} position={position} />
      ))}
    </div>
  );
}

function PositionItem({ position }: { position: ExperiencePosition }) {
  const { t } = useTranslate();
  
  return (
    <>
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
      <div className={styles.position}>
        <h3 className={styles.role}>{position.role}</h3>
        <p className={styles.period}>{t(position.period)}</p>

        <div className={styles.description}>
          {position.description.map((desc, index) => (
            <>
              <p key={index}>{t(desc)}</p>
              <br />
            </>
          ))}
        </div>

        <div className={styles.technologies}>
          {position.technologies.map((tech, index) => (
            <TechTag key={index} technology={tech as any} />
          ))}
        </div>
      </div>
    </>
  );
}
