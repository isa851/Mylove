"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useMemo } from "react";
import { seededRange } from "@/lib/deterministic";

type StarFieldProps = {
  interactive?: boolean;
};

export function StarField({ interactive = false }: StarFieldProps) {
  const stars = useMemo(
    () =>
      Array.from({ length: 92 }, (_, index) => ({
        id: index,
        x: seededRange(index + 11, 2, 98),
        y: seededRange(index + 101, 2, 98),
        size: seededRange(index + 211, 0.8, 3.2),
        delay: seededRange(index + 307, 0, 4)
      })),
    []
  );
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 18 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 18 });
  const translateX = useTransform(smoothX, [-0.5, 0.5], [-18, 18]);
  const translateY = useTransform(smoothY, [-0.5, 0.5], [-12, 12]);

  return (
    <motion.div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden"
      style={{ x: interactive ? translateX : 0, y: interactive ? translateY : 0 }}
      onPointerMove={(event) => {
        if (!interactive) return;
        mouseX.set(event.clientX / window.innerWidth - 0.5);
        mouseY.set(event.clientY / window.innerHeight - 0.5);
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(251,113,133,0.18),transparent_32%),linear-gradient(180deg,#0F172A,#111827_55%,#020617)]" />
      {stars.map((star) => (
        <motion.span
          key={star.id}
          className="absolute rounded-full bg-snow shadow-[0_0_12px_rgba(248,250,252,0.8)]"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size
          }}
          animate={{ opacity: [0.25, 1, 0.35], scale: [1, 1.6, 1] }}
          transition={{ duration: 3.6, delay: star.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </motion.div>
  );
}
