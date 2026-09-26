import { useEffect, useState } from "react";

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

  useEffect(() => {
    const elements = sections
      .map(([id]) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-88px 0px -55% 0px", threshold: [0, 0.2, 0.6] },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sections]);

  const goTo = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    element.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(id);
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", `#${id}`);
    }
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
        {sections.map(([id, title], index) => {
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
                <span className="mr-3 tabular-nums">{String(index + 1).padStart(2, "0")}</span>
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
