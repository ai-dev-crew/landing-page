import { CASE_STUDY_NOTE, caseStudies } from "../lib/case-studies";

export function CaseStudies() {
  return (
    <section id="case-studies">
      <h2>Case studies</h2>
      <p className="note">{CASE_STUDY_NOTE}</p>
      <div className="cards">
        {caseStudies.map((s) => (
          <article key={s.id} className="card">
            <p className="eyebrow">
              {s.client} · {s.industry}
            </p>
            <h3>Challenge</h3>
            <p>{s.challenge}</p>
            <h3>Solution</h3>
            <p>{s.solution}</p>
            <h3>Results</h3>
            <ul>
              {s.results.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
