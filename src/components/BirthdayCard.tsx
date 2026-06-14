import { CalendarDays, Camera, Clock, Heart, ImagePlus, MapPin, PartyPopper, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Countdown from './Countdown';
import SaveCalendarButton from './SaveCalendarButton';
import { invitation } from '../config/invitation';

const infoCards = [
  {
    icon: CalendarDays,
    label: 'Ngày',
    value: invitation.displayDate,
  },
  {
    icon: Clock,
    label: 'Giờ',
    value: invitation.time,
  },
  {
    icon: MapPin,
    label: 'Địa điểm',
    value: invitation.locationName,
    isLocation: true,
  },
];

export default function BirthdayCard() {
  const [imageMissing, setImageMissing] = useState(false);
  const showImage = invitation.imagePath && !imageMissing;

  return (
    <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full"
      >
        <div className="absolute -left-4 top-12 hidden h-48 w-48 rounded-full border border-[#d9b56c]/30 lg:block" />
        <div className="absolute -right-6 bottom-20 hidden h-28 w-28 rounded-full border border-[#d9b56c]/30 lg:block" />

        <section className="relative overflow-hidden rounded-[2rem] border border-white/72 bg-white/43 shadow-card backdrop-blur-2xl sm:rounded-[2.5rem]">
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#d7b56d] to-transparent" />
          <div className="absolute -left-28 top-16 h-72 w-72 rounded-full bg-[#f7cdd8]/35 blur-3xl" />
          <div className="absolute -right-24 bottom-12 h-80 w-80 rounded-full bg-[#d8c8ff]/35 blur-3xl" />

          <div className="relative grid gap-0 lg:grid-cols-[0.92fr_1.08fr]">
            <motion.div
              initial={{ opacity: 0, x: -26, rotate: -1.8 }}
              animate={{ opacity: 1, x: 0, rotate: -1.2 }}
              transition={{ delay: 0.16, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex items-center justify-center p-5 pb-0 sm:p-8 lg:p-12"
            >
              <div className="relative w-full max-w-[28rem]">
                <div className="absolute -inset-4 rounded-[2.4rem] bg-gradient-to-br from-[#f7dfaa]/70 via-white/10 to-[#d9c7ff]/60 blur-xl" />
                <div className="relative rotate-[-1.5deg] rounded-[2rem] border border-[#d9b56c]/55 bg-[#fffaf3]/88 p-3 shadow-[0_26px_80px_rgba(122,77,103,0.2)] backdrop-blur-xl sm:p-4">
                  <div className="absolute -right-4 -top-4 z-20 rounded-full border border-[#ead59b]/70 bg-white/80 p-3 text-[#bd8d4d] shadow-gold backdrop-blur">
                    <Camera size={22} />
                  </div>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#fff0f5] via-[#faf1ff] to-[#fff8e8]">
                    <div className="absolute inset-0 rounded-[1.5rem] ring-1 ring-inset ring-white/70" />
                    {showImage ? (
                      <img
                        src={invitation.imagePath}
                        alt={`Ảnh của ${invitation.birthdayName}`}
                        onError={() => setImageMissing(true)}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center px-6 text-center text-[#8d5e7e]">
                        <div className="mb-5 rounded-full border border-[#e8c982]/70 bg-white/62 p-5 shadow-[0_18px_45px_rgba(184,131,155,0.18)]">
                          <ImagePlus size={42} strokeWidth={1.6} />
                        </div>
                        <p className="font-display text-3xl font-bold text-[#6f3f68]">Minh Tâm</p>
                        <p className="mt-3 text-sm leading-6 text-[#8b6b7c]">
                          Đặt ảnh tại
                          <span className="mt-2 block rounded-full bg-white/70 px-4 py-2 text-xs font-bold text-[#9b6a3d]">
                            public/images/minh-tam.jpg
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between px-2 pb-1 pt-4 text-[#906477]">
                    <span className="font-display text-2xl font-bold">Sweet Birthday</span>
                    <Heart size={20} fill="currentColor" className="text-[#d59caf]" />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 26 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.24, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative px-5 py-8 sm:px-8 sm:pb-10 lg:px-10 lg:py-14 xl:px-14"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#ead8af]/70 bg-white/52 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.28em] text-[#a3774f] shadow-[0_12px_35px_rgba(177,130,83,0.12)] backdrop-blur-xl">
                <Sparkles size={15} />
                Luxury Birthday Invitation
              </div>

              <p className="font-body text-sm font-bold uppercase tracking-[0.34em] text-[#b48a9d]">
                Thiệp mời sinh nhật
              </p>
              <h1 className="mt-3 font-display text-[4.25rem] font-bold leading-[0.82] tracking-[-0.03em] text-[#64375f] sm:text-[6.5rem] lg:text-[7.2rem]">
                Minh Tâm
              </h1>
              <p className="mt-5 text-lg font-semibold text-[#875976] sm:text-xl">{invitation.birthdayName}</p>

              <p className="mt-6 max-w-2xl text-[0.98rem] leading-8 text-[#6f5d68] sm:text-lg">
                {invitation.message}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {infoCards.map((card) => {
                  const Icon = card.icon;
                  const content = card.isLocation ? (
                    <a
                      href={invitation.mapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold text-[#6f3f68] underline decoration-[#d8b86c]/70 underline-offset-4 transition hover:text-[#a65f86]"
                    >
                      {card.value}
                    </a>
                  ) : (
                    <span className="font-bold text-[#6f3f68]">{card.value}</span>
                  );

                  return (
                    <motion.div
                      key={card.label}
                      whileHover={{ y: -5, scale: 1.015 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                      className="group rounded-[1.35rem] border border-white/70 bg-white/48 p-4 shadow-[0_14px_42px_rgba(154,100,127,0.11)] backdrop-blur-xl"
                    >
                      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#ead8af]/65 bg-[#fffaf2]/74 text-[#b9874e] transition group-hover:rotate-6 group-hover:scale-105">
                        <Icon size={19} strokeWidth={1.8} />
                      </div>
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#a88a96]">
                        {card.label}
                      </p>
                      <p className="mt-1 text-sm leading-6 sm:text-[0.95rem]">{content}</p>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-8 rounded-[1.8rem] border border-white/62 bg-white/36 p-4 shadow-[0_18px_60px_rgba(154,100,127,0.12)] backdrop-blur-xl sm:p-5">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fff7e9] text-[#b9874e] shadow-sm">
                    <PartyPopper size={19} />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#a88a96]">
                      Đếm ngược
                    </p>
                    <p className="text-sm font-semibold text-[#76586b]">Đến buổi tối thật đáng nhớ</p>
                  </div>
                </div>
                <Countdown />
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={invitation.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex min-h-14 flex-1 items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#7a4b6d] via-[#9c627f] to-[#c28a8d] px-6 py-4 text-sm font-extrabold text-white shadow-[0_20px_60px_rgba(137,78,112,0.28)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(137,78,112,0.38)]"
                >
                  <MapPin size={19} className="transition group-hover:-rotate-6" />
                  Xem địa điểm
                </a>
                <SaveCalendarButton />
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </div>
  );
}
