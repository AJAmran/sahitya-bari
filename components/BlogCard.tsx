import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, User, BookOpen } from 'lucide-react';
import { format } from 'date-fns';

interface BlogCardProps {
  post: {
    title: string;
    slug: string;
    excerpt: string;
    coverImage: string;
    author: string;
    publishedAt: string;
    category: string;
  };
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col h-full">
      <div className="flex-1 relative overflow-hidden rounded-[2rem] bg-[var(--surface-50)] dark:bg-[var(--surface-50)] border border-[var(--glass-border)] transition-all duration-700 hover:shadow-2xl hover:shadow-[var(--secondary)]/10 flex flex-col group">
        {/* Image - Editorial Style */}
        <div className="relative h-48 w-full overflow-hidden shrink-0">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-50)]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
            {post.category && (
              <span className="px-3 py-1 rounded-[var(--radius-lg)] liquid-glass border border-white/10 text-[9px] font-bold text-white uppercase tracking-[0.1em] backdrop-blur-md shadow-sm">
                {post.category}
              </span>
            )}
          </div>
        </div>

        {/* Content - Editorial Layout */}
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center gap-3 text-[10px] text-[var(--foreground)]/40 font-bold uppercase tracking-wider mb-4">
            <div className="flex items-center gap-1.5">
              <Calendar size={12} className="text-[var(--primary)]/60" />
              <span suppressHydrationWarning>{format(new Date(post.publishedAt), 'MMM d, yyyy')}</span>
            </div>
            <div className="w-1 h-1 rounded-[var(--radius-full)] bg-[var(--glass-border)]" />
            <div className="flex items-center gap-1.5">
              <User size={12} className="text-[var(--secondary)]/60" />
              <span>{post.author}</span>
            </div>
          </div>

          <h3 className="text-lg font-bold font-bengali text-[var(--foreground)] mb-3 line-clamp-2 leading-snug group-hover:text-shimmer transition-all duration-500">
            {post.title}
          </h3>

          <p className="text-sm text-[var(--foreground)]/60 line-clamp-2 mb-6 flex-1 leading-relaxed font-medium">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-[var(--glass-border)] mt-auto">
            <div className="flex items-center gap-2 text-[var(--primary)] text-[10px] font-black uppercase tracking-[0.2em]">
              <BookOpen size={14} className="group-hover:rotate-12 transition-transform" />
              <span>Read Story</span>
            </div>
            <div className="w-8 h-8 rounded-[var(--radius-full)] border border-[var(--glass-border)] flex items-center justify-center text-[var(--foreground)]/40 group-hover:bg-[var(--primary)] group-hover:text-white group-hover:border-transparent transition-all duration-500">
              <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
