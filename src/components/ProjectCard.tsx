import { Link } from "@tanstack/react-router";
import { LockIcon } from "@/components/LockIcon";
import { OrgMark } from "@/components/OrgMark";
import { writeAnchor, writeScroll } from "@/lib/portfolio-session";
import { isProtectedProject, type Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  const locked = isProtectedProject(project);

  return (
    <Link
      to="/portfolio/$slug"
      params={{ slug: project.slug }}
      preload="intent"
      data-project-slug={project.slug}
      onClick={() => {
        // Remember where the visitor was, so coming back lands on this card.
        writeScroll(window.scrollY);
        writeAnchor(project.slug);
      }}
      aria-label={
        locked
          ? `View case study: ${project.title} (protected by NDA, password required)`
          : `View case study: ${project.title}`
      }
      className="group relative flex h-full flex-col rounded-xl border border-border bg-card p-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-25px_oklch(0.22_0.02_260/0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <div className="relative isolate aspect-[4/3] w-full overflow-hidden rounded-lg bg-secondary">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
        />

        {locked && (
          <span className="group/lock absolute right-3 top-3 z-10 flex items-center">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-black/55 text-white shadow-sm backdrop-blur-sm"
              title="Protected by NDA · Password required"
            >
              <LockIcon className="h-3.5 w-3.5" />
              <span className="sr-only">Protected by NDA. Password required.</span>
            </span>
            <span
              role="tooltip"
              className="pointer-events-none absolute right-0 top-10 w-max max-w-[15rem] translate-y-1 rounded-md bg-foreground px-2.5 py-1.5 text-[11px] font-medium tracking-wide text-background opacity-0 shadow-lg transition-all duration-200 group-hover/lock:translate-y-0 group-hover/lock:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
            >
              Protected by NDA · Password required
            </span>
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-4 pb-5 pt-6">
        <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          <span className="rounded-full border border-border px-2.5 py-1">{project.category}</span>
          {project.organization && <OrgMark organization={project.organization} />}
        </div>

        <h3 className="mt-5 font-serif text-2xl leading-tight text-foreground">{project.title}</h3>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

        <div className="mt-auto pt-7">
          <span className="group/cta relative inline-flex">
            <span className="inline-flex min-h-[40px] items-center gap-2 rounded-full border border-foreground/25 bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors duration-200 group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
              {locked && <LockIcon className="h-3.5 w-3.5" />}
              {locked ? "Unlock case study" : "View case study"}
              <span
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              >
                →
              </span>
            </span>
            {locked && (
              <span
                role="tooltip"
                className="pointer-events-none absolute bottom-full left-0 mb-2 w-max max-w-[15rem] translate-y-1 rounded-md bg-foreground px-2.5 py-1.5 text-[11px] font-medium tracking-wide text-background opacity-0 shadow-lg transition-all duration-200 group-hover/cta:translate-y-0 group-hover/cta:opacity-100"
              >
                Protected by NDA · Password required
              </span>
            )}
          </span>
        </div>
      </div>
    </Link>
  );
}
