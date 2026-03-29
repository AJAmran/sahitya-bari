"use client"

import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="absolute top-20 left-10 w-96 h-96 bg-[var(--primary)]/10 rounded-[var(--radius-full)] blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--secondary)]/10 rounded-[var(--radius-full)] blur-3xl -z-10 animate-pulse delay-1000" />
      
      <div className="glass-card p-12 rounded-[var(--radius-xl)] max-w-md w-full border border-[var(--glass-border)] shadow-2xl">
        <h1 className="text-8xl font-black text-gradient mb-4">404</h1>
        <h2 className="text-2xl font-bold font-bengali text-[var(--foreground)] mb-6">
          পৃষ্ঠাটি খুজে পাওয়া যায়নি
        </h2>
        <p className="text-[var(--foreground)]/60 mb-10 font-light">
          Sorry, the literary journey you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back on the right track.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="px-6 py-3 bg-[var(--primary)] text-white rounded-[var(--radius-md)] font-bold text-sm flex items-center justify-center gap-2 hover:scale-[1.05] active:scale-[0.95] transition-all"
          >
            <Home size={18} />
            Home
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-[var(--surface-200)] text-[var(--foreground)] rounded-[var(--radius-md)] font-bold text-sm flex items-center justify-center gap-2 hover:scale-[1.05] active:scale-[0.95] transition-all border border-[var(--glass-border)]"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
