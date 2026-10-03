/**
 * Shown when a portfolio filter has no projects yet. Reusable anywhere a
 * list of case studies can be empty.
 */
export function EmptyCategoryState({
  category,
  onReset,
}: {
  category?: string;
  onReset?: () => void;
}) {
  return (
    <div className="col-span-full flex flex-col items-center rounded-xl border border-dashed border-border bg-card/60 px-6 py-20 text-center">
      <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
        {category ? category : "Case studies"}
      </p>
      <h3 className="mt-4 font-serif text-3xl leading-tight text-foreground">
        More case studies coming soon
      </h3>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
        I am putting together new work for this area. In the meantime, the rest of my portfolio is a click away.
      </p>
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="mt-8 inline-flex min-h-[40px] items-center gap-2 rounded-full border border-foreground/25 bg-background px-5 py-2 text-sm font-medium text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          View all projects <span aria-hidden>→</span>
        </button>
      )}
    </div>
  );
}
