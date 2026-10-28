import { beforeEach, expect, test, vi } from "vitest";
import { openDb } from "./db";

const db = openDb(":memory:");
vi.mock("./db", async (importOriginal) => ({
  ...(await importOriginal<typeof import("./db")>()),
  getDb: () => db,
}));

import { POST } from "../app/api/contact/route";

const post = (body: string) =>
  POST(new Request("http://localhost/api/contact", { method: "POST", body }));

beforeEach(() => {
  db.exec("DELETE FROM contacts");
});

test("returns 201 and stores a valid submission", async () => {
  const res = await post(JSON.stringify({ name: "Ada", email: "ada@example.com", company: "Acme", message: "Hi" }));
  expect(res.status).toBe(201);
  expect(db.prepare("SELECT COUNT(*) AS n FROM contacts").get()).toMatchObject({ n: 1 });
});

test("returns 400 for missing fields", async () => {
  const res = await post(JSON.stringify({ name: "Ada" }));
  expect(res.status).toBe(400);
  expect((await res.json()).errors).toHaveProperty("email");
});

test("returns 400 for an invalid email", async () => {
  const res = await post(JSON.stringify({ name: "A", email: "bad", company: "C", message: "M" }));
  expect(res.status).toBe(400);
});

test("returns 400 for malformed JSON", async () => {
  expect((await post("{nope")).status).toBe(400);
});
