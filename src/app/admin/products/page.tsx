import Link from "next/link"
import Image from "next/image"
import { Plus, ShoppingBag, Edit2, Trash2, Package, Star, Eye } from "lucide-react"
import { getProductsFresh } from "@/features/products/api"
import { deleteProduct } from "@/features/products/actions"
import DeleteForm from "@/features/admin/components/DeleteForm"
import { format } from "date-fns"
import { Pagination } from "@/components/ui/Pagination"

interface AdminProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function AdminProductsPage({ searchParams }: AdminProductsPageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const { products, totalPages } = await getProductsFresh({ page: currentPage, limit: 9 });

  return (
    <div className="space-y-10 admin-suite">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-2xl lg:text-3xl font-black text-[var(--foreground)] tracking-tight">Product Inventory</h1>
          <p className="text-[var(--foreground)]/50 font-medium">Manage your Sahitya Bari t-shirts and merchandise.</p>
        </div>
        <Link
          href="/admin/products/new"
          className="btn-ios flex items-center justify-center gap-2 bg-[var(--primary)] text-white px-6 py-3 rounded-[var(--radius-md)] font-black shadow-lg shadow-[var(--primary)]/20 hover:scale-105 active:scale-95 transition-all text-sm"
        >
          <Plus size={18} />
          New Product
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map((product: any) => (
            <div
              key={product._id}
              className="group relative bg-[var(--surface-100)]/40 backdrop-blur-xl rounded-[var(--radius-xl)] border border-[var(--glass-border)] overflow-hidden shadow-2xl shadow-black/5 flex flex-col transition-all duration-500 hover:scale-[1.02] hover:bg-[var(--surface-100)]/60"
            >
              {/* Product Card Image */}
              <div className="relative aspect-[4/5] overflow-hidden bg-[var(--surface-200)]">
                {product.images?.[0] ? (
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[var(--foreground)]/10">
                    <ShoppingBag size={48} />
                  </div>
                )}
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isFeatured && (
                        <div className="px-3 py-1 bg-[var(--warning)] text-white text-[8px] font-black uppercase tracking-widest rounded-full flex items-center gap-1 shadow-lg">
                            <Star size={10} fill="currentColor" />
                            Featured
                        </div>
                    )}
                    <div className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[8px] font-black uppercase tracking-widest rounded-full shadow-lg">
                        {product.category}
                    </div>
                </div>

                <div className="absolute bottom-4 right-4 flex gap-2 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <Link
                      href={`/shop/${product.slug}`}
                      className="p-3 rounded-2xl frosted-glass text-[var(--foreground)] hover:bg-[var(--surface-300)] transition-colors shadow-xl border border-[var(--glass-border)]"
                    >
                      <Eye size={18} />
                    </Link>
                    <Link
                      href={`/admin/products/${product._id}/edit`}
                      className="p-3 rounded-2xl bg-[var(--primary)] text-white hover:brightness-110 transition-all shadow-xl"
                    >
                      <Edit2 size={18} />
                    </Link>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start gap-2">
                    <h3 className="line-clamp-1 font-bold text-[var(--foreground)]">{product.name}</h3>
                    <p className="text-xl font-black text-[var(--primary)] font-mono tracking-tighter">৳{product.price}</p>
                </div>

                <div className="flex items-center justify-between py-4 border-y border-[var(--glass-border)]">
                    <div className="space-y-1">
                        <p className="text-[9px] font-black text-[var(--foreground)]/40 uppercase tracking-widest">Stock Status</p>
                        <div className="flex items-center gap-2">
                             <Package size={14} className={product.stock > 0 ? "text-[var(--success)]" : "text-[var(--destructive)]"} />
                             <span className="text-sm font-black">{product.stock} Units</span>
                        </div>
                    </div>
                    <div className="text-right space-y-1">
                         <p className="text-[9px] font-black text-[var(--foreground)]/40 uppercase tracking-widest">Created At</p>
                         <p className="text-[10px] font-bold text-[var(--foreground)]/60">{format(new Date(product.createdAt), 'MMM dd, yyyy')}</p>
                    </div>
                </div>

                <div className="flex gap-2">
                    <DeleteForm action={deleteProduct.bind(null, product._id)}>
                      <button
                        type="submit"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--surface-200)] text-[var(--foreground)]/40 hover:bg-[var(--destructive)] hover:text-white transition-all text-xs font-black"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </DeleteForm>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-32 bg-[var(--surface-100)]/20 backdrop-blur-xl rounded-[var(--radius-xl)] border border-dashed border-[var(--glass-border)] flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-[var(--primary)]/5 flex items-center justify-center text-[var(--primary)] opacity-40">
              <ShoppingBag size={40} />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-[var(--foreground)]">No Products Cataloged</h3>
              <p className="text-sm text-[var(--foreground)]/40 font-medium max-w-xs">Start your commercial journey by adding your first t-shirt design.</p>
            </div>
            <Link
              href="/admin/products/new"
              className="btn-ios flex items-center gap-2 bg-[var(--surface-200)] text-[var(--foreground)] px-8 py-3 rounded-full font-black text-xs hover:bg-[var(--surface-300)] transition-all"
            >
              <Plus size={16} />
              Begin Collection
            </Link>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl="/admin/products" />
      )}
    </div>
  )
}
