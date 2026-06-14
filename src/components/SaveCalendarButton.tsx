import { CalendarPlus } from 'lucide-react';
import { eventDateTime, invitation } from '../config/invitation';

function formatIcsDate(date: Date) {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

function escapeIcsText(text: string) {
  return text.replace(/\\/g, '\\\\').replace(/,/g, '\\,').replace(/;/g, '\\;').replace(/\n/g, '\\n');
}

export default function SaveCalendarButton() {
  const handleSave = () => {
    const start = new Date(eventDateTime);
    const end = new Date(start.getTime() + 3 * 60 * 60 * 1000);
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Minh Tam Birthday Invitation//VI',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      `UID:minh-tam-birthday-${start.getTime()}@invitation.local`,
      `DTSTAMP:${formatIcsDate(new Date())}`,
      `DTSTART:${formatIcsDate(start)}`,
      `DTEND:${formatIcsDate(end)}`,
      `SUMMARY:${escapeIcsText(`Sinh nhật ${invitation.birthdayName}`)}`,
      `DESCRIPTION:${escapeIcsText(invitation.message)}`,
      `LOCATION:${escapeIcsText(invitation.locationName)}`,
      `URL:${invitation.mapsUrl}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sinh-nhat-minh-tam.ics';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      type="button"
      onClick={handleSave}
      className="inline-flex min-h-14 flex-1 items-center justify-center gap-2 rounded-full border border-white/16 bg-white/10 px-6 py-4 text-sm font-bold text-[#fff7eb] shadow-[0_18px_48px_rgba(0,0,0,0.18)] backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/16"
    >
      <CalendarPlus size={18} />
      Lưu lịch
    </button>
  );
}
