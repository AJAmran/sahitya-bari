import SpotlightForm from "@/components/admin/SpotlightForm"
import { Star, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewSpotlightPage() {
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
          <h1 className="text-4xl font-black text-[var(--foreground)] tracking-tight">Create New Promotion</h1>
        </div>
      </div>

      <SpotlightForm />
    </div>
  )
}
