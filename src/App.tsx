import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import BirthdayCard from './components/BirthdayCard';
import ConfettiEffect from './components/ConfettiEffect';
import FloatingDecorations from './components/FloatingDecorations';
import OpeningSurprise from './components/OpeningSurprise';

export default function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [confettiBurst, setConfettiBurst] = useState(0);

  const handleOpen = () => {
    setConfettiBurst((value) => value + 1);
    window.setTimeout(() => setIsOpened(true), 1200);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fff6fb] text-slate-800">
      <ConfettiEffect burst={confettiBurst} />
      <AnimatePresence mode="wait">
        {!isOpened ? (
          <OpeningSurprise key="opening" onOpen={handleOpen} />
        ) : (
          <motion.section
            key="card"
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative min-h-screen overflow-hidden"
          >
            <FloatingDecorations />
            <BirthdayCard />
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}
