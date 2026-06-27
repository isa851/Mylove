"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Howl } from "howler";

type UseAudioPlayerOptions = {
  initialTrack: string;
  celebrationTrack: string;
};

export function useAudioPlayer({ initialTrack, celebrationTrack }: UseAudioPlayerOptions) {
  const soundRef = useRef<Howl | null>(null);
  const [volume, setVolume] = useState(0.45);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(false);

  const createSound = useCallback((src: string) => {
    soundRef.current?.unload();
    const sound = new Howl({
      src: [src],
      html5: true,
      loop: true,
      volume: 0,
      onloaderror: (_id, err) => console.error("[Audio] Ошибка загрузки:", src, err),
      onplayerror: (_id) => console.error("[Audio] Ошибка воспроизведения")
    });
    return sound;
  }, []);

  const play = useCallback(() => {
    const sound = soundRef.current ?? createSound(initialTrack);
    sound.play();
    sound.fade(sound.volume(), muted ? 0 : volume, 1200);
    setPlaying(true);
  }, [createSound, initialTrack, muted, volume]);

  const pause = useCallback(() => {
    const sound = soundRef.current;
    if (!sound) return;
    sound.fade(sound.volume(), 0, 700);
    window.setTimeout(() => sound.pause(), 720);
    setPlaying(false);
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((current) => {
      const next = !current;
      soundRef.current?.fade(soundRef.current.volume(), next ? 0 : volume, 450);
      return next;
    });
  }, [volume]);

  const updateVolume = useCallback((nextVolume: number) => {
    setVolume(nextVolume);
    if (!muted) {
      soundRef.current?.fade(soundRef.current.volume(), nextVolume, 250);
    }
  }, [muted]);

  const switchToCelebration = useCallback(() => {
    const sound = createSound(celebrationTrack);
    sound.play();
    sound.fade(0, muted ? 0 : Math.max(volume, 0.55), 900);
    setPlaying(true);
  }, [celebrationTrack, createSound, muted, volume]);

  useEffect(() => {
    return () => {
      soundRef.current?.unload();
    };
  }, []);

  return {
    playing,
    volume,
    muted,
    play,
    pause,
    toggleMute,
    setVolume: updateVolume,
    switchToCelebration
  };
}


