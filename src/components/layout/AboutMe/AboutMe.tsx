import React, { memo } from 'react';
import { motion } from 'framer-motion';
import styles from './AboutMe.module.scss';
import Image from 'next/image';

const AboutMe = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
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
          <p className={styles.aboutMeHeader__label}>LITTLE BIT ABOUT MYSELF</p>
          <h2 className={styles.aboutMeHeader__title}>
            Some say I <span className="globals_text-gradient">debug</span> in my sleep.
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
          <p>
            I'm Robert a proactive full-stack developer passionate about creating dynamic web experiences. 
            From frontend to backend, I thrive on solving complex problems with clean, efficient code. 
            My expertise spans React, Next.js, and Node.js, and I'm always eager to learn more.
          </p>
          
          <p>
            When I'm not immersed in work, I'm exploring new ideas and staying curious. 
            Life's about balance, and I love embracing every part of it.
          </p>
          
          <p>
            I believe in waking up each day eager to make a difference!
          </p>
          
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
            Let's Connect
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