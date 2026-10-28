import { renderToString } from "react-dom/server";
import { expect, test } from "vitest";
import { BookingDialog, BOOKING_URL } from "./components/BookingModal";
import { ContactFormView } from "./components/ContactForm";
import Home from "./page";

const noop = () => {};

test("renders hero, PAS sections and case studies", () => {
  const html = renderToString(<Home />);

  expect(html).toContain("<h1>");
  expect(html).toContain("Vancouver, BC");
  expect(html).toContain("50+");
  expect(html).toContain('id="problem"');
  expect(html).toContain('id="agitate"');
  expect(html).toContain('id="solution"');
  expect(html).toContain("Fortune 500 logistics firm");
  expect(html).toContain("Client names are withheld");
});

test("renders the four form fields and booking button", () => {
  const html = renderToString(<Home />);

  for (const f of ["name", "email", "company", "message"]) {
    expect(html).toContain(`name="${f}"`);
  }
  expect(html).toContain("Book a 30-min call");
  expect(html).not.toContain('target="_blank"');
});

test("form shows the thank-you state after success", () => {
  const html = renderToString(
    <ContactFormView status="success" onSubmit={noop} />,
  );

  expect(html).toContain("Thank you");
  expect(html).not.toContain("<form");
});

test("form shows an error message", () => {
  const html = renderToString(
    <ContactFormView status="error" error="Invalid email" onSubmit={noop} />,
  );

  expect(html).toContain("Invalid email");
});

test("form disables the submit button while sending", () => {
  const html = renderToString(<ContactFormView status="sending" onSubmit={noop} />);

  expect(html).toContain("disabled");
  expect(html).toContain("Sending");
});

test("booking dialog embeds the calendar in a popup, closed by default", () => {
  expect(renderToString(<BookingDialog open={false} onClose={noop} />)).toBe("");
  const html = renderToString(<BookingDialog open onClose={noop} />);

  expect(html).toContain('role="dialog"');
  expect(html).toContain(BOOKING_URL);
  expect(html).toContain("<iframe");
});
