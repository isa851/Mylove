"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { content } from "@/content/data";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { sendTelegramEvent } from "@/lib/analytics";
import { AudioSplash } from "@/components/AudioSplash";
import { OpeningHero } from "@/components/OpeningHero";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { CounterSection } from "@/components/sections/CounterSection";
import { ReasonsSection } from "@/components/sections/ReasonsSection";
import { LetterSection } from "@/components/sections/LetterSection";
import { NightSkySection } from "@/components/sections/NightSkySection";
import { FinalProposalSection } from "@/components/sections/FinalProposalSection";

const HeartScene = dynamic(() => import("@/components/HeartScene"), {
  ssr: false,
  loading: () => (
    <section className="section-shell grid place-items-center bg-night">
      <div className="text-center">
        <div className="mx-auto mb-5 h-12 w-12 rounded-full border border-blush/30 border-t-blush animate-spin" />
        <p className="font-serif text-3xl">Полирую 3D-сердце...</p>
      </div>
    </section>
  )
});

export default function RomanticExperience() {
  const audio = useAudioPlayer({
    initialTrack: content.music.piano,
    celebrationTrack: content.music.celebration
  });

  useEffect(() => {
    sendTelegramEvent("open");
  }, []);

  return (
    <AudioSplash onEnter={audio.play}>
      <main className="bg-night text-snow">
        <OpeningHero />
        <TimelineSection />
        <GallerySection />
        <CounterSection />
        <ReasonsSection />
        <LetterSection />
        <NightSkySection />
        <HeartScene />
        <FinalProposalSection onCelebrate={audio.switchToCelebration} />

      </main>
    </AudioSplash>
  );
}
