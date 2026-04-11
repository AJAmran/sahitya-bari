import { Skeleton } from "@/components/ui/Skeleton";

function TableRowSkeleton({ cols = 4 }: { cols?: number }) {
  return (
    <div className="px-8 py-6 border-b border-[var(--glass-border)]/50 flex items-center gap-6">
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/3 rounded-full" />
      </div>
      {Array.from({ length: cols - 1 }).map((_, i) => (
        <Skeleton key={i} className="h-4 w-24" />
      ))}
      <div className="flex gap-2 ml-auto shrink-0">
        <Skeleton className="w-10 h-10 rounded-[var(--radius-md)]" />
        <Skeleton className="w-10 h-10 rounded-[var(--radius-md)]" />
        <Skeleton className="w-10 h-10 rounded-[var(--radius-md)]" />
      </div>
    </div>
  );
}

export default function AdminBlogsLoading() {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <Skeleton className="h-9 w-44" />
          <Skeleton className="h-4 w-72" />
        </div>
        <Skeleton className="h-12 w-36 rounded-[var(--radius-lg)]" />
      </div>
      <div className="bg-[var(--surface-100)]/40 rounded-[var(--radius-xl)] border border-[var(--glass-border)] overflow-hidden">
        <div className="px-8 py-5 border-b border-[var(--glass-border)] flex gap-8">
          {["35%", "20%", "25%", "15%"].map((w, i) => (
            <Skeleton key={i} className="h-4" style={{ width: w }} />
          ))}
        </div>
        {Array.from({ length: 8 }).map((_, i) => (
          <TableRowSkeleton key={i} cols={4} />
        ))}
      </div>
    </div>
  );
}
