import { Suspense } from 'react';
import { GridSkeleton } from '@/components/ui/Skeleton';
import VideoFilters from '@/features/videos/components/VideoFilters';
import FeaturedSections from '@/features/videos/components/FeaturedSections';
import VideoListingLibrary from '@/features/videos/components/VideoListingLibrary';

interface VideoListingPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function VideoListingPage({ searchParams }: VideoListingPageProps) {
  const params = await searchParams;
  const selectedCategory = (params.category as string) || 'All';
  const searchQuery = (params.q as string) || '';
  const currentPage = Number(params.page) || 1;

  return (
    <div className="min-h-screen pt-28 pb-14">
      <div className="site-container">
        {/* Header */}
        <div className="mb-8 text-center relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[var(--primary)]/8 rounded-full blur-3xl -z-10 pointer-events-none" />
          <h1 className="text-3xl sm:text-4xl font-black font-bengali text-[var(--foreground)] mb-2.5 leading-tight tracking-tight">
            সকল <span className="text-gradient">ভিডিও</span>
          </h1>
          <p className="text-sm text-[var(--foreground)]/55 max-w-xl mx-auto font-medium leading-relaxed">
            Watch literature discussions, poetry recitations, and book reviews.
          </p>
        </div>

        {/* Search and Filter */}
        <VideoFilters selectedCategory={selectedCategory} searchQuery={searchQuery} />

        {/* Featured Sections - Only show on first page and when not searching */}
        {currentPage === 1 && !searchQuery && selectedCategory === 'All' && (
          <Suspense fallback={
            <div className="space-y-12 mb-16">
              <div className="h-3 w-28 bg-[var(--surface-300)] rounded-full animate-pulse" />
              <GridSkeleton count={4} cols={4} />
            </div>
          }>
            <FeaturedSections />
          </Suspense>
        )}

        {/* Main Library Section */}
        <Suspense key={`${selectedCategory}-${searchQuery}-${currentPage}`} fallback={<GridSkeleton count={8} cols={4} />}>
          <VideoListingLibrary category={selectedCategory} query={searchQuery} page={currentPage} />
        </Suspense>
      </div>
    </div>
  );
}
