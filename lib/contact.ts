import type { DatabaseSync } from "node:sqlite";

export type ContactInput = {
  name: string;
  email: string;
  company: string;
  message: string;
};

export type ValidationResult =
  | { ok: true; value: ContactInput }
  | { ok: false; errors: Partial<Record<keyof ContactInput, string>> };

const FIELDS = ["name", "email", "company", "message"] as const;
const MAX_LENGTH = { name: 200, email: 254, company: 200, message: 5000 };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(input: unknown): ValidationResult {
  const source = (typeof input === "object" && input !== null ? input : {}) as Record<string, unknown>;
  const errors: Partial<Record<keyof ContactInput, string>> = {};
  const value = {} as ContactInput;

  for (const field of FIELDS) {
    const raw = source[field];
    const text = typeof raw === "string" ? raw.trim() : "";
    if (!text) {
      errors[field] = `${field} is required`;
    } else if (text.length > MAX_LENGTH[field]) {
      errors[field] = `${field} is too long`;
    } else if (field === "email" && !EMAIL_PATTERN.test(text)) {
      errors[field] = "email is invalid";
    } else {
      value[field] = text;
    }
  }

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, value };
}

export function saveContact(db: DatabaseSync, contact: ContactInput): number {
  const result = db
    .prepare("INSERT INTO contacts (name, email, company, message) VALUES (?, ?, ?, ?)")
    .run(contact.name, contact.email, contact.company, contact.message);
  return Number(result.lastInsertRowid);
}
