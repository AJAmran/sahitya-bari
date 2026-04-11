import { GridSkeleton, Skeleton } from "@/components/ui/Skeleton";

export default function MainLoading() {
  return (
    <div className="min-h-screen pt-32 pb-20 site-container animate-in fade-in duration-700">
      <div className="space-y-12 mb-20 text-center">
        <div className="space-y-4 max-w-2xl mx-auto flex flex-col items-center">
          <Skeleton className="h-4 w-32 rounded-full" />
          <Skeleton className="h-16 w-full lg:w-[80%] rounded-2xl" />
          <Skeleton className="h-4 w-[60%] rounded-full" />
        </div>
      </div>

      <div className="mb-12 flex items-center justify-between">
        <div className="flex gap-4">
          <Skeleton className="h-10 w-32 rounded-full" />
          <Skeleton className="h-10 w-32 rounded-full" />
          <Skeleton className="h-10 w-32 rounded-full" />
        </div>
        <Skeleton className="h-10 w-48 rounded-full" />
      </div>

      <GridSkeleton count={6} cols={3} />
    </div>
  );
}
