import dbConnect from "@/lib/mongodb"
import FeaturedSpotlight from "@/lib/models/FeaturedSpotlight"
import SpotlightForm from "@/components/admin/SpotlightForm"
import { notFound } from "next/navigation"
import { Star, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface EditSpotlightPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditSpotlightPage({ params }: EditSpotlightPageProps) {
  const { id } = await params
  await dbConnect()
  const spotlight = await FeaturedSpotlight.findById(id).lean()

  if (!spotlight) {
    notFound()
  }

  // Transform Mongoose result to match SpotlightForm's expected interface
  const formData = {
    id: (spotlight as any)._id.toString(),
    title: (spotlight as any).title,
    subtitle: (spotlight as any).subtitle || "",
    description: (spotlight as any).description,
    image: (spotlight as any).image || "",
    buttonText: (spotlight as any).buttonText || "",
    buttonLink: (spotlight as any).buttonLink || "",
    isActive: (spotlight as any).isActive,
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4">
        <Link
          href="/admin/spotlight"
          className="flex items-center gap-2 text-xs font-bold text-[var(--foreground)]/40 hover:text-[var(--primary)] transition-colors w-fit group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Spotlight
        </Link>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-[var(--radius-md)] bg-[var(--warning)]/10 flex items-center justify-center text-[var(--warning)]">
            <Star size={24} />
          </div>
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-[var(--foreground)] tracking-tight">Refine Promotion</h1>
            <p className="text-[var(--foreground)]/40 text-xs font-bold uppercase tracking-widest">Editing: {formData.title}</p>
          </div>
        </div>
      </div>

      <SpotlightForm initialData={formData} />
    </div>
  )
}
