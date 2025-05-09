'use client';
import { useState } from 'react';
import { PlaceholdersAndVanishInput } from './ui/placeholder-and-vanish-inputs';
import { motion } from 'framer-motion';
import { HoverBorderGradient } from './ui/hover-border-gradiient';
import { IconHammer, IconChartFunnel } from '@tabler/icons-react';
import Link from 'next/link';

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
    <div className="w-full">
      <div className="flex flex-col justify-center items-center py-4 w-full min-h-screen">
        {chat.length === 0 && (
          <h1 className="mb-10 sm:mb-20 text-2xl text-center sm:text-5xl dark:text-white text-black">
            Ask Beyblade X Chat Assistant Anything
          </h1>
        )}
        <motion.div
          className="w-full whitespace-pre-wrap mb-4"
          animate={{
            height: chat.length > 0 ? '100%' : 'auto',
            flex: chat.length > 0 ? 'auto' : 'none',
          }}
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
          {loading && (
            <div className="justify-items-end text-right">
              <div className="flex flex-row gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-.3s]"></div>
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-.5s]"></div>
              </div>
            </div>
          )}
        </motion.div>
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
        <div className="flex gap-4 items-center justify-center mt-4">
          <HoverBorderGradient className="flex gap-2 cursor-pointer bg-white text-neutral-800 opacity-90 hover:opacity-100 duration-100">
            <Link href="/collections" className="flex gap-2 relative">
              {/* Animated Hammer Icon with a continuous movement */}
              <motion.div
                animate={{
                  rotate: [0, -15, 10, -10, 0], // Continuous rotation
                }}
                transition={{
                  duration: 2, // 5-second interval
                  repeat: Infinity, // Repeat indefinitely
                  repeatType: 'loop', // Ensure the animation loops
                  ease: 'easeInOut', // Smooth easing
                }}
              >
                <IconChartFunnel stroke={2} />
              </motion.div>
              <span>Collections</span>
            </Link>
          </HoverBorderGradient>
          <HoverBorderGradient className="flex gap-2 cursor-pointer opacity-90 hover:opacity-100 duration-100">
            <Link href="/dashboard" className="flex gap-2 relative">
              <motion.div
                animate={{
                  rotate: [0, -15, 10, -10, 0], // Continuous rotation
                }}
                transition={{
                  duration: 2, // 5-second interval
                  repeat: Infinity, // Repeat indefinitely
                  repeatType: 'loop', // Ensure the animation loops
                  ease: 'easeInOut', // Smooth easing
                }}
              >
                <IconHammer stroke={2} />
              </motion.div>
              <span>Bey Simulator</span>
            </Link>
          </HoverBorderGradient>
        </div>
      </div>
    </div>
  );
};

export default ChatHome;
