"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { seededRange } from "@/lib/deterministic";

type ParticleHeartProps = {
  exploded: boolean;
};

export function ParticleHeart({ exploded }: ParticleHeartProps) {
  const points = useMemo(() => {
    return Array.from({ length: 170 }, (_, index) => {
      const t = (index / 170) * Math.PI * 2;
      const x = 16 * Math.sin(t) ** 3;
      const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      return {
        x: x * 10,
        y: y * 10,
        burstX: seededRange(index + 401, -380, 380),
        burstY: seededRange(index + 601, -310, 310),
        size: seededRange(index + 701, 4, 9),
        delay: seededRange(index + 809, 0, 0.45)
      };
    });
  }, []);

  return (
    <div className="relative mx-auto h-[320px] w-[320px] md:h-[440px] md:w-[440px]" aria-hidden="true">
      <div className="absolute inset-0 rounded-full bg-radial-rose blur-3xl" />
      {points.map((point, index) => (
        <motion.span
          key={index}
          className="absolute left-1/2 top-1/2 rounded-full bg-blush shadow-[0_0_18px_rgba(251,113,133,0.9)]"
          initial={{ x: point.x, y: point.y, opacity: 0, scale: 0.5 }}
          animate={
            exploded
              ? { x: point.burstX, y: point.burstY, opacity: 0, scale: 0.1, rotate: 180 }
              : { x: point.x, y: point.y, opacity: [0.55, 1, 0.68], scale: [0.8, 1.25, 0.9] }
          }
          transition={{ duration: exploded ? 1.15 : 3.2, delay: point.delay, repeat: exploded ? 0 : Infinity, ease: "easeInOut" }}
          style={{ width: point.size, height: point.size }}
        />
      ))}
    </div>
  );
}
