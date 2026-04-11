import { Search, Filter } from 'lucide-react';
import Link from 'next/link';

export default function HomeSearch() {
  return (
    <div className="sticky top-[60px] z-40 mb-10 sm:mb-14 -mt-6 sm:-mt-8">
      <div className="site-container">
        <form
          action="/blog"
          method="GET"
          className="max-w-3xl mx-auto backdrop-blur-2xl bg-[var(--surface-50)]/95 dark:bg-[var(--surface-100)]/95 rounded-2xl border border-[var(--glass-border)] shadow-[var(--shadow-pro)] group/search relative overflow-hidden transition-all duration-500 hover:border-[var(--primary)]/20"
        >
          {/* Hover shimmer */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/4 via-transparent to-[var(--accent)]/4 opacity-0 group-hover/search:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-0 relative z-10">
            {/* Search input */}
            <div className="flex items-center gap-3 px-5 h-14 flex-1 min-w-0">
              <Search className="text-[var(--primary)] shrink-0" size={18} />
              <input
                type="text"
                name="q"
                placeholder="কবিতা, গল্প বা লেখকের নাম দিয়ে খুঁজুন..."
                className="w-full bg-transparent border-none outline-none text-[var(--foreground)] placeholder:text-[var(--foreground)]/35 font-medium text-sm sm:text-base leading-none"
              />
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-8 self-center bg-[var(--glass-border)] shrink-0" />

            {/* Actions */}
            <div className="flex items-center gap-1.5 p-1.5 sm:p-2 border-t sm:border-t-0 border-[var(--glass-border)]">
              <Link
                href="/blog"
                className="flex items-center gap-2 px-4 h-10 rounded-xl hover:bg-[var(--surface-200)] text-[var(--foreground)]/55 transition-all font-bold text-[0.65rem] uppercase tracking-widest shrink-0"
              >
                <Filter size={14} />
                <span>Filters</span>
              </Link>

              <button
                type="submit"
                className="btn-ios flex-1 sm:flex-none px-6 h-10 bg-[var(--foreground)] text-[var(--background)] rounded-xl font-black uppercase tracking-[0.15em] text-[0.65rem] shadow-[var(--shadow-sm)]"
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
