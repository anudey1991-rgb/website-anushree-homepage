import { assetUrl } from "@/lib/asset-url";
import { Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { BackToProjects } from "@/components/BackToProjects";
import { ProjectCard } from "@/components/ProjectCard";
import { CaseStudyToc, CaseStudyJumpBar, useSectionNav, type TocSection } from "@/components/CaseStudyToc";
import type { Project } from "@/data/projects";

import recordNewUi from "@/assets/master-data-management/01-record-details-new-ui.png.asset.json";
import recordTheme from "@/assets/master-data-management/02-record-page-new-theme.png.asset.json";
import recordProposal from "@/assets/master-data-management/03-record-details-ux-proposal.png.asset.json";
import recordOptimised from "@/assets/master-data-management/04-optimized-components.png.asset.json";
import mergeSearch from "@/assets/master-data-management/05-merge-search-results.png.asset.json";
import mergeSelect from "@/assets/master-data-management/06-merge-select-duplicates.png.asset.json";
import mergeTrigger from "@/assets/master-data-management/07-merge-trigger.png.asset.json";
import mergeRecords from "@/assets/master-data-management/08-merge-records.png.asset.json";
import relatedEntities from "@/assets/master-data-management/09-related-business-entities.png.asset.json";
import relatedProps from "@/assets/master-data-management/10-related-record-component-properties.png.asset.json";
import nestedGroups from "@/assets/master-data-management/11-nested-field-groups.jpg.asset.json";
import productOverview from "@/assets/master-data-management/12-product-overview.png.asset.json";
import productClaire from "@/assets/master-data-management/13-product-overview-claire.png.asset.json";
import hierarchySuggested from "@/assets/master-data-management/14-product-hierarchy-suggested.png.asset.json";
import hierarchyAdded from "@/assets/master-data-management/15-product-hierarchy-added.png.asset.json";
import productRelationships from "@/assets/master-data-management/16-product-relationships.png.asset.json";
import supplierOverview from "@/assets/master-data-management/17-supplier-overview.png.asset.json";
import supplierClaire from "@/assets/master-data-management/18-supplier-overview-claire.png.asset.json";
import supplierEnriched from "@/assets/master-data-management/19-supplier-esg-enriched.png.asset.json";
import supplierCollapsed from "@/assets/master-data-management/20-supplier-claire-collapsed.png.asset.json";
import supplierSource from "@/assets/master-data-management/21-supplier-source-data.png.asset.json";
import dataModel from "@/assets/master-data-management/22-data-model.png.asset.json";
import dataModelNested from "@/assets/master-data-management/23-data-model-nested-field.png.asset.json";
import layoutDesigner from "@/assets/master-data-management/24-layout-designer.png.asset.json";
import configEntities from "@/assets/master-data-management/25-c360-config-entities.png.asset.json";
import configLayouts from "@/assets/master-data-management/26-c360-config-layouts.png.asset.json";
import rolePermissions from "@/assets/master-data-management/27-role-permissions.png.asset.json";

const SECTIONS: readonly TocSection[] = [
  ["overview", "Overview"],
  ["arc", "The arc of the product"],
  ["role", "My role"],
  ["record", "The master record"],
  ["merge", "Merge and duplicates"],
  ["relationships", "Relationships"],
  ["nested", "Nested data"],
  ["ai", "Introducing AI"],
  ["config", "The configuration side"],
  ["scale", "Scale and impact"],
] as const;

export function MasterDataManagementCaseStudy({
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
            {project.category} · Customer 360
          </p>
          <h1 className="mt-6 max-w-5xl font-serif text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.98] text-foreground">
            Master Data
            <br />
            Management
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-2xl">
            The enterprise product line where business users turn millions of conflicting customer, product and supplier
            records into one trusted version of the truth. I led its move from on-premise legacy to cloud, then through a
            full visual re-platform and the first generation of AI inside the workflow.
          </p>
          <dl className="mt-14 grid gap-6 border-y border-border py-7 sm:grid-cols-2 lg:grid-cols-4">
            <Fact label="Role" value="Lead Designer" />
            <Fact label="Platform" value="Informatica IDMC" />
            <Fact label="Timeline" value="2020 – present" />
            <Fact label="Organization" value="Salesforce" />
          </dl>
          <ul className="mt-8 flex flex-wrap gap-2">
            {[
              "Enterprise product design",
              "Information architecture",
              "Data visualisation patterns",
              "Design system SME",
              "Cloud re-platform",
              "Generative AI in workflow",
            ].map((tag) => (
              <li key={tag} className="rounded-full border border-border px-3.5 py-1.5 text-xs text-muted-foreground">
                {tag}
              </li>
            ))}
          </ul>
        </section>

        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Shot
            src={assetUrl(recordNewUi)}
            alt="A Customer 360 master record page showing trusted values, contributing sources and related data sections"
            caption="The master record: one trusted view assembled from every contributing source system, with history, relationships and metadata one click away."
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

            <CaseSection id="overview" eyebrow="Overview" title="One trusted record, assembled from systems that disagree">
              <p>
                Master data management is the discipline of making an organisation agree with itself. The same customer
                exists in a billing system, a CRM, a support desk and three regional spreadsheets, each with a different
                address, a different legal name and a different idea of whether the account is still active. Customer 360
                is where a data steward resolves that disagreement into a single record the rest of the business can
                trust.
              </p>
              <p>
                This is the product line I own. It is not a single feature story: it spans the migration of a legacy
                on-premise application to cloud, the redesign of the core stewardship workflows for datasets an order of
                magnitude larger, a full visual re-platform onto a new design language, and the first generation of
                generative AI placed inside the record itself rather than bolted on as a chat window.
              </p>
              <Quote>
                The hard part of master data management is not storing the data. It is making a human confident enough to
                publish it.
              </Quote>
            </CaseSection>

            <CaseSection id="arc" eyebrow="The arc of the product" title="Five chapters, one continuous product line">
              <div className="mt-8 divide-y divide-border border-y border-border">
                <TimelineRow
                  when="Chapter one"
                  title="Customer 360 on-premise"
                  body="The legacy application. Capable, but built around one record at a time, with a data model and interaction language that assumed small, tidy datasets."
                />
                <TimelineRow
                  when="Chapter two"
                  title="Customer 360 cloud"
                  body="A re-platform onto the cloud data management ecosystem. Not a port: workflows were redefined for scalability, performance and collaboration with adjacent products."
                />
                <TimelineRow
                  when="Chapter three"
                  title="New and updated features"
                  body="Capabilities the legacy product could not express at all. Related records, related business entities, nested field groups, and cross-functional flows that borrow from the wider platform."
                />
                <TimelineRow
                  when="Chapter four"
                  title="A new UI theme"
                  body="A migration to a new visual design language, with the core features redesigned rather than restyled, and component density optimised for data-dense pages."
                />
                <TimelineRow
                  when="Chapter five"
                  title="AI integration and a tokenised system"
                  body="Generative AI folded into stewardship task flows, alongside a design system update that tokenises components for variable visual density and colour themes."
                />
              </div>
            </CaseSection>

            <CaseSection id="role" eyebrow="My role" title="Lead designer for the business user application, and an ecosystem voice beyond it">
              <p>
                My remit covers the application the business user lives in, and extends to the products around it. Two
                threads run through everything below: redesigning the experience for cloud scale, and holding the design
                conversation together from discovery to delivery.
              </p>
              <h3 className="mt-12 font-serif text-2xl text-foreground sm:text-3xl">Redesigning for cloud</h3>
              <ul className="mt-6 space-y-0">
                <Bullet>
                  Led the redesign of the core stewardship workflows against a new cloud architecture, so the product
                  could scale in both dataset size and performance.
                </Bullet>
                <Bullet>
                  Defined and solved use cases the legacy system simply could not express: very large datasets, deeply
                  nested data models, and relationships that cross business entities.
                </Bullet>
                <Bullet>
                  Shaped the experience of adjacent products in the family, Product 360 and Supplier 360, so the
                  ecosystem reads as one product rather than three.
                </Bullet>
                <Bullet>
                  Drove the end-to-end interface modernisation of the platform onto a new design language, including the
                  component density work that makes data-heavy pages readable.
                </Bullet>
              </ul>
              <h3 className="mt-12 font-serif text-2xl text-foreground sm:text-3xl">Driving the work from discovery to delivery</h3>
              <ul className="mt-6 space-y-0">
                <Bullet>
                  Partnered with product and engineering leadership to set scope and keep solutions tied to both user and
                  business goals.
                </Bullet>
                <Bullet>
                  Led design discussion across teams, holding clarity and alignment through the whole product lifecycle
                  rather than at handoff.
                </Bullet>
                <Bullet>
                  Worked alongside engineering through implementation so design quality and usability survived the build.
                </Bullet>
                <Bullet>
                  Acted as subject matter expert to the visual design and design system teams, defining global components
                  the whole suite now uses: page header, shell navigation, wizard, tabs, cards and history.
                </Bullet>
              </ul>
            </CaseSection>

            <CaseSection id="record" eyebrow="The master record" title="The page a steward opens a hundred times a day">
              <p>
                The record details page is the centre of gravity for the whole product. A steward comes here to do four
                things: see the trusted data assembled from every contributing source, change it and have those changes
                validated against the organisation's governance rules, inspect where each value came from along with its
                history and relationships, and export the record for use outside the platform.
              </p>
              <p>
                The layout of this page is not fixed by us. Each customer organisation composes it from data components.
                So my job was less about drawing one page and more about designing the vocabulary: a family of data
                visualisation patterns matched to data type and interaction, plus the guidelines that let a customer
                assemble a layout that is genuinely usable rather than merely possible.
              </p>

              <h3 className="mt-14 font-serif text-2xl text-foreground sm:text-3xl">Three stages of the same page</h3>
              <p className="mt-4">
                The record page was rebuilt in stages rather than in one leap. Each stage removed a specific class of
                problem: limited data type support, then usability and accessibility debt, then visual language and
                density.
              </p>
              <Shot
                src={assetUrl(recordProposal)}
                alt="The redesigned record details page in its first cloud phase"
                caption="Phase one of the cloud redesign: a broader range of data types and structures, and a layout that holds up when a record has hundreds of attributes."
              />
              <Shot
                src={assetUrl(recordTheme)}
                alt="The record page migrated to the new visual design theme"
                caption="The new visual theme applied to the record page. Features were redesigned to the new design language rather than skinned in it."
              />
              <Shot
                src={assetUrl(recordOptimised)}
                alt="Record page section after component density optimisation"
                caption="After component optimisation: tighter vertical rhythm so more of the record is legible in a single screen, without losing hit targets or accessibility."
              />
            </CaseSection>

            <CaseSection id="merge" eyebrow="Merge and duplicates" title="Deciding that two records are one record">
              <p>
                Data arriving from external sources brings duplicates with it. Before a record can be trusted, a steward
                has to confirm the data is accurate and that the same real-world entity is not sitting in the system
                three times. Merge is the flow where that judgement gets made, and it is consequential: merging is easy
                to do and expensive to undo.
              </p>
              <Shot
                src={assetUrl(mergeSearch)}
                alt="Search results listing candidate records for review"
                caption="The steward starts from search results, scanning candidates for entities that look like the same organisation under different names."
              />
              <Shot
                src={assetUrl(mergeSelect)}
                alt="Selecting duplicate records from the result set"
                caption="Selecting the candidate duplicates. Selection is explicit and reversible before anything is committed."
              />
              <Shot
                src={assetUrl(mergeTrigger)}
                alt="The control that triggers a merge for the selected records"
                caption="The merge action stays deliberately separate from selection, so a destructive operation is never one stray click away."
              />
              <Shot
                src={assetUrl(mergeRecords)}
                alt="The merge comparison view where surviving values are chosen"
                caption="The merge itself: competing values compared side by side so the steward composes the surviving master record consciously, field by field."
              />
            </CaseSection>

            <CaseSection id="relationships" eyebrow="Relationships" title="A record is rarely interesting on its own">
              <p>
                Legacy master data management treated a record as an island. In practice the value sits in the
                relationships: a subsidiary to its parent, a product to its supplier, a practitioner to the hospitals
                they operate in. Two new capabilities cover this, and they are deliberately distinct.
              </p>

              <h3 className="mt-14 font-serif text-2xl text-foreground sm:text-3xl">Related records within one business entity</h3>
              <p className="mt-4">
                Records inside the same business entity can be linked to each other by declaring the relationship to the
                master record. The steward can review, add, edit and validate those links in place, without leaving the
                record they came to work on.
              </p>

              <h3 className="mt-14 font-serif text-2xl text-foreground sm:text-3xl">Related business entities</h3>
              <p className="mt-4">
                The harder case is linking records that live in different business entities, where the relationship is
                declared upstream in the configuration system. Here the related entities are visualised as one set, so a
                steward can exchange data across them and build meaning from the combination rather than pivoting between
                screens and holding the join in their head.
              </p>
              <Shot
                src={assetUrl(relatedEntities)}
                alt="Records from related business entities grouped and visualised as one set"
                caption="Related business entities grouped into a single working set, which is what makes cross-entity stewardship feel like one task instead of three."
              />
              <Shot
                src={assetUrl(relatedProps)}
                alt="Related record component properties in the configuration product"
                caption="The same capability seen from the other side: the properties an administrator sets when placing the related-record component into a layout."
              />
            </CaseSection>

            <CaseSection id="nested" eyebrow="Nested data" title="Making depth navigable instead of merely present">
              <p>
                Enterprise data models nest, sometimes several levels deep. Rendering that faithfully is easy; making it
                workable is not. The nested field group design represents structure so a steward can move between levels
                deliberately, and edits the whole display section at once so a single validation step applies every
                change rather than one per field.
              </p>
              <p>
                Usability testing settled a real disagreement here. Stewards wanted a separate navigation region that
                exposes the shape of the data, so they could either jump to one focused level or see the entire nested
                structure at once in the details panel, depending on the task in front of them. Neither mode alone was
                sufficient.
              </p>
              <Shot
                src={assetUrl(nestedGroups)}
                alt="Nested field groups with a structural navigation region beside the details panel"
                caption="Structure on the left, values on the right. The steward chooses between a focused level and the whole tree rather than the interface choosing for them."
              />
            </CaseSection>

            <CaseSection id="ai" eyebrow="Introducing AI" title="AI inside the record, not in a chat window beside it">
              <p>
                The first generation of generative AI in this product line targets enrichment, the most reliably tedious
                part of stewardship. Without AI, a steward manually works out which attributes are missing, goes and
                finds the values, and adds them one at a time. The design intent was to compress that loop while keeping
                the steward as the one who decides.
              </p>

              <h3 className="mt-14 font-serif text-2xl text-foreground sm:text-3xl">Enrichment by adding hierarchy</h3>
              <p className="mt-4">
                The assistant proposes the appropriate enrichments together with their values. Accepting a proposal adds
                it to the record, and the record keeps an icon marking that value as AI-suggested, so provenance survives
                the decision.
              </p>
              <Shot
                src={assetUrl(productOverview)}
                alt="A product record overview before any AI assistance"
                caption="The starting point: a product record with gaps a steward would otherwise have to identify and fill by hand."
              />
              <Shot
                src={assetUrl(productClaire)}
                alt="The AI panel open alongside the product record"
                caption="The assistant opens alongside the record rather than replacing it, so the data being changed stays in view during the decision."
              />
              <Shot
                src={assetUrl(hierarchySuggested)}
                alt="AI-suggested hierarchy enrichment with proposed values"
                caption="Suggested enrichments arrive with their values attached, which is what turns a recommendation into something a steward can actually judge."
              />
              <Shot
                src={assetUrl(hierarchyAdded)}
                alt="The record after an AI-suggested hierarchy has been accepted"
                caption="After acceptance, the added hierarchy stays marked as AI-suggested. Attribution is permanent, not a transient toast."
              />
              <Shot
                src={assetUrl(productRelationships)}
                alt="Product relationships view after enrichment"
                caption="The enriched relationships in context, which is where downstream teams feel the benefit of the enrichment."
              />

              <h3 className="mt-14 font-serif text-2xl text-foreground sm:text-3xl">Enrichment from another supplier record</h3>
              <p className="mt-4">
                The second case is harder and more valuable. Manually, a steward links categories and records by hand,
                choosing which attributes and values should contribute to the master. With assistance, the system
                proposes candidate supplier records, the steward picks the right one, and the system registers it as a
                contributing source and fills the missing attributes from it.
              </p>
              <Shot
                src={assetUrl(supplierOverview)}
                alt="A supplier record overview with missing attributes"
                caption="A supplier record with attribute gaps, the state that normally triggers a manual hunt across source systems."
              />
              <Shot
                src={assetUrl(supplierClaire)}
                alt="AI suggesting candidate supplier records for a product"
                caption="Candidate supplier records proposed for the product. The steward still makes the identity call, because that is the consequential judgement."
              />
              <Shot
                src={assetUrl(supplierEnriched)}
                alt="Supplier record after ESG attributes have been enriched"
                caption="The record after enrichment: the selected supplier is now a registered source, and the missing values arrive with it."
              />
              <Shot
                src={assetUrl(supplierSource)}
                alt="Source data view showing contributing systems for the supplier record"
                caption="Source data stays inspectable, so an enriched value can always be traced back to the system that supplied it."
              />
              <Shot
                src={assetUrl(supplierCollapsed)}
                alt="The supplier record with the AI panel collapsed"
                caption="The assistant collapses away entirely. It is a capability the steward summons, not a permanent tax on screen space."
              />
              <Quote>
                An assistant that cannot be dismissed is not an assistant. It is furniture.
              </Quote>
            </CaseSection>

            <CaseSection id="config" eyebrow="The configuration side" title="Business 360: where the technical user sets the rules">
              <p>
                Every flexible thing in Customer 360 is flexible because someone configured it. Business 360 is the
                companion product where the IT team defines the data model, composes record layouts, wires business
                entities into the application and assigns permissions. Designing both sides meant the freedom offered to
                an administrator and the experience delivered to a steward had to be designed as one system.
              </p>
              <Shot
                src={assetUrl(dataModel)}
                alt="Designing a customer data model with its fields"
                caption="The data model: the fields and structure a customer organisation defines for its own entities."
              />
              <Shot
                src={assetUrl(dataModelNested)}
                alt="Drilling into a nested field within the data model"
                caption="Drilling into a nested field. The structural depth an administrator creates here is exactly the depth the steward has to navigate later."
              />
              <Shot
                src={assetUrl(layoutDesigner)}
                alt="The layout designer used to compose a customer record page"
                caption="The layout designer, where a record page is composed from data components. My component guidelines live here in practice."
              />
              <Shot
                src={assetUrl(configEntities)}
                alt="Configuring which business entity data models the application uses"
                caption="Registering the business entity data models the application will use."
              />
              <Shot
                src={assetUrl(configLayouts)}
                alt="Attaching layout designs to configured business entities"
                caption="Attaching the layout designs to those entities, the step that makes a configured model visible to a steward."
              />
              <Shot
                src={assetUrl(rolePermissions)}
                alt="Assigning role privileges for records and for attributes within records"
                caption="Permissions work at two grains: whole records, and individual attributes inside them. Attribute-level control is what makes the product viable in regulated environments."
              />
            </CaseSection>

            <CaseSection id="scale" eyebrow="Scale and impact" title="What owning this product line actually involves">
              <p>
                This is a platform product rather than a feature, so the meaningful figures are about reach and
                structure, not a conversion lift.
              </p>
              <dl className="mt-10 grid gap-px border-y border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
                <Scale value="3" unit="products" label="Shaped across the family" note="Customer 360 owned end to end, with Product 360 and Supplier 360 shaped toward one ecosystem experience." />
                <Scale value="2" unit="sides" label="Steward and administrator" note="The business user application and the Business 360 configuration product designed as a single system." />
                <Scale value="6+" unit="components" label="Global patterns defined as SME" note="Page header, shell navigation, wizard, tabs, cards and history, now used across the suite." />
                <Scale value="5" unit="chapters" label="From on-premise to AI" note="Legacy, cloud re-platform, new capabilities, new visual language, and generative AI in the workflow." />
              </dl>
              <h3 className="mt-14 font-serif text-2xl text-foreground sm:text-3xl">What this work set up</h3>
              <p className="mt-4">
                The patterns established here are the foundation the later deep dives build on. The dataset-as-unit-of-work
                reframe behind the tabular edit workspace, and the governed agent behaviour behind cluster detection and
                survivorship, are all extensions of decisions made in this product line.
              </p>
              <Quote>
                Platform design is mostly the discipline of making other people's later decisions turn out well.
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

function Bullet({ children }: { children: React.ReactNode }) {
  return <li className="border-t border-border pt-4 text-base leading-relaxed">{children}</li>;
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

/** Architectural scale figure: reach and structure rather than a growth number. */
function Scale({ value, unit, label, note }: { value: string; unit: string; label: string; note: string }) {
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
