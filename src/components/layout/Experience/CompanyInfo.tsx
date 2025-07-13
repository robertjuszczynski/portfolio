// CompanyInfo.tsx - komponent informacji o firmie
import Image from 'next/image';
import styles from './CompanyInfo.module.scss';

interface CompanyInfoProps {
  company: string;
  period: string;
  icon: string;
}

export default function CompanyInfo({
  company,
  period,
  icon,
}: CompanyInfoProps) {
  return (
    <div className={styles.company}>
      <div>
        <div className={styles.period}>{period}</div>
        <div className={styles.name}>{company}</div>
      </div>
      <Image
        src={`/images/companies/${icon}`}
        alt={`${company} logo`}
        width={60}
        height={60}
        className={styles.icon}
      />
    </div>
  );
}
