export const HOME_TYPES = ["villa", "cottage", "ground", "other", "na"] as const;
export const ROLES = ["homeowner", "center"] as const;

export type HomeType = (typeof HOME_TYPES)[number];
export type Role = (typeof ROLES)[number];
export type WaitlistField = "name" | "email" | "phone" | "city" | "homeType" | "role";

export type WaitlistInput = {
  name: string;
  email: string;
  phone: string;
  city: string;
  homeType: string;
  role: string;
};

export type WaitlistPayload = {
  name: string;
  email: string;
  phone: string;
  city: string;
  homeType: HomeType;
  role: Role;
  locale: "he" | "en";
  createdAt: string;
};

export type WaitlistErrors = Partial<Record<WaitlistField, true>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateWaitlist(
  input: WaitlistInput,
): { ok: true; value: Omit<WaitlistPayload, "locale" | "createdAt"> } | { ok: false; errors: WaitlistErrors } {
  const errors: WaitlistErrors = {};
  const name = input.name.trim();
  const email = input.email.trim();
  const phone = input.phone.trim();
  const city = input.city.trim();
  const digits = phone.replace(/\D/g, "");

  if (name.length < 2) errors.name = true;
  if (!EMAIL.test(email)) errors.email = true;
  if (digits.length < 9 || digits.length > 15) errors.phone = true;
  if (city.length < 2) errors.city = true;
  if (!HOME_TYPES.includes(input.homeType as HomeType)) errors.homeType = true;
  if (!ROLES.includes(input.role as Role)) errors.role = true;

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    value: {
      name,
      email,
      phone,
      city,
      homeType: input.homeType as HomeType,
      role: input.role as Role,
    },
  };
}

/**
 * TODO(backend): deliver a validated pilot signup.
 *
 * This draft must not transmit personal data. This function is the only
 * place a network call should be added later. It is intentionally a no-op,
 * and it does not read NEXT_PUBLIC_WAITLIST_ENDPOINT.
 *
 * When a backend exists:
 * 1. Set NEXT_PUBLIC_WAITLIST_ENDPOINT.
 * 2. Replace the body below with a POST of `payload` as JSON.
 * 3. Leave the form component calling this function, and nothing else.
 *
 *   const endpoint = process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT;
 *   if (!endpoint) throw new Error("NEXT_PUBLIC_WAITLIST_ENDPOINT is not set");
 *   const response = await fetch(endpoint, {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify(payload),
 *   });
 *   if (!response.ok) throw new Error(`Waitlist request failed (${response.status})`);
 */
export async function deliverWaitlist(
  payload: WaitlistPayload,
): Promise<{ delivered: false; reason: "not-configured" }> {
  void payload;
  return { delivered: false, reason: "not-configured" };
}
