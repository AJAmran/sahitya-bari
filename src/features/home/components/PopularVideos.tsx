import { TrendingUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getPopularVideos } from '@/features/videos/api';
import VideoCard from '@/features/videos/components/VideoCard';
import { SectionHeader } from '@/components/ui/SectionHeader';

export default async function PopularVideos() {
  const popularVideos = await getPopularVideos();

  return (
    <section className="py-14 sm:py-20 relative overflow-hidden">
      {/* Subtle background tint */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025] dark:opacity-[0.04]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,oklch(65%_0.10_50),transparent_70%)]" />
      </div>

      <div className="site-container relative z-10">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-5">
          <SectionHeader
            pillLabel="Trending Now"
            pillIcon={TrendingUp}
            pillVariant="accent"
            titleBengali="জনপ্রিয়"
            titleGradient="চলচ্চিত্র ও আলোচনা"
          />

          <Link
            href="/videos"
            className="btn-ios hidden sm:inline-flex items-center gap-2.5 px-6 h-11 rounded-full bg-[var(--foreground)] text-[var(--background)] font-bold text-xs uppercase tracking-widest shadow-[var(--shadow-sm)] shrink-0 self-end"
          >
            <span>Explore Library</span>
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {popularVideos.map((video: any, idx: number) => (
            <div
              key={video._id}
              className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <VideoCard video={video} />
            </div>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 sm:hidden">
          <Link
            href="/videos"
            className="btn-ios w-full h-12 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white font-bold uppercase tracking-widest text-xs rounded-[var(--radius-full)] shadow-[var(--shadow-primary)]"
          >
            Explore Library <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
