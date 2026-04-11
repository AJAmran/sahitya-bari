import Link from "next/link";
import { MoveLeft, Sparkles, Ghost } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[oklch(0.05_0.02_250)] text-white overflow-hidden relative">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-[var(--primary)]/10 blur-[160px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-[var(--accent)]/10 blur-[160px] rounded-full animate-pulse delay-700" />
      </div>

      <div className="max-w-2xl w-full text-center space-y-12 relative z-10">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-black uppercase tracking-[0.3em] text-[var(--primary)] animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Ghost size={14} className="animate-bounce" />
            404 — Lost Manuscript
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            Page <span className="text-gradient">Not Found</span>
          </h1>
          <p className="text-lg text-white/50 font-medium max-w-lg mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
            The literary trail ends here. The manuscript you are looking for has either been moved to another collection or hasn&apos;t been written yet.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300">
          <Link
            href="/"
            className="group flex items-center gap-3 px-10 py-5 bg-white text-black rounded-[var(--radius-lg)] font-black shadow-2xl hover:scale-105 active:scale-95 transition-all w-full sm:w-auto"
          >
            <MoveLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Library
          </Link>
          <Link
            href="/contact"
            className="group flex items-center gap-3 px-10 py-5 h-full rounded-[var(--radius-lg)] border border-white/10 hover:bg-white/5 font-black transition-all w-full sm:w-auto"
          >
            <Sparkles size={20} className="group-hover:rotate-12 transition-transform text-[var(--primary)]" />
            Report Issue
          </Link>
        </div>
      </div>
    </div>
  );
}
