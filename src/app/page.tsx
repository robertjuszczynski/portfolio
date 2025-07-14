'use client';

import ChatBot from '@/components/chatbot/ChatBot';
import styles from './page.module.css';
import Header from '@/components/layout/Header/Header';
import HeroSection from '@/components/layout/Hero/Hero';
import ExperienceSection from '@/components/layout/Experience/Experience';
import Preloader from '@/components/layout/Preloader/Preloader';
import { useState } from 'react';
import Summary from '@/components/layout/Summary/Summary';
import ProjectsSection from '@/components/layout/Projects/Projects';
import Ribbon from '@/components/layout/Ribbon/Ribbon';

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  const onLoaded = () => {
    setLoaded(true);
  };

  return (
    <main className={styles.main}>
      <Preloader loaded={onLoaded} />
      {loaded ? (
        <>
          <Header />
          <HeroSection />
          <ExperienceSection />
          <Summary />
          <ProjectsSection />
          <Ribbon />
        </>
      ) : null}
      <ChatBot />
    </main>
  );
}
