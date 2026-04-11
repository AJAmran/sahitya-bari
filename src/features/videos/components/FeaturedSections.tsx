import { Sparkles, TrendingUp } from 'lucide-react';
import VideoCard from './VideoCard';
import { getUpcomingVideos, getPopularVideos } from '../api';

export default async function FeaturedSections() {
  const [upcoming, popular] = await Promise.all([
    getUpcomingVideos(),
    getPopularVideos()
  ]);

  return (
    <div className="space-y-14 sm:space-y-20 mb-14 sm:mb-20">

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-[var(--radius-lg)] bg-[var(--accent-light)] flex items-center justify-center text-[var(--accent)] shrink-0">
              <Sparkles size={16} className="animate-pulse" />
            </div>
            <div className="min-w-0">
              <h2 className="text-lg sm:text-xl font-black font-bengali text-[var(--foreground)] leading-tight">আসন্ন ভিডিও</h2>
              <p className="text-[0.6rem] font-black text-[var(--foreground)]/30 uppercase tracking-widest">Premiering Soon</p>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-[var(--glass-border)] to-transparent ml-2" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {upcoming.map((video: any) => (
              <VideoCard key={video._id || video.id} video={video} />
            ))}
          </div>
        </section>
      )}

      {/* Popular */}
      {popular.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-[var(--radius-lg)] bg-[var(--accent-warm-light)] flex items-center justify-center text-[var(--accent-warm)] shrink-0">
              <TrendingUp size={16} />
            </div>
            <div className="min-w-0">
              <h2 className="text-lg sm:text-xl font-black font-bengali text-[var(--foreground)] leading-tight">জনপ্রিয় ভিডিও</h2>
              <p className="text-[0.6rem] font-black text-[var(--foreground)]/30 uppercase tracking-widest">Audience Favorites</p>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-[var(--glass-border)] to-transparent ml-2" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popular.map((video: any) => (
              <VideoCard key={video._id || video.id} video={video} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
