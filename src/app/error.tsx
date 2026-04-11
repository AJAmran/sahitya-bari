'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCcw, Home, AlertCircle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[oklch(0.05_0.02_250)] text-white overflow-hidden relative">
      <div className="max-w-2xl w-full text-center space-y-10 relative z-10">
        <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-tr from-[var(--destructive)] to-[var(--primary)] flex items-center justify-center mx-auto shadow-2xl shadow-[var(--destructive)]/20 animate-bounce">
          <AlertCircle size={48} className="text-white" />
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">System Encountered a Glitch</h1>
          <p className="text-[var(--foreground)]/50 font-medium max-w-md mx-auto">
            Something went wrong while loading the literary archive. Our scribes have been notified.
          </p>
          {error.digest && (
            <code className="block mt-4 text-[10px] text-white/20 uppercase tracking-[0.2em] font-black">
              Error Hash: {error.digest}
            </code>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-10">
          <button
            onClick={() => reset()}
            className="group flex items-center gap-3 px-8 py-4 bg-[var(--primary)] text-white rounded-[var(--radius-md)] font-black shadow-xl hover:scale-105 active:scale-95 transition-all w-full sm:w-auto"
          >
            <RefreshCcw size={18} className="group-active:rotate-180 transition-transform duration-500" />
            Try Synchronizing Again
          </button>
          <Link
            href="/"
            className="flex items-center gap-3 px-8 py-4 rounded-[var(--radius-md)] border border-white/10 hover:bg-white/5 font-black transition-all w-full sm:w-auto justify-center"
          >
            <Home size={18} />
            Safe Harbor
          </Link>
        </div>
      </div>
    </div>
  );
}
