import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import ConfettiEffect from './components/ConfettiEffect';
import EventDetails from './components/EventDetails';
import FloatingDecorations from './components/FloatingDecorations';
import LetterIntro from './components/LetterIntro';
import MusicPlayer, { type MusicPlayerHandle } from './components/MusicPlayer';

type Scene = 'letter' | 'details';

export default function App() {
  const [scene, setScene] = useState<Scene>('letter');
  const [confettiBurst, setConfettiBurst] = useState(0);
  const musicRef = useRef<MusicPlayerHandle>(null);

  const handleOpenLetter = () => {
    musicRef.current?.play();
    setConfettiBurst((value) => value + 1);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#180d24] text-[#fff8ef]">
      <FloatingDecorations />
      <ConfettiEffect burst={confettiBurst} />
      <MusicPlayer ref={musicRef} />

      <AnimatePresence mode="wait">
        {scene === 'letter' && (
          <LetterIntro
            key="letter-intro"
            onOpen={handleOpenLetter}
            onComplete={() => setScene('details')}
          />
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
