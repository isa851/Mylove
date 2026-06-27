import { NextResponse } from "next/server";

const CHAT_ID = "5158928611";

type AnalyticsPayload = {
  message?: string;
  context?: Record<string, string>;
};

export async function POST(request: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;

  if (!token) {
    return NextResponse.json({ ok: false, error: "Telegram token is not configured." }, { status: 500 });
  }

  const payload = (await request.json().catch(() => ({}))) as AnalyticsPayload;
  const context = payload.context ?? {};
  const lines = [
    payload.message ?? "Событие сайта.",
    "",
    context.time ? `Время: ${context.time}` : null,
    context.browser ? `Браузер: ${context.browser}` : null,
    context.device ? `Платформа: ${context.device}` : null,
    context.language ? `Язык: ${context.language}` : null,
    context.currentPage ? `Страница: ${context.currentPage}` : null,
    context.timestamp ? `Таймстамп: ${context.timestamp}` : null
  ].filter(Boolean);

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: lines.join("\n")
    })
  });

  if (!response.ok) {
    return NextResponse.json({ ok: false }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
