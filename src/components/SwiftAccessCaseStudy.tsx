import { assetUrl } from "@/lib/asset-url";
import { Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { BackToProjects } from "@/components/BackToProjects";
import { ProjectCard } from "@/components/ProjectCard";
import {
  CaseStudyToc,
  CaseStudyJumpBar,
  useSectionNav,
  type TocSection,
} from "@/components/CaseStudyToc";
import type { Project } from "@/data/projects";

import beforeShot from "@/assets/swiftaccess/01-mdm-homepage-before.png.asset.json";
import gridShot from "@/assets/swiftaccess/02-swiftaccess-grid.png.asset.json";
import widget1x1 from "@/assets/swiftaccess/03-widget-1x1.png.asset.json";
import widget1x2a from "@/assets/swiftaccess/04-widget-1x2a.png.asset.json";
import widget1x2b from "@/assets/swiftaccess/05-widget-1x2b.png.asset.json";
import widget2x2 from "@/assets/swiftaccess/06-widget-2x2.png.asset.json";
import craft01 from "@/assets/swiftaccess/10-craft-01.png.asset.json";
import craft02 from "@/assets/swiftaccess/10-craft-02.png.asset.json";
import craft03 from "@/assets/swiftaccess/10-craft-03.png.asset.json";
import craft04 from "@/assets/swiftaccess/10-craft-04.png.asset.json";
import craft05 from "@/assets/swiftaccess/10-craft-05.png.asset.json";
import craft06 from "@/assets/swiftaccess/10-craft-06.png.asset.json";
import craft07 from "@/assets/swiftaccess/10-craft-07.png.asset.json";
import craft08 from "@/assets/swiftaccess/10-craft-08.png.asset.json";
import craft09 from "@/assets/swiftaccess/10-craft-09.png.asset.json";
import craft10 from "@/assets/swiftaccess/10-craft-10.png.asset.json";
import pin01 from "@/assets/swiftaccess/20-pin-01.png.asset.json";
import pin02 from "@/assets/swiftaccess/20-pin-02.png.asset.json";
import pin03 from "@/assets/swiftaccess/20-pin-03.png.asset.json";
import pin04 from "@/assets/swiftaccess/20-pin-04.png.asset.json";
import pin05 from "@/assets/swiftaccess/20-pin-05.png.asset.json";

const SECTIONS: readonly TocSection[] = [
  ["overview", "Overview"],
  ["problem", "The problem"],
  ["solution", "The proposition"],
  ["ai", "Role of generative AI"],
  ["widgets", "The widget system"],
  ["craft", "Crafting a page"],
  ["pin", "Pinning from anywhere"],
  ["impact", "Business impact"],
] as const;

export function SwiftAccessCaseStudy({
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
            {project.category} · Platform personalisation
          </p>
          <h1 className="mt-6 max-w-5xl font-serif text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.98] text-foreground">
            SwiftAccess
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-2xl">
            A personalised access page for the Informatica Intelligent Data Management Cloud. It
            gives enterprise users direct access to the assets and activities they work on, and lets
            them prioritise what they need to monitor, without changing the navigation of any
            product.
          </p>
          <dl className="mt-14 grid gap-6 border-y border-border py-7 sm:grid-cols-2 lg:grid-cols-4">
            <Fact label="Role" value="Product Designer" />
            <Fact label="Platform" value="Informatica IDMC" />
            <Fact label="Timeline" value="2024" />
            <Fact label="Organization" value="Salesforce" />
          </dl>
          <ul className="mt-8 flex flex-wrap gap-2">
            {[
              "Platform personalisation",
              "Conversational onboarding",
              "Modular widget system",
              "Cross-product strategy",
              "Discovery and research",
              "Usability testing",
            ].map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-border px-3.5 py-1.5 text-xs text-muted-foreground"
              >
                {tag}
              </li>
            ))}
          </ul>
        </section>

        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Shot
            src={assetUrl(craft01)}
            alt="The SwiftAccess page populated with pinned asset, application and activity widgets"
            caption="SwiftAccess: a grid of pinned widgets that puts a user's own assets, applications and monitored activities on the first screen they see."
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

            <CaseSection
              id="overview"
              eyebrow="Overview"
              title="Personalisation for the Informatica data management cloud"
            >
              <p>
                The Intelligent Data Management Cloud is a broad and capable platform, but it has no
                personalisation for the users working in it. Every user of every product lands on
                the same experience, whatever their role, their tenure, or what they were working on
                the day before.
              </p>
              <p>
                SwiftAccess is a per-user page, generated through a short conversation, that
                surfaces the specific assets, applications and activities a person works with, and
                lets them pin more from anywhere in the suite.
              </p>
            </CaseSection>

            <CaseSection id="problem" eyebrow="The problem" title="The problem space">
              <div className="mt-8 grid gap-px border-y border-border bg-border sm:grid-cols-2">
                <Insight
                  title="No mechanism to prioritise tasks"
                  body="There is no way for a user to mark what matters to them. Everything is equally available, so nothing is prioritised."
                />
                <Insight
                  title="Navigating to assets and activities is a struggle"
                  body="Reaching a specific asset or activity means remembering where it lives across a suite of products, then walking the tree to get there."
                />
                <Insight
                  title="Steep learning curve"
                  body="The products are deep, and new users have a lot to learn before the platform starts working for them."
                />
                <Insight
                  title="Users are expected to figure it out"
                  body="There is little help available at the moment of need, so users are left to work the application out with very little support."
                />
              </div>
              <Shot
                src={assetUrl(beforeShot)}
                alt="A master data management application homepage before SwiftAccess"
                caption="The starting point: a capable application homepage that is identical for every user, with nothing on it that belongs to the person looking at it."
              />
            </CaseSection>

            <CaseSection id="solution" eyebrow="The solution" title="A personalised access page">
              <p>
                SwiftAccess is a personalised access page through which users reach their own assets
                and artefacts and prioritise the actions in front of them. The constraint I set was
                that it must not require changes to the navigation of any existing application,
                because a proposal that asks every product team to re-architect will not get
                adopted.
              </p>
              <p>Adopted across the suite, SwiftAccess would:</p>
              <ul className="mt-6 space-y-0">
                <Bullet>
                  Offer a consistent user experience across the products, minimising the learning
                  curve.
                </Bullet>
                <Bullet>
                  Give targeted access to assets without changing the navigation of the
                  applications.
                </Bullet>
                <Bullet>Let users prioritise the tasks they need to monitor frequently.</Bullet>
              </ul>
              <Shot
                src={assetUrl(gridShot)}
                alt="The SwiftAccess grid structure showing widget slots"
                caption="The underlying structure: a grid that widgets occupy, sized by what they need to show rather than by a fixed card shape."
              />
            </CaseSection>

            <CaseSection id="ai" eyebrow="How SwiftAccess works" title="Role of generative AI">
              <p>
                Instead of a preferences panel, the page is generated from a short conversation the
                first time a user arrives.
              </p>
              <div className="mt-8 divide-y divide-border border-y border-border">
                <Step
                  when="Three questions"
                  title="Assets, applications and activities"
                  body="Three conversational questions establish which assets this person works with, which applications they use, and which activities they need to keep monitoring. Each answer pins the corresponding widgets to the page as it is given."
                />
                <Step
                  when="Opt-in"
                  title="Resources and promotional content"
                  body="A further question asks whether the user wants learning material and information about other products in the suite. It is an opt-in, so promotional content is never placed on the page without being asked for."
                />
                <Step
                  when="Placement"
                  title="Dynamic layout on the grid"
                  body="The pinned widgets are placed dynamically across the four by four grid so there are no empty pockets, whatever combination of answers the user gives."
                />
              </div>
            </CaseSection>

            <CaseSection
              id="widgets"
              eyebrow="The widget system"
              title="Role of product development"
            >
              <p>
                For this to be adoptable, product teams could not be asked to design and build
                custom front ends. Each asset, application or activity is tokenised into one of a
                small set of widget variations, and the composition is handled by the platform. A
                product team's job is to tokenise its assets, which is what keeps the development
                effort realistic across a suite this size.
              </p>
              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                <Shot
                  src={assetUrl(widget1x1)}
                  alt="The one-by-one widget variant"
                  caption="1 × 1: a single compact unit, for direct access with minimal supporting detail."
                />
                <Shot
                  src={assetUrl(widget1x2a)}
                  alt="The first one-by-two widget variant"
                  caption="1 × 2a: a wider unit for an asset that needs a line of context alongside its name."
                />
                <Shot
                  src={assetUrl(widget1x2b)}
                  alt="The second one-by-two widget variant"
                  caption="1 × 2b: the same footprint arranged for list content instead of a summary."
                />
                <Shot
                  src={assetUrl(widget2x2)}
                  alt="The two-by-two widget variant"
                  caption="2 × 2: the full block, for monitored activities where a user needs status and not just a link."
                />
              </div>
            </CaseSection>

            <CaseSection
              id="craft"
              eyebrow="Crafting a page"
              title="Craft a SwiftAccess page using GenAI"
            >
              <p>
                The full flow for a first-time user. The page stays visible throughout and fills in
                as the conversation proceeds, so the user can see what their answers are producing.
              </p>
              <Shot
                src={assetUrl(craft01)}
                alt="Step one of crafting a SwiftAccess page"
                caption="The conversation opens with the empty page on screen."
              />
              <Shot
                src={assetUrl(craft02)}
                alt="Step two of crafting a SwiftAccess page"
                caption="The first question establishes which assets this user works with."
              />
              <Shot
                src={assetUrl(craft03)}
                alt="Step three of crafting a SwiftAccess page"
                caption="Each answer pins its widgets immediately, without waiting for the end of the flow."
              />
              <Shot
                src={assetUrl(craft04)}
                alt="Step four of crafting a SwiftAccess page"
                caption="The second question covers applications, keeping one decision per question."
              />
              <Shot
                src={assetUrl(craft05)}
                alt="Step five of crafting a SwiftAccess page"
                caption="The grid reflows as widgets arrive, filling logically instead of leaving empty pockets."
              />
              <Shot
                src={assetUrl(craft06)}
                alt="Step six of crafting a SwiftAccess page"
                caption="The third question covers activities: the things this user needs to keep monitoring."
              />
              <Shot
                src={assetUrl(craft07)}
                alt="Step seven of crafting a SwiftAccess page"
                caption="Monitored activities take the larger widget footprint, because status needs more room than a link."
              />
              <Shot
                src={assetUrl(craft08)}
                alt="Step eight of crafting a SwiftAccess page"
                caption="The resources question, asked as an opt-in rather than applied by default."
              />
              <Shot
                src={assetUrl(craft09)}
                alt="Step nine of crafting a SwiftAccess page"
                caption="The page approaching its final composition."
              />
              <Shot
                src={assetUrl(craft10)}
                alt="The completed SwiftAccess page"
                caption="The finished page: the user's own assets, applications and monitored activities on the first screen they land on."
              />
            </CaseSection>

            <CaseSection
              id="pin"
              eyebrow="Pinning from anywhere"
              title="Pin My Jobs to a SwiftAccess page"
            >
              <p>
                A page built once and never updated stops being useful. Pinning is available from
                inside the products themselves, so a user working in a jobs list can pin it to
                SwiftAccess in place, without navigating away or opening a settings screen. This is
                how the page keeps up as someone's responsibilities change.
              </p>
              <Shot
                src={assetUrl(pin01)}
                alt="Starting to pin a jobs view to SwiftAccess"
                caption="Pinning starts inside the product the user is already working in."
              />
              <Shot
                src={assetUrl(pin02)}
                alt="Choosing what to pin from the jobs view"
                caption="The user chooses what to pin without leaving their current context."
              />
              <Shot
                src={assetUrl(pin03)}
                alt="Confirming the pin action"
                caption="The pin is confirmed explicitly, because it changes a page the user sees every day."
              />
              <Shot
                src={assetUrl(pin04)}
                alt="The pinned widget appearing on the SwiftAccess page"
                caption="The new widget takes its place in the grid, sized by what it needs to display."
              />
              <Shot
                src={assetUrl(pin05)}
                alt="The updated SwiftAccess page including the newly pinned jobs widget"
                caption="The updated page, maintained through normal work rather than through a configuration screen."
              />
            </CaseSection>

            <CaseSection id="impact" eyebrow="Business impact" title="Business impact">
              <p>
                The case for SwiftAccess was made on four points, and only the first one is about
                experience quality.
              </p>
              <div className="mt-10 grid gap-px border-y border-border bg-border sm:grid-cols-2">
                <Insight
                  title="Competitive advantage"
                  body="Faster access to assets and activities, and the ability to prioritise them, improves the performance and the experience that customers compare vendors on."
                />
                <Insight
                  title="Reduced development effort"
                  body="Because assets are tokenised into widget variations and the composition is generated, a product team does not build a custom front end to adopt the capability. Development and maintenance effort both drop."
                />
                <Insight
                  title="Customer retention"
                  body="A platform that adapts as the enterprise changes stays relevant to the people using it, and monitored activities surface problems early enough to act on."
                />
                <Insight
                  title="IPU consumption"
                  body="Informatica Processing Units are how consumption is measured and billed. Surfacing the right assets and the opt-in resources for other products in the suite drives usage across the platform, which drives IPU consumption."
                />
              </div>
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
              <Link
                to="/"
                hash="portfolio"
                className="hidden text-sm text-muted-foreground hover:text-foreground sm:block"
              >
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
    <section
      id={id}
      className="scroll-mt-28 border-t border-border py-16 first:border-t-0 first:pt-8 lg:py-24"
    >
      <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{eyebrow}</p>
      <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.08] sm:text-5xl">{title}</h2>
      <div className="mt-8 max-w-3xl space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
        {children}
      </div>
    </section>
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
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          className="block h-auto w-full"
        />
      </div>
      <figcaption className="mt-3 text-xs leading-relaxed text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  );
}
