import { Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { BackToProjects } from "@/components/BackToProjects";
import { ProjectCard } from "@/components/ProjectCard";
import { CaseStudyToc, CaseStudyJumpBar, useSectionNav, type TocSection } from "@/components/CaseStudyToc";
import type { Project } from "@/data/projects";

import flowDiagram from "@/assets/cluster-agent/agent-flow-diagram.png.asset.json";
import slackActive from "@/assets/cluster-agent/slack-card-active.png.asset.json";
import slackPartial from "@/assets/cluster-agent/slack-card-partial.png.asset.json";
import slackResolved from "@/assets/cluster-agent/slack-card-resolved.png.asset.json";
import claireThread from "@/assets/cluster-agent/claire-gpt-thread.png.asset.json";
import workspacePanel from "@/assets/cluster-agent/workspace-dynamic-panel.jpg.asset.json";
import workspacePartial from "@/assets/cluster-agent/workspace-partial-correction.png.asset.json";
import workspaceResolved from "@/assets/cluster-agent/workspace-all-resolved.jpg.asset.json";
import submitPartial from "@/assets/cluster-agent/submit-dialog-partial.png.asset.json";
import submitFull from "@/assets/cluster-agent/submit-dialog-full.jpg.asset.json";
import path1Video from "@/assets/cluster-agent/path1-walkthrough.mp4.asset.json";
import path2Video from "@/assets/cluster-agent/path2-walkthrough.mp4.asset.json";

const SECTIONS: readonly TocSection[] = [
  ["overview", "Overview"],
  ["strategy", "Why this, why now"],
  ["problem", "The problem"],
  ["role", "My role"],
  ["system", "How it works"],
  ["walkthrough", "Walkthrough"],
  ["decisions", "Design decisions"],
  ["research", "What I would verify"],
  ["metrics", "Success measures"],
  ["forward", "Path forward"],
] as const;

export function ClusterDetectionCaseStudy({
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
            {project.category} · Agentic stewardship
          </p>
          <h1 className="mt-6 max-w-5xl font-serif text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.98] text-foreground">
            Cluster Detection<br />&amp; Bulk Edit Agent
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-2xl">
            An agent that finds clusters of broken records across master data before a steward has to go looking, and
            hands them a workspace already scoped to fix it.
          </p>
          <dl className="mt-14 grid gap-6 border-y border-border py-7 sm:grid-cols-2 lg:grid-cols-4">
            <Fact label="Role" value="Design Lead, 0→1" />
            <Fact label="Platform" value="Informatica MDM · MCP" />
            <Fact label="Timeline" value="2026 – present" />
            <Fact label="Organization" value="Salesforce" />
          </dl>
          <ul className="mt-8 flex flex-wrap gap-2">
            {[
              "Agentic product design",
              "Cluster detection model",
              "Slack + CLAIRE GPT",
              "Headless MDM over MCP",
              "Governed bulk correction",
              "Interactive prototype",
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
            src={workspacePanel.url}
            alt="The cluster resolution workspace with an editable table and a dynamic inspector panel open on the right"
            caption="The workspace the agent hands over: a table already containing only the affected records, with an inspector panel explaining why each one was flagged."
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
              title="Stewardship that starts before anyone goes looking"
            >
              <p>
                In master data management, broken records rarely arrive one at a time. A data quality rule changes, a
                connector syncs, a licence expires, a trust configuration shifts, and hundreds of records break for the
                same reason at the same moment. Stewards find out by searching, one attribute at a time, long after the
                damage has propagated downstream.
              </p>
              <p>
                I designed an agent that inverts that. It sweeps the dataset, groups records by the root cause they
                share, notifies the steward once, and opens a correction workspace already scoped to exactly those
                records. The steward's job moves from finding the problem to deciding what to do about it.
              </p>
              <p>
                The capability is delivered over MCP, so it is not tied to one product surface. Slack paired with
                CLAIRE GPT is the reference deployment shown throughout this case study, not the only one possible.
              </p>
              <dl className="mt-10 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-3">
                <Metric value="7" label="Classes of error cluster the agent detects" />
                <Metric value="2" label="Resolution paths, chosen by the nature of the fix" />
                <Metric value="0" label="Search steps between detection and correction" />
              </dl>
              <Quote>
                No search step. The table already contains only the records that broke, and only for the reason they
                broke.
              </Quote>
            </CaseSection>

            <CaseSection
              id="strategy"
              eyebrow="Why this, why now"
              title="Three shifts converging at the same time"
            >
              <p>
                This is not an assistant bolted onto an existing screen. It exists because how MDM is delivered, how
                stewards find problems, and what stewardship work should feel like are all changing at once.
              </p>
              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                <Principle label="Delivery" title="Headless MDM">
                  Detection, review and correction happen without the steward entering the Business UI at all. The
                  workspace travels to them.
                </Principle>
                <Principle label="Portability" title="Platform-agnostic via MCP">
                  One stewardship skill, hosted in whichever MCP-compatible copilot the customer already works in.
                </Principle>
                <Principle label="Market" title="A category, not a feature">
                  No MDM platform today pairs agent-driven cluster detection with an auto-generated resolution
                  workspace.
                </Principle>
                <Principle label="Scale" title="Record-by-record does not scale">
                  As datasets grow, cluster-level resolution is the only model that keeps pace with how fast records
                  break.
                </Principle>
                <Principle label="Retention" title="Changing the job, not the timeline">
                  Repetitive mechanical correction is a leading driver of steward burnout. Removing it changes what the
                  role is.
                </Principle>
                <Principle label="Governance" title="Speed without a new trust problem">
                  Every write still passes through MDM's existing draft, publish and survivorship rules. The agent adds
                  intelligence, not a new write path.
                </Principle>
              </div>
            </CaseSection>

            <CaseSection
              id="problem"
              eyebrow="The problem"
              title="A cluster is not something search can find"
            >
              <p>
                I designed the Tabular Edit Workspace, MDM's first bulk correction surface, and in that project I
                flagged a structural limit in my own design: the workspace could only be entered through attribute
                search. Records related by root cause rather than by a shared field value simply could not be assembled.
              </p>
              <p>
                The deeper reason is computational, not navigational. Tracking dozens of metadata signals individually
                across thousands to millions of records, then combining them to work out downstream impact, was
                prohibitively expensive. Even the faceted search built to narrow it down ran into real performance
                limits. The agent's contribution is making that combinatorial computation practical.
              </p>
              <div className="mt-10 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2">
                <Insight
                  title="Search expresses fields, not causes"
                  body="A facet can express “Tax ID is blank”. It cannot express “these records broke because a DQ rule was reconfigured last night”."
                />
                <Insight
                  title="Where one cluster ends and another begins"
                  body="Records only share a cluster when error class, affected field and root cause all match. Defining that boundary was a design decision, not a query."
                />
                <Insight
                  title="Detection was reactive by definition"
                  body="A problem existed only once a steward happened to search for it. Nothing swept the dataset on the steward's behalf."
                />
                <Insight
                  title="Severity without consequence"
                  body="MDM has flagged records for years. What a flag means for the business downstream still required an analyst's time to work out."
                />
              </div>
              <p className="mt-10">
                Customers independently confirmed the gap. In design reviews they asked for entry points beyond search,
                from record lists and hierarchy tables, without having seen my earlier recommendation. It was a
                recurring constraint of search-gated access, not a hunch.
              </p>
              <h3 className="mt-14 font-serif text-2xl text-foreground">
                The seven cluster classes the agent detects
              </h3>
              <ul className="mt-6 flex flex-wrap gap-2">
                {[
                  "Data quality rule violations",
                  "New mandatory field",
                  "Expired or stale data",
                  "External database conflicts",
                  "New connector data",
                  "Cross-record inconsistency",
                  "Trust and survivorship shifts",
                ].map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs text-muted-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6">
                Each class has a different trigger, and none of them is a facet a steward could have selected. That is
                what widens the scope of work this agent can take on.
              </p>
            </CaseSection>

            <CaseSection id="role" eyebrow="My role" title="Design lead on a zero-to-one agent">
              <p>
                I defined this product from a blank page: what the agent is responsible for, how it decides a cluster
                exists, what it is allowed to show where, and what the steward's end-to-end journey looks like. The
                use-case taxonomy and the two resolution paths are the structure PM and engineering now scope against.
              </p>
              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                <Principle label="Definition" title="Defined the agent">
                  Role, detection logic, cluster grouping rules and the dual resolution model, established before any
                  screen existed.
                </Principle>
                <Principle label="Systems" title="Designed the system">
                  The card state machine, the trust-tier boundary and the workspace scoping logic, built so every
                  future MCP skill can reuse them.
                </Principle>
                <Principle label="Domain" title="Brought the history">
                  Six years designing Informatica MDM's core steward experience, including the tabular editing surface
                  this agent's workspace reuses, so edge cases were anticipated rather than discovered.
                </Principle>
                <Principle label="Alignment" title="Made it tangible">
                  Built the interactive prototype and the walkthrough films that PM and engineering aligned on before a
                  line of production code was written.
                </Principle>
              </div>
              <Quote>
                The access model I proposed in 2025 is, in effect, what the agentic architecture now enables.
              </Quote>
              <p>
                This agent is an extension of{" "}
                <Link
                  to="/portfolio/$slug"
                  params={{ slug: "tabular-edit-of-records" }}
                  className="border-b border-foreground/30 pb-0.5 font-medium text-foreground transition-colors hover:border-foreground"
                >
                  the Tabular Edit Workspace
                </Link>
                , not a replacement for it. Both generations were shaped by the same discipline: structured research and
                usability studies with the stewards who do this work daily. The drag-fill interaction and the
                draft-persistence model carry over unchanged, so nothing has to be relearned. What is new is how the
                table gets scoped.
              </p>
            </CaseSection>

            <CaseSection id="system" eyebrow="How it works" title="One detection engine, two resolution paths">
              <p>
                Which path runs depends on a single question: is the fix a judgment call, or is it deterministic? That
                distinction decides whether the steward needs an editing surface at all.
              </p>
              <ol className="mt-10 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
                <Step step="Detect" body="A scheduled sweep, plus event triggers from the pipeline itself." />
                <Step step="Cluster" body="Group by error class, affected field and root cause, all three matching." />
                <Step step="Notify" body="One card per cluster. Metadata only, never record-level data." />
                <Step step="Investigate" body="The workspace opens already scoped to the cluster. No search." />
                <Step step="Resolve" body="Correct or accept, in batches, with overrides and exclusions per row." />
                <Step step="Publish & audit" body="Through MDM's existing governed pipeline, with a full audit trail." />
              </ol>

              <Shot
                src={flowDiagram.url}
                alt="Architecture diagram showing detection, clustering, Slack notification, CLAIRE GPT workspace and the MDM publish pipeline"
                caption="The architecture. Slack notifies and tracks state; the scoped workspace is delivered over MCP; every write lands through MDM's existing publish and survivorship rules."
              />

              <div className="mt-12 grid gap-8 sm:grid-cols-2">
                <Principle label="Path 1" title="Manual cluster review">
                  Used when the fix needs judgment, such as a data quality violation or a newly mandatory field. The
                  steward gets an editable table scoped to the cluster, corrects values row by row or with drag-fill,
                  and can override or exclude any record before submitting.
                </Principle>
                <Principle label="Path 2" title="Agent-suggested bulk update">
                  Used when a business event makes the fix deterministic, such as an acquisition changing a cost centre
                  code. The agent proposes the update; the steward reviews current against proposed values in a
                  read-only list, overrides or excludes rows, and approves the batch. No editing surface, because none
                  is needed.
                </Principle>
              </div>
            </CaseSection>

            <CaseSection id="walkthrough" eyebrow="Walkthrough" title="What resolving a cluster actually looks like">
              <p>
                Both paths, recorded end to end in the reference deployment. Slack notifies and tracks state; CLAIRE
                GPT hosts the workspace.
              </p>

              <Film
                label="Path 1"
                title="Manual cluster review"
                body="A data quality rule change invalidates 34 Tax ID records overnight. The agent detects the cluster and notifies the steward, who opens a workspace already scoped to just those records, corrects values with drag-fill in batches, and submits to the MDM pipeline."
                src={path1Video.url}
                poster={workspacePanel.url}
              />

              <Film
                label="Path 2"
                title="Agent-suggested bulk update"
                body="An acquisition triggers two conditional updates: a cost centre reassignment across 47 records and a region code change across 31. The steward reviews current against proposed values in a read-only list, overrides or excludes specific rows, and approves in batches rather than editing manually."
                src={path2Video.url}
                poster={workspaceResolved.url}
              />

              <h3 className="mt-20 font-serif text-3xl text-foreground">Path 1, step by step</h3>

              <Feature
                title="Detected and notified"
                goal="Nobody went looking"
                body="The agent posts one card per cluster: what broke, how many records, what caused it, and what it means downstream. The card carries metadata only, because Slack is an unauthenticated surface as far as MDM is concerned."
              >
                <Shot
                  src={slackActive.url}
                  alt="Slack card announcing a detected cluster with record count, root cause and a call to action"
                  caption="The active card. One notification for the whole cluster, with the downstream consequence stated before the steward decides to act."
                />
              </Feature>

              <Feature
                title="The thread, for depth on demand"
                goal="Ask before acting"
                body="CLAIRE GPT surfaces the same cluster conversationally, with a deep link straight into the workspace. Because the copilot is already signed in, it can show record-level detail the Slack card deliberately withholds."
              >
                <Shot
                  src={claireThread.url}
                  alt="CLAIRE GPT conversation thread describing the cluster with a link into the workspace"
                  caption="The same cluster, at a different trust tier. What a surface shows depends on whether it is authenticated, not on which product is rendering it."
                />
              </Feature>

              <Feature
                title="A workspace that opens pre-scoped"
                goal="Skip the finding, start the fixing"
                body="The table contains only the affected records. A dynamic inspector panel explains why each one was flagged, which rule it failed and which connected entities depend on it, so the steward can judge the correction rather than research it."
              >
                <Shot
                  src={workspacePanel.url}
                  alt="Cluster workspace with the inspector panel open alongside the editable table"
                  caption="The inspector panel is where downstream impact lives: which inventory item or customer commitment this record actually affects."
                />
              </Feature>

              <Feature
                title="Correct in batches, with progress in view"
                goal="Work a set, not a record"
                body="Drag-fill carries over unchanged from the tabular editing workspace stewards already use, so there was nothing to teach. Corrections apply per batch; rows resolve visibly as the steward works, and partially corrected clusters keep their progress."
              >
                <Shot
                  src={workspacePartial.url}
                  alt="Workspace mid-correction with some rows resolved and others still flagged"
                  caption="Partial state. A cluster does not have to be finished in one sitting, and progress is never lost between sessions."
                />
                <Shot
                  src={workspaceResolved.url}
                  alt="Workspace with every row in the cluster resolved"
                  caption="All records resolved, ready to submit as one governed batch."
                />
              </Feature>

              <Feature
                title="One explicit confirmation before publish"
                goal="No accidental commits"
                body="Submission states exactly what is about to enter the publish pipeline, including what is being left behind. A partially resolved cluster is a legitimate outcome, so the dialog reports it plainly rather than treating it as an error."
              >
                <Shot
                  src={submitPartial.url}
                  alt="Submit dialog for a partially resolved cluster showing corrected and remaining record counts"
                  caption="Partial submit. Valid work moves forward; unresolved records stay as drafts instead of blocking the batch."
                />
                <Shot
                  src={submitFull.url}
                  alt="Submit dialog for a fully resolved cluster"
                  caption="Full submit. The same dialog, the same governed pipeline, no separate path for the happy case."
                />
              </Feature>

              <Feature
                title="The card resolves in place"
                goal="One source of truth for status"
                body="MDM emits an event at each workflow milestone, and the agent updates the original Slack message rather than posting a new one. The card moves through active, in progress and resolved, so there is never ambiguity about what is current."
              >
                <Shot
                  src={slackPartial.url}
                  alt="Slack card updated in place showing partial progress with record counts"
                  caption="In progress. The steward started but has not finished; the card reflects it without a second notification."
                />
                <Shot
                  src={slackResolved.url}
                  alt="Slack card in its resolved state with an audit summary of who resolved it and how many records"
                  caption="Resolved. Who resolved it, how many records and when, in the same message the cluster arrived in."
                />
              </Feature>
            </CaseSection>

            <CaseSection id="decisions" eyebrow="Design decisions" title="The decisions that carry the system">
              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                <Principle label="State" title="The card is a state machine">
                  One card per cluster, updated in place through active, in progress and resolved. No message spam, no
                  ambiguity about which notification is current.
                </Principle>
                <Principle label="Trust" title="Trust tier decides the surface">
                  Slack gets metadata; the authenticated copilot gets record-level detail. The boundary is
                  authentication state, not product branding.
                </Principle>
                <Principle label="Continuity" title="Drag-fill, reused not reinvented">
                  The same fill-handle interaction stewards already use in MDM, applied to agent-scoped clusters. It
                  carried over with no explanation needed.
                </Principle>
                <Principle label="Portability" title="The table travels, not just the alert">
                  The editing surface itself ships over MCP, so it can render inside whichever copilot the customer
                  already uses, without opening MDM.
                </Principle>
                <Principle label="Consequence" title="Severity stays MDM's, impact is new">
                  The three data quality severity tiers are long-standing platform configuration and untouched. What
                  the agent adds is tracing a flagged record through the entities it connects to, to establish what the
                  flag actually means for the business.
                </Principle>
                <Principle label="Governance" title="Governed by default">
                  Every submitted edit flows through MDM's existing draft, publish and survivorship rules. The agent
                  proposes and prepares; it does not open a second write path.
                </Principle>
              </div>
              <Quote>
                A warning that a medical instrument's licence is expiring means little on its own. Tracing it to the
                inventory it covers and the customer commitments that depend on it is the inference an analyst used to
                do by hand.
              </Quote>
            </CaseSection>

            <CaseSection
              id="research"
              eyebrow="What I would verify"
              title="The open questions I would hand to research"
            >
              <p>
                This is a concept-stage design. Each question below is tied to a decision the specification leaves open
                on purpose, rather than a gap I overlooked.
              </p>
              <ul className="mt-8 space-y-4">
                <Bullet>
                  <strong className="font-medium text-foreground">Reminder cadence.</strong> No schedule is defined for
                  nudging a steward about an untouched cluster. Real interruption tolerance should set it, not an
                  arbitrary interval.
                </Bullet>
                <Bullet>
                  <strong className="font-medium text-foreground">Do multi-rule clusters read as one problem?</strong>{" "}
                  When a cluster spans several fields and rules tracing to one trigger, does a steward see one cause,
                  or records arbitrarily grouped? If the mental model does not hold, the grouping logic needs rethinking
                  before it is built.
                </Bullet>
                <Bullet>
                  <strong className="font-medium text-foreground">Where a workspace stops being worth it.</strong> At
                  what cluster size does opening a dedicated workspace feel like more overhead than fixing the record
                  directly?
                </Bullet>
                <Bullet>
                  <strong className="font-medium text-foreground">End-to-end handoff comprehension.</strong> Can a
                  first-time steward follow card to copilot to workspace without confusion, and correctly read what a
                  metadata-only card is telling them?
                </Bullet>
                <Bullet>
                  <strong className="font-medium text-foreground">Draft recovery discoverability.</strong> A partially
                  corrected cluster saves progress. That only helps if stewards notice it and find their way back.
                </Bullet>
              </ul>
              <p className="mt-10">
                Knowing what research does not own matters as much: detection accuracy is a data science and QA track,
                survivorship re-adjudication belongs to a dedicated project, and grid performance at scale is an
                engineering test.
              </p>
            </CaseSection>

            <CaseSection id="metrics" eyebrow="Success measures" title="What success would look like">
              <p>
                None of these are measured yet. They are the hypotheses research and product would validate once this
                ships, and they follow directly from the business problem: datasets outgrowing record-by-record
                resolution, and stewardship burnout.
              </p>
              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                <Principle label="Efficiency" title="Detection to resolution">
                  Time from a cluster being detected to being resolved, down. Records resolved per steward session, up.
                </Principle>
                <Principle label="Data quality" title="Backlog and audit">
                  Backlog growth rate down as fixes happen by category rather than by record. Audit completeness for
                  bulk actions, up.
                </Principle>
                <Principle label="Adoption" title="Reach and return">
                  Share of eligible stewards working from agent-surfaced clusters rather than manual search, and how
                  often they come back after the first one.
                </Principle>
                <Principle label="Experience" title="The job itself">
                  Attrition tied to repetitive mechanical correction work, down. Satisfaction with stewardship tooling,
                  up.
                </Principle>
              </div>
            </CaseSection>

            <CaseSection id="forward" eyebrow="Path forward" title="What this generation leaves out, on purpose">
              <p>
                The first release is scoped deliberately narrow so it can ship as a solid first skill rather than a
                broad, half-finished one. Each cut below is waiting on a specific dependency.
              </p>
              <div className="mt-8 divide-y divide-border border-y border-border">
                <TimelineRow
                  when="Next"
                  title="Warning and info severity"
                  body="The agent already detects these; the first release only surfaces error-level clusters. Extending to lower severities is the most direct next increase in scope."
                />
                <TimelineRow
                  when="Next"
                  title="Multi-user triage"
                  body="This generation assumes one steward per cluster. Routing a cluster across a team, and handling two stewards touching it, follows MDM's existing multi-user model rather than inventing a new one."
                />
                <TimelineRow
                  when="Depends on another team"
                  title="Survivorship re-adjudication handoff"
                  body="Today the agent only surfaces that a trust or survivorship shift happened. Once the dedicated survivorship project finalises its resolution model, this card routes the steward straight into it."
                />
                <TimelineRow
                  when="Depends on the predecessor"
                  title="One scoping engine, not two"
                  body="The Tabular Edit Workspace is adding its own new entry points. Long term, its manual scoping and this agent's cluster scoping should converge into one engine instead of running in parallel."
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
            <a href="mailto:anushree.d@hotmail.com" className="hover:text-background">Email</a>
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

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-card p-6">
      <dt className="font-serif text-3xl text-foreground">{value}</dt>
      <dd className="mt-3 text-sm leading-relaxed text-muted-foreground">{label}</dd>
    </div>
  );
}

function Step({ step, body }: { step: string; body: string }) {
  return (
    <li className="bg-card p-6">
      <h3 className="font-serif text-xl text-foreground">{step}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </li>
  );
}

function Principle({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-border pt-5">
      <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
      <h3 className="mt-4 font-serif text-2xl text-foreground">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed">{children}</p>
    </div>
  );
}

function TimelineRow({ when, title, body }: { when: string; title: string; body: string }) {
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

function Bullet({ children }: { children: React.ReactNode }) {
  return <li className="border-t border-border pt-4 text-base leading-relaxed">{children}</li>;
}

function Feature({
  title,
  goal,
  body,
  children,
}: {
  title: string;
  goal: string;
  body: string;
  children: React.ReactNode;
}) {
  return (
    <article className="mt-16 border-t border-border pt-8">
      <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{goal}</p>
      <h3 className="mt-3 font-serif text-2xl text-foreground sm:text-3xl">{title}</h3>
      <p className="mt-5">{body}</p>
      <div className="mt-8 space-y-10">{children}</div>
    </article>
  );
}

/** Walkthrough film with its framing copy. */
function Film({
  label,
  title,
  body,
  src,
  poster,
}: {
  label: string;
  title: string;
  body: string;
  src: string;
  poster: string;
}) {
  return (
    <figure className="mt-14 border-t border-border pt-8">
      <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
      <h3 className="mt-3 font-serif text-2xl text-foreground sm:text-3xl">{title}</h3>
      <p className="mt-5">{body}</p>
      <div className="mt-8 overflow-hidden rounded-sm border border-border bg-secondary">
        <video
          src={src}
          poster={poster}
          controls
          preload="metadata"
          playsInline
          className="block h-auto w-full"
        />
      </div>
    </figure>
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
    <figure className="my-2">
      <div className="overflow-hidden rounded-sm border border-border bg-secondary">
        <img src={src} alt={alt} loading={priority ? "eager" : "lazy"} className="block h-auto w-full" />
      </div>
      <figcaption className="mt-3 text-xs leading-relaxed text-muted-foreground">{caption}</figcaption>
    </figure>
  );
}
