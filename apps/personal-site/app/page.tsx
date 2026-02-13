const signalPhrases = [
  "selected product stories",
  "engineering notes",
  "systems thinking",
  "interaction studies",
];

export default function HomePage() {
  return (
    <main className="teaser-page">
      <section className="teaser" aria-labelledby="landing-title">
        <p className="teaser__kicker">work in progress</p>
        <h1 id="landing-title" className="teaser__title">
          <span className="teaser__name">Michael Flores</span>
          <span className="teaser__period" aria-hidden="true">
            .
          </span>
        </h1>

        <p className="teaser__lede">
          A new portfolio is being shaped with a quieter visual language,
          sharper case studies, and purposeful motion.
        </p>

        <p className="teaser__status" aria-live="polite">
          <span className="teaser__statusText">coming soon / spring 2026</span>
          <span className="teaser__cursor" aria-hidden="true">
            |
          </span>
        </p>

        <ul className="teaser__signals" aria-label="Upcoming content">
          {signalPhrases.map((phrase) => (
            <li key={phrase}>{phrase}</li>
          ))}
        </ul>

        <p className="teaser__contact">
          For now, say hello at{" "}
          <a href="mailto:me@michaelflores.co">me@michaelflores.co</a>.
        </p>
      </section>
    </main>
  );
}
