import dbConnect from '@/lib/mongodb';
import BlogPost from '@/lib/models/BlogPost';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { ArrowLeft, Calendar, User, Share2, Bookmark, AtSign, Globe, Twitter, Facebook } from 'lucide-react';
import Link from 'next/link';
import { MotionDiv, MotionH1 } from '@/components/Motion';
import ReactMarkdown from 'react-markdown';
import type { Metadata } from 'next';
import CommentsSection from '@/components/CommentsSection';
import { getComments } from '@/app/actions/comments';
import { auth } from '@/lib/auth-node';

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  const decodedSlug = decodeURIComponent(rawSlug);
  await dbConnect();
  const blog = await BlogPost.findOne({
    $or: [{ slug: rawSlug }, { slug: decodedSlug }]
  }).lean();

  if (!blog) {
    return { title: 'Blog Post Not Found | Sahitya Bari' };
  }

  return {
    title: `${(blog as any).title} | Sahitya Bari`,
    description: (blog as any).excerpt || (blog as any).title,
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug: rawSlug } = await params;
  const decodedSlug = decodeURIComponent(rawSlug);

  await dbConnect();
  const blog: any = await BlogPost.findOne({
    $or: [{ slug: rawSlug }, { slug: decodedSlug }]
  }).lean();

  if (!blog) {
    notFound();
  }

  // Fetch related posts (same category, exclude current)
  const rawRelatedPosts = await BlogPost.find({
    category: blog.category,
    _id: { $ne: blog._id },
  })
    .sort({ publishedAt: -1 })
    .limit(3)
    .lean();

  const relatedPosts = rawRelatedPosts.map((post: any) => ({
    ...post,
    id: post._id.toString(),
    publishedAt: post.publishedAt.toISOString(),
  }));

  const comments = await getComments(blog._id.toString());
  const session = await auth();
  const isAdmin = session?.user?.role === 'ADMIN';

  return (
    <div className="min-h-screen pt-32 pb-20 overflow-visible selection:bg-[var(--primary)] selection:text-white bg-[var(--background)]">
      {/* Subtle Atmospheric Gradient */}
      <div className="fixed inset-0 pointer-events-none opacity-20 dark:opacity-10 z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-[var(--primary)]/10 blur-[150px] rounded-[var(--radius-full)]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-[var(--secondary)]/10 blur-[150px] rounded-[var(--radius-full)]" />
      </div>

      <div className="site-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 items-start">

          {/* Main Column */}
          <div className="lg:col-span-8 space-y-16">
            <header className="space-y-10">
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

              <div className="flex flex-wrap items-center gap-10 py-8 border-y border-[var(--glass-border)] text-[11px] font-black uppercase tracking-[0.2em] text-[var(--foreground)]/60">
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
                className="relative aspect-[16/9] md:aspect-[21/9] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/10 border border-[var(--glass-border)] group"
              >
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-110"
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

              {/* Engagement Hub */}
              <div className="mt-24 pt-12 border-t border-[var(--glass-border)] flex flex-wrap items-center justify-between gap-10">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--foreground)]/40">Topic</span>
                  <span className="px-5 py-2 rounded-[var(--radius-xl)] bg-[var(--surface-100)] border border-[var(--glass-border)] text-[10px] font-black uppercase tracking-widest text-[var(--primary)] shadow-sm">
                    {blog.category}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-3 px-10 py-4 rounded-[var(--radius-2xl)] bg-[var(--foreground)] text-[var(--background)] text-[11px] font-black uppercase tracking-[0.3em] shadow-xl hover:translate-y-[-2px] active:translate-y-[1px] transition-all">
                    <Bookmark size={16} />
                    <span>Store Reflection</span>
                  </button>
                  <button className="p-4 rounded-[var(--radius-2xl)] border border-[var(--glass-border)] bg-[var(--surface-50)] text-[var(--foreground)]/60 hover:text-[var(--primary)] hover:border-[var(--primary)]/30 transition-all">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>

              {/* Community Dialogue */}
              <CommentsSection
                blogPostId={blog._id.toString()}
                initialComments={comments}
                isAdmin={isAdmin}
              />
            </article>
          </div>

          {/* Sidebar Area */}
          <aside className="lg:col-span-4 space-y-20 lg:sticky lg:top-32">

            {/* Author Insight Card */}
            <div className="p-10 rounded-[3rem] bg-[var(--surface-50)] border border-[var(--glass-border)] shadow-sm space-y-10 group">
              <div className="space-y-6">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--foreground)]/40 border-b border-[var(--glass-border)] pb-6">Editorial Board</h3>
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[var(--primary)] to-[var(--secondary)] blur-2xl opacity-0 group-hover:opacity-20 transition-opacity rounded-[var(--radius-full)]" />
                    <div className="relative w-24 h-24 rounded-[2rem] bg-[var(--surface-300)] border border-[var(--glass-border)] flex items-center justify-center overflow-hidden rotate-3 group-hover:rotate-0 transition-transform duration-500">
                      <User size={48} className="text-[var(--primary)]/40" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-2xl font-black font-bengali text-[var(--foreground)] leading-none">{blog.author}</h4>
                    <p className="text-[9px] font-black text-[var(--primary)] uppercase tracking-[0.2em]">Principal Curator</p>
                  </div>
                </div>
                <p className="text-sm text-[var(--foreground)]/70 font-medium leading-relaxed text-center px-4">
                  Deconstructing the architecture of modern thought through the lens of classical Bengali literature.
                </p>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button className="flex-1 py-3.5 rounded-[var(--radius-2xl)] bg-[var(--surface-100)] border border-[var(--glass-border)] flex items-center justify-center hover:bg-[var(--primary)]/5 hover:border-[var(--primary)]/20 transition-all group/icon">
                  <Twitter size={16} className="text-[var(--foreground)]/20 group-hover/icon:text-[var(--primary)] transition-colors" />
                </button>
                <button className="flex-1 py-3.5 rounded-[var(--radius-2xl)] bg-[var(--surface-100)] border border-[var(--glass-border)] flex items-center justify-center hover:bg-[var(--secondary)]/5 hover:border-[var(--secondary)]/20 transition-all group/icon">
                  <AtSign size={16} className="text-[var(--foreground)]/20 group-hover/icon:text-[var(--secondary)] transition-colors" />
                </button>
                <button className="flex-1 py-3.5 rounded-[var(--radius-2xl)] bg-[var(--surface-100)] border border-[var(--glass-border)] flex items-center justify-center hover:bg-[var(--accent)]/5 hover:border-[var(--accent)]/20 transition-all group/icon">
                  <Globe size={16} className="text-[var(--foreground)]/20 group-hover/icon:text-[var(--accent)] transition-colors" />
                </button>
              </div>
            </div>

            {/* Recommended Narratives */}
            {relatedPosts.length > 0 && (
              <div className="space-y-10 px-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--foreground)]/40 border-b border-[var(--glass-border)] pb-6">Journal Stream</h3>
                <div className="space-y-8">
                  {relatedPosts.map((post, idx) => (
                    <div key={post.id} className="group cursor-pointer">
                      <Link href={`/blog/${post.slug}`} className="space-y-4 block">
                        <div className="relative aspect-[16/10] rounded-[1.5rem] overflow-hidden border border-[var(--glass-border)]">
                          <img
                            src={post.coverImage || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c'}
                            alt={post.title}
                            className="w-full h-full object-cover grayscale-[100%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-[var(--radius-sm)] text-[8px] font-black text-white uppercase tracking-widest">{post.category}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-lg font-black font-bengali text-[var(--foreground)] leading-tight group-hover:text-[var(--primary)] transition-colors line-clamp-2">
                            {post.title}
                          </h4>
                          <div className="flex items-center gap-3 text-[9px] font-black text-[var(--foreground)]/60 uppercase tracking-[0.2em]">
                            <span className="w-4 h-[1px] bg-[var(--glass-border)]"></span>
                            <span>{format(new Date(post.publishedAt), 'MMM YYYY')}</span>
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
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
