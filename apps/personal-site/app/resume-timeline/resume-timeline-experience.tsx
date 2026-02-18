"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type TimelineKind = "major" | "minor";

type TimelinePoint = {
  id: string;
  kind: TimelineKind;
  time: number;
  yearLabel: string;
  title: string;
  organization: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
};

type PositionedTimelinePoint = TimelinePoint & {
  degree: number;
};

const timelinePoints: TimelinePoint[] = [
  {
    id: "macys-application-developer-ui-architect",
    kind: "major",
    time: 2015.95,
    yearLabel: "2015",
    title: "Macy's",
    organization: "Macy's Systems & Technology",
    role: "Application Developer -> UI Architect",
    period: "Dec 2015 - Mar 2017",
    summary:
      "Built foundational frontend systems for enterprise retail platforms used by tens of thousands of associates.",
    highlights: [
      "Implemented the organization's first design system and internal frontend framework.",
      "Built reusable UI components, tooling, and internal APIs adopted across multiple applications.",
      "Shipped employee-facing platform features supporting core retail operations at scale.",
    ],
  },
  {
    id: "macys-design-system-foundation",
    kind: "minor",
    time: 2016.35,
    yearLabel: "2016",
    title: "Design system foundation",
    organization: "Macy's Systems & Technology",
    role: "UI Architect",
    period: "2016",
    summary:
      "Standardized shared UI primitives and frontend patterns across internal enterprise tools.",
    highlights: [
      "Reduced duplicated UI implementation work between teams.",
      "Improved UI consistency and delivery speed for internal products.",
    ],
  },
  {
    id: "verys-senior-lead-manager",
    kind: "major",
    time: 2017.2,
    yearLabel: "2017",
    title: "Verys",
    organization: "Verys",
    role: "Sr Software Engineer -> Lead -> Engineering Manager",
    period: "Mar 2017 - Mar 2020",
    summary:
      "Led delivery across multiple client programs while growing from senior IC work into technical and people leadership.",
    highlights: [
      "Owned frontend and backend delivery across concurrent consulting engagements.",
      "Defined architecture for large-scale web platforms, including CMS, account, and personalization systems.",
      "Managed hiring, performance, and technical growth across distributed teams.",
    ],
  },
  {
    id: "doubletap-consulting-founder",
    kind: "minor",
    time: 2018.25,
    yearLabel: "2018",
    title: "DoubleTap Consulting",
    organization: "DoubleTap Consulting",
    role: "Founder",
    period: "2017 - Jan 2022",
    summary:
      "Built and led product engineering engagements for early and growth-stage companies.",
    highlights: [
      "Delivered systems across consumer apps, enterprise dashboards, and hardware-connected products.",
      "Owned hiring, onboarding, and execution outcomes for small engineering teams.",
    ],
  },
  {
    id: "lively-video-lead-software-engineer",
    kind: "major",
    time: 2020.2,
    yearLabel: "2020",
    title: "Lively Video",
    organization: "Lively Video",
    role: "Lead Software Engineer",
    period: "Mar 2020 - Aug 2021",
    summary:
      "Owned core architecture and reliability for a real-time video client used by internal and external stakeholders.",
    highlights: [
      "Improved runtime performance and stability for live media workflows.",
      "Established CI/CD, documentation, and development standards.",
      "Recovered a high-risk initiative by narrowing scope and shipping a reliable partner integration path.",
    ],
  },
  {
    id: "italic-lead-software-engineer-contract",
    kind: "major",
    time: 2021.55,
    yearLabel: "2021",
    title: "Italic",
    organization: "Italic",
    role: "Lead Software Engineer (Contract)",
    period: "Jul 2021 - Jan 2022",
    summary:
      "Provided senior engineering leadership during a critical contract window with emphasis on architecture and execution quality.",
    highlights: [
      "Owned system design and delivery quality across product-critical workflows.",
      "Set stronger technical standards to support maintainability and team execution.",
      "Helped stabilize delivery under compressed timelines and evolving requirements.",
    ],
  },
  {
    id: "conscious-patterns-fractional-cto",
    kind: "major",
    time: 2022.05,
    yearLabel: "2022",
    title: "Conscious Patterns",
    organization: "Conscious Patterns",
    role: "Fractional CTO",
    period: "Jan 2022 - Present",
    summary:
      "Leads system architecture and engineering execution for a hardware-software wellness platform.",
    highlights: [
      "Designed and shipped a custom Raspberry Pi-based Linux OS and service stack for device operations.",
      "Built on-device APIs and services coordinating audio processing, vibration control, networking, and remote health monitoring.",
      "Shipped companion iOS and iPadOS apps in SwiftUI for device control and real-time feedback.",
    ],
  },
  {
    id: "device-os-and-service-stack",
    kind: "minor",
    time: 2023.1,
    yearLabel: "2023",
    title: "Device OS + services",
    organization: "Conscious Patterns",
    role: "Fractional CTO",
    period: "2023",
    summary:
      "Shipped core embedded runtime and control services that unified hardware, firmware, and connected app experiences.",
    highlights: [
      "Added robust device communication pathways across local and cloud-connected surfaces.",
      "Improved operational reliability under real-world hardware constraints.",
    ],
  },
  {
    id: "airtime-staff-software-engineer-ii",
    kind: "major",
    time: 2022.65,
    yearLabel: "2022",
    title: "Airtime",
    organization: "Airtime",
    role: "Staff Software Engineer II",
    period: "Aug 2022 - Jun 2025",
    summary:
      "Owned end-to-end delivery of high-impact creator features across Airtime Watch and Record products.",
    highlights: [
      "Led architecture and implementation for channels, direct upload, metadata pipelines, sharing redesign, and a full video editor rebuild.",
      "Integrated AI-powered capabilities into established creator workflows while preserving compatibility.",
      "Acted as technical owner by setting direction, unblocking teams, and raising delivery quality through architecture reviews.",
    ],
  },
  {
    id: "airtime-ai-creator-workflows",
    kind: "minor",
    time: 2024.2,
    yearLabel: "2024",
    title: "AI creator workflows",
    organization: "Airtime",
    role: "Staff Software Engineer II",
    period: "2024",
    summary:
      "Expanded creator tooling with AI-driven functionality layered into existing production workflows.",
    highlights: [
      "Balanced feature expansion with backward compatibility and reliability.",
      "Improved creator workflow depth without disrupting established usage patterns.",
    ],
  },
  {
    id: "all-turtles-engineering-consultant",
    kind: "major",
    time: 2025.55,
    yearLabel: "2025",
    title: "All Turtles",
    organization: "All Turtles (Client: Carrot Fertility)",
    role: "Engineering Consultant",
    period: "Jul 2025 - Jan 2026",
    summary:
      "Owned high-risk mobile platform modernization and core health-data workflows for Carrot Fertility sprint engagements.",
    highlights: [
      "Re-architected HealthKit and Health Connect integrations to support new product features with cross-platform parity.",
      "Led migration of production apps to Expo SDK 54, reducing maintenance drag and unblocking future delivery.",
      "Produced technical plans for experimentation and A/B testing infrastructure to support data-driven product decisions.",
    ],
  },
  {
    id: "carrot-health-data-rewrite",
    kind: "minor",
    time: 2025.85,
    yearLabel: "2025",
    title: "Health data rewrite",
    organization: "All Turtles / Carrot Fertility",
    role: "Software Engineering Consultant",
    period: "2025",
    summary:
      "Reworked critical notification and health-data ingestion systems to improve correctness, resilience, and extensibility.",
    highlights: [
      "Improved reliability of sensitive healthcare data flows.",
      "Created a stronger foundation for future HealthKit and push notifications development.",
    ],
  },
  {
    id: "carrot-fertility-senior-software-engineer-ii",
    kind: "major",
    time: 2026.12,
    yearLabel: "2026",
    title: "Carrot Fertility",
    organization: "Carrot Fertility",
    role: "Senior Software Engineer II",
    period: "Feb 2026 - Present",
    summary:
      "Transitioned from contractor to full-time engineer and continued leading delivery on the Sprints team.",
    highlights: [
      "Converted from prior contract engagement into a full-time role on the same product area.",
      "Continued ownership of Sprints initiatives across mobile platform reliability and feature delivery.",
    ],
  },
];

