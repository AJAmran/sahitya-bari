import React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const gradientVariants = cva(
  "bg-clip-text text-transparent bg-gradient-to-r",
  {
    variants: {
      from: {
        primary: "from-[var(--primary)]",
        foreground: "from-[var(--foreground)]",
        accent: "from-[var(--accent)]",
      },
      to: {
        secondary: "to-[var(--secondary)]",
        primary: "to-[var(--primary)]",
        foreground: "to-[var(--foreground)]",
        transparent: "to-transparent",
      },
      animate: {
        none: "",
        shimmer: "bg-[length:200%_auto] animate-[text-shimmer_6s_linear_infinite]",
        pulse: "animate-pulse",
      }
    },
    defaultVariants: {
      from: 'foreground',
      to: 'primary',
      animate: 'none',
    }
  }
);

interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof gradientVariants> {
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p' | 'div';
}

export function GradientText({ 
  children, 
  className, 
  from, 
  to, 
  animate, 
  as: Component = 'span',
  ...props 
}: GradientTextProps) {
  return (
    <Component
      className={cn(gradientVariants({ from, to, animate }), className)}
      {...props}
    >
      {children}
    </Component>
  );
}
