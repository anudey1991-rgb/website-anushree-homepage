import { useEffect, useRef, useState } from "react";

export type TocSection = readonly [string, string];

/**
 * Case-study section navigation.
 *
 * Scrolling is done programmatically rather than with native fragment jumps,
 * because embedded previews and some browsers suppress `href="#id"` jumps.
 * An IntersectionObserver keeps the active section in sync while reading.
 */
export function useSectionNav(sections: readonly TocSection[]) {
  const [active, setActive] = useState<string>(sections[0]?.[0] ?? "");
  // While a click-driven scroll is running, ignore scroll tracking so the
  // chosen item stays highlighted instead of flickering through sections.
  const lockRef = useRef<number | null>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      if (lockRef.current !== null) return;
      const offset = 140;
      let current = sections[0]?.[0] ?? "";
      for (const [id] of sections) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top - offset <= 0) current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [sections]);

  const goTo = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    setActive(id);
    if (lockRef.current !== null) window.clearTimeout(lockRef.current);
    const release = () => {
      if (lockRef.current !== null) window.clearTimeout(lockRef.current);
      lockRef.current = null;
      window.removeEventListener("scrollend", release);
    };
    window.addEventListener("scrollend", release, { once: true });
    lockRef.current = window.setTimeout(release, 1200);
    element.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState(null, "", `#${id}`);
  };

  return { active, goTo };
}

/** Sticky desktop sidebar list of sections. */
export function CaseStudyToc({
  sections,
  active,
  onSelect,
  label = "In this case study",
}: {
  sections: readonly TocSection[];
  active: string;
  onSelect: (id: string) => void;
  label?: string;
}) {
  return (
    <nav aria-label="Case study contents" className="sticky top-28 border-l border-border pl-5">
      <p className="mb-5 text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
      <ol className="space-y-1">
        {sections.map(([id, title]) => {
          const isActive = active === id;
          return (
            <li key={id} className="relative">
              <span
                aria-hidden
                className={`absolute -left-[21px] top-1.5 h-5 w-px bg-foreground transition-opacity duration-300 ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              />
              <button
                type="button"
                onClick={() => onSelect(id)}
                aria-current={isActive ? "true" : undefined}
                className={`block w-full rounded-sm py-1 text-left text-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  isActive ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {title}
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Horizontal quick-jump bar for phones and tablets. */
export function CaseStudyJumpBar({
  sections,
  active,
  onSelect,
}: {
  sections: readonly TocSection[];
  active: string;
  onSelect: (id: string) => void;
}) {
  return (
    <nav
      aria-label="Jump to section"
      className="sticky top-16 z-30 -mx-6 border-y border-border bg-background/95 backdrop-blur-md lg:hidden"
    >
      <ul className="flex gap-2 overflow-x-auto px-6 py-3">
        {sections.map(([id, title]) => {
          const isActive = active === id;
          return (
            <li key={id}>
              <button
                type="button"
                onClick={() => onSelect(id)}
                aria-current={isActive ? "true" : undefined}
                className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  isActive
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {title}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
