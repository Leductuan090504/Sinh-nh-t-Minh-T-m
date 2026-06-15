import { motion, useAnimationControls } from 'framer-motion';
import { useEffect, useRef } from 'react';
import type { IntroPhase } from './LetterIntro';
import useMediaQuery from '../hooks/useMediaQuery';

type FlipLetterProps = {
  phase: IntroPhase;
  onFlipComplete: () => void;
};

const hasLetterRisen = (phase: IntroPhase) =>
  phase === 'risingLetter' || phase === 'showingCover' || phase === 'flippingLetter' || phase === 'showingMessage';

export default function FlipLetter({ phase, onFlipComplete }: FlipLetterProps) {
  const controls = useAnimationControls();
  const hasRunFlipRef = useRef(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (phase !== 'closed') return;

    hasRunFlipRef.current = false;
    controls.set({ rotateY: 0, scale: 1 });
  }, [controls, phase]);

  useEffect(() => {
    if (phase !== 'flippingLetter' || hasRunFlipRef.current) return;

    hasRunFlipRef.current = true;

    const flipToMessage = async () => {
      await controls.start({
        rotateY: 90,
        scale: isMobile ? 1.02 : 1.08,
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
      });

      onFlipComplete();
    };

    void flipToMessage();
  }, [controls, isMobile, onFlipComplete, phase]);

  const visibleY = isMobile ? -80 : -135;

  if (phase === 'showingMessage') return null;

  return (
    <motion.div
      className="letter-perspective"
      initial={false}
      animate={{
        x: '-50%',
        y: hasLetterRisen(phase) ? visibleY : 180,
        opacity: hasLetterRisen(phase) ? 1 : 0,
      }}
      transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div className="letter-card" initial={{ rotateY: 0, scale: 1 }} animate={controls}>
        <div className="letter-cover">
          <div className="birthday-title">
            <span>HAPPY</span>
            <span>BIRTHDAY</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
