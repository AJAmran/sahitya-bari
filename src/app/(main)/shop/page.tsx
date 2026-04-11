import { ShoppingBag, Filter, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { MotionDiv, MotionH1 } from '@/components/Motion';
import { getActiveProducts } from '@/features/products/api';
import ProductGrid from '@/features/products/components/ProductGrid';
import FeaturedProduct from '@/features/products/components/FeaturedProduct';

export const metadata = {
  title: 'Official Store | Sahitya Bari - Literary T-Shirts & Merchandise',
  description: 'Exclusive, high-quality literary t-shirts and merchandise inspired by classical and modern Bengali literature.',
};

export default async function ShopPage() {
  const products = await getActiveProducts();
  const featuredProduct = products.find((p: any) => p.isFeatured) || products[0];

  return (
    <div className="min-h-screen pt-28 pb-14 bg-[var(--background)]">
      {/* Background blobs */}
      <div className="fixed inset-0 pointer-events-none opacity-10 dark:opacity-5 z-0">
        <div className="absolute top-[-5%] left-[-5%] w-[60vw] h-[60vw] bg-[var(--primary)]/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[60vw] h-[60vw] bg-[var(--secondary)]/10 blur-[140px] rounded-full" />
      </div>

      <div className="site-container relative z-10 space-y-12 sm:space-y-16">
        {/* Editorial Header */}
        <header className="max-w-2xl space-y-4">
          <div className="space-y-2">
            <MotionDiv
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 text-[0.65rem] font-black uppercase tracking-[0.35em] text-[var(--primary)]"
            >
              <span className="w-8 h-px bg-[var(--primary)]"></span>
              Authentic Merchandise
            </MotionDiv>
            <MotionH1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl lg:text-5xl font-black font-bengali text-[var(--foreground)] leading-tight tracking-tight"
            >
                সাহিত্য বাড়ি <span className="text-gradient">Collections</span>.
            </MotionH1>
          </div>
          <p className="text-sm sm:text-base text-[var(--foreground)]/60 font-medium leading-relaxed">
            Wear your literary identity. Our exclusive T-shirt collections bridge the gap between classical wisdom and modern street style.
          </p>
        </header>

        {/* Featured Hero Showcase */}
        {featuredProduct && <FeaturedProduct product={featuredProduct} />}

        {/* Categories & Filter Bar */}
        <div className="sticky top-[72px] z-30 py-4 bg-[var(--background)]/80 backdrop-blur-2xl border-y border-[var(--glass-border)] transition-all">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--foreground)]/40 mr-2 flex items-center gap-2">
                    <Filter size={12} /> Elements
                  </span>
                  {['All Collection', 'T-Shirts', 'Books', 'Art'].map((cat, i) => (
                      <button key={cat} className={`h-8 sm:h-9 px-4 sm:px-5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-300 ${i === 0 ? "bg-[var(--foreground)] text-[var(--background)] shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] active:scale-95" : "bg-[var(--surface-100)] border border-[var(--glass-border)] text-[var(--foreground)]/60 hover:text-[var(--primary)] hover:border-[var(--primary)]/30 hover:bg-[var(--surface-200)] active:scale-95"}`}>
                          {cat}
                      </button>
                  ))}
              </div>
              <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--foreground)]/40">Sort By</span>
                  <select className="h-9 px-4 rounded-full bg-[var(--surface-100)] border border-[var(--glass-border)] text-[10px] font-black uppercase tracking-widest text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]/50 transition-colors appearance-none cursor-pointer">
                    <option>Latest Drops</option>
                    <option>Price: Ascending</option>
                    <option>Price: Descending</option>
                  </select>
              </div>
          </div>
        </div>

        {/* Product Grid */}
        <ProductGrid products={products} />

        {/* Bottom promo */}
        <section className="p-8 sm:p-10 rounded-[2rem] bg-gradient-to-br from-[var(--surface-100)] to-[var(--surface-200)] border border-[var(--glass-border)] text-center space-y-5 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--primary)]/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
             <div className="relative z-10 space-y-4">
                <ShoppingBag size={32} className="mx-auto text-[var(--primary)]/25" />
                <h3 className="text-xl font-black text-[var(--foreground)] tracking-tight">Need Cultural Customization?</h3>
                <p className="text-sm text-[var(--foreground)]/60 font-medium max-w-sm mx-auto">Contact us for bulk orders or custom Bengali quote prints for your organization or community.</p>
                <Link href="/contact" className="inline-flex h-11 items-center px-8 rounded-full bg-[var(--foreground)] text-[var(--background)] text-xs font-black uppercase tracking-widest hover:bg-[var(--primary)] hover:text-white active:scale-95 transition-all shadow-[var(--shadow-sm)]">
                    Editorial Request
                </Link>
             </div>
        </section>
      </div>
    </div>
  );
}
