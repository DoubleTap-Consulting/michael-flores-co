import ResumeTimelineExperience from "../resume-timeline/resume-timeline-experience";

type TimelineSectionProps = {
  isInteractive: boolean;
};

export default function TimelineSection({ isInteractive }: TimelineSectionProps) {
  return (
    <section
      className={`landing-timeline ${isInteractive ? "is-interactive" : ""}`}
      aria-labelledby="timeline-heading"
    >
      <header className="landing-timeline__header">
        <p className="landing-timeline__kicker">resume timeline</p>
        <h2 id="timeline-heading" className="landing-timeline__title">
          Where I&apos;ve worked and what I shipped
        </h2>
      </header>

      <ResumeTimelineExperience mode="landing" showIntro={false} />
    </section>
  );
}
