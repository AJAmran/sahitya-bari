"use client"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import { createProduct, updateProduct } from "@/app/actions/product"
import {
  Type,
  Link as LinkIcon,
  Tag,
  DollarSign,
  Package,
  Layers,
  Palette,
  Image as ImageIcon,
  AlignLeft,
  FileText,
  Save,
  X,
  Loader2,
  CheckCircle2,
  Star
} from "lucide-react"

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().min(0, "Price must be positive"),
  images: z.string().transform(v => v ? v.split(',').map(s => s.trim()) : []),
  category: z.string().min(1, "Category is required"),
  stock: z.coerce.number().min(0, "Stock must be positive"),
  sizes: z.string().transform(v => v ? v.split(',').map(s => s.trim()) : []),
  colors: z.string().transform(v => v ? v.split(',').map(s => s.trim()) : []),
  isFeatured: z.boolean().default(false),
})

interface ProductFormProps {
  initialData?: any
}

export default function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<any>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData ? {
        ...initialData,
        images: initialData.images?.join(', ') || '',
        sizes: initialData.sizes?.join(', ') || '',
        colors: initialData.colors?.join(', ') || '',
    } : {
      name: "",
      slug: "",
      description: "",
      price: 0,
      images: "",
      category: "Clothing",
      stock: 0,
      sizes: "S, M, L, XL",
      colors: "Black, White",
      isFeatured: false,
    },
  })

  const name = watch("name")
  const slug = watch("slug")

  const generateSlug = () => {
    if (name && !slug) {
      const generated = name
        .toLowerCase()
        .replace(/[\s_]+/g, "-")
        .replace(/[^\p{L}\p{M}\p{N}-]/gu, "")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")
      setValue("slug", generated || `shop-${Date.now()}`)
    }
  }

  const onSubmit = async (data: any) => {
    setLoading(true)
    const toastId = toast.loading(initialData ? "Updating product..." : "Adding to catalog...")
    try {
      if (initialData?._id) {
        await updateProduct(initialData._id, data)
        toast.success("Product updated successfully", { id: toastId, icon: <CheckCircle2 className="text-green-500" /> })
      } else {
        await createProduct(data)
        toast.success("Product added to store", { id: toastId, icon: <CheckCircle2 className="text-green-500" /> })
      }
      router.push("/admin/products")
      router.refresh()
    } catch (error) {
      toast.error("Something went wrong", { id: toastId })
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 admin-suite">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-[var(--surface-100)]/40 backdrop-blur-xl rounded-[var(--radius-xl)] border border-[var(--glass-border)] p-8 md:p-10 space-y-8 shadow-2xl shadow-[var(--primary)]/5">
            <div className="space-y-2">
              <label className="admin-label flex items-center gap-2">
                <Type size={14} className="text-[var(--primary)]" />
                Product Name
              </label>
              <input
                {...register("name")}
                onBlur={generateSlug}
                placeholder="Exclusive Literary T-Shirt..."
                className="w-full bg-transparent border-none p-0 text-2xl lg:text-3xl font-black text-[var(--foreground)] placeholder-[var(--foreground)]/10 focus:ring-0 outline-none"
              />
              {errors.name && <p className="text-[var(--destructive)] text-[10px] font-bold uppercase tracking-tighter">{String(errors.name.message)}</p>}
            </div>

            <div className="space-y-2">
              <label className="admin-label flex items-center gap-2">
                <AlignLeft size={14} className="text-[var(--primary)]" />
                Description
              </label>
              <textarea
                {...register("description")}
                placeholder="High-quality cotton, featuring premium screen print..."
                className="w-full bg-[var(--surface-200)]/30 rounded-[var(--radius-lg)] border border-[var(--glass-border)] p-5 text-sm font-medium text-[var(--foreground)] placeholder-[var(--foreground)]/20 focus:ring-2 focus:ring-[var(--primary)]/30 focus:bg-[var(--surface-100)] outline-none transition-all h-32 resize-none shadow-inner"
              />
              {errors.description && <p className="text-[var(--destructive)] text-[10px] font-bold uppercase tracking-tighter">{String(errors.description.message)}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <label className="admin-label flex items-center gap-2">
                        <DollarSign size={14} className="text-[var(--primary)]" />
                        Price (BDT)
                    </label>
                    <input
                        type="number"
                        {...register("price")}
                        className="w-full bg-[var(--surface-200)]/30 rounded-[var(--radius-lg)] border border-[var(--glass-border)] px-5 py-4 text-xl font-black text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] transition-all outline-none"
                    />
                </div>
                <div className="space-y-2">
                    <label className="admin-label flex items-center gap-2">
                        <Package size={14} className="text-[var(--primary)]" />
                        Stock Status
                    </label>
                    <input
                        type="number"
                        {...register("stock")}
                        className="w-full bg-[var(--surface-200)]/30 rounded-[var(--radius-lg)] border border-[var(--glass-border)] px-5 py-4 text-xl font-black text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] transition-all outline-none"
                    />
                </div>
            </div>
          </div>

          <div className="bg-[var(--surface-100)]/40 backdrop-blur-xl rounded-[var(--radius-xl)] border border-[var(--glass-border)] p-8 md:p-10 space-y-8 shadow-2xl shadow-[var(--primary)]/5">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <label className="admin-label flex items-center gap-2">
                        <Layers size={14} className="text-[var(--primary)]" />
                        Available Sizes
                    </label>
                    <input
                        {...register("sizes")}
                        placeholder="S, M, L, XL"
                        className="w-full bg-[var(--surface-200)]/30 rounded-[var(--radius-lg)] border border-[var(--glass-border)] px-5 py-4 text-sm font-bold text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] transition-all outline-none"
                    />
                </div>
                <div className="space-y-2">
                    <label className="admin-label flex items-center gap-2">
                        <Palette size={14} className="text-[var(--primary)]" />
                        Available Colors
                    </label>
                    <input
                        {...register("colors")}
                        placeholder="Black, White, Maroon"
                        className="w-full bg-[var(--surface-200)]/30 rounded-[var(--radius-lg)] border border-[var(--glass-border)] px-5 py-4 text-sm font-bold text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] transition-all outline-none"
                    />
                </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-[var(--surface-100)]/40 backdrop-blur-xl rounded-[var(--radius-xl)] border border-[var(--glass-border)] p-8 space-y-8 shadow-2xl shadow-[var(--primary)]/5">
            <h3 className="admin-label pb-4 border-b border-[var(--glass-border)] opacity-100">Product Settings</h3>
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="admin-label flex items-center gap-2 opacity-100">
                  <LinkIcon size={12} />
                  Identifier Slug
                </label>
                <input
                  {...register("slug")}
                  className="w-full bg-[var(--surface-200)]/30 rounded-[var(--radius-md)] border border-[var(--glass-border)] px-4 py-3 text-xs font-bold text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="admin-label flex items-center gap-2 opacity-100">
                  <Tag size={12} />
                  Category
                </label>
                <select
                  {...register("category")}
                  className="w-full bg-[var(--surface-200)]/30 rounded-[var(--radius-md)] border border-[var(--glass-border)] px-4 py-3 text-xs font-bold text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
                >
                    <option value="Clothing">Clothing</option>
                    <option value="Books">Books</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Merchandise">Merchandise</option>
                </select>
              </div>
              
              <label className="flex items-center gap-3 p-4 rounded-[var(--radius-md)] bg-[var(--surface-200)]/30 border border-[var(--glass-border)] cursor-pointer group hover:bg-[var(--primary)]/5 transition-colors">
                <input type="checkbox" {...register("isFeatured")} className="w-5 h-5 accent-[var(--primary)]" />
                <div className="flex-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-[var(--foreground)]">Feature item</p>
                    <p className="text-[9px] text-[var(--foreground)]/40 font-bold">Display on shop hero section</p>
                </div>
                <Star size={16} className="text-[var(--warning)]" />
              </label>
            </div>
          </div>

          <div className="bg-[var(--surface-100)]/40 backdrop-blur-xl rounded-[var(--radius-xl)] border border-[var(--glass-border)] p-8 space-y-6 shadow-2xl shadow-[var(--primary)]/5">
            <h3 className="admin-label pb-4 border-b border-[var(--glass-border)] opacity-100">Product Media</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="admin-label flex items-center gap-2 opacity-100">
                  <ImageIcon size={12} />
                  Image Links (comma separated)
                </label>
                <textarea
                  {...register("images")}
                  className="w-full bg-[var(--surface-200)]/30 rounded-[var(--radius-md)] border border-[var(--glass-border)] px-4 py-3 text-[10px] font-mono font-bold text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none h-32"
                />
              </div>
              {watch("images") && watch("images").split(',').filter(Boolean).length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                    {watch("images")?.split(',').filter(Boolean).map((url:string, i:number) => (
                        <div key={i} className="relative w-full aspect-square rounded-[var(--radius-md)] overflow-hidden border border-[var(--glass-border)]">
                          <Image
                            src={url.trim()}
                            alt="Preview"
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                    ))}
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
              <span>{initialData ? "Update Stock" : "Launch in Store"}</span>
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="btn-ios flex items-center justify-center gap-3 w-full bg-[var(--surface-200)]/50 border border-[var(--glass-border)] text-[var(--foreground)] py-4 rounded-[var(--radius-lg)] font-bold hover:bg-[var(--surface-300)]/50 transition-all text-sm"
            >
              <X size={18} />
              Discard changes
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
