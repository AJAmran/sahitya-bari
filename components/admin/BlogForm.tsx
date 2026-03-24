"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import { createBlogPost, updateBlogPost } from "@/app/actions/blog"
import {
  Type,
  Link as LinkIcon,
  Tag,
  User,
  Image as ImageIcon,
  AlignLeft,
  FileText,
  Save,
  X,
  Loader2,
  CheckCircle2
} from "lucide-react"

const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().nullable().optional().transform(v => v || ""),
  content: z.string().min(1, "Content is required"),
  coverImage: z.string().nullable().optional().transform(v => v || ""),
  category: z.string().min(1, "Category is required"),
  author: z.string().min(1, "Author is required"),
})

interface BlogFormProps {
  initialData?: any
}

export default function BlogForm({ initialData }: BlogFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<any>({
    resolver: zodResolver(blogSchema),
    defaultValues: initialData || {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      coverImage: "",
      category: "",
      author: "Admin",
    },
  })

  // Auto-generate slug from title if title changes and slug is empty
  const title = watch("title")
  const slug = watch("slug")

  const generateSlug = () => {
    if (title && !slug) {
      const generated = title
        .toLowerCase()
        // Replace spaces and special chars (but keep Unicode letters/marks/digits and hyphens)
        .replace(/[\s_]+/g, "-")
        // Remove characters that are not letters, marks, digits, hyphens, or Unicode chars
        .replace(/[^\p{L}\p{M}\p{N}-]/gu, "")
        .replace(/-+/g, "-") // Collapse multiple hyphens
        .replace(/^-|-$/g, "") // Trim leading/trailing hyphens
      setValue("slug", generated || `post-${Date.now()}`)
    }
  }

  const onSubmit = async (data: any) => {
    setLoading(true)
    const toastId = toast.loading(initialData ? "Updating article..." : "Publishing article...")
    try {
      if (initialData?.id) {
        await updateBlogPost(initialData.id, data)
        toast.success("Blog post updated successfully", { id: toastId, icon: <CheckCircle2 className="text-green-500" /> })
      } else {
        await createBlogPost(data)
        toast.success("Blog post created successfully", { id: toastId, icon: <CheckCircle2 className="text-green-500" /> })
      }
      router.push("/admin/blogs")
      router.refresh()
    } catch (error) {
      toast.error("Something went wrong", { id: toastId })
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Editor Section */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-[var(--surface-100)]/40 backdrop-blur-xl rounded-[var(--radius-xl)] border border-[var(--glass-border)] p-8 md:p-10 space-y-8 shadow-2xl shadow-[var(--primary)]/5">
            <div className="space-y-2">
              <label className="text-xs font-black text-[var(--foreground)]/30 uppercase tracking-[0.2em] flex items-center gap-2">
                <Type size={14} className="text-[var(--primary)]" />
                Article Title
              </label>
              <input
                {...register("title")}
                onBlur={generateSlug}
                placeholder="Enter a compelling title..."
                className="w-full bg-transparent border-none p-0 text-3xl font-black text-[var(--foreground)] placeholder-[var(--foreground)]/10 focus:ring-0 outline-none"
              />
              {errors.title && <p className="text-[var(--destructive)] text-[10px] font-bold uppercase tracking-tighter">{String(errors.title.message)}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-[var(--foreground)]/30 uppercase tracking-[0.2em] flex items-center gap-2">
                <AlignLeft size={14} className="text-[var(--primary)]" />
                Short Excerpt
              </label>
              <textarea
                {...register("excerpt")}
                placeholder="Brief summary of the article..."
                className="w-full bg-[var(--surface-200)]/50 rounded-[var(--radius-lg)] border border-[var(--glass-border)] p-5 text-sm font-medium text-[var(--foreground)] placeholder-[var(--foreground)]/20 focus:ring-2 focus:ring-[var(--primary)]/30 focus:bg-[var(--surface-100)] outline-none transition-all h-24 resize-none shadow-inner"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-[var(--foreground)]/30 uppercase tracking-[0.2em] flex items-center gap-2">
                <FileText size={14} className="text-[var(--primary)]" />
                Main Content (Markdown)
              </label>
              <textarea
                {...register("content")}
                placeholder="# Start writing your story..."
                className="w-full bg-[var(--surface-200)]/50 rounded-[var(--radius-lg)] border border-[var(--glass-border)] p-8 text-base font-mono leading-relaxed text-[var(--foreground)] placeholder-[var(--foreground)]/10 focus:ring-2 focus:ring-[var(--primary)]/30 focus:bg-[var(--surface-100)] outline-none transition-all h-[500px] shadow-inner"
              />
              {errors.content && <p className="text-[var(--destructive)] text-[10px] font-bold uppercase tracking-tighter">{String(errors.content.message)}</p>}
            </div>
          </div>
        </div>

        {/* Sidebar Configuration */}
        <div className="space-y-8">
          <div className="bg-[var(--surface-100)]/40 backdrop-blur-xl rounded-[var(--radius-xl)] border border-[var(--glass-border)] p-8 space-y-8 shadow-2xl shadow-[var(--primary)]/5">
            <h3 className="text-sm font-black text-[var(--foreground)]/50 uppercase tracking-[0.2em] pb-4 border-b border-[var(--glass-border)]">Publishing Meta</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[var(--foreground)]/30 uppercase tracking-widest flex items-center gap-2">
                  <LinkIcon size={12} />
                  URL Slug
                </label>
                <input
                  {...register("slug")}
                  placeholder="url-friendly-slug"
                  className="w-full bg-[var(--surface-200)]/50 rounded-[var(--radius-md)] border border-[var(--glass-border)] px-4 py-3 text-xs font-bold text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] transition-all outline-none shadow-inner placeholder-[var(--foreground)]/20"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-[var(--foreground)]/30 uppercase tracking-widest flex items-center gap-2">
                  <Tag size={12} />
                  Category
                </label>
                <input
                  {...register("category")}
                  placeholder="e.g. Literature"
                  className="w-full bg-[var(--surface-200)]/50 rounded-[var(--radius-md)] border border-[var(--glass-border)] px-4 py-3 text-xs font-bold text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] transition-all outline-none shadow-inner placeholder-[var(--foreground)]/20"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-[var(--foreground)]/30 uppercase tracking-widest flex items-center gap-2">
                  <User size={12} />
                  Author
                </label>
                <input
                  {...register("author")}
                  placeholder="Author Name"
                  className="w-full bg-[var(--surface-200)]/50 rounded-[var(--radius-md)] border border-[var(--glass-border)] px-4 py-3 text-xs font-bold text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] transition-all outline-none shadow-inner placeholder-[var(--foreground)]/20"
                />
              </div>
            </div>
          </div>

          <div className="bg-[var(--surface-100)]/40 backdrop-blur-xl rounded-[var(--radius-xl)] border border-[var(--glass-border)] p-8 space-y-6 shadow-2xl shadow-[var(--primary)]/5">
            <h3 className="text-sm font-black text-[var(--foreground)]/50 uppercase tracking-[0.2em] pb-4 border-b border-[var(--glass-border)]">Visuals</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[var(--foreground)]/30 uppercase tracking-widest flex items-center gap-2">
                  <ImageIcon size={12} />
                  Cover Image URL
                </label>
                <input
                  {...register("coverImage")}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-[var(--surface-200)]/50 rounded-[var(--radius-md)] border border-[var(--glass-border)] px-4 py-3 text-xs font-bold text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] transition-all outline-none shadow-inner placeholder-[var(--foreground)]/20"
                />
              </div>
              {watch("coverImage") && (
                <div className="relative aspect-video rounded-[var(--radius-lg)] overflow-hidden border border-[var(--glass-border)] shadow-lg bg-[var(--surface-200)]">
                  <img src={watch("coverImage")} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              type="submit"
              disabled={loading}
              className="group btn-ios flex items-center justify-center gap-3 w-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white py-5 rounded-[var(--radius-lg)] font-black shadow-2xl shadow-[var(--primary)]/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 size={24} className="animate-spin" /> : <Save size={24} className="group-hover:rotate-12 transition-transform" />}
              <span>{initialData ? "Update Publication" : "Launch Article"}</span>
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="btn-ios flex items-center justify-center gap-3 w-full bg-[var(--surface-200)]/50 border border-[var(--glass-border)] text-[var(--foreground)] py-4 rounded-[var(--radius-lg)] font-bold hover:bg-[var(--surface-300)]/50 transition-all text-sm"
            >
              <X size={18} />
              Discard Changes
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
