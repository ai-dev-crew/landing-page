import { renderToString } from "react-dom/server";
import { expect, test } from "vitest";
import Home from "./page";
import { caseStudies } from "../lib/case-studies";
import { CAL_URL } from "../lib/contact-form";

test("renders the Vertical Systems hero", () => {
  const html = renderToString(<Home />);

  expect(html).toContain("<h1>AI employees for your business</h1>");
  expect(html).toContain("Vancouver, BC");
  expect(html).toContain("50+ clients");
});

test("renders every case study", () => {
  const html = renderToString(<Home />);

  for (const s of caseStudies) {
    expect(html).toContain(s.client);
    expect(html).toContain(s.results[0]);
  }
  expect(html).toContain("Illustrative, anonymized");
});

test("Cal.com buttons link to the booking page", () => {
  const html = renderToString(<Home />);

  expect(html.split(`href="${CAL_URL}"`).length - 1).toBe(2);
});

test("renders the contact form fields", () => {
  const html = renderToString(<Home />);

  for (const f of ["name", "email", "company", "message"]) {
    expect(html).toContain(`name="${f}"`);
  }
});
