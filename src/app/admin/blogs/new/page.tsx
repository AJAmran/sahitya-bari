import BlogForm from "@/features/admin/components/BlogForm"
import { FilePlus, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewBlogPage() {
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
            <FilePlus size={24} />
          </div>
          <h1 className="text-2xl lg:text-3xl font-black text-[var(--foreground)] tracking-tight">Compose New Article</h1>
        </div>
      </div>

      <BlogForm />
    </div>
  )
}
