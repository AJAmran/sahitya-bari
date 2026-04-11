"use client";

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { motion, type HTMLMotionProps } from 'motion/react';

const glassVariants = cva(
  "relative overflow-hidden transition-all duration-500",
  {
    variants: {
      variant: {
        default: "bg-[var(--surface-100)]/40 backdrop-blur-xl border border-[var(--glass-border)]",
        heavy: "bg-[var(--surface-200)]/60 backdrop-blur-2xl border border-[var(--glass-border-strong)]",
        light: "bg-white/5 backdrop-blur-md border border-white/10",
        pill: "liquid-glass rounded-full",
        none: "",
      },
      shadow: {
        none: "",
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
        xl: "shadow-xl",
        "2xl": "shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] dark:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)]",
      },
      hover: {
        none: "",
        lift: "hover:-translate-y-1 hover:shadow-2xl hover:border-[var(--primary)]/30",
        glow: "hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.2)] hover:border-[var(--primary)]/40",
      }
    },
    defaultVariants: {
      variant: 'default',
      shadow: 'md',
      hover: 'none',
    },
  }
);

interface GlassProps extends HTMLMotionProps<"div">, VariantProps<typeof glassVariants> {
  isAnimated?: boolean;
}

export function Glass({ 
  children, 
  className, 
  variant, 
  shadow, 
  hover, 
  isAnimated = false,
  ...props 
}: GlassProps) {
  const commonClasses = cn(glassVariants({ variant, shadow, hover }), className);

  if (isAnimated) {
    return (
      <motion.div
        className={commonClasses}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  // Cast props to HTMLAttributes for the standard div to avoid motion-specific type errors
  const { 
    initial, animate, transition, exit, whileHover, whileTap, whileInView, 
    viewport, onAnimationStart, onAnimationComplete, onUpdate, layout, ...divProps 
  } = props;

  return (
    <div
      className={commonClasses}
      {...(divProps as React.HTMLAttributes<HTMLDivElement>)}
    >
      {children as React.ReactNode}
    </div>
  );
}
