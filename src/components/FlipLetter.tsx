import { motion, useAnimationControls } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import type { IntroPhase } from './LetterIntro';
import TypewriterLetter from './TypewriterLetter';
import useMediaQuery from '../hooks/useMediaQuery';

type FlipLetterProps = {
  phase: IntroPhase;
  onFlipComplete: () => void;
  onTypingDone: () => void;
};

const hasLetterRisen = (phase: IntroPhase) =>
  phase === 'risingLetter' || phase === 'showingCover' || phase === 'flippingLetter' || phase === 'showingMessage';

export default function FlipLetter({ phase, onFlipComplete, onTypingDone }: FlipLetterProps) {
  const controls = useAnimationControls();
  const [letterSide, setLetterSide] = useState<'cover' | 'message'>('cover');
  const hasRunFlipRef = useRef(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (phase !== 'closed') return;

    hasRunFlipRef.current = false;
    setLetterSide('cover');
    controls.set({ rotateY: 0, scale: 1 });
  }, [controls, phase]);

  useEffect(() => {
    if (phase !== 'flippingLetter' || hasRunFlipRef.current) return;

    hasRunFlipRef.current = true;

    const flipToMessage = async () => {
      await controls.start({
        rotateY: 90,
        scale: isMobile ? 1.02 : 1.02,
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
      });

      setLetterSide('message');
      controls.set({ rotateY: -90, scale: isMobile ? 1.02 : 1.02 });

      await controls.start({
        rotateY: 0,
        scale: isMobile ? 1.02 : 1.05,
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
      });

      onFlipComplete();
    };

    void flipToMessage();
  }, [controls, isMobile, onFlipComplete, phase]);

  const isReadingMode = phase === 'showingMessage';
  const visibleY = isMobile ? -80 : -135;

  return (
    <>
      {isMobile && isReadingMode && <motion.div className="mobile-reading-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />}
      <motion.div
        className={`letter-perspective ${isMobile && isReadingMode ? 'mobile-message-mode' : ''}`}
        initial={false}
        animate={{
          x: '-50%',
          y: hasLetterRisen(phase) ? visibleY : 180,
          opacity: hasLetterRisen(phase) ? 1 : 0,
        }}
        transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div className="letter-card" initial={{ rotateY: 0, scale: 1 }} animate={controls}>
          {letterSide === 'cover' ? (
            <div className="letter-cover">
              <div className="birthday-title">
                <span>HAPPY</span>
                <span>BIRTHDAY</span>
              </div>
            </div>
          ) : (
            <div className="letter-message">
              <TypewriterLetter active={phase === 'showingMessage'} onDone={onTypingDone} />
            </div>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
