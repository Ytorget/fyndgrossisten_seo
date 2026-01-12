interface HeroBadgeProps {
  children: React.ReactNode;
}

/**
 * A subtle, elegant badge for hero sections.
 * Features a glass effect with an orange accent dot.
 */
export function HeroBadge({ children }: HeroBadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6 animate-fade-in">
      <span className="w-2 h-2 bg-primary rounded-full"></span>
      <span className="text-sm font-medium text-white/90 tracking-wide uppercase">
        {children}
      </span>
    </div>
  );
}
