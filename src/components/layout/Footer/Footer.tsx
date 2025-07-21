import { motion } from 'framer-motion';
import styles from './Footer.module.scss';
import { ArrowUpRight, MoveUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.footer__section} ${styles['footer__section--intro']}`}>
        <motion.h2 
          className={styles.footer__title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Get in <span className="globals_text-gradient">touch</span>
        </motion.h2>
      </div>
      
      <div className={`${styles.footer__section} ${styles['footer__section--empty-1']}`}></div>
      
      <div className={`${styles.footer__section} ${styles['footer__section--socials']}`}>
        <ul className={styles.footer__list}>
          <li className={styles.footer__item}>Github</li>
          <li className={styles.footer__item}>Linkedin</li>
          <li className={styles.footer__item}>Facebook</li>
          <li className={styles.footer__item}>Instagram</li>
        </ul>
      </div>
      
      <div className={`${styles.footer__section} ${styles['footer__section--contact']}`}>
        <span className={styles.footer__contact}>
          robert.j.dev@icloud.com 
          <ArrowUpRight className={styles.footer__icon} width={46} height={46}/>
        </span>
        <span className={styles.footer__contact}>
          +48 515 177 920 
          <ArrowUpRight className={styles.footer__icon} width={46} height={46}/>
        </span>
      </div>
      
      <div className={`${styles.footer__section} ${styles['footer__section--empty-2']}`}></div>
      <div className={`${styles.footer__section} ${styles['footer__section--empty-3']}`}></div>
      
      <div className={`${styles.footer__section} ${styles['footer__section--navigation']}`}>
        <div className={styles.footer__column}>
          <h3 className={styles.footer__heading}>Menu</h3>
          <div className={styles.footer__itemslist}>
            <a href='#' className={styles.footer__link}>Projects</a>
            <a href='#' className={styles.footer__link}>Experience</a>
            <a href='#' className={styles.footer__link}>Skills & Technologies</a>
            <a href='#' className={styles.footer__link}>About me</a>
            <a href='#' className={styles.footer__link}>Contact</a>
          </div>
        </div>

        <div className={`${styles.footer__column} ${styles['footer__column--contact']}`}>
          <h3 className={styles.footer__heading}>
            <a href='#'>Contact</a>
          </h3>
          <div className={styles.footer__itemslist}>
            <a href='mailto:robert.j.dev@icloud.com' className={styles.footer__link}>
              robert.j.dev@icloud.com
            </a>
            <span className={styles.footer__phone}>+48 515 177 920</span>
          </div>
        </div>

        <div className={styles.footer__column}>
          <h3 className={styles.footer__heading}>Socials</h3>
          <div className={styles.footer__itemslist}>
            <a href='#' className={styles.footer__link}>Github</a>
            <a href='#' className={styles.footer__link}>Linkedin</a>
            <a href='#' className={styles.footer__link}>Instagram</a>
            <a href='#' className={styles.footer__link}>Facebook</a>
          </div>
        </div>
      </div>
      
      <div className={`${styles.footer__section} ${styles['footer__section--empty-4']}`}></div>
      
      <div className={`${styles.footer__section} ${styles['footer__section--message']}`}>
        <p className={styles.footer__text}>
          Always curious about new projects and challenges. Whether you're looking 
          for a <span className="globals_text-gradient">full-time teammate</span> or a <span className="globals_text-gradient">freelance partner</span>, I'm just a message away. 
          Let's connect!
        </p>
        <span className={styles.footer__scroll}>
          Take me to the top 
          <div className={styles.footer__scrollIcon}>
            <MoveUp width={14} height={14} />
          </div>
        </span>
      </div>
    </footer>
  );
}