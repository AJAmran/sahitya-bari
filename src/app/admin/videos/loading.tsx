import { Skeleton } from "@/components/ui/Skeleton";

export default function AdminVideosLoading() {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <Skeleton className="h-9 w-52" />
          <Skeleton className="h-4 w-72" />
        </div>
        <Skeleton className="h-12 w-36 rounded-[var(--radius-lg)]" />
      </div>
      <div className="bg-[var(--surface-100)]/40 rounded-[var(--radius-xl)] border border-[var(--glass-border)] overflow-hidden">
        <div className="px-8 py-5 border-b border-[var(--glass-border)] flex gap-8">
          {["40%", "20%", "20%", "15%", "10%"].map((w, i) => (
            <Skeleton key={i} className="h-4" style={{ width: w }} />
          ))}
        </div>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="px-8 py-6 border-b border-[var(--glass-border)]/50 flex items-center gap-8">
            <div className="flex items-center gap-6 flex-1">
              <Skeleton className="w-32 h-20 rounded-[var(--radius-md)] shrink-0" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-3 w-1/3 rounded-full" />
              </div>
            </div>
            <Skeleton className="h-4 w-20" />
            <div className="flex gap-2">
              <Skeleton className="w-10 h-10 rounded-[var(--radius-md)]" />
              <Skeleton className="w-10 h-10 rounded-[var(--radius-md)]" />
            </div>
            <div className="flex gap-2 ml-auto">
              <Skeleton className="w-10 h-10 rounded-[var(--radius-md)]" />
              <Skeleton className="w-10 h-10 rounded-[var(--radius-md)]" />
              <Skeleton className="w-10 h-10 rounded-[var(--radius-md)]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
