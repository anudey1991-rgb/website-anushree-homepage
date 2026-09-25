import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getProject, isProtectedProject, PROJECTS } from "@/data/projects";
import { SurvivorshipCaseStudy } from "@/components/SurvivorshipCaseStudy";
import { SiteHeader } from "@/components/SiteHeader";
import { BackToProjects } from "@/components/BackToProjects";
import { ProjectGate } from "@/components/ProjectGate";
import { getGateStatus } from "@/lib/portfolio-gate.functions";
import { useLocalUnlock } from "@/hooks/useLocalUnlock";
import { useState } from "react";
import type { Project } from "@/data/projects";

const SITE_URL = "https://www.anushreedey.com";

/** Three related projects: same category first, then other work. */
function getRecommendations(project: Project): Project[] {
  const sameCategory = PROJECTS.filter(
    (item) => item.category === project.category && item.slug !== project.slug,
  );
  const others = PROJECTS.filter(
    (item) => item.category !== project.category && item.slug !== project.slug,
  );
  return [...sameCategory, ...others].slice(0, 3);
}

export const Route = createFileRoute("/portfolio/$slug")({
  loader: async ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    const locked = isProtectedProject(project);
    const { unlocked } = locked ? await getGateStatus() : { unlocked: true };
    return { project, locked: locked && !unlocked };
  },

  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Project not found | Anushree Dey" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const project = loaderData.project;
    const url = `${SITE_URL}/portfolio/${project.slug}`;
    if (loaderData.locked) {
      return {
        meta: [
          { title: `${project.title} | Protected case study | Anushree Dey` },
          { name: "description", content: "This case study is protected by a non-disclosure agreement." },
          { name: "robots", content: "noindex" },
        ],
        links: [{ rel: "canonical", href: url }],
      };
    }

    return {
      meta: [
        { title: `${project.title} | Anushree Dey` },
        { name: "description", content: project.description },
        { property: "og:title", content: `${project.title} | Anushree Dey` },
        { property: "og:description", content: project.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: project.image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: `${project.title} | Anushree Dey` },
        { name: "twitter:description", content: project.description },
        { name: "twitter:image", content: project.image },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          description: project.description,
          image: project.image,
          url,
          creator: { "@type": "Person", name: "Anushree Dey" },
          keywords: [project.category, project.industry, ...project.responsibilities].join(", "),
        }),
      }],
    };
  },
  notFoundComponent: ProjectNotFound,
  component: ProjectPage,
});

function ProjectPage() {
  const { slug } = Route.useParams();
  const loaderData = Route.useLoaderData();
  const localUnlocked = useLocalUnlock();
  const [justUnlocked, setJustUnlocked] = useState(false);
  const project = loaderData?.project ?? getProject(slug);
  if (!project) return <ProjectNotFound />;
  const serverLocked = loaderData?.locked ?? isProtectedProject(project);
  const locked = serverLocked && !localUnlocked && !justUnlocked;
  const currentIndex = PROJECTS.findIndex((item) => item.slug === project.slug);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  if (locked) return <ProjectGate project={project} onUnlocked={() => setJustUnlocked(true)} />;

  if (project.slug === "agent-verified-data-survivorship") {
    const recommendations = getRecommendations(project);
    return <SurvivorshipCaseStudy project={project} recommendations={recommendations} />;
  }

  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground font-sans antialiased">
      <SiteHeader />

      <main>
        <section className="mx-auto max-w-7xl px-6 pb-16 pt-16 lg:px-10 lg:pb-24 lg:pt-24">
          <BackToProjects />
          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{project.category}</p>
              <h1 className="mt-5 max-w-4xl font-serif text-[clamp(2.75rem,6vw,5rem)] leading-[1.03] text-foreground">
                {project.title}
              </h1>
              <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                {project.description}
              </p>
            </div>
            <dl className="grid content-start gap-6 border-t border-border pt-6 sm:grid-cols-3 lg:col-span-4 lg:grid-cols-1">
              <ProjectFact label="Role" value={project.role} />
              <ProjectFact label="Industry" value={project.industry} />
              <ProjectFact label="Duration" value={project.duration} />
            </dl>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="aspect-[16/9] overflow-hidden rounded-sm bg-secondary">
            <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-12 lg:gap-16 lg:px-10 lg:py-28">
          <div className="lg:col-span-4">
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Responsibilities</p>
          </div>
          <div className="lg:col-span-8">
            <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {project.responsibilities.map((responsibility) => (
                <li key={responsibility} className="border-t border-border pt-5 text-base text-foreground">
                  {responsibility}
                </li>
              ))}
            </ul>
            <div className="mt-16 border-t border-border pt-8">
              <h2 className="font-serif text-3xl text-foreground sm:text-4xl">Project overview</h2>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                This project reflects a systems-led design approach, bringing user needs, operational context and technical constraints into one coherent product experience.
              </p>
              {project.originalUrl && (
                <a href={project.originalUrl} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 border-b border-foreground/30 pb-1 text-sm font-medium text-foreground hover:border-foreground">
                  View original case study <span aria-hidden>↗</span>
                </a>
              )}
            </div>
          </div>
        </section>

        {nextProject && (
          <section className="border-t border-border bg-secondary/40">
            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Next project</p>
              <Link to="/portfolio/$slug" params={{ slug: nextProject.slug }} className="group mt-4 flex items-end justify-between gap-8">
                <span className="max-w-4xl font-serif text-3xl leading-tight text-foreground sm:text-5xl">{nextProject.title}</span>
                <span aria-hidden className="text-2xl transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </section>
        )}
      </main>

      <footer className="bg-foreground text-background/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-xs sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <p>© {new Date().getFullYear()} Anushree Dey. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="mailto:anushree.d@hotmail.com" className="hover:text-background">Email</a>
            <a href="https://www.linkedin.com/in/anushreedey" target="_blank" rel="noreferrer" className="hover:text-background">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ProjectFact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</dt>
      <dd className="mt-2 font-serif text-xl text-foreground">{value}</dd>
    </div>
  );
}

function ProjectNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-center">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Project not found</p>
        <h1 className="mt-4 font-serif text-4xl text-foreground">This case study is unavailable.</h1>
        <Link to="/" hash="portfolio" className="mt-8 inline-block border-b border-foreground/30 pb-1 text-sm text-foreground">Return to portfolio</Link>
      </div>
    </main>
  );
}
