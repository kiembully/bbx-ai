'use client';
import { useEffect, useState } from 'react';
import { PlaceholdersAndVanishInput } from './ui/placeholder-and-vanish-inputs';
import { motion, AnimatePresence } from 'framer-motion';

const placeholders = [
  "What's the best combo for Attack type in Beyblade X?",
  'Which Blade has the highest stamina in Beyblade X?',
  'How do Ratchets affect performance in battles?',
  'Recommend a Defense-type combo for beginners.',
  'What is the Xtreme Gear System and how does it work?',
];

const ChatHome = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSend();
  };

  const handleSend = async () => {
    if (!message) return;
    setLoading(true);
    setChat((prev) => [...prev, `🧑: ${message}`]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setChat((prev) => [...prev, `🤖: ${data.reply}`]);
    } catch (error) {
      console.error('Error fetching chat response:', error);
      setChat((prev) => [...prev, '🤖: Sorry, something went wrong.']);
    } finally {
      setMessage('');
      setLoading(false);
    }
  };

  return (
    <div className='w-full' style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <div className="h-[40rem] flex flex-col justify-center  items-center px-4 w-full">
        {chat.length === 0 && (
          <h1
            className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black"
          >
            Ask Beyblade X Chat Assistant Anything
          </h1>
        )}
        <motion.div
          className="w-full"
          style={{ whiteSpace: 'pre-wrap', marginBottom: '1rem' }}
          animate={{ height: chat.length > 0 ? '100%' : 'auto' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {chat.map((line, i) => (
            <div
              key={i}
              style={{
                textAlign: i % 2 === 0 ? 'left' : 'right',
                margin: '1rem 0',
                color: i % 2 === 0 ? '#000' : '#000',
                maxWidth: '100%',
                alignSelf: i % 2 === 0 ? 'flex-start' : 'flex-end',
              }}
            >
              <div
                style={{
                  backgroundColor: i % 2 === 0 ? '#323232' : 'transparent',
                  borderRadius: '50px',
                  color: '#fff',
                  padding: '1rem',
                  width: i % 2 === 0 ? 'fit-content' : 'full',
                }}
              >
                {line}
              </div>
            </div>
          ))}
          {loading &&
            <div className='justify-items-end text-right'>
              <div className="flex flex-row gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"></div>
                <div
                  className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-.3s]"
                ></div>
                <div
                  className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-.5s]"
                ></div>
              </div>
            </div>
          }
        </motion.div>
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default ChatHome;
