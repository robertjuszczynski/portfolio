import { useState, useEffect, useRef } from 'react';
import styles from './ChatMessage.module.scss';
import { motion, useInView } from 'framer-motion';

export type ChatMessage = {
  text: string;
  type: 'user' | 'bot';
}

interface ChatMessageProps {
  message: ChatMessage
  isWaiting?: boolean;
}

export default function ChatMessage({ message, isWaiting = false }: ChatMessageProps) {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const messageRef = useRef(null);
  const isInView = useInView(messageRef, { once: true });

  useEffect(() => {
    if (message.type === 'bot' && !isWaiting && isInView) {
      const timer = setTimeout(() => setShouldAnimate(true), 100);
      return () => clearTimeout(timer);
    }
  }, [message.type, isWaiting, isInView]);

  const WaitingDots = () => (
    <div className={styles.chatbot__waiting}>
      <motion.span
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
      />
      <motion.span
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
      />
      <motion.span
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
      />
    </div>
  );

  if (isWaiting && message.type === 'bot') {
    return (
      <div className={`${styles.chatbot__message} ${styles['chatbot__message--bot']}`}>
        <WaitingDots />
      </div>
    );
  }

  return (
    <div 
      ref={messageRef}
      className={`
        ${styles.chatbot__message} 
        ${message.type === 'bot' ? styles['chatbot__message--bot'] : styles['chatbot__message--user']}
      `}
    >
      {message.type === 'bot' ? (
        <span className={styles.chatbot__messageText}>
          {message.text.split('').map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={shouldAnimate ? { opacity: 1 } : {}}
              transition={{ 
                duration: 0.05,
                delay: index * 0.015,
                ease: "easeIn"
              }}
            >
              {letter}
            </motion.span>
          ))}
        </span>
      ) : (
        message.text
      )}
    </div>
  );
}