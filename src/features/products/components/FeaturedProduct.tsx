import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

export default function FeaturedProduct({ product }: { product: any }) {
  if (!product) return null;

  return (
    <section className="relative group">
      <Link href={`/shop/${product.slug}`} className="block">
        <div className="relative aspect-[16/7] rounded-[2rem] overflow-hidden border border-[var(--glass-border)] shadow-xl shadow-black/8 group-hover:shadow-[var(--primary)]/8 transition-all duration-700">
          <Image
            src={product.images?.[0] || "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"}
            alt={product.name}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent p-6 sm:p-10 flex flex-col justify-center gap-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-[var(--primary)] text-white text-[0.6rem] font-black uppercase tracking-[0.2em] rounded-full">Editor&apos;s Pick</span>
              <span className="text-white/55 text-[0.6rem] font-black uppercase tracking-[0.2em]">{product.category}</span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight max-w-md transition-transform duration-500 group-hover:translate-x-2">
              {product.name}
            </h2>
            <div className="flex items-center gap-6 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <div className="text-xl font-black text-white font-mono">৳{product.price}</div>
              <button className="px-6 py-2.5 bg-white text-black font-black text-xs uppercase tracking-[0.2em] rounded-[var(--radius-lg)] shadow-xl hover:bg-[var(--primary)] hover:text-white transition-all flex items-center gap-2.5">
                <ShoppingCart size={14} />
                Acquire Now
              </button>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
