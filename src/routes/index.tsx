import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Anushree Dey — Lead Product & UX Designer" },
      {
        name: "description",
        content:
          "Portfolio of Anushree Dey, Lead Product Designer for enterprise SaaS, data platforms and intelligent workflows.",
      },
      { property: "og:title", content: "Anushree Dey — Lead Product & UX Designer" },
      {
        property: "og:description",
        content:
          "Enterprise SaaS · Data Platforms · Intelligent Workflows.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:image", content: PORTRAIT },
      { property: "og:image:alt", content: "Portrait of Anushree Dey" },
      { property: "og:site_name", content: "Anushree Dey" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Anushree Dey — Lead Product & UX Designer" },
      {
        name: "twitter:description",
        content:
          "Lead Product Designer specialising in enterprise SaaS, data platforms and agentic workflows.",
      },
      { name: "twitter:image", content: PORTRAIT },
      {
        name: "keywords",
        content:
          "Product Designer, UX Designer, Enterprise SaaS, Data Management, Agentic Experiences, Design Systems, Cloud Transformation, UK, Europe",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Anushree Dey",
          jobTitle: "Lead Product & UX Designer",
          image: PORTRAIT,
          url: "/",
          description:
            "Lead Product Designer specialising in enterprise SaaS, data platforms and intelligent, agentic workflows.",
          knowsAbout: EXPERTISE_TOPICS,
          sameAs: ["https://www.linkedin.com/"],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Anushree Dey — Portfolio",
          url: "/",
        }),
      },
    ],
  }),
  component: Index,
});

const PORTRAIT =
  "https://static.wixstatic.com/media/55b247_73a8ce9adb854673bc820652486c9db3~mv2.jpg/v1/crop/x_0,y_15,w_674,h_821/fill/w_860,h_1060,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Gemini_Generated_Image_6wsagi6wsagi6wsa_edited.jpg";

const CATEGORIES = [
  "All",
  "Data Management",
  "Healthcare",
  "Aerospace",
  "Innovation",
  "Research",
  "Architecture",
] as const;

type Category = (typeof CATEGORIES)[number];

type Project = {
  title: string;
  description: string;
  image: string;
  category: Exclude<Category, "All">;
  role: string;
  industry: string;
  duration: string;
  responsibilities: string[];
};

const PROJECTS: Project[] = [
  {
    title: "Agent-Verified Data Survivorship",
    description:
      "An agentic copilot that cross-checks MDM survivorship decisions against real-world sources, right inside Slack, before bad data ever gets published.",
    image:
      "https://static.wixstatic.com/media/55b247_6a623ccd20d24bc1b48184110f48cb50~mv2.png/v1/fit/w_960,h_720,q_85,enc_avif,quality_auto/55b247_6a623ccd20d24bc1b48184110f48cb50~mv2.png",
    category: "Data Management",
    role: "Lead Product Designer",
    industry: "Enterprise SaaS",
    duration: "2024 — 2025",
    responsibilities: [
      "Agentic workflow design",
      "Discovery & research",
      "Interaction design",
      "Design system contributions",
    ],
  },
  {
    title: "Tabular Edit of Records",
    description:
      "A persistent table workspace for inline-editing, validating, and bulk-publishing up to 10,000 MDM records at once.",
    image:
      "https://static.wixstatic.com/media/55b247_1ff9699456fe48baa9a994e92872629d~mv2.png/v1/fit/w_960,h_720,q_85,enc_avif,quality_auto/55b247_1ff9699456fe48baa9a994e92872629d~mv2.png",
    category: "Data Management",
    role: "Lead Product Designer",
    industry: "Enterprise SaaS",
    duration: "2024",
    responsibilities: [
      "Information architecture",
      "Interaction design",
      "Usability testing",
      "Engineering partnership",
    ],
  },
];

const EXPERTISE: { label: string; weight: 1 | 2 | 3 | 4 }[] = [
  { label: "Enterprise SaaS", weight: 4 },
  { label: "Data Management", weight: 4 },
  { label: "Agentic Experiences", weight: 4 },
  { label: "Enterprise Workflows", weight: 4 },
  { label: "Design Systems", weight: 3 },
  { label: "Information Architecture", weight: 3 },
  { label: "Systems Thinking", weight: 3 },
  { label: "Cloud Transformation", weight: 3 },
  { label: "Accessibility", weight: 2 },
  { label: "Cross-functional Collaboration", weight: 2 },
];

