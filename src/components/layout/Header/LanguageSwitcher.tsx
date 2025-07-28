import { useState } from 'react';
import Image from 'next/image';
import UKFlag from '@/../public/images/gb.png';
import PLFlag from '@/../public/images/pl.png';
import styles from './LanguageSwitcher.module.scss';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useTranslate from '@/hooks/useTranslate';
import { useRouter } from 'next/navigation';

const languages = [
  { code: 'en', flag: UKFlag },
  { code: 'pl', flag: PLFlag },
];

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { lang } = useTranslate();
  const selectedLanguage = languages.find((i) => i.code === lang);
  const router = useRouter();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectLanguage = (lang: string) => {
    router.push(`/${lang}`);
    setIsOpen(false);
  };

  return (
    <div className={styles.switcher}>
      <div className={styles.switcher__selected} onClick={toggleDropdown}>
        <Image
          src={selectedLanguage!.flag}
          alt={selectedLanguage!.code}
          width={28}
          height={28}
        />
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown />
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.switcher__dropdown}
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {languages
              .filter((langObj) => langObj.code !== selectedLanguage?.code)
              .map((langObj) => (
                <div
                  key={langObj.code}
                  className={styles.switcher__option}
                  onClick={() => selectLanguage(langObj.code)}
                >
                  <Image
                    src={langObj.flag}
                    alt={`${langObj.code} flag`}
                    width={28}
                    height={28}
                  />
                </div>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
