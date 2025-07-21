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
import Skills from '@/components/layout/Skills/Skills';
import Ribbon from '@/components/layout/Ribbon/Ribbon';

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  const onLoaded = () => {
    setLoaded(true);
  };

  return (
    <>
      <div
        className='fixed inset-0 z-0'
        style={{
          backgroundImage: `
              linear-gradient(to right, rgba(229,231,235,0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(229,231,235,0.03) 1px, transparent 1px),
              radial-gradient(circle 500px at 20% 20%, rgba(139,92,246,0.2), transparent),
              radial-gradient(circle 500px at 80% 80%, rgba(59,130,246,0.2), transparent)
            `,
          backgroundSize: '48px 48px, 48px 48px, 100% 100%, 100% 100%',
        }}
      />
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
            <Skills />
          </>
        ) : null}
        <ChatBot />
      </main>
    </>
  );
}
