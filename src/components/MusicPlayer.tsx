import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Music, Volume2, VolumeX } from 'lucide-react';
import { invitation } from '../config/invitation';

export type MusicPlayerHandle = {
  play: () => void;
};

const MusicPlayer = forwardRef<MusicPlayerHandle>(function MusicPlayer(_, ref) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.42;
    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  useImperativeHandle(ref, () => ({ play }));

  useEffect(() => {
    void play();
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      await play();
      return;
    }

    audio.pause();
    setIsPlaying(false);
  };

  return (
    <>
      <audio ref={audioRef} src={invitation.audioPath} preload="auto" loop onEnded={() => void play()} />
      <button
        type="button"
        onClick={toggleMusic}
        className="fixed right-4 top-4 z-30 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/18 bg-white/10 text-[#fff4e8] shadow-[0_14px_34px_rgba(0,0,0,0.22)] backdrop-blur-xl transition hover:bg-white/18"
        aria-label={isPlaying ? 'Tắt nhạc' : 'Bật nhạc'}
      >
        <Music size={15} className="absolute -left-1 -top-1 text-[#ffdca8]" />
        {isPlaying ? <Volume2 size={19} /> : <VolumeX size={19} />}
      </button>
    </>
  );
});

export default MusicPlayer;
