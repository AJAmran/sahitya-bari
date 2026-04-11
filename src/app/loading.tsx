import React from 'react';
import { Loader2 } from 'lucide-react';

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 min-h-screen bg-[var(--background)] z-[999] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-50 z-0">
        <div className="absolute top-[20%] left-[20%] w-[40vw] h-[40vw] bg-[var(--primary)]/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[20%] right-[20%] w-[40vw] h-[40vw] bg-[var(--secondary)]/10 blur-[120px] rounded-full animate-pulse delay-500" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="relative">
          <div className="absolute inset-0 bg-[var(--primary)]/20 blur-xl rounded-full animate-pulse"></div>
          <div className="w-20 h-20 bg-[var(--surface-50)] border border-[var(--glass-border)] rounded-[2rem] shadow-2xl flex items-center justify-center backdrop-blur-xl shrink-0 liquid-glass animate-bounce">
            <Loader2 className="w-10 h-10 text-[var(--primary)] animate-spin" />
          </div>
        </div>
        
        <div className="text-center space-y-2">
          <h2 className="text-lg font-black font-bengali text-[var(--foreground)] uppercase tracking-widest text-gradient">
            লোড হচ্ছে...
          </h2>
          <div className="flex gap-1 justify-center items-center h-2">
            <div className="w-2 h-2 rounded-full bg-[var(--primary)]/50 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-[var(--primary)]/70 animate-pulse delay-150"></div>
            <div className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse delay-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
