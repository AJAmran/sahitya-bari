import { Skeleton } from "@/components/ui/Skeleton";

export default function AdminMessagesLoading() {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <Skeleton className="h-9 w-32" />
          <Skeleton className="h-4 w-72" />
        </div>
        <div className="flex items-center gap-4">
            <Skeleton className="h-20 w-32 rounded-[var(--radius-md)]" />
            <Skeleton className="h-20 w-32 rounded-[var(--radius-md)]" />
        </div>
      </div>

      <div className="space-y-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-[var(--surface-100)]/40 rounded-[var(--radius-xl)] border border-[var(--glass-border)] p-8">
             <div className="flex flex-col lg:flex-row gap-8">
                 <div className="lg:w-72 space-y-6">
                     <div className="flex items-center gap-4">
                         <Skeleton className="h-14 w-14 rounded-[var(--radius-md)] shrink-0" />
                         <div className="space-y-2 flex-1">
                             <Skeleton className="h-5 w-3/4" />
                             <Skeleton className="h-3 w-1/2" />
                         </div>
                     </div>
                     <div className="space-y-3 pt-4 border-t border-[var(--glass-border)]">
                         <Skeleton className="h-3 w-32" />
                         <Skeleton className="h-3 w-24" />
                     </div>
                 </div>
                 <div className="flex-1 space-y-6">
                     <Skeleton className="h-7 w-1/2" />
                     <div className="bg-[var(--surface-200)]/30 rounded-[var(--radius-lg)] p-6 space-y-3">
                         <Skeleton className="h-4 w-full" />
                         <Skeleton className="h-4 w-5/6" />
                         <Skeleton className="h-4 w-3/4" />
                     </div>
                 </div>
                 <div className="flex lg:flex-col gap-3 shrink-0">
                     <Skeleton className="h-12 w-12 rounded-[var(--radius-md)]" />
                     <Skeleton className="h-12 w-12 rounded-[var(--radius-md)]" />
                 </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
