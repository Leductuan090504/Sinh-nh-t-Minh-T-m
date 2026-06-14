import { motion } from 'framer-motion';
import { useState } from 'react';
import FlipLetter from './FlipLetter';
import RealisticEnvelope from './RealisticEnvelope';

type LetterIntroProps = {
  onOpen: () => void;
  onComplete: () => void;
};

export default function LetterIntro({ onOpen, onComplete }: LetterIntroProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isReadyForNext, setIsReadyForNext] = useState(false);

  const handlePress = () => {
    if (!isOpen) {
      setIsOpen(true);
      onOpen();
      return;
    }

    if (isReadyForNext) {
      onComplete();
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handlePress}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.03, filter: 'blur(10px)' }}
      transition={{ duration: 0.8 }}
      className="envelope-scene relative z-10 flex min-h-screen w-full cursor-pointer items-center justify-center overflow-hidden px-4 py-8 text-left"
      aria-label={isOpen ? 'View birthday details' : 'Open birthday letter'}
    >
      <div className="starry-background" />
      <div className="letter-scene">
        <div className="letter-stage">
          <RealisticEnvelope isOpen={isOpen} />
          <FlipLetter isOpen={isOpen} onTypingDone={() => setIsReadyForNext(true)} />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isReadyForNext ? 1 : 0, y: isReadyForNext ? 0 : 10 }}
          transition={{ duration: 0.45 }}
          className="mt-8 text-center text-xs font-bold uppercase tracking-[0.28em] text-[#ffdca8]"
        >
          Tap to view the birthday details
        </motion.p>
      </div>
    </motion.button>
  );
}
