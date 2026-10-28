import { validateContact } from "../../../lib/contact-validation";
import { getDb, saveContact } from "../../../lib/db";

export const runtime = "nodejs";

export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Body must be valid JSON" }, { status: 400 });
  }

  const result = validateContact(body);
  if (!result.ok) {
    return Response.json({ errors: result.errors }, { status: 400 });
  }

  try {
    const id = saveContact(getDb(), result.value);
    return Response.json({ ok: true, id }, { status: 201 });
  } catch {
    return Response.json({ error: "Could not save your message" }, { status: 500 });
  }
}
