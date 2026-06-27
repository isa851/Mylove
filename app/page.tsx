import dynamic from "next/dynamic";

const RomanticExperience = dynamic(() => import("@/components/RomanticExperience"), {
  loading: () => (
    <main className="grid min-h-screen place-items-center bg-night text-snow">
      <div className="text-center">
        <div className="mx-auto mb-6 h-12 w-12 rounded-full border border-blush/30 border-t-blush animate-spin" />
        <p className="font-serif text-3xl">Готовлю кое-что красивое...</p>
      </div>
    </main>
  )
});

export default function Home() {
  return <RomanticExperience />;
}
