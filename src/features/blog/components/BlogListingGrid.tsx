import { BookOpen } from 'lucide-react';
import Link from 'next/link';
import BlogCard from './BlogCard';
import { getBlogs } from '../api';
import { Pagination } from '@/components/ui/Pagination';

export default async function BlogListingGrid({ 
  category, 
  query, 
  page 
}: { 
  category: string, 
  query: string, 
  page: number 
}) {
  const { blogs, totalPages } = await getBlogs({ 
    page, 
    limit: 12, 
    category, 
    query_str: query 
  });

  if (!blogs || blogs.length === 0) {
    return (
      <div className="text-center py-24 bg-[var(--surface-100)]/40 rounded-[var(--radius-xl)] border border-dashed border-[var(--glass-border)]">
        <BookOpen size={48} className="mx-auto text-[var(--foreground)]/10 mb-4" />
        <p className="text-[var(--foreground)]/40 font-bold uppercase tracking-widest text-sm">No articles found</p>
        {query && (
          <Link href="/blog" className="mt-4 inline-block text-[var(--primary)] text-sm font-bold hover:underline">Clear search</Link>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        {blogs.map((post: any, index: number) => (
          <BlogCard key={post._id || post.slug + index} post={post} />
        ))}
      </div>
      
      {totalPages > 1 && (
        <Pagination 
          currentPage={page} 
          totalPages={totalPages} 
          baseUrl="/blog" 
        />
      )}
    </>
  );
}
