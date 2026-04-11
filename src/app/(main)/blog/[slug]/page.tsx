import Image from 'next/image';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { ArrowLeft, Calendar, User, Share2, Bookmark, Twitter, Facebook } from 'lucide-react';
import Link from 'next/link';
import { MotionDiv, MotionH1 } from '@/components/Motion';
import ReactMarkdown from 'react-markdown';
import type { Metadata } from 'next';
import { getComments } from '@/features/comments/api';
import { auth } from '@/lib/auth-node';
import { Suspense } from 'react';
import { getBlogPost, getRelatedPosts } from '@/features/blog/api';
import BlogAuthorCard from '@/features/blog/components/BlogAuthorCard';
import RelatedPostsList from '@/features/blog/components/RelatedPostsList';

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog: any = await getBlogPost(slug);

  if (!blog) {
    return { title: 'Blog Post Not Found | Sahitya Bari' };
  }

  return {
    title: `${blog.title} | Sahitya Bari`,
    description: blog.excerpt || blog.title,
  };
}

async function CommentsWrapper({ blogPostId }: { blogPostId: string }) {
  const comments = await getComments(blogPostId);
  const session = await auth();
  const isAdmin = session?.user?.role === 'ADMIN';

  const CommentsSection = (await import('@/features/comments/components/CommentsSection')).default;

  return (
    <CommentsSection
      blogPostId={blogPostId}
      initialComments={comments}
      isAdmin={isAdmin}
    />
  );
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const blog: any = await getBlogPost(slug);

  if (!blog) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(blog.category, blog._id.toString());

  return (
    <div className="min-h-screen pt-28 pb-14 overflow-visible bg-[var(--background)]">
      {/* Atmospheric gradient — fixed, subtle */}
      <div className="fixed inset-0 pointer-events-none opacity-10 dark:opacity-5 z-0">
        <div className="absolute top-[-15%] right-[-8%] w-[60vw] h-[60vw] bg-[var(--primary)]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-15%] left-[-8%] w-[60vw] h-[60vw] bg-[var(--secondary)]/10 blur-[120px] rounded-full" />
      </div>

      <div className="site-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-start">

          {/* Main Column */}
          <div className="lg:col-span-8 space-y-10">
            <header className="space-y-6">
              <Link
                href="/blog"
                className="inline-flex items-center gap-3 text-[var(--foreground)]/60 hover:text-[var(--primary)] transition-all group text-[10px] font-black uppercase tracking-[0.3em]"
              >
                <ArrowLeft size={14} className="group-hover:-translate-x-1.5 transition-transform" />
                <span>Archive Index</span>
              </Link>

              <div className="space-y-6">
                <MotionDiv
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-[var(--primary)]"
                >
                  <span className="w-12 h-[2px] bg-[var(--primary)]"></span>
                  {blog.category}
                </MotionDiv>

                <MotionH1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-black font-bengali text-[var(--foreground)] leading-[1.2] tracking-tight"
                >
                  {blog.title}
                </MotionH1>
              </div>

              <div className="flex flex-wrap items-center gap-5 py-5 border-y border-[var(--glass-border)] text-xs font-bold uppercase tracking-wider text-[var(--foreground)]/55">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-[var(--radius-full)] bg-[var(--surface-300)] border border-[var(--glass-border)] flex items-center justify-center text-[var(--primary)] shadow-sm">
                    <User size={16} />
                  </div>
                  <div>
                    <span className="block text-[8px] text-[var(--foreground)]/40 mb-0.5 uppercase tracking-widest">Author</span>
                    <span className="text-[var(--foreground)] font-black">{blog.author}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-[var(--radius-full)] bg-[var(--surface-300)] border border-[var(--glass-border)] flex items-center justify-center text-[var(--accent)] shadow-sm">
                    <Calendar size={16} />
                  </div>
                  <div>
                    <span className="block text-[8px] text-[var(--foreground)]/40 mb-0.5 uppercase tracking-widest">Published</span>
                    <span className="text-[var(--foreground)] font-black">{format(new Date(blog.publishedAt), 'MMM d, yyyy')}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 ml-auto">
                  <span className="text-[9px] text-[var(--foreground)]/40 uppercase tracking-widest">Share:</span>
                  <button className="w-9 h-9 rounded-[var(--radius-full)] border border-[var(--glass-border)] flex items-center justify-center hover:bg-[var(--primary)]/10 hover:text-[var(--primary)] transition-all"><Twitter size={14} /></button>
                  <button className="w-9 h-9 rounded-[var(--radius-full)] border border-[var(--glass-border)] flex items-center justify-center hover:bg-[var(--secondary)]/10 hover:text-[var(--secondary)] transition-all"><Facebook size={14} /></button>
                </div>
              </div>
            </header>

            {/* Featured Visual */}
            {blog.coverImage && (
              <MotionDiv
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-[16/9] rounded-[1.25rem] overflow-hidden shadow-xl shadow-black/8 border border-[var(--glass-border)] group"
              >
                <Image
                   src={blog.coverImage}
                   alt={blog.title}
                   fill
                   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
                   className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                   priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60" />
              </MotionDiv>
            )}

            {/* Core Narrative */}
            <article className="max-w-none">
              <div className="prose prose-2xl dark:prose-invert max-w-none 
                prose-headings:font-black prose-headings:font-bengali prose-headings:text-[var(--foreground)] prose-headings:tracking-tighter prose-headings:mt-16 prose-headings:mb-8
                prose-p:text-[var(--foreground)]/90 prose-p:leading-[2.1] prose-p:font-light prose-p:mb-12
                prose-strong:text-[var(--foreground)] prose-strong:font-black
                prose-a:text-[var(--primary)] prose-a:underline decoration-[var(--primary)]/40 underline-offset-8 hover:decoration-[var(--primary)] transition-all
                prose-blockquote:border-l-[4px] prose-blockquote:border-[var(--primary)] prose-blockquote:bg-[var(--surface-50)] prose-blockquote:px-16 prose-blockquote:py-12 prose-blockquote:rounded-[3rem] prose-blockquote:text-3xl prose-blockquote:font-black prose-blockquote:italic prose-blockquote:text-[var(--foreground)] prose-blockquote:mb-16 prose-blockquote:shadow-sm
                prose-img:rounded-[3rem] prose-img:my-20 prose-img:shadow-2xl prose-img:border-[1px] prose-img:border-[var(--glass-border)]
                prose-ul:list-none prose-ul:pl-0 prose-li:mb-4 prose-li:before:content-['—'] prose-li:before:text-[var(--primary)] prose-li:before:mr-4"
              >
                <ReactMarkdown>{blog.content}</ReactMarkdown>
              </div>

              {/* Engagement row */}
              <div className="mt-10 pt-8 border-t border-[var(--glass-border)] flex flex-wrap items-center justify-between gap-5">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--foreground)]/40">Topic</span>
                  <span className="px-5 py-2 rounded-[var(--radius-xl)] bg-[var(--surface-100)] border border-[var(--glass-border)] text-[10px] font-black uppercase tracking-widest text-[var(--primary)] shadow-sm">
                    {blog.category}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2.5 px-6 py-3 rounded-[var(--radius-xl)] bg-[var(--foreground)] text-[var(--background)] text-xs font-black uppercase tracking-[0.2em] shadow-[var(--shadow-sm)] hover:bg-[var(--primary)] hover:text-white hover:-translate-y-0.5 active:translate-y-0 transition-all">
                    <Bookmark size={14} />
                    <span>Save</span>
                  </button>
                  <button className="p-3 rounded-[var(--radius-xl)] border border-[var(--glass-border)] bg-[var(--surface-50)] text-[var(--foreground)]/55 hover:text-[var(--primary)] hover:border-[var(--primary)]/30 transition-all">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>

              {/* Community Dialogue */}
              <Suspense fallback={<div className="mt-20 p-10 border border-dashed border-[var(--glass-border)] rounded-[3rem] text-center opacity-40">Loading discussion...</div>}>
                <CommentsWrapper blogPostId={blog._id.toString()} />
              </Suspense>
            </article>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            <BlogAuthorCard author={blog.author} />
            <RelatedPostsList posts={relatedPosts} />
          </aside>
        </div>
      </div>
    </div>
  );
}
