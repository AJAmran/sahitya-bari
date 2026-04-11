import Link from 'next/link';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { getActiveProducts } from '@/features/products/api';
import ProductCard from '@/features/products/components/ProductCard';

export default async function ShopShowcase() {
  const products = await getActiveProducts();
  const displayProducts = products.slice(0, 4); // Show only top 4 latest or featured products

  if (displayProducts.length === 0) return null;

  return (
    <section className="py-24 sm:py-32 relative border-t border-[var(--glass-border)] bg-[var(--surface-100)]/20">
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-[var(--primary)]/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2" />
      
      <div className="site-container relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-3 text-[0.65rem] font-black uppercase tracking-[0.35em] text-[var(--primary)]">
              <ShoppingBag size={12} className="opacity-80" />
              <span>Official Merchandise</span>
              <span className="w-8 h-px bg-[var(--primary)] text-[var(--primary)]"></span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black font-bengali text-[var(--foreground)] tracking-tight leading-tight">
              Wear Your <span className="text-gradient">Legacy</span>
            </h2>
            <p className="text-sm md:text-base text-[var(--foreground)]/60 font-medium leading-relaxed">
              Curated apparel and literature essentials crafted with the utmost quality to represent the beauty of our culture.
            </p>
          </div>
          <Link
            href="/shop"
            className="group flex-shrink-0 inline-flex items-center gap-3 px-8 h-12 md:h-14 rounded-full bg-[var(--foreground)] text-[var(--background)] font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[var(--shadow-sm)]"
          >
            Explore Collection
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {displayProducts.map((product: any, idx: number) => (
            <ProductCard key={product._id} product={product} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
