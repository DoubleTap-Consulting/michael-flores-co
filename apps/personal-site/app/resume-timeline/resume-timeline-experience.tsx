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

// Replace these seed entries with your real roles and milestones.
const timelinePoints: TimelinePoint[] = [
  {
    id: "northstar-product-designer",
    kind: "major",
    time: 2013.4,
    yearLabel: "2013",
    title: "Northstar Studio",
    organization: "Northstar Studio",
    role: "Product Designer",
    period: "2013-2016",
    summary:
      "Shifted from visual-only work into product systems and end-to-end UX delivery.",
    highlights: [
      "Built first reusable design system primitives across three products.",
      "Partnered with engineering to map interaction specs into implementation-ready states.",
      "Reduced onboarding drop-off with a guided setup flow."
    ]
  },
  {
    id: "design-system-rollout",
    kind: "minor",
    time: 2014.2,
    yearLabel: "2014",
    title: "System rollout",
    organization: "Northstar Studio",
    role: "Milestone",
    period: "2014",
    summary: "Rolled out a shared component language to product + marketing surfaces.",
    highlights: [
      "Created interface tokens for spacing and type scale.",
      "Aligned implementation details with frontend team conventions."
    ]
  },
  {
    id: "atlas-product-designer",
    kind: "major",
    time: 2016.6,
    yearLabel: "2016",
    title: "Atlas Health",
    organization: "Atlas Health",
    role: "Senior Product Designer",
    period: "2016-2019",
    summary:
      "Led product design for clinician workflows and shipped faster, safer task routing patterns.",
    highlights: [
      "Reframed complex desktop workflows into progressive disclosure patterns.",
      "Cut high-severity support tickets by simplifying high-risk flows.",
      "Introduced regular UX critique with PM and engineering partners."
    ]
  },
  {
    id: "cross-platform-refresh",
    kind: "minor",
    time: 2017.8,
    yearLabel: "2017",
    title: "Platform refresh",
    organization: "Atlas Health",
    role: "Milestone",
    period: "2017",
    summary: "Unified web and tablet patterns into one interaction model.",
    highlights: [
      "Documented desktop and touch parity behaviors.",
      "Defined consistent empty, loading, and error states."
    ]
  },
  {
    id: "ledger-principal-designer",
    kind: "major",
    time: 2019.3,
    yearLabel: "2019",
    title: "Ledger Cloud",
    organization: "Ledger Cloud",
    role: "Principal Product Designer",
    period: "2019-2022",
    summary:
      "Owned key platform experiences and led roadmap work for analytics, workflow tooling, and adoption.",
    highlights: [
      "Drove concept-to-launch for a new reporting experience used by enterprise customers.",
      "Established event instrumentation strategy with product analytics.",
      "Mentored designers and partnered on team operating rituals."
    ]
  },
  {
    id: "design-ops-pivot",
    kind: "minor",
    time: 2020.4,
    yearLabel: "2020",
    title: "Design ops pivot",
    organization: "Ledger Cloud",
    role: "Milestone",
    period: "2020",
    summary: "Built a design-quality review framework for weekly release cycles.",
    highlights: [
      "Created a release readiness checklist shared by design and QA.",
      "Improved handoff consistency for responsive edge cases."
    ]
  },
  {
    id: "studio-lead",
    kind: "major",
    time: 2022.1,
    yearLabel: "2022",
    title: "Independent Studio",
    organization: "Independent Practice",
    role: "Design Lead",
    period: "2022-2024",
    summary:
      "Partnered with founders and product teams to shape product strategy, interface systems, and implementation detail.",
    highlights: [
      "Designed and launched new product narratives for pre-seed to Series A teams.",
      "Created reusable implementation specs focused on interaction quality.",
      "Helped teams establish lightweight product-design decision frameworks."
    ]
  },
  {
    id: "prototype-library",
    kind: "minor",
    time: 2023.1,
    yearLabel: "2023",
    title: "Prototype library",
    organization: "Independent Practice",
    role: "Milestone",
    period: "2023",
    summary: "Standardized rapid concept prototypes to validate interaction directions.",
    highlights: [
      "Improved design review quality with interactive demo artifacts.",
      "Shortened iteration cycles for high-risk interactions."
    ]
  },
  {
    id: "portfolio-rebuild",
    kind: "major",
    time: 2025.0,
    yearLabel: "2025",
    title: "Personal Platform",
    organization: "michaelflores.co",
    role: "Builder / Storyteller",
    period: "2025-Present",
    summary:
      "Building an intentional portfolio platform focused on process, craft, and outcomes.",
    highlights: [
      "Designing a timeline-first wayfinding model for resume and case studies.",
      "Combining narrative storytelling with interaction-led exploration.",
      "Creating a modular content foundation for future writing and product work."
    ]
  },
  {
    id: "radial-timeline-concept",
    kind: "minor",
    time: 2025.6,
    yearLabel: "2025",
    title: "Radial timeline concept",
    organization: "michaelflores.co",
    role: "Milestone",
    period: "2025",
    summary: "Prototyped radial interaction patterns for resume and work history.",
    highlights: [
      "Added overview and zoomed context for major and minor moments.",
      "Connected timeline points to role-specific impact narratives."
    ]
  }
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
      yearDifference >= MIN_GAP
        ? yearDifference
        : MIN_GAP + yearDifference;

    accumulator.push({
      ...item,
      degree: previousItem.degree + increment
    });

    return accumulator;
  }, []);

