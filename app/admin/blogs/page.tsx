import dbConnect from "@/lib/mongodb"
import BlogPost from "@/lib/models/BlogPost"
import { Plus, Edit3, Trash2, FileText, Calendar, Tag, Sparkles, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { deleteBlogPost } from "@/app/actions/blog";
import DeleteForm from "@/components/admin/DeleteForm";

async function handleDelete(id: string) {
  "use server"
  await deleteBlogPost(id)
}

export default async function AdminBlogsPage() {
  await dbConnect();
  const rawBlogs = await BlogPost.find()
    .sort({ publishedAt: -1 })
    .lean();

  const blogs = rawBlogs.map((blog: any) => ({
    ...blog,
    id: blog._id.toString(),
    publishedAt: blog.publishedAt.toISOString(),
  }));

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-[var(--foreground)] tracking-tight">Blog Articles</h1>
          <p className="text-[var(--foreground)]/50 font-medium">Create and refine your literary publications.</p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="btn-ios flex items-center gap-2 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white px-6 py-3 rounded-[var(--radius-full)] font-bold shadow-xl shadow-[var(--primary)]/20 hover:scale-105 active:scale-95"
        >
          <Plus size={20} />
          New Article
        </Link>
      </div>

      <div className="bg-[var(--surface-100)]/40 backdrop-blur-xl rounded-[var(--radius-xl)] border border-[var(--glass-border)] overflow-hidden shadow-2xl shadow-[var(--primary)]/5 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--glass-border)]">
                <th className="px-8 py-6 text-xs font-black text-[var(--foreground)]/40 uppercase tracking-widest">Article Information</th>
                <th className="px-8 py-6 text-xs font-black text-[var(--foreground)]/40 uppercase tracking-widest">Meta Data</th>
                <th className="px-8 py-6 text-xs font-black text-[var(--foreground)]/40 uppercase tracking-widest">Publication</th>
                <th className="px-8 py-6 text-xs font-black text-[var(--foreground)]/40 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--glass-border)]/50">
              {blogs.map((blog, idx) => (
                <tr key={blog.id} className="group hover:bg-[var(--primary)]/[0.02] transition-colors">
                  <td className="px-8 py-6">
                    <div className="max-w-md space-y-2">
                      <p className="text-base font-bold text-[var(--foreground)] leading-snug group-hover:text-[var(--primary)] transition-colors line-clamp-2">
                        {blog.title}
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--success)] uppercase tracking-tighter bg-[var(--success)]/10 px-2.5 py-1 rounded-[var(--radius-sm)]">
                          <Sparkles size={14} />
                          Active
                        </div>
                        <div className="text-xs font-bold text-[var(--foreground)]/40 uppercase tracking-tighter">
                          Slug: {blog.slug}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-[var(--foreground)]/60">
                        <div className="w-8 h-8 rounded-[var(--radius-sm)] bg-[var(--secondary)]/10 flex items-center justify-center text-[var(--secondary)]">
                          <Tag size={14} />
                        </div>
                        <span className="font-bold">{blog.category}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-[var(--radius-sm)] bg-[var(--success)]/10 flex items-center justify-center text-[var(--success)]">
                        <Calendar size={14} />
                      </div>
                      <div className="flex flex-col leading-tight">
                        <span className="font-bold text-[var(--foreground)]">{format(new Date(blog.publishedAt), 'MMM d, yyyy')}</span>
                        <span className="text-xs font-bold text-[var(--foreground)]/50 uppercase tracking-tighter">Live Status</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 transition-all duration-300">
                      <Link
                        href={`/blog/${blog.slug}`}
                        target="_blank"
                        className="w-10 h-10 rounded-[var(--radius-sm)] bg-[var(--surface-200)] flex items-center justify-center text-[var(--foreground)]/60 hover:bg-[var(--primary)] hover:text-white transition-all hover:rotate-12"
                        title="View Published"
                      >
                        <ArrowUpRight size={18} />
                      </Link>
                      <Link
                        href={`/admin/blogs/${blog.id}/edit`}
                        className="w-10 h-10 rounded-[var(--radius-sm)] bg-[var(--surface-200)] flex items-center justify-center text-[var(--foreground)]/60 hover:bg-[var(--secondary)] hover:text-white transition-all hover:-rotate-12"
                        title="Edit Article"
                      >
                        <Edit3 size={18} />
                      </Link>
                      <DeleteForm action={handleDelete.bind(null, blog.id)}>
                        <button
                          type="submit"
                          className="w-10 h-10 rounded-[var(--radius-sm)] bg-[var(--surface-200)] flex items-center justify-center text-[var(--foreground)]/60 hover:bg-[var(--destructive)] hover:text-white transition-all hover:rotate-12"
                          title="Delete Article"
                        >
                          <Trash2 size={18} />
                        </button>
                      </DeleteForm>
                    </div>
                  </td>
                </tr>
              ))}
              {blogs.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-8 py-24 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-[var(--radius-lg)] bg-[var(--surface-200)] flex items-center justify-center text-[var(--foreground)]/30">
                        <FileText size={32} />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold text-[var(--foreground)]">No Publications</h3>
                        <p className="text-sm text-[var(--foreground)]/40 font-medium">Start sharing your thoughts with the world.</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
