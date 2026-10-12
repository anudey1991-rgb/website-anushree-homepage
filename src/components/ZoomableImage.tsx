import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

/**
 * Case-study screenshot that opens at full resolution in an overlay.
 * Closes with the Close button, the Escape key or a click outside the image.
 */
export function ZoomableImage({
  src,
  alt,
  priority = false,
  className = "block h-auto w-full",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Enlarge image: ${alt}`}
        className="block w-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <img src={src} alt={alt} loading={priority ? "eager" : "lazy"} className={className} />
      </button>
      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center overflow-auto bg-foreground/85 p-4 sm:p-10"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              autoFocus
              className="fixed right-4 top-4 rounded-full border border-background/40 bg-foreground px-4 py-2 text-sm font-medium text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background"
            >
              Close
            </button>
            <img
              src={src}
              alt={alt}
              onClick={(event) => event.stopPropagation()}
              className="max-h-full max-w-full cursor-default rounded-sm bg-background object-contain"
            />
          </div>,
          document.body,
        )}
    </>
  );
}
