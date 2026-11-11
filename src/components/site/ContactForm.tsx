import { useState, type FormEvent } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { company, sr, tel } from "@/content/sr";

const f = sr.contact.form;
type Field = "name" | "phone" | "email" | "service" | "message";
const empty = { name: "", phone: "", email: "", service: "", message: "" };

export function validate(v: typeof empty) {
  const e: Partial<Record<Field, string>> = {};
  if (v.name.trim().length < 2) e.name = f.errors.name;
  if (!/^[+\d][\d\s/-]{5,}$/.test(v.phone.trim())) e.phone = f.errors.phone;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = f.errors.email;
  if (!v.service) e.service = f.errors.service;
  if (v.message.trim().length < 10) e.message = f.errors.message;
  return e;
}

export function ContactForm() {
  const [v, setV] = useState(empty);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [done, setDone] = useState(false);

  const submit = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate(v);
    setErrors(e);
    if (Object.keys(e).length === 0) setDone(true);
  };

  const input = "w-full rounded-lg border border-input bg-card px-4 py-3 text-foreground outline-none transition placeholder:text-muted-foreground/70 focus:border-primary focus:ring-4 focus:ring-ring/15 aria-[invalid=true]:border-destructive";
  const field = (k: Field, label: string, el: React.ReactNode) => (
    <div className={k === "message" || k === "service" ? "sm:col-span-2" : ""}>
      <label htmlFor={`f-${k}`} className="mb-1.5 block text-sm font-semibold text-foreground">{label}</label>
      {el}
      {errors[k] && <p id={`e-${k}`} className="mt-1.5 text-sm text-destructive">{errors[k]}</p>}
    </div>
  );
  const common = (k: Field) => ({
    id: `f-${k}`, name: k, value: v[k], "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `e-${k}` : undefined,
    onChange: (e: { target: { value: string } }) => setV({ ...v, [k]: e.target.value }),
    className: input,
  });

  if (done) return (
    <div role="status" className="flex h-full flex-col items-center justify-center rounded-2xl border border-border bg-card p-10 text-center shadow-soft">
      <CheckCircle2 className="h-14 w-14 text-primary" aria-hidden />
      <h3 className="mt-5 text-2xl font-bold text-primary-deep">{f.successTitle}</h3>
      <p className="mt-3 max-w-sm text-muted-foreground">{f.successText}</p>
      <a href={tel(company.phones[0])} className="mt-6 font-display text-xl font-bold text-primary">{company.phones[0]}</a>
      <button type="button" onClick={() => { setV(empty); setDone(false); }} className="mt-6 text-sm font-semibold text-muted-foreground underline underline-offset-4 hover:text-foreground">{f.again}</button>
    </div>
  );

  return (
    <form noValidate onSubmit={submit} className="grid gap-5 rounded-2xl border border-border bg-card p-6 shadow-soft sm:grid-cols-2 sm:p-8">
      {field("name", f.name, <input {...common("name")} autoComplete="name" />)}
      {field("phone", f.phone, <input {...common("phone")} type="tel" autoComplete="tel" inputMode="tel" />)}
      {field("email", f.email, <input {...common("email")} type="email" autoComplete="email" />)}
      {field("service", f.service, (
        <select {...common("service")}>
          <option value="">{f.servicePlaceholder}</option>
          {sr.services.items.map((s) => <option key={s.key} value={s.key}>{s.title}</option>)}
          <option value="ostalo">{f.serviceOther}</option>
        </select>
      ))}
      {field("message", f.message, <textarea {...common("message")} rows={5} />)}
      <div className="sm:col-span-2">
        <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-7 py-3.5 font-bold text-primary-foreground shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift sm:w-auto">
          <Send className="h-4 w-4" aria-hidden /> {f.submit}
        </button>
      </div>
    </form>
  );
}
