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
    <Link href={`/blog/${post.slug}`} className="group h-full block">
      <article className="bespoke-card h-full flex flex-col overflow-hidden">
        {/* Cover Image */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--surface-200)] shrink-0">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-black/10 dark:bg-black/20">
            <span className="px-3 py-1 rounded-full
    bg-[var(--surface-50)]/85 dark:bg-[var(--surface-100)]/70
    backdrop-blur-lg
    text-[0.6rem] font-black uppercase tracking-[0.15em]
    text-[var(--primary)]
    border border-[var(--primary)]/20
    shadow-sm">
              {post.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5">
          {/* Meta */}
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-wider text-[var(--foreground)]/40">
              <Calendar size={11} className="text-[var(--primary)] shrink-0" />
              <span suppressHydrationWarning>{format(new Date(post.publishedAt), 'MMM d, yyyy')}</span>
            </div>
            <span className="w-px h-3 bg-[var(--glass-border)]" />
            <div className="flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-wider text-[var(--foreground)]/40 min-w-0">
              <User size={11} className="text-[var(--primary)] shrink-0" />
              <span className="truncate">{post.author}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-black font-bengali text-[var(--foreground)] mb-2.5 line-clamp-2 leading-snug group-hover:text-[var(--primary)] transition-colors duration-300">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-[var(--foreground)]/55 line-clamp-2 mb-4 flex-1 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-[var(--glass-border)] mt-auto">
            <div className="flex items-center gap-2 text-[var(--primary)] text-xs font-bold uppercase tracking-wider">
              <BookOpen size={13} className="group-hover:rotate-6 transition-transform duration-300" />
              <span>Read Story</span>
            </div>
            <div className="w-8 h-8 rounded-full border border-[var(--glass-border)] flex items-center justify-center text-[var(--foreground)]/50 transition-all duration-300 group-hover:bg-[var(--primary)] group-hover:text-white group-hover:border-transparent group-hover:translate-x-0.5">
              <ArrowRight size={15} />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
