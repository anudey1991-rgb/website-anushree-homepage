import { assetUrl } from "@/lib/asset-url";
import { Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { BackToProjects } from "@/components/BackToProjects";
import { ProjectCard } from "@/components/ProjectCard";
import { CaseStudyToc, CaseStudyJumpBar, useSectionNav, type TocSection } from "@/components/CaseStudyToc";
import type { Project } from "@/data/projects";

import formsShot from "@/assets/data-visualization/01-visualisation-forms.png.asset.json";
import journeyShot from "@/assets/data-visualization/02-user-journey.png.asset.json";
import timelineShot from "@/assets/data-visualization/03-design-timeline.png.asset.json";
import repoListShot from "@/assets/data-visualization/04-repository-list-mode.png.asset.json";
import repoPreviewShot from "@/assets/data-visualization/05-repository-preview-mode.png.asset.json";
import viewReportShot from "@/assets/data-visualization/08-view-report.png.asset.json";
import createChartShot from "@/assets/data-visualization/09-create-chart.png.asset.json";
import wizardShot from "@/assets/data-visualization/10-authoring-wizard.png.asset.json";
import authoringShot from "@/assets/data-visualization/11-authoring-space.png.asset.json";
import outlineShot from "@/assets/data-visualization/12-authoring-outline.png.asset.json";
import propertiesShot from "@/assets/data-visualization/13-outline-properties.png.asset.json";
import reports2024Shot from "@/assets/data-visualization/20-report-2024.png.asset.json";
import chart2024Shot from "@/assets/data-visualization/21-chart-2024.png.asset.json";
import dashboard2024Shot from "@/assets/data-visualization/22-dashboard-2024.png.asset.json";

const SECTIONS: readonly TocSection[] = [
  ["overview", "Overview"],
  ["problem", "The problem"],
  ["benchmark", "Benchmark and principles"],
  ["framework", "Interaction framework"],
  ["consume", "Consuming a report"],
  ["author", "Authoring a report"],
  ["modernisation", "The 2024 rebuild"],
  ["reflection", "What it set up"],
] as const;

export function DataVisualizationCaseStudy({
  project,
  recommendations,
}: {
  project: Project;
  recommendations: Project[];
}) {
  const { active, goTo } = useSectionNav(SECTIONS);

  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground font-sans antialiased">
      <SiteHeader />

      <main>
        <section className="mx-auto max-w-7xl px-6 pb-16 pt-14 lg:px-10 lg:pb-24 lg:pt-20">
          <BackToProjects />
          <p className="mt-12 text-xs uppercase tracking-[0.22em] text-muted-foreground">
            {project.category} · Reports and dashboards
          </p>
          <h1 className="mt-6 max-w-5xl font-serif text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.98] text-foreground">
            Reports and dashboards
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-2xl">
            The first generation of reporting inside Customer 360: an authoring tool for the people who understand the
            data model, and a consumption workspace for the business users who only need the answer. Built as an MVP,
            then rebuilt four years later on the modern design system.
          </p>
          <dl className="mt-14 grid gap-6 border-y border-border py-7 sm:grid-cols-2 lg:grid-cols-4">
            <Fact label="Role" value="Product Designer" />
            <Fact label="Platform" value="Informatica Customer 360" />
            <Fact label="Timeline" value="2020 – 2024" />
            <Fact label="Organization" value="Salesforce" />
          </dl>
          <ul className="mt-8 flex flex-wrap gap-2">
            {[
              "Data visualisation",
              "Authoring tool design",
              "Dual-persona architecture",
              "Competitive benchmarking",
              "Dashboard interaction design",
              "Design system evolution",
            ].map((tag) => (
              <li key={tag} className="rounded-full border border-border px-3.5 py-1.5 text-xs text-muted-foreground">
                {tag}
              </li>
            ))}
          </ul>
        </section>

        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Shot
            src={assetUrl(reports2024Shot)}
            alt="The reports workspace in Customer 360 listing tabular reports, charts and KPIs"
            caption="The reports workspace as it shipped in 2024: one repository holding tables, charts and KPIs, filtered by type and inspectable without leaving the list."
            priority
          />
        </div>

        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-12 lg:px-10 lg:py-28">
          <aside className="hidden lg:col-span-3 lg:block">
            <CaseStudyToc sections={SECTIONS} active={active} onSelect={goTo} />
          </aside>

          <div className="min-w-0 lg:col-span-9">
            <div className="lg:hidden">
              <CaseStudyJumpBar sections={SECTIONS} active={active} onSelect={goTo} />
            </div>

            <CaseSection id="overview" eyebrow="Overview" title="Master data that nobody could look at">
              <p>
                Customer 360 held the enterprise's cleanest, most reconciled data. What it did not hold was any way of
                seeing it. If a business user wanted to know how sales split across regions, or how many supplier
                records were still incomplete, the answer came from somebody else — an analyst, an export, a
                spreadsheet, a separate BI licence. The data was in the platform and the insight was outside it.
              </p>
              <p>
                This project closed that gap. I designed a reporting capability that lives inside the product: a
                repository of reports, an authoring space for building them out of the data model, charts generated
                through a plug-in visualisation engine, KPI metrics, scheduling, and a dashboard where all of it comes
                together. It shipped first as an MVP, and I came back to it in 2024 to rebuild the surface on the design
                system the rest of the platform had moved to.
              </p>
              <Quote>
                The platform already knew the answer. The work was making it possible to ask the question without
                leaving.
              </Quote>
              <Shot
                src={assetUrl(formsShot)}
                alt="Forms of visualisation explored for the reporting capability: charts, KPI metrics and dashboards"
                caption="The forms the capability had to cover — aggregated tables, chart visualisations, single-number KPIs, and dashboards that combine them."
              />
            </CaseSection>

            <CaseSection id="problem" eyebrow="The problem" title="Two people, one tool, completely different needs">
              <p>
                The hard part was never the charts. It was that the person who can define a report and the person who
                needs to read one are rarely the same person, and building for either alone breaks the other.
              </p>
              <div className="mt-8 grid gap-px border-y border-border bg-border sm:grid-cols-2">
                <Insight
                  title="Business users can't model data"
                  body="They know the question — sales by geography, incomplete records by source — but not which entity holds it, which field is the measure, or how a dimension differs from an attribute. Hand them a modelling tool and they stop."
                />
                <Insight
                  title="Technical users aren't the audience"
                  body="Data stewards and technical users understand the model, but they are not the ones consuming the report every morning. Designing only for them turns reporting into a ticket queue."
                />
                <Insight
                  title="Insight lived outside the platform"
                  body="Exports into external BI tools meant the numbers drifted from the mastered record, and the governance work done inside Customer 360 stopped at the boundary."
                />
                <Insight
                  title="No shared surface to act on"
                  body="Even when a report existed, there was nowhere to keep it in view, share it, or have it arrive on a schedule. Insight that has to be re-fetched is insight nobody uses."
                />
              </div>
              <p>
                So the architecture had to be split rather than simplified: technical users define the dataset
                boundaries and assign what counts as a dimension and what counts as a measure; business users then
                compose, view and schedule reports inside that boundary without ever touching the model.
              </p>
            </CaseSection>

            <CaseSection id="benchmark" eyebrow="Benchmark and principles" title="Borrowing from Tableau, but not its scope">
              <p>
                I benchmarked against the two tools our users were already living in — Tableau, as the pure
                visualisation reference, and the Salesforce Lightning Report Builder, as the reference for reporting
                embedded inside a business application. They pull in opposite directions, and that contrast set the
                principles.
              </p>
              <div className="mt-8 grid gap-px border-y border-border bg-border sm:grid-cols-2">
                <Insight
                  title="Tableau — expressive, expensive to learn"
                  body="Drag-and-drop composition over a prepared dataset, with a deep vocabulary of marks and shelves. Powerful, but it assumes the user has been trained and that data preparation happened elsewhere."
                />
                <Insight
                  title="Lightning Report Builder — contextual, constrained"
                  body="Reporting attached to the objects the user already works with, built on a wizard and a preview. Less expressive, but a business user can finish a report on their own."
                />
              </div>
              <p>The principles I took out of that comparison and held to throughout:</p>
              <ul className="mt-6 space-y-0">
                <Bullet>
                  Composition happens inside a boundary someone else set. Freedom within a governed dataset, not freedom
                  over the model.
                </Bullet>
                <Bullet>
                  Preview constantly, at a sample. A report you cannot see forming is a report you build twice.
                </Bullet>
                <Bullet>
                  Visualisation is a plug-in concern, not a product concern. Charting is a solved problem; the
                  integration and the surrounding workflow are not.
                </Bullet>
                <Bullet>
                  Reading is the common case. The consumption experience gets the same design attention as authoring,
                  not the leftovers.
                </Bullet>
              </ul>
            </CaseSection>

            <CaseSection id="framework" eyebrow="Interaction framework" title="Mapping who can do what, before drawing anything">
              <p>
                Before any screens, I mapped the journey as a matrix: the four stages a report passes through —
                repository, authoring, scheduling, dashboard — against the two permission states a user arrives with,
                view only and view and edit. It is a dull artefact and it saved the project a great deal of argument,
                because it made visible which surfaces needed two versions and which needed one.
              </p>
              <Shot
                src={assetUrl(journeyShot)}
                alt="The user journey and interaction matrix across repository, authoring, scheduling and dashboard stages"
                caption="The journey and permission matrix. Every stage was specified for both a view-only user and a user who can edit, so the same screen degrades predictably rather than hiding itself."
              />
              <p>
                This is also where the dual-persona split became concrete. Technical users appear at one end, defining
                datasets and declaring dimensions and measures. Business users occupy the rest of the journey, and never
                need to know that the first end exists.
              </p>
            </CaseSection>

            <CaseSection id="consume" eyebrow="Consuming a report" title="The repository, and reading without leaving it">
              <p>
                The repository is the front door, and it is the surface most users only ever see. It lists every report
                in the tenant with its type, owner, data source and freshness — including a clear state for reports that
                have never been run, because a stale number is worse than an absent one.
              </p>
              <Shot
                src={assetUrl(repoListShot)}
                alt="The reports repository in list mode, with filtering, search, pagination and a report type selector"
                caption="List mode: filter by report type, search, sort by last updated, and see at a glance which reports have never run."
              />
              <p>
                The repository has a second mode. Rather than forcing a user to open a report, lose the list, and come
                back, a split pane lets them keep the list on the left and inspect a report on the right — its
                aggregate, its details, its schedule.
              </p>
              <Shot
                src={assetUrl(repoPreviewShot)}
                alt="The reports repository in split-pane preview mode with a report summary open alongside the list"
                caption="Preview mode: the list stays put while a report is inspected beside it. Scanning ten reports stops being ten round trips."
              />
              <p>
                Opening a report fully gives the aggregated table alongside everything a user needs to trust and reuse
                it: its schedule, its definition, its author, the charts derived from it, and the dashboard pages it
                appears on. That last part matters more than it looks — it is how a report stops being an orphan file
                and becomes part of a connected reporting layer.
              </p>
              <Shot
                src={assetUrl(viewReportShot)}
                alt="A report open in view mode with aggregated data, schedule, report details, related charts and pages"
                caption="Viewing a report: the aggregate on the left, and on the right the provenance — schedule, definition, related charts, and the pages it feeds."
              />
              <p>
                Charts are generated from a saved report rather than authored separately, using a third-party
                visualisation plug-in. Deliberately so: the value we could add was in the data boundary and the
                workflow, not in re-implementing a charting library.
              </p>
              <Shot
                src={assetUrl(createChartShot)}
                alt="Creating a chart from an existing report, with the chart panel open beside the report table"
                caption="Chart creation opens as a panel beside the report it is derived from, so the underlying numbers stay in view while the visualisation is configured."
              />
            </CaseSection>

            <CaseSection id="author" eyebrow="Authoring a report" title="Authoring a report">
              <p>
                Authoring belongs to the technical user, and I split it into two moments. A short wizard establishes the
                identity and scope of the report: its name, whether it covers one business entity or several, and the data
                source it draws from. These are decisions that are expensive to change later, so they are made once, up
                front.
              </p>
              <Shot
                src={assetUrl(wizardShot)}
                alt="The two-step report creation wizard: choosing the report asset type, then naming it and setting its scope and data source"
                caption="Initiating a report: choose the asset type, then set the name, scope and data source. Two steps, nothing else asked."
              />
              <p>
                Everything after that happens on the authoring canvas. The outline panel on the left is where dimensions,
                measures and filters are selected, and the report table on the right fills in as they are added. The
                toolbar starts disabled and enables each action as it becomes possible: undo, create chart, save and
                preview.
              </p>
              <Shot
                src={assetUrl(authoringShot)}
                alt="The report authoring space with an outline panel for dimensions, measures and filters beside an empty report table"
                caption="The authoring space at the start: outline on the left, canvas on the right, and a toolbar that only offers an action once there is something to act on."
              />
              <p>
                The preview runs against a sample of one hundred aggregated records, and the interface says so. At master
                data volumes a sample that returns immediately keeps the author iterating, where a complete result would
                have them waiting.
              </p>
              <Shot
                src={assetUrl(outlineShot)}
                alt="Selecting dimensions from the outline panel, and the resulting aggregated report preview"
                caption="Dimensions and measures are picked from the entity tree, and the table on the right updates against the sample as they are added."
              />
              <p>
                Each selected attribute carries its own properties. A measure declares its aggregation: sum, count,
                distinct count or average. Filters take their control from the type of field they are placed on. A date
                range gets a pair of date pickers, a text field gets a searchable list, a numeric field gets a minimum and
                a maximum, and an enumeration gets its own options. The author does not write conditions, and the report
                cannot express something the data model does not support.
              </p>
              <Shot
                src={assetUrl(propertiesShot)}
                alt="Outline properties: aggregation options on a measure, and filter controls that vary by field type"
                caption="Properties per attribute: aggregation on measures, and filters that follow the field's own type instead of a generic condition builder."
              />
              <p>
                Scheduling closes the loop. A saved report can be run on a cadence and delivered as an automated digest, so
                the report arrives instead of having to be visited.
              </p>
            </CaseSection>

            <CaseSection id="modernisation" eyebrow="The 2024 rebuild" title="Rebuilding on the current design system">
              <p>
                By 2024 the capability was doing real work and showing its age. The rest of Customer 360 had moved onto the
                current design system and reporting had not, so I took the surface through a rebuild. The capability stayed
                the same. Four things changed.
              </p>
              <Shot
                src={assetUrl(timelineShot)}
                alt="The design timeline of the reporting capability from the first generation through the 2024 modernisation"
                caption="The design timeline, from the first generation of authoring and consumption through to the 2024 rebuild."
              />
              <div className="mt-8 divide-y divide-border border-y border-border">
                <Step
                  when="Layout"
                  title="A balanced page with a clear action hierarchy"
                  body="The first version put every control in one toolbar. The rebuild separates page-level actions from the actions that belong to the thing the user is looking at, so it is clear what a button will affect before pressing it."
                />
                <Step
                  when="Action bars"
                  title="Scoped to the feature they act on"
                  body="Each region carries its own bar. Report actions sit with the report and list actions sit with the list, so the page header stops collecting everything."
                />
                <Step
                  when="Components"
                  title="Shared platform components"
                  body="Tables, filters, panels and empty states now come from the shared library instead of being local to reporting, so the capability inherits platform improvements."
                />
                <Step
                  when="Density"
                  title="Spacing and density tuned for data"
                  body="The generic component spacing did not hold up against enterprise row counts. Working with the design systems team on density is what let a modern surface still show the number of records a user needs on screen."
                />
              </div>
              <p>
                The density problem was not limited to this project. The same gap showed up in the Customer 360 record
                experience, and the work here fed into the component overhaul I led as design system subject matter expert.
              </p>
              <Shot
                src={assetUrl(chart2024Shot)}
                alt="A chart report in the rebuilt 2024 interface"
                caption="A chart in the rebuilt interface: modern components, and enough density left for the underlying table to remain legible beside it."
              />
              <Shot
                src={assetUrl(dashboard2024Shot)}
                alt="The dashboard in the rebuilt 2024 interface combining reports, charts and KPI metrics"
                caption="The dashboard: tables, charts and KPI metrics composed on one page, which is where the capability finally reads as a reporting layer rather than a list of reports."
              />
            </CaseSection>

            <CaseSection id="reflection" eyebrow="Reflection" title="What I took from this project">
              <p>
                This was the first piece of Customer 360 work where the question was not how to steward a record, but what
                to do with the data once it was clean. A few things from it carried into later projects:
              </p>
              <ul className="mt-6 space-y-0">
                <Bullet>
                  A governed dataset boundary works better than open-ended freedom. The technical user defines the
                  boundary, and the business user composes inside it.
                </Bullet>
                <Bullet>
                  Previewing against a sample keeps an author moving. A complete result they have to wait for does not.
                </Bullet>
                <Bullet>
                  In a product with two very different users, the split is best handled through permissions rather than
                  through two separate products.
                </Bullet>
                <Bullet>
                  This is also where I first saw that our component system could not carry enterprise data density, which
                  I picked up properly a few years later with the design systems team.
                </Bullet>
              </ul>
            </CaseSection>
          </div>
        </div>

        <section className="border-t border-border bg-secondary/40">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  More in {project.category}
                </p>
                <h2 className="mt-4 font-serif text-4xl sm:text-5xl">Continue exploring</h2>
              </div>
              <Link to="/" hash="portfolio" className="hidden text-sm text-muted-foreground hover:text-foreground sm:block">
                View all projects →
              </Link>
            </div>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {recommendations.map((item) => (
                <ProjectCard key={item.slug} project={item} />
              ))}
            </div>
          </div>
        </section>
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
              rel="noopener noreferrer"
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
      <dd className="mt-2 font-serif text-xl">{value}</dd>
    </div>
  );
}

