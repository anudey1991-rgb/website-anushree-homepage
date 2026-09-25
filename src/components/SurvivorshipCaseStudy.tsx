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
import walkthroughAsset from "@/assets/survivorship/tour-video-music.mp4.asset.json";
import type { Project } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";

const sections = [
  ["overview", "Overview"],
  ["problem", "The problem"],
  ["architecture", "Architecture"],
  ["modes", "Agent modes"],
  ["journey", "The experience"],
  ["principles", "Design principles"],
  ["outcome", "Outcome"],
  ["walkthrough", "Walkthrough"],
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
            <Fact label="Role" value="UX Designer" />
            <Fact label="Platform" value="Informatica MDM Customer 360" />
            <Fact label="Surfaces" value="Slack · MDM Console" />
            <Fact label="Context" value="Agentic MDM Workshop · Dublin · July 2026" />
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
              <p>Master data decisions happen across CRM, ERP, collaboration tools and partner surfaces, not only inside an MDM console. I designed a Slack-first, agent-assisted stewardship experience on top of Informatica MDM survivorship.</p>
              <p>The brief was explicit: assume the MDM console still exists, but make the solution work for someone who never opens it. The copilot adds an evidence-backed verification gate without replacing deterministic rules or taking accountability away from the data steward.</p>
              <Quote>The agent presents evidence. The steward makes the call.</Quote>
            </CaseSection>

            <CaseSection id="problem" eyebrow="01 · Brief and problem" title="The golden record stays wrong: confidently, silently, indefinitely">
              <p>Survivorship resolves disagreements between source systems using trust scores, recency and source hierarchy. It handles roughly 95% of records without human involvement. Two gaps remain.</p>
              <div className="mt-10 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-3">
                <Insight number="01" title="External reality moves" body="Certifications expire, companies change legal status and products are reclassified without triggering MDM." />
                <Insight number="02" title="Corrections cost time" body="A manual console journey takes about 12 minutes because every verification and edit is a separate act." />
                <Insight number="03" title="Rules have limits" body="A trusted source can still hold a stale value, so deterministic survivorship needs an open-world check." />
              </div>
              <dl className="mt-10 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-3">
                <Metric value="~0%" label="Baseline contradictions caught before publish" />
                <Metric value="~12 min" label="Baseline manual correction journey" />
                <Metric value="~95%" label="Records handled correctly by survivorship" />
              </dl>
            </CaseSection>

            <CaseSection id="architecture" eyebrow="02 · Architecture" title="After survivorship. Before publish.">
              <p>The agent stress-tests the draft golden record against authoritative external sources before it goes live. The deterministic skill layer still handles matching, merging, validation and lifecycle management for every record. The reasoning layer focuses only on meaningful contradictions.</p>
              <div className="mt-10 overflow-x-auto border-y border-border">
                <table className="w-full min-w-[620px] text-left text-sm">
                  <thead className="text-xs uppercase tracking-[0.16em] text-muted-foreground"><tr><th className="py-4 pr-6">Layer</th><th className="py-4 pr-6">What it does</th><th className="py-4">Coverage</th></tr></thead>
                  <tbody className="divide-y divide-border text-foreground"><tr><td className="py-5 pr-6 font-medium">Skill layer</td><td className="py-5 pr-6">Match, merge, survivorship, validation, lifecycle</td><td className="py-5">100% · Deterministic</td></tr><tr><td className="py-5 pr-6 font-medium">Agent layer</td><td className="py-5 pr-6">External cross-reference, contradiction detection, notification</td><td className="py-5">~5% · Reasoning</td></tr></tbody>
                </table>
              </div>
              <h3 className="mt-12 font-serif text-3xl text-foreground">Three sources of external truth</h3>
              <div className="mt-6 divide-y divide-border border-y border-border">
                <SystemRow title="Public registries" value="Legal entities" body="Companies House, D&B, GLEIF LEI and VAT databases expose legal and financial risk." />
                <SystemRow title="Regulators" value="Compliance" body="FDA, EU MDR, EUDAMED, ISO and EUR-Lex reveal invalid classifications and certifications." />
                <SystemRow title="Ecosystem data" value="Operations" body="Data Cloud, Industry Clouds and AppExchange surface downstream inconsistencies." />
              </div>
              <Figure src={architectureAsset.url} alt="Architecture showing the copilot between survivorship and publishing" caption="The agent sits after deterministic survivorship and before publish, checking only for meaningful contradictions." />
            </CaseSection>

            <CaseSection id="modes" eyebrow="03 · Agent modes" title="Three modes cover every scenario">
              <p>The product deliberately distinguishes acting, escalating and disappearing. That separation protects attention while making the exceptional decisions faster and more trustworthy.</p>
              <div className="mt-10 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-3">
                <Insight number="01 · Autonomous" title="Act when evidence agrees" body="The agent verifies, finds no contradiction and publishes without human involvement. A digest confirms the totals." />
                <Insight number="02 · Escalation" title="Recommend with context" body="Both values, source, confidence, consequence and one decision are handed to the steward together." />
                <Insight number="03 · Invisible" title="Hold the interruption" body="Notifications wait during calls, presentations or focused work and return through the steward queue later." />
              </div>
              <h3 className="mt-14 font-serif text-3xl text-foreground">Active and dormant records</h3>
              <div className="mt-6 divide-y divide-border border-y border-border">
                <SystemRow title="Event-driven" value="Real time" body="Checks records during ingest, merge, edit and publish. This is the lowest-cost default." />
                <SystemRow title="Feed-driven" value="Targeted" body="Responds when a registry or regulation changes, checking only affected record groups." />
                <SystemRow title="Scheduled sweep" value="Safety net" body="Reviews dormant, risk-sensitive records on a configurable cadence." />
                <SystemRow title="Always-on" value="Premium" body="Continuous verification for zero-gap compliance environments, not the default recommendation." />
              </div>
            </CaseSection>

            <CaseSection id="journey" eyebrow="The experience" title="One connected journey across Slack and the MDM console">
              <p>The Orion MedTech prototype follows 180 medical-device records affected by an EU MDR reclassification. The scenario demonstrates the intended workflow rather than production performance.</p>
              <dl className="mt-10 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-5">
                <Metric value="180" label="Records processed" /><Metric value="174" label="Published silently" /><Metric value="6" label="Held for review" /><Metric value="18 min" label="Scenario total" /><Metric value="1×" label="Console opened" />
              </dl>
              <Figure src={experienceAsset.url} alt="Event-based experience flow from record batch to resolution" caption="The scenario moves from a 180-record batch to six focused decisions, with five resolved in Slack and one escalated." />
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

            <CaseSection id="principles" eyebrow="05 · Design principles" title="Seven principles govern every surface and decision">
              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                <Principle label="01" title="Silent by default">The agent earns the right to interrupt by disappearing for records it resolves correctly.</Principle>
                <Principle label="02" title="Evidence first">Source, reference, confidence and effective date precede every recommendation.</Principle>
                <Principle label="03" title="The steward decides">Human accountability remains for governance, compliance and commercial consequences.</Principle>
                <Principle label="04" title="Consequence is visible">Every finding explains what changes downstream if the recommendation is accepted.</Principle>
                <Principle label="05" title="Depth on demand">The first touch stays restrained while CLAIRE provides investigation depth when requested.</Principle>
                <Principle label="06" title="Severity sets interruption">Critical findings interrupt, medium findings enter the digest and low findings log silently.</Principle>
                <Principle label="07" title="One interaction language">Confidence, provenance, severity, state, attribution and notification patterns travel across surfaces.</Principle>
              </div>
            </CaseSection>

            <CaseSection id="outcome" eyebrow="06 · Success measures" title="From 12 minutes to a 60-second target">
              <p>These are baseline comparisons and design targets for future validation, not measured production outcomes.</p>
              <dl className="mt-10 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2">
                <Metric value="~12 min → < 60 sec" label="Target field contradiction resolution" />
                <Metric value="~0% → > 95%" label="Target contradictions caught before publish" />
                <Metric value="Partial → 100%" label="Target agent-assisted decision audit coverage" />
                <Metric value="Untracked → Detectable" label="Target dormant record drift visibility" />
              </dl>
              <div className="mt-12 border-l-2 border-foreground pl-7">
                <h3 className="font-serif text-2xl">What I would validate next</h3>
                <p className="mt-4">I would test whether stewards understand why the agent interrupted them, can compare competing evidence without anchoring bias, and can distinguish a completed decision from a queued system update. I would also measure false-positive tolerance before tuning severity and notification thresholds.</p>
              </div>
            </CaseSection>

            <CaseSection id="walkthrough" eyebrow="07 · Walkthrough" title="The full flow, end to end">
              <p>This 2:21 walkthrough covers all 36 steps of the Orion MedTech scenario, from the Slack morning digest through inline decisions and the final MDM console resolution.</p>
              <figure className="mt-10">
                <div className="overflow-hidden rounded-sm border border-border bg-foreground">
                  <video controls preload="metadata" playsInline className="block aspect-video w-full" aria-label="Agent-Verified Data Survivorship product walkthrough">
                    <source src={walkthroughAsset.url} type="video/mp4" />
                  </video>
                </div>
                <figcaption className="mt-3 text-xs leading-relaxed text-muted-foreground">CLAIRE survivorship agent · Orion MedTech scenario · 36 steps · 2:21 · Slack and MDM Console</figcaption>
              </figure>
              <Quote>Done well, this experience is nearly invisible. The 174 records handled correctly and silently are the product.</Quote>
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
              {recommendations.map((item) => <ProjectCard key={item.slug} project={item} />)}
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
