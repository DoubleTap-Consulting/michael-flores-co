const signalPhrases = [
  "selected product stories",
  "engineering notes",
  "systems thinking",
  "interaction studies",
];

type SocialIconName = "linkedin" | "threads" | "x";

const socialChannels: Array<{
  label: string;
  href: string;
  handle: string;
  icon: SocialIconName;
}> = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mikeflores1/",
    handle: "mikeflores1",
    icon: "linkedin",
  },
  {
    label: "Threads",
    href: "https://www.threads.com/@mike_flores23",
    handle: "@mike_flores23",
    icon: "threads",
  },
  {
    label: "X",
    href: "https://x.com/MichaelFlores",
    handle: "@MichaelFlores",
    icon: "x",
  },
];

function SocialIcon({ name }: { name: SocialIconName }) {
  if (name === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect
          x="3.5"
          y="3.5"
          width="17"
          height="17"
          rx="3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <circle cx="8.2" cy="9" r="1" fill="currentColor" />
        <path
          d="M7.2 11.2V17"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d="M11.2 17v-3.2c0-1.3 0.9-2.2 2.1-2.2s2.1 0.9 2.1 2.2V17"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === "threads") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle
          cx="12"
          cy="12"
          r="8.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <path
          d="M15.8 13c0 2.2-1.5 3.9-3.8 3.9-2.3 0-3.9-1.7-3.9-4.3 0-2.6 1.8-4.6 4.5-4.6 2.3 0 3.9 1.3 4.2 3.3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.3 12.5h2.9"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5.3 4.5h3.4L18.7 19.5h-3.4z" fill="currentColor" />
      <path d="M15.9 4.5h2.8L8.1 19.5H5.3z" fill="currentColor" />
    </svg>
  );
}

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

        <div className="teaser__reach">
          <p className="teaser__contact">
            For now, say hello at{" "}
            <a
              className="teaser__contactEmail"
              href="mailto:me@michaelflores.co"
            >
              me@michaelflores.co
            </a>
            .
          </p>
          <p className="teaser__contact">
            Email is best for project inquiries. If you want to chat or stay in
            touch generally, reach me here:
          </p>
          <nav
            className="teaser__socialNav"
            aria-label="Social places to reach Michael Flores"
          >
            <ul className="teaser__socialList">
              {socialChannels.map((channel) => (
                <li key={channel.label}>
                  <a
                    className="teaser__socialLink"
                    href={channel.href}
                    data-platform={channel.icon}
                    target="_blank"
                    rel="noreferrer"
                    title={channel.label}
                    aria-label={channel.label}
                  >
                    <span className="teaser__socialTop">
                      <span className="teaser__socialIcon">
                        <SocialIcon name={channel.icon} />
                      </span>
                    </span>
                    <span className="teaser__socialHandle">{channel.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </main>
  );
}
