import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { sr } from "@/content/sr";

const AUTOPLAY_MS = 5000;

export function GallerySlider() {
  const slides = sr.gallery.slides;
  const total = slides.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchX = useRef<number | null>(null);

  const go = useCallback((i: number) => setIndex(((i % total) + total) % total), [total]);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer.current = setInterval(() => setIndex((i) => (i + 1) % total), AUTOPLAY_MS);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [paused, total]);

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
      className="group relative overflow-hidden rounded-2xl shadow-lift outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="relative aspect-[4/3] w-full sm:aspect-[16/9]">
        {slides.map((s, i) => (
          <div
            key={s.src}
            aria-hidden={i !== index}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${i === index ? "opacity-100" : "pointer-events-none opacity-0"}`}
          >
            <img src={s.src} alt={s.alt} loading={i === 0 ? "eager" : "lazy"} className="h-full w-full object-cover" />
          </div>
        ))}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-primary-deep/85 to-transparent" />
      </div>

      {/* Caption + counter */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-7">
        <p className="font-display text-lg font-bold text-primary-deep-foreground sm:text-2xl">{slides[index]!.caption}</p>
        <p className="shrink-0 rounded-full bg-primary-deep-foreground/15 px-3.5 py-1.5 text-sm font-bold text-primary-deep-foreground backdrop-blur">
          {index + 1} / {total}
        </p>
      </div>

      {/* Arrows */}
      <button
        type="button"
        onClick={() => go(index - 1)}
        aria-label={sr.gallery.prev}
        className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-card/90 text-primary-deep shadow-soft transition hover:bg-card sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
      >
        <ChevronLeft className="h-5 w-5" aria-hidden />
      </button>
      <button
        type="button"
        onClick={() => go(index + 1)}
        aria-label={sr.gallery.next}
        className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-card/90 text-primary-deep shadow-soft transition hover:bg-card sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
      >
        <ChevronRight className="h-5 w-5" aria-hidden />
      </button>

      {/* Dots */}
      <div className="absolute inset-x-0 bottom-24 flex justify-center gap-2 sm:bottom-28">
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => go(i)}
            aria-label={`${sr.gallery.title} — ${i + 1}`}
            aria-current={i === index}
            className={`h-2 rounded-full transition-all duration-300 ${i === index ? "w-7 bg-accent" : "w-2 bg-primary-deep-foreground/50 hover:bg-primary-deep-foreground/80"}`}
          />
        ))}
      </div>
    </div>
  );
}
