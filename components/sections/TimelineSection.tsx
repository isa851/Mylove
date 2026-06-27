"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { content } from "@/content/data";
import { SectionHeading } from "@/components/SectionHeading";

export function TimelineSection() {
  return (
    <section id="timeline" className="section-shell bg-[linear-gradient(180deg,#0F172A,#111827)]">
      <SectionHeading eyebrow="Глава первая" title="Моменты, которые остались" copy="Небольшая история о воспоминаниях, которые незаметно стали важными." />
      <div className="mx-auto max-w-5xl">
        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-transparent via-blush/50 to-transparent md:left-1/2" />
          {content.timeline.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.8, delay: index * 0.08 }}
              className={`relative mb-12 grid gap-6 pl-12 md:grid-cols-2 md:pl-0 ${index % 2 === 0 ? "" : "md:[&>*:first-child]:col-start-2"}`}
            >
              <span className="absolute left-2 top-8 h-5 w-5 rounded-full border-4 border-night bg-blush shadow-glow md:left-[calc(50%-0.625rem)]" />
              <div className="glass overflow-hidden rounded-[8px] shadow-glass">
                <div className="relative aspect-[4/3]">
                  <Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 90vw, 42vw" className="object-cover" />
                </div>
                <div className="p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blush">{item.date}</p>
                  <h3 className="mt-3 font-serif text-3xl">{item.title}</h3>
                  <p className="mt-4 leading-7 text-snow/70">{item.description}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
