import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { company, sr, tel } from "@/content/sr";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || open ? "bg-card/95 shadow-soft backdrop-blur" : "bg-transparent"}`}>
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-5 py-3 lg:px-8">
        <a href="#pocetna" className="flex items-center gap-3" aria-label={`${company.name} — početna`}>
          <img src="/images/deratizacije_beo_san_logo.jpg" alt={`${company.name} logo`} width={48} height={48} className="h-12 w-12 rounded-full bg-card object-cover ring-1 ring-border" />
          <span className={`font-display text-lg font-bold leading-none ${scrolled || open ? "text-primary-deep" : "text-primary-deep-foreground"}`}>
            Beo San <span className="text-primary">D.D.D</span>
          </span>
        </a>
        <nav aria-label="Glavna navigacija" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {sr.nav.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className={`text-sm font-semibold transition-colors hover:text-primary ${scrolled ? "text-foreground" : "text-primary-deep-foreground/90"}`}>{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <a href={tel(company.phones[0])} className="hidden items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift sm:inline-flex">
            <Phone className="h-4 w-4" aria-hidden /> {company.phones[0]}
          </a>
          <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "Zatvori meni" : "Otvori meni"}
            className={`rounded-lg p-2.5 lg:hidden ${scrolled || open ? "text-primary-deep" : "text-primary-deep-foreground"}`}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobilna navigacija" className="border-t border-border bg-card px-5 pb-6 lg:hidden">
          <ul className="flex flex-col py-2">
            {sr.nav.map((n) => (
              <li key={n.id}><a onClick={() => setOpen(false)} href={`#${n.id}`} className="block border-b border-border py-3.5 font-semibold text-foreground">{n.label}</a></li>
            ))}
          </ul>
          <a href={tel(company.phones[0])} className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3.5 font-bold text-primary-foreground">
            <Phone className="h-4 w-4" aria-hidden /> {company.phones[0]}
          </a>
        </nav>
      )}
    </header>
  );
}
