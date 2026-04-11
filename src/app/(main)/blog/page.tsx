import type { Metadata } from 'next';
import { Suspense } from 'react';
import { GridSkeleton } from '@/components/ui/Skeleton';
import BlogFilters from '@/features/blog/components/BlogFilters';
import BlogListingGrid from '@/features/blog/components/BlogListingGrid';

export const metadata: Metadata = {
  title: 'Blog | Sahitya Bari',
  description: 'Read insightful articles, reviews, and literary analyses from the Sahitya Bari team.',
};

interface BlogListingPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BlogListingPage({ searchParams }: BlogListingPageProps) {
  const params = await searchParams;
  const selectedCategory = (params.category as string) || 'All';
  const searchQuery = (params.q as string) || '';
  const currentPage = Number(params.page) || 1;

  return (
    <div className="min-h-screen pt-28 pb-14">
      <div className="site-container">
        {/* Page Header */}
        <div className="mb-8 text-center relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[var(--secondary)]/8 rounded-full blur-3xl -z-10 pointer-events-none" />
          <h1 className="text-3xl sm:text-4xl font-black font-bengali text-[var(--foreground)] mb-2.5 leading-tight">
            আমাদের{' '}
            <span className="text-gradient">ব্লগ সমূহ</span>
          </h1>
          <p className="text-sm text-[var(--foreground)]/55 max-w-xl mx-auto font-medium leading-relaxed">
            Read insightful articles, reviews, and literary analyses from our team.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <BlogFilters selectedCategory={selectedCategory} searchQuery={searchQuery} />

        {/* Blog Grid - Dynamic Hole */}
        <Suspense key={`${selectedCategory}-${searchQuery}-${currentPage}`} fallback={<GridSkeleton count={8} cols={4} />}>
          <BlogListingGrid category={selectedCategory} query={searchQuery} page={currentPage} />
        </Suspense>
      </div>
    </div>
  );
}
