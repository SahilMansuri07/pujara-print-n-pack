export async function GET(request: Request) {
  if (!process.env.API_KEY) return Response.json({ code: 0, message: "Portfolio is temporarily unavailable." }, { status: 503 });
  const incoming = new URL(request.url).searchParams;
  const query = new URLSearchParams();
  const category = incoming.get("category");
  const featured = incoming.get("featured");
  const limit = incoming.get("limit");
  if (category) query.set("category", category.slice(0, 150));
  if (featured) query.set("featured", featured === "1" || featured === "true" ? "1" : "0");
  query.set("limit", String(Math.min(100, Math.max(1, Number(limit) || 100))));

  try {
    const base = process.env.API_BASE_URL || "http://localhost:5020/api/v1/user";
    const response = await fetch(`${base.replace(/\/$/, "")}/portfolio?${query}`, {
      headers: { "api-key": process.env.API_KEY },
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });
    const result = await response.json();
    return Response.json(result, { status: response.ok ? 200 : response.status });
  } catch {
    return Response.json({ code: 0, message: "We couldn't load the portfolio. Please try again." }, { status: 502 });
  }
}
