"use client";

import { useState, type FormEvent } from "react";

export type FormStatus = "idle" | "sending" | "success" | "error";

export function ContactFormView({
  status,
  error,
  onSubmit,
}: {
  status: FormStatus;
  error?: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}) {
  if (status === "success") {
    return (
      <div className="thanks" role="status">
        <h3>Thank you, we got your message.</h3>
        <p>We will reply within one business day.</p>
      </div>
    );
  }
  return (
    <form className="form" onSubmit={onSubmit} noValidate={false}>
      <label>
        Name
        <input name="name" type="text" required autoComplete="name" />
      </label>
      <label>
        Email
        <input name="email" type="email" required autoComplete="email" />
      </label>
      <label>
        Company
        <input name="company" type="text" required autoComplete="organization" />
      </label>
      <label>
        Message
        <textarea name="message" rows={4} required />
      </label>
      {status === "error" && (
        <p className="form-error" role="alert">
          {error ?? "Something went wrong. Please try again."}
        </p>
      )}
      <button
        type="submit"
        className="btn btn-primary"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState<string>();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(typeof body?.error === "string" ? body.error : undefined);
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setError(undefined);
      setStatus("error");
    }
  }

  return <ContactFormView status={status} error={error} onSubmit={onSubmit} />;
}
