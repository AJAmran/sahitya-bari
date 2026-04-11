import { User, Twitter, AtSign, Globe } from 'lucide-react';

export default function BlogAuthorCard({ author }: { author: string }) {
  return (
    <div className="glass-card p-6 rounded-[var(--radius-2xl)] space-y-6 group">
      {/* Header label */}
      <h3 className="text-[0.65rem] font-black uppercase tracking-[0.35em] text-[var(--foreground)]/40 border-b border-[var(--glass-border)] pb-4">
        Editorial Board
      </h3>

      {/* Avatar + name */}
      <div className="flex flex-col items-center text-center gap-3">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-[var(--primary)] to-[var(--secondary)] blur-xl opacity-0 group-hover:opacity-15 transition-opacity rounded-full" />
          <div className="relative w-16 h-16 rounded-2xl bg-[var(--surface-300)] border border-[var(--glass-border)] flex items-center justify-center overflow-hidden rotate-2 group-hover:rotate-0 transition-transform duration-400">
            <User size={36} className="text-[var(--primary)]/40" />
          </div>
        </div>
        <div className="space-y-0.5">
          <h4 className="text-lg font-black font-bengali text-[var(--foreground)] leading-none">{author}</h4>
          <p className="text-[0.6rem] font-black text-[var(--primary)] uppercase tracking-[0.2em]">Principal Curator</p>
        </div>
      </div>

      {/* Bio */}
      <p className="text-xs text-[var(--foreground)]/60 font-medium leading-relaxed text-center">
        Deconstructing the architecture of modern thought through the lens of classical Bengali literature.
      </p>

      {/* Social links */}
      <div className="flex items-center gap-2">
        {[
          { Icon: Twitter, color: 'primary' },
          { Icon: AtSign, color: 'secondary' },
          { Icon: Globe, color: 'accent' },
        ].map(({ Icon, color }, i) => (
          <button
            key={i}
            className={`flex-1 py-2.5 rounded-[var(--radius-lg)] bg-[var(--surface-100)] border border-[var(--glass-border)] flex items-center justify-center hover:bg-[var(--${color})]/8 hover:border-[var(--${color})]/20 transition-all group/icon`}
          >
            <Icon size={14} className={`text-[var(--foreground)]/25 group-hover/icon:text-[var(--${color})] transition-colors`} />
          </button>
        ))}
      </div>
    </div>
  );
}
