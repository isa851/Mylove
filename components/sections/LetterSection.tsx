"use client";

import { motion } from "framer-motion";
import { MailQuestion } from "lucide-react";
import { useMemo, useState } from "react";
import { content } from "@/content/data";
import { SectionHeading } from "@/components/SectionHeading";

export function LetterSection() {
  const [open, setOpen] = useState(false);
  const words = useMemo(() => content.letter.body.split(" "), []);

  return (
    <section className="section-shell grid place-items-center bg-[linear-gradient(180deg,#0F172A,#1E293B)]">
      <div className="w-full">
        <SectionHeading eyebrow="Письмо" title="То, что я писал немного волнуясь" />
        <div className="mx-auto max-w-3xl">
          <div className="relative mx-auto max-w-2xl">
            <motion.div
              className="rounded-[8px] border border-blush/25 bg-[#2b1b25] p-8 shadow-glass"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="rounded-[8px] border border-rose/20 bg-[#fff7ed] p-8 text-night shadow-2xl"
                initial={false}
                animate={open ? { opacity: 1, scale: 1 } : { opacity: 0.5, scale: 0.95 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
              >
                <h3 className="font-serif text-3xl text-rose">{content.letter.title}</h3>
                <p className="mt-5 font-serif text-xl leading-8">
                  {open
                    ? words.map((word, index) => (
                        <motion.span
                          key={`${word}-${index}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.035 }}
                        >
                          {word}{" "}
                        </motion.span>
                      ))
                    : null}
                </p>
              </motion.div>
              {!open && (
                <button
                  type="button"
                  aria-label="Открыть письмо"
                  onClick={() => setOpen(true)}
                  className="mx-auto mt-8 grid h-20 w-20 place-items-center rounded-full bg-rose text-white shadow-glow transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blush"
                >
                  <MailQuestion className="h-9 w-9" />
                </button>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}




