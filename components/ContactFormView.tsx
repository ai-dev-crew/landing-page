import type { ChangeEvent, FormEvent } from "react";
import type { ContactErrors, ContactValues } from "../lib/contact-form";

export type FormStatus = "idle" | "submitting" | "success" | "error";

type Props = {
  values: ContactValues;
  errors: ContactErrors;
  status: FormStatus;
  serverError?: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

const fields: { name: keyof ContactValues; label: string; type?: string }[] = [
  { name: "name", label: "Name" },
  { name: "email", label: "Email", type: "email" },
  { name: "company", label: "Company" },
  { name: "message", label: "Message" },
];

export function ContactFormView({
  values,
  errors,
  status,
  serverError,
  onChange,
  onSubmit,
}: Props) {
  if (status === "success") {
    return (
      <p role="status" className="form-success">
        Thanks! We received your message and will be in touch soon.
      </p>
    );
  }
  return (
    <form onSubmit={onSubmit} noValidate>
      {fields.map(({ name, label, type }) => (
        <div className="field" key={name}>
          <label htmlFor={`contact-${name}`}>{label}</label>
          {name === "message" ? (
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              value={values.message}
              onChange={onChange}
              aria-invalid={errors.message ? true : undefined}
            />
          ) : (
            <input
              id={`contact-${name}`}
              name={name}
              type={type ?? "text"}
              value={values[name]}
              onChange={onChange}
              aria-invalid={errors[name] ? true : undefined}
            />
          )}
          {errors[name] && (
            <span className="field-error" role="alert">
              {errors[name]}
            </span>
          )}
        </div>
      ))}
      {status === "error" && (
        <p role="alert" className="form-error">
          {serverError ?? "Something went wrong. Please try again."}
        </p>
      )}
      <button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
