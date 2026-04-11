"use client"
import Image from "next/image"
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import ReactMarkdown from "react-markdown"
import { createBlogPost, updateBlogPost } from "@/features/blog/actions"
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
  CheckCircle2,
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Code,
  Highlighter,
  Eye,
  PenTool
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
  const [isPreview, setIsPreview] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues
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

  // Register content field with ref manually to support toolbar insertion
  const { ref: contentRef, ...contentRegister } = register("content")

  const title = watch("title")
  const slug = watch("slug")

  const generateSlug = () => {
    if (title && !slug) {
      const generated = title
        .toLowerCase()
        .replace(/[\s_]+/g, "-")
        .replace(/[^\p{L}\p{M}\p{N}-]/gu, "")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")
      setValue("slug", generated || `post-${Date.now()}`)
    }
  }

  const insertMarkdown = (prefix: string, suffix: string = "") => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const text = getValues("content")
    const selectedText = text.substring(start, end)
    
    const newText = 
      text.substring(0, start) + 
      prefix + selectedText + suffix + 
      text.substring(end)

    setValue("content", newText)
    
    // Focus back and set cursor
    setTimeout(() => {
      textarea.focus()
      const newPos = start + prefix.length + selectedText.length + suffix.length
      textarea.setSelectionRange(newPos, newPos)
    }, 0)
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

  const MarkdownToolbarButton = ({ onClick, icon: Icon, title }: any) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="p-1.5 rounded-[var(--radius-sm)] hover:bg-[var(--primary)]/10 text-[var(--foreground)]/60 hover:text-[var(--primary)] transition-all active:scale-95"
    >
      <Icon size={16} />
    </button>
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 admin-suite">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Editor Section */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-[var(--surface-100)]/40 backdrop-blur-xl rounded-[var(--radius-xl)] border border-[var(--glass-border)] p-8 md:p-10 space-y-8 shadow-2xl shadow-[var(--primary)]/5">
            <div className="space-y-2">
              <label className="admin-label flex items-center gap-2">
                <Type size={14} className="text-[var(--primary)]" />
                Article Title
              </label>
              <input
                {...register("title")}
                onBlur={generateSlug}
                placeholder="Enter a compelling title..."
                className="w-full bg-transparent border-none p-0 text-2xl lg:text-3xl font-black text-[var(--foreground)] placeholder-[var(--foreground)]/10 focus:ring-0 outline-none"
              />
              {errors.title && <p className="text-[var(--destructive)] text-[10px] font-bold uppercase tracking-tighter">{String(errors.title.message)}</p>}
            </div>

            <div className="space-y-2">
              <label className="admin-label flex items-center gap-2">
                <AlignLeft size={14} className="text-[var(--primary)]" />
                Short Excerpt
              </label>
              <textarea
                {...register("excerpt")}
                placeholder="Brief summary of the article..."
                className="w-full bg-[var(--surface-200)]/30 rounded-[var(--radius-lg)] border border-[var(--glass-border)] p-5 text-sm font-medium text-[var(--foreground)] placeholder-[var(--foreground)]/20 focus:ring-2 focus:ring-[var(--primary)]/30 focus:bg-[var(--surface-100)] outline-none transition-all h-24 resize-none shadow-inner"
              />
            </div>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <label className="admin-label flex items-center gap-2">
                  <FileText size={14} className="text-[var(--primary)]" />
                  Main Content (Markdown)
                </label>
                
                {/* Advanced Toolbar */}
                <div className="flex items-center gap-0.5 p-1 bg-[var(--surface-200)]/50 border border-[var(--glass-border)] rounded-[var(--radius-md)] overflow-x-auto scrollbar-hide">
                  <MarkdownToolbarButton onClick={() => insertMarkdown("**", "**")} icon={Bold} title="Bold" />
                  <MarkdownToolbarButton onClick={() => insertMarkdown("*", "*")} icon={Italic} title="Italic" />
                  <div className="w-[1px] h-6 bg-[var(--glass-border)] mx-1" />
                  <MarkdownToolbarButton onClick={() => insertMarkdown("\n# ", "")} icon={Heading1} title="Heading 1" />
                  <MarkdownToolbarButton onClick={() => insertMarkdown("\n## ", "")} icon={Heading2} title="Heading 2" />
                  <div className="w-[1px] h-6 bg-[var(--glass-border)] mx-1" />
                  <MarkdownToolbarButton onClick={() => insertMarkdown("\n- ", "")} icon={List} title="Bullet List" />
                  <MarkdownToolbarButton onClick={() => insertMarkdown("\n1. ", "")} icon={ListOrdered} title="Numbered List" />
                  <div className="w-[1px] h-6 bg-[var(--glass-border)] mx-1" />
                  <MarkdownToolbarButton onClick={() => insertMarkdown("\n> ", "")} icon={Quote} title="Quote" />
                  <MarkdownToolbarButton onClick={() => insertMarkdown("`", "`")} icon={Code} title="Inline Code" />
                  <MarkdownToolbarButton onClick={() => insertMarkdown("<mark>", "</mark>")} icon={Highlighter} title="Highlight" />
                  <div className="w-[1px] h-6 bg-[var(--glass-border)] mx-1 hover:bg-[var(--primary)]/20 transition-colors" />
                  
                  <button
                    type="button"
                    onClick={() => setIsPreview(!isPreview)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-sm)] text-[10px] font-black uppercase tracking-widest transition-all ${isPreview ? "bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/20" : "hover:bg-[var(--primary)]/10 text-[var(--foreground)]/40 hover:text-[var(--primary)]"}`}
                  >
                    {isPreview ? <PenTool size={12} /> : <Eye size={12} />}
                    {isPreview ? "Edit" : "Review Mode"}
                  </button>
                </div>
              </div>

              <div className="relative group">
                {isPreview ? (
                  <div className="w-full bg-[var(--surface-100)] rounded-[var(--radius-lg)] border border-[var(--glass-border)] p-10 h-[600px] overflow-y-auto prose dark:prose-invert prose-slate max-w-none shadow-inner">
                    <ReactMarkdown>{watch("content") || "*No content provided yet.*"}</ReactMarkdown>
                  </div>
                ) : (
                  <>
                    <textarea
                      {...contentRegister}
                      ref={(e) => {
                        contentRef(e)
                        // @ts-ignore
                        textareaRef.current = e
                      }}
                      placeholder="# Start writing your story..."
                      className="w-full bg-[var(--surface-200)]/30 rounded-[var(--radius-lg)] border border-[var(--glass-border)] p-8 text-base font-mono leading-relaxed text-[var(--foreground)] placeholder-[var(--foreground)]/10 focus:ring-2 focus:ring-[var(--primary)]/30 focus:bg-[var(--surface-100)] outline-none transition-all h-[600px] shadow-inner resize-y min-h-[400px]"
                    />
                    <div className="absolute bottom-4 right-4 px-2 py-1 rounded bg-black/5 text-[10px] text-[var(--foreground)]/20 font-mono tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      Line: {watch("content").split("\n").length} | Words: {watch("content").split(/\s+/).filter(Boolean).length}
                    </div>
                  </>
                )}
              </div>
              {errors.content && <p className="text-[var(--destructive)] text-[10px] font-bold uppercase tracking-tighter">{String(errors.content.message)}</p>}
            </div>
          </div>
        </div>

        {/* Sidebar Configuration */}
        <div className="space-y-8">
          <div className="bg-[var(--surface-100)]/40 backdrop-blur-xl rounded-[var(--radius-xl)] border border-[var(--glass-border)] p-8 space-y-8 shadow-2xl shadow-[var(--primary)]/5">
            <h3 className="admin-label pb-4 border-b border-[var(--glass-border)] opacity-100 scale-100">Publishing Meta</h3>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="admin-label flex items-center gap-2 opacity-100">
                  <LinkIcon size={12} />
                  URL Slug
                </label>
                <input
                  {...register("slug")}
                  placeholder="url-friendly-slug"
                  className="w-full bg-[var(--surface-200)]/30 rounded-[var(--radius-md)] border border-[var(--glass-border)] px-4 py-3 text-xs font-bold text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] transition-all outline-none shadow-inner placeholder-[var(--foreground)]/20"
                />
              </div>

              <div className="space-y-2">
                <label className="admin-label flex items-center gap-2 opacity-100">
                  <Tag size={12} />
                  Category
                </label>
                <input
                  {...register("category")}
                  placeholder="e.g. Literature"
                  className="w-full bg-[var(--surface-200)]/30 rounded-[var(--radius-md)] border border-[var(--glass-border)] px-4 py-3 text-xs font-bold text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] transition-all outline-none shadow-inner placeholder-[var(--foreground)]/20"
                />
              </div>

              <div className="space-y-2">
                <label className="admin-label flex items-center gap-2 opacity-100">
                  <User size={12} />
                  Author
                </label>
                <input
                  {...register("author")}
                  placeholder="Author Name"
                  className="w-full bg-[var(--surface-200)]/30 rounded-[var(--radius-md)] border border-[var(--glass-border)] px-4 py-3 text-xs font-bold text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] transition-all outline-none shadow-inner placeholder-[var(--foreground)]/20"
                />
              </div>
            </div>
          </div>

          <div className="bg-[var(--surface-100)]/40 backdrop-blur-xl rounded-[var(--radius-xl)] border border-[var(--glass-border)] p-8 space-y-6 shadow-2xl shadow-[var(--primary)]/5">
            <h3 className="admin-label pb-4 border-b border-[var(--glass-border)] opacity-100">Visuals</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="admin-label flex items-center gap-2 opacity-100">
                  <ImageIcon size={12} />
                  Cover Image URL
                </label>
                <input
                  {...register("coverImage")}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-[var(--surface-200)]/30 rounded-[var(--radius-md)] border border-[var(--glass-border)] px-4 py-3 text-xs font-bold text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] transition-all outline-none shadow-inner placeholder-[var(--foreground)]/20"
                />
              </div>
              {watch("coverImage") && (
                <div className="relative aspect-video rounded-[var(--radius-lg)] overflow-hidden border border-[var(--glass-border)] shadow-lg bg-[var(--surface-200)]">
                  <Image src={watch("coverImage")} alt="Preview" fill className="w-full h-full object-cover" />
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

