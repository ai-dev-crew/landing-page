import { expect, test, vi } from "vitest";
import { submitContact, validateContact } from "./contact-form";

const valid = {
  name: " Ada ",
  email: "ada@example.com",
  company: "Acme",
  message: "Hello",
};

test("valid values have no errors", () => {
  expect(validateContact(valid)).toEqual({});
});

test("each empty field is reported", () => {
  const errors = validateContact({
    name: " ",
    email: "",
    company: "",
    message: "",
  });

  expect(Object.keys(errors).sort()).toEqual([
    "company",
    "email",
    "message",
    "name",
  ]);
});

test("bad email format is reported", () => {
  expect(validateContact({ ...valid, email: "nope" }).email).toMatch(/valid/);
});

test("submit posts trimmed JSON and succeeds", async () => {
  const f = vi.fn().mockResolvedValue({ ok: true });

  expect(await submitContact(valid, f)).toEqual({ ok: true });
  expect(f).toHaveBeenCalledWith(
    "/api/contact",
    expect.objectContaining({ method: "POST" }),
  );
  expect(JSON.parse(f.mock.calls[0][1].body).name).toBe("Ada");
});

test("submit reports server errors", async () => {
  const f = vi.fn().mockResolvedValue({ ok: false });

  expect(await submitContact(valid, f)).toMatchObject({ ok: false });
});

test("submit reports network errors", async () => {
  const f = vi.fn().mockRejectedValue(new Error("down"));
  const result = await submitContact(valid, f);

  expect(result).toMatchObject({ ok: false, error: expect.stringMatching(/Network/) });
});
