import { Link } from "@tanstack/react-router";
import logoMark from "@/assets/anushree-logo.png";

export const SITE_NAV = [
  { label: "Home", id: "home" },
  { label: "Portfolio", id: "portfolio" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];

/**
 * Shared site shell header. On the homepage it uses in-page anchors and
 * highlights the section currently in view. On every other page the same
 * tabs link back to the matching homepage section.
 */
export function SiteHeader({ active, onHome = false }: { active?: string; onHome?: boolean }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
        {onHome ? (
          <a href="#home" className="group flex items-center gap-3 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" aria-label="Anushree Dey home">
            <img src={logoMark} alt="" aria-hidden className="h-9 w-9 object-contain" />
            <span className="text-sm font-medium tracking-[-0.01em] text-foreground">Anushree Dey</span>
          </a>
        ) : (
          <Link to="/" className="group flex items-center gap-3 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" aria-label="Anushree Dey home">
            <img src={logoMark} alt="" aria-hidden className="h-9 w-9 object-contain" />
            <span className="text-sm font-medium tracking-[-0.01em] text-foreground">Anushree Dey</span>
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
                href="https://www.linkedin.com/in/anushreedey"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </nav>

        <span className="w-9 md:hidden" aria-hidden />

      </div>
    </header>
  );
}
