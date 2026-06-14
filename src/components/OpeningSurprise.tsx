import { Heart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

type OpeningSurpriseProps = {
  onOpen: () => void;
};

const sparkles = Array.from({ length: 42 }, (_, index) => ({
  id: index,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  delay: `${Math.random() * 3.2}s`,
  size: 2 + Math.random() * 4,
}));

const hearts = Array.from({ length: 16 }, (_, index) => ({
  id: index,
  left: `${6 + Math.random() * 88}%`,
  delay: `${Math.random() * 5}s`,
  duration: 8 + Math.random() * 6,
  size: 12 + Math.random() * 16,
}));

export default function OpeningSurprise({ onOpen }: OpeningSurpriseProps) {
  const [opening, setOpening] = useState(false);

  const handleClick = () => {
    if (opening) return;
    setOpening(true);
    onOpen();
  };

  return (
    <motion.section
      exit={{ opacity: 0, scale: 1.025, filter: 'blur(10px)' }}
      transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#110d19] px-5 py-10 text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,226,189,0.2),transparent_24%),radial-gradient(circle_at_18%_20%,rgba(223,190,255,0.22),transparent_27%),radial-gradient(circle_at_78%_78%,rgba(255,174,205,0.16),transparent_32%),linear-gradient(145deg,#16101f_0%,#26162c_48%,#0c0913_100%)]" />
      <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(255,255,255,0.34)_1px,transparent_1px)] [background-size:34px_34px]" />
      <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffdfaa]/10 blur-3xl" />

      {sparkles.map((sparkle) => (
        <span
          key={sparkle.id}
          className="absolute rounded-full bg-[#fff8e8] shadow-[0_0_18px_rgba(255,236,190,0.9)] animate-twinkle"
          style={{
            left: sparkle.left,
            top: sparkle.top,
            width: sparkle.size,
            height: sparkle.size,
            animationDelay: sparkle.delay,
          }}
        />
      ))}

      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="absolute bottom-[-56px] text-pink-200/35"
          style={{
            left: heart.left,
            animation: `floatUp ${heart.duration}s linear infinite`,
            animationDelay: heart.delay,
          }}
        >
          <Heart size={heart.size} fill="currentColor" strokeWidth={1.4} />
        </span>
      ))}

      <motion.div
        aria-hidden="true"
        animate={opening ? { opacity: [0, 0.9, 0], scale: [0.6, 1.55, 2.1] } : { opacity: 0 }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
        className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#fff2cf]/50 blur-2xl"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 26, rotateX: 16 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#f8dfb7] shadow-[0_14px_45px_rgba(0,0,0,0.22)] backdrop-blur-xl"
        >
          <Sparkles size={15} />
          Private Invitation
        </motion.div>

        <motion.div
          animate={
            opening
              ? { y: [0, -18, -34], scale: [1, 1.03, 1.08], rotate: [0, -1.5, 1.5, 0] }
              : { y: [0, -12, 0], rotate: [0, 0.7, 0] }
          }
          transition={opening ? { duration: 1.05, ease: 'easeInOut' } : { duration: 3.4, repeat: Infinity }}
          className="luxury-envelope relative mb-10 h-52 w-[19rem] max-w-[88vw] drop-shadow-[0_42px_70px_rgba(0,0,0,0.42)] sm:h-60 sm:w-[23rem]"
        >
          <motion.div
            className="envelope-flap"
            animate={opening ? { rotateX: -158, y: -8 } : { rotateX: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            className="envelope-letter"
            animate={opening ? { y: -82, opacity: 1 } : { y: 8, opacity: 0.92 }}
            transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <span>Minh Tâm</span>
          </motion.div>
          <div className="envelope-body" />
          <div className="envelope-shine" />
          <div className="envelope-seal">
            <Heart size={26} fill="currentColor" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.8 }}
          className="max-w-2xl font-display text-[2.8rem] font-bold leading-[0.95] text-[#fff7eb] sm:text-6xl md:text-7xl"
        >
          Một lời mời nhỏ, dành cho một người thật đặc biệt…
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.36, duration: 0.8 }}
          className="mt-6 max-w-md text-sm leading-7 text-white/68 sm:text-base"
        >
          Chạm để mở phong thư và bước vào một buổi tối sinh nhật ngọt ngào.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.035 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleClick}
          className="group mt-9 inline-flex min-h-14 items-center justify-center rounded-full border border-[#f4dca8]/60 bg-[#fff6e8] px-9 py-4 text-sm font-extrabold uppercase tracking-[0.18em] text-[#6e3f61] shadow-[0_0_0_8px_rgba(255,246,232,0.08),0_20px_70px_rgba(255,215,166,0.34)] transition duration-300 hover:bg-white hover:shadow-[0_0_0_10px_rgba(255,246,232,0.1),0_24px_80px_rgba(255,215,166,0.46)] focus:outline-none focus:ring-4 focus:ring-[#f5d696]/35"
        >
          <span className="mr-2 transition group-hover:-rotate-6">✦</span>
          Mở thiệp
        </motion.button>
      </div>
    </motion.section>
  );
}
