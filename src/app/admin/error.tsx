'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { AlertCircle, RefreshCcw, Home } from 'lucide-react';
import Link from 'next/link';

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Admin Area Error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-[var(--surface-100)]/80 backdrop-blur-3xl rounded-[var(--radius-2xl)] p-8 border border-[var(--destructive)]/20 shadow-2xl shadow-[var(--destructive)]/5 text-center relative overflow-hidden">
        
        {/* Animated Background Failure state */}
        <div className="absolute top-0 left-0 w-full h-1 bg-[var(--destructive)] animate-pulse" />
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[var(--destructive)]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[var(--warning)]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 bg-[var(--destructive)]/10 rounded-full flex items-center justify-center mb-6 border border-[var(--destructive)]/20 text-[var(--destructive)] relative">
                <div className="absolute inset-0 border border-[var(--destructive)]/30 rounded-full animate-ping opacity-20" />
                <AlertCircle size={36} />
            </div>

            <h2 className="text-2xl font-black text-[var(--foreground)] tracking-tight mb-3">
                System Exception
            </h2>
            
            <p className="text-[var(--foreground)]/60 text-sm mb-8 leading-relaxed font-medium">
                An unexpected error occurred in the administrative module. Our diagnostic systems have logged the failure.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 w-full">
                <button
                    onClick={() => reset()}
                    className="flex-1 flex items-center justify-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white px-6 py-3.5 rounded-xl font-bold shadow-lg shadow-[var(--primary)]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                    <RefreshCcw size={18} />
                    Run Diagnostics
                </button>
                <Link 
                    href="/admin"
                    className="flex-1 flex items-center justify-center gap-2 bg-[var(--surface-200)] hover:bg-[var(--surface-300)] text-[var(--foreground)] px-6 py-3.5 rounded-xl font-bold border border-[var(--glass-border)] transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                    <Home size={18} />
                    Return Home
                </Link>
            </div>
            
            {error.digest && (
                <div className="mt-8 pt-4 border-t border-[var(--glass-border)] w-full text-left">
                    <p className="text-[10px] font-mono text-[var(--foreground)]/40 uppercase tracking-widest break-all">
                        Error Hash: {error.digest}
                    </p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
