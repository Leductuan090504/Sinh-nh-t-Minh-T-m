import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { eventDateTime } from '../config/invitation';

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(target: Date): TimeLeft {
  const diff = Math.max(target.getTime() - Date.now(), 0);

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown() {
  const target = useMemo(() => new Date(eventDateTime), []);
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(target));

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTimeLeft(getTimeLeft(target));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [target]);

  const items = [
    { label: 'ngày', value: timeLeft.days },
    { label: 'giờ', value: timeLeft.hours },
    { label: 'phút', value: timeLeft.minutes },
    { label: 'giây', value: timeLeft.seconds },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="relative overflow-hidden rounded-2xl border border-white/12 bg-white/10 px-2 py-4 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_18px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl"
        >
          <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-[#ffdca8]/75 to-transparent" />
          <AnimatePresence mode="popLayout">
            <motion.div
              key={`${item.label}-${item.value}`}
              initial={{ y: 12, opacity: 0, filter: 'blur(4px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              exit={{ y: -12, opacity: 0, filter: 'blur(4px)' }}
              transition={{ duration: 0.22 }}
              className="font-display text-3xl font-bold leading-none text-[#fff7eb] sm:text-5xl"
            >
              {String(item.value).padStart(2, '0')}
            </motion.div>
          </AnimatePresence>
          <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#ffdca8]/78 sm:text-xs">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
