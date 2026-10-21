"use client";

import { useEffect, useId, useState, type FormEvent, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SectionHeading } from "@/components/section-heading";
import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { deliverWaitlist, validateWaitlist, type Role, type WaitlistErrors, type WaitlistPayload } from "@/lib/waitlist";

const fieldClass =
  "h-12 rounded-none border-line bg-page px-3.5 text-base text-shell placeholder:text-shade md:text-base";

export function PilotForm({ locale, t }: { locale: Locale; t: Dictionary["pilot"] }) {
  const baseId = useId();
  const searchParams = useSearchParams();
  const requestedRole = searchParams.get("as");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [homeType, setHomeType] = useState("");
  const [role, setRole] = useState<Role | "">("");

  useEffect(() => {
    if (requestedRole !== "center" && requestedRole !== "homeowner") return;
    setRole(requestedRole);
    if (requestedRole === "center") {
      setHomeType((current) => (current === "" ? "na" : current));
    }
  }, [requestedRole]);
  const [errors, setErrors] = useState<WaitlistErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState<WaitlistPayload | null>(null);

  function describedBy(field: keyof WaitlistErrors) {
    return errors[field] ? `${baseId}-${field}-error` : undefined;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = validateWaitlist({ name, email, phone, city, homeType, role });
    if (!result.ok) {
      setErrors(result.errors);
      const order: (keyof WaitlistErrors)[] = ["name", "email", "phone", "city", "homeType", "role"];
      const first = order.find((field) => result.errors[field]);
      if (first) {
        document.getElementById(`${baseId}-${first}`)?.focus();
      }
      return;
    }
    setErrors({});
    setBusy(true);
    const payload: WaitlistPayload = {
      ...result.value,
      locale,
      createdAt: new Date().toISOString(),
    };
    // TODO(backend): deliverWaitlist is a no-op. See src/lib/waitlist.ts.
    await deliverWaitlist(payload);
    setSaved(payload);
    setSubmitted(true);
    setBusy(false);
  }

  if (submitted && saved) {
    const homeLabel = t.homeTypes.find((item) => item.value === saved.homeType)?.label ?? saved.homeType;
    const roleLabel = t.roles.find((item) => item.value === saved.role)?.label ?? saved.role;
    return (
      <section id="pilot" className="scroll-mt-20 border-t border-line">
        <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="chamfer border border-line bg-card p-6 sm:p-10" role="status">
            <p className="kicker">{t.kicker}</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">{t.thanksTitle}</h2>
            <p className="mt-3 text-2xl font-medium">
              <bdi>{saved.name}</bdi>
            </p>
            <p className="mt-4 leading-relaxed text-shade">{t.thanksBody}</p>
            <p className="mt-3 leading-relaxed text-shade">{t.thanksDetail}</p>
            <h3 className="mt-8 text-sm text-shade">{t.summary}</h3>
            <dl className="mt-3 grid gap-2 text-sm">
              <SummaryRow label={t.email} value={saved.email} ltr />
              <SummaryRow label={t.phone} value={saved.phone} ltr />
              <SummaryRow label={t.city} value={saved.city} />
              <SummaryRow label={t.homeType} value={homeLabel} />
              <SummaryRow label={t.role} value={roleLabel} />
            </dl>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="mt-8"
              onClick={() => {
                setSubmitted(false);
                setSaved(null);
              }}
            >
              {t.again}
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="pilot" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.1fr)]">
        <SectionHeading kicker={t.kicker} title={t.title} intro={t.intro} />
        <form className="chamfer border border-line bg-card p-5 sm:p-8" onSubmit={onSubmit} noValidate>
          {Object.keys(errors).length > 0 ? (
            <p role="alert" className="mb-5 border border-alert px-3 py-2 text-sm text-shell">
              {t.required}
            </p>
          ) : null}
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label={t.name} id={`${baseId}-name`} error={errors.name ? t.errors.name : undefined} errorId={describedBy("name")}>
              <Input
                id={`${baseId}-name`}
                name="name"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                aria-invalid={errors.name || undefined}
                aria-describedby={describedBy("name")}
                className={fieldClass}
                required
              />
            </Field>
            <Field label={t.email} id={`${baseId}-email`} error={errors.email ? t.errors.email : undefined} errorId={describedBy("email")}>
              <Input
                id={`${baseId}-email`}
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                dir="ltr"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                aria-invalid={errors.email || undefined}
                aria-describedby={describedBy("email")}
                className={fieldClass}
                required
              />
            </Field>
            <Field label={t.phone} id={`${baseId}-phone`} error={errors.phone ? t.errors.phone : undefined} errorId={describedBy("phone")}>
              <Input
                id={`${baseId}-phone`}
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                dir="ltr"
                placeholder="05X-XXXXXXX"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                aria-invalid={errors.phone || undefined}
                aria-describedby={describedBy("phone")}
                className={fieldClass}
                required
              />
            </Field>
            <Field label={t.city} id={`${baseId}-city`} error={errors.city ? t.errors.city : undefined} errorId={describedBy("city")}>
              <Input
                id={`${baseId}-city`}
                name="city"
                autoComplete="address-level2"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                aria-invalid={errors.city || undefined}
                aria-describedby={describedBy("city")}
                className={fieldClass}
                required
              />
            </Field>
          </div>
          <div className="mt-5">
            <Field
              label={t.homeType}
              id={`${baseId}-homeType`}
              error={errors.homeType ? t.errors.homeType : undefined}
              errorId={describedBy("homeType")}
            >
              <div className="relative">
                <select
                  id={`${baseId}-homeType`}
                  name="homeType"
                  value={homeType}
                  onChange={(event) => setHomeType(event.target.value)}
                  aria-invalid={errors.homeType || undefined}
                  aria-describedby={describedBy("homeType")}
                  className={`${fieldClass} w-full appearance-none pe-10`}
                  required
                >
                  <option value="">{t.homeTypePlaceholder}</option>
                  {t.homeTypes.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-shade" aria-hidden="true" />
              </div>
            </Field>
          </div>
          <fieldset className="mt-5">
            <legend className="text-sm font-medium">{t.role}</legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {t.roles.map((item) => {
                const checked = role === item.value;
                return (
                  <label
                    key={item.value}
                    className={`cursor-pointer border px-4 py-3 ${checked ? "border-shell bg-page" : "border-line"}`}
                  >
                    <input
                      id={item.value === "homeowner" ? `${baseId}-role` : undefined}
                      className="sr-only"
                      type="radio"
                      name="role"
                      value={item.value}
                      checked={checked}
                      onChange={() => {
                        setRole(item.value);
                        if (item.value === "center" && homeType === "") setHomeType("na");
                      }}
                    />
                    <span className="block text-sm font-medium">{item.label}</span>
                    <span className="mt-1 block text-xs text-shade">{item.hint}</span>
                  </label>
                );
              })}
            </div>
            {errors.role ? (
              <p id={`${baseId}-role-error`} className="mt-2 text-sm text-shell">
                <span className="me-2 inline-block size-1.5 bg-alert align-middle" aria-hidden="true" />
                {t.errors.role}
              </p>
            ) : null}
          </fieldset>
          <p className="mt-5 text-sm text-shade">{t.localNote}</p>
          <Button type="submit" size="lg" className="mt-5" disabled={busy}>
            {busy ? t.submitting : t.submit}
          </Button>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  id,
  error,
  errorId,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  errorId?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={id} className="mb-2 text-shell">
        {label}
      </Label>
      {children}
      {error && errorId ? (
        <p id={errorId} className="mt-2 text-sm text-shell">
          <span className="me-2 inline-block size-1.5 bg-alert align-middle" aria-hidden="true" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SummaryRow({ label, value, ltr = false }: { label: string; value: string; ltr?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-line py-2">
      <dt className="text-shade">{label}</dt>
      <dd dir={ltr ? "ltr" : undefined}>
        <bdi>{value}</bdi>
      </dd>
    </div>
  );
}
