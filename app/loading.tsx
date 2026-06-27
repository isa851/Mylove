export default function Loading() {
  return (
    <main className="grid min-h-screen place-items-center bg-night text-snow">
      <div className="text-center">
        <div className="mx-auto mb-6 h-12 w-12 rounded-full border border-blush/30 border-t-blush animate-spin" />
        <p className="font-serif text-3xl">Загружаю маленькую вселенную...</p>
      </div>
    </main>
  );
}
