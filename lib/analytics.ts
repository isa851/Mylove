export type TelegramEvent = "open" | "yes" | "no" | "final";

const labels: Record<TelegramEvent, string> = {
  open: "Кто-то открыл веб-сайт.",
  yes: "❤️ Она согласилась.!",
  no: "💔 Она нажала «Нет».",
  final: "Она добралась до заключительного раздела."
};

export function getClientContext() {
  if (typeof window === "undefined") {
    return {};
  }

  return {
    time: new Date().toLocaleString(),
    browser: navigator.userAgent,
    device: /Mobi|Android/i.test(navigator.userAgent) ? "Mobile" : "Desktop",
    language: navigator.language,
    currentPage: window.location.href,
    timestamp: new Date().toISOString()
  };
}

export async function sendTelegramEvent(event: TelegramEvent) {
  try {
    await fetch("/api/telegram", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        event,
        message: labels[event],
        context: getClientContext()
      }),
      keepalive: true
    });
  } catch {
    // Analytics must never interrupt the confession experience.
  }
}
