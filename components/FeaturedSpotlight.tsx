import { Award, ArrowRight, Sparkles, Zap, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getActiveSpotlight } from '@/app/actions/spotlight';
import { MotionDiv, MotionSection } from './Motion';

export default async function FeaturedSpotlight() {
  const spotlight = await getActiveSpotlight();

  if (!spotlight) return null;

  return (
    <MotionSection 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
      className="py-[var(--space-12)] relative overflow-visible"
    >
      <div className="site-container">
        {/* Main Stage — Cinematic Glass Container */}
        <div className="relative group rounded-[var(--radius-3xl)] overflow-hidden shadow-[0_40px_100px_-20px_var(--glass-shadow)] border border-[var(--glass-border)] bg-[var(--surface-50)] transition-all duration-1000 hover:shadow-[0_60px_120px_-20px_var(--glass-shadow)]">
          
          {/* Layer 0: Animated Mesh Background */}
          <div className="absolute inset-0 z-0">
             <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[120%] bg-[oklch(52%_0.09_120/0.08)] blur-[120px] rounded-full animate-pulse" />
             <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[100%] bg-[oklch(72%_0.06_75/0.12)] blur-[100px] rounded-full animate-pulse [animation-delay:2s]" />
             
             {/* Subliminal Image Base */}
             <Image
               src={spotlight.image || "https://picsum.photos/seed/library/1920/1080"}
               alt="Background Atmosphere"
               fill
               className="object-cover opacity-[0.03] dark:opacity-[0.05] grayscale mix-blend-overlay transition-transform duration-[5s] group-hover:scale-105"
               unoptimized
             />
             
             {/* Dynamic Light Sweep */}
             <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[2s]" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 p-8 md:p-14 lg:p-20 items-center">
            
            {/* Left Content — Narrative Strategy */}
            <div className="lg:col-span-7 space-y-10">
              <div className="space-y-6">
                <MotionDiv 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/5 text-[var(--primary)] text-[10px] font-black uppercase tracking-[0.3em] backdrop-blur-md"
                >
                  <Sparkles size={14} className="animate-pulse" />
                  <span>Curatorial Special</span>
                </MotionDiv>

                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-bengali text-[var(--foreground)] leading-[1.1] tracking-tighter">
                    {spotlight.title}
                  </h2>
                  {spotlight.subtitle && (
                    <p className="text-xl md:text-2xl font-medium text-[var(--foreground)]/50 tracking-tight leading-relaxed">
                      {spotlight.subtitle}
                    </p>
                  )}
                </div>

                <div className="w-20 h-[3px] bg-gradient-to-r from-[var(--primary)] to-transparent rounded-full" />

                <p className="text-lg text-[var(--foreground)]/70 leading-relaxed max-w-xl font-light">
                  {spotlight.description}
                </p>
              </div>

              {/* Interaction Focal Point */}
              <div className="flex flex-wrap items-center gap-6">
                {spotlight.buttonText && spotlight.buttonLink && (
                  <Link
                    href={spotlight.buttonLink}
                    className="group/btn relative h-[64px] px-10 flex items-center justify-center bg-[var(--foreground)] text-[var(--background)] font-black text-xs uppercase tracking-[0.3em] overflow-hidden rounded-[var(--radius-xl)] shadow-2xl transition-all hover:scale-105 active:scale-95"
                  >
                     <div className="absolute inset-0 bg-gradient-to-tr from-[var(--primary)] to-[var(--secondary)] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                     <span className="relative z-10 flex items-center gap-3">
                        {spotlight.buttonText}
                        <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                     </span>
                  </Link>
                )}
                
                <div className="hidden sm:flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.25em] text-[var(--foreground)]/30">
                   <div className="w-10 h-[1px] bg-[var(--glass-border)]" />
                   <span>Limited Engagement</span>
                </div>
              </div>

              {/* Status Indicators — Bento Elements */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
                 {[
                   { icon: Award, label: "Official", val: "Verified" },
                   { icon: Zap, label: "Trending", val: "High Focus" },
                   { icon: Star, label: "Rating", val: "Elite Selection" },
                 ].map((item, i) => (
                   <div key={i} className="flex flex-col gap-1 p-4 rounded-2xl bg-[var(--surface-200)]/30 border border-[var(--glass-border)] backdrop-blur-sm">
                      <item.icon size={14} className="text-[var(--primary)] mb-1" />
                      <span className="text-[8px] font-black uppercase tracking-widest text-[var(--foreground)]/40">{item.label}</span>
                      <span className="text-[10px] font-black text-[var(--foreground)]">{item.val}</span>
                   </div>
                 ))}
              </div>
            </div>

            {/* Right Asset — Spatial Art Column */}
            <div className="lg:col-span-5 relative">
              <MotionDiv
                initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-full aspect-[4/5] max-w-[440px] mx-auto rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] dark:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)] group/art border-[8px] border-[var(--surface-100)] active:scale-95 transition-transform duration-700"
              >
                <Image
                  src={spotlight.image || "https://picsum.photos/seed/editorial/800/1000"}
                  alt={spotlight.title}
                  fill
                  className="object-cover transition-transform duration-[3000ms] group-hover/art:scale-110"
                  unoptimized
                />
                
                {/* Adaptive Frosted Card Overlay */}
                <div className="absolute inset-x-6 bottom-6 p-6 rounded-[2rem] frosted-glass border border-white/20 shadow-2xl space-y-2 translate-y-4 opacity-0 group-hover/art:translate-y-0 group-hover/art:opacity-100 transition-all duration-700">
                   <p className="text-[8px] font-black uppercase tracking-[0.3em] text-[var(--primary)]">Featured Capture</p>
                   <p className="text-xs font-bold text-white leading-tight">Authentic literary preservation from the Sahitya Bari Archive.</p>
                </div>
              </MotionDiv>

              {/* Backdrop Atmosphere Elements */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-[var(--primary)]/10 blur-[100px] rounded-full animate-pulse" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[var(--secondary)]/10 blur-[80px] rounded-full animate-pulse [animation-delay:1s]" />
              
              {/* Geometric Floating Accent */}
              <div className="absolute top-1/2 -right-6 -translate-y-1/2 w-16 h-16 rounded-2xl bg-[var(--surface-100)] border border-[var(--glass-border)] shadow-xl hidden xl:flex items-center justify-center rotate-12 animate-bounce [animation-duration:4s]">
                 <Star size={24} className="text-[var(--warning)]" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </MotionSection>
  );
}