const majorTimeline = orderedTimeline.filter((point) => point.kind === "major");
const timelineById = new Map(orderedTimeline.map((point) => [point.id, point]));
const timelineIndexById = new Map(
  orderedTimeline.map((point, index) => [point.id, index])
);

const maxDegree = Math.max(orderedTimeline[orderedTimeline.length - 1]?.degree ?? 1, 1);

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

function toOverviewAngle(degree: number): number {
  return (degree / maxDegree) * 360 - 90;
}

function toPoint(angle: number, radius: number) {
  const radians = (angle * Math.PI) / 180;
  return {
    x: Math.cos(radians) * radius,
    y: Math.sin(radians) * radius
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
  secondNode: Element | null
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
};

export default function ResumeTimelineExperience({
  mode = "standalone",
  showIntro = true
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
  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasInitializedFromUrlRef = useRef(!isLandingMode);

  const selectedIndex = Math.max(
    orderedTimeline.findIndex((point) => point.id === selectedId),
    0
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
    return orderedTimeline.slice(start, end).filter((point) => point.id !== selectedId);
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

    const prioritizedCandidates = [...overlayCandidates].sort((first, second) => {
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
    });

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
      `A recurring theme was setting up clearer collaboration loops across product, design, and engineering so execution speed improved without sacrificing quality.`,
      `This moment also shaped the next stage of my work by sharpening how I prioritize outcomes, sequence scope, and document interaction decisions.`,
      `Across this chapter, the emphasis was on repeatable systems, reliable interaction patterns, and making complex product surfaces easier to navigate.`
    ],
    [selectedPoint]
  );

  const selectedAngle = toOverviewAngle(selectedPoint.degree);
  const selectedRadius =
    selectedPoint.kind === "major" ? OVERVIEW_MAJOR_OUTER : OVERVIEW_MINOR_OUTER;
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
    filter: `blur(${timelineBlur.toFixed(2)}px)`
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
    [isOverlayOpen, isSheetOpen]
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

  const openPoint = useCallback((id: string) => {
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
  }, [clearOverlayTimers, syncScale]);

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
        : majorTimeline[0]?.id ?? "";
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
      `${url.pathname}${url.search}${url.hash}`
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

  const RootElement = (isLandingMode ? "div" : "main") as "div" | "main";

  return (
    <RootElement className={`resume-page ${isLandingMode ? "resume-page--landing" : ""}`}>
      {showIntro ? (
        <header className="resume-page__intro">
          <p className="resume-page__kicker">resume timeline</p>
          <h1 className="resume-page__title">Career story, mapped over time</h1>
          <p className="resume-page__lede">
            Click any point to zoom in. Scroll inside the sheet to read.
            Scroll back up at the top to dismiss to the full radial view.
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
                  isPrimaryTick ? OVERVIEW_TICK_OUTER + 6 : OVERVIEW_TICK_OUTER
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
                  point.kind === "major" ? OVERVIEW_MAJOR_OUTER : OVERVIEW_MINOR_OUTER
                );
                const isSelected = selectedId === point.id;
                const isHovered = hoveredId === point.id;
                const isContextPoint = Math.abs(pointIndex - selectedIndex) <= 2;
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
                  point.kind === "major" ? OVERVIEW_MAJOR_OUTER : OVERVIEW_MINOR_OUTER
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
                      top: `${toPercent(hitPoint.y)}%`
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
                      top: `${toPercent(labelPoint.y)}%`
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
                    top: `${toPercent(toPoint(toOverviewAngle(hoveredMinor.degree), OVERVIEW_LABEL_RADIUS - 10).y)}%`
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
                  onClick={() => previousPoint && setSelectedId(previousPoint.id)}
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
