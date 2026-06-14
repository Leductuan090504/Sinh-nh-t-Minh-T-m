import { motion, useAnimationControls } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import type { IntroPhase } from './LetterIntro';
import TypewriterLetter from './TypewriterLetter';

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

  useEffect(() => {
    if (phase !== 'closed') return;

    hasRunFlipRef.current = false;
    setLetterSide('cover');
    controls.set({ rotateY: 0 });
  }, [controls, phase]);

  useEffect(() => {
    if (phase !== 'flippingLetter' || hasRunFlipRef.current) return;

    hasRunFlipRef.current = true;

    const flipToMessage = async () => {
      await controls.start({
        rotateY: 90,
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
      });

      setLetterSide('message');
      controls.set({ rotateY: -90 });

      await controls.start({
        rotateY: 0,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
      });

      onFlipComplete();
    };

    void flipToMessage();
  }, [controls, onFlipComplete, phase]);

  return (
    <motion.div
      className="letter-perspective"
      initial={false}
      animate={{
        x: '-50%',
        y: hasLetterRisen(phase) ? -135 : 180,
        opacity: hasLetterRisen(phase) ? 1 : 0,
      }}
      transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div className="letter-card" initial={{ rotateY: 0 }} animate={controls}>
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
  );
}
