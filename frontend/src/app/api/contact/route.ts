export async function POST(request: Request) {
  let body;
  try { body = await request.json(); } catch { return Response.json({ code: 2, message: "Please submit a valid contact form." }, { status: 400 }); }
  if (!body || typeof body !== "object" || Array.isArray(body)) return Response.json({ code: 2, message: "Invalid contact form." }, { status: 400 });
  const fields = { name: 150, email: 150, phone: 20, company: 150, subject: 200, message: 2000 };
  const payload: Record<string, string> = {};
  for (const [key, max] of Object.entries(fields)) {
    if (body[key] !== undefined && (typeof body[key] !== "string" || body[key].length > max)) return Response.json({ code: 2, message: `Please check the ${key} field.` }, { status: 400 });
    payload[key] = (body[key] || "").trim();
  }
  if (!process.env.API_KEY) return Response.json({ code: 0, message: "Contact enquiries are temporarily unavailable." }, { status: 503 });
  try {
    const base = process.env.API_BASE_URL || "http://localhost:5020/api/v1/user";
    const response = await fetch(`${base.replace(/\/$/, "")}/contact`, {
      method: "POST", headers: { "Content-Type": "application/json", "api-key": process.env.API_KEY },
      body: JSON.stringify(payload), cache: "no-store", signal: AbortSignal.timeout(60000),
    });
    const result = await response.json();
    if (result.code === 1 || result.code === 2) return Response.json(result, { status: response.status });
    return Response.json({ code: 0, message: "We couldn’t submit your enquiry. Please contact us by phone or WhatsApp." }, { status: 502 });
  } catch {
    return Response.json({ code: 0, message: "We couldn’t confirm your submission. Please contact us by phone or WhatsApp before sending it again." }, { status: 502 });
  }
}
