"use client";

import { useCallback, useState } from "react";
import ResumeTimelineExperience from "../resume-timeline/resume-timeline-experience";

type TimelineSectionProps = {
  isInteractive: boolean;
};

export default function TimelineSection({ isInteractive }: TimelineSectionProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const handleOverlayStateChange = useCallback((isOpen: boolean) => {
    setIsZoomed(isOpen);
  }, []);

  return (
    <section
      className={`landing-timeline ${isInteractive ? "is-interactive" : ""} ${
        isZoomed ? "is-zoomed" : ""
      }`}
      aria-labelledby="timeline-heading"
    >
      <header className="landing-timeline__header">
        <p className="landing-timeline__kicker">resume timeline</p>
        <h2 id="timeline-heading" className="landing-timeline__title">
          Where I&apos;ve worked and what I shipped
        </h2>
      </header>

      <ResumeTimelineExperience
        mode="landing"
        showIntro={false}
        onOverlayStateChangeAction={handleOverlayStateChange}
      />
    </section>
  );
}
