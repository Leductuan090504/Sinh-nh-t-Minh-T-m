import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import type { IntroPhase } from './LetterIntro';

type RealisticEnvelopeProps = {
  phase: IntroPhase;
  children: ReactNode;
};

const isOpened = (phase: IntroPhase) => phase !== 'closed';

export default function RealisticEnvelope({ phase, children }: RealisticEnvelopeProps) {
  return (
    <div className="envelope-stage">
      <div className="envelope-back" />

      <div className="letter-slot">{children}</div>

      <div className="envelope-front-pocket" />
      <div className="side-fold side-fold-left" />
      <div className="side-fold side-fold-right" />

      <motion.div
        className="envelope-flap"
        initial={false}
        animate={{ rotateX: isOpened(phase) ? -160 : 0 }}
        transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.div
        className="wax-seal"
        initial={false}
        animate={{
          opacity: isOpened(phase) ? 0.35 : 1,
          scale: isOpened(phase) ? 0.82 : 1,
          y: isOpened(phase) ? -10 : 0,
        }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        MT
      </motion.div>
    </div>
  );
}
