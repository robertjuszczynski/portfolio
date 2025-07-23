import Image from 'next/image';
import styles from './TechTag.module.scss';

type Technology = 'React.js' | 'Vue';

type TechTagProps = {
  technology: Technology;
};

export default function TechTag({ technology }: TechTagProps) {
  const imageName = technology.toLowerCase().replace('.js', '').replace(' ', '-') + '.png';
  const src = `/images/technologies/${imageName}`;

  return (
    <div className={styles.techtag}>
      <Image src={src} alt={technology} width={20} height={20} />
      <span className={styles.techtag__text}>{technology}</span>
    </div>
  );
}