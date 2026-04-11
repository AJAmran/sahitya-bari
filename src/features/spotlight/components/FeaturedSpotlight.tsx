import { ArrowRight, Sparkles, Star, Award } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getActiveSpotlight } from '../api';
import { MotionDiv, MotionSection } from '@/components/Motion';

export default async function FeaturedSpotlight() {
  const spotlight = await getActiveSpotlight();
  if (!spotlight) return null;

  return (
    <MotionSection
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="py-10 sm:py-16 relative overflow-visible"
    >
      <div className="site-container">
        {/* Envelope card */}
        <div className="relative rounded-[2.5rem] overflow-hidden bg-[var(--surface-100)] border border-[var(--glass-border)] shadow-[var(--shadow-pro)] group transition-all duration-700">

          {/* Ambient glows */}
          <div className="absolute -top-1/4 -left-[8%] w-1/2 h-full bg-[var(--primary)]/8 blur-[90px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-1/4 -right-[8%] w-2/5 h-full bg-[var(--accent)]/8 blur-[80px] rounded-full pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 p-6 sm:p-10 lg:p-16 items-center">

            {/* LEFT — Editorial content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <MotionDiv
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.7 }}
                className="space-y-5"
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--primary)]/20 bg-[var(--surface-200)] text-[var(--primary)] text-[0.65rem] font-black uppercase tracking-[0.25em] shadow-sm">
                  <Sparkles size={12} className="text-[var(--warning)] animate-pulse" />
                  <span>Curatorial Special</span>
                </div>

                {/* Title */}
                <div className="space-y-3">
                  <h2 className="text-2xl sm:text-2xl lg:text-3xl font-black font-bengali text-[var(--foreground)] leading-tight">
                    {spotlight.title.split(' ').map((word: string, i: number) => (
                      <span key={i} className={i % 2 === 0 ? "text-[var(--foreground)]" : "text-gradient"}>
                        {word}{' '}
                      </span>
                    ))}
                  </h2>
                  {spotlight.subtitle && (
                    <p className="text-base sm:text-lg md:text-xl font-light text-[var(--foreground)]/55 leading-relaxed max-w-xl mx-auto lg:mx-0">
                      {spotlight.subtitle}
                    </p>
                  )}
                </div>

                {/* Divider */}
                <div className="w-16 h-1 bg-gradient-to-r from-[var(--primary)] to-transparent rounded-full opacity-40 mx-auto lg:mx-0" />

                {/* Description */}
                <p className="text-sm sm:text-base text-[var(--foreground)]/65 leading-relaxed max-w-lg mx-auto lg:mx-0 font-light italic">
                  &quot;{spotlight.description}&quot;
                </p>

                {/* CTA row */}
                <div className="flex flex-col sm:flex-row items-center gap-5 pt-2 justify-center lg:justify-start">
                  {spotlight.buttonText && spotlight.buttonLink && (
                    <Link
                      href={spotlight.buttonLink}
                      className="group/btn relative h-12 px-8 flex items-center justify-center bg-[var(--foreground)] text-[var(--background)] font-black text-xs uppercase tracking-[0.2em] overflow-hidden rounded-full shadow-[var(--shadow-pro)] transition-all hover:scale-[1.03] active:scale-[0.98] w-full sm:w-auto"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                      <span className="relative z-10 flex items-center gap-2.5">
                        {spotlight.buttonText}
                        <ArrowRight size={15} className="transition-transform group-hover/btn:translate-x-1" />
                      </span>
                    </Link>
                  )}

                  {/* Editorial stamps */}
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-3">
                      <div className="w-9 h-9 rounded-full bg-[var(--surface-300)] border-2 border-[var(--background)] flex items-center justify-center text-[var(--primary)] z-30">
                        <Award size={16} />
                      </div>
                      <div className="w-9 h-9 rounded-full bg-[var(--surface-200)] border-2 border-[var(--background)] flex items-center justify-center text-[var(--warning)] z-20">
                        <Star size={16} />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.6rem] uppercase font-black tracking-[0.2em] text-[var(--primary)]">Top Rated</span>
                      <span className="text-[0.65rem] font-bold text-[var(--foreground)]/40">Editorial Pick 2026</span>
                    </div>
                  </div>
                </div>
              </MotionDiv>
            </div>

            {/* RIGHT — Artwork */}
            <MotionDiv
              initial={{ opacity: 0, scale: 0.92, rotate: -1.5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 relative"
            >
              <div className="relative w-full max-w-xs sm:max-w-sm aspect-[4/5] mx-auto rounded-[2.5rem] overflow-hidden p-2.5 bg-[var(--surface-300)]/40 shadow-[var(--shadow-pro)]">
                <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-inner shadow-black/15">
                  <Image
                    src={spotlight.image || 'https://picsum.photos/seed/editorial/800/1000'}
                    alt={spotlight.title}
                    fill
                    sizes="(max-width: 640px) 280px, 320px"
                    className="object-cover transition-transform duration-[6s] group-hover:scale-105"
                    unoptimized
                  />
                  {/* Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent opacity-65 group-hover:opacity-80 transition-opacity duration-700" />

                  {/* Floating meta */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-[1.25rem] bg-white/5 backdrop-blur-2xl border border-white/10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-600 ease-[var(--ease-ios)]">
                    <p className="text-[0.6rem] font-black uppercase tracking-[0.25em] text-[var(--primary)] mb-1.5">Editor&apos;s Insight</p>
                    <p className="text-sm font-medium text-white/85 leading-snug">This exclusive feature represents the pinnacle of modern Bengali literary achievement.</p>
                  </div>
                </div>
              </div>

              {/* Glow */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-[var(--primary)]/10 blur-[50px] rounded-full pointer-events-none" />
            </MotionDiv>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
