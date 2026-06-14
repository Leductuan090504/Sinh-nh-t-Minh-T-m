import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

type AnimatedEnvelopeProps = {
  isOpen?: boolean;
  compact?: boolean;
};

export default function AnimatedEnvelope({ isOpen = false, compact = false }: AnimatedEnvelopeProps) {
  return (
    <div className={`cinematic-envelope ${compact ? 'cinematic-envelope--compact' : ''}`}>
      <motion.div
        className="cinematic-envelope__letter"
        animate={{
          y: isOpen ? (compact ? -54 : -86) : 0,
          opacity: isOpen ? 1 : 0.92,
          rotateX: isOpen ? 0 : 4,
        }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <span>For you</span>
      </motion.div>
      <div className="cinematic-envelope__body" />
      <motion.div
        className="cinematic-envelope__flap"
        animate={{
          rotateX: isOpen ? -168 : 0,
          y: isOpen ? -4 : 0,
        }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="cinematic-envelope__shine" />
      <motion.div
        className="cinematic-envelope__seal"
        animate={{ scale: isOpen ? 0 : 1, opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 0.35 }}
      >
        <Heart size={compact ? 18 : 24} fill="currentColor" />
      </motion.div>
    </div>
  );
}
