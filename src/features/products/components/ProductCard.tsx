import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { MotionDiv } from '@/components/Motion';

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
        <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-[var(--glass-border)] bg-[var(--surface-200)] shadow-[var(--shadow-pro)] group-hover:shadow-[0_20px_48px_-12px_oklch(0%_0_0/0.15)] group-hover:-translate-y-2 transition-all duration-500">
          <Image
            src={product.images?.[0] || "/placeholder.png"}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-[2500ms] ease-out group-hover:scale-105"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

          {/* Sizes */}
          <div className="absolute bottom-4 left-4 flex gap-1 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 delay-75">
            {product.sizes?.slice(0, 3).map((s: string) => (
              <span key={s} className="px-2 py-0.5 bg-white/85 backdrop-blur-md rounded text-[8px] font-black text-black border border-black/5 uppercase tracking-tight">{s}</span>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="space-y-1.5 px-1">
          {/* Category / stock */}
          <div className="flex items-center justify-between text-[0.6rem] font-black uppercase tracking-[0.25em] text-[var(--primary)]">
            <span>{product.category}</span>
            {product.stock < 10 && product.stock > 0 && (
              <span className="text-[var(--destructive)]">Few Left</span>
            )}
            {product.stock === 0 && (
              <span className="text-[var(--foreground)]/35">Out of Stock</span>
            )}
          </div>

          {/* Name */}
          <h3 className="text-base font-black font-bengali text-[var(--foreground)] leading-snug group-hover:text-[var(--primary)] transition-colors line-clamp-2">
            {product.name}
          </h3>

          {/* Price + CTA */}
          <div className="flex items-center justify-between">
            <span className="text-lg font-black font-mono tracking-tight text-[var(--foreground)]">৳{product.price}</span>
            <span className="flex items-center gap-1 text-[0.65rem] font-black uppercase tracking-wider text-[var(--primary)] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-400">
              Shop <ArrowRight size={10} />
            </span>
          </div>
        </div>
      </Link>
    </MotionDiv>
  );
}
