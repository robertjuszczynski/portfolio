'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import styles from './AboutMe.module.scss';
import Image from 'next/image';
import useTranslate from '@/hooks/useTranslate';

const AboutMe = () => {
  const { t } = useTranslate();
  
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderTitle = () => {
    const title = t('about.title');
    if (title.includes('<debug>') && title.includes('</debug>')) {
      const parts = title.split(/<debug>|<\/debug>/);
      return (
        <>
          {parts[0]}
          <span className="globals_text-gradient">{parts[1]}</span>
          {parts[2]}
        </>
      );
    }
    return title;
  };

  return (
    <section id="aboutMe" className={styles.aboutMe}>
      <div className={styles.aboutMe__content}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
          }}
          viewport={{ amount: 0.3, once: true }}
          className={styles.aboutMeHeader}
        >
          <p className={styles.aboutMeHeader__label}>{t('about.label')}</p>
          <h2 className={styles.aboutMeHeader__title}>
            {renderTitle()}
          </h2>
        </motion.div>

        <motion.div
          className={styles.aboutMe__text}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, delay: 0.2 },
          }}
          viewport={{ amount: 0.3, once: true }}
        >
          <p>{t('about.paragraph1')}</p>
          <p>{t('about.paragraph2')}</p>
          <p>{t('about.paragraph3')}</p>
          
          <motion.button 
            className={styles.aboutMe__contactButton}
            onClick={scrollToContact}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0 }}
            whileInView={{ 
              opacity: 1,
              transition: { duration: 0.4, delay: 0.4 } 
            }}
            viewport={{ amount: 0.3, once: true }}
          >
            {t('about.contactButton')}
          </motion.button>
        </motion.div>
      </div>

      <div className={styles.aboutMe__images}>
        <motion.div 
          className={`${styles.aboutMe__imageWrapper} ${styles['aboutMe__imageWrapper--top']}`}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ 
            opacity: 1, 
            x: 0,
            transition: { duration: 0.4 } 
          }}
          viewport={{ amount: 0.3, once: true }}
        >
          <Image
            src="/images/about/me_1.png"
            alt="About me"
            width={348}
            height={348}
            className={styles.aboutMe__image}
          />
        </motion.div>
        
        <motion.div 
          className={`${styles.aboutMe__imageWrapper} ${styles['aboutMe__imageWrapper--middle']}`}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ 
            opacity: 1, 
            x: 0,
            transition: { duration: 0.4, delay: 0.15 } 
          }}
          viewport={{ amount: 0.3, once: true }}
        >
          <Image
            src="/images/about/me_2.png"
            alt="About me"
            width={348}
            height={348}
            className={styles.aboutMe__image}
          />
        </motion.div>
        
        <motion.div 
          className={`${styles.aboutMe__imageWrapper} ${styles['aboutMe__imageWrapper--bottom']}`}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ 
            opacity: 1, 
            x: 0,
            transition: { duration: 0.4, delay: 0.25 } 
          }}
          viewport={{ amount: 0.3, once: true }}
        >
          <Image
            src="/images/about/me_3.png"
            alt="About me"
            width={348}
            height={348}
            className={styles.aboutMe__image}
          />
        </motion.div>
      </div>
    </section>
  );
}

export default memo(AboutMe);