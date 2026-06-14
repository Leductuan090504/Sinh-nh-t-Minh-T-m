import { Music, Volume2, VolumeX } from 'lucide-react';

type MusicControlProps = {
  isPlaying: boolean;
  onToggle: () => void;
};

export default function MusicControl({ isPlaying, onToggle }: MusicControlProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="fixed right-4 top-4 z-30 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/18 bg-white/10 text-[#fff4e8] shadow-[0_14px_34px_rgba(0,0,0,0.22)] backdrop-blur-xl transition hover:bg-white/18"
      aria-label={isPlaying ? 'Tắt nhạc' : 'Bật nhạc'}
    >
      <Music size={15} className="absolute -left-1 -top-1 text-[#ffdca8]" />
      {isPlaying ? <Volume2 size={19} /> : <VolumeX size={19} />}
    </button>
  );
}
