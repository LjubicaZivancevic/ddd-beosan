import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { sr } from "@/content/sr";

const AUTOPLAY_MS = 5000;

function perViewFor(width: number) {
  if (width < 640) return 1;
  if (width < 1024) return 2;
  return 3;
}

export function GallerySlider() {
  const slides = sr.gallery.slides;
  const total = slides.length;
  const [perView, setPerView] = useState(3);
  // pos = indeks u proširenoj traci (klonovi na oba kraja omogućavaju beskrajnu petlju)
  const [pos, setPos] = useState(3);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      const next = perViewFor(window.innerWidth);
      setPerView((prev) => {
        if (prev !== next) { setAnimate(false); setPos(next); }
        return next;
      });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const extended = [...slides.slice(-perView), ...slides, ...slides.slice(0, perView)];
  const real = (((pos - perView) % total) + total) % total;

  const step = useCallback((d: number) => { setAnimate(true); setPos((p) => p + d); }, []);

  const onTransitionEnd = () => {
    if (pos >= total + perView) { setAnimate(false); setPos(pos - total); }
    else if (pos < perView) { setAnimate(false); setPos(pos + total); }
  };

  // ponovo uključi animaciju posle "skoka" bez prelaza
  useEffect(() => {
    if (animate) return;
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
    return () => cancelAnimationFrame(id);
  }, [animate]);

  useEffect(() => {
    if (paused || lightbox !== null || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => step(1), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [paused, lightbox, step]);

  return (
    <>
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label={sr.gallery.title}
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "ArrowLeft") step(-1); if (e.key === "ArrowRight") step(1); }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={(e) => { touchX.current = e.touches[0]?.clientX ?? null; setPaused(true); }}
        onTouchEnd={(e) => {
          const start = touchX.current;
          touchX.current = null;
          setPaused(false);
          if (start == null) return;
          const dx = (e.changedTouches[0]?.clientX ?? start) - start;
          if (Math.abs(dx) > 48) step(dx < 0 ? 1 : -1);
        }}
        className="group relative outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <div className="overflow-hidden py-2">
          <div
            onTransitionEnd={onTransitionEnd}
            className={`flex ${animate ? "transition-transform duration-700 ease-out" : ""}`}
            style={{ transform: `translateX(-${pos * (100 / perView)}%)` }}
          >
            {extended.map((s, i) => (
              <div key={`${s.src}-${i}`} className="shrink-0 px-2" style={{ width: `${100 / perView}%` }}>
                <button
                  type="button"
                  onClick={() => setLightbox((((i - perView) % total) + total) % total)}
                  aria-label={`${sr.gallery.open}: ${s.alt}`}
                  className="block w-full cursor-zoom-in overflow-hidden rounded-2xl shadow-lift transition duration-500 hover:-translate-y-1 hover:shadow-soft"
                >
                  <div className="aspect-[4/5] w-full">
                    <img src={s.src} alt={s.alt} loading="lazy" className="h-full w-full object-cover transition duration-700 hover:scale-[1.04]" />
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>

        <button type="button" onClick={() => step(-1)} aria-label={sr.gallery.prev}
          className="absolute -left-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-card/90 text-primary-deep shadow-soft transition hover:bg-card sm:-left-5 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100">
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>
        <button type="button" onClick={() => step(1)} aria-label={sr.gallery.next}
          className="absolute -right-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-card/90 text-primary-deep shadow-soft transition hover:bg-card sm:-right-5 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100">
          <ChevronRight className="h-5 w-5" aria-hidden />
        </button>

        <div className="mt-7 flex items-center justify-center gap-4">
          <div className="flex justify-center gap-2">
            {slides.map((s, i) => (
              <button key={s.src} type="button" onClick={() => { setAnimate(true); setPos(i + perView); }}
                aria-label={`${sr.gallery.title} — ${i + 1}`} aria-current={i === real}
                className={`h-2 rounded-full transition-all duration-300 ${i === real ? "w-7 bg-accent" : "w-2 bg-primary-deep/25 hover:bg-primary-deep/50"}`} />
            ))}
          </div>
          <p className="shrink-0 text-sm font-bold text-primary-deep/70">{real + 1} / {total}</p>
        </div>
      </div>

      {lightbox !== null && (
        <Lightbox index={lightbox} onChange={setLightbox} onClose={() => setLightbox(null)} />
      )}
    </>
  );
}

function Lightbox({ index, onChange, onClose }: { index: number; onChange: (i: number) => void; onClose: () => void }) {
  const slides = sr.gallery.slides;
  const total = slides.length;
  const s = slides[index]!;
  const go = useCallback((d: number) => onChange((((index + d) % total) + total) % total), [index, total, onChange]);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [go, onClose]);

  return (
    <div role="dialog" aria-modal="true" aria-label={sr.gallery.title}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-primary-deep/95 p-4 backdrop-blur-sm"
      onClick={onClose}
      onTouchStart={(e) => { touchX.current = e.touches[0]?.clientX ?? null; }}
      onTouchEnd={(e) => {
        const start = touchX.current; touchX.current = null;
        if (start == null) return;
        const dx = (e.changedTouches[0]?.clientX ?? start) - start;
        if (Math.abs(dx) > 48) go(dx < 0 ? 1 : -1);
      }}
    >
      <img key={s.src} src={s.src} alt={s.alt} onClick={(e) => e.stopPropagation()}
        className="max-h-[88vh] max-w-full rounded-xl object-contain shadow-lift animate-in fade-in duration-300" />
      <button type="button" onClick={onClose} aria-label={sr.gallery.close}
        className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-card/90 text-primary-deep shadow-soft hover:bg-card">
        <X className="h-5 w-5" aria-hidden />
      </button>
      <button type="button" onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label={sr.gallery.prev}
        className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-card/90 text-primary-deep shadow-soft hover:bg-card sm:left-6">
        <ChevronLeft className="h-5 w-5" aria-hidden />
      </button>
      <button type="button" onClick={(e) => { e.stopPropagation(); go(1); }} aria-label={sr.gallery.next}
        className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-card/90 text-primary-deep shadow-soft hover:bg-card sm:right-6">
        <ChevronRight className="h-5 w-5" aria-hidden />
      </button>
      <p className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-card/90 px-4 py-1.5 text-sm font-bold text-primary-deep">
        {index + 1} / {total}
      </p>
    </div>
  );
}
