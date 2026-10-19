export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display text-[15px] font-medium tracking-tight ${className}`} translate="no">
      Stillward
    </span>
  );
}
