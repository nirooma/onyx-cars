import { theme } from "@/theme/theme";

export function Logo({ className = "" }: { className?: string }) {
  const { shell, lightBar } = theme.color;
  return (
    <span className={`inline-flex items-center gap-2.5 font-display text-[15px] font-medium tracking-tight ${className}`}>
      <svg width="22" height="22" viewBox="0 0 32 32" aria-hidden="true" className="shrink-0">
        <path d="M5 24 L10 7 H22 L27 24 Z" fill="none" stroke={shell} strokeWidth="1.4" />
        <path d="M8 17.5 H24" stroke={lightBar} strokeWidth="1.5" />
      </svg>
      <span translate="no">NightGuard</span>
    </span>
  );
}
