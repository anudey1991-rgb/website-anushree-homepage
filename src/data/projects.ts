import { assetUrl } from "@/lib/asset-url";
import clusterCardCover from "@/assets/cluster-agent/card-illustration.png.asset.json";
import mdmCardCover from "@/assets/master-data-management/00-card-illustration.jpg.asset.json";
import swiftCardCover from "@/assets/swiftaccess/00-card-illustration.jpg.asset.json";
import dataVizCardCover from "@/assets/data-visualization/00-card-cover.jpg.asset.json";

export const CATEGORIES = [

  "All",
  "Data Management",
  "Healthcare",
  "Aerospace",
  "Innovation",
  "Research",
  "Architecture",
] as const;

export type Category = (typeof CATEGORIES)[number];

/** Client or employer the work was designed for. */
export const ORGANIZATIONS = ["Salesforce", "Honeywell", "Philips Healthcare"] as const;
export type Organization = (typeof ORGANIZATIONS)[number];

export type Project = {
  slug: string;
  title: string;
  description: string;
  image: string;
  category: Exclude<Category, "All">;
  role: string;
  industry: string;
  duration: string;
  organization?: Organization;
  responsibilities: string[];
  originalUrl?: string;
  /** Optional per-project override of the NDA protection rule below. */
  isProtected?: boolean;
};


