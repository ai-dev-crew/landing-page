import BookCallButton from "./components/BookingModal";
import ContactForm from "./components/ContactForm";
import {
  agitation,
  caseStudies,
  pains,
  solutionSteps,
  stats,
} from "./content";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <p className="eyebrow">Vertical Systems · Vancouver, BC</p>
        <h1>
          Hire AI employees that <span className="accent">do the work</span>,
          not just answer questions.
        </h1>
        <p className="lead">
          We build and orchestrate AI employees that run your workflows end to
          end, so your team can focus on what only people can do.
        </p>
        <div className="cta-row">
          <BookCallButton />
          <a className="btn btn-ghost" href="#contact">
            Send us a message
          </a>
        </div>
        <ul className="stats">
          {stats.map((s) => (
            <li key={s.label} className="card glow">
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="problem" className="section">
        <h2>Manual work is quietly draining your business</h2>
        <div className="grid">
          {pains.map((p) => (
            <article key={p.title} className="card glow">
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="agitate" className="section agitate">
        <h2>The cost of waiting keeps growing</h2>
        <p className="lead">{agitation}</p>
      </section>

      <section id="solution" className="section">
        <h2>Meet your new AI workforce</h2>
        <div className="grid">
          {solutionSteps.map((s, i) => (
            <article key={s.title} className="card glow">
              <span className="step">0{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="case-studies" className="section">
        <h2>Case studies: AI employees in the Fortune 500</h2>
        <p className="note">
          Client names are withheld under confidentiality agreements.
        </p>
        <div className="grid">
          {caseStudies.map((c) => (
            <article key={c.industry} className="card glow">
              <h3>{c.industry}</h3>
              <p>
                <strong>Challenge:</strong> {c.challenge}
              </p>
              <p>
                <strong>Solution:</strong> {c.solution}
              </p>
              <ul className="results">
                {c.results.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="section contact">
        <h2>Ready to put AI employees to work?</h2>
        <p className="lead">
          Book a 30-minute call, or tell us about your workflow.
        </p>
        <BookCallButton label="Pick a time on the calendar" />
        <ContactForm />
      </section>

      <footer className="footer">
        © Vertical Systems · Vancouver, BC
      </footer>
    </main>
  );
}
