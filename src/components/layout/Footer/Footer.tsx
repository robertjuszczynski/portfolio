'use client';

import { useRef, memo } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './Footer.module.scss';
import { ArrowUpRight, MoveUp } from 'lucide-react';
import useMediaQuery from '@/hooks/useMediaQuery';
import useTranslate from '@/hooks/useTranslate';

const Footer = () => {
  const footerRef = useRef(null);
  const { isMobile } = useMediaQuery();
  const { t } = useTranslate();
  const isInView = useInView(footerRef, {
    amount: isMobile ? 0.3 : 0.8,
    once: true,
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: 'easeOut',
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  const linkHoverProps = {
    whileHover: {
      color: 'rgb(var(--primary))',
      x: 5,
      transition: { duration: 0.2 },
    },
    whileTap: { scale: 0.98 },
  };

  const socialHoverProps = {
    whileHover: {
      scale: 1.05,
      color: 'rgb(var(--primary))',
      transition: { duration: 0.2 },
    },
    whileTap: { scale: 0.95 },
  };

  const contactHoverProps = {
    whileHover: {
      scale: 1.02,
      x: 5,
      transition: { duration: 0.2 },
    },
    whileTap: { scale: 0.98 },
  };

  return (
    <motion.footer
      id='footer'
      ref={footerRef}
      className={styles.footer}
      initial='hidden'
      animate={isInView ? 'visible' : 'hidden'}
    >
      <motion.div
        className={`${styles.footer__section} ${styles['footer__section--intro']}`}
        variants={containerVariants}
      >
        <motion.h2 className={styles.footer__title} variants={containerVariants}>
          {t('footer.title')}<span className='globals_text-gradient'>{t('footer.title2')}</span>
        </motion.h2>
      </motion.div>

      { !isMobile && <motion.div
        className={`${styles.footer__section} ${styles['footer__section--empty-1']}`}
        variants={containerVariants}
      ></motion.div> }

      <motion.div
        className={`${styles.footer__section} ${styles['footer__section--socials']}`}
        variants={containerVariants}
      >
        <motion.ul className={styles.footer__list} variants={containerVariants}>
          <motion.li
            className={styles.footer__item}
            variants={itemVariants}
            {...socialHoverProps}
          >
            <motion.a
              href='https://github.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              Github
            </motion.a>
          </motion.li>
          <motion.li
            className={styles.footer__item}
            variants={itemVariants}
            {...socialHoverProps}
          >
            <motion.a
              href='https://linkedin.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              Linkedin
            </motion.a>
          </motion.li>
          <motion.li
            className={styles.footer__item}
            variants={itemVariants}
            {...socialHoverProps}
          >
            <motion.a
              href='https://facebook.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              Facebook
            </motion.a>
          </motion.li>
          <motion.li
            className={styles.footer__item}
            variants={itemVariants}
            {...socialHoverProps}
          >
            <motion.a
              href='https://instagram.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              Instagram
            </motion.a>
          </motion.li>
        </motion.ul>
      </motion.div>

      <motion.div
        className={`${styles.footer__section} ${styles['footer__section--contact']}`}
        variants={containerVariants}
      >
        <motion.a
          href='mailto:robert.j.dev@icloud.com'
          className={styles.footer__contact}
          variants={itemVariants}
          {...contactHoverProps}
        >
          robert.j.dev@icloud.com
          <motion.div
            whileHover={{ x: 3, y: -3 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowUpRight
              className={styles.footer__icon}
              width={46}
              height={46}
            />
          </motion.div>
        </motion.a>
        <motion.a
          href='tel:+48515177920'
          className={styles.footer__contact}
          variants={itemVariants}
          {...contactHoverProps}
        >
          +48 515 177 920
          <motion.div
            whileHover={{ x: 3, y: -3 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowUpRight
              className={styles.footer__icon}
              width={46}
              height={46}
            />
          </motion.div>
        </motion.a>
      </motion.div>

      { !isMobile && <motion.div
        className={`${styles.footer__section} ${styles['footer__section--empty-2']}`}
        variants={containerVariants}
      ></motion.div> }
      { !isMobile && <motion.div
        className={`${styles.footer__section} ${styles['footer__section--empty-3']}`}
        variants={containerVariants}
      ></motion.div> }

      <motion.div
        className={`${styles.footer__section} ${styles['footer__section--navigation']}`}
        variants={containerVariants}
      >
        <motion.div
          className={styles.footer__column}
          variants={containerVariants}
        >
          <motion.h3 className={styles.footer__heading}>{t('footer.menu')}</motion.h3>
          <motion.div
            className={styles.footer__itemslist}
            variants={containerVariants}
          >
            <motion.a
              href='#projects'
              className={styles.footer__link}
              variants={itemVariants}
              {...linkHoverProps}
            >
              {t('navigation.projects')}
            </motion.a>
            <motion.a
              href='#experience'
              className={styles.footer__link}
              variants={itemVariants}
              {...linkHoverProps}
            >
              {t('navigation.experience')}
            </motion.a>
            <motion.a
              href='#skills'
              className={styles.footer__link}
              variants={itemVariants}
              {...linkHoverProps}
            >
              {t('navigation.skills')}
            </motion.a>
            <motion.a
              href='#about'
              className={styles.footer__link}
              variants={itemVariants}
              {...linkHoverProps}
            >
              {t('navigation.about')}
            </motion.a>
            <motion.a
              href='#contact'
              className={styles.footer__link}
              variants={itemVariants}
              {...linkHoverProps}
            >
              {t('navigation.contact')}
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className={`${styles.footer__column} ${styles['footer__column--contact']}`}
          variants={containerVariants}
        >
          <motion.h3 className={styles.footer__heading}>
            <motion.a href='#contact'>{t('footer.contact')}</motion.a>
          </motion.h3>
          <motion.div
            className={styles.footer__itemslist}
            variants={containerVariants}
          >
            <motion.a
              href='mailto:robert.j.dev@icloud.com'
              className={styles.footer__link}
              variants={itemVariants}
              {...linkHoverProps}
            >
              robert.j.dev@icloud.com
            </motion.a>
            <motion.a
              href='tel:+48515177920'
              className={styles.footer__phone}
              variants={itemVariants}
              {...linkHoverProps}
            >
              +48 515 177 920
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.footer__column}
          variants={containerVariants}
        >
          <motion.h3 className={styles.footer__heading}>{t('footer.socials')}</motion.h3>
          <motion.div
            className={styles.footer__itemslist}
            variants={containerVariants}
          >
            <motion.a
              href='https://github.com'
              target='_blank'
              rel='noopener noreferrer'
              className={styles.footer__link}
              variants={itemVariants}
              {...linkHoverProps}
            >
              Github
            </motion.a>
            <motion.a
              href='https://linkedin.com'
              target='_blank'
              rel='noopener noreferrer'
              className={styles.footer__link}
              variants={itemVariants}
              {...linkHoverProps}
            >
              Linkedin
            </motion.a>
            <motion.a
              href='https://instagram.com'
              target='_blank'
              rel='noopener noreferrer'
              className={styles.footer__link}
              variants={itemVariants}
              {...linkHoverProps}
            >
              Instagram
            </motion.a>
            <motion.a
              href='https://facebook.com'
              target='_blank'
              rel='noopener noreferrer'
              className={styles.footer__link}
              variants={itemVariants}
              {...linkHoverProps}
            >
              Facebook
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>

      { !isMobile && <motion.div
        className={`${styles.footer__section} ${styles['footer__section--empty-4']}`}
        variants={containerVariants}
      ></motion.div> }

      { !isMobile && <motion.div
        className={`${styles.footer__section} ${styles['footer__section--message']}`}
        variants={containerVariants}
      >
        <motion.p
          className={styles.footer__text}
          variants={{
            hidden: { opacity: 0, x: -30 },
            visible: {
              opacity: 1,
              x: 0,
              transition: { duration: 0.6, delay: 0.3 },
            },
          }}
        >
          {t('footer.message')}
        </motion.p>
        <motion.button
          onClick={scrollToTop}
          className={styles.footer__scroll}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.4, delay: 0.5 },
            },
          }}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.95 }}
        >
          {t('footer.scrollToTop')}
          <motion.div
            className={styles.footer__scrollIcon}
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <MoveUp width={14} height={14} />
          </motion.div>
        </motion.button>
      </motion.div> }
    </motion.footer>
  );
}

export default memo(Footer);