import { useRef, useState } from 'react';
import styles from './MobileHeader.module.scss';
import { animate, AnimatePresence, motion } from 'framer-motion';
import { Github, Linkedin, Facebook, Instagram, X } from 'lucide-react';

const SOCIALS = ['github', 'linkedin', 'facebook', 'instagram'];

const ICON_MAP: any = {
  github: Github,
  linkedin: Linkedin,
  facebook: Facebook,
  instagram: Instagram,
};

export default function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const logoRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen((prev) => {
      if (logoRef.current) {
        animate(logoRef.current, { color: !prev ? '#000' : '#fff' });
      }
      return !prev;
    });
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
                  const Icon = ICON_MAP[item];
                  if (!Icon) return null;

                  return (
                    <motion.div
                      transition={{
                        delay: 0.1 * SOCIALS.indexOf(item),
                        duration: 0.7,
                      }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      key={item}
                      className={styles.header__socialsItem}
                    >
                      <Icon size={20} />
                    </motion.div>
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
                  <span className={styles.header__emailLabel}>(email)</span>
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
                    (phone number)
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
              {['Projects', 'Experience', 'Skills', 'About me', 'Contact'].map(
                (item, i) => (
                  <div key={item} className={styles.header__nav__itemWrapper}>
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
                      onClick={toggleMenu}
                    >
                      {item}
                    </motion.li>
                  </div>
                )
              )}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