export const PROJECTS: Project[] = [
  {
    slug: "cluster-detection-and-bulk-edit",
    title: "Cluster Detection & Bulk Edit Agent",
    description: "An agent that finds clusters of broken records across master data before anyone goes looking, then hands the steward a workspace already scoped to fix them.",
    image: assetUrl(clusterCardCover),
    category: "Data Management",
    role: "Design Lead, 0→1",
    industry: "Enterprise SaaS",
    duration: "2026",
    organization: "Salesforce",
    responsibilities: [
      "Agent role and detection model",
      "End-to-end journey design",
      "Interactive prototype and walkthrough films",
      "Product strategy and scoping",
    ],
  },
  {

    slug: "agent-verified-data-survivorship",
    title: "Agent-Verified Data Survivorship",
    description: "An agentic copilot that cross-checks MDM survivorship decisions against real-world sources, right inside Slack, before bad data ever gets published.",
    image: "https://static.wixstatic.com/media/55b247_6a623ccd20d24bc1b48184110f48cb50~mv2.png/v1/fit/w_960,h_720,q_85,enc_avif,quality_auto/55b247_6a623ccd20d24bc1b48184110f48cb50~mv2.png",
    category: "Data Management",
    role: "Lead Product Designer",
    industry: "Enterprise SaaS",
    duration: "2024, 2025",
    organization: "Salesforce",
    responsibilities: ["Agentic workflow design", "Discovery and research", "Interaction design", "Design system contributions"],
    originalUrl: "https://www.anushreedey.com/agent-verified-survivorship-experience",
  },
  {
    slug: "tabular-edit-of-records",
    title: "Tabular Edit of Records",
    description: "A persistent table workspace for unstructured inline editing, validation and bulk publishing up to 10,000 MDM records without rigid rule-based workflows.",
    image: "https://static.wixstatic.com/media/55b247_1ff9699456fe48baa9a994e92872629d~mv2.png/v1/fit/w_960,h_720,q_85,enc_avif,quality_auto/55b247_1ff9699456fe48baa9a994e92872629d~mv2.png",
    category: "Data Management",
    role: "Lead Product Designer",
    industry: "Enterprise SaaS",
    duration: "2024",
    organization: "Salesforce",
    responsibilities: ["Information architecture", "Interaction design", "Usability testing", "Engineering partnership"],
    originalUrl: "https://www.anushreedey.com/tabular-edit-workspace-for-records",
  },
  {
    slug: "master-data-management",
    title: "Master Data Management",
    description: "The Customer 360 product line: taking enterprise master data management from legacy on-premise to cloud, a new visual language, and the first generation of AI inside the stewardship workflow.",
    image: assetUrl(mdmCardCover),
    category: "Data Management",
    role: "Lead Designer",
    industry: "Enterprise SaaS",
    duration: "2020 – present",
    organization: "Salesforce",
    responsibilities: ["End-to-end product design", "Data governance workflows", "Design system SME", "Cross-functional collaboration"],
  },
  {
    slug: "swiftaccess",
    title: "SwiftAccess",
    description: "A personalised access page that helps enterprise users quickly reach their assets and artefacts and prioritise the actions that matter most.",
    image: assetUrl(swiftCardCover),
    category: "Data Management",
    role: "Product Designer",
    industry: "Enterprise SaaS",
    duration: "2024",
    organization: "Salesforce",
    responsibilities: ["Discovery and research", "Information architecture", "Interaction design", "Usability testing"],
  },
  {
    slug: "data-visualization-creation-tool",
    title: "Data Visualization Creation Tool & Dashboard",
    description: "A first-generation MVP that authors data reports and graphical visualisation components, paired with a dashboard for consuming and acting on insights.",
    image: assetUrl(dataVizCardCover),
    category: "Data Management",
    role: "Product Designer",
    industry: "Enterprise Analytics",
    duration: "2020 – 2024",
    organization: "Salesforce",
    responsibilities: ["MVP definition", "Data visualization design", "Dashboard interaction design", "Prototyping"],
  },
  {
    slug: "blockchain-based-platform",
    title: "Blockchain Based Platform",
    description: "A blockchain-based platform service to manage transactions and supply chain for products used in the aviation industry.",
    image: "https://static.wixstatic.com/media/55b247_c2dd01c0f48741a9b98f86a1a20b9519~mv2.jpg/v1/fit/w_960,h_720,q_85,enc_avif,quality_auto/55b247_c2dd01c0f48741a9b98f86a1a20b9519~mv2.jpg",
    category: "Aerospace",
    role: "Product Designer",
    industry: "Aviation",
    duration: "2019",
    organization: "Honeywell",
    responsibilities: ["Domain research", "Workflow modeling", "Interaction design", "Stakeholder alignment"],
  },
  {
    slug: "flight-connectivity-simulation-system",
    title: "Flight Connectivity Simulation System",
    description: "A simulation environment for designing multiple Line Replaceable Units and planning their connectivity across aircraft systems.",
    image: "https://static.wixstatic.com/media/55b247_c43ab13e0f9249e1aa073da57dc00157~mv2.jpg/v1/fit/w_960,h_720,q_85,enc_avif,quality_auto/55b247_c43ab13e0f9249e1aa073da57dc00157~mv2.jpg",
    category: "Aerospace",
    role: "Product Designer",
    industry: "Aviation",
    duration: "2018",
    organization: "Honeywell",
    responsibilities: ["Simulation UX", "Systems thinking", "Interaction design", "Engineering partnership"],
  },
  {
    slug: "diagnostic-imaging-mri",
    title: "Diagnostic Imaging (MRI)",
    description: "A working software product capable of performing a majority of clinical tasks and workflows, with extensions and plug-ins for modality-specific tasks.",
    image: "https://static.wixstatic.com/media/55b247_9314b0140bf44907b8bd78ab8a899afd~mv2.jpg/v1/fit/w_960,h_720,q_85,enc_avif,quality_auto/55b247_9314b0140bf44907b8bd78ab8a899afd~mv2.jpg",
    category: "Healthcare",
    role: "Product Designer",
    industry: "Medical Imaging",
    duration: "2017, 2018",
    organization: "Philips Healthcare",
    responsibilities: ["Clinical workflow design", "Interaction design", "Extensibility framework", "Usability with clinicians"],
  },
  {
    slug: "clove",
    title: "Clove",
    description: "An online medical service offering free consultation and discounted products and services, created for a seamless and inclusive healthcare experience.",
    image: "https://static.wixstatic.com/media/55b247_6b09b0bae18c41f9a108aceaaf6a0e97~mv2.jpg/v1/fit/w_960,h_720,q_85,enc_avif,quality_auto/55b247_6b09b0bae18c41f9a108aceaaf6a0e97~mv2.jpg",
    category: "Healthcare",
    role: "Product Designer",
    industry: "Consumer Healthcare",
    duration: "2017",
    responsibilities: ["Service design", "User research", "Interaction design", "Visual design"],
  },
  {
    slug: "connecting-the-dots",
    title: "Connecting the Dots",
    description: "A new collaboration model for freelance workers to share skills and communicate within a co-working space.",
    image: "https://static.wixstatic.com/media/55b247_195ac59e71f945fb8c3c7f9ae8c5fb81~mv2.jpg/v1/fit/w_960,h_720,q_85,enc_avif,quality_auto/55b247_195ac59e71f945fb8c3c7f9ae8c5fb81~mv2.jpg",
    category: "Innovation",
    role: "Designer and Researcher",
    industry: "Future of Work",
    duration: "2016",
    responsibilities: ["Ethnographic research", "Concept design", "Service prototyping", "Speculative design"],
  },
  {
    slug: "autism-friendly-environment",
    title: "Autism Friendly Environment",
    description: "A redesign of urban spaces using technological and minimal architectural interventions to support people living with autism.",
    image: "https://static.wixstatic.com/media/55b247_3269f588475941988e5a877c56681f43~mv2.jpg/v1/fit/w_960,h_720,q_85,enc_avif,quality_auto/55b247_3269f588475941988e5a877c56681f43~mv2.jpg",
    category: "Architecture",
    role: "Designer and Researcher",
    industry: "Inclusive Design",
    duration: "2015",
    responsibilities: ["Field research", "Inclusive design", "Spatial interventions", "Prototyping"],
  },
];

export const getProject = (slug: string) => PROJECTS.find((project) => project.slug === slug);

/** Every project in these categories is covered by an NDA. */
const PROTECTED_CATEGORIES: Array<Exclude<Category, "All">> = ["Data Management", "Aerospace"];

/** Individual projects outside those categories that are also under NDA. */
const PROTECTED_SLUGS = ["diagnostic-imaging-mri"];

export const isProtectedProject = (project: Project) =>
  project.isProtected ??
  (PROTECTED_CATEGORIES.includes(project.category) || PROTECTED_SLUGS.includes(project.slug));

