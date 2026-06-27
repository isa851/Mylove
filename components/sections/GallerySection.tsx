"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { content } from "@/content/data";
import { SectionHeading } from "@/components/SectionHeading";

export function GallerySection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex === null ? null : content.gallery[activeIndex];

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (activeIndex === null) return;
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowRight") setActiveIndex((activeIndex + 1) % content.gallery.length);
      if (event.key === "ArrowLeft") setActiveIndex((activeIndex - 1 + content.gallery.length) % content.gallery.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex]);

  return (
    <section className="section-shell bg-[linear-gradient(180deg,#111827,#1E293B_52%,#0F172A)]">
      <SectionHeading eyebrow="Галерея" title="Стена маленьких мечтаний" copy="Открой фотографию так, будто это воспоминание, которое можно подержать в руках." />
      <div className="mx-auto columns-1 gap-5 space-y-5 md:columns-2 lg:columns-3">
        {content.gallery.map((item, index) => (
          <motion.button
            type="button"
            key={item.src}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: index * 0.04 }}
            onClick={() => setActiveIndex(index)}
            className="group relative block w-full break-inside-avoid overflow-hidden rounded-[8px] border border-white/10 bg-white/5 text-left shadow-glass focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blush"
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={900}
              height={index % 2 === 0 ? 1200 : 720}
              sizes="(max-width: 768px) 92vw, 31vw"
              className="h-auto w-full object-cover transition duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/90 to-transparent p-5 font-serif text-2xl">{item.title}</span>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {active ? (
          <motion.div
            className="fixed inset-0 z-[70] grid place-items-center bg-night/80 p-4 backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
          >
            <button type="button" aria-label="Закрыть галерею" onClick={() => setActiveIndex(null)} className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
              <X />
            </button>
            <button type="button" aria-label="Предыдущее фото" onClick={() => setActiveIndex((activeIndex! - 1 + content.gallery.length) % content.gallery.length)} className="absolute left-5 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
              <ChevronLeft />
            </button>
            <motion.div layoutId={active.src} className="relative h-[78vh] w-full max-w-5xl overflow-hidden rounded-[8px] border border-white/10">
              <Image src={active.src} alt={active.alt} fill sizes="92vw" className="object-cover" priority />
            </motion.div>
            <button type="button" aria-label="Следующее фото" onClick={() => setActiveIndex((activeIndex! + 1) % content.gallery.length)} className="absolute right-5 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
              <ChevronRight />
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
