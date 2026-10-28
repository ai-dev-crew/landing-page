import { CAL_URL } from "../lib/contact-form";

export function BookCallButton() {
  return (
    <a
      className="button"
      href={CAL_URL}
      target="_blank"
      rel="noopener noreferrer"
    >
      Book a 30-minute call
    </a>
  );
}
