"use client";

import { Environment, Float, MeshTransmissionMaterial, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useRef, useState } from "react";
import type { Mesh } from "three";
import { SectionHeading } from "@/components/SectionHeading";

function HeartMesh({ opened }: { opened: boolean }) {
  const ref = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.35;
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.05;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.9}>
      <mesh ref={ref} scale={opened ? 1.65 : 1.3}>
        <sphereGeometry args={[1.15, 64, 64]} />
        <MeshTransmissionMaterial
          color="#FB7185"
          thickness={0.65}
          roughness={0.12}
          transmission={0.95}
          ior={1.35}
          chromaticAberration={0.08}
          backside
        />
      </mesh>
    </Float>
  );
}

export default function HeartScene() {
  const [opened, setOpened] = useState(false);

  return (
    <section className="section-shell bg-[linear-gradient(180deg,#0F172A,#020617)]">
      <SectionHeading eyebrow="3D-сердце" title="Маленький светящийся мир внутри" copy="Нажми на сердце, и камера мягко приблизится." />
      <div className="relative mx-auto h-[640px] max-w-6xl overflow-hidden rounded-[8px] border border-white/10 bg-black/20">
        <Canvas camera={{ position: [0, 0, opened ? 4 : 6], fov: opened ? 38 : 48 }} dpr={[1, 1.7]} gl={{ antialias: true, powerPreference: "high-performance" }}>
          <color attach="background" args={["#020617"]} />
          <ambientLight intensity={0.6} />
          <pointLight position={[3, 3, 3]} intensity={8} color="#FB7185" />
          <Sparkles count={120} scale={7} size={2.4} speed={0.35} color="#F8FAFC" />
          <HeartMesh opened={opened} />
          <Environment preset="night" />
          <EffectComposer>
            <Bloom intensity={0.75} luminanceThreshold={0.15} luminanceSmoothing={0.8} />
          </EffectComposer>
        </Canvas>
        <button
          type="button"
          aria-label="Открыть 3D-сердце"
          onClick={() => setOpened(true)}
          className="absolute bottom-6 left-1/2 inline-flex -translate-x-1/2 items-center gap-3 rounded-full bg-white px-6 py-3 font-bold text-night shadow-glow transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blush"
        >
          <Heart className="h-5 w-5 fill-rose text-rose" />
          Открыть
        </button>
        {opened ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(244,63,94,0.22),transparent_58%)]" />
        ) : null}
      </div>
    </section>
  );
}
