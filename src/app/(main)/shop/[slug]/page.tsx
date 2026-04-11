import Image from 'next/image';
import { notFound } from 'next/navigation';
import { 
  ArrowLeft, 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  ChevronRight,
  Heart
} from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getProduct, getRelatedProducts } from '@/features/products/api';
import AddToCartPanel from '@/features/products/components/AddToCartPanel';

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) return { title: 'Product Not Found | Sahitya Bari' };

  return {
    title: `${product.name} | Sahitya Bari Store`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.category, product._id.toString());

  return (
    <div className="min-h-screen pt-36 pb-20 bg-[var(--background)]">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none opacity-10 z-0">
        <div className="absolute top-[20%] right-[-10%] w-[60vw] h-[60vw] bg-[var(--primary)]/10 blur-[120px] rounded-full" />
      </div>

      <div className="site-container relative z-10">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-4 mb-12">
            <Link href="/shop" className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[var(--foreground)]/40 hover:text-[var(--primary)] transition-colors">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Back to Collection
            </Link>
            <ChevronRight size={10} className="text-[var(--foreground)]/20" />
            <span className="text-[10px] font-black uppercase tracking-widest text-[var(--foreground)]/60">{product.category}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24">
          
          {/* Visual Showcase - Left Side */}
          <div className="lg:col-span-7 space-y-8">
            <div className="relative aspect-square md:aspect-[4/5] rounded-[3.5rem] overflow-hidden border border-[var(--primary)]/20 bg-gradient-to-tr from-[var(--surface-100)] to-transparent shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] group backdrop-blur-xl">
                <Image 
                    src={product.images?.[0] || "/placeholder.png"} 
                    alt={product.name}
                    fill
                    className="w-full h-full object-cover transition-transform duration-[3000ms] ease-out hover:scale-105"
                    priority
                />
                <button className="absolute top-8 right-8 w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-[var(--primary)] hover:border-transparent transition-all shadow-xl">
                    <Heart size={24} />
                </button>
            </div>
            
            {/* Thumbnail Strip */}
            <div className="grid grid-cols-4 gap-4">
                {product.images?.map((img: string, i: number) => (
                    <div key={i} className={`relative aspect-square rounded-2xl overflow-hidden border-2 cursor-pointer transition-all ${i === 0 ? "border-[var(--primary)]" : "border-transparent opacity-60 hover:opacity-100"}`}>
                        <Image 
                            src={img} 
                            alt={`${product.name} view ${i}`} 
                            fill
                            className="w-full h-full object-cover" 
                        />
                    </div>
                ))}
            </div>
          </div>

          {/* Configuration - Right Side */}
          <div className="lg:col-span-5 space-y-12">
            <header className="space-y-6">
                <div className="flex items-center gap-3">
                    <span className="px-4 py-1.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-[9px] font-black uppercase tracking-widest border border-[var(--primary)]/10">In Stock: {product.stock} Units</span>
                    <div className="flex items-center gap-1.5 ml-auto text-[var(--warning)]">
                        {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                        <span className="text-[10px] font-black text-[var(--foreground)]/40 ml-2">4.9 Assessment</span>
                    </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-black font-bengali text-[var(--foreground)] leading-tight tracking-tight">
                    {product.name}
                </h1>
                <div className="text-3xl font-black font-mono tracking-tighter text-[var(--primary)]">৳{product.price}</div>
            </header>

            <p className="text-base text-[var(--foreground)]/60 leading-relaxed font-medium">
                {product.description}
            </p>

            {/* Selection Grid and Action Buttons via Client Component */}
            <AddToCartPanel product={product} />

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[var(--glass-border)]">
                <div className="flex flex-col items-center gap-3 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-[var(--surface-200)]/50 flex items-center justify-center text-[var(--primary)] shadow-sm"><Truck size={20} /></div>
                    <p className="text-[9px] font-black uppercase tracking-tighter">Continental Delivery</p>
                </div>
                <div className="flex flex-col items-center gap-3 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-[var(--surface-200)]/50 flex items-center justify-center text-[var(--success)] shadow-sm"><ShieldCheck size={20} /></div>
                    <p className="text-[9px] font-black uppercase tracking-tighter">Verified Authentic</p>
                </div>
                <div className="flex flex-col items-center gap-3 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-[var(--surface-200)]/50 flex items-center justify-center text-[var(--secondary)] shadow-sm"><RotateCcw size={20} /></div>
                    <p className="text-[9px] font-black uppercase tracking-tighter">30-Day Reflection</p>
                </div>
            </div>
          </div>
        </div>

        {/* Related Products Showcase */}
        {relatedProducts.length > 0 && (
          <div className="mt-40 space-y-12">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-black font-bengali text-[var(--foreground)]">আরও কিছু <span className="text-gradient">নির্বাচন</span></h2>
              <Link href="/shop" className="text-[10px] font-black uppercase tracking-widest text-[var(--primary)] hover:underline underline-offset-8">Explore Collection</Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Product cards would go here - for now using a dynamic import or simple component mapping */}
              {relatedProducts.map((p: any) => (
                <Link key={p._id} href={`/shop/${p.slug}`} className="group space-y-4">
                  <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-[var(--glass-border)] bg-[var(--surface-100)]">
                    <Image src={p.images?.[0] || "/placeholder.png"} alt={p.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-black font-bengali text-[var(--foreground)] line-clamp-1">{p.name}</h3>
                    <p className="text-sm font-black text-[var(--primary)] font-mono">৳{p.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
