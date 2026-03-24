import Image from 'next/image';
import Link from 'next/link';
import { PlayCircle, Clock, Calendar, Eye } from 'lucide-react';
import { format } from 'date-fns';

interface VideoCardProps {
  video: {
    title: string;
    slug: string;
    thumbnail: string;
    views: string;
    duration: string;
    publishedAt: string;
    category?: string;
  };
}

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <Link href={`/video/${video.slug}`} className="group block">
      <div className="relative flex flex-col h-full bg-[var(--surface-100)] dark:bg-[var(--surface-50)] rounded-[2rem] border border-[var(--glass-border)] transition-all duration-500 hover:shadow-2xl hover:shadow-[var(--primary)]/10 hover:-translate-y-1 overflow-hidden">
        {/* Thumbnail Container */}
        <div className="relative aspect-video w-full overflow-hidden shrink-0">
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          />

          {/* Refined Glass Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Minimalist Play Button */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-12 h-12 rounded-[var(--radius-full)] liquid-glass flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out shadow-2xl">
              <PlayCircle className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Badges - Floating Glass */}
          <div className="absolute top-3 left-3 flex gap-2">
            {video.category && (
              <span className="px-2.5 py-1 rounded-[var(--radius-lg)] liquid-glass border border-white/10 text-[9px] font-bold text-white uppercase tracking-wider backdrop-blur-md">
                {video.category}
              </span>
            )}
          </div>

          <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/40 backdrop-blur-md rounded-[var(--radius-lg)] text-[10px] font-medium text-white/90 flex items-center gap-1 border border-white/5">
            <Clock size={10} />
            {video.duration}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5 text-[10px] text-[var(--foreground)]/40 font-semibold uppercase tracking-tighter">
              <Calendar size={12} className="text-[var(--primary)]/60" />
              <span suppressHydrationWarning>{format(new Date(video.publishedAt), 'MMM d, yyyy')}</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-[var(--foreground)]/40 font-semibold">
              <Eye size={12} />
              <span>{video.views}</span>
            </div>
          </div>

          <h3 className="text-base font-bold font-bengali text-[var(--foreground)] line-clamp-2 leading-relaxed group-hover:text-[var(--primary)] transition-colors duration-300">
            {video.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}
