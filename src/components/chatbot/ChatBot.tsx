import { MessagesSquare, X, Sparkles } from 'lucide-react';
import styles from './ChatBot.module.scss';
import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import ChatMessageComponent, { type ChatMessage } from './ChatMessage';
import ChatInput from './ChatInput';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [isWaiting, setIsWaiting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const addMessage = (message: { text: string; type: 'user' | 'bot' }) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className={styles.chatbot}>
      <motion.button
        className={styles.chatbot__button}
        whileTap={{
          scale: 1.4,
          transition: { duration: 0.3 },
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessagesSquare className={styles.chatbot__icon} />
      </motion.button>

      <motion.div
        key='modal'
        initial={{ opacity: 0, scale: 0.9, pointerEvents: 'none' }}
        animate={{
          opacity: isOpen ? 1 : 0,
          scale: isOpen ? 1 : 0.9,
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
        transition={{ duration: 0.2 }}
        className={styles.chatbot__modal}
      >
        <div className={styles.chatbot__header}>
          <Sparkles
            className={`${styles.chatbot__sparkles} fill-accent`}
            width={20}
            height={20}
          />
          <span className={styles.chatbot__title}>Robert Juszczyński</span>
          <button
            className={styles.chatbot__close}
            onClick={() => setIsOpen(false)}
          >
            <X />
          </button>
        </div>

        <div className={styles.chatbot__content}>
          {messages.map((msg, index) => (
            <ChatMessageComponent key={index} message={msg} />
          ))}

          {isWaiting && (
            <ChatMessageComponent
              message={{ text: '', type: 'bot' }}
              isWaiting
            />
          )}

          <div ref={messagesEndRef} />
        </div>

        <ChatInput
          addMessage={addMessage}
          setIsWaiting={setIsWaiting}
        />
      </motion.div>
    </div>
  );
}
