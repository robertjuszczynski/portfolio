import styles from "./page.module.css";
import HeroSection from '@/components/Hero';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <HeroSection />
      </main>
    </div>
  );
}
