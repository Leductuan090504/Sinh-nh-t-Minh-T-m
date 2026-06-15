import { motion } from 'framer-motion';
import { useMemo } from 'react';
import type { IntroPhase } from './LetterIntro';
import useMediaQuery from '../hooks/useMediaQuery';

type DecorationProps = {
  phase: IntroPhase;
};

type FloatingHeart = {
  id: number;
  top: string;
  left: string;
  size: number;
  delay: number;
};

type Sparkle = {
  id: number;
  top: string;
  left: string;
  size: number;
  delay: number;
};

const getDecorationOpacity = (phase: IntroPhase) => {
  if (phase === 'closed') return 1;
  if (phase === 'openingFlap') return 0.85;
  if (phase === 'risingLetter') return 0.65;
  if (phase === 'showingCover') return 0.45;
  if (phase === 'flippingLetter') return 0.25;
  return 0;
};

export default function EnvelopeDecorations({ phase }: DecorationProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const hearts = useMemo(() => {
    const count = isMobile ? 7 : 12;

    return Array.from({ length: count }, (_, id) => ({
      id,
      top: `${18 + Math.random() * 55}%`,
      left: `${12 + Math.random() * 76}%`,
      size: isMobile ? 10 + Math.random() * 8 : 12 + Math.random() * 12,
      delay: Math.random() * 2,
    }));
  }, [isMobile]);

  const sparkles = useMemo(() => {
    const count = isMobile ? 12 : 20;

    return Array.from({ length: count }, (_, id) => ({
      id,
      top: `${12 + Math.random() * 65}%`,
      left: `${10 + Math.random() * 80}%`,
      size: isMobile ? 5 + Math.random() * 5 : 6 + Math.random() * 7,
      delay: Math.random() * 2.5,
    }));
  }, [isMobile]);

  const decorationOpacity = getDecorationOpacity(phase);

  return (
    <div className="envelope-decorations" style={{ opacity: decorationOpacity }}>
      <div className="envelope-glow" />

      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="floating-heart"
          style={{
            top: heart.top,
            left: heart.left,
            width: heart.size,
            height: heart.size,
            fontSize: heart.size,
          }}
          initial={{ opacity: 0, y: 8, scale: 0.8 }}
          animate={{
            opacity: [0.2, 0.85, 0.35],
            y: [0, -12, 0],
            x: [0, 5, -4, 0],
            scale: [0.9, 1.1, 0.95],
          }}
          transition={{
            duration: 3.8,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          &hearts;
        </motion.div>
      ))}

      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="sparkle"
          style={{
            top: sparkle.top,
            left: sparkle.left,
            width: sparkle.size,
            height: sparkle.size,
          }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
            opacity: [0.15, 0.95, 0.2],
            scale: [0.7, 1.18, 0.75],
            rotate: [0, 24, 0],
          }}
          transition={{
            duration: 2.4,
            delay: sparkle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
