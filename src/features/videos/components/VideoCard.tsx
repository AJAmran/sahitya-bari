import Image from 'next/image';
import Link from 'next/link';
import { PlayCircle, Clock, Calendar, Eye } from 'lucide-react';
import { format } from 'date-fns';

interface VideoCardProps {
  video: {
    title: string;
    slug: string;
    youtubeId?: string;
    thumbnail: string;
    views: string;
    duration: string;
    publishedAt: string;
    category?: string;
  };
}

export default function VideoCard({ video }: VideoCardProps) {
  const hasVideo = !!video.youtubeId;
  const linkId = video.youtubeId || (video as any)._id || (video as any).id;

  return (
    <Link href={`/video/${linkId}`} className="group h-full block">
      <article className="bespoke-card h-full flex flex-col overflow-hidden">
        {/* Thumbnail */}
        <div className="relative aspect-video w-full overflow-hidden bg-[var(--surface-200)] shrink-0">
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-70" />

          {/* Play / upcoming badge */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400 scale-90 group-hover:scale-100">
            {hasVideo ? (
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-xl border border-white/40 flex items-center justify-center text-white shadow-xl">
                <PlayCircle className="w-6 h-6" />
              </div>
            ) : (
              <div className="px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[0.6rem] font-black uppercase tracking-[0.15em]">
                Premiering Soon
              </div>
            )}
          </div>

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-[0.6rem] font-black uppercase tracking-[0.15em] text-white">
              {video.category || 'Production'}
            </span>
          </div>

          {/* Duration */}
          {video.duration && (
            <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/50 backdrop-blur-md rounded-full text-[0.6rem] font-bold text-white flex items-center gap-1.5 border border-white/10">
              <Clock size={10} />
              {video.duration}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-4">
          {/* Meta row */}
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-wider text-[var(--foreground)]/40">
              <Calendar size={10} className="text-[var(--primary)] shrink-0" />
              <span suppressHydrationWarning>{format(new Date(video.publishedAt), 'MMM d, yyyy')}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-wider text-[var(--foreground)]/40">
              <Eye size={10} className="text-[var(--primary)] shrink-0" />
              <span>{video.views}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-sm sm:text-base font-black font-bengali text-[var(--foreground)] line-clamp-2 leading-snug group-hover:text-[var(--primary)] transition-colors duration-300">
            {video.title}
          </h3>
        </div>
      </article>
    </Link>
  );
}
