import Link from "next/link";
import { Heart } from "lucide-react";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-night px-6 text-center text-snow">
      <div>
        <Heart className="mx-auto mb-6 h-12 w-12 text-rose" />
        <h1 className="font-serif text-5xl">Эта звезда потерялась.</h1>
        <p className="mx-auto mt-4 max-w-md text-snow/70">Страница не найдена, но признание всё ещё ждёт тебя.</p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-rose px-6 py-3 font-semibold text-white shadow-glow transition hover:bg-blush focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blush"
        >
          Вернуться домой
        </Link>
      </div>
    </main>
  );
}