const MIN_GAP = 5;

const orderedTimeline: PositionedTimelinePoint[] = [...timelinePoints]
  .sort((a, b) => a.time - b.time)
  .reduce<PositionedTimelinePoint[]>((accumulator, item, index) => {
    if (index === 0) {
      accumulator.push({ ...item, degree: 0 });
      return accumulator;
    }

    const previousItem = accumulator[index - 1];
    const currentYear = item.time;
    const previousYear = previousItem.time;
    const yearDifference = currentYear - previousYear;
    const increment =
      yearDifference >= MIN_GAP ? yearDifference : MIN_GAP + yearDifference;

    accumulator.push({
      ...item,
      degree: previousItem.degree + increment,
    });

    return accumulator;
  }, []);

const majorTimeline = orderedTimeline.filter((point) => point.kind === "major");
const timelineById = new Map(orderedTimeline.map((point) => [point.id, point]));
const timelineIndexById = new Map(
  orderedTimeline.map((point, index) => [point.id, index]),
);

const maxDegree = Math.max(
  orderedTimeline[orderedTimeline.length - 1]?.degree ?? 1,
  1,
);

const OVERVIEW_SIZE = 920;
const OVERVIEW_HALF = OVERVIEW_SIZE / 2;
const OVERVIEW_RING_INNER = 264;
const OVERVIEW_TICK_OUTER = 286;
const OVERVIEW_MAJOR_OUTER = 326;
const OVERVIEW_MINOR_OUTER = 300;
const OVERVIEW_LABEL_RADIUS = 376;
const OVERLAY_TARGET_Y_RATIO = -0.34;
const SCALE_DEFAULT = 1;
const SCALE_ENTRY = 2.25;
const SHEET_REVEAL_DELAY_MS = 220;
const ZOOM_OUT_DELAY_MS = 90;
const OVERVIEW_ARC_GAP = 18;
const OVERVIEW_ARC_SPAN = 360 - OVERVIEW_ARC_GAP;
const OVERVIEW_ARC_START = -90 + OVERVIEW_ARC_GAP / 2;

