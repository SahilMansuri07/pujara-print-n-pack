export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!process.env.API_KEY) return Response.json({ code: 0, message: "Blog is temporarily unavailable." }, { status: 503 });
  const { slug } = await params;

  try {
    const base = process.env.API_BASE_URL || "http://localhost:5020/api/v1/user";
    const response = await fetch(`${base.replace(/\/$/, "")}/blogs/${encodeURIComponent(slug)}`, {
      headers: { "api-key": process.env.API_KEY },
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });
    const result = await response.json();
    return Response.json(result, { status: response.ok ? 200 : response.status });
  } catch {
    return Response.json({ code: 0, message: "We couldn't load this blog. Please try again." }, { status: 502 });
  }
}
