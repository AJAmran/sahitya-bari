import { Video } from 'lucide-react';
import VideoCard from './VideoCard';
import { getVideos } from '../api';
import { Pagination } from '@/components/ui/Pagination';

export default async function VideoListingLibrary({ 
  category, 
  query, 
  page 
}: { 
  category: string, 
  query: string, 
  page: number 
}) {
  const { videos, totalPages } = await getVideos({ 
    page, 
    limit: 12, 
    category, 
    query 
  });
  
  return (
    <section>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] shrink-0">
          <Video size={16} />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-black font-bengali text-[var(--foreground)] leading-none">
            {query ? 'অনুসন্ধানের ফলাফল' : category !== 'All' ? `${category} আর্কাইভ` : 'ভিডিও আর্কাইভ'}
          </h2>
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-[var(--glass-border)] to-transparent ml-2" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        {videos.map((video: any) => (
          <VideoCard key={video._id || video.id} video={video} />
        ))}
      </div>

      {videos.length === 0 && (
        <div className="text-center py-24 bg-[var(--surface-100)]/40 rounded-[var(--radius-3xl)] border border-dashed border-[var(--glass-border)]">
          <Video size={48} className="mx-auto text-[var(--foreground)]/10 mb-4" />
          <p className="text-[var(--foreground)]/40 font-bold uppercase tracking-widest text-sm">No videos found</p>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination 
          currentPage={page} 
          totalPages={totalPages} 
          baseUrl="/videos" 
        />
      )}
    </section>
  );
}
