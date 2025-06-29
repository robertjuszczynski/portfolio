import { useState } from 'react';
import Image from 'next/image';
import UKFlag from '@/../public/images/gb.png';
import PLFlag from '@/../public/images/pl.png';
import styles from './LanguageSwitcher.module.scss';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectLanguage = (lang: string) => {
    setIsOpen(false);
  };

  return (
    <div className={styles.switcher}>
      <div className={styles.switcher__selected} onClick={toggleDropdown}>
        <Image src={UKFlag} alt='United Kingdom flag' width={28} height={28} />
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
            <div 
              className={styles.switcher__option}
              onClick={() => selectLanguage('pl')}
            >
              <Image src={PLFlag} alt='Polish flag' width={28} height={28} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}