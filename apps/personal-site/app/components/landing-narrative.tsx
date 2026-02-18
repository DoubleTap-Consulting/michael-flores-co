"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import HeroIntro from "./hero-intro";
import TimelineSection from "./timeline-section";

const SCENE_START_RATIO = 0.08;
const SCENE_END_RATIO = 0.82;
const TIMELINE_HASH_THRESHOLD = 0.58;
const TIMELINE_INTERACTIVE_THRESHOLD = 0.62;
const BACKGROUND_TRANSITION_START = 0.26;
const BACKGROUND_TRANSITION_END = 0.82;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function lerp(from: number, to: number, progress: number) {
  return from + (to - from) * progress;
}

export default function LandingNarrative() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const heroAnchorRef = useRef<HTMLDivElement>(null);
  const timelineAnchorRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const activeHashRef = useRef<"hero" | "timeline" | null>(null);
  const interactiveRef = useRef(false);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isTimelineInteractive, setIsTimelineInteractive] = useState(false);

  const setBackgroundProgress = useCallback((progress: number) => {
    if (typeof document === "undefined") {
      return;
    }

    document.documentElement.style.setProperty(
      "--landing-bg-progress",
      progress.toFixed(4)
    );
  }, []);

  const setSceneVars = useCallback(
    (vars: Record<string, string>) => {
      const stageNode = stageRef.current;
      if (!stageNode) {
        return;
      }

      for (const [name, value] of Object.entries(vars)) {
        stageNode.style.setProperty(name, value);
      }
    },
    []
  );

  const replaceHash = useCallback((nextHash: "hero" | "timeline") => {
    if (typeof window === "undefined") {
      return;
    }

    const normalizedHash = `#${nextHash}`;
    if (window.location.hash === normalizedHash) {
      return;
    }

    const url = new URL(window.location.href);
    url.hash = normalizedHash;
    window.history.replaceState(
      window.history.state,
      "",
      `${url.pathname}${url.search}${url.hash}`
    );
  }, []);

  const syncTimelineInteractive = useCallback((nextValue: boolean) => {
    if (interactiveRef.current === nextValue) {
      return;
    }

    interactiveRef.current = nextValue;
    setIsTimelineInteractive(nextValue);
  }, []);

  const applySceneProgress = useCallback(
    (progress: number) => {
      const stepA = clamp(progress / 0.35, 0, 1);
      const stepB = clamp((progress - 0.35) / 0.4, 0, 1);
      const stepC = clamp((progress - 0.75) / 0.25, 0, 1);

      const heroScale = lerp(1, 0.68, progress);
      const heroOpacity = lerp(1, 0.12, stepB * 0.78 + stepC * 0.22);
      const heroZ = lerp(0, -340, stepA * 0.2 + stepB * 0.55 + stepC * 0.25);

      const timelineScale =
        progress < 0.35
          ? lerp(0.76, 0.88, stepA)
          : progress < 0.75
            ? lerp(0.88, 1.06, stepB)
            : lerp(1.06, 1, stepC);
      const timelineOpacity =
        progress < 0.35
          ? lerp(0.08, 0.24, stepA)
          : progress < 0.75
            ? lerp(0.24, 0.92, stepB)
            : lerp(0.92, 1, stepC);
      const timelineZ = lerp(-260, 0, stepA * 0.2 + stepB * 0.6 + stepC * 0.2);
      const backgroundProgress = clamp(
        (progress - BACKGROUND_TRANSITION_START) /
          (BACKGROUND_TRANSITION_END - BACKGROUND_TRANSITION_START),
        0,
        1
      );

      setSceneVars({
        "--scene-progress": progress.toFixed(4),
        "--hero-scale": heroScale.toFixed(4),
        "--hero-opacity": heroOpacity.toFixed(4),
        "--hero-z": `${heroZ.toFixed(2)}px`,
        "--timeline-scale": timelineScale.toFixed(4),
        "--timeline-opacity": timelineOpacity.toFixed(4),
        "--timeline-z": `${timelineZ.toFixed(2)}px`,
        "--scene-blur": `${lerp(0, 1.3, stepB).toFixed(2)}px`
      });
      setBackgroundProgress(backgroundProgress);

      const activeHash = progress >= TIMELINE_HASH_THRESHOLD ? "timeline" : "hero";
      if (activeHashRef.current !== activeHash) {
        activeHashRef.current = activeHash;
        replaceHash(activeHash);
      }

      syncTimelineInteractive(progress >= TIMELINE_INTERACTIVE_THRESHOLD);
    },
    [replaceHash, setBackgroundProgress, setSceneVars, syncTimelineInteractive]
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updatePreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => {
      mediaQuery.removeEventListener("change", updatePreference);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const initialHash = window.location.hash;
    if (initialHash === "#timeline") {
      timelineAnchorRef.current?.scrollIntoView({ block: "start", behavior: "auto" });
      activeHashRef.current = "timeline";
    } else {
      heroAnchorRef.current?.scrollIntoView({ block: "start", behavior: "auto" });
      activeHashRef.current = "hero";
    }
  }, []);

  useEffect(() => {
    setBackgroundProgress(0);

    return () => {
      setBackgroundProgress(0);
    };
  }, [setBackgroundProgress]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setSceneVars({
        "--scene-progress": "1",
        "--hero-scale": "1",
        "--hero-opacity": "1",
        "--hero-z": "0px",
        "--timeline-scale": "1",
        "--timeline-opacity": "1",
        "--timeline-z": "0px",
        "--scene-blur": "0px"
      });

      setBackgroundProgress(0);
      syncTimelineInteractive(true);
      return;
    }

    const sceneNode = sceneRef.current;
    if (!sceneNode) {
      return;
    }

    const updateScene = () => {
      const viewportHeight = window.innerHeight;
      const sceneTop = sceneNode.offsetTop;
      const sceneHeight = sceneNode.offsetHeight;
      const sceneTravel = Math.max(sceneHeight - viewportHeight, 1);
      const distanceIntoScene = clamp(window.scrollY - sceneTop, 0, sceneTravel);
      const sceneStartY = sceneTravel * SCENE_START_RATIO;
      const sceneEndY = sceneTravel * SCENE_END_RATIO;
      const progress = clamp(
        (distanceIntoScene - sceneStartY) / Math.max(sceneEndY - sceneStartY, 1),
        0,
        1
      );

      applySceneProgress(progress);
    };

    const scheduleUpdate = () => {
      if (rafRef.current !== null) {
        return;
      }

      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        updateScene();
      });
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [
    applySceneProgress,
    prefersReducedMotion,
    setBackgroundProgress,
    setSceneVars,
    syncTimelineInteractive
  ]);

  if (prefersReducedMotion) {
    return (
      <main className="landing-page landing-page--reduced-motion">
        <section id="hero" className="landing-static landing-static--hero">
          <HeroIntro />
        </section>
        <section id="timeline" className="landing-static landing-static--timeline">
          <TimelineSection isInteractive />
        </section>
      </main>
    );
  }

  return (
    <main className="landing-page">
      <div id="hero" className="landing-anchor landing-anchor--hero" ref={heroAnchorRef} />
      <div className="landing-scene" ref={sceneRef}>
        <div
          id="timeline"
          className="landing-anchor landing-anchor--timeline"
          ref={timelineAnchorRef}
        />
        <div className="landing-stage" ref={stageRef}>
          <section className="landing-layer landing-layer--hero" aria-labelledby="landing-title">
            <div className="landing-layer__inner">
              <HeroIntro />
            </div>
          </section>
          <section
            className={`landing-layer landing-layer--timeline ${
              isTimelineInteractive ? "is-interactive" : ""
            }`}
            aria-labelledby="timeline-heading"
          >
            <div className="landing-layer__inner">
              <TimelineSection isInteractive={isTimelineInteractive} />
            </div>
          </section>
          <div className="landing-scroll-hint" aria-hidden="true">
            <span className="landing-scroll-hint__label">Scroll</span>
            <span className="landing-scroll-hint__chevron" />
          </div>
        </div>
      </div>
    </main>
  );
}
