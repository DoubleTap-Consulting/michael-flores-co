import type { Metadata } from "next";
import ResumeTimelineExperience from "./resume-timeline-experience";

export const metadata: Metadata = {
  title: "Resume Timeline",
  description:
    "An interactive radial timeline of work history, roles, and impact highlights."
};

export default function ResumeTimelinePage() {
  return <ResumeTimelineExperience />;
}
