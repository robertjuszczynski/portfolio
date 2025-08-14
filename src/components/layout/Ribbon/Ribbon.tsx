import React, { memo } from 'react'
import styles from './Ribbon.module.scss';
import useTranslate from '@/hooks/useTranslate';

const Ribbon = () => {
  const { t } = useTranslate();
  
  const items = [
    t('ribbon.items.fullstack'),
    t('ribbon.items.webdev'),
    t('ribbon.items.uiux'),
    t('ribbon.items.pragmatic'),
    t('ribbon.items.bem'),
    t('ribbon.items.typed'),
    t('ribbon.items.clean'),
    t('ribbon.items.passionate'),
    t('ribbon.items.fitness'),
    t('ribbon.items.build')
  ];

  const renderItems = () => {
    return items.map((item, index) => (
      <React.Fragment key={index}>
        <span className={styles.item}>{item}</span>
        <span className={styles.dot}>•</span>
      </React.Fragment>
    ));
  };

  return (
    <div className={styles.ribbon}>
      <div className={styles.scrollingText}>
        {renderItems()}
        {renderItems()}
        {renderItems()}
      </div>
    </div>
  )
}

export default memo(Ribbon);