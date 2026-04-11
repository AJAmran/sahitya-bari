import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  pillLabel: string;
  pillIcon: LucideIcon;
  pillVariant?: 'primary' | 'secondary' | 'accent' | 'warning';
  titleBengali: string;
  titleGradient: string;
  className?: string;
  description?: string;
  align?: 'left' | 'center';
}

export function SectionHeader({
  pillLabel,
  pillIcon: Icon,
  pillVariant = 'primary',
  titleBengali,
  titleGradient,
  className,
  description,
  align = 'left'
}: SectionHeaderProps) {
  return (
    <div className={cn(
      "relative z-10 max-w-3xl",
      align === 'center' ? "mx-auto text-center" : "",
      className
    )}>
      {/* Pill */}
      <div className={cn(
        "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-white/5 border border-[var(--glass-border)] text-[0.65rem] font-black uppercase tracking-[0.2em] mb-5 shadow-sm",
        align === 'center' ? "justify-center" : ""
      )}>
        <Icon size={12} className="text-[var(--primary)] shrink-0" />
        <span className="text-[var(--foreground)]/60">{pillLabel}</span>
      </div>

      {/* Heading */}
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-black font-bengali text-[var(--foreground)] tracking-tight leading-tight">
        {titleBengali}{' '}
        <span className="text-gradient">
          {titleGradient}
        </span>
      </h2>

      {description && (
        <p className="mt-4 text-base sm:text-lg text-[var(--foreground)]/55 font-medium leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}
