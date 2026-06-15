import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import BalloonIntro from './BalloonIntro';
import EnvelopeDecorations from './EnvelopeDecorations';
import FlipLetter from './FlipLetter';
import ReadingLetterOverlay from './ReadingLetterOverlay';
import RealisticEnvelope from './RealisticEnvelope';
import useMediaQuery from '../hooks/useMediaQuery';

export type IntroPhase =
  | 'balloonIntro'
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
  const [phase, setPhase] = useState<IntroPhase>('balloonIntro');
  const [isReadyForNext, setIsReadyForNext] = useState(false);
  const timersRef = useRef<number[]>([]);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const introDurationMs = isMobile ? 6000 : 6800;
  const isReadingMode = phase === 'showingMessage';

  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  useEffect(() => {
    if (phase !== 'balloonIntro') return;

    const timer = window.setTimeout(() => {
      setPhase('closed');
    }, introDurationMs);

    return () => window.clearTimeout(timer);
  }, [introDurationMs, phase]);

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
    <motion.div
      className="envelope-scene relative z-10 flex min-h-screen w-full items-center justify-center overflow-hidden px-4 py-8 text-left"
      exit={{ opacity: 0, scale: 1.03, filter: 'blur(10px)' }}
      transition={{ duration: 0.8 }}
    >
      <div className="starry-background" />

      <AnimatePresence mode="wait">
        {phase === 'balloonIntro' ? (
          <BalloonIntro key="balloon-intro" introDurationMs={introDurationMs} isMobile={isMobile} />
        ) : (
          <motion.div
            key="letter-intro"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.03, filter: 'blur(10px)' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex w-full flex-col items-center justify-center text-left"
          >
            {phase !== 'balloonIntro' && phase !== 'showingMessage' && <EnvelopeDecorations phase={phase} />}

            <motion.button
              type="button"
              onClick={handlePress}
              className="relative z-10 flex w-full cursor-pointer flex-col items-center justify-center text-left"
              aria-label={phase === 'closed' ? 'Open birthday letter' : 'View birthday details'}
            >
              <div className="letter-scene">
                <RealisticEnvelope phase={phase}>
                  <FlipLetter
                    phase={phase}
                    onFlipComplete={() => setPhase('showingMessage')}
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
          </motion.div>
        )}
      </AnimatePresence>

      <ReadingLetterOverlay
        isOpen={isReadingMode}
        onClick={handlePress}
        onTypingDone={() => setIsReadyForNext(true)}
      />
    </motion.div>
  );
}
