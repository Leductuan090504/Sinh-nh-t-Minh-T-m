import { CalendarPlus } from 'lucide-react';
import { eventDateTime, invitation } from '../config/invitation';

const calendarUrl = (() => {
  const start = new Date(eventDateTime);
  const end = new Date(start.getTime() + 3 * 60 * 60 * 1000);
  const format = (date: Date) => date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `Sinh nhật ${invitation.birthdayName}`,
    dates: `${format(start)}/${format(end)}`,
    details: invitation.message,
    location: invitation.locationName,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
})();

export default function SaveCalendarButton() {
  return (
    <a
      href={calendarUrl}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex min-h-14 flex-1 items-center justify-center gap-3 rounded-full border border-[#e7cf9a]/70 bg-white/65 px-6 py-4 text-sm font-bold text-[#7a4b6d] shadow-[0_14px_40px_rgba(167,116,139,0.16)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#d8b86c] hover:bg-white/85 hover:shadow-gold"
    >
      <CalendarPlus size={19} className="transition group-hover:rotate-6" />
      Lưu lịch
    </a>
  );
}
