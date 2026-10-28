import { expect, test } from "vitest";
import { openDb } from "./db";
import { saveContact, validateContact } from "./contact";

const valid = { name: " Ada ", email: "ada@example.com", company: "Acme", message: "Hello" };

test("accepts a valid submission and trims values", () => {
  const result = validateContact(valid);
  expect(result).toEqual({ ok: true, value: { ...valid, name: "Ada" } });
});

test("reports every missing field", () => {
  const result = validateContact({});
  expect(result.ok).toBe(false);
  if (!result.ok) expect(Object.keys(result.errors).sort()).toEqual(["company", "email", "message", "name"]);
});

test("rejects blank and non-string fields", () => {
  const result = validateContact({ ...valid, name: "   ", company: 5 });
  expect(result.ok).toBe(false);
  if (!result.ok) expect(Object.keys(result.errors).sort()).toEqual(["company", "name"]);
});

test("rejects an invalid email", () => {
  const result = validateContact({ ...valid, email: "not-an-email" });
  expect(result).toEqual({ ok: false, errors: { email: "email is invalid" } });
});

test("rejects non-object input", () => {
  expect(validateContact(null).ok).toBe(false);
});

test("saves a valid contact to SQLite", () => {
  const db = openDb(":memory:");
  const result = validateContact(valid);
  if (!result.ok) throw new Error("expected valid");
  const id = saveContact(db, result.value);
  const row = db.prepare("SELECT name, email, company, message FROM contacts WHERE id = ?").get(id);
  expect({ ...row }).toEqual({ name: "Ada", email: "ada@example.com", company: "Acme", message: "Hello" });
});
