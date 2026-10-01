import { assetUrl } from "@/lib/asset-url";
import { Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { BackToProjects } from "@/components/BackToProjects";
import { ProjectCard } from "@/components/ProjectCard";
import { CaseStudyToc, CaseStudyJumpBar, useSectionNav, type TocSection } from "@/components/CaseStudyToc";
import type { Project } from "@/data/projects";

import searchShot from "@/assets/tabular/entry-point-search.png.asset.json";
import dialogShot from "@/assets/tabular/entry-point-edit-dialog.png.asset.json";
import beRecordsShot from "@/assets/tabular/entry-point-be-records.png.asset.json";
import inlineShot from "@/assets/tabular/inline-editing.png.asset.json";
import draftsShot from "@/assets/tabular/draft-records.png.asset.json";
import nestedShot from "@/assets/tabular/field-group-nested.png.asset.json";
import flatShot from "@/assets/tabular/field-group-flat.png.asset.json";
import mvfShot from "@/assets/tabular/multi-value-fields.png.asset.json";
import cloneSuccessShot from "@/assets/tabular/clone-success.png.asset.json";
import cloneFailureShot from "@/assets/tabular/clone-failure.png.asset.json";
import createDialogShot from "@/assets/tabular/create-record-dialog.png.asset.json";
import createDraftShot from "@/assets/tabular/create-record-draft.png.asset.json";
import conflictInlineShot from "@/assets/tabular/conflict-resolution-submit.png.asset.json";
import conflictDialogShot from "@/assets/tabular/conflict-resolution-dialog.png.asset.json";
import undoShot from "@/assets/tabular/undo-redo-limit.png.asset.json";
import submitShot from "@/assets/tabular/submit-confirmation.png.asset.json";
import postSubmitShot from "@/assets/tabular/submit-post-state.png.asset.json";

const SECTIONS: readonly TocSection[] = [
  ["overview", "Overview"],
  ["problem", "The problem"],
  ["role", "My role"],
  ["challenge", "The design call"],
  ["timeline", "Timeline"],
  ["walkthrough", "Walkthrough"],
  ["research", "Research"],
  ["metrics", "Success metrics"],
  ["principles", "Design principles"],
] as const;

export function TabularEditCaseStudy({
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
            {project.category} · Enterprise workspace
          </p>
          <h1 className="mt-6 max-w-5xl font-serif text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.98] text-foreground">
            Tabular Edit<br />Workspace
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-2xl">
            A bulk editing workspace for data stewards: inline editing across up to 10,000 records, with drafts,
            conflict resolution and data quality validation in one surface.
          </p>
          <dl className="mt-14 grid gap-6 border-y border-border py-7 sm:grid-cols-2 lg:grid-cols-4">
            <Fact label="Role" value="UX Owner, Customer 360" />
            <Fact label="Platform" value="Informatica MDM BUI" />
            <Fact label="Timeline" value="2024 – present" />
            <Fact label="Organization" value="Salesforce" />
          </dl>
          <ul className="mt-8 flex flex-wrap gap-2">
            {[
              "Inline editing",
              "Draft management",
              "Conflict resolution",
              "Multi-value fields",
              "Field group views",
              "Record creation & cloning",
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
            src={assetUrl(inlineShot)}
            alt="The Tabular Edit workspace with a lookup field in edit mode and drafted cells marked"
            caption="The workspace: a persistent table where stewards scan, compare and edit across records without opening a single record page."
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

            <CaseSection id="overview" eyebrow="Overview" title="One workspace that became two product-wide features">
              <p>
                Informatica MDM BUI had no way to edit multiple records at once with unstructured changes, without
                leaning on the rule-based editing experience. I designed a persistent table workspace where stewards
                edit inline across rows, hold work as drafts, resolve conflicts and publish in bulk, at up to 10,000
                records.
              </p>
              <p>
                Two capabilities that began inside this workspace, Draft Records and Conflict Resolution, have since
                grown into product-wide features with their own dedicated designers. A structural recommendation I made
                early and which was parked for cost is now the direction of an agentic editing experience I am
                designing today.
              </p>
              <dl className="mt-10 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-3">
                <Metric value="10,000" label="Records editable in a single workspace" />
                <Metric value="2" label="Features spun out product-wide" />
                <Metric value="Oct 2026" label="General availability for all customers" />
              </dl>
              <Quote>
                Stewards are not editing records one at a time in a table. They are working a dataset: reviewing,
                correcting, submitting.
              </Quote>
            </CaseSection>

            <CaseSection id="problem" eyebrow="The problem" title="No efficient path to bulk inline editing">
              <p>
                For stewards managing tens of thousands of records, the existing experience was not usability friction.
                It was a workflow blocker.
              </p>
              <div className="mt-10 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
                <Insight
                  title="Fragmented view"
                  body="Records were edited across separate pages, with no way to scan and compare them side by side."
                />
                <Insight
                  title="No draft state"
                  body="Every saved edit was committed immediately and went live. There was no space to work in progress."
                />
                <Insight
                  title="No selective publish"
                  body="Records published one at a time. Stewards could not stage a set and submit it together."
                />
                <Insight
                  title="Silent overwrites"
                  body="With no conflict detection, two stewards editing the same record overwrote each other invisibly."
                />
                <Insight
                  title="Rigid rule-based edits"
                  body="While a rule-based bulk edit existed for uniform operations, stewards had no way to make unstructured, ad-hoc changes across multiple records simultaneously."
                />
                <Insight
                  title="No power tools"
                  body="No inline copy and paste, no undo and redo, no free-form editing across a set of rows."
                />
              </div>
            </CaseSection>

            <CaseSection id="role" eyebrow="My role" title="End-to-end ownership as sole designer">
              <p>
                I am the UX Owner of Customer 360 within Informatica MDM BUI. Over six years I have designed the
                majority of core BUI features: record details, history, related records, bulk edit, my jobs and the
                surrounding steward workflows.
              </p>
              <p>
                Tabular Edit is one of the most significant additions to the Customer 360 product line, substantially
                improving efficiency and ease of use in master data management. I led it end to end, from discovery
                through delivery, as the sole designer on it. After designing the initial scope of Draft Records and
                Conflict Resolution inside this workspace, I handed each to a dedicated designer to carry forward as an
                independent product feature.
              </p>
              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                <Principle label="Product management" title="Scoping & strategy">
                  Feature scoping, customer research and roadmap alignment: shared territory on what to build and why.
                </Principle>
                <Principle label="Engineering" title="Hands-on feedback">
                  Behaviour design and feasibility, attending every engineering demo and feeding UX feedback directly
                  into implementation.
                </Principle>
                <Principle label="UX research" title="Study planning">
                  Planned the research study, defined its goals and ran sessions alongside the research team with key
                  customers.
                </Principle>
                <Principle label="Other designers" title="Continuity of intent">
                  Handed off spun-out features with their design intent intact, while holding ownership of the
                  workspace itself.
                </Principle>
              </div>
            </CaseSection>

            <CaseSection id="challenge" eyebrow="The design call" title="A structural call, made early">
              <JourneyStep
                title="The original proposal: Search as the single route in"
                body="Stewards would find records by attribute in Search and open them in the table. Bounded, clear and straightforward to scope. Search is already how stewards navigate BUI, so routing tabular access through it felt like continuity rather than constraint."
              />
              <JourneyStep
                title="The flaw, and what I proposed instead"
                body="Search retrieves records matching a field value. Stewards frequently need to work across clusters defined by relational or contextual logic: hierarchy, geography, workflow stage. Restricting access through Search restricted what could be edited together, and made no sense for creation, since you cannot search for a record that does not yet exist. I proposed a standalone records space clustered by Business Entity, where any filter logic could scope both bulk editing and record creation from one surface."
              />
              <JourneyStep
                title="Customers raised the same limitation, unprompted"
                body="In design reviews, key customers asked for entry points from BE Records lists and Hierarchy tables. Neither had been presented as an option. They also raised record creation inside the workspace, naming the same mismatch I had identified. BE Records list access is scoped for October 2026."
              />
              <JourneyStep
                title="What was parked is now the direction"
                body="As MDM moves toward agentic experiences, I am working with the research team on agentic bulk editing: dynamic, logic-defined clusters of records assembled and handed to the workspace without navigating fixed entry points. The access model I proposed is exactly what the agentic architecture enables."
              />
              <div className="mt-14 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-3">
                <Metric value="2024" label="Proposed, then parked for the investment it required" />
                <Metric value="2025" label="Customers surfaced the identical gap without prompting" />
                <Metric value="2026" label="Agentic direction built on the original access model" />
              </div>
              <p className="mt-10">
                Three years apart, the same conclusion. The proposal parked for being too large is now the architecture
                the product is building toward; the constraint analysis held, and the only variable was time.
              </p>
              <p className="mt-6">
                That agentic direction is now its own project, which I am designing:{" "}
                <Link
                  to="/portfolio/$slug"
                  params={{ slug: "cluster-detection-and-bulk-edit" }}
                  className="border-b border-foreground/30 pb-0.5 font-medium text-foreground transition-colors hover:border-foreground"
                >
                  Cluster Detection &amp; Bulk Edit Agent
                </Link>
                .
              </p>

            </CaseSection>

            <CaseSection id="timeline" eyebrow="Timeline" title="From discovery to general availability">
              <div className="mt-8 divide-y divide-border border-y border-border">
                <TimelineRow
                  when="Early 2024"
                  title="Discovery & scoping"
                  body="Problem framing for bulk inline editing, analysis of the entry point model and the recommendation for a standalone records workspace."
                />
                <TimelineRow
                  when="Late 2024 – early 2025"
                  title="Design & prototyping"
                  body="End-to-end design of inline editing, drafts, conflict resolution, undo/redo, clone and create flows."
                />
                <TimelineRow
                  when="October 2025"
                  title="Preview release to selected customers"
                  body="Basic workspace shipped behind a toggle, with Draft Records and Conflict Resolution in early form."
                />
                <TimelineRow
                  when="January – March 2026"
                  title="ABAC support & customer research"
                  body="Multi-row selection under ABAC designed; research sessions validated the entry point gap and surfaced demand for in-workspace creation."
                />
                <TimelineRow
                  when="May 2026"
                  title="Feature Ready Gate moves GA to October"
                  body="Dynamic field performance at 10,000 records and open defects blocked a July GA; leadership retargeted October 2026."
                />
                <TimelineRow
                  when="July 2026"
                  title="Preview: cloning, record creation, clipboard, ABAC and rules-based operations"
                  body="Cloning and the in-workspace record creation flow shipped alongside clipboard operations and ABAC support, as Preview with the toggle off by default, and announced publicly as an upcoming roadmap item."
                />
                <TimelineRow
                  when="October 2026"
                  title="General availability for all customers"
                  body="Full GA including Draft Records, the BE Records entry point and conflict resolution at scale."
                />
              </div>
            </CaseSection>

            <CaseSection id="walkthrough" eyebrow="Walkthrough" title="Ten capabilities, one workspace">
              <p>
                Each capability below answers a specific part of the steward's day. Together they form a single coherent
                loop: scope the set, edit inline, hold as draft, resolve what conflicts, publish what is valid.
              </p>

              <Feature
                title="Entry points"
                goal="Meet stewards where they already are"
                body="Stewards reach the workspace through existing workflows rather than a separate tool. Search is the original route; the BE Records list arrives in October 2026, with hierarchies and agentic access in exploration."
              >
                <Shot
                  src={assetUrl(searchShot)}
                  alt="Search screen with filters applied and an action menu open on a selected record set"
                  caption="Search. Stewards filter by attribute, select a record set and open the action menu. The workspace is one of several actions available."
                />
                <Shot
                  src={assetUrl(dialogShot)}
                  alt="Dialog asking the steward to choose an editing medium"
                  caption="Editing medium dialog. Choosing “Edit in a Table” makes the editing mode a deliberate decision rather than a default."
                />
                <Shot
                  src={assetUrl(beRecordsShot)}
                  alt="Business Entity records list with the option to launch the table workspace"
                  caption="BE Records list (October 2026). Scoping begins from an entity view rather than an attribute search, closing part of the cluster-by-context gap."
                />
              </Feature>

              <Feature
                title="Inline editing"
                goal="Edit any field without leaving the table"
                body="Clicking a cell renders the control for its field type: free text, picklist, date/time or lookup. RBAC and ABAC rules apply throughout, and data quality validation fires on field-level rules. Edits save as drafts immediately, and a blue dot marks the cell as both changed and unpublished."
              >
                <Shot
                  src={assetUrl(inlineShot)}
                  alt="Lookup field in edit mode with dirty state dots and a validation error indicator"
                  caption="A lookup field in edit mode, blue dirty-state dots on drafted values, and an error indicator on a cell that breaks a data quality rule. Hovering reveals exactly which rules the value fails."
                />
              </Feature>

              <Feature
                title="Draft records"
                goal="Work at your own pace, publish when ready"
                body="Drafts persist per steward and stay private until submitted. The same blue dot that marks a change marks it as unpublished, and a Show Edited Records toggle filters the table to unpublished work for pre-submit review."
                limitation="Drafts here do not yet sync in real time with the My Drafts workspace, a known architecture constraint planned for a later release."
              >
                <Shot
                  src={assetUrl(draftsShot)}
                  alt="Table filtered to only records with unpublished edits"
                  caption="Show Edited Records. The pre-submit review view: only records carrying unpublished edits, immediately before committing."
                />
              </Feature>

              <Feature
                title="Field group views"
                goal="Reach nested data without leaving the workspace"
                body="Field groups such as Address used to require a separate record view. Expanding a field group cell now reveals a sub-table of every instance for that record, editable in place, with new instances added without losing scroll position."
                limitation="A flat view, surfacing one nested field as a direct column, remains exploratory: without the full instance in view, editing and deleting carry real risk."
              >
                <Shot
                  src={assetUrl(nestedShot)}
                  alt="Field group cell expanded inline into a sub-table of instances"
                  caption="Nested field group view. The sub-table opens inside the workspace instead of routing the steward to a separate record page."
                />
                <Shot
                  src={assetUrl(flatShot)}
                  alt="Nested field surfaced as a direct column with blank cells where no instance matches"
                  caption="Flat view, under exploration. Blank cell behaviour and edit risk are still open questions, so the pattern ships only if they can be answered confidently."
                />
              </Feature>

              <Feature
                title="Multi-value fields"
                goal="View and edit multi-value fields inline"
                body="Values read as pills; entering edit mode opens a popover directly below the cell for adding, removing and changing values without disturbing the table layout. Text, integer, decimal, double and picklist types are supported."
                limitation="Because of the underlying component architecture, validation errors cannot yet be attributed to an individual value; they surface at field level."
              >
                <Shot
                  src={assetUrl(mvfShot)}
                  alt="Multi-value field in edit mode with a popover open below the cell"
                  caption="The popover opens below the cell so stewards manage values without losing their position in the table."
                />
              </Feature>

              <Feature
                title="Clone records"
                goal="Accelerate creation where records share structure"
                body="Where records are structurally similar, cloning lets stewards duplicate an existing record and change only what differs. Clones carry a distinct new-draft indicator, RBAC-restricted fields are omitted rather than blocking the action, and ABAC-blocked records fail outright instead of cloning partially."
                limitation="Ten records maximum per clone, for performance: ten data-heavy records currently take around twenty seconds."
              >
                <Shot
                  src={assetUrl(cloneSuccessShot)}
                  alt="Cloned rows at the top of the table marked with a new record indicator"
                  caption="Success state. Cloned rows sit at the top of the table, each marked “N” to distinguish new records from edited existing ones."
                />
                <Shot
                  src={assetUrl(cloneFailureShot)}
                  alt="Failure dialog listing records that could not be cloned with reasons"
                  caption="Failure dialog. Failed records are listed with reasons; the “Other Issues” group reflects current backend granularity and will expand as more detail becomes available."
                />
              </Feature>

              <Feature
                title="Create record"
                goal="Create new records without leaving the workspace"
                body="A new empty row appears on trigger, and a draft is created only once a value is entered. If the current view could hide mandatory fields, a recommendation dialog prompts the steward to switch before they attempt to submit."
                limitation="The workspace is reached through Search, which does not map to creation. The BE Records entry point and the agentic access model both resolve this tension."
              >
                <Shot
                  src={assetUrl(createDialogShot)}
                  alt="Dialog recommending a different view because mandatory fields may be missing"
                  caption="Default view recommendation. The steward is warned that the current view may be missing mandatory fields before they start."
                />
                <Shot
                  src={assetUrl(createDraftShot)}
                  alt="New draft row with the new record indicator and inline mandatory field errors"
                  caption="Draft created. The new-record indicator activates as values are entered; mandatory field errors appear inline and clear the way to submission."
                />
              </Feature>

              <Feature
                title="Conflict resolution"
                goal="Protect data integrity in a multi-user environment"
                body="A conflict arises when a draft's master record has been updated by someone else. Known conflicts surface immediately at record level; a full check runs at Submit in parallel batches of roughly 2,500 records, up to about twenty seconds for 10,000. Stewards resolve per record inline or use the View Conflicts flow for bulk resolution."
              >
                <Shot
                  src={assetUrl(conflictInlineShot)}
                  alt="Inline conflict notice offering to resolve or skip conflicts and submit the rest"
                  caption="Per-record resolution. Stewards can resolve, or skip conflicts and submit everything else: valid work is never blocked by problems elsewhere."
                />
                <Shot
                  src={assetUrl(conflictDialogShot)}
                  alt="Conflict resolution dialog comparing draft values against published values field by field"
                  caption="Bulk resolution. Every conflicting record together, with a field-by-field choice: keep the draft value, or accept the value the other steward published."
                />
              </Feature>

              <Feature
                title="Undo / redo"
                goal="Edit freely, knowing mistakes are reversible"
                body="The stack holds ten operations, and a bulk action counts as one: a paste across fifty cells takes a single undo step. Undoing inside a field group auto-opens it to show the affected fields, and edited cells flash as confirmation."
                limitation="Applying or clearing a filter currently resets the undo stack; the right interaction for this is still to be defined."
              >
                <Shot
                  src={assetUrl(undoShot)}
                  alt="Toast message explaining the ten step undo limit has been reached"
                  caption="Undo limit reached. The boundary of the safety net is communicated in the moment rather than discovered by surprise."
                />
              </Feature>

              <Feature
                title="Submit records"
                goal="Controlled publishing, where valid work always moves forward"
                body="Submit All publishes every draft; Submit Selected scopes the publish to checked rows. Error reporting is admin-controlled: with it off, errored records stay in draft behind an explanatory banner; with it on, non-blocking errors publish with validation indicators after a confirmation breakdown."
                limitation="Records entering a workflow process stay visible as greyed-out rows until a manual refresh, a known constraint we surface rather than hide."
              >
                <Shot
                  src={assetUrl(submitShot)}
                  alt="Submit confirmation dialog showing a breakdown of valid and errored records"
                  caption="Submit confirmation. A breakdown of valid against errored records precedes the commit."
                />
                <Shot
                  src={assetUrl(postSubmitShot)}
                  alt="Published rows greyed out and non-editable while the publish process runs"
                  caption="Post-submit state. Publishing rows are greyed and non-editable until refresh, a tradeoff communicated to the steward rather than concealed."
                />
              </Feature>
            </CaseSection>

            <CaseSection id="research" eyebrow="Research" title="Validated with key customers">
              <h3 className="font-serif text-2xl text-foreground">What customers confirmed</h3>
              <ul className="mt-5 space-y-4">
                <Bullet>The record-by-record workflow was untenable at scale; the need for inline bulk editing was unambiguous.</Bullet>
                <Bullet>Copy and paste across records was described as a baseline expectation, not a differentiator.</Bullet>
                <Bullet>Drafts and staged publishing were well received: stewards valued not being forced to publish immediately.</Bullet>
                <Bullet>Working across 10,000 records in one interface was named as a material efficiency gain.</Bullet>
              </ul>
              <h3 className="mt-12 font-serif text-2xl text-foreground">What they raised that we had anticipated</h3>
              <ul className="mt-5 space-y-4">
                <Bullet>Entry points from BE Records lists and Hierarchy tables, unprompted, echoing the original structural gap.</Bullet>
                <Bullet>Record creation inside the workspace, naming the same mismatch of routing creation through Search.</Bullet>
              </ul>
              <h3 className="mt-12 font-serif text-2xl text-foreground">What is still being studied</h3>
              <ul className="mt-5 space-y-4">
                <Bullet>Flat views of nested field groups: requirements and edge cases remain in active research.</Bullet>
                <Bullet>Agentic bulk editing: how stewards would work with dynamically assembled record clusters.</Bullet>
              </ul>
            </CaseSection>

            <CaseSection id="metrics" eyebrow="Scale and measures" title="What the workspace had to hold, and how it is judged">
              <p>
                The architectural parameters below are the real constraints the interaction model was designed against.
                The qualitative measures that follow are what the workspace is being assessed on, not yet reported
                production outcomes.
              </p>

              <dl className="mt-10 grid gap-px border-y border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
                <Scale value="10,000" unit="records" label="Continuous dataset capacity" note="One workspace holds the full set without pagination breaks or lost dirty state between edits." />
                <Scale value="10" unit="steps" label="Bounded undo and redo" note="A deterministic safety net sized for high-consequence database work rather than infinite history." />
                <Scale value="7" unit="months" label="Discovery to general availability" note="January to July 2026, sole designer across the entire interaction model." />
                <Scale value="2" unit="spin-offs" label="Features graduated to their own track" note="Draft Records and Conflict Resolution were incubated here, then handed to dedicated designers." />
              </dl>

              <h3 className="mt-14 font-serif text-3xl text-foreground">How success is assessed</h3>
              <div className="mt-8 grid gap-8 sm:grid-cols-2">
                <Principle label="Efficiency" title="Time and volume">
                  Average time to complete a bulk edit and publish, records edited per session, and the share of bulk
                  operations against single-record actions.
                </Principle>
                <Principle label="Data quality" title="Errors and conflicts">
                  Publish error rate over time, conflict frequency at submit, and draft discard rate as a signal of
                  editing confidence.
                </Principle>
                <Principle label="Adoption" title="Reach and return">
                  Share of eligible stewards using the workspace, session return frequency, and the distribution of
                  workspace size per session.
                </Principle>
                <Principle label="Satisfaction" title="Completion and support">
                  Share of sessions ending in a successful publish, CSAT and SUS from research, and support ticket
                  volume related to bulk editing.
                </Principle>
              </div>
            </CaseSection>

            <CaseSection id="principles" eyebrow="Design principles" title="The thinking behind every decision">
              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                <Principle label="Systems thinking" title="Systems design, not screen design">
                  Save model, validation model, conflict model and field type model each run on separate backend
                  mechanisms, and all of them must feel coherent to the steward.
                </Principle>
                <Principle label="Unit of work" title="The unit of work is the dataset">
                  This reframe drove dirty state, bulk scoping and the draft lifecycle. A surface designed around one
                  record fails the steward managing thousands.
                </Principle>
                <Principle label="Constraints" title="Map what cannot be built first">
                  Grid limits, conflict detection gaps and lifecycle edge cases shape direction early. Ignored
                  constraints become surprises at build time.
                </Principle>
                <Principle label="Translation" title="Translate in both directions">
                  Edits translate back into MDM, and backend outcomes translate forward into visible, actionable states.
                  The work is closing that loop, not just surfacing it.
                </Principle>
                <Principle label="Transparency" title="Never block the full picture">
                  Surface conflicts at the right granularity with a clear action path. Even where the backend cannot
                  guarantee completeness, the steward sees what is known and what is not.
                </Principle>
                <Principle label="Flow" title="Reduce decisions, not just clicks">
                  Auto-persist on click-out instead of an explicit save. One mental model, submit when ready, keeps
                  stewards in flow through long bulk sessions.
                </Principle>
              </div>
              <Quote>
                Constraints that are ignored become surprises at build time. Constraints that are designed around become
                decisions that hold.
              </Quote>
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
  return (
    <li className="relative pl-5 text-base leading-relaxed before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-foreground/40">
      {children}
    </li>
  );
}

function JourneyStep({ title, body }: { title: string; body: string }) {
  return (
    <article className="mt-12 border-t border-border pt-8">
      <h3 className="font-serif text-2xl text-foreground sm:text-3xl">{title}</h3>
      <p className="mt-4">{body}</p>
    </article>
  );
}

function Feature({
  title,
  goal,
  body,
  limitation,
  children,
}: {
  title: string;
  goal: string;
  body: string;
  limitation?: string;
  children: React.ReactNode;
}) {
  return (
    <article className="mt-16 border-t border-border pt-8">
      <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{goal}</p>
      <h3 className="mt-3 font-serif text-2xl text-foreground sm:text-3xl">{title}</h3>
      <p className="mt-5">{body}</p>
      {limitation && (
        <p className="mt-6 border-l-2 border-foreground/30 pl-5 text-sm leading-relaxed">
          <span className="font-medium text-foreground">Current limitation. </span>
          {limitation}
        </p>
      )}
      <div className="mt-8 space-y-10">{children}</div>
    </article>
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
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          className="block h-auto w-full"
        />
      </div>
      <figcaption className="mt-3 text-xs leading-relaxed text-muted-foreground">{caption}</figcaption>
    </figure>
  );
}

/** Architectural scale figure: the real parameter the design had to hold. */
function Scale({
  value,
  unit,
  label,
  note,
}: {
  value: string;
  unit: string;
  label: string;
  note: string;
}) {
  return (
    <div className="bg-card p-6">
      <dt className="flex items-baseline gap-2">
        <span className="font-serif text-[clamp(2.1rem,4vw,2.9rem)] leading-none text-foreground">{value}</span>
        <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{unit}</span>
      </dt>
      <dd className="mt-4">
        <span className="block text-sm font-medium text-foreground">{label}</span>
        <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">{note}</span>
      </dd>
    </div>
  );
}
