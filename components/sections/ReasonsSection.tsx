"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useState } from "react";
import { content } from "@/content/data";
import { heartBurst } from "@/lib/confetti";
import { SectionHeading } from "@/components/SectionHeading";

export function ReasonsSection() {
  const [opened, setOpened] = useState<boolean[]>(() => content.reasons.map(() => false));

  return (
    <section className="section-shell bg-[radial-gradient(circle_at_50%_20%,rgba(244,63,94,0.16),transparent_34%),#0F172A]">
      <SectionHeading eyebrow="100 причин" title="Несколько причин из очень длинного списка" copy="Нажимай на карточки. В каждой спрятана маленькая правда." />
      <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {content.reasons.map((reason, index) => (
          <motion.button
            type="button"
            key={reason}
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: index * 0.04 }}
            onClick={() => {
              setOpened((current) => current.map((value, itemIndex) => (itemIndex === index ? true : value)));
              heartBurst();
            }}
            className="glass min-h-44 rounded-[8px] p-5 text-left shadow-glass transition hover:-translate-y-1 hover:border-blush/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blush"
          >
            <Heart className="mb-8 h-7 w-7 fill-rose text-rose" />
            <p className="font-serif text-2xl">{opened[index] ? reason : `Причина ${index + 1}`}</p>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
