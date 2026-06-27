"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { content } from "@/content/data";
import { SectionHeading } from "@/components/SectionHeading";
import { StarField } from "@/components/StarField";

export function NightSkySection() {
  const [active, setActive] = useState<number | null>(null);
  const stars = useMemo(
    () =>
      content.skyMessages.map((message, index) => ({
        message,
        left: 18 + ((index * 17) % 64),
        top: 28 + ((index * 23) % 46)
      })),
    []
  );

  return (
    <section className="section-shell overflow-hidden bg-night">
      <StarField interactive />
      <div className="relative z-10">
        <SectionHeading eyebrow="Ночное небо" title="У некоторых звёзд есть секреты" copy="Наведи или сфокусируйся на звезде, и она скажет тебе что-то маленькое и настоящее." />
        <div className="relative mx-auto h-[520px] max-w-5xl rounded-[8px] border border-white/10 bg-night/30">
          {stars.map((star, index) => (
            <button
              key={star.message}
              type="button"
              aria-label={`Показать послание звезды ${index + 1}`}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onMouseLeave={() => setActive(null)}
              onBlur={() => setActive(null)}
              className="absolute grid h-8 w-8 place-items-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blush"
              style={{ left: `${star.left}%`, top: `${star.top}%` }}
            >
              <motion.span
                className="h-3 w-3 rounded-full bg-snow shadow-[0_0_18px_rgba(248,250,252,0.9)]"
                animate={{ scale: [1, 1.7, 1], opacity: [0.7, 1, 0.75] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.25 }}
              />
              {active === index ? (
                <motion.span
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-8 w-56 rounded-[8px] border border-white/10 bg-night/90 px-4 py-3 text-sm text-snow shadow-glass backdrop-blur"
                >
                  {star.message}
                </motion.span>
              ) : null}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

