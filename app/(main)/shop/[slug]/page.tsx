import dbConnect from '@/lib/mongodb';
import Image from 'next/image';
import Product from '@/lib/models/Product';
import { notFound } from 'next/navigation';
import { 
  ArrowLeft, 
  ShoppingBag, 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  ChevronRight,
  Minus,
  Plus,
  Share2,
  Heart
} from 'lucide-react';
import Link from 'next/link';
import { MotionDiv } from '@/components/Motion';

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  await dbConnect();
  const product: any = await Product.findOne({ slug, isActive: true }).lean();

  if (!product) {
    notFound();
  }

  // Related products
  const relatedProducts = await Product.find({ 
    category: product.category, 
    _id: { $ne: product._id },
    isActive: true 
  }).limit(4).lean();

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
            <div className="relative aspect-square md:aspect-[4/5] rounded-[3rem] overflow-hidden border border-[var(--glass-border)] bg-[var(--surface-50)] shadow-2xl shadow-black/5 group">
                <Image 
                    src={product.images?.[0] || "/placeholder.png"} 
                    alt={product.name}
                    fill
                    className="w-full h-full object-cover transition-transform duration-[2000ms] hover:scale-105"
                    priority
                />
                <button className="absolute top-8 right-8 w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-[var(--primary)] hover:border-transparent transition-all shadow-xl">
                    <Heart size={24} />
                </button>
            </div>
            
            {/* Thumbnail Strip */}
            <div className="grid grid-cols-4 gap-4">
                {product.images?.map((img: string, i: number) => (
                    <div key={i} className={`aspect-square rounded-2xl overflow-hidden border-2 cursor-pointer transition-all ${i === 0 ? "border-[var(--primary)]" : "border-transparent opacity-60 hover:opacity-100"}`}>
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

            {/* Selection Grid */}
            <div className="space-y-10 py-10 border-y border-[var(--glass-border)]">
                {/* Size Selection */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="admin-label opacity-100">Select Dimension</label>
                        <button className="text-[10px] font-black text-[var(--primary)] uppercase tracking-widest border-b border-[var(--primary)]/20 hover:border-[var(--primary)] transition-all">Size Blueprint</button>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {product.sizes?.map((size: string) => (
                            <button key={size} className="min-w-[56px] h-[56px] rounded-2xl border border-[var(--glass-border)] flex items-center justify-center text-xs font-black hover:border-[var(--primary)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/5 active:scale-90 transition-all">
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Color Spectrum */}
                <div className="space-y-4">
                    <label className="admin-label opacity-100">Color Spectrum</label>
                    <div className="flex flex-wrap gap-4">
                        {product.colors?.map((color: string) => (
                            <button key={color} className="group relative">
                                <div className={`w-10 h-10 rounded-full border-2 border-white shadow-xl transition-all group-hover:scale-110 active:scale-90 ${color.toLowerCase() === 'black' ? 'bg-black' : color.toLowerCase() === 'white' ? 'bg-white border-gray-200' : 'bg-gray-400'}`} />
                                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{color}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Quantity Controller */}
                <div className="space-y-4 pt-4">
                    <label className="admin-label opacity-100">Quantity Selection</label>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-1 p-1 bg-[var(--surface-200)]/50 rounded-2xl border border-[var(--glass-border)]">
                            <button className="w-10 h-10 rounded-xl hover:bg-white/50 transition-all flex items-center justify-center text-[var(--foreground)]/40 hover:text-[var(--primary)]"><Minus size={16} /></button>
                            <span className="w-12 text-center text-base font-black">1</span>
                            <button className="w-10 h-10 rounded-xl hover:bg-white/50 transition-all flex items-center justify-center text-[var(--foreground)]/40 hover:text-[var(--primary)]"><Plus size={16} /></button>
                        </div>
                        <p className="text-[10px] font-bold text-[var(--foreground)]/40 uppercase tracking-widest">In stock & ready to ship</p>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                 <button className="md:col-span-9 h-[72px] bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white rounded-[1.25rem] flex items-center justify-center gap-4 font-black text-sm uppercase tracking-[.3em] shadow-2xl shadow-[var(--primary)]/30 hover:scale-[1.02] active:scale-[0.98] transition-all">
                    <ShoppingBag size={20} />
                    Begin Acquisition
                 </button>
                 <button className="md:col-span-3 h-[72px] rounded-[1.25rem] bg-[var(--surface-100)] border border-[var(--glass-border)] flex items-center justify-center text-[var(--foreground)]/40 hover:text-[var(--primary)] hover:border-[var(--primary)]/30 transition-all">
                    <Share2 size={24} />
                 </button>
            </div>

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
      </div>
    </div>
  );
}
