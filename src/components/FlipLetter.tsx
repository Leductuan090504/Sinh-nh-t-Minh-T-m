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
      className="flip-letter-stage"
      initial={false}
      animate={{
        x: '-50%',
        y: isOpen ? -128 : 126,
        opacity: isOpen ? 1 : 0,
        scale: isOpen ? 1 : 0.92,
      }}
      transition={{ duration: 1.28, delay: isOpen ? 0.92 : 0, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="flip-letter"
        initial={false}
        animate={{ rotateY: isOpen ? 180 : 0 }}
        transition={{ duration: 1.12, delay: isOpen ? 2.42 : 0, ease: [0.65, 0, 0.35, 1] }}
        onAnimationComplete={() => {
          if (isOpen) {
            setIsContentActive(true);
          }
        }}
      >
        <div className="flip-letter__face flip-letter__cover">
          <div className="letter-cover-title">
            <span>HAPPY</span>
            <strong>BIRTHDAY</strong>
          </div>
        </div>
        <div className="flip-letter__face flip-letter__content">
          <TypewriterLetter active={isContentActive} onDone={onTypingDone} />
        </div>
      </motion.div>
    </motion.div>
  );
}
