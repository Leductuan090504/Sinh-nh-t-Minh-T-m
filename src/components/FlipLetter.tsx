import { motion } from 'framer-motion';
import { useState } from 'react';
import TypewriterLetter from './TypewriterLetter';

type FlipLetterProps = {
  isOpen: boolean;
  onTypingDone: () => void;
};

export default function FlipLetter({ isOpen, onTypingDone }: FlipLetterProps) {
  const [isFrontVisible, setIsFrontVisible] = useState(false);

  return (
    <motion.div
      className="flip-letter-stage"
      initial={false}
      animate={{
        x: '-50%',
        y: isOpen ? -112 : 86,
        opacity: isOpen ? 1 : 0,
        scale: isOpen ? 1 : 0.86,
      }}
      transition={{ duration: 1, delay: isOpen ? 0.42 : 0, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="flip-letter"
        initial={false}
        animate={{ rotateY: isOpen ? 180 : 0 }}
        transition={{ duration: 1.15, delay: isOpen ? 1.08 : 0, ease: [0.22, 1, 0.36, 1] }}
        onAnimationComplete={() => {
          if (isOpen) {
            setIsFrontVisible(true);
          }
        }}
      >
        <div className="flip-letter__face flip-letter__back">
          <div className="letter-back-mark">
            <span>For you</span>
          </div>
        </div>
        <div className="flip-letter__face flip-letter__front">
          <TypewriterLetter active={isFrontVisible} onDone={onTypingDone} />
        </div>
      </motion.div>
    </motion.div>
  );
}
