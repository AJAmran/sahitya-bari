import { Skeleton } from "@/components/ui/Skeleton";

export default function AdminProductsLoading() {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <Skeleton className="h-9 w-48" />
          <Skeleton className="h-4 w-72" />
        </div>
        <Skeleton className="h-12 w-40 rounded-[var(--radius-lg)]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="bg-[var(--surface-100)]/40 rounded-[var(--radius-xl)] border border-[var(--glass-border)] overflow-hidden">
             <Skeleton className="w-full aspect-[4/5] !rounded-none" />
             <div className="p-6 space-y-4">
                 <div className="flex justify-between items-start gap-2">
                     <Skeleton className="h-5 w-2/3" />
                     <Skeleton className="h-6 w-16" />
                 </div>
                 <div className="flex items-center justify-between py-4 border-y border-[var(--glass-border)]">
                     <div className="space-y-2">
                         <Skeleton className="h-3 w-16" />
                         <Skeleton className="h-4 w-20" />
                     </div>
                     <div className="space-y-2 flex flex-col items-end">
                         <Skeleton className="h-3 w-16" />
                         <Skeleton className="h-3 w-20" />
                     </div>
                 </div>
                 <Skeleton className="h-8 w-24 rounded-lg" />
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
