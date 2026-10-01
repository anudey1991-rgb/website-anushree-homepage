import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logoMark from "@/assets/anushree-logo.png";

export const SITE_NAV = [
  { label: "Home", id: "home" },
  { label: "Portfolio", id: "portfolio" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];

const LINKEDIN = "https://www.linkedin.com/in/anushreedey";

/**
 * Shared site shell header. On the homepage it uses in-page anchors and
 * highlights the section currently in view. On every other page the same
 * tabs link back to the matching homepage section. Below 768px the tabs
 * collapse into a menu.
 */
export function SiteHeader({ active, onHome = false }: { active?: string; onHome?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const brand = (
    <>
      <img src={logoMark} alt="" aria-hidden className="h-9 w-9 object-contain" />
      <span className="text-sm font-medium tracking-[-0.01em] text-foreground">Anushree Dey</span>
    </>
  );
  const brandClass =
    "group flex items-center gap-3 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
        {onHome ? (
          <a href="#home" className={brandClass} aria-label="Anushree Dey home">
            {brand}
          </a>
        ) : (
          <Link to="/" className={brandClass} aria-label="Anushree Dey home">
            {brand}
          </Link>
        )}

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm text-muted-foreground">
            {SITE_NAV.map((item) => {
              const isActive = onHome && active === item.id;
              const className = `relative rounded-sm py-1 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                isActive ? "text-foreground" : ""
              }`;
              const underline = (
                <span
                  className={`absolute -bottom-[3px] left-0 h-px bg-foreground transition-all duration-300 ${
                    isActive ? "w-full" : "w-0"
                  }`}
                />
              );
              return (
                <li key={item.id}>
                  {onHome ? (
                    <a href={`#${item.id}`} className={className} aria-current={isActive ? "true" : undefined}>
                      {item.label}
                      {underline}
                    </a>
                  ) : (
                    <Link to="/" hash={item.id} className={className}>
                      {item.label}
                      {underline}
                    </Link>
                  )}
                </li>
              );
            })}
            <li>
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((value) => !value)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="inline-flex h-10 min-w-[40px] items-center justify-center gap-1.5 rounded-full border border-border px-3 text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:hidden"
        >
          <span aria-hidden className="text-base leading-none">{menuOpen ? "✕" : "☰"}</span>
          <span className="text-xs uppercase tracking-[0.18em]">Menu</span>
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Primary mobile"
          className="border-t border-border/60 bg-background md:hidden"
        >
          <ul className="mx-auto max-w-7xl px-6 py-3 text-sm">
            {SITE_NAV.map((item) => (
              <li key={item.id} className="border-b border-border/50 last:border-b-0">
                {onHome ? (
                  <a
                    href={`#${item.id}`}
                    onClick={() => setMenuOpen(false)}
                    className="flex min-h-[48px] items-center text-foreground"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    to="/"
                    hash={item.id}
                    onClick={() => setMenuOpen(false)}
                    className="flex min-h-[48px] items-center text-foreground"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
            <li className="border-t border-border/50">
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="flex min-h-[48px] items-center text-foreground"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
