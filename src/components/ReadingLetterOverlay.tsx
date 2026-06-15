import { AnimatePresence, motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import TypewriterLetter from './TypewriterLetter';

type ReadingLetterOverlayProps = {
  isOpen: boolean;
  onClick: () => void;
  onTypingDone: () => void;
};

export default function ReadingLetterOverlay({ isOpen, onClick, onTypingDone }: ReadingLetterOverlayProps) {
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="reading-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
          />

          <motion.div
            className="reading-letter-layer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            onClick={onClick}
          >
            <motion.div
              className="reading-letter-card"
              initial={{ opacity: 0, scale: 0.72, rotateY: -90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <TypewriterLetter active={isOpen} onDone={onTypingDone} />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}
