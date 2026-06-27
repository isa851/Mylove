"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { content } from "@/content/data";
import { SectionHeading } from "@/components/SectionHeading";

const emptyElapsed = {
  "Дней": 0,
  "Часов": 0,
  "Минут": 0,
  "Секунд": 0
};

function getElapsed() {
  const start = new Date(content.counterStartDate).getTime();
  const diff = Math.max(0, Date.now() - start);
  return {
    "Дней": Math.floor(diff / 306_400_000),
    "Часов": Math.floor((diff / 3_600_000) % 24),
    "Минут": Math.floor((diff / 60_000) % 60),
    "Секунд": Math.floor((diff / 1000) % 60)
  };
}

export function CounterSection() {
  const [elapsed, setElapsed] = useState(emptyElapsed);
  const items = useMemo(() => Object.entries(elapsed), [elapsed]);

  useEffect(() => {
    setElapsed(getElapsed());
    const interval = window.setInterval(() => setElapsed(getElapsed()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="section-shell grid place-items-center bg-night">
      <div className="w-full">
        <SectionHeading eyebrow="Счётчик" title="Каждая секунда вела к этому моменту" />
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">
          {items.map(([label, value], index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="glass rounded-[8px] p-6 text-center shadow-glass"
            >
              <div className="font-serif text-5xl text-white md:text-7xl">{String(value).padStart(2, "0")}</div>
              <div className="mt-3 text-sm font-semibold uppercase tracking-[0.24em] text-blush">{label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
