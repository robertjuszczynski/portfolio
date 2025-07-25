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
import Footer from '@/components/layout/Footer/Footer';
import { Robot } from '@/components/layout/Hero/Robot';

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  const onLoaded = () => {
    setLoaded(true);
  };

  return (
    <>
      <div
        className='fixed inset-0 z-[-1]'
        style={{
          backgroundImage: `
              linear-gradient(to right, rgba(229,231,235,0.04) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(229,231,235,0.04) 1px, transparent 1px)
            `,
          backgroundSize: '48px 48px, 48px 48px, 100% 100%, 100% 100%',
        }}
      />
      <main className={styles.main}>
        <Preloader loaded={onLoaded} />
        {loaded && (
          <>
            <Header />
            <HeroSection />
          </>
        )}
        <Robot />
        {loaded && (
          <>
            <ExperienceSection />
            <Summary />
            <ProjectsSection />
            <Ribbon />
            <Skills />
            <Footer />
          </>
        )}   
        <ChatBot />
      </main>
    </>
  );
}
