import { Link } from "@tanstack/react-router";

export function ProjectNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-center">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Project not found</p>
        <h1 className="mt-4 font-serif text-4xl text-foreground">This case study is unavailable.</h1>
        <Link to="/" hash="portfolio" className="mt-8 inline-block border-b border-foreground/30 pb-1 text-sm text-foreground">Return to portfolio</Link>
      </div>
    </main>
  );
}
