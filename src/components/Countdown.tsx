import { motion, AnimatePresence } from 'framer-motion';
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
    { label: 'Ngày', value: timeLeft.days },
    { label: 'Giờ', value: timeLeft.hours },
    { label: 'Phút', value: timeLeft.minutes },
    { label: 'Giây', value: timeLeft.seconds },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 rounded-[1.75rem] border border-white/65 bg-white/42 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.72),0_18px_55px_rgba(154,100,127,0.13)] backdrop-blur-2xl sm:gap-3 sm:p-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="relative overflow-hidden rounded-[1.25rem] border border-[#ead7b6]/60 bg-[#fffaf5]/74 px-2 py-3 text-center shadow-[0_10px_30px_rgba(171,125,143,0.12)] sm:py-4"
        >
          <div className="absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-[#d5af62]/70 to-transparent" />
          <AnimatePresence mode="popLayout">
            <motion.div
              key={`${item.label}-${item.value}`}
              initial={{ y: 10, opacity: 0, filter: 'blur(3px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              exit={{ y: -10, opacity: 0, filter: 'blur(3px)' }}
              transition={{ duration: 0.22 }}
              className="font-display text-3xl font-bold leading-none text-[#6f3f68] sm:text-5xl"
            >
              {String(item.value).padStart(2, '0')}
            </motion.div>
          </AnimatePresence>
          <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#a78088] sm:text-xs">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
