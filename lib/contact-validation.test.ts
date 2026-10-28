import { expect, test } from "vitest";
import { validateContact } from "./contact-validation";

const valid = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  company: "Analytical Engines",
  message: "Let's talk.",
};

test("accepts a valid body and trims fields", () => {
  const result = validateContact({ ...valid, name: "  Ada Lovelace  " });
  expect(result).toEqual({ ok: true, value: valid });
});

test.each(["name", "email", "company", "message"] as const)(
  "rejects a missing or blank %s",
  (field) => {
    for (const bad of [undefined, "   ", 42]) {
      const result = validateContact({ ...valid, [field]: bad });
      expect(result.ok).toBe(false);
      if (!result.ok) expect(Object.keys(result.errors)).toEqual([field]);
    }
  },
);

test.each(["nope", "a@b", "a b@c.com", "@c.com"])("rejects email %s", (email) => {
  const result = validateContact({ ...valid, email });
  expect(result.ok).toBe(false);
});

test("rejects over-long fields", () => {
  const result = validateContact({ ...valid, name: "x".repeat(101) });
  expect(result.ok).toBe(false);
});

test("rejects non-object input", () => {
  for (const input of [null, "x", 5, undefined]) {
    const result = validateContact(input);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(Object.keys(result.errors)).toHaveLength(4);
  }
});
