import { Link } from "@tanstack/react-router";
import { LockIcon } from "@/components/LockIcon";
import { isProtectedProject, type Project } from "@/data/projects";


export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      to="/portfolio/$slug"
      params={{ slug: project.slug }}
      preload="intent"
      aria-label={`View case study: ${project.title}`}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-25px_oklch(0.22_0.02_260/0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <div className="aspect-[4/3] overflow-hidden bg-secondary">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-7">
        <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          <span className="rounded-full border border-border px-2.5 py-1">{project.category}</span>
          {isProtectedProject(project) && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/70 px-2.5 py-1">
              <LockIcon /> Protected by NDA
            </span>
          )}
        </div>

        <h3 className="mt-5 font-serif text-2xl leading-tight text-foreground">{project.title}</h3>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
        <span className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-medium text-foreground">
          <span className="border-b border-foreground/30 pb-0.5 transition-colors group-hover:border-foreground">View case study</span>
          <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}