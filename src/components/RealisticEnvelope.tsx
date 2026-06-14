import { motion } from 'framer-motion';
import { useState } from 'react';

type RealisticEnvelopeProps = {
  isOpen: boolean;
};

export default function RealisticEnvelope({ isOpen }: RealisticEnvelopeProps) {
  const [useFallback, setUseFallback] = useState(false);
  const useImageAsset = import.meta.env.VITE_USE_ENVELOPE_ASSET === 'true';

  return (
    <div className="envelope-wrapper" aria-hidden="true">
      {useImageAsset && !useFallback && (
        <motion.img
          src="/images/envelope/envelope-closed.png"
          alt=""
          className="envelope-asset"
          onError={() => setUseFallback(true)}
          animate={{ opacity: isOpen ? 0 : 1, scale: isOpen ? 0.985 : 1 }}
          transition={{ duration: 0.55 }}
        />
      )}

      <div className="envelope-back" />
      <div className="letter-slot-mask" />
      <div className="envelope-front-pocket" />
      <div className="side-fold-left" />
      <div className="side-fold-right" />

      <motion.div
        className="front-flap"
        initial={false}
        animate={{ rotateX: isOpen ? -154 : 0, y: isOpen ? -6 : 0 }}
        transition={{ duration: 1.45, ease: [0.65, 0, 0.35, 1] }}
      >
        <motion.div
          className="wax-seal"
          animate={{ opacity: isOpen ? 0.82 : 1, scale: isOpen ? 0.84 : 1 }}
          transition={{ duration: 0.75, ease: 'easeInOut' }}
        >
          <span>MT</span>
        </motion.div>
      </motion.div>

      <div className="paper-grain-overlay" />
    </div>
  );
}
