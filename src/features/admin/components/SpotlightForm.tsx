"use client"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import { createSpotlight, updateSpotlight } from "@/features/spotlight/actions"
import {
  Type,
  Sparkles,
  AlignLeft,
  Image as ImageIcon,
  Link as LinkIcon,
  MousePointer2,
  CheckCircle2,
  Loader2,
  X,
  Save,
  Star
} from "lucide-react"

const spotlightSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().nullable().optional().transform(v => v || ""),
  description: z.string().min(1, "Description is required"),
  image: z.string().nullable().optional().transform(v => v || ""),
  buttonText: z.string().nullable().optional().transform(v => v || ""),
  buttonLink: z.string().nullable().optional().transform(v => v || ""),
  isActive: z.boolean().default(true),
})

interface SpotlightFormProps {
  initialData?: any
}

export default function SpotlightForm({ initialData }: SpotlightFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<any>({
    resolver: zodResolver(spotlightSchema),
    defaultValues: initialData || {
      title: "",
      subtitle: "",
      description: "",
      image: "",
      buttonText: "",
      buttonLink: "",
      isActive: true,
    },
  })

  const onSubmit = async (data: any) => {
    setLoading(true)
    const toastId = toast.loading(initialData ? "Updating spotlight..." : "Creating spotlight...")
    try {
      if (initialData?.id) {
        await updateSpotlight(initialData.id, data)
        toast.success("Spotlight updated successfully", { id: toastId, icon: <CheckCircle2 className="text-green-500" /> })
      } else {
        await createSpotlight(data)
        toast.success("Spotlight created successfully", { id: toastId, icon: <CheckCircle2 className="text-green-500" /> })
      }
      router.push("/admin/spotlight")
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
        <div className="lg:col-span-2 space-y-8">
          {/* Promotion Details */}
          <div className="bg-[var(--surface-100)]/40 backdrop-blur-xl rounded-[var(--radius-xl)] border border-[var(--glass-border)] p-8 md:p-10 space-y-8 shadow-2xl shadow-[var(--primary)]/5">
            <div className="flex items-center gap-4 pb-6 border-b border-[var(--glass-border)]">
              <div className="w-10 h-10 rounded-[var(--radius-sm)] bg-[var(--warning)]/10 flex items-center justify-center text-[var(--warning)]">
                <Star size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold tracking-tight">Main Promotion</h3>
                <p className="text-xs text-[var(--foreground)]/40 font-medium">Headlines and engaging descriptions.</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-[var(--foreground)]/30 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Type size={14} className="text-[var(--primary)]" />
                  Primary Headline
                </label>
                <input
                  {...register("title")}
                  placeholder="Enter the main title..."
                  className="w-full bg-[var(--surface-200)]/50 rounded-[var(--radius-md)] border border-[var(--glass-border)] px-6 py-4 text-xl font-black text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] transition-all outline-none shadow-inner placeholder-[var(--foreground)]/20"
                />
                {errors.title && <p className="text-[var(--destructive)] text-xs font-bold uppercase tracking-tighter">{String(errors.title.message)}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-[var(--foreground)]/30 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Sparkles size={14} className="text-[var(--primary)]" />
                  Engagement Subtitle
                </label>
                <input
                  {...register("subtitle")}
                  placeholder="Add a catchy secondary line..."
                  className="w-full bg-[var(--surface-200)]/50 rounded-[var(--radius-md)] border border-[var(--glass-border)] px-6 py-4 text-base font-bold text-[var(--foreground)]/70 focus:ring-2 focus:ring-[var(--primary)] transition-all outline-none shadow-inner placeholder-[var(--foreground)]/20"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-[var(--foreground)]/30 uppercase tracking-[0.2em] flex items-center gap-2">
                  <AlignLeft size={14} className="text-[var(--primary)]" />
                  Detailed Description
                </label>
                <textarea
                  {...register("description")}
                  placeholder="Describe what makes this content special..."
                  className="w-full bg-[var(--surface-200)]/50 rounded-[var(--radius-lg)] border border-[var(--glass-border)] p-6 text-base font-medium text-[var(--foreground)]/60 placeholder-[var(--foreground)]/10 focus:ring-2 focus:ring-[var(--primary)] transition-all outline-none h-40 resize-none shadow-inner"
                />
                {errors.description && <p className="text-[var(--destructive)] text-xs font-bold uppercase tracking-tighter">{String(errors.description.message)}</p>}
              </div>
            </div>
          </div>

          {/* Interaction Section */}
          <div className="bg-[var(--surface-100)]/40 backdrop-blur-xl rounded-[var(--radius-xl)] border border-[var(--glass-border)] p-8 md:p-10 space-y-8 shadow-2xl shadow-[var(--primary)]/5">
            <div className="flex items-center gap-4 pb-6 border-b border-[var(--glass-border)]">
              <div className="w-10 h-10 rounded-[var(--radius-sm)] bg-[var(--info)]/10 flex items-center justify-center text-[var(--info)]">
                <MousePointer2 size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold tracking-tight">Call to Action</h3>
                <p className="text-xs text-[var(--foreground)]/40 font-medium">Configure what users see and where they go.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-[var(--foreground)]/30 uppercase tracking-[0.2em]">Button Label</label>
                <input
                  {...register("buttonText")}
                  placeholder="e.g. Explore Now"
                  className="w-full bg-[var(--surface-200)]/50 rounded-[var(--radius-md)] border border-[var(--glass-border)] px-5 py-3.5 text-sm font-bold text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] transition-all outline-none shadow-inner placeholder-[var(--foreground)]/20"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-[var(--foreground)]/30 uppercase tracking-[0.2em]">Platform Route / URL</label>
                <div className="relative">
                  <input
                    {...register("buttonLink")}
                    placeholder="/about or https://..."
                    className="w-full bg-[var(--surface-200)]/50 rounded-[var(--radius-md)] border border-[var(--glass-border)] pl-12 pr-5 py-3.5 text-sm font-bold text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] transition-all outline-none shadow-inner placeholder-[var(--foreground)]/20"
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--foreground)]/20">
                    <LinkIcon size={16} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Visual Config */}
          <div className="bg-[var(--surface-100)]/40 backdrop-blur-xl rounded-[var(--radius-xl)] border border-[var(--glass-border)] p-8 space-y-6 shadow-2xl shadow-[var(--primary)]/5">
            <h3 className="text-sm font-black text-[var(--foreground)]/50 uppercase tracking-[0.2em] pb-4 border-b border-[var(--glass-border)]">Art Assets</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-black text-[var(--foreground)]/30 uppercase tracking-widest flex items-center gap-2">
                  <ImageIcon size={12} />
                  Feature Image URL
                </label>
                <input
                  {...register("image")}
                  placeholder="https://..."
                  className="w-full bg-[var(--surface-200)]/50 rounded-[var(--radius-md)] border border-[var(--glass-border)] px-4 py-3 text-xs font-bold text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] transition-all outline-none shadow-inner placeholder-[var(--foreground)]/20"
                />
              </div>
              {watch("image") && (
                <div className="relative aspect-square rounded-[var(--radius-lg)] overflow-hidden border border-[var(--glass-border)] shadow-lg bg-[var(--surface-200)]">
                  <Image src={watch("image")} alt="Preview" fill className="w-full h-full object-cover" unoptimized />
                </div>
              )}
            </div>
          </div>

          {/* Status & Actions */}
          <div className="bg-[var(--surface-100)]/40 backdrop-blur-xl rounded-[var(--radius-xl)] border border-[var(--glass-border)] p-8 space-y-6 shadow-2xl shadow-[var(--primary)]/5">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[var(--foreground)]">Visibility Status</span>
                <span className="text-xs text-[var(--foreground)]/40 font-medium">Control homepage display</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  {...register("isActive")}
                  className="sr-only peer"
                />
                <div className="w-14 h-8 bg-[var(--surface-300)] peer-focus:outline-none rounded-[var(--radius-full)] peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-[var(--radius-full)] after:h-6 after:w-6 after:transition-all peer-checked:bg-[var(--success)]"></div>
              </label>
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="group btn-ios flex items-center justify-center gap-3 w-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white py-5 rounded-[var(--radius-lg)] font-black shadow-2xl shadow-[var(--primary)]/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
              >
                {loading ? <Loader2 size={24} className="animate-spin" /> : <Save size={24} className="group-hover:rotate-12 transition-transform" />}
                <span>{initialData ? "Apply Changes" : "Commit Spotlight"}</span>
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="btn-ios flex items-center justify-center gap-3 w-full bg-[var(--surface-200)]/50 border border-[var(--glass-border)] text-[var(--foreground)] py-4 rounded-[var(--radius-lg)] font-bold hover:bg-[var(--surface-300)]/50 transition-all text-sm"
              >
                <X size={18} />
                Discard
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
