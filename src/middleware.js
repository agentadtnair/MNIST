import { NextResponse } from "next/server";

export async function middleware(req) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0] ||
    req.ip ||
    "unknown";

  const data = {
    ip,
    url: req.nextUrl.pathname,
    method: req.method,
    userAgent: req.headers.get("user-agent"),
    time: new Date().toISOString(),
  };

  console.log(data);

  // 🔥 Non-blocking (IMPORTANT)
  fetch("https://shuffler.io/api/v1/hooks/webhook_a8318874-30e5-4b34-8bb0-07eaf3918d30", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).catch(() => {});

  return NextResponse.next();
}
