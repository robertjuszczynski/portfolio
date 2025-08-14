'use client';

import { useState } from 'react';
import ChatBot from '@/components/chatbot/ChatBot';
import styles from './page.module.scss';
import Header from '@/components/layout/Header/Header';
import HeroSection from '@/components/layout/Hero/Hero';
import ExperienceSection from '@/components/layout/Experience/Experience';
import Preloader from '@/components/layout/Preloader/Preloader';
import Summary from '@/components/layout/Summary/Summary';
import ProjectsSection from '@/components/layout/Projects/Projects';
import Skills from '@/components/layout/Skills/Skills';
import Ribbon from '@/components/layout/Ribbon/Ribbon';
import Footer from '@/components/layout/Footer/Footer';
import { Robot } from '@/components/layout/Hero/Robot';
import AboutMe from '@/components/layout/AboutMe/AboutMe';
import MobileHeader from '@/components/layout/Header/MobileHeader';
import useMediaQuery from '@/hooks/useMediaQuery';

export default function Home() {
  const [heroReady, setHeroReady] = useState(false);
  const [splineLoading, setSplineLoading] = useState(true);
  const [preloaderVisible, setPreloaderVisible] = useState(true);
  const [startAnimation, setStartAnimation] = useState(false);
  const { isMobile, isTablet, isLargeDesktop, isDesktop } = useMediaQuery();

  const handleHeroReady = () => {
    setHeroReady(true);
  };

  const handleSplineLoad = () => {
    setSplineLoading(false);
  };

  if (heroReady && preloaderVisible && !splineLoading) {
    setPreloaderVisible(false);
    setTimeout(() => setStartAnimation(true), 3750);
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
      <Preloader visible={preloaderVisible} />
      <main className={styles.main} style={{ opacity: 1, transition: 'opacity 0.5s' }}>
        {(isMobile || isTablet || isDesktop ) && <MobileHeader />}
        {isLargeDesktop && <Header />}
        <HeroSection onReady={handleHeroReady} startAnimation={startAnimation} />
        <Robot onReady={handleSplineLoad} />
        {heroReady && <ExperienceSection />}
        <Summary />
        <ProjectsSection />
        <AboutMe />
        <Ribbon />
        <Skills />
        <Footer />
        <ChatBot />
      </main>
    </>
  );
}