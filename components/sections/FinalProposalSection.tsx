"use client";

import Lottie from "lottie-react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useMemo, useState } from "react";
import { content } from "@/content/data";
import { proposalCelebration } from "@/lib/confetti";
import { sendTelegramEvent } from "@/lib/analytics";
import { seededRange } from "@/lib/deterministic";

const heartAnimation = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 90,
  w: 220,
  h: 220,
  nm: "heart",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "heart",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 45 },
        p: { a: 0, k: [110, 112, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 1, k: [{ t: 0, s: [78, 78, 100] }, { t: 45, s: [96, 96, 100] }, { t: 90, s: [78, 78, 100] }] }
      },
      shapes: [
        { ty: "rc", p: { a: 0, k: [-32, 0] }, s: { a: 0, k: [72, 72] }, r: { a: 0, k: 36 } },
        { ty: "rc", p: { a: 0, k: [0, -32] }, s: { a: 0, k: [72, 72] }, r: { a: 0, k: 36 } },
        { ty: "fl", c: { a: 0, k: [0.957, 0.247, 0.369, 1] }, o: { a: 0, k: 100 } }
      ],
      ip: 0,
      op: 90,
      st: 0,
      bm: 0
    }
  ]
};

type FinalProposalSectionProps = {
  onCelebrate: () => void;
};

export function FinalProposalSection({ onCelebrate }: FinalProposalSectionProps) {
  const [proposalVisible, setProposalVisible] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const heartRain = useMemo(
    () =>
      Array.from({ length: 34 }, (_, index) => ({
        id: index,
        x: seededRange(index + 900, 0, 100),
        duration: seededRange(index + 1000, 5, 8),
        delay: seededRange(index + 1100, 0, 2)
      })),
    []
  );

  const moveNo = () => {
    setNoPosition({
      x: Math.round(seededRange(Date.now(), -130, 130)),
      y: Math.round(seededRange(Date.now() + 77, -80, 80))
    });
    sendTelegramEvent("no");
  };

  const accept = () => {
    setAccepted(true);
    proposalCelebration();
    onCelebrate();
    sendTelegramEvent("yes");
  };

  return (
    <section id="final" className="section-shell grid place-items-center overflow-hidden bg-[radial-gradient(circle_at_50%_36%,rgba(244,63,94,0.28),transparent_36%),#0F172A] text-center">
      {accepted
        ? heartRain.map((item) => (
            <motion.span
              key={item.id}
              className="pointer-events-none absolute text-2xl"
              initial={{ y: -80, x: `${item.x}vw`, opacity: 0 }}
              animate={{ y: "110vh", opacity: [0, 1, 1, 0] }}
              transition={{ duration: item.duration, repeat: Infinity, delay: item.delay }}
            >
              ❤️
            </motion.span>
          ))
        : null}
      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="mx-auto h-56 w-56">
          <Lottie animationData={heartAnimation} loop autoplay />
        </div>
        {!proposalVisible ? (
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-serif text-5xl md:text-7xl">{content.final.love}</h2>
            <p className="mt-5 font-serif text-3xl text-snow/80 md:text-5xl">{content.final.lastQuestion}</p>
            <button
              type="button"
              onClick={() => {
                setProposalVisible(true);
                sendTelegramEvent("final");
              }}
              className="mt-10 rounded-full bg-white px-8 py-4 font-bold text-night shadow-glow transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blush"
            >
              Продолжить
            </button>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}>
            <h2 className="font-serif text-5xl md:text-7xl">{accepted ? content.final.accepted : content.final.proposal}</h2>
            {!accepted ? (
              <div className="relative mx-auto mt-10 flex min-h-36 max-w-md items-center justify-center gap-5">
                <button
                  type="button"
                  onClick={accept}
                  className="inline-flex items-center gap-2 rounded-full bg-rose px-8 py-4 font-bold text-white shadow-glow transition hover:bg-blush focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blush"
                >
                  Да <Heart className="h-5 w-5 fill-white" />
                </button>
                <motion.button
                  type="button"
                  onPointerEnter={moveNo}
                  onClick={moveNo}
                  onTouchStart={moveNo}
                  animate={noPosition}
                  transition={{ type: "spring", stiffness: 220, damping: 14 }}
                  className="rounded-full border border-white/15 bg-white/10 px-7 py-4 font-bold text-white backdrop-blur transition hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blush"
                >
                  Нет 🙈
                </motion.button>
              </div>
            ) : null}
          </motion.div>
        )}
      </div>
    </section>
  );
}
