import TechTag from '@/components/common/TechTag';
import styles from './PositionsList.module.scss';
import { ExperiencePosition } from '@/types/experience';

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
  return (
    <div className={styles.position}>
      <h3 className={styles.role}>{position.role}</h3>
      <p className={styles.period}>{position.period}</p>

      <div className={styles.description}>
        {position.description.map((desc, index) => (
          <>
            <p key={index}>{desc}</p>
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
  );
}
