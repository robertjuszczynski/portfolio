import ChatBot from '@/components/chatbot/ChatBot';
import styles from "./page.module.css";
import Header from '@/components/layout/Header/Header';
import HeroSection from '@/components/layout/Hero';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Header />
        <HeroSection />
        <ChatBot />
      </main>
    </div>
  );
}
