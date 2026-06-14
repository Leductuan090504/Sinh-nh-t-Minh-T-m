import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { invitation } from '../config/invitation';

type TypewriterLetterProps = {
  active: boolean;
  onDone: () => void;
};

export default function TypewriterLetter({ active, onDone }: TypewriterLetterProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const fullMessage = invitation.message;
  const isComplete = visibleCount >= fullMessage.length;

  useEffect(() => {
    if (!active || isComplete) return;

    const timeout = window.setTimeout(() => {
      setVisibleCount((count) => Math.min(count + 2, fullMessage.length));
    }, 24);

    return () => window.clearTimeout(timeout);
  }, [active, fullMessage.length, isComplete, visibleCount]);

  useEffect(() => {
    if (!isComplete) return;
    const timeout = window.setTimeout(onDone, 450);
    return () => window.clearTimeout(timeout);
  }, [isComplete, onDone]);

  const visibleText = fullMessage.slice(0, visibleCount);
  const parts = useMemo(() => visibleText.split('\n\n'), [visibleText]);
  const signatureText = 'With love,\nMinh Tam';
  const shouldShowSignature = visibleText.includes('With love,');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.45 }}
      className="flex h-full flex-col"
    >
      <div className="letter-scroll">
        {parts.map((part, index) => {
          if (!part) return null;

          const isGreeting = index === 0;
          const isSignature = shouldShowSignature && signatureText.startsWith(part.trim());

          if (isSignature) {
            return (
              <p key={index} className="mt-6 whitespace-pre-line font-display text-3xl font-bold leading-8 text-[#8a496a]">
                {part}
              </p>
            );
          }

          return (
            <p
              key={index}
              className={
                isGreeting
                  ? 'font-display text-4xl font-bold text-[#70405f]'
                  : 'mt-5 text-[15px] leading-7 text-[#694f5c] sm:text-base sm:leading-8'
              }
            >
              {part}
            </p>
          );
        })}
        {active && !isComplete && <span className="typing-cursor" />}
      </div>
    </motion.div>
  );
}
