import { useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";

const EMAIL = "anushree.d@hotmail.com";

type Entry = {
  id: string;
  question: string;
  answer: string[];
};

/**
 * Curated answers only. Every statement here comes from the portfolio content
 * and the resume, so the assistant can never invent a claim.
 */
const ENTRIES: Entry[] = [
  {
    id: "enterprise_software",
    question: "What is Anushree's experience designing enterprise software?",
    answer: [
      "She is a Lead Product & User Experience Designer with experience across enterprise technology, healthcare and aerospace.",
      "At Salesforce (formerly Informatica) since October 2020, she leads design for Master Data Management, including the transition of legacy on-premises products to cloud-native platforms and new features that expanded the core product scope.",
      "Before that, she was a User Experience Designer II in Aerospace at Honeywell, working on cockpit and aircraft management systems, and a contract designer for healthcare digital services at Philips Healthcare.",
    ],
  },
  {
    id: "enterprise_ai_ux",
    question: "What are her core skills in enterprise and AI experience design?",
    answer: [
      "As Design Lead, she took an agentic AI capability from 0 to 1. It detects data quality issues, clusters related records by root cause and proposes bulk resolutions, delivered headlessly through MCP (Model Context Protocol) across AI copilot surfaces.",
      "She led GenAI copilot integration in data management workflows and designed a trust-tiered, cross-surface experience model that matches information depth to each surface's authentication context.",
      "Her other skills include design strategy, user research and usability testing, design systems and visual design, accessibility, and prototyping and interaction design in Figma.",
    ],
  },
  {
    id: "salesforce_projects",
    question: "Which projects has she led at Salesforce?",
    answer: [
      "Master Data Management (Customer 360), as lead designer across the product line since 2020.",
      "Cluster Detection and Bulk Edit Agent, as design lead on a 0 to 1 agent experience.",
      "Agent-Verified Data Survivorship, Tabular Edit of Records, SwiftAccess, and the data visualisation creation tool and dashboard.",
    ],
  },
  {
    id: "cross_functional",
    question: "How does she work across functions and teams?",
    answer: [
      "She works with product management, engineering and research from discovery through delivery, and has carried projects end to end as the sole designer.",
      "She partners with product architecture and backend engineering through POCs to define key end-to-end workflows.",
      "At Honeywell she defined cross-product strategy and ran co-creation workshops with global stakeholders and domain experts.",
    ],
  },
  {
    id: "leadership",
    question: "What are her design leadership qualities?",
    answer: [
      "She leads design through every phase of product development, from research and ideation to delivery, and helped the MDM products keep their Gartner market leader status.",
      "She mentors junior designers and advocates UX best practices and design thinking within cross-functional agile teams.",
      "She is available for senior and lead roles in enterprise systems, data platforms and intelligent workflows.",
    ],
  },
];

export function ResumeAssistant() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const active = ENTRIES.find((entry) => entry.id === activeId) ?? null;

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close resume assistant"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 cursor-default bg-foreground/20 sm:hidden"
        />
      )}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex flex-col items-end gap-3 px-4 pb-4 sm:px-6 sm:pb-6">
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Resume assistant"
          className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-card shadow-[0_30px_80px_-30px_oklch(0.22_0.02_260/0.45)]"
        >
          <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Resume assistant
              </p>
              <p className="mt-1 font-serif text-lg text-foreground">Ask about my work</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close resume assistant"
              className="rounded-full border border-border px-2 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Close
            </button>
          </div>

          <div className="max-h-[60vh] overflow-y-auto px-5 py-5">
            {active ? (
              <div>
                <button
                  type="button"
                  onClick={() => setActiveId(null)}
                  className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  ← All questions
                </button>
                <p className="mt-4 text-sm font-medium text-foreground">{active.question}</p>
                <div className="mt-4 space-y-3">
                  {active.answer.map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-relaxed text-muted-foreground">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ) : (
              <ul className="space-y-2">
                {ENTRIES.map((entry) => (
                  <li key={entry.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveId(entry.id);
                        track("assistant_question_viewed", { question_id: entry.id });
                      }}
                      className="w-full rounded-lg border border-border px-4 py-3 text-left text-sm leading-snug text-foreground transition-colors hover:bg-secondary"
                    >
                      {entry.question}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="border-t border-border bg-secondary/50 px-5 py-4">
            <p className="text-xs leading-relaxed text-muted-foreground">
              Have a different question? Email me at{" "}
              <a
                href={`mailto:${EMAIL}?subject=${encodeURIComponent("Question about your work")}`}
                onClick={() => track("assistant_email_clicked")}
                className="border-b border-foreground/30 pb-0.5 font-medium text-foreground hover:border-foreground"
              >
                {EMAIL}
              </a>
              .
            </p>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => {
          setOpen((value) => {
            if (!value) track("assistant_opened");
            return !value;
          });
        }}
        aria-expanded={open}
        className="pointer-events-auto inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background shadow-lg transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <span aria-hidden>✦</span>
        {open ? "Hide assistant" : "Ask about my resume"}
      </button>
      </div>
    </>
  );
}
