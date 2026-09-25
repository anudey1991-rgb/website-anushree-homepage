import { Link } from "@tanstack/react-router";
import logoMark from "@/assets/anushree-logo.png";
import architectureAsset from "@/assets/survivorship/01-agent-architecture-flow.png.asset.json";
import experienceAsset from "@/assets/survivorship/02-event-based-experience-flow.png.asset.json";
import digestAsset from "@/assets/survivorship/03-slack-batch-digest.png.asset.json";
import criticalAsset from "@/assets/survivorship/04-slack-finding-card-critical.png.asset.json";
import selectionAsset from "@/assets/survivorship/05-slack-finding-card-post-selection.png.asset.json";
import transitionAsset from "@/assets/survivorship/06-transition-screen.png.asset.json";
import consoleAsset from "@/assets/survivorship/07-mdm-console-claire-panel.png.asset.json";
import findingsAsset from "@/assets/survivorship/08-claire-finding-cards.png.asset.json";
import popoverAsset from "@/assets/survivorship/09-field-popover.png.asset.json";
import evidenceAsset from "@/assets/survivorship/10-evidence-trail.png.asset.json";
import confirmationAsset from "@/assets/survivorship/11-post-decision-confirmation.png.asset.json";
import resolutionAsset from "@/assets/survivorship/12-post-resolution-record.png.asset.json";
import type { Project } from "@/data/projects";

const sections = [
  ["overview", "Overview"],
  ["problem", "The problem"],
  ["strategy", "Experience strategy"],
  ["journey", "The experience"],
  ["system", "System thinking"],
  ["outcome", "Outcome"],
] as const;

