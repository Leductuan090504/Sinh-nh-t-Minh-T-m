import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import AnimatedEnvelope from './AnimatedEnvelope';

type PhoneInvitationIntroProps = {
  onOpen: () => void;
};

export default function PhoneInvitationIntro({ onOpen }: PhoneInvitationIntroProps) {
  return (
    <motion.section
      key="intro"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(10px)' }}
      transition={{ duration: 0.8 }}
      className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8"
    >
      <div className="grid w-full max-w-5xl items-center gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="text-center lg:text-left"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#ffdca8] backdrop-blur-xl">
            <Sparkles size={14} />
            Birthday Letter
          </div>
          <h1 className="font-display text-5xl font-bold leading-[0.98] text-[#fff7eb] drop-shadow-[0_18px_45px_rgba(0,0,0,0.28)] sm:text-6xl lg:text-7xl">
            Có một lời mời nhỏ dành cho bạn...
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-[#f9dbe8]/82 lg:mx-0">
            Một chiếc thiệp sinh nhật được gửi như một lá thư nhỏ trên điện thoại, mở ra bằng một khoảnh khắc thật nhẹ.
          </p>
        </motion.div>

        <motion.button
          type="button"
          onClick={onOpen}
          initial={{ opacity: 0, y: 34, rotateY: -14 }}
          animate={{ opacity: 1, y: 0, rotateY: 0 }}
          whileHover={{ y: -8, rotateX: 2, rotateY: -3 }}
          whileTap={{ scale: 0.985 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="phone-shell group mx-auto block text-left"
          aria-label="Chạm để mở thiệp"
        >
          <div className="phone-frame">
            <div className="phone-notch" />
            <div className="phone-screen">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(255,227,185,0.34),transparent_28%),linear-gradient(180deg,rgba(61,29,75,0.52),rgba(25,12,36,0.92))]" />
              <div className="relative flex h-full flex-col items-center justify-center px-8">
                <AnimatedEnvelope />
                <div className="mt-10 text-center">
                  <p className="font-display text-3xl font-bold text-[#fff6e6]">Thiệp đang chờ mở</p>
                  <p className="mt-3 text-sm font-semibold uppercase tracking-[0.26em] text-[#ffdca8]">
                    Chạm để mở thiệp
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.button>
      </div>
    </motion.section>
  );
}
