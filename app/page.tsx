import { BookCallButton } from "../components/BookCallButton";
import { CaseStudies } from "../components/CaseStudies";
import { ContactForm } from "../components/ContactForm";

export default function Home() {
  return (
    <main>
      <header className="hero">
        <p className="eyebrow">Vertical Systems · Vancouver, BC</p>
        <h1>AI employees for your business</h1>
        <p>
          We build AI employees and multi-agent systems that take real work off
          your team. 50+ clients served, including 10 multi-agent orchestration
          and AI employee projects.
        </p>
        <BookCallButton />
      </header>
      <CaseStudies />
      <section id="contact">
        <h2>Get in touch</h2>
        <ContactForm />
        <p>
          Prefer to talk? <BookCallButton />
        </p>
      </section>
    </main>
  );
}
