"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

type AudioSplashProps = {
  onEnter: () => void;
  children: React.ReactNode;
};

export function AudioSplash({ onEnter, children }: AudioSplashProps) {
  const [started, setStarted] = useState(false);

  const handleEnter = () => {
    onEnter();
    setStarted(true);
  };

  return (
    <>
      <AnimatePresence>
        {!started && (
          <motion.div
            className="fixed inset-0 z-[100] grid place-items-center bg-night"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.button
              type="button"
              onClick={handleEnter}
              className="flex items-center gap-4 rounded-full bg-snow px-8 py-5 text-lg font-bold text-night shadow-glow transition hover:scale-[1.05] hover:bg-white"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <Heart className="h-6 w-6 fill-rose text-rose" />
              Начать
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      {started && children}
    </>
  );
}
