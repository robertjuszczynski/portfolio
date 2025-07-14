import React from 'react'
import styles from './Ribbon.module.scss';

export default function Ribbon() {
  const items = [
    "Dedicated systems",
    "Websites",
    "Sometimes design",
    "Do not reinvent the wheel",
    "BEM",
    "Strong typing",
    "Clean code structure",
    "Code lover",
    "Working out is life!",
    "Do you read any of this?",
    "Let's talk about our future plans"
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