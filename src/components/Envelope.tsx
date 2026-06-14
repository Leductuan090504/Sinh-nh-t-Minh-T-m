import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

type EnvelopeProps = {
  isOpen: boolean;
};

export default function Envelope({ isOpen }: EnvelopeProps) {
  return (
    <div className="intro-envelope" aria-hidden="true">
      <motion.div
        className="intro-envelope__peek-letter"
        animate={{
          y: isOpen ? -118 : 0,
          opacity: isOpen ? 0 : 0.92,
        }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="intro-envelope__body" />
      <motion.div
        className="intro-envelope__flap"
        animate={{ rotateX: isOpen ? -172 : 0, y: isOpen ? -8 : 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="intro-envelope__shine" />
      <motion.div
        className="intro-envelope__seal"
        animate={{ scale: isOpen ? 0 : 1, opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 0.32 }}
      >
        <Heart size={24} fill="currentColor" />
      </motion.div>
    </div>
  );
}