function CaseSection({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-border py-16 first:border-t-0 first:pt-8 lg:py-24">
      <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{eyebrow}</p>
      <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.08] sm:text-5xl">{title}</h2>
      <div className="mt-8 max-w-3xl space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
        {children}
      </div>
    </section>
  );
}

function Quote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-10 border-l-2 border-foreground pl-7 font-serif text-2xl leading-snug text-foreground sm:text-3xl">
      “{children}”
    </blockquote>
  );
}

function Insight({ title, body }: { title: string; body: string }) {
  return (
    <div className="bg-card p-6">
      <h3 className="font-serif text-xl text-foreground">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed">{body}</p>
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return <li className="border-t border-border pt-4 text-base leading-relaxed">{children}</li>;
}

function Step({ when, title, body }: { when: string; title: string; body: string }) {
  return (
    <div className="grid gap-3 py-6 sm:grid-cols-[190px_1fr] sm:gap-8">
      <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{when}</p>
      <div>
        <h3 className="font-medium text-foreground">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed">{body}</p>
      </div>
    </div>
  );
}

/**
 * Product screenshot. Screens are wide and detail-dense, so they are never
 * cropped: the image scales to the full content width at its own aspect ratio.
 */
function Shot({
  src,
  alt,
  caption,
  priority = false,
}: {
  src: string;
  alt: string;
  caption: string;
  priority?: boolean;
}) {
  return (
    <figure className="my-10">
      <div className="overflow-hidden rounded-sm border border-border bg-secondary">
        <img src={src} alt={alt} loading={priority ? "eager" : "lazy"} className="block h-auto w-full" />
      </div>
      <figcaption className="mt-3 text-xs leading-relaxed text-muted-foreground">{caption}</figcaption>
    </figure>
  );
}
