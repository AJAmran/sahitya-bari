"use client";

import Link from "next/link";
import Image from "next/image";
import { MotionDiv } from "@/components/Motion";
import { SectionPill } from "@/components/ui/SectionPill";
import { PlayCircle, ArrowRight, Sparkles } from "lucide-react";

interface HeroProps {
  title?: string;
  subtitle?: string;
}

export default function Hero({ title, subtitle }: HeroProps) {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-24 sm:pt-28 pb-14 sm:pb-20">
      {/* Background blobs */}
      <div className="absolute inset-0 z-0 bg-[var(--background)] pointer-events-none">
        <div className="absolute top-0 right-0 w-[55vw] h-[55vw] bg-[var(--primary-light)]/25 rounded-full blur-[100px] -mr-[25vw] -mt-[18vw]" />
        <div className="absolute bottom-0 left-0 w-[45vw] h-[45vw] bg-[var(--secondary-light)]/15 rounded-full blur-[80px] -ml-[20vw] -mb-[12vw]" />
      </div>

      <div className="relative z-10 site-container w-full">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* Text Content */}
          <div className="xl:col-span-7 flex flex-col items-center xl:items-start text-center xl:text-left">
            <MotionDiv
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6 w-full"
            >
              {/* Pill */}
              <div className="flex justify-center xl:justify-start">
                <SectionPill
                  label="Curating Bengali Excellence"
                  icon={Sparkles}
                  variant="primary"
                  className="bg-white/80 dark:bg-white/5 border-[var(--glass-border)] shadow-sm"
                />
              </div>

              {/* Heading */}
              <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-black font-bengali heading-display">
                {title?.includes("|") ? (
                  <div className="flex flex-col gap-2">
                    <span className="text-[var(--foreground)]">{title.split("|")[0]}</span>
                    <span className="text-gradient">{title.split("|")[1]}</span>
                  </div>
                ) : (
                  <span className="text-gradient">
                    {title || "সাহিত্যের অমরাবতী"}
                  </span>
                )}
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg md:text-xl text-[var(--foreground)]/60 max-w-xl leading-relaxed font-medium mx-auto xl:mx-0">
                {subtitle || "The modern home for Bengali literature, poetry, and cinematic discussions. Where heritage meets contemporary thought."}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2 w-full sm:w-auto">
                <Link
                  href="/videos"
                  className="btn-bespoke w-full sm:w-auto justify-center"
                >
                  <PlayCircle className="h-4 w-4 shrink-0" />
                  সারসংক্ষেপ দেখুন
                </Link>

                <Link
                  href="/blog"
                  className="h-12 px-7 rounded-full border border-[var(--glass-border)] hover:bg-[var(--surface-100)] dark:hover:bg-white/5 text-[var(--foreground)] font-bold text-sm flex items-center justify-center w-full sm:w-auto transition-all group"
                >
                  অন্বেষণ করুন
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </div>
            </MotionDiv>

            {/* Stats */}
            <MotionDiv
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 w-full max-w-xl xl:max-w-none pt-8 mt-8 border-t border-[var(--glass-border)]"
            >
              {[
                { label: "Articles", count: "480+" },
                { label: "Videos", count: "120+" },
                { label: "Community", count: "12k+" },
                { label: "Active Years", count: "05+" },
              ].map((item, i) => (
                <div key={i} className="space-y-0.5">
                  <div className="text-2xl sm:text-3xl font-black text-[var(--foreground)] leading-none">{item.count}</div>
                  <div className="text-[0.65rem] font-bold uppercase tracking-widest text-[var(--foreground)]/40">{item.label}</div>
                </div>
              ))}
            </MotionDiv>
          </div>

          {/* Visual */}
          <MotionDiv
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="hidden xl:flex xl:col-span-5 justify-end relative"
          >
            <div className="relative w-full max-w-sm aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl bg-[var(--surface-100)] border-4 border-white dark:border-white/5 animate-float">
              <Image
                src="/literature-hero.png"
                alt="Sahitya Bari Visual"
                fill
                sizes="(min-width: 1280px) 400px, 0px"
                className="object-cover"
                priority
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--foreground)]/70 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
                <div className="space-y-1">
                  <div className="text-white/60 text-[0.6rem] font-bold uppercase tracking-widest">Featured Story</div>
                  <div className="text-lg font-black text-white leading-tight">কালজয়ী সাহিত্য সংগ্রহ</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white shrink-0">
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
            </div>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
}
