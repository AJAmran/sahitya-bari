import dbConnect from '@/lib/mongodb';
import Image from 'next/image';
import Product from '@/lib/models/Product';
import { ShoppingBag, ChevronRight, Star, ShoppingCart, Filter, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { MotionDiv, MotionH1 } from '@/components/Motion';

export const metadata = {
  title: 'Official Store | Sahitya Bari - Literary T-Shirts & Merchandise',
  description: 'Exclusive, high-quality literary t-shirts and merchandise inspired by classical and modern Bengali literature.',
};

export default async function ShopPage() {
  await dbConnect();
  const products = await Product.find({ isActive: true }).sort({ createdAt: -1 }).lean();

  const featuredProduct = products.find((p: any) => p.isFeatured) || products[0];

  return (
    <div className="min-h-screen pt-36 pb-20 bg-[var(--background)]">
      {/* Dynamic Background Effects */}
      <div className="fixed inset-0 pointer-events-none opacity-20 dark:opacity-10 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[80vw] h-[80vw] bg-[var(--primary)]/10 blur-[180px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[80vw] h-[80vw] bg-[var(--secondary)]/10 blur-[180px] rounded-full" />
      </div>

      <div className="site-container relative z-10 space-y-24">
        {/* Editorial Header */}
        <header className="max-w-4xl space-y-10">
          <div className="space-y-4">
            <MotionDiv
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-[var(--primary)]"
            >
              <span className="w-12 h-[2px] bg-[var(--primary)]"></span>
              Authentic Merchandise
            </MotionDiv>
            <MotionH1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black font-bengali text-[var(--foreground)] leading-tight tracking-tight"
            >
                সাহিত্য বাড়ি <span className="text-gradient">Collections</span>.
            </MotionH1>
          </div>
          <p className="text-xl text-[var(--foreground)]/60 font-medium leading-relaxed max-w-2xl">
            Wear your literary identity. Our exclusive T-shirt collections bridge the gap between classical wisdom and modern street style.
          </p>
        </header>

        {/* Featured Hero Showcase */}
        {featuredProduct && (
          <section className="relative group">
            <Link href={`/shop/${featuredProduct.slug}`} className="block">
                <div className="relative aspect-[21/9] md:aspect-[24/10] rounded-[3rem] overflow-hidden border border-[var(--glass-border)] shadow-2xl shadow-black/10 group-hover:shadow-[var(--primary)]/10 transition-all duration-1000">
                    <Image 
                        src={featuredProduct.images?.[0] || "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"} 
                        alt={featuredProduct.name}
                        fill
                        className="w-full h-full object-cover transition-transform duration-[4000ms] group-hover:scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent p-12 md:p-20 flex flex-col justify-center gap-6">
                        <div className="flex items-center gap-3">
                            <span className="px-5 py-1.5 bg-[var(--primary)] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-xl">Editor&apos;s Pick</span>
                            <span className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em]">{featuredProduct.category}</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-none max-w-lg transition-transform duration-700 group-hover:translate-x-4">
                            {featuredProduct.name}
                        </h2>
                        <div className="flex items-center gap-8 mt-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                            <div className="text-2xl font-black text-white font-mono tracking-tighter">৳{featuredProduct.price}</div>
                            <button className="px-10 py-4 bg-white text-black font-black text-xs uppercase tracking-[0.3em] rounded-[var(--radius-xl)] shadow-2xl hover:bg-[var(--primary)] hover:text-white transition-all flex items-center gap-3">
                                <ShoppingCart size={16} />
                                Acquire Now
                            </button>
                        </div>
                    </div>
                </div>
            </Link>
          </section>
        )}

        {/* Categories & Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 py-10 border-y border-[var(--glass-border)] selection:bg-[var(--primary)]">
            <div className="flex flex-wrap gap-4 items-center">
                <span className="admin-label opacity-40 mr-4">Select Domain:</span>
                {['All Essentials', 'Clothing', 'Books', 'Curated Art'].map((cat, i) => (
                    <button key={cat} className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${i === 0 ? "bg-[var(--foreground)] text-[var(--background)] shadow-xl" : "hover:bg-[var(--surface-100)] border border-transparent hover:border-[var(--glass-border)] text-[var(--foreground)]/60"}`}>
                        {cat}
                    </button>
                ))}
            </div>
            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-[var(--foreground)]/40">
                <Filter size={14} />
                <span>Sort by: Latest Artifacts</span>
            </div>
        </div>

        {/* Product Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
            {products.map((product: any, idx) => (
                <MotionDiv
                    key={product._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.8 }}
                    className="group"
                >
                    <Link href={`/shop/${product.slug}`} className="space-y-6 block">
                        <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-[var(--glass-border)] bg-[var(--surface-50)] shadow-sm group-hover:shadow-2xl group-hover:shadow-black/10 group-hover:-translate-y-2 transition-all duration-700">
                             <Image 
                                src={product.images?.[0] || "/placeholder.png"} 
                                alt={product.name}
                                fill
                                className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-110"
                            />
                            {/* Overlay hover effect */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            
                            {/* Sizing Indicator */}
                            <div className="absolute bottom-6 left-6 flex gap-1 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                                {product.sizes?.slice(0, 3).map((s: string) => (
                                    <span key={s} className="px-2 py-1 bg-white/80 backdrop-blur-md rounded-md text-[8px] font-black text-black border border-black/5 uppercase tracking-tighter">{s}</span>
                                ))}
                            </div>
                        </div>
                        
                        <div className="space-y-3 px-2">
                            <div className="flex items-center justify-between text-[8px] font-black uppercase tracking-[0.3em] text-[var(--primary)]">
                                <span>{product.category}</span>
                                {product.stock < 10 && product.stock > 0 && <span className="text-[var(--destructive)]">Few Items Residual</span>}
                                {product.stock === 0 && <span className="text-[var(--foreground)]/40">Exhausted Stock</span>}
                            </div>
                            <h3 className="text-2xl font-black font-bengali text-[var(--foreground)] leading-tight group-hover:text-[var(--primary)] transition-colors line-clamp-1">
                                {product.name}
                            </h3>
                            <div className="flex items-center justify-between">
                                <span className="text-xl font-black font-mono tracking-tighter text-[var(--foreground)]">৳{product.price}</span>
                                <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                                    Explore <ArrowRight size={10} />
                                </span>
                            </div>
                        </div>
                    </Link>
                </MotionDiv>
            ))}
        </section>

        {/* Aesthetic Footer Promotion */}
        <section className="p-16 rounded-[4rem] bg-gradient-to-br from-[var(--surface-100)] to-[var(--surface-200)] border border-[var(--glass-border)] text-center space-y-8 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)]/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
             <div className="relative z-10 space-y-6">
                <ShoppingBag size={48} className="mx-auto text-[var(--primary)]/20" />
                <h3 className="text-3xl font-black text-[var(--foreground)] tracking-tight">Need Cultural Customization?</h3>
                <p className="text-[var(--foreground)]/60 font-medium max-w-md mx-auto">Contact us for bulk orders or custom Bengali quote prints for your organization or community.</p>
                <Link href="/contact" className="inline-flex h-14 items-center px-10 rounded-full bg-[var(--foreground)] text-[var(--background)] text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl">
                    Editorial Request
                </Link>
             </div>
        </section>
      </div>
    </div>
  );
}
