import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useState } from 'react';

type RealisticEnvelopeProps = {
  isOpen: boolean;
  children: ReactNode;
};

export default function RealisticEnvelope({ isOpen, children }: RealisticEnvelopeProps) {
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
      <div className="letter-mask">{children}</div>
      <div className="envelope-front-pocket" />
      <div className="side-fold side-fold-left" />
      <div className="side-fold side-fold-right" />

      <motion.div
        className="front-flap"
        initial={false}
        animate={{ rotateX: isOpen ? -165 : 0, y: isOpen ? -8 : 0 }}
        transition={{ duration: 1.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="wax-seal"
          animate={{ opacity: isOpen ? 0.72 : 1, scale: isOpen ? 0.82 : 1 }}
          transition={{ duration: 0.75, ease: 'easeInOut' }}
        >
          <span>MT</span>
        </motion.div>
      </motion.div>

      <div className="paper-grain-overlay" />
    </div>
  );
}
