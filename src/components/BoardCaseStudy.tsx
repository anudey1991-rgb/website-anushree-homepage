import { assetUrl } from "@/lib/asset-url";
import { SiteHeader } from "@/components/SiteHeader";
import { BackToProjects } from "@/components/BackToProjects";
import { ProjectCard } from "@/components/ProjectCard";
import { OrgMark } from "@/components/OrgMark";
import type { Project } from "@/data/projects";

type AssetPointer = { url: string };

/**
 * Presents an original presentation board exactly as it was designed.
 *
 * Very tall source boards are sliced into vertical sections before upload:
 * a single image above roughly 8,000px gets downsampled by browser GPU
 * texture limits (visibly blurry on Safari and iOS). The sections are stacked
 * back to back with no gap so the board reads as one continuous artwork.
 */
export function BoardCaseStudy({
  project,
  recommendations,
  boards,
}: {
  project: Project;
  recommendations: Project[];
  boards: AssetPointer[];
}) {
  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground font-sans antialiased">
      <SiteHeader />

      <main>
        <section className="mx-auto max-w-7xl px-6 pb-14 pt-14 lg:px-10 lg:pb-20 lg:pt-20">
          <BackToProjects />
          <p className="mt-12 text-xs uppercase tracking-[0.22em] text-muted-foreground">
            {project.category}
          </p>
          <h1 className="mt-6 max-w-5xl font-serif text-[clamp(2.6rem,6vw,5.5rem)] leading-[1.0] text-foreground">
            {project.title}
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {project.description}
          </p>

          <dl className="mt-14 grid gap-6 border-y border-border py-7 sm:grid-cols-2 lg:grid-cols-4">
            <Fact label="Role" value={project.role} />
            <Fact label="Industry" value={project.industry} />
            <Fact label="Timeline" value={project.duration} />
            {project.organization ? (
              <div>
                <dt className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Organization
                </dt>
                <dd className="mt-3">
                  <OrgMark organization={project.organization} size="md" />
                </dd>
              </div>
            ) : null}
          </dl>

          <ul className="mt-8 flex flex-wrap gap-2">
            {project.responsibilities.map((item) => (
              <li
                key={item}
                className="rounded-full border border-border px-3.5 py-1.5 text-xs text-muted-foreground"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mx-auto max-w-6xl px-0 pb-20 sm:px-6 lg:px-10 lg:pb-28">
          <div className="overflow-hidden bg-white sm:rounded-sm">
            {boards.map((board, index) => (
              <img
                key={board.url}
                src={assetUrl(board)}
                alt={
                  boards.length > 1
                    ? `${project.title} case study, section ${index + 1} of ${boards.length}`
                    : `${project.title} case study`
                }
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                className="block w-full align-top"
              />
            ))}
          </div>
        </section>

        {recommendations.length > 0 && (
          <section className="border-t border-border bg-secondary/40">
            <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                Related projects
              </p>
              <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {recommendations.map((item) => (
                  <ProjectCard key={item.slug} project={item} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="bg-foreground text-background/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-xs sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <p>© {new Date().getFullYear()} Anushree Dey. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="mailto:anushree.d@hotmail.com" className="hover:text-background">
              Email
            </a>
            <a
              href="https://www.linkedin.com/in/anushreedey"
              target="_blank"
              rel="noreferrer"
              className="hover:text-background"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</dt>
      <dd className="mt-2 font-serif text-xl text-foreground">{value}</dd>
    </div>
  );
}
