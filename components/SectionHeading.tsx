"use client";

import { motion } from "framer-motion";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  copy?: string;
};

export function SectionHeading({ eyebrow, title, copy }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="mx-auto mb-14 max-w-3xl text-center"
    >
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-blush">{eyebrow}</p>
      <h2 className="font-serif text-4xl leading-tight text-snow md:text-6xl">{title}</h2>
      {copy ? <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-snow/68 md:text-lg">{copy}</p> : null}
    </motion.div>
  );
}