export function SurvivorshipCaseStudy({ project, recommendations }: { project: Project; recommendations: Project[] }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground font-sans antialiased">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
          <Link to="/" className="flex items-center gap-3" aria-label="Anushree Dey home">
            <img src={logoMark} alt="" aria-hidden className="h-9 w-9 object-contain" />
            <span className="text-sm font-medium">Anushree Dey</span>
          </Link>
          <Link to="/" hash="portfolio" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <span aria-hidden>←</span> All projects
          </Link>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-7xl px-6 pb-16 pt-14 lg:px-10 lg:pb-24 lg:pt-20">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{project.category} · Agentic experience</p>
          <h1 className="mt-6 max-w-5xl font-serif text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.98] text-foreground">
            Agent-Verified<br />Data Survivorship
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-2xl">
            A Slack-first copilot that stress-tests master data decisions against external evidence before incorrect data reaches downstream systems.
          </p>
          <dl className="mt-14 grid gap-6 border-y border-border py-7 sm:grid-cols-2 lg:grid-cols-4">
            <Fact label="Role" value="Lead Product Designer" />
            <Fact label="Domain" value="Enterprise MDM" />
            <Fact label="Timeline" value="2024, 2025" />
            <Fact label="Deliverable" value="End-to-end prototype" />
          </dl>
        </section>

        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Figure src={architectureAsset.url} alt="Architecture showing the copilot between survivorship and publishing" caption="The agent sits after deterministic survivorship and before publish, checking only for meaningful contradictions." priority />
        </div>

        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-12 lg:px-10 lg:py-28">
          <aside className="hidden lg:col-span-3 lg:block">
            <nav aria-label="Case study contents" className="sticky top-28 border-l border-border pl-5">
              <p className="mb-5 text-xs uppercase tracking-[0.2em] text-muted-foreground">In this case study</p>
              <ol className="space-y-3">
                {sections.map(([id, label], index) => (
                  <li key={id}><a href={`#${id}`} className="text-sm text-muted-foreground transition-colors hover:text-foreground"><span className="mr-3 tabular-nums">0{index + 1}</span>{label}</a></li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="min-w-0 lg:col-span-9">
            <CaseSection id="overview" eyebrow="Overview" title="Making invisible data decisions visible at the right moment">
              <p>Master data decisions happen across CRM, ERP, collaboration tools and partner surfaces, not only inside an MDM console. Existing survivorship rules select a winning value, but they cannot always recognise when that value conflicts with current external reality.</p>
              <p>I designed a copilot that adds an evidence-backed verification gate without replacing deterministic rules or taking accountability away from the data steward. It remains silent when the data is sound and intervenes only when there is a material contradiction.</p>
              <Quote>The agent presents evidence. The steward makes the call.</Quote>
            </CaseSection>

            <CaseSection id="problem" eyebrow="The problem" title="Clean at ingest does not mean correct forever">
              <p>A company can change legal status, a certification can expire and a medical device can be reclassified. These changes happen outside the MDM system, leaving records apparently valid while their real-world truth has moved on.</p>
              <div className="mt-10 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-3">
                <Insight number="01" title="Rules have limits" body="Survivorship can select the trusted source and still choose a stale value." />
                <Insight number="02" title="Attention is scarce" body="Most records need no intervention, so the agent must earn every interruption." />
                <Insight number="03" title="Trust needs evidence" body="High-impact changes require provenance, consequences and a human decision." />
              </div>
            </CaseSection>

            <CaseSection id="strategy" eyebrow="Experience strategy" title="Restrained first touch, rich second layer">
              <p>The experience uses progressive disclosure to protect the steward’s attention. The first touch communicates what changed, its severity and one clear action. Deeper reasoning appears only when the steward asks for it.</p>
              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                <Principle label="01" title="Silent by default">When no contradiction exists, the agent disappears. Automation is felt as less work, not more interface.</Principle>
                <Principle label="02" title="Evidence before action">Every proposal pairs the current value with an authoritative source, confidence and recency.</Principle>
                <Principle label="03" title="Resolve where work happens">Slack supports rapid decisions. The MDM console remains available for deeper investigation.</Principle>
                <Principle label="04" title="Accountability stays human">The system explains consequences before a steward accepts, modifies or rejects a change.</Principle>
              </div>
              <Figure src={experienceAsset.url} alt="Event-based experience flow from record batch to resolution" caption="In the prototype scenario, 174 of 180 records publish silently while six are held for focused review." />
            </CaseSection>

            <CaseSection id="journey" eyebrow="The experience" title="One connected journey across Slack and the MDM console">
              <JourneyStep number="01" title="Start with the shape of the work" body="A morning digest summarises the processed batch, what was resolved automatically and what needs a human decision. Estimated review time makes the queue predictable.">
                <Figure src={digestAsset.url} alt="Slack morning digest summarising the survivorship review queue" caption="One message, three numbers and one action keep the first touch deliberately restrained." />
              </JourneyStep>
              <JourneyStep number="02" title="Turn a warning into an informed choice" body="Each finding compares the survivorship result and agent evidence side by side. Provenance, confidence and downstream impact appear before the decision controls.">
                <div className="grid gap-6 sm:grid-cols-2">
                  <Figure src={criticalAsset.url} alt="Critical Slack finding with survivorship and external evidence" caption="The critical finding state." contain />
                  <Figure src={selectionAsset.url} alt="Slack finding after the steward selects an action" caption="An explicit receipt confirms the selected value and audit state." contain />
                </div>
              </JourneyStep>
              <JourneyStep number="03" title="Make system handoffs legible" body="When deeper investigation is needed, a transition state explains the move from Slack to Customer 360 and shows which external sources are being checked.">
                <Figure src={transitionAsset.url} alt="Transition screen between Slack and Customer 360" caption="The wait is grounded in actual verification work rather than a generic loading indicator." />
              </JourneyStep>
              <JourneyStep number="04" title="Preserve context during investigation" body="The record remains visible while the copilot presents findings in a right-hand panel. A field-level popover reuses the same evidence model for direct editing.">
                <Figure src={consoleAsset.url} alt="Customer 360 record with the copilot panel open" caption="The copilot is additive: the core record view remains undisturbed." />
                <div className="grid gap-6 sm:grid-cols-2">
                  <Figure src={findingsAsset.url} alt="Stacked finding cards in the copilot panel" caption="Related contradictions can be reviewed together." contain />
                  <Figure src={popoverAsset.url} alt="Field-level copilot recommendation popover" caption="The same decision model adapts to field-level editing." contain />
                </div>
              </JourneyStep>
              <JourneyStep number="05" title="Close the accountability loop" body="The evidence trail is expandable on demand. After the decision, the interface confirms the update and leaves a persistent provenance signal on the record.">
                <div className="grid gap-6 sm:grid-cols-2">
                  <Figure src={evidenceAsset.url} alt="Expanded external evidence trail" caption="Full provenance is available without permanent density." contain />
                  <Figure src={confirmationAsset.url} alt="Confirmation after a steward decision" caption="The receipt separates the decision from asynchronous system updates." contain />
                </div>
                <Figure src={resolutionAsset.url} alt="Updated record showing persistent agent provenance" caption="The corrected value remains visibly attributable to an agent proposal and steward approval." />
              </JourneyStep>
            </CaseSection>

            <CaseSection id="system" eyebrow="System thinking" title="Two modes cover both active and dormant records">
              <p>The design separates deterministic processing from agent reasoning. An Ingress Sentinel verifies records when lifecycle events occur. A Temporal Watchdog responds to external feeds and scheduled checks so dormant records do not remain wrong indefinitely.</p>
              <div className="mt-10 divide-y divide-border border-y border-border">
                <SystemRow title="Event-driven" value="Real time" body="Checks records during ingest, merge, edit and publish. This is the lowest-cost default." />
                <SystemRow title="Feed-driven" value="Targeted" body="Responds when a registry or regulation changes, checking only affected record groups." />
                <SystemRow title="Scheduled sweep" value="Safety net" body="Reviews dormant, risk-sensitive records on a configurable cadence." />
              </div>
              <h3 className="mt-14 font-serif text-3xl text-foreground">A portable interaction language</h3>
              <p className="mt-5">Six reusable patterns keep agent behaviour consistent across Slack, CRM and the MDM console: confidence, provenance, severity, draft state, agent attribution and the notification card.</p>
            </CaseSection>

            <CaseSection id="outcome" eyebrow="Prototype outcome" title="Fewer interruptions, faster evidence-backed decisions">
              <p>The prototype demonstrates how the system could preserve high automation while introducing a safety gate for consequential exceptions. Targets are design hypotheses for validation, not production results.</p>
              <dl className="mt-10 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-3">
                <Metric value="174 / 180" label="Scenario records published silently" />
                <Metric value="6" label="Scenario records held for review" />
                <Metric value="< 60 sec" label="Target resolution time per field" />
              </dl>
              <div className="mt-12 border-l-2 border-foreground pl-7">
                <h3 className="font-serif text-2xl">What I would validate next</h3>
                <p className="mt-4">I would test whether stewards understand why the agent interrupted them, can compare competing evidence without anchoring bias, and can distinguish a completed decision from a queued system update. I would also measure false-positive tolerance before tuning severity and notification thresholds.</p>
              </div>
            </CaseSection>
          </div>
        </div>

        <section className="border-t border-border bg-secondary/40">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
            <div className="flex items-end justify-between gap-6">
              <div><p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">More in Data Management</p><h2 className="mt-4 font-serif text-4xl sm:text-5xl">Continue exploring</h2></div>
              <Link to="/" hash="portfolio" className="hidden text-sm text-muted-foreground hover:text-foreground sm:block">View all projects →</Link>
            </div>
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              {recommendations.map((item) => <Recommendation key={item.slug} project={item} />)}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-foreground text-background/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-xs sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <p>© {new Date().getFullYear()} Anushree Dey. All rights reserved.</p>
          <div className="flex gap-6"><a href="mailto:anushree.d@hotmail.com" className="hover:text-background">Email</a><a href="https://www.linkedin.com/in/anushreedey" target="_blank" rel="noreferrer" className="hover:text-background">LinkedIn</a></div>
        </div>
      </footer>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) { return <div><dt className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</dt><dd className="mt-2 font-serif text-xl">{value}</dd></div>; }

function CaseSection({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return <section id={id} className="scroll-mt-24 border-t border-border py-16 first:border-t-0 first:pt-0 lg:py-24"><p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{eyebrow}</p><h2 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.08] sm:text-5xl">{title}</h2><div className="mt-8 max-w-3xl space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">{children}</div></section>;
}

function Quote({ children }: { children: React.ReactNode }) { return <blockquote className="my-10 border-l-2 border-foreground pl-7 font-serif text-2xl leading-snug text-foreground sm:text-3xl">“{children}”</blockquote>; }

function Insight({ number, title, body }: { number: string; title: string; body: string }) { return <div className="bg-card p-6"><p className="text-xs text-muted-foreground">{number}</p><h3 className="mt-8 font-serif text-xl text-foreground">{title}</h3><p className="mt-3 text-sm leading-relaxed">{body}</p></div>; }

function Principle({ label, title, children }: { label: string; title: string; children: React.ReactNode }) { return <div className="border-t border-border pt-5"><p className="text-xs text-muted-foreground">{label}</p><h3 className="mt-4 font-serif text-2xl text-foreground">{title}</h3><p className="mt-3 text-sm leading-relaxed">{children}</p></div>; }

function JourneyStep({ number, title, body, children }: { number: string; title: string; body: string; children: React.ReactNode }) { return <article className="mt-16 border-t border-border pt-8 first:mt-12"><div className="grid gap-4 sm:grid-cols-[48px_1fr]"><p className="text-xs tabular-nums text-muted-foreground">{number}</p><div><h3 className="font-serif text-3xl text-foreground">{title}</h3><p className="mt-4">{body}</p></div></div><div className="mt-8 space-y-6">{children}</div></article>; }

function Figure({ src, alt, caption, contain = false, priority = false }: { src: string; alt: string; caption: string; contain?: boolean; priority?: boolean }) { return <figure className="my-10"><div className="overflow-hidden rounded-sm border border-border bg-secondary"><img src={src} alt={alt} loading={priority ? "eager" : "lazy"} className={`h-auto w-full ${contain ? "object-contain" : "object-cover"}`} /></div><figcaption className="mt-3 text-xs leading-relaxed text-muted-foreground">{caption}</figcaption></figure>; }

function SystemRow({ title, value, body }: { title: string; value: string; body: string }) { return <div className="grid gap-3 py-6 sm:grid-cols-[140px_110px_1fr] sm:gap-6"><h3 className="font-medium text-foreground">{title}</h3><p className="text-sm text-foreground">{value}</p><p className="text-sm leading-relaxed">{body}</p></div>; }

function Metric({ value, label }: { value: string; label: string }) { return <div className="bg-card p-6"><dt className="font-serif text-3xl text-foreground">{value}</dt><dd className="mt-3 text-sm leading-relaxed text-muted-foreground">{label}</dd></div>; }

function Recommendation({ project }: { project: Project }) { return <Link to="/portfolio/$slug" params={{ slug: project.slug }} className="group grid overflow-hidden rounded-sm border border-border bg-card sm:grid-cols-[42%_1fr]"><div className="aspect-[4/3] overflow-hidden bg-secondary sm:aspect-auto"><img src={project.image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" /></div><div className="flex flex-col p-6"><p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{project.category}</p><h3 className="mt-4 font-serif text-2xl leading-tight">{project.title}</h3><span className="mt-auto pt-8 text-sm font-medium">View case study <span aria-hidden>→</span></span></div></Link>; }