import { getDb } from "../../../lib/db";
import { saveContact, validateContact } from "../../../lib/contact";

export const runtime = "nodejs";

export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const result = validateContact(body);
  if (!result.ok) {
    return Response.json({ error: "Validation failed", errors: result.errors }, { status: 400 });
  }

  try {
    const id = saveContact(getDb(), result.value);
    return Response.json({ ok: true, id }, { status: 201 });
  } catch {
    return Response.json({ error: "Could not save your message" }, { status: 500 });
  }
}
