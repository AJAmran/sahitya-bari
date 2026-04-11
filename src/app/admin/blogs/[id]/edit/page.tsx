import dbConnect from "@/lib/mongodb"
import BlogPost from "@/lib/models/BlogPost"
import BlogForm from "@/features/admin/components/BlogForm"
import { notFound } from "next/navigation"
import { Edit3, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface EditBlogPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const { id } = await params
  await dbConnect()
  const blog = await BlogPost.findById(id).lean()

  if (!blog || typeof blog !== 'object') {
    notFound()
  }

  // Transform Mongoose result to match BlogForm's expected interface
  const formData = {
    id: (blog as any)._id.toString(),
    title: (blog as any).title,
    slug: (blog as any).slug,
    excerpt: (blog as any).excerpt || "",
    content: (blog as any).content,
    coverImage: (blog as any).coverImage || "",
    category: (blog as any).category,
    author: (blog as any).author,
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4">
        <Link
          href="/admin/blogs"
          className="flex items-center gap-2 text-xs font-bold text-[var(--foreground)]/40 hover:text-[var(--primary)] transition-colors w-fit group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Articles
        </Link>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-[var(--radius-md)] bg-[var(--secondary)]/10 flex items-center justify-center text-[var(--secondary)]">
            <Edit3 size={24} />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl lg:text-3xl font-black text-[var(--foreground)] tracking-tight">Refine Article</h1>
            <p className="text-[var(--foreground)]/40 text-xs font-bold uppercase tracking-widest">Editing: {formData.title}</p>
          </div>
        </div>
      </div>

      <BlogForm initialData={formData} />
    </div>
  )
}
