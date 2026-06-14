import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import FlipLetter from './FlipLetter';
import RealisticEnvelope from './RealisticEnvelope';

export type IntroPhase =
  | 'closed'
  | 'openingFlap'
  | 'risingLetter'
  | 'showingCover'
  | 'flippingLetter'
  | 'showingMessage';

type LetterIntroProps = {
  onOpen: () => void;
  onComplete: () => void;
};

export default function LetterIntro({ onOpen, onComplete }: LetterIntroProps) {
  const [phase, setPhase] = useState<IntroPhase>('closed');
  const [isReadyForNext, setIsReadyForNext] = useState(false);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  const openLetter = () => {
    if (phase !== 'closed') return;

    onOpen();
    setPhase('openingFlap');

    timersRef.current = [
      window.setTimeout(() => setPhase('risingLetter'), 700),
      window.setTimeout(() => setPhase('showingCover'), 2100),
      window.setTimeout(() => setPhase('flippingLetter'), 2900),
    ];
  };

  const handlePress = () => {
    if (phase === 'closed') {
      openLetter();
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
      aria-label={phase === 'closed' ? 'Open birthday letter' : 'View birthday details'}
    >
      <div className="starry-background" />
      <div className="letter-scene">
        <RealisticEnvelope phase={phase}>
          <FlipLetter
            phase={phase}
            onFlipComplete={() => setPhase('showingMessage')}
            onTypingDone={() => setIsReadyForNext(true)}
          />
        </RealisticEnvelope>

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
