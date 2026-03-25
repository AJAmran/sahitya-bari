import Link from "next/link"
import { ArrowLeft, ShoppingBag } from "lucide-react"
import ProductForm from "@/components/admin/ProductForm"

export default function NewProductPage() {
  return (
    <div className="space-y-10 admin-suite">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-[var(--glass-border)]">
        <div className="space-y-4">
          <Link
            href="/admin/products"
            className="group inline-flex items-center gap-2 text-[var(--foreground)]/40 hover:text-[var(--primary)] transition-colors text-[10px] font-black uppercase tracking-[0.2em]"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1.5 transition-transform" />
            Back to Inventory
          </Link>
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] shadow-xl shadow-[var(--primary)]/5">
                <ShoppingBag size={28} />
            </div>
            <div className="space-y-0.5">
                <h1 className="text-2xl lg:text-3xl font-black text-[var(--foreground)] tracking-tight">Launch Collection</h1>
                <p className="text-[var(--foreground)]/40 text-xs font-bold uppercase tracking-widest">Adding new commercial merchandise</p>
            </div>
          </div>
        </div>
      </div>

      <ProductForm />
    </div>
  )
}
