import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';

export default function RelatedPostsList({ posts }: { posts: any[] }) {
  if (posts.length === 0) return null;

  return (
    <div className="glass-card p-5 rounded-[var(--radius-xl)] space-y-5">
      <h3 className="text-[0.65rem] font-black uppercase tracking-[0.35em] text-[var(--foreground)]/40 border-b border-[var(--glass-border)] pb-3">
        Journal Stream
      </h3>
      <div className="space-y-4">
        {posts.map((post: any) => (
          <div key={post._id} className="group cursor-pointer">
            <Link href={`/blog/${post.slug}`} className="flex gap-3 items-start">
              <div className="relative w-20 aspect-[4/3] rounded-[0.75rem] overflow-hidden border border-[var(--glass-border)] shrink-0">
                <Image
                  src={post.coverImage || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c'}
                  alt={post.title}
                  fill
                  sizes="80px"
                  className="object-cover grayscale-[80%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
              </div>
              <div className="space-y-1 min-w-0">
                <h4 className="text-sm font-black font-bengali text-[var(--foreground)] leading-snug group-hover:text-[var(--primary)] transition-colors line-clamp-2">
                  {post.title}
                </h4>
                <div className="flex items-center gap-2 text-[0.6rem] font-bold text-[var(--foreground)]/45 uppercase tracking-wider">
                  <span>{format(new Date(post.publishedAt), 'MMM yyyy')}</span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <Link
        href="/blog"
        className="block w-full py-4 rounded-[var(--radius-2xl)] border-2 border-dashed border-[var(--glass-border)] text-center text-[10px] font-black uppercase tracking-[0.3em] text-[var(--foreground)]/40 hover:border-[var(--primary)]/30 hover:text-[var(--primary)] transition-all"
      >
        Browse All Manuscripts
      </Link>
    </div>
  );
}
