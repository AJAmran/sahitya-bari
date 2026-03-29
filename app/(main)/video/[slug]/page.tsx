import dbConnect from '@/lib/mongodb';
import Image from 'next/image';
import VideoModel from '@/lib/models/Video';
import { formatViews } from '@/lib/utils';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { MotionDiv, MotionH1 } from "@/components/Motion";
import { ArrowLeft, Calendar, Eye, User, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import YouTubeEmbed from '@/components/YouTubeEmbed';
import type { Metadata } from 'next';
import mongoose from 'mongoose';

interface VideoDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: VideoDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  await dbConnect();

  const query: any = { youtubeId: slug };
  if (mongoose.Types.ObjectId.isValid(slug)) {
    query.$or = [{ youtubeId: slug }, { _id: slug }];
  }

  const video = await VideoModel.findOne(query).lean();

  if (!video) {
    return { title: 'Video Not Found | Sahitya Bari' };
  }

  return {
    title: `${(video as any).title} | Sahitya Bari`,
    description: (video as any).description || (video as any).title,
  };
}



export default async function VideoDetailPage({ params }: VideoDetailPageProps) {
  const { slug } = await params;

  await dbConnect();
  const query: any = { youtubeId: slug };
  if (mongoose.Types.ObjectId.isValid(slug)) {
    query.$or = [{ youtubeId: slug }, { _id: slug }];
  }

  const video: any = await VideoModel.findOne(query).lean();

  if (!video) {
    notFound();
  }

  // Fetch related videos (exclude current)
  const rawRelatedVideos = await VideoModel.find({
    _id: { $ne: video._id },
  })
    .sort({ publishedAt: -1 })
    .limit(4)
    .lean();

  const relatedVideos = rawRelatedVideos.map((rv: any) => ({
    ...rv,
    id: rv._id.toString(),
    publishedAt: rv.publishedAt.toISOString(),
  }));

  return (
    <div className="min-h-screen pt-36 pb-20">
      <div className="site-container">
        {/* Back Button */}
        <Link
          href="/videos"
          className="inline-flex items-center gap-2 text-[var(--foreground)]/60 hover:text-[var(--primary)] mb-8 transition-all group px-4 py-2 rounded-[var(--radius-full)] frosted-glass border border-[var(--glass-border)] text-sm font-medium"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Library</span>
        </Link>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 xl:gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            {/* Video Player Container */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative aspect-video rounded-[var(--radius-3xl)] overflow-hidden shadow-2xl shadow-[var(--glass-shadow)] liquid-glass border border-[var(--glass-border)]"
            >
              {video.youtubeId ? (
                <YouTubeEmbed embedId={video.youtubeId} />
              ) : (
                <div className="relative w-full h-full">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="w-full h-full object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="liquid-glass px-8 py-4 rounded-[var(--radius-full)] border border-white/20 text-white font-black text-xs uppercase tracking-[0.3em] backdrop-blur-xl">
                      Coming Soon
                    </div>
                  </div>
                </div>
              )}
            </MotionDiv>

            {/* Video Content & Stats */}
            <div className="space-y-6">
              <MotionH1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold font-bengali text-[var(--foreground)] leading-[1.15] tracking-tight"
              >
                {video.title}
              </MotionH1>

              <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
                <div className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-full)] bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20">
                  <Eye size={16} />
                  <span>{formatViews(video.views)} Views</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-full)] frosted-glass border border-[var(--glass-border)] text-[var(--foreground)]/60">
                  <Calendar size={16} />
                  <span>{format(new Date(video.publishedAt), 'MMM d, yyyy')}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-full)] frosted-glass border border-[var(--glass-border)] text-[var(--foreground)]/60">
                  <User size={16} />
                  <span>Sahitya Bari Official</span>
                </div>
              </div>

              {video.description && (
                <MotionDiv
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="liquid-glass p-8 rounded-[2.5rem] border border-[var(--glass-border)] relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)]/5 blur-3xl rounded-[var(--radius-full)] -mr-16 -mt-16 pointer-events-none" />
                  <h3 className="text-lg font-bold text-[var(--foreground)] mb-4 flex items-center gap-2 uppercase tracking-widest text-xs opacity-50">
                    <span>Summary & Details</span>
                  </h3>
                  <p className="text-[var(--foreground)]/80 whitespace-pre-line leading-relaxed text-lg font-light">
                    {video.description}
                  </p>
                </MotionDiv>
              )}
            </div>
          </div>

          {/* Sidebar Area */}
          <aside className="lg:col-span-4 space-y-8">
            {relatedVideos.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between px-2">
                  <h3 className="text-xl font-bold text-[var(--foreground)] flex items-center gap-2">
                    <TrendingUp size={20} className="text-[var(--accent)]" />
                    <span>Up Next</span>
                  </h3>
                </div>

                <div className="space-y-4">
                  {relatedVideos.map((rv, idx) => (
                    <MotionDiv
                      key={rv.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * idx }}
                    >
                      <Link
                        href={`/video/${rv.youtubeId}`}
                        className="flex gap-4 p-3 rounded-[var(--radius-2xl)] hover:liquid-glass border border-transparent hover:border-[var(--glass-border)] transition-all group"
                      >
                        <div className="relative w-32 h-20 sm:w-40 sm:h-24 rounded-[var(--radius-xl)] overflow-hidden bg-[var(--surface-100)] flex-shrink-0 shadow-sm group-hover:shadow-md transition-shadow">
                          {rv.thumbnail ? (
                            <Image
                              src={rv.thumbnail}
                              alt={rv.title}
                              fill
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[var(--foreground)]/20 text-xs">No Preview</div>
                          )}
                          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                        </div>
                        <div className="flex flex-col justify-center min-w-0">
                          <h4 className="text-[15px] font-bold font-bengali text-[var(--foreground)] leading-snug line-clamp-2 group-hover:text-[var(--primary)] transition-colors">
                            {rv.title}
                          </h4>
                          <div className="flex items-center gap-3 mt-2 text-[10px] uppercase font-bold tracking-widest text-[var(--foreground)]/40">
                            <span className="flex items-center gap-1"><Eye size={12} /> {formatViews(rv.views)}</span>
                            <span>•</span>
                            <span>Sahitya Bari</span>
                          </div>
                        </div>
                      </Link>
                    </MotionDiv>
                  ))}
                </div>

                <Link
                  href="/videos"
                  className="block w-full text-center py-4 rounded-[var(--radius-2xl)] bg-[var(--surface-100)] border border-[var(--glass-border)] text-sm font-bold text-[var(--foreground)]/60 hover:text-[var(--primary)] hover:border-[var(--primary)]/20 transition-all uppercase tracking-widest"
                >
                  View All Videos
                </Link>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
