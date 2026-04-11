import { Skeleton } from "@/components/ui/Skeleton";

export default function AdminCommentsLoading() {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="space-y-2">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-4 w-72" />
      </div>
      
      <div className="bg-[var(--surface-100)]/40 rounded-[var(--radius-xl)] border border-[var(--glass-border)] overflow-hidden">
        <div className="px-8 py-5 border-b border-[var(--glass-border)] flex gap-8">
          {["25%", "40%", "20%", "15%"].map((w, i) => (
            <Skeleton key={i} className="h-4" style={{ width: w }} />
          ))}
        </div>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="px-8 py-6 border-b border-[var(--glass-border)]/50 flex items-center gap-6">
              <div className="flex items-center gap-4 w-[25%] shrink-0">
                  <Skeleton className="h-10 w-10 rounded-[var(--radius-md)] shrink-0" />
                  <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-3 w-3/4" />
                  </div>
              </div>
              <div className="space-y-2 w-[40%]">
                  <Skeleton className="h-3 w-1/3" />
                  <Skeleton className="h-4 w-full" />
              </div>
              <Skeleton className="h-4 w-[20%]" />
              <div className="flex gap-2 w-[15%] justify-end">
                  <Skeleton className="w-10 h-10 rounded-[var(--radius-md)]" />
                  <Skeleton className="w-10 h-10 rounded-[var(--radius-md)]" />
              </div>
          </div>
        ))}
      </div>
    </div>
  );
}
