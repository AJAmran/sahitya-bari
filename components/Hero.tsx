"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { PlayCircle, ArrowRight, Sparkles, TrendingUp, BookOpen, Volume2 } from "lucide-react";

interface HeroProps {
  title?: string;
  subtitle?: string;
  youtubeUrl?: string;
}

export default function Hero({ title, subtitle }: HeroProps) {
  return (
    <section className="relative w-full min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden pt-[var(--space-12)] pb-[var(--space-10)]">
      {/* Dynamic Background Elements - Hyper-realistic 2026 Style */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] bg-[oklch(65%_0.18_260/0.15)] dark:bg-[oklch(65%_0.18_260/0.1)] rounded-[var(--radius-full)] blur-[140px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -60, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] bg-[oklch(75%_0.14_310/0.15)] dark:bg-[oklch(75%_0.14_310/0.1)] rounded-[var(--radius-full)] blur-[140px]"
        />

        {/* Animated Noise/Grain Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        />
      </div>

      <div className="relative z-10 site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: Content */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
              className="space-y-6"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="inline-flex items-center gap-2 py-1.5 px-4 rounded-[var(--radius-full)] liquid-glass border border-[var(--glass-border)] text-xs font-black uppercase tracking-[0.2em] text-[var(--primary)] mb-2"
              >
                <Sparkles size={14} className="animate-pulse" />
                <span>Modern Bengali Literature Hub</span>
              </motion.div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-bengali text-[var(--foreground)] leading-[1.1] tracking-tight">
                {title?.includes("|") ? (
                  <>
                    {title.split("|")[0]} <br />
                    <span className="text-shimmer drop-shadow-[0_0_20px_rgba(55,127,255,0.2)]">
                      {title.split("|")[1]}
                    </span>
                  </>
                ) : (
                  <>
                    {title?.replace("আপনাকে স্বাগতম", "").trim() || "সাহিত্যের অঙিনায়"} <br />
                    <span className="text-shimmer drop-shadow-[0_0_20px_rgba(55,127,255,0.2)]">
                      আপনাকে স্বাগতম
                    </span>
                  </>
                )}
              </h1>

              <p className="text-base sm:text-lg text-[var(--foreground)]/60 max-w-xl font-medium leading-relaxed">
                {subtitle || "Exploring the depths of Bengali literature, poetry, and storytelling. Join our elite community of literature lovers."}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <Link
                  href="/videos"
                  className="btn-ios group relative inline-flex items-center justify-center px-8 h-[56px] text-base font-bold text-white bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] shadow-xl shadow-[var(--primary)]/10 hover:scale-[1.03] active:scale-[0.98] transition-all rounded-[var(--radius-2xl)]"
                >
                  <PlayCircle className="mr-2 h-5 w-5" />
                  <span>Watch Videos</span>
                </Link>

                <Link
                  href="/blog"
                  className="btn-ios group inline-flex items-center justify-center px-8 h-[56px] text-base font-semibold text-[var(--foreground)] frosted-glass hover:bg-[var(--surface-300)] transition-all rounded-[var(--radius-2xl)] border border-[var(--glass-border)]"
                >
                  <span>Explore Blog</span>
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Stats/Badge Row - Bento Style */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-6">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-xl)] bg-[var(--surface-100)]/40 border border-[var(--glass-border)] backdrop-blur-md">
                  <div className="w-7 h-7 rounded-[var(--radius-lg)] bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]">
                    <TrendingUp size={14} />
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[var(--foreground)]/50">12K+ Total Views</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-xl)] bg-[var(--surface-100)]/40 border border-[var(--glass-border)] backdrop-blur-md">
                  <div className="w-7 h-7 rounded-[var(--radius-lg)] bg-[var(--secondary)]/10 flex items-center justify-center text-[var(--secondary)]">
                    <BookOpen size={14} />
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[var(--foreground)]/50">Weekly Stories</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-xl)] bg-[var(--surface-100)]/40 border border-[var(--glass-border)] backdrop-blur-md">
                  <div className="w-7 h-7 rounded-[var(--radius-lg)] bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)]">
                    <Volume2 size={14} />
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[var(--foreground)]/50">Audio Books</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: High-Fidelity Spatial Art */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1] }}
            className="lg:col-span-5 relative flex justify-center items-center"
          >
            {/* Main Visual Anchor */}
            <div className="relative w-full max-w-[500px] aspect-square rounded-[3rem] overflow-hidden shadow-[0_32px_80px_-20px_rgba(0,0,0,0.3)] dark:shadow-[0_32px_80px_-20px_rgba(0,0,0,0.6)] group">
              <Image
                src="/literature-hero.png"
                alt="Sahitya Bari Literature Art"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                priority
              />
              {/* Glass Overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--primary)]/20 to-transparent mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            </div>

            {/* Floating Accents */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-4 w-32 h-32 rounded-[var(--radius-3xl)] liquid-glass border border-[var(--glass-border)] shadow-2xl z-20 hidden sm:flex flex-col items-center justify-center p-4 text-center space-y-2 backdrop-blur-2xl"
            >
              <div className="w-12 h-12 rounded-[var(--radius-xl)] bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center text-white shadow-lg">
                <Sparkles size={24} />
              </div>
              <span className="text-[8px] font-black uppercase tracking-tighter text-[var(--foreground)]/70 leading-tight">Handcrafted <br /> Literature</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-10 -left-6 w-40 px-6 py-4 rounded-[var(--radius-2xl)] frosted-glass border border-[var(--glass-border)] shadow-2xl z-20 hidden sm:flex items-center gap-3 backdrop-blur-2xl"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-6 h-6 rounded-[var(--radius-full)] border border-[var(--glass-border)] bg-[var(--surface-300)] flex items-center justify-center text-[10px] font-black text-[var(--primary)]">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[var(--foreground)]/40">Growing Hub</span>
            </motion.div>

            {/* Background Glow for the image */}
            <div className="absolute -inset-10 bg-[var(--primary)]/20 rounded-[var(--radius-full)] blur-[100px] -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

