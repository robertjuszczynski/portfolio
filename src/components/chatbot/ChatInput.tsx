import { useState } from 'react';
import { Send } from 'lucide-react';
import styles from './ChatInput.module.scss';
import { apiRoutes } from '@/lib/apiRoutes';

interface ChatInputProps {
  addMessage: (message: { text: string, type: 'user' | 'bot' }) => void;
  setIsWaiting: (isWaiting: boolean) => void;
  lang: 'en' | 'pl';
}

export default function ChatInput({ addMessage, setIsWaiting, lang }: ChatInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [inputWaiting, setInputWaiting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;

    const userMessage = inputValue;

    addMessage({ text: userMessage, type: 'user' });

    setInputValue('');
    setIsWaiting(true);
    setInputWaiting(true);
    
    try {
      const response = await fetch(apiRoutes.chatbot.ask, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: userMessage,
          lang: lang,
        }),
      });

      const data = await response.json();

      // If response contains an error message, display it
      if (data.message?.text) {
        addMessage({ text: data.message.text, type: 'bot' });
      } else if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      } else {
        addMessage({ text: data.message.text, type: 'bot' });
      }
    } catch (error) {
      console.error('Error fetching AI response:', error);
      addMessage({ text: 'Sorry, I encountered an error. Please try again.', type: 'bot' });
    } finally {
      setIsWaiting(false);
      setInputWaiting(false);
    }
  };

  return (
    <form className={styles.chatbot__inputWrapper} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.chatbot__input}
        placeholder="Type your message..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        disabled={inputWaiting}
      />
      <button 
        type="submit" 
        className={styles.chatbot__send}
        disabled={!inputValue.trim() || inputWaiting}
        onClick={() => handleSubmit}
      >
        <Send size={20} />
      </button>
    </form>
  );
}