import { motion } from 'framer-motion';
import TypewriterLetter from './TypewriterLetter';
import type { IntroPhase } from './LetterIntro';

type FlipLetterProps = {
  phase: IntroPhase;
  onTypingDone: () => void;
};

const hasLetterRisen = (phase: IntroPhase) =>
  phase === 'risingLetter' || phase === 'showingCover' || phase === 'flippingLetter' || phase === 'showingMessage';

const hasFlipped = (phase: IntroPhase) => phase === 'flippingLetter' || phase === 'showingMessage';

export default function FlipLetter({ phase, onTypingDone }: FlipLetterProps) {
  return (
    <motion.div
      className="letter-perspective"
      initial={false}
      animate={{
        x: '-50%',
        y: hasLetterRisen(phase) ? -170 : 210,
        opacity: hasLetterRisen(phase) ? 1 : 0,
      }}
      transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="letter-inner"
        initial={false}
        animate={{ rotateY: hasFlipped(phase) ? 180 : 0 }}
        transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="letter-face letter-cover">
          <div className="birthday-title">
            <span>HAPPY</span>
            <span>BIRTHDAY</span>
          </div>
        </div>

        <div className="letter-face letter-message">
          <TypewriterLetter active={phase === 'showingMessage'} onDone={onTypingDone} />
        </div>
      </motion.div>
    </motion.div>
  );
}
