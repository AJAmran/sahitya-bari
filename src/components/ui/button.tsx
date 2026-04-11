import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[var(--radius-md)] text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] disabled:pointer-events-none disabled:opacity-50 active:scale-95 uppercase tracking-widest",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white shadow-lg shadow-[var(--primary)]/20 hover:shadow-[var(--primary)]/40",
        destructive: "bg-[var(--destructive)] text-white shadow-lg shadow-[var(--destructive)]/20 hover:bg-[var(--destructive)]/90",
        outline: "border border-[var(--glass-border)] bg-transparent backdrop-blur-sm text-[var(--foreground)] hover:bg-[var(--surface-200)]",
        secondary: "bg-[var(--surface-200)] text-[var(--foreground)] hover:bg-[var(--surface-300)] border border-[var(--glass-border)]",
        ghost: "hover:bg-[var(--surface-200)] text-[var(--foreground)]/70 hover:text-[var(--foreground)]",
        link: "text-[var(--primary)] underline-offset-4 hover:underline",
        ios: "btn-ios bg-[var(--surface-100)]/40 backdrop-blur-xl border border-[var(--glass-border)] text-[var(--foreground)] hover:bg-[var(--surface-200)]",
        neon: "bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--primary)] hover:text-white transition-all shadow-[0_0_20px_rgba(0,0,0,0.1)]",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-[var(--radius-sm)] px-4 text-[10px]",
        lg: "h-14 rounded-[var(--radius-lg)] px-10 text-base",
        icon: "h-11 w-11",
      },
      shape: {
        default: "rounded-[var(--radius-md)]",
        pill: "rounded-full",
        square: "rounded-none",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
