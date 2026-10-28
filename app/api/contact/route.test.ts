import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { afterAll, beforeAll, expect, test } from "vitest";

let dir: string;
let dbPath: string;
let POST: (request: Request) => Promise<Response>;

beforeAll(async () => {
  dir = mkdtempSync(join(tmpdir(), "contact-route-"));
  dbPath = join(dir, "contacts.db");
  process.env.CONTACT_DB_PATH = dbPath;
  ({ POST } = await import("./route"));
});

afterAll(() => {
  rmSync(dir, { recursive: true, force: true });
});

const post = (body: string) =>
  POST(new Request("http://localhost/api/contact", { method: "POST", body }));

const rowCount = () => {
  const db = new DatabaseSync(dbPath);
  const row = db.prepare("SELECT COUNT(*) AS n FROM contacts").get() as { n: number };
  db.close();
  return row.n;
};

test("saves a valid submission and returns 201", async () => {
  const res = await post(
    JSON.stringify({ name: " Ada ", email: "ada@example.com", company: "AE", message: "Hi" }),
  );
  expect(res.status).toBe(201);
  expect(await res.json()).toMatchObject({ ok: true });

  const db = new DatabaseSync(dbPath);
  const rows = db.prepare("SELECT name, email FROM contacts").all();
  db.close();
  expect(rows).toEqual([{ name: "Ada", email: "ada@example.com" }]);
});

test("returns 400 with per-field errors and writes nothing", async () => {
  const before = rowCount();
  const res = await post(JSON.stringify({ name: "", email: "bad", company: "AE" }));
  expect(res.status).toBe(400);
  const body = await res.json();
  expect(Object.keys(body.errors).sort()).toEqual(["email", "message", "name"]);
  expect(rowCount()).toBe(before);
});

test("returns 400 for invalid JSON", async () => {
  const res = await post("{not json");
  expect(res.status).toBe(400);
});
