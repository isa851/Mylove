"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Music2, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useState } from "react";

type MusicPlayerProps = {
  title: string;
  artist: string;
  playing: boolean;
  muted: boolean;
  volume: number;
  onPlay: () => void;
  onPause: () => void;
  onMute: () => void;
  onVolume: (volume: number) => void;
};

export function MusicPlayer({ title, artist, playing, muted, volume, onPlay, onPause, onMute, onVolume }: MusicPlayerProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.96 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="fixed bottom-5 right-5 z-50 flex max-w-[calc(100vw-2.5rem)] items-center gap-3 rounded-full border border-white/10 bg-night/80 px-3 py-2 shadow-glass backdrop-blur-xl"
        >
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 text-blush">
            <Music2 size={18} />
          </div>
          <div className="hidden min-w-0 pr-1 text-left sm:block">
            <p className="truncate text-sm font-semibold leading-4 text-snow">{title}</p>
            <p className="truncate text-xs text-snow/55">{artist}</p>
          </div>
          <button
            type="button"
            aria-label={playing ? "Поставить музыку на паузу" : "Включить музыку"}
            onClick={playing ? onPause : onPlay}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-rose text-white transition hover:bg-blush focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush"
          >
            {playing ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <button
            type="button"
            aria-label={muted ? "Включить звук" : "Выключить звук"}
            onClick={onMute}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-snow/80 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush"
          >
            {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <input
            aria-label="Громкость музыки"
            className="h-1 w-20 accent-blush sm:w-24"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(event) => onVolume(Number(event.target.value))}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
