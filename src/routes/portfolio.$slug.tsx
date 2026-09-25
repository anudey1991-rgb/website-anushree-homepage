import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import logoMark from "@/assets/anushree-logo.png";
import { getProject, PROJECTS } from "@/data/projects";
import { SurvivorshipCaseStudy } from "@/components/SurvivorshipCaseStudy";

const SITE_URL = "https://www.anushreedey.com";

export const Route = createFileRoute("/portfolio/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return project;
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
    const url = `${SITE_URL}/portfolio/${loaderData.slug}`;
    return {
      meta: [
        { title: `${loaderData.title} | Anushree Dey` },
        { name: "description", content: loaderData.description },
        { property: "og:title", content: `${loaderData.title} | Anushree Dey` },
        { property: "og:description", content: loaderData.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: loaderData.image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: `${loaderData.title} | Anushree Dey` },
        { name: "twitter:description", content: loaderData.description },
        { name: "twitter:image", content: loaderData.image },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: loaderData.title,
          description: loaderData.description,
          image: loaderData.image,
          url,
          creator: { "@type": "Person", name: "Anushree Dey" },
          keywords: [loaderData.category, loaderData.industry, ...loaderData.responsibilities].join(", "),
        }),
      }],
    };
  },
  notFoundComponent: ProjectNotFound,
  component: ProjectPage,
});

function ProjectPage() {
  const project = Route.useLoaderData();
  const currentIndex = PROJECTS.findIndex((item) => item.slug === project.slug);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  if (project.slug === "agent-verified-data-survivorship") {
    const recommendations = PROJECTS.filter(
      (item) => item.category === project.category && item.slug !== project.slug,
    ).slice(0, 2);
    return <SurvivorshipCaseStudy project={project} recommendations={recommendations} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <header className="border-b border-border/70 bg-background">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
          <Link to="/" className="flex items-center gap-3" aria-label="Anushree Dey home">
            <img src={logoMark} alt="" aria-hidden className="h-9 w-9 object-contain" />
            <span className="text-sm font-medium">Anushree Dey</span>
          </Link>
          <Link to="/" hash="portfolio" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            All projects
          </Link>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-7xl px-6 pb-16 pt-16 lg:px-10 lg:pb-24 lg:pt-24">
          <Link to="/" hash="portfolio" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <span aria-hidden>←</span> Back to portfolio
          </Link>
          <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
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
