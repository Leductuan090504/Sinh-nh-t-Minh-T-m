import { motion } from 'framer-motion';
import { useState } from 'react';
import TypewriterLetter from './TypewriterLetter';

type FlipLetterProps = {
  isOpen: boolean;
  onTypingDone: () => void;
};

export default function FlipLetter({ isOpen, onTypingDone }: FlipLetterProps) {
  const [isContentActive, setIsContentActive] = useState(false);

  return (
    <motion.div
      className="letter-perspective"
      initial={false}
      animate={{
        x: '-50%',
        y: isOpen ? -210 : 180,
        opacity: isOpen ? 1 : 0,
        scale: isOpen ? 1 : 0.96,
      }}
      transition={{ duration: 1.35, delay: isOpen ? 0.85 : 0, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="letter-inner"
        initial={false}
        animate={{ rotateY: isOpen ? 180 : 0 }}
        transition={{ duration: 1.1, delay: isOpen ? 2.4 : 0, ease: [0.22, 1, 0.36, 1] }}
        onAnimationComplete={() => {
          if (isOpen) {
            setIsContentActive(true);
          }
        }}
      >
        <div className="letter-face letter-cover">
          <div className="letter-cover-title">
            <span>HAPPY</span>
            <span>BIRTHDAY</span>
          </div>
        </div>

        <div className="letter-face letter-message">
          <TypewriterLetter active={isContentActive} onDone={onTypingDone} />
        </div>
      </motion.div>
    </motion.div>
  );
}
