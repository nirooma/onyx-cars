import { brand } from "@/theme/brand";

/** Approved nav lockup (light on dark). Size comes from .brand-logo in theme.css. */
export function Logo({ className = "" }: { className?: string }) {
  const { navLogo } = brand;
  return (
    // eslint-disable-next-line @next/next/no-img-element -- vector logo, no raster optimisation needed
    <img
      className={`brand-logo ${className}`}
      src={navLogo.src}
      alt={brand.name}
      width={Math.round((navLogo.width * navLogo.heightDesktop) / navLogo.height)}
      height={navLogo.heightDesktop}
      translate="no"
      decoding="async"
    />
  );
}
