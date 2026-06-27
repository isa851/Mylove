"use client";

import { useEffect, useRef, useState } from "react";
import { Heart } from "lucide-react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { content } from "@/content/data";
import { heartBurst } from "@/lib/confetti";
import { ParticleHeart } from "@/components/ParticleHeart";
import { StarField } from "@/components/StarField";

type OpeningHeroProps = {
  onOpen?: () => void;
};

export function OpeningHero({ onOpen }: OpeningHeroProps) {
  const [exploded, setExploded] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!shellRef.current) return;
    const context = gsap.context(() => {
      gsap.to(".opening-camera", {
        scale: 1.05,
        y: -18,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, shellRef);
    return () => context.revert();
  }, []);

  const open = () => {
    setExploded(true);
    heartBurst();
    onOpen?.();
    window.setTimeout(() => {
      document.getElementById("timeline")?.scrollIntoView({ behavior: "smooth" });
    }, 920);
  };

  return (
    <section ref={shellRef} className="relative grid min-h-screen place-items-center overflow-hidden px-6 text-center">
      <div className="opening-camera absolute inset-0">
        <StarField />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1 }}
        className="relative z-10 w-full max-w-4xl"
      >
        <ParticleHeart exploded={exploded} />
        <p className="mx-auto mt-2 max-w-2xl font-serif text-3xl leading-tight text-snow md:text-5xl">{content.opening.prelude}</p>
        <button
          type="button"
          onClick={open}
          className="mt-10 inline-flex items-center gap-3 rounded-full bg-snow px-7 py-4 text-base font-bold text-night shadow-glow transition hover:scale-[1.03] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blush"
        >
          <Heart className="h-5 w-5 fill-rose text-rose" />
          {content.opening.button}
        </button>
      </motion.div>
    </section>
  );
}
