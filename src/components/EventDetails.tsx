import { CalendarDays, Clock, MapPin } from 'lucide-react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import Countdown from './Countdown';
import SaveCalendarButton from './SaveCalendarButton';
import { invitation } from '../config/invitation';

export default function EventDetails() {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center justify-center">
      <div className="details-stage grid w-full gap-8 p-4 sm:p-6 lg:grid-cols-[0.92fr_1.08fr] lg:p-8">
        <div className="flex items-center justify-center">
          <div className="polaroid-frame">
            {!imageFailed ? (
              <img
                src={invitation.imagePath}
                alt="Huỳnh Thị Minh Tâm"
                className="h-full w-full object-cover"
                onError={() => setImageFailed(true)}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#fff7ed] px-8 text-center text-sm font-semibold leading-7 text-[#8b6077]">
                Đặt ảnh tại public/images/minh-tam.jpg
              </div>
            )}
            <div className="px-4 py-4 text-center font-display text-3xl font-bold text-[#6f3d65]">Minh Tâm</div>
          </div>
        </div>

        <div className="flex flex-col justify-center py-2">
          <p className="text-xs font-bold uppercase tracking-[0.34em] text-[#ffdca8]">Birthday Evening</p>
          <h2 className="mt-3 font-display text-5xl font-bold leading-none text-[#fff7eb] sm:text-6xl">
            Sinh nhật
            <span className="mt-2 block text-[#f7bfd3]">{invitation.birthdayName}</span>
          </h2>

          <div className="mt-8 grid gap-3 text-[#fff4e8]">
            <InfoRow icon={<CalendarDays size={19} />} label="Ngày" value={invitation.displayDate} />
            <InfoRow icon={<Clock size={19} />} label="Giờ" value={invitation.time} />
            <InfoRow
              icon={<MapPin size={19} />}
              label="Địa điểm"
              value={
                <a
                  href={invitation.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-[#ffdca8]/55 underline-offset-4 transition hover:text-[#ffdca8]"
                >
                  {invitation.locationName}
                </a>
              }
            />
          </div>

          <div className="mt-8">
            <Countdown />
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href={invitation.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-14 flex-1 items-center justify-center gap-2 rounded-full bg-[#fff4df] px-6 py-4 text-sm font-bold text-[#6f3d65] shadow-[0_18px_48px_rgba(0,0,0,0.22)] transition hover:-translate-y-1 hover:bg-white"
            >
              <MapPin size={18} />
              Xem địa điểm
            </a>
            <SaveCalendarButton />
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: ReactNode; label: string; value: ReactNode }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/12 bg-white/8 px-4 py-3 backdrop-blur-xl">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ffdca8]/16 text-[#ffdca8]">
        {icon}
      </span>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#f7bfd3]/76">{label}</p>
        <div className="mt-0.5 text-base font-semibold">{value}</div>
      </div>
    </div>
  );
}
