import { renderToString } from "react-dom/server";
import { expect, test } from "vitest";
import { ContactFormView } from "./ContactFormView";
import { emptyContact } from "../lib/contact-form";

const base = {
  values: emptyContact,
  errors: {},
  status: "idle" as const,
  onChange: () => {},
  onSubmit: () => {},
};

test("idle state shows an enabled submit button", () => {
  const html = renderToString(<ContactFormView {...base} />);

  expect(html).toContain("Send message");
  expect(html).not.toContain("disabled");
});

test("validation errors are shown per field", () => {
  const html = renderToString(
    <ContactFormView {...base} errors={{ email: "Enter a valid email address." }} />,
  );

  expect(html).toContain("Enter a valid email address.");
  expect(html).toContain('aria-invalid="true"');
});

test("submitting disables the button", () => {
  const html = renderToString(<ContactFormView {...base} status="submitting" />);

  expect(html).toContain("Sending");
  expect(html).toContain("disabled");
});

test("success replaces the form with a thank-you", () => {
  const html = renderToString(<ContactFormView {...base} status="success" />);

  expect(html).toContain("Thanks!");
  expect(html).not.toContain("<form");
});

test("error state shows the server error and keeps the form", () => {
  const html = renderToString(
    <ContactFormView {...base} status="error" serverError="Network error." />,
  );

  expect(html).toContain("Network error.");
  expect(html).toContain("<form");
});
