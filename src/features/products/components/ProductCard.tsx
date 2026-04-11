import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { MotionDiv } from '@/components/Motion';
import QuickAddToCart from '@/features/products/components/QuickAddToCart';

interface ProductCardProps {
  product: any;
  idx: number;
}

export default function ProductCard({ product, idx }: ProductCardProps) {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.08, duration: 0.6 }}
      className="group"
    >
      <Link href={`/shop/${product.slug}`} className="space-y-3.5 block">
        {/* Image container */}
        <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-[var(--surface-200)] shadow-sm border border-[var(--glass-border)] group-hover:border-[var(--primary)]/30 group-hover:shadow-[0_24px_54px_-12px_var(--primary-shadow)] group-hover:-translate-y-3 transition-all duration-700 ease-out">
          <Image
            src={product.images?.[0] || "/placeholder.png"}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-[3000ms] ease-out group-hover:scale-[1.08]"
          />

          {/* Premium Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out" />

          {/* Quick Add To Cart Button */}
          <QuickAddToCart product={product} />

          {/* Sizes */}
          <div className="absolute bottom-5 left-5 flex gap-1.5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out delay-100">
            {product.sizes?.slice(0, 3).map((s: string) => (
              <span key={s} className="min-w-[24px] h-[24px] flex items-center justify-center px-1.5 bg-white/90 backdrop-blur-md rounded-md text-[9px] font-black text-black border border-black/5 uppercase tracking-tighter shadow-sm">{s}</span>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="space-y-2.5 px-3 pt-2">
          {/* Category / stock */}
          <div className="flex items-center justify-between text-[0.6rem] font-black uppercase tracking-[0.3em] text-[var(--foreground)]/40 group-hover:text-[var(--primary)]/70 transition-colors">
            <span>{product.category}</span>
            {product.stock < 10 && product.stock > 0 && (
              <span className="text-[var(--destructive)] bg-[var(--destructive)]/10 px-2 py-0.5 rounded-sm">Low Stock</span>
            )}
            {product.stock === 0 && (
              <span className="text-[var(--foreground)]/30 line-through">Out of Stock</span>
            )}
          </div>

          {/* Name */}
          <h3 className="text-lg font-black font-bengali text-[var(--foreground)] leading-tight group-hover:text-[var(--primary)] transition-colors line-clamp-2">
            {product.name}
          </h3>

          {/* Price + CTA */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1.5">
               <span className="text-xl font-black font-mono tracking-tighter text-[var(--foreground)]">৳{product.price}</span>
            </div>
            <span className="flex items-center gap-1.5 text-[0.65rem] font-black uppercase tracking-[0.2em] text-[var(--primary)] opacity-0 group-hover:opacity-100 -translate-x-3 group-hover:translate-x-0 transition-all duration-500 ease-out">
              Examine <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </Link>
    </MotionDiv>
  );
}
