// CompanyInfo.tsx - komponent informacji o firmie
import Image from 'next/image';
import styles from './CompanyInfo.module.scss';
import useTranslate from '@/hooks/useTranslate';

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
  const { t } = useTranslate();

  return (
    <div className={styles.company}>
      <div>
        <div className={styles.period}>{t(period)}</div>
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
