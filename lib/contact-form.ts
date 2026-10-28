export const CAL_URL = "https://cal.com/kanasani/30-min-with-mani";

export type ContactValues = {
  name: string;
  email: string;
  company: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

export type SubmitResult = { ok: true } | { ok: false; error: string };

export const emptyContact: ContactValues = {
  name: "",
  email: "",
  company: "",
  message: "",
};

const labels: Record<keyof ContactValues, string> = {
  name: "Name",
  email: "Email",
  company: "Company",
  message: "Message",
};

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  for (const key of Object.keys(labels) as (keyof ContactValues)[]) {
    if (!values[key].trim()) errors[key] = `${labels[key]} is required.`;
  }
  if (!errors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  return errors;
}

export async function submitContact(
  values: ContactValues,
  fetchFn: typeof fetch = fetch,
): Promise<SubmitResult> {
  try {
    const res = await fetchFn("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: values.name.trim(),
        email: values.email.trim(),
        company: values.company.trim(),
        message: values.message.trim(),
      }),
    });
    if (res.ok) return { ok: true };
    return { ok: false, error: "Something went wrong. Please try again." };
  } catch {
    return { ok: false, error: "Network error. Please try again." };
  }
}
