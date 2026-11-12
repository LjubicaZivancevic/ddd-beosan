import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight, BadgeCheck, Bug, Building2, CalendarCheck, Check, Clock, CloudFog, Factory, FlaskConical, Hospital, Hotel, Home, Mail, MapPin,
  Phone, Rat, ShieldCheck, SprayCan, Target, UserCheck, Users, Warehouse, Wheat, Facebook, Instagram,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { ContactForm } from "@/components/site/ContactForm";
import { GallerySlider } from "@/components/site/GallerySlider";
import { Reveal } from "@/components/site/Reveal";
import { company, sr, tel } from "@/content/sr";

const title = "Beo San D.D.D — Deratizacija, dezinsekcija i dezinfekcija | Beograd";
const description = "Profesionalne DDD usluge u Beogradu: deratizacija, dezinsekcija (suzbijanje insekata) i dezinfekcija prostora za domove, firme, restorane i ustanove.";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", name: company.name, logo: "LOGO_URL", telephone: company.phones },
    {
      "@type": "LocalBusiness", name: company.name, telephone: company.phones[0], email: company.email,
      address: { "@type": "PostalAddress", streetAddress: "ADRESA", addressLocality: company.city, addressCountry: "RS" },
      areaServed: company.city, openingHours: "RADNO_VREME",
      makesOffer: sr.services.items.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title } })),
    },
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "keywords", content: "deratizacija, dezinsekcija, dezinfekcija, DDD usluge, profesionalna deratizacija, suzbijanje insekata, dezinfekcija prostora, Beograd" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "sr_RS" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
  }),
  component: Index,
});

const serviceIcons = { deratizacija: Rat, dezinsekcija: Bug, dezinfekcija: SprayCan, fumigacija: CloudFog } as const;
const whyIcons = [ShieldCheck, UserCheck, FlaskConical, Target, Users, CalendarCheck];
const industryIcons = [Home, Hotel, Wheat, Warehouse, Building2, Hospital];

const btnPrimary = "inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-7 py-3.5 font-bold text-primary-foreground shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift";
const btnGhost = "inline-flex items-center justify-center gap-2 rounded-lg border border-primary-deep-foreground/40 px-7 py-3.5 font-bold text-primary-deep-foreground transition hover:bg-primary-deep-foreground/10";

function SectionHead({ eyebrow, title, text, light }: { eyebrow: string; title: string; text?: string; light?: boolean }) {
  return (
    <Reveal className="max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className={`mt-3 text-3xl font-bold leading-tight sm:text-4xl ${light ? "text-primary-deep-foreground" : "text-primary-deep"}`}>{title}</h2>
      {text && <p className={`mt-4 text-lg ${light ? "text-primary-deep-foreground/75" : "text-muted-foreground"}`}>{text}</p>}
    </Reveal>
  );
}