function toOverviewAngle(degree: number): number {
  return (degree / maxDegree) * OVERVIEW_ARC_SPAN + OVERVIEW_ARC_START;
}

function toPoint(angle: number, radius: number) {
  const radians = (angle * Math.PI) / 180;
  return {
    x: Math.cos(radians) * radius,
    y: Math.sin(radians) * radius,
  };
}

function toPercent(xOrY: number) {
  return ((xOrY + OVERVIEW_HALF) / OVERVIEW_SIZE) * 100;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function circularAngleDistance(firstAngle: number, secondAngle: number) {
  const diff = Math.abs(firstAngle - secondAngle) % 360;
  return diff > 180 ? 360 - diff : diff;
}

function areIntersecting(
  firstNode: Element | null,
  secondNode: Element | null,
) {
  if (!firstNode || !secondNode) {
    return false;
  }

  const firstRect = firstNode.getBoundingClientRect();
  const secondRect = secondNode.getBoundingClientRect();

  return !(
    firstRect.right < secondRect.left ||
    firstRect.left > secondRect.right ||
    firstRect.bottom < secondRect.top ||
    firstRect.top > secondRect.bottom
  );
}

function formatPointLabel(point: TimelinePoint) {
  return `${point.yearLabel} · ${point.role} · ${point.title}`;
}

type ResumeTimelineExperienceProps = {
  mode?: "standalone" | "landing";
  showIntro?: boolean;
  onOverlayStateChangeAction?: (isOpen: boolean) => void;
};

export default function ResumeTimelineExperience({
  mode = "standalone",
  showIntro = true,
  onOverlayStateChangeAction,
}: ResumeTimelineExperienceProps) {
  const isLandingMode = mode === "landing";

  const [selectedId, setSelectedId] = useState(majorTimeline[0]?.id ?? "");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState(SCALE_DEFAULT);
  const [timelineBlur, setTimelineBlur] = useState(0);
  const [radialSize, setRadialSize] = useState(860);

  const radialRef = useRef<HTMLDivElement>(null);
  const overlaySheetRef = useRef<HTMLDivElement>(null);
  const activeNodeRef = useRef<HTMLButtonElement | null>(null);
  const zoomScaleRef = useRef(SCALE_DEFAULT);
  const intersectingAtYRef = useRef(0);
  const lastScrollTopRef = useRef(0);
  const touchStartYRef = useRef<number | null>(null);
  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasInitializedFromUrlRef = useRef(!isLandingMode);

  const selectedIndex = Math.max(
    orderedTimeline.findIndex((point) => point.id === selectedId),
    0,
  );

  const selectedPoint = orderedTimeline[selectedIndex] ?? orderedTimeline[0];

  const hoveredPoint = hoveredId ? timelineById.get(hoveredId) : undefined;
  const hoveredMinor =
    !isOverlayOpen && hoveredPoint?.kind === "minor" ? hoveredPoint : undefined;

  const previousPoint =
    selectedIndex > 0 ? orderedTimeline[selectedIndex - 1] : undefined;
  const nextPoint =
    selectedIndex < orderedTimeline.length - 1
      ? orderedTimeline[selectedIndex + 1]
      : undefined;

  const contextPoints = useMemo(() => {
    const start = Math.max(selectedIndex - 2, 0);
    const end = Math.min(selectedIndex + 3, orderedTimeline.length);
    return orderedTimeline
      .slice(start, end)
      .filter((point) => point.id !== selectedId);
  }, [selectedId, selectedIndex]);

  const visibleLabelIds = useMemo(() => {
    if (!isOverlayOpen) {
      return new Set(majorTimeline.map((point) => point.id));
    }

    const overlayCandidates = orderedTimeline.filter((point) => {
      if (point.id === selectedId) {
        return true;
      }

      const pointIndex = timelineIndexById.get(point.id) ?? 0;
      const distanceFromSelected = Math.abs(pointIndex - selectedIndex);

      if (point.kind === "major") {
        return distanceFromSelected <= 2;
      }

      return distanceFromSelected <= 1;
    });

    const prioritizedCandidates = [...overlayCandidates].sort(
      (first, second) => {
        if (first.id === selectedId) {
          return -1;
        }
        if (second.id === selectedId) {
          return 1;
        }
        if (first.kind !== second.kind) {
          return first.kind === "major" ? -1 : 1;
        }

        const firstIndex = timelineIndexById.get(first.id) ?? 0;
        const secondIndex = timelineIndexById.get(second.id) ?? 0;
        const firstDistance = Math.abs(firstIndex - selectedIndex);
        const secondDistance = Math.abs(secondIndex - selectedIndex);
        return firstDistance - secondDistance;
      },
    );

    const keptCandidates: PositionedTimelinePoint[] = [];

    for (const candidate of prioritizedCandidates) {
      const candidateAngle = toOverviewAngle(candidate.degree);
      const isTooClose = keptCandidates.some((keptCandidate) => {
        const keptAngle = toOverviewAngle(keptCandidate.degree);
        const minAngleGap =
          candidate.id === selectedId || keptCandidate.id === selectedId
            ? 16
            : candidate.kind === "minor" || keptCandidate.kind === "minor"
              ? 11
              : 8;

        return circularAngleDistance(candidateAngle, keptAngle) < minAngleGap;
      });

      if (candidate.id === selectedId || !isTooClose) {
        keptCandidates.push(candidate);
      }
    }

    return new Set(keptCandidates.map((point) => point.id));
  }, [isOverlayOpen, selectedId, selectedIndex]);

  const longformSections = useMemo(
    () => [
      `In ${selectedPoint.period}, I worked as ${selectedPoint.role} at ${selectedPoint.organization}. ${selectedPoint.summary}`,
      `The work here required balancing product intent with implementation detail, making sure design decisions held up across edge cases and production realities.`,
      `Across this chapter, the emphasis was on implementing complex product surfaces with craft.`,
    ],
    [selectedPoint],
  );

  const selectedAngle = toOverviewAngle(selectedPoint.degree);
  const selectedRadius =
    selectedPoint.kind === "major"
      ? OVERVIEW_MAJOR_OUTER
      : OVERVIEW_MINOR_OUTER;
  const selectedVector = toPoint(selectedAngle, selectedRadius);
  const selectedNormalizedX = selectedVector.x / OVERVIEW_HALF;
  const selectedNormalizedY = selectedVector.y / OVERVIEW_HALF;

  const currentScale = isOverlayOpen ? zoomScale : SCALE_DEFAULT;
  const currentPanX = isOverlayOpen
    ? -selectedNormalizedX * currentScale * (radialSize / 2)
    : 0;
  const currentPanY = isOverlayOpen
    ? -selectedNormalizedY * currentScale * (radialSize / 2) +
      radialSize * OVERLAY_TARGET_Y_RATIO
    : 0;

  const radialFrameStyle = {
    transform: `translate3d(${currentPanX.toFixed(2)}px, ${currentPanY.toFixed(2)}px, 0) scale(${currentScale})`,
    filter: `blur(${timelineBlur.toFixed(2)}px)`,
  };

  const syncScale = useCallback((nextScale: number) => {
    zoomScaleRef.current = nextScale;
    setZoomScale(nextScale);
  }, []);

  const updateTimelineBlur = useCallback(
    (scrollY: number) => {
      if (!isOverlayOpen || !isSheetOpen) {
        setTimelineBlur(0);
        intersectingAtYRef.current = 0;
        return;
      }

      const sheetNode = overlaySheetRef.current;
      const activeNode = activeNodeRef.current;
      if (!sheetNode || !activeNode) {
        setTimelineBlur(0);
        return;
      }

      const intersecting = areIntersecting(sheetNode, activeNode);
      if (intersecting && intersectingAtYRef.current === 0) {
        intersectingAtYRef.current = Math.abs(scrollY);
      }

      if (Math.abs(scrollY) === 0) {
        intersectingAtYRef.current = 0;
        setTimelineBlur(0);
        return;
      }

      if (intersectingAtYRef.current === 0) {
        setTimelineBlur(0);
        return;
      }

      const offsetY = Math.abs(scrollY) - intersectingAtYRef.current;
      const nextBlur = clamp(offsetY * 0.005, 0, 4);
      setTimelineBlur(nextBlur);
    },
    [isOverlayOpen, isSheetOpen],
  );

  const clearOverlayTimers = useCallback(() => {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }

    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const closeOverlay = useCallback(() => {
    clearOverlayTimers();
    setIsSheetOpen(false);
    setHoveredId(null);
    lastScrollTopRef.current = 0;
    touchStartYRef.current = null;
    intersectingAtYRef.current = 0;
    setTimelineBlur(0);
    syncScale(SCALE_DEFAULT);

    closeTimerRef.current = setTimeout(() => {
      setIsOverlayOpen(false);

      if (overlaySheetRef.current) {
        overlaySheetRef.current.scrollTop = 0;
      }
    }, ZOOM_OUT_DELAY_MS);
  }, [clearOverlayTimers, syncScale]);

  const openPoint = useCallback(
    (id: string) => {
      clearOverlayTimers();
      setSelectedId(id);
      setIsOverlayOpen(true);
      setIsSheetOpen(false);
      setHoveredId(null);
      lastScrollTopRef.current = 0;
      intersectingAtYRef.current = 0;
      setTimelineBlur(0);
      syncScale(SCALE_ENTRY);

      openTimerRef.current = setTimeout(() => {
        if (overlaySheetRef.current) {
          overlaySheetRef.current.scrollTop = 0;
        }

        setIsSheetOpen(true);
      }, SHEET_REVEAL_DELAY_MS);
    },
    [clearOverlayTimers, syncScale],
  );

  useEffect(() => {
    const node = radialRef.current;
    if (!node || typeof ResizeObserver === "undefined") {
      return;
    }

    const updateSize = (width: number) => setRadialSize(Math.max(width, 1));
    updateSize(node.clientWidth);

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) {
        return;
      }

      updateSize(entry.contentRect.width);
    });

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isOverlayOpen && !isSheetOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeOverlay();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeOverlay, isOverlayOpen, isSheetOpen]);

  useEffect(() => {
    return () => {
      clearOverlayTimers();
    };
  }, [clearOverlayTimers]);

  useEffect(() => {
    if (!isLandingMode || hasInitializedFromUrlRef.current) {
      return;
    }

    const searchParams = new URLSearchParams(window.location.search);
    const queryPoint = searchParams.get("point");
    const resolvedPoint =
      queryPoint && timelineById.has(queryPoint)
        ? queryPoint
        : (majorTimeline[0]?.id ?? "");
    const querySheet = searchParams.get("sheet");

    if (querySheet === "open") {
      openPoint(resolvedPoint);
    } else {
      setSelectedId(resolvedPoint);
      setIsOverlayOpen(false);
      setIsSheetOpen(false);
      syncScale(SCALE_DEFAULT);
    }

    hasInitializedFromUrlRef.current = true;
  }, [isLandingMode, openPoint, syncScale]);

  useEffect(() => {
    if (!isLandingMode || !hasInitializedFromUrlRef.current) {
      return;
    }

    const url = new URL(window.location.href);
    const nextSheet = isSheetOpen ? "open" : "closed";
    let hasChanged = false;

    if (url.searchParams.get("point") !== selectedId) {
      url.searchParams.set("point", selectedId);
      hasChanged = true;
    }

    if (url.searchParams.get("sheet") !== nextSheet) {
      url.searchParams.set("sheet", nextSheet);
      hasChanged = true;
    }

    if (!hasChanged) {
      return;
    }

    window.history.replaceState(
      window.history.state,
      "",
      `${url.pathname}${url.search}${url.hash}`,
    );
  }, [isLandingMode, isSheetOpen, selectedId]);

  useEffect(() => {
    if (!isOverlayOpen || !isSheetOpen) {
      return;
    }

    intersectingAtYRef.current = 0;
    const currentScrollY = overlaySheetRef.current?.scrollTop ?? 0;
    updateTimelineBlur(currentScrollY);
  }, [isOverlayOpen, isSheetOpen, selectedId, updateTimelineBlur]);

  useEffect(() => {
    onOverlayStateChangeAction?.(isOverlayOpen);
  }, [isOverlayOpen, onOverlayStateChangeAction]);

  function handleSheetScroll(event: React.UIEvent<HTMLDivElement>) {
    if (!isOverlayOpen) {
      return;
    }

    const scrollY = event.currentTarget.scrollTop;
    const previousScrollY = lastScrollTopRef.current;
    const deltaY = scrollY - previousScrollY;
    lastScrollTopRef.current = scrollY;

    // Keep the radial focus stable while reading sheet content.
    syncScale(SCALE_ENTRY);

    if (scrollY <= 0 && deltaY < 0) {
      closeOverlay();
      return;
    }

    updateTimelineBlur(Math.max(scrollY, 0));
  }

  function handleSheetWheel(event: React.WheelEvent<HTMLDivElement>) {
    if (!isOverlayOpen || !isSheetOpen) {
      return;
    }

    if (event.currentTarget.scrollTop <= 0 && event.deltaY < -1) {
      event.preventDefault();
      closeOverlay();
    }
  }

  function handleSheetTouchStart(event: React.TouchEvent<HTMLDivElement>) {
    touchStartYRef.current = event.touches[0]?.clientY ?? null;
  }

  function handleSheetTouchMove(event: React.TouchEvent<HTMLDivElement>) {
    if (!isOverlayOpen || !isSheetOpen) {
      return;
    }

    const startY = touchStartYRef.current;
    const currentY = event.touches[0]?.clientY;
    if (startY === null || currentY === undefined) {
      return;
    }

    const deltaY = currentY - startY;
    if (event.currentTarget.scrollTop <= 0 && deltaY > 12) {
      closeOverlay();
      touchStartYRef.current = currentY;
    }
  }

  const RootElement = (isLandingMode ? "div" : "main") as "div" | "main";

  return (
    <RootElement
      className={`resume-page ${isLandingMode ? "resume-page--landing" : ""}`}
    >
      {showIntro ? (
        <header className="resume-page__intro">
          <p className="resume-page__kicker">resume timeline</p>
          <h1 className="resume-page__title">Career story, mapped over time</h1>
          <p className="resume-page__lede">
            Click any point to zoom in. Scroll inside the sheet to read. Scroll
            back up at the top to dismiss to the full radial view.
          </p>
        </header>
      ) : null}

      <section
        className={`resume-stage ${isOverlayOpen ? "is-zoomed" : ""} ${
          isLandingMode ? "resume-stage--landing" : ""
        }`}
        aria-label="Interactive timeline"
      >
        <div
          className="resume-overview"
          ref={radialRef}
          onPointerLeave={() => setHoveredId(null)}
        >
          <div className="resume-overview__frame" style={radialFrameStyle}>
            <svg
              className="resume-overview__svg"
              viewBox={`-${OVERVIEW_HALF} -${OVERVIEW_HALF} ${OVERVIEW_SIZE} ${OVERVIEW_SIZE}`}
              role="presentation"
              aria-hidden="true"
            >
              {Array.from({ length: 180 }).map((_, index) => {
                const angle = (index / 180) * 360 - 90;
                const isPrimaryTick = index % 12 === 0;
                const from = toPoint(angle, OVERVIEW_RING_INNER);
                const to = toPoint(
                  angle,
                  isPrimaryTick ? OVERVIEW_TICK_OUTER + 6 : OVERVIEW_TICK_OUTER,
                );

                return (
                  <line
                    key={`overview-tick-${index}`}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    className={
                      isPrimaryTick
                        ? "resume-overview__tick resume-overview__tick--primary"
                        : "resume-overview__tick"
                    }
                  />
                );
              })}

              {orderedTimeline.map((point) => {
                const pointIndex = timelineIndexById.get(point.id) ?? 0;
                const angle = toOverviewAngle(point.degree);
                const from = toPoint(angle, OVERVIEW_RING_INNER);
                const to = toPoint(
                  angle,
                  point.kind === "major"
                    ? OVERVIEW_MAJOR_OUTER
                    : OVERVIEW_MINOR_OUTER,
                );
                const isSelected = selectedId === point.id;
                const isHovered = hoveredId === point.id;
                const isContextPoint =
                  Math.abs(pointIndex - selectedIndex) <= 2;
                const isActive = isSelected || isHovered;
                const isMuted = isOverlayOpen && !isActive && !isContextPoint;

                return (
                  <line
                    key={`overview-mark-${point.id}`}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    className={`resume-overview__mark ${
                      point.kind === "major"
                        ? "resume-overview__mark--major"
                        : "resume-overview__mark--minor"
                    } ${isActive ? "is-active" : ""} ${isMuted ? "is-muted" : ""}`}
                  />
                );
              })}
            </svg>

            <div className="resume-overview__targets">
              {orderedTimeline.map((point) => {
                const angle = toOverviewAngle(point.degree);
                const hitPoint = toPoint(
                  angle,
                  point.kind === "major"
                    ? OVERVIEW_MAJOR_OUTER
                    : OVERVIEW_MINOR_OUTER,
                );

                return (
                  <button
                    key={`overview-hit-${point.id}`}
                    type="button"
                    className={`resume-overview__hit resume-overview__hit--${point.kind}`}
                    ref={
                      point.id === selectedId
                        ? (node) => {
                            activeNodeRef.current = node;
                          }
                        : undefined
                    }
                    style={{
                      left: `${toPercent(hitPoint.x)}%`,
                      top: `${toPercent(hitPoint.y)}%`,
                    }}
                    onMouseEnter={() => setHoveredId(point.id)}
                    onFocus={() => setHoveredId(point.id)}
                    onBlur={() => setHoveredId(null)}
                    onClick={() => openPoint(point.id)}
                    aria-label={formatPointLabel(point)}
                  >
                    <span className="sr-only">{formatPointLabel(point)}</span>
                  </button>
                );
              })}

              {orderedTimeline.map((point) => {
                const angle = toOverviewAngle(point.degree);
                const labelPoint = toPoint(angle, OVERVIEW_LABEL_RADIUS);
                const alignment =
                  labelPoint.x > 48
                    ? "is-right"
                    : labelPoint.x < -48
                      ? "is-left"
                      : "is-center";
                const isSelected = selectedId === point.id;
                const isHovered = hoveredId === point.id;
                const shouldShow = visibleLabelIds.has(point.id);

                return (
                  <button
                    key={`overview-label-${point.id}`}
                    type="button"
                    className={`resume-overview__label resume-overview__label--${point.kind} ${alignment} ${
                      isSelected || isHovered ? "is-active" : ""
                    } ${shouldShow ? "" : "is-hidden"}`}
                    style={{
                      left: `${toPercent(labelPoint.x)}%`,
                      top: `${toPercent(labelPoint.y)}%`,
                    }}
                    tabIndex={shouldShow ? 0 : -1}
                    onMouseEnter={() => setHoveredId(point.id)}
                    onFocus={() => setHoveredId(point.id)}
                    onBlur={() => setHoveredId(null)}
                    onClick={() => openPoint(point.id)}
                    aria-hidden={!shouldShow}
                  >
                    <span>{point.title}</span>
                    <span>{point.yearLabel}</span>
                  </button>
                );
              })}

              {hoveredMinor ? (
                <div
                  className="resume-overview__tooltip"
                  style={{
                    left: `${toPercent(toPoint(toOverviewAngle(hoveredMinor.degree), OVERVIEW_LABEL_RADIUS - 10).x)}%`,
                    top: `${toPercent(toPoint(toOverviewAngle(hoveredMinor.degree), OVERVIEW_LABEL_RADIUS - 10).y)}%`,
                  }}
                  role="status"
                  aria-live="polite"
                >
                  <p>{hoveredMinor.title}</p>
                  <p>{hoveredMinor.yearLabel}</p>
                </div>
              ) : null}
            </div>
          </div>

          <div className={`resume-overlay ${isSheetOpen ? "is-open" : ""}`}>
            <article
              className="resume-overlay__sheet"
              ref={overlaySheetRef}
              onScroll={handleSheetScroll}
              onWheel={handleSheetWheel}
              onTouchStart={handleSheetTouchStart}
              onTouchMove={handleSheetTouchMove}
              aria-live="polite"
            >
              <div className="resume-overlay__grabber" aria-hidden="true" />

              <header className="resume-overlay__head">
                <p className="resume-overlay__kicker">{selectedPoint.period}</p>
                <h2 className="resume-overlay__title">{selectedPoint.role}</h2>
                <p className="resume-overlay__meta">
                  {selectedPoint.organization} · {selectedPoint.yearLabel}
                </p>
                <button
                  type="button"
                  className="resume-overlay__close"
                  onClick={closeOverlay}
                >
                  Back to timeline
                </button>
              </header>

              <section className="resume-overlay__body">
                {longformSections.map((section) => (
                  <p key={section}>{section}</p>
                ))}

                <h3>Highlights</h3>
                <ul>
                  {selectedPoint.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>

                <h3>Nearby points</h3>
                <div className="resume-overlay__chips">
                  {contextPoints.map((point) => (
                    <button
                      key={`context-${point.id}`}
                      type="button"
                      className="resume-overlay__chip"
                      onClick={() => setSelectedId(point.id)}
                    >
                      {point.yearLabel} · {point.title}
                    </button>
                  ))}
                </div>
              </section>

              <footer className="resume-overlay__foot">
                <button
                  type="button"
                  className="resume-overlay__step"
                  onClick={() =>
                    previousPoint && setSelectedId(previousPoint.id)
                  }
                  disabled={!previousPoint}
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="resume-overlay__step"
                  onClick={() => nextPoint && setSelectedId(nextPoint.id)}
                  disabled={!nextPoint}
                >
                  Next
                </button>
              </footer>
            </article>
          </div>
        </div>
      </section>
    </RootElement>
  );
}
