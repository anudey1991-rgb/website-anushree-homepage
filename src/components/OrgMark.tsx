import type { Organization } from "@/data/projects";

/**
 * Organisation indicator. Brand colour is carried by a small mark rather than a
 * reproduced logo file, so the badge stays legible at card scale and on both
 * light and dark surfaces.
 */
const BRAND: Record<Organization, { dot: string; label: string }> = {
  Salesforce: { dot: "#00A1E0", label: "Salesforce" },
  Honeywell: { dot: "#EE3124", label: "Honeywell" },
  "Philips Healthcare": { dot: "#0B5ED7", label: "Philips Healthcare" },
};

export function OrgMark({
  organization,
  size = "sm",
}: {
  organization: Organization;
  size?: "sm" | "md";
}) {
  const brand = BRAND[organization];

  return (
    <span
      className={
        size === "md"
          ? "inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs tracking-[0.06em] text-foreground"
          : "inline-flex items-center gap-2 rounded-full border border-border px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-muted-foreground"
      }
    >
      <span
        aria-hidden
        className="h-2 w-2 shrink-0 rounded-full"
        style={{ backgroundColor: brand.dot }}
      />
      <span className="whitespace-nowrap">{brand.label}</span>
    </span>
  );
}
