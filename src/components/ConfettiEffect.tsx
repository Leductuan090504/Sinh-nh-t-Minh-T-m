import confetti from 'canvas-confetti';
import { useEffect } from 'react';

type ConfettiEffectProps = {
  burst: number;
};

export default function ConfettiEffect({ burst }: ConfettiEffectProps) {
  useEffect(() => {
    if (!burst) return;

    const defaults = {
      spread: 70,
      ticks: 90,
      gravity: 0.9,
      scalar: 1,
      colors: ['#ff7ab6', '#ffd166', '#ffffff', '#c084fc', '#f9a8d4'],
    };

    confetti({ ...defaults, particleCount: 90, origin: { x: 0.18, y: 0.62 }, angle: 60 });
    confetti({ ...defaults, particleCount: 90, origin: { x: 0.82, y: 0.62 }, angle: 120 });

    window.setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 120,
        startVelocity: 34,
        origin: { x: 0.5, y: 0.48 },
        colors: defaults.colors,
      });
    }, 350);
  }, [burst]);

  return null;
}
