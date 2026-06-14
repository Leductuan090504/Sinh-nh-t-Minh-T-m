import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import ConfettiEffect from './components/ConfettiEffect';
import EventDetails from './components/EventDetails';
import FloatingDecorations from './components/FloatingDecorations';
import LetterMessage from './components/LetterMessage';
import MusicControl from './components/MusicControl';
import PhoneInvitationIntro from './components/PhoneInvitationIntro';
import { invitation } from './config/invitation';

type Scene = 'intro' | 'letter' | 'details';

export default function App() {
  const [scene, setScene] = useState<Scene>('intro');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [confettiBurst, setConfettiBurst] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const playMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.42;
    try {
      await audio.play();
      setIsMusicPlaying(true);
    } catch {
      setIsMusicPlaying(false);
    }
  };

  const handleOpenInvitation = () => {
    void playMusic();
    setConfettiBurst((value) => value + 1);
    setScene('letter');
  };

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      await playMusic();
      return;
    }

    audio.pause();
    setIsMusicPlaying(false);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#180d24] text-[#fff8ef]">
      <audio ref={audioRef} src={invitation.audioPath} loop preload="auto" />
      <FloatingDecorations />
      <ConfettiEffect burst={confettiBurst} />
      <MusicControl isPlaying={isMusicPlaying} onToggle={toggleMusic} />

      <AnimatePresence mode="wait">
        {scene === 'intro' && <PhoneInvitationIntro key="intro" onOpen={handleOpenInvitation} />}

        {scene === 'letter' && (
          <motion.section
            key="letter"
            initial={{ opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.04, filter: 'blur(10px)' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8"
          >
            <LetterMessage onNext={() => setScene('details')} />
          </motion.section>
        )}

        {scene === 'details' && (
          <motion.section
            key="details"
            initial={{ opacity: 0, y: 36, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 min-h-screen px-4 py-8"
          >
            <EventDetails />
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}
