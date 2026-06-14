import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import AnimatedEnvelope from './AnimatedEnvelope';
import { invitation } from '../config/invitation';

type LetterMessageProps = {
  onNext: () => void;
};

export default function LetterMessage({ onNext }: LetterMessageProps) {
  const fullMessage = invitation.message;
  const [visibleCount, setVisibleCount] = useState(0);
  const isComplete = visibleCount >= fullMessage.length;

  useEffect(() => {
    if (isComplete) return;

    const timeout = window.setTimeout(() => {
      setVisibleCount((count) => Math.min(count + 2, fullMessage.length));
    }, 26);

    return () => window.clearTimeout(timeout);
  }, [fullMessage.length, isComplete, visibleCount]);

  const paragraphs = useMemo(() => fullMessage.slice(0, visibleCount).split('\n\n'), [fullMessage, visibleCount]);

  return (
    <button type="button" onClick={() => isComplete && onNext()} className="phone-shell mx-auto block text-left">
      <div className="phone-frame">
        <div className="phone-notch" />
        <div className="phone-screen">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(42,21,58,0.98),rgba(21,12,31,0.96))]" />
          <div className="relative flex h-full flex-col items-center px-6 py-9">
            <AnimatedEnvelope isOpen compact />

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="letter-paper mt-5 w-full flex-1 overflow-hidden px-6 py-7"
            >
              <p className="text-center font-display text-3xl font-bold text-[#744062]">Gửi bạn,</p>
              <div className="mt-5 space-y-4 text-[15px] leading-7 text-[#6f5360]">
                {paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
                {!isComplete && <span className="typing-cursor" />}
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: isComplete ? 1 : 0, y: isComplete ? 0 : 8 }}
              className="mt-5 text-center text-xs font-semibold uppercase tracking-[0.24em] text-[#ffdca8]"
            >
              Chạm để xem thời gian và địa điểm
            </motion.p>
          </div>
        </div>
      </div>
    </button>
  );
}
