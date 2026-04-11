import { Sparkles } from 'lucide-react';
import { getUpcomingVideos } from '@/features/videos/api';
import VideoCard from '@/features/videos/components/VideoCard';
import { SectionHeader } from '@/components/ui/SectionHeader';

export default async function UpcomingVideos() {
  const upcomingVideos = await getUpcomingVideos();
  if (!upcomingVideos || upcomingVideos.length === 0) return null;

  return (
    <section className="py-14 sm:py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025] dark:opacity-[0.04]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,oklch(40%_0.10_145),transparent_70%)]" />
      </div>

      <div className="site-container relative z-10">
        {/* Header */}
        <div className="mb-10">
          <SectionHeader
            pillLabel="Premiering Soon"
            pillIcon={Sparkles}
            pillVariant="primary"
            titleBengali="আসন্ন"
            titleGradient="ভিডিও গ্যালারি"
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {upcomingVideos.map((video: any, idx: number) => (
            <div
              key={video._id}
              className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <VideoCard video={video} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