function Index() {
  const year = new Date().getFullYear();
  return (
    <>
      <Header />
      <main>
        {/* HERO */}
        <section id="pocetna" className="relative isolate overflow-hidden bg-primary-deep">
          <img src="/images/beo_san_prevoz.jpg" alt="Službeno vozilo Beo San D.D.D ispred stambenog objekta u Beogradu" fetchPriority="high"
            className="absolute inset-0 -z-10 h-full w-full object-cover object-[70%_center] opacity-45 lg:left-auto lg:w-[55%] lg:opacity-100" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary-deep via-primary-deep/90 to-primary-deep/40 lg:via-primary-deep lg:via-45% lg:to-transparent" />
          <div className="mx-auto grid min-h-[100svh] max-w-7xl items-center px-5 pb-16 pt-32 lg:grid-cols-12 lg:px-8">
            <div className="lg:col-span-7">
              <p className="eyebrow !text-accent">{sr.hero.eyebrow}</p>
              <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] text-primary-deep-foreground sm:text-5xl lg:text-6xl">{sr.hero.title}</h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-primary-deep-foreground/80">{sr.hero.text}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href={tel(company.phones[0])} className={btnPrimary}><Phone className="h-4 w-4" aria-hidden />{sr.hero.call}</a>
                <a href="#kontakt" className={btnGhost}>{sr.hero.offer}<ArrowRight className="h-4 w-4" aria-hidden /></a>
              </div>
              <div className="mt-10 flex max-w-xl items-start gap-3 border-t border-primary-deep-foreground/15 pt-6">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
                <p className="text-sm text-primary-deep-foreground/75">{sr.hero.trust}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="o-nama" className="py-24 lg:py-32">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:px-8">
            <Reveal className="relative">
              <img src="/images/tim_beo_san.jpg" alt="Tim Beo San D.D.D u zaštitnoj opremi spreman za dezinfekciju" loading="lazy"
                className="aspect-[4/3.6] w-full rounded-2xl object-cover shadow-lift" />
              <div className="absolute -bottom-6 left-6 flex items-center gap-3 rounded-xl bg-card p-4 pr-6 shadow-lift">
                <img src="/images/deratizacije_beo_san_logo.jpg" alt="" className="h-12 w-12 rounded-full object-cover" loading="lazy" />
                <div><p className="font-display font-bold text-primary-deep">{company.name}</p><p className="text-sm text-muted-foreground">{company.city}</p></div>
              </div>
            </Reveal>
            <div>
              <SectionHead eyebrow={sr.about.eyebrow} title={sr.about.title} />
              <Reveal delay={100}>
                {sr.about.text.map((t) => <p key={t} className="mt-5 text-lg leading-relaxed text-muted-foreground">{t}</p>)}
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {sr.about.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 font-semibold text-foreground">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-primary"><Check className="h-3.5 w-3.5" aria-hidden /></span>{p}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="usluge" className="bg-secondary py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHead eyebrow={sr.services.eyebrow} title={sr.services.title} />
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {sr.services.items.map((s, i) => {
                const Icon = serviceIcons[s.key as keyof typeof serviceIcons];
                return (
                  <Reveal key={s.key} delay={i * 100}>
                    <article className="group flex h-full flex-col rounded-2xl border border-border bg-card p-8 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift">
                      <div className="flex items-center justify-between">
                        <span className="grid h-14 w-14 place-items-center rounded-xl bg-primary text-primary-foreground transition group-hover:bg-primary-deep"><Icon className="h-7 w-7" aria-hidden /></span>
                        <span className="font-display text-4xl font-bold text-border">0{i + 1}</span>
                      </div>
                      <h3 className="mt-7 text-2xl font-bold text-primary-deep">{s.title}</h3>
                      <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">{s.text}</p>
                      <a href="#kontakt" className="mt-7 inline-flex items-center gap-2 font-bold text-primary" aria-label={`${sr.services.more} — ${s.title}`}>
                        {sr.services.more}<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
                      </a>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* WHY */}
        <section className="bg-primary-deep py-24 lg:py-32" aria-labelledby="zasto-mi">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div id="zasto-mi"><SectionHead eyebrow={sr.why.eyebrow} title={sr.why.title} light /></div>
            <div className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-primary-deep-foreground/10 sm:grid-cols-2 lg:grid-cols-3">
              {sr.why.items.map((w, i) => {
                const Icon = whyIcons[i]!;
                return (
                  <div key={w.title} className="bg-primary-deep p-8 transition hover:bg-primary-deep-foreground/5">
                    <Icon className="h-8 w-8 text-accent" strokeWidth={1.6} aria-hidden />
                    <h3 className="mt-5 text-lg font-bold text-primary-deep-foreground">{w.title}</h3>
                    <p className="mt-2 text-primary-deep-foreground/70">{w.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* PREPARATI */}
        <section id="preparati" className="py-24 lg:py-32">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:px-8">
            <div>
              <SectionHead eyebrow={sr.preparati.eyebrow} title={sr.preparati.title} text={sr.preparati.text} />
              <Reveal delay={100}>
                <ul className="mt-8 space-y-3">
                  {sr.preparati.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 font-semibold text-foreground">
                      <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />{p}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
            <Reveal delay={150}>
              <div className="rounded-2xl border border-border bg-card p-8 shadow-soft">
                <p className="eyebrow">{sr.preparati.brandsTitle}</p>
                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {sr.preparati.brands.map((b) => (
                    <div key={b} className="grid place-items-center rounded-xl border border-border bg-secondary px-4 py-6 text-center font-display text-lg font-bold text-primary-deep">
                      {b}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* GALLERY */}
        <section id="galerija" className="bg-secondary py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid items-end gap-8 lg:grid-cols-2">
              <SectionHead eyebrow={sr.gallery.eyebrow} title={sr.gallery.title} text={sr.gallery.text} />
            </div>
            <Reveal className="mt-12" delay={100}>
              <GallerySlider />
            </Reveal>
          </div>
        </section>

        {/* INDUSTRIES */}
        <section id="kome-pruzamo-usluge" className="py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHead eyebrow={sr.industries.eyebrow} title={sr.industries.title} text={sr.industries.text} />
            <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-3">
              {sr.industries.items.map((t, i) => {
                const Icon = industryIcons[i]!;
                return (
                  <Reveal key={t} delay={i * 60}>
                    <div className="group flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-5 transition hover:border-primary hover:shadow-soft sm:flex-row sm:items-center sm:p-6">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-accent text-primary transition group-hover:bg-primary group-hover:text-primary-foreground"><Icon className="h-6 w-6" aria-hidden /></span>
                      <h3 className="font-display text-base font-semibold text-primary-deep sm:text-lg">{t}</h3>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-5 lg:px-8" aria-labelledby="cta-title">
          <Reveal className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center sm:px-12 lg:py-20">
            <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[40px] border-primary-foreground/10" />
            <div aria-hidden className="absolute -bottom-32 -left-16 h-72 w-72 rounded-full border-[40px] border-primary-foreground/10" />
            <h2 id="cta-title" className="relative mx-auto max-w-2xl text-3xl font-bold text-primary-foreground sm:text-4xl">{sr.cta.title}</h2>
            <p className="relative mx-auto mt-4 max-w-xl text-lg text-primary-foreground/85">{sr.cta.text}</p>
            <div className="relative mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={tel(company.phones[0])} className="inline-flex items-center justify-center gap-2 rounded-lg bg-card px-7 py-3.5 font-bold text-primary-deep shadow-lift transition hover:-translate-y-0.5"><Phone className="h-4 w-4" aria-hidden />{sr.hero.call}</a>
              <a href="#kontakt" className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary-foreground/50 px-7 py-3.5 font-bold text-primary-foreground transition hover:bg-primary-foreground/10">{sr.hero.offer}<ArrowRight className="h-4 w-4" aria-hidden /></a>
            </div>
          </Reveal>
        </section>

        {/* CONTACT */}
        <section id="kontakt" className="py-24 lg:py-32">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-5 lg:px-8">
            <div className="lg:col-span-2">
              <SectionHead eyebrow={sr.contact.eyebrow} title={sr.contact.title} text={sr.contact.text} />
              <ul className="mt-10 space-y-6">
                <li className="flex gap-4"><Icon><Phone className="h-5 w-5" /></Icon><div><p className="text-sm text-muted-foreground">{sr.contact.labels.phone}</p>{company.phones.map((p) => <a key={p} href={tel(p)} className="block font-display text-lg font-bold text-primary-deep hover:text-primary">{p}</a>)}</div></li>
                <li className="flex gap-4"><Icon><Mail className="h-5 w-5" /></Icon><div><p className="text-sm text-muted-foreground">{sr.contact.labels.email}</p><a href={`mailto:${company.email}`} className="font-semibold text-foreground hover:text-primary">{company.email}</a></div></li>
                <li className="flex gap-4"><Icon><MapPin className="h-5 w-5" /></Icon><div><p className="text-sm text-muted-foreground">{sr.contact.labels.address}</p><p className="font-semibold">{company.address}, {company.city}</p></div></li>
                <li className="flex gap-4"><Icon><Clock className="h-5 w-5" /></Icon><div><p className="text-sm text-muted-foreground">{sr.contact.labels.hours}</p><p className="font-semibold">{company.hours}</p></div></li>
              </ul>
            </div>
            <Reveal className="lg:col-span-3" delay={100}><ContactForm /></Reveal>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-primary-deep text-primary-deep-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          <div>
            <img src="/images/deratizacije_beo_san_logo.jpg" alt={`${company.name} logo`} className="h-20 w-20 rounded-full bg-card object-cover" loading="lazy" />
            <p className="mt-5 text-sm leading-relaxed text-primary-deep-foreground/70">{sr.footer.text}</p>
          </div>
          <FooterCol title={sr.footer.nav}>{sr.nav.map((n) => <li key={n.id}><a href={`#${n.id}`} className="hover:text-primary-deep-foreground">{n.label}</a></li>)}</FooterCol>
          <FooterCol title={sr.footer.services}>{sr.services.items.map((s) => <li key={s.key}><a href="#usluge" className="hover:text-primary-deep-foreground">{s.title}</a></li>)}</FooterCol>
          <FooterCol title={sr.footer.contact}>
            {company.phones.map((p) => <li key={p}><a href={tel(p)} className="hover:text-primary-deep-foreground">{p}</a></li>)}
            <li><a href={`mailto:${company.email}`} className="hover:text-primary-deep-foreground">{company.email}</a></li>
            <li className="flex gap-3 pt-3">
              <a href="#" aria-label="Facebook (uskoro)" className="grid h-10 w-10 place-items-center rounded-lg bg-primary-deep-foreground/10 hover:bg-primary"><Facebook className="h-4 w-4" /></a>
              <a href="#" aria-label="Instagram (uskoro)" className="grid h-10 w-10 place-items-center rounded-lg bg-primary-deep-foreground/10 hover:bg-primary"><Instagram className="h-4 w-4" /></a>
            </li>
          </FooterCol>
        </div>
        <div className="border-t border-primary-deep-foreground/10 py-6 text-center text-sm text-primary-deep-foreground/60">© {year} {company.name}, {company.city}. {sr.footer.rights}</div>
      </footer>
    </>
  );
}

function Icon({ children }: { children: React.ReactNode }) {
  return <span aria-hidden className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent text-primary">{children}</span>;
}
function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return <div><h3 className="font-display text-sm font-bold uppercase tracking-widest text-primary-deep-foreground">{title}</h3><ul className="mt-5 space-y-2.5 text-sm text-primary-deep-foreground/70">{children}</ul></div>;
}
