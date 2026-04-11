import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'card' | 'circle' | 'text' | 'button'
}

export function Skeleton({ className, variant = 'default', ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-[var(--surface-300)]/40",
        variant === 'circle' && "rounded-full",
        variant === 'card' && "rounded-[var(--radius-2xl)]",
        variant === 'text' && "rounded-sm h-4 w-3/4",
        variant === 'button' && "rounded-[var(--radius-lg)] h-12 w-32",
        variant === 'default' && "rounded-md",
        className
      )}
      {...props}
    />
  )
}

/**
 * Premium Card Skeleton for Videos/Blogs
 */
export function CardSkeleton() {
  return (
    <div className="bespoke-card overflow-hidden h-full">
      <Skeleton className="aspect-video w-full rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton variant="text" className="h-3.5 w-full" />
        <Skeleton variant="text" className="h-3.5 w-2/3" />
        <div className="flex justify-between items-center pt-2">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-7 w-7 rounded-full" />
        </div>
      </div>
    </div>
  )
}

/**
 * Grid Skeleton Generator
 */
export function GridSkeleton({ count = 6, cols = 3 }: { count?: number, cols?: number }) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }[cols as 1|2|3|4] || 'grid-cols-3'

  return (
    <div className={cn("grid gap-4 sm:gap-5", gridCols)}>
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  )
}

/**
 * Layout Skeleton for Admin Pages
 */
export function LayoutSkeleton() {
  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="space-y-4">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-4 w-96" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Skeleton className="h-32 rounded-[var(--radius-xl)]" />
        <Skeleton className="h-32 rounded-[var(--radius-xl)]" />
        <Skeleton className="h-32 rounded-[var(--radius-xl)]" />
      </div>
      <Skeleton className="h-[500px] w-full rounded-[var(--radius-2xl)] border border-[var(--glass-border)]" />
    </div>
  )
}
