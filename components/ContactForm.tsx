"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  emptyContact,
  submitContact,
  validateContact,
  type ContactErrors,
} from "../lib/contact-form";
import { ContactFormView, type FormStatus } from "./ContactFormView";

export function ContactForm() {
  const [values, setValues] = useState(emptyContact);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [serverError, setServerError] = useState<string>();

  function onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    setStatus("submitting");
    const result = await submitContact(values);
    if (result.ok) {
      setStatus("success");
    } else {
      setServerError(result.error);
      setStatus("error");
    }
  }

  return (
    <ContactFormView
      values={values}
      errors={errors}
      status={status}
      serverError={serverError}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
}
