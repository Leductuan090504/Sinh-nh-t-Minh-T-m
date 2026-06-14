import { motion } from 'framer-motion';
import { useEffect } from 'react';

type TypewriterLetterProps = {
  active: boolean;
  onDone: () => void;
};

const paragraphs = [
  'You are warmly invited to join a special birthday celebration surrounded by dear friends, filled with joy, laughter, delicious food, and unforgettable moments.',
  'Minh Tam would be truly happy to have you there to celebrate, share heartfelt conversations, capture beautiful photos, and create precious memories together on this special evening.',
  "Your presence will be the greatest gift of all—but if you'd still like to bring a little something, it will be warmly appreciated.",
];

export default function TypewriterLetter({ active, onDone }: TypewriterLetterProps) {
  useEffect(() => {
    if (!active) return;
    const timeout = window.setTimeout(onDone, 1500);
    return () => window.clearTimeout(timeout);
  }, [active, onDone]);

  return (
    <div className="letter-message-content">
      <motion.p
        className="letter-greeting"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: active ? 1 : 0, y: active ? 0 : 8 }}
        transition={{ duration: 0.35 }}
      >
        Dear Love,
      </motion.p>

      {paragraphs.map((paragraph, index) => (
        <motion.p
          key={paragraph}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: active ? 1 : 0, y: active ? 0 : 8 }}
          transition={{ duration: 0.35, delay: 0.18 + index * 0.16 }}
        >
          {paragraph}
        </motion.p>
      ))}

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: active ? 1 : 0, y: active ? 0 : 8 }}
        transition={{ duration: 0.35, delay: 0.72 }}
      >
        With love,
      </motion.p>
      <motion.p
        className="signature"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: active ? 1 : 0, y: active ? 0 : 8 }}
        transition={{ duration: 0.35, delay: 0.86 }}
      >
        Minh Tam
      </motion.p>
    </div>
  );
}
