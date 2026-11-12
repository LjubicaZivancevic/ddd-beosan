import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { sr } from "@/content/sr";

const AUTOPLAY_MS = 5000;

/** Koliko slika stoji u nizu za datu širinu ekrana. */
function perViewFor(width: number) {
  if (width < 640) return 1;
  if (width < 1024) return 2;
  return 3;
}

export function GallerySlider() {
  const slides = sr.gallery.slides;
  const total = slides.length;
  const [perView, setPerView] = useState(3);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchX = useRef<number | null>(null);

  // Broj pozicija = koliko različitih grupa od `perView` slika možemo da prikažemo.
  const maxIndex = Math.max(0, total - perView);
  const positions = maxIndex + 1;

  useEffect(() => {
    const update = () => {
      const next = perViewFor(window.innerWidth);
      setPerView(next);
      setIndex((i) => Math.min(i, Math.max(0, total - next)));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [total]);

  const go = useCallback((i: number) => setIndex(((i % positions) + positions) % positions), [positions]);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer.current = setInterval(() => setIndex((i) => (i >= maxIndex ? 0 : i + 1)), AUTOPLAY_MS);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [paused, maxIndex]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") go(index - 1);
    if (e.key === "ArrowRight") go(index + 1);
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={sr.gallery.title}
      tabIndex={0}
      onKeyDown={onKey}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={(e) => { touchX.current = e.touches[0]?.clientX ?? null; setPaused(true); }}
      onTouchEnd={(e) => {
        const start = touchX.current;
        touchX.current = null;
        setPaused(false);
        if (start == null) return;
        const dx = (e.changedTouches[0]?.clientX ?? start) - start;
        if (Math.abs(dx) > 48) go(index + (dx < 0 ? 1 : -1));
      }}
      className="group relative outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {/* Traka sa slikama — pomera se za jednu sliku ulevo/udesno */}
      <div className="overflow-hidden px-1 py-1">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${index * (100 / perView)}%)` }}
        >
          {slides.map((s, i) => (
            <div
              key={s.src}
              aria-hidden={i < index || i >= index + perView}
              className="shrink-0 px-2"
              style={{ width: `${100 / perView}%` }}
            >
              <figure className="relative overflow-hidden rounded-2xl shadow-lift transition duration-500 hover:-translate-y-1 hover:shadow-soft">
                <div className="aspect-[4/3] w-full">
                  <img
                    src={s.src}
                    alt={s.alt}
                    loading={i < perView ? "eager" : "lazy"}
                    className="h-full w-full object-cover transition duration-700 hover:scale-[1.04]"
                  />
                </div>
                <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-primary-deep/85 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <p className="font-display text-base font-bold leading-snug text-primary-deep-foreground sm:text-lg">
                    {s.caption}
                  </p>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>

      {/* Strelice */}
      <button
        type="button"
        onClick={() => go(index - 1)}
        aria-label={sr.gallery.prev}
        className="absolute -left-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-card/90 text-primary-deep shadow-soft transition hover:bg-card sm:-left-5 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
      >
        <ChevronLeft className="h-5 w-5" aria-hidden />
      </button>
      <button
        type="button"
        onClick={() => go(index + 1)}
        aria-label={sr.gallery.next}
        className="absolute -right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-card/90 text-primary-deep shadow-soft transition hover:bg-card sm:-right-5 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
      >
        <ChevronRight className="h-5 w-5" aria-hidden />
      </button>

      {/* Tačke + brojač */}
      <div className="mt-7 flex items-center justify-center gap-4">
        <div className="flex justify-center gap-2">
          {Array.from({ length: positions }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`${sr.gallery.title} — ${i + 1}`}
              aria-current={i === index}
              className={`h-2 rounded-full transition-all duration-300 ${i === index ? "w-7 bg-accent" : "w-2 bg-primary-deep/25 hover:bg-primary-deep/50"}`}
            />
          ))}
        </div>
        <p className="shrink-0 text-sm font-bold text-primary-deep/70">
          {index + 1} / {positions}
        </p>
      </div>
    </div>
  );
}
