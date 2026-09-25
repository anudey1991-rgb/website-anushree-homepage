import { useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { BackToProjects } from "@/components/BackToProjects";
import { LockIcon } from "@/components/LockIcon";
import { SiteHeader } from "@/components/SiteHeader";
import { unlockProjects } from "@/lib/portfolio-gate.functions";
import type { Project } from "@/data/projects";

export function ProjectGate({ project }: { project: Project }) {
  const router = useRouter();
  const unlock = useServerFn(unlockProjects);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const password = String(new FormData(event.currentTarget).get("password") ?? "");
    if (!password.trim()) {
      setError("Please enter the access password.");
      return;
    }
    setPending(true);
    setError(null);
    try {
      const result = await unlock({ data: { password } });
      if (result.ok) {
        await router.invalidate();
      } else {
        setError("That password is not correct. Please try again or request access.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground font-sans antialiased">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-6 pb-24 pt-14 lg:px-10 lg:pt-20">
        <BackToProjects />

        <div className="mt-12 grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <LockIcon /> Protected by NDA
            </p>
            <p className="mt-8 text-xs uppercase tracking-[0.22em] text-muted-foreground">{project.category}</p>
            <h1 className="mt-5 font-serif text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.03] text-foreground">
              {project.title}
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              This case study covers confidential enterprise work and is protected by a
              non-disclosure agreement. Enter the access password to read it in full.
            </p>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Do not have the password? Email me at{" "}
              <a
                href={`mailto:anushree.d@hotmail.com?subject=${encodeURIComponent(`Access request: ${project.title}`)}`}
                className="rounded-sm border-b border-foreground/30 pb-0.5 font-medium text-foreground transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                anushree.d@hotmail.com
              </a>{" "}
              and I will share access.
            </p>
          </div>

          <div className="lg:col-span-5">
            <form
              onSubmit={onSubmit}
              className="rounded-lg border border-border bg-card p-8 shadow-sm"
              aria-labelledby="gate-heading"
            >
              <h2 id="gate-heading" className="font-serif text-2xl text-foreground">
                Enter access password
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                One password unlocks every protected case study for 7 days on this device.
              </p>

              <label htmlFor="gate-password" className="mt-8 block text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Password
              </label>
              <input
                id="gate-password"
                name="password"
                type="password"
                autoComplete="current-password"
                autoFocus
                aria-invalid={error ? "true" : undefined}
                aria-describedby={error ? "gate-error" : undefined}
                className="mt-3 h-11 w-full rounded-md border border-border bg-background px-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus-visible:border-foreground focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Access password"
              />

              <div aria-live="polite" className="min-h-6">
                {error && (
                  <p id="gate-error" className="mt-3 text-sm text-destructive">
                    {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={pending}
                className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {pending ? "Checking..." : "Unlock case study"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
