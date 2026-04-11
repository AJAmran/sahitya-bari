import { Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getBlogs } from '@/features/blog/api';
import BlogCard from '@/features/blog/components/BlogCard';
import { SectionHeader } from '@/components/ui/SectionHeader';

export default async function LatestBlogs() {
  const { blogs } = await getBlogs({ limit: 3 });

  return (
    <section className="py-14 sm:py-20 relative overflow-hidden">
      {/* Background tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--surface-100)]/40 to-transparent pointer-events-none" />

      <div className="site-container relative z-10">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-5">
          <SectionHeader
            pillLabel="Latest Insights"
            pillIcon={Sparkles}
            pillVariant="secondary"
            titleBengali="সাম্প্রতিক"
            titleGradient="সাহিত্য পাঠ"
          />
          <Link
            href="/blog"
            className="btn-ios hidden sm:inline-flex items-center gap-2.5 px-6 h-11 rounded-full frosted-glass border border-[var(--glass-border)] text-[var(--foreground)] hover:text-[var(--primary)] font-bold text-xs uppercase tracking-widest shadow-[var(--shadow-sm)] shrink-0 self-end"
          >
            <span>Read More</span>
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {blogs.map((post: any) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 sm:hidden">
          <Link
            href="/blog"
            className="btn-ios w-full h-12 frosted-glass border border-[var(--glass-border)] text-[var(--foreground)] font-bold text-xs uppercase tracking-widest rounded-[var(--radius-full)]"
          >
            Read More <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
