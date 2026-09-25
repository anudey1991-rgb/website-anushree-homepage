import { Link } from "@tanstack/react-router";

/**
 * Accessible, visibly interactive control that returns the visitor to the
 * portfolio grid on the homepage. Rendered inside the content area, above
 * the pre-title of a project page.
 */
export function BackToProjects({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/"
      hash="portfolio"
      aria-label="Back to all projects on the homepage"
      className={`group inline-flex h-10 items-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-medium text-foreground shadow-sm transition-all duration-200 hover:-translate-x-0.5 hover:border-foreground/40 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}
    >
      <span aria-hidden className="text-base leading-none transition-transform duration-200 group-hover:-translate-x-0.5">
        &larr;
      </span>
      Back to all projects
    </Link>
  );
}
