import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { createPortal } from 'react-dom';

type BalloonColor = 'pink' | 'lavender' | 'gold' | 'blue' | 'rose' | 'champagne';

type BalloonSpec = {
  id: number;
  left: string;
  delay: number;
  duration: number;
  size: number;
  color: BalloonColor;
  sway: number;
};

type BalloonIntroProps = {
  introDurationMs: number;
  isMobile: boolean;
};

const BALLOON_COLORS: BalloonColor[] = ['pink', 'lavender', 'gold', 'blue', 'rose', 'champagne'];

function createBalloons(isMobile: boolean, introDurationSeconds: number): BalloonSpec[] {
  const count = isMobile ? 12 : 18;
  const maxDelay = isMobile ? 0.7 : 1;

  return Array.from({ length: count }, (_, index) => {
    const delay = Math.random() * maxDelay;
    const finishBuffer = 0.18 + Math.random() * 0.22;

    return {
      id: index,
      left: `${Math.random() * 92 + 4}%`,
      delay,
      duration: introDurationSeconds - delay - finishBuffer,
      size: isMobile ? 34 + Math.random() * 28 : 46 + Math.random() * 42,
      color: BALLOON_COLORS[index % BALLOON_COLORS.length],
      sway: isMobile ? 8 + Math.random() * 10 : 12 + Math.random() * 14,
    };
  });
}

export default function BalloonIntro({ introDurationMs, isMobile }: BalloonIntroProps) {
  const introDurationSeconds = introDurationMs / 1000;
  const balloons = useMemo(
    () => createBalloons(isMobile, introDurationSeconds),
    [introDurationSeconds, isMobile],
  );

  const introOverlay = (
    <motion.div
      className="balloon-intro"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    >
      <div className="balloon-layer">
        <div className="balloon-intro__sparkles" />

        {balloons.map((balloon) => (
          <motion.div
            key={balloon.id}
            className={`balloon balloon--${balloon.color}`}
            style={{
              left: balloon.left,
              width: balloon.size,
              height: balloon.size * 1.25,
            }}
            initial={{ y: '115vh', opacity: 0, x: 0, rotate: 0 }}
            animate={{
              y: '-105vh',
              opacity: [0, 1, 1, 1, 0],
              x: [0, -balloon.sway, balloon.sway * 0.9, -balloon.sway * 0.55, balloon.sway * 0.25],
              rotate: [0, -4, 4, -2, 2],
            }}
            transition={{
              duration: balloon.duration,
              delay: balloon.delay,
              ease: 'easeInOut',
              opacity: {
                times: [0, 0.12, 0.68, 0.86, 1],
                duration: balloon.duration,
                delay: balloon.delay,
              },
            }}
          />
        ))}
      </div>

      <motion.div
        className="intro-text-layer"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.78, 0.78, 0] }}
        transition={{
          duration: introDurationSeconds,
          times: [0, 0.18, 0.78, 1],
          ease: 'easeInOut',
        }}
      >
        <div className="intro-text">
          <span className="desktop-text">A little surprise is coming&hellip;</span>
          <span className="mobile-text">
            A little surprise
            <br />
            is coming&hellip;
          </span>
        </div>
      </motion.div>
    </motion.div>
  );

  return createPortal(introOverlay, document.body);
}
