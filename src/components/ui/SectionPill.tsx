import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const pillVariants = cva(
  "inline-flex items-center gap-2.5 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border backdrop-blur-xl shadow-sm text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.3em]",
  {
    variants: {
      variant: {
        primary: 'border-[var(--primary)]/20 bg-[var(--surface-200)]/50 text-[var(--primary)]',
        secondary: 'border-[var(--secondary)]/20 bg-[var(--surface-200)]/50 text-[var(--secondary)]',
        accent: 'border-[var(--accent)]/20 bg-[var(--surface-200)]/50 text-[var(--accent)]',
        warning: 'border-[var(--warning)]/20 bg-[var(--surface-200)]/50 text-[var(--warning)]',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);

interface SectionPillProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof pillVariants> {
  icon?: LucideIcon;
  label: string;
}

export function SectionPill({ icon: Icon, label, className, variant, ...props }: SectionPillProps) {
  return (
    <div 
      className={cn(pillVariants({ variant }), className)}
      {...props}
    >
      {Icon && (
        <Icon 
          size={14} 
          className={cn(variant === 'warning' && "animate-pulse")} 
        />
      )}
      <span>{label}</span>
    </div>
  );
}
