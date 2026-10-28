export type ContactInput = {
  name: string;
  email: string;
  company: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

export type ContactResult =
  | { ok: true; value: ContactInput }
  | { ok: false; errors: ContactErrors };

const MAX_LENGTHS: Record<keyof ContactInput, number> = {
  name: 100,
  email: 254,
  company: 100,
  message: 5000,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(input: unknown): ContactResult {
  const body =
    input && typeof input === "object" ? (input as Record<string, unknown>) : {};
  const value = {} as ContactInput;
  const errors: ContactErrors = {};

  for (const field of Object.keys(MAX_LENGTHS) as (keyof ContactInput)[]) {
    const raw = body[field];
    const text = typeof raw === "string" ? raw.trim() : "";
    if (!text) {
      errors[field] = `${field} is required`;
    } else if (text.length > MAX_LENGTHS[field]) {
      errors[field] = `${field} must be at most ${MAX_LENGTHS[field]} characters`;
    } else if (field === "email" && !EMAIL_PATTERN.test(text)) {
      errors[field] = "email must be a valid email address";
    }
    value[field] = text;
  }

  return Object.keys(errors).length > 0 ? { ok: false, errors } : { ok: true, value };
}
