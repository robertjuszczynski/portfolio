import { useRef, useState } from 'react';
import styles from './MobileHeader.module.scss';
import { animate, AnimatePresence, motion } from 'framer-motion';
import { Github, Linkedin, Facebook, Instagram, X } from 'lucide-react';
import useTranslate from '@/hooks/useTranslate';
import LanguageSwitcher from './LanguageSwitcher';

const SOCIALS = [
  { name: 'github', url: 'https://github.com/robertjuszczynski' },
  { name: 'linkedin', url: 'https://www.linkedin.com/in/robert-juszczynski/' },
  { name: 'facebook', url: 'https://www.facebook.com/profile.php?id=100008614810091' },
  { name: 'instagram', url: 'https://www.instagram.com/_jusstuss_/' }
];

const ICON_MAP: any = {
  github: Github,
  linkedin: Linkedin,
  facebook: Facebook,
  instagram: Instagram,
};

export default function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const logoRef = useRef(null);
  const { t } = useTranslate();

  const toggleMenu = () => {
    setIsOpen((prev) => {
      if (logoRef.current) {
        animate(logoRef.current, { color: !prev ? '#000' : '#fff' });
      }
      return !prev;
    });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    toggleMenu();
  };

  return (
    <header className={styles.header}>
      <motion.div
        ref={logoRef}
        key='logo'
        transition={{ duration: 0.5 }}
        className={styles.header__logo}
      >
        JR
      </motion.div>

      <AnimatePresence>
        {!isOpen && (
          <div className={styles.header__rightContainer}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, transition: { delay: 0.05, duration: 0.7 } }}
              exit={{ scale: 0 }}
              className={styles.header__languageSwitcher}
            >
              <LanguageSwitcher mobile />
            </motion.div>
            <motion.button
              key='hamburger'
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.5 }}
              className={styles.hamburger}
              onClick={toggleMenu}
            >
              <span className={styles.hamburger__line}></span>
              <span className={styles.hamburger__line}></span>
              <span className={styles.hamburger__line}></span>
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.button
            key='close'
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5 }}
            className={styles.hamburger__x}
            onClick={toggleMenu}
          >
            <X />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className={styles.header__nav}
            key='nav'
            initial={{ right: '-100%' }}
            animate={{ right: 0 }}
            exit={{ right: '-100%' }}
            transition={{ ease: 'circInOut', duration: 0.6 }}
          >
            <div className={styles.header__info}>
              <div className={styles.header__socials}>
                {SOCIALS.map((item) => {
                  const Icon = ICON_MAP[item.name];
                  if (!Icon) return null;

                  return (
                    <motion.a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      transition={{
                        delay: 0.1 * SOCIALS.indexOf(item),
                        duration: 0.7,
                      }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      key={item.name}
                      className={styles.header__socialsItem}
                    >
                      <Icon size={20} />
                    </motion.a>
                  );
                })}
              </div>
              <div className={styles.header__emailWrapper}>
                <motion.div
                  className={styles.header__email}
                  initial={{ y: 40 }}
                  animate={{
                    y: 0,
                    transition: { delay: 0.18, duration: 0.28 },
                  }}
                  exit={{ y: 60, transition: { duration: 0.13 } }}
                >
                  <span className={styles.header__emailLabel}>
                    {t('contact.email')}
                  </span>
                  <a
                    href='mailto:robert.j.dev@icloud.com'
                    className={styles.header__emailLink}
                  >
                    robert.j.dev@icloud.com
                  </a>
                </motion.div>
              </div>
              <div className={styles.header__phoneWrapper}>
                <motion.div
                  className={styles.header__phone}
                  initial={{ y: 40 }}
                  animate={{
                    y: 0,
                    transition: { delay: 0.24, duration: 0.28 },
                  }}
                  exit={{ y: 60, transition: { duration: 0.13 } }}
                >
                  <span className={styles.header__phoneLabel}>
                    {t('contact.phone')}
                  </span>
                  <a
                    href='tel:+48515177920'
                    className={styles.header__phoneLink}
                  >
                    +48 515 177 920
                  </a>
                </motion.div>
              </div>
            </div>
            <ul className={styles.header__nav__list}>
              {[
                { key: 'navigation.projects', id: 'projects' },
                { key: 'navigation.experience', id: 'experience' },
                { key: 'navigation.skills--mobile', id: 'skillsTech' },
                { key: 'navigation.about', id: 'aboutMe' },
                { key: 'navigation.contact', id: 'footer' },
              ].map((item, i) => (
                <div key={item.key} className={styles.header__nav__itemWrapper}>
                  <motion.li
                    className={styles.header__nav__item}
                    initial={{ y: 40, rotate: 4, opacity: 0 }}
                    animate={{
                      y: 0,
                      rotate: 0,
                      opacity: 1,
                      transition: { delay: 0.35 + i * 0.1, duration: 0.5 },
                    }}
                    exit={{
                      y: 40,
                      rotate: 4,
                      opacity: 0,
                      transition: { duration: 0.5 },
                    }}
                    onClick={() => scrollToSection(item.id)}
                  >
                    {t(item.key)}
                  </motion.li>
                </div>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