const EXPERTISE_TOPICS = EXPERTISE.map((e) => e.label);

const NAV = [
  { label: "Home", href: "#home" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "About", href: "#about" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

function Index() {
  const [filter, setFilter] = useState<Category>("All");
  const [active, setActive] = useState<string>("home");

  const projects = useMemo(
    () => (filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter],
  );

  useEffect(() => {
    const ids = ["home", "portfolio", "about", "resume", "contact"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased scroll-smooth">
      <Nav active={active} />
      <main>
        <Hero />
        <Expertise />
        <Portfolio
          projects={projects}
          filter={filter}
          setFilter={setFilter}
        />
        <About />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function Logo() {
  return (
    <a href="#home" className="flex items-center gap-3 group" aria-label="Anushree Dey — home">
      <svg width="28" height="28" viewBox="0 0 40 40" fill="none" aria-hidden>
        <path
          d="M8 34 L20 6 L32 34 M13 26 H27"
          stroke="url(#a-grad)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient id="a-grad" x1="0" y1="0" x2="40" y2="40">
            <stop offset="0" stopColor="oklch(0.32 0.09 255)" />
            <stop offset="1" stopColor="oklch(0.55 0.14 250)" />
          </linearGradient>
        </defs>
      </svg>
      <span className="text-sm font-medium tracking-[-0.01em] text-foreground">
        Anushree Dey
      </span>
    </a>
  );
}

function Nav({ active }: { active: string }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Logo />
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm text-muted-foreground">
            {NAV.map((item) => {
              const id = item.href.slice(1);
              const isActive = active === id;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`relative py-1 transition-colors hover:text-foreground ${
                      isActive ? "text-foreground" : ""
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute -bottom-[3px] left-0 h-px bg-foreground transition-all duration-300 ${
                        isActive ? "w-full" : "w-0"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
            <li>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </nav>
        <a
          href="#contact"
          className="hidden md:inline-flex h-9 items-center rounded-full border border-foreground/15 px-4 text-xs font-medium tracking-wide text-foreground transition-colors hover:bg-foreground hover:text-background"
        >
          Get in touch
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 pt-20 pb-24 lg:grid-cols-12 lg:gap-12 lg:px-10 lg:pt-28 lg:pb-32">
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-center">
          <p className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">
            <span className="inline-block h-px w-8 bg-foreground/40" />
            Available for Senior & Lead roles
          </p>
          <h1 className="font-serif text-[clamp(2.75rem,6vw,5.25rem)] leading-[1.02] tracking-[-0.02em] text-foreground">
            Anushree Dey.
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-medium text-foreground sm:text-xl">
            Lead Product &amp; User Experience Designer
          </p>
          <p className="mt-2 max-w-2xl text-sm uppercase tracking-[0.18em] text-muted-foreground">
            Enterprise Systems · Data Platforms · Intelligent Workflows
          </p>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            I design enterprise software that helps people work effectively with complex data and business-critical systems.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#portfolio"
              className="inline-flex h-11 items-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-transform duration-200 hover:-translate-y-0.5"
            >
              View Portfolio
            </a>
            <a
              href="#resume"
              className="inline-flex h-11 items-center rounded-full border border-foreground/20 px-6 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              Download Resume
            </a>
          </div>

          <dl className="mt-16 grid max-w-lg grid-cols-3 gap-8 border-t border-border pt-8">
            <div>
              <dt className="text-xs uppercase tracking-widest text-muted-foreground">Experience</dt>
              <dd className="mt-2 font-serif text-2xl text-foreground">10+ yrs</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-widest text-muted-foreground">Focus</dt>
              <dd className="mt-2 font-serif text-2xl text-foreground">Enterprise</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-widest text-muted-foreground">Based</dt>
              <dd className="mt-2 font-serif text-2xl text-foreground">UK / EU</dd>
            </div>
          </dl>
        </div>

        <div className="lg:col-span-5 xl:col-span-4">
          <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-sm bg-secondary">
            <img
              src={PORTRAIT}
              alt="Portrait of Anushree Dey"
              loading="eager"
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-foreground/5" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Expertise() {
  const sizeFor = (w: 1 | 2 | 3 | 4) =>
    ({
      1: "text-lg sm:text-xl font-light text-muted-foreground",
      2: "text-2xl sm:text-3xl font-normal text-foreground/70",
      3: "text-3xl sm:text-4xl font-medium text-foreground",
      4: "text-4xl sm:text-6xl font-semibold tracking-[-0.03em] text-foreground",
    })[w];

  // Dynamic, non-uniform layout: varied vertical offsets and alignment
  // per item so the cloud reads as an organic arrangement, not a list.
  const offsets = [
    "translate-y-0",
    "translate-y-2",
    "-translate-y-1",
    "translate-y-3",
    "-translate-y-2",
    "translate-y-1",
  ];
  const justify = ["justify-start", "justify-center", "justify-end"];

  return (
    <section id="expertise" className="border-t border-border/70 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
              Expertise
            </p>
            <h2 className="mt-4 font-serif text-3xl leading-tight tracking-[-0.01em] text-foreground sm:text-4xl">
              A decade shaped by enterprise systems and data-intensive products.
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Larger words signal deeper specialisation. Narrower niches sit alongside as complementary strengths.
            </p>
          </div>
          <div className="lg:col-span-8">
            <ul className="flex flex-wrap items-center gap-x-8 gap-y-6">
              {EXPERTISE.map((item, i) => (
                <li
                  key={item.label}
                  className={`flex w-full sm:w-auto ${justify[i % justify.length]} ${offsets[i % offsets.length]}`}
                >
                  <span
                    className={`${sizeFor(item.weight)} leading-none font-sans transition-colors duration-200 hover:text-primary`}
                  >
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Portfolio({
  projects,
  filter,
  setFilter,
}: {
  projects: Project[];
  filter: Category;
  setFilter: (c: Category) => void;
}) {
  return (
    <section id="portfolio" className="border-t border-border/70">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
              Selected Work
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-[-0.02em] text-foreground sm:text-5xl">
              Portfolio
            </h2>
            <p className="mt-4 max-w-xl text-base text-muted-foreground">
              A range of enterprise product work across data management, healthcare, aerospace and innovation programmes.
            </p>
          </div>
        </div>

        <div
          role="tablist"
          aria-label="Filter projects"
          className="mt-12 -mx-6 flex gap-2 overflow-x-auto px-6 pb-1 sm:mx-0 sm:px-0 sm:flex-wrap"
        >
          {CATEGORIES.map((cat) => {
            const isActive = cat === filter;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                onClick={() => setFilter(cat)}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-all duration-200 ${
                  isActive
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-background text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
          {projects.length === 0 && (
            <div className="col-span-full rounded-xl border border-dashed border-border py-20 text-center text-sm text-muted-foreground">
              More {filter} case studies coming soon.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-25px_oklch(0.22_0.02_260/0.25)]">
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
        </div>
        <h3 className="mt-5 font-serif text-2xl leading-tight tracking-[-0.01em] text-foreground">
          {project.title}
        </h3>
        <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4 rounded-lg border border-border/70 bg-secondary/40 p-5 text-xs sm:grid-cols-4">
          <div>
            <dt className="uppercase tracking-widest text-muted-foreground">Role</dt>
            <dd className="mt-1 text-foreground">{project.role}</dd>
          </div>
          <div>
            <dt className="uppercase tracking-widest text-muted-foreground">Industry</dt>
            <dd className="mt-1 text-foreground">{project.industry}</dd>
          </div>
          <div>
            <dt className="uppercase tracking-widest text-muted-foreground">Duration</dt>
            <dd className="mt-1 text-foreground">{project.duration}</dd>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <dt className="uppercase tracking-widest text-muted-foreground">Responsibilities</dt>
            <dd className="mt-1 text-foreground">{project.responsibilities.length} areas</dd>
          </div>
          <div className="col-span-2 sm:col-span-4">
            <dt className="sr-only">Responsibilities</dt>
            <dd className="flex flex-wrap gap-1.5">
              {project.responsibilities.map((r) => (
                <span
                  key={r}
                  className="rounded-full border border-border bg-background px-2.5 py-1 text-[11px] font-normal normal-case tracking-normal text-foreground/80"
                >
                  {r}
                </span>
              ))}
            </dd>
          </div>
        </dl>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        <a
          href="#"
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground"
        >
          <span className="border-b border-foreground/30 pb-0.5 transition-colors group-hover:border-foreground">
            View case study
          </span>
          <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </a>
      </div>
    </article>
  );
}

function About() {
  return (
    <section id="about" className="border-t border-border/70 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <div className="relative aspect-[4/5] max-w-sm overflow-hidden rounded-sm bg-background">
                <img
                  src={PORTRAIT}
                  alt="Portrait of Anushree Dey"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="mt-6 max-w-sm text-xs uppercase tracking-[0.22em] text-muted-foreground">
                Anushree Dey — Lead Product Designer
              </p>
            </div>
          </div>
          <div className="lg:col-span-7">
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">About</p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.1] tracking-[-0.02em] text-foreground sm:text-5xl">
              Enterprise product design, grounded in systems thinking.
            </h2>

            <div className="mt-12 grid gap-12">
              <AboutBlock
                label="Introduction"
                body="I design enterprise software that helps people work effectively with complex data and business-critical systems."
              />
              <AboutBlock
                label="Professional Summary"
                body="Currently part of the Salesforce ecosystem, I design enterprise data management products, with a recent focus on agentic and AI-assisted workflows that simplify complex tasks while maintaining transparency, governance and user control."
              />
              <AboutBlock
                label="Core Expertise"
                body="Over the past decade, I've designed products across enterprise data management, healthcare, aerospace and education. My work spans cloud transformation, enterprise workflows, design systems and data-intensive experiences — including data onboarding, governance, configuration, security and business process management."
              />
              <AboutBlock
                label="Approach"
                body="With a background in architecture, I bring a systems-thinking approach to design, considering how products, people and technology work together to create scalable, cohesive experiences. I collaborate closely with product managers, architects and engineering teams to translate technical complexity into intuitive product experiences."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutBlock({ label, body }: { label: string; body: string }) {
  return (
    <div className="grid gap-3 border-t border-border/70 pt-6 sm:grid-cols-[160px_1fr] sm:gap-8">
      <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{label}</p>
      <p className="max-w-2xl text-base leading-relaxed text-foreground/85">{body}</p>
    </div>
  );
}

function Resume() {
  return (
    <section id="resume" className="border-t border-border/70">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-6 py-20 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-24">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Resume</p>
          <h2 className="mt-3 font-serif text-3xl leading-tight tracking-[-0.01em] text-foreground sm:text-4xl">
            The long-form version — roles, teams, outcomes.
          </h2>
        </div>
        <a
          href="#"
          className="inline-flex h-12 items-center rounded-full bg-foreground px-7 text-sm font-medium text-background transition-transform duration-200 hover:-translate-y-0.5"
        >
          Download Resume (PDF)
        </a>
      </div>
    </section>
  );
}

function Contact() {
  const items = [
    { label: "Email", value: "hello@anushreedey.com", href: "mailto:hello@anushreedey.com" },
    { label: "LinkedIn", value: "linkedin.com/in/anushreedey", href: "https://www.linkedin.com/" },
    { label: "Phone", value: "On request", href: "#" },
    { label: "Resume", value: "Download PDF", href: "#resume" },
  ];
  return (
    <section id="contact" className="border-t border-border/70 bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="text-xs uppercase tracking-[0.22em] text-background/60">Contact</p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.05] tracking-[-0.02em] sm:text-6xl">
              Let's design something that scales.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-background/70">
              Open to Senior, Lead and Staff Product Design roles across the UK and Europe. I reply to every enquiry personally.
            </p>
          </div>
          <div className="lg:col-span-6 lg:pl-12">
            <ul className="divide-y divide-background/15 border-y border-background/15">
              {items.map((i) => (
                <li key={i.label}>
                  <a
                    href={i.href}
                    className="group flex items-center justify-between gap-6 py-5 transition-colors hover:text-background"
                  >
                    <span className="text-xs uppercase tracking-[0.22em] text-background/60">
                      {i.label}
                    </span>
                    <span className="flex items-center gap-3 font-serif text-lg tracking-tight text-background/90 group-hover:text-background sm:text-xl">
                      {i.value}
                      <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-foreground text-background/70">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 border-t border-background/10 px-6 py-8 text-xs sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <p>© {new Date().getFullYear()} Anushree Dey. All rights reserved.</p>
        <ul className="flex items-center gap-6">
          <li><a href="https://www.linkedin.com/" className="hover:text-background">LinkedIn</a></li>
          <li><a href="#resume" className="hover:text-background">Resume</a></li>
          <li><a href="mailto:hello@anushreedey.com" className="hover:text-background">Email</a></li>
        </ul>
      </div>
    </footer>
  );
}
