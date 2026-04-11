import { Search } from 'lucide-react';

interface VideoFiltersProps {
  selectedCategory: string;
  searchQuery: string;
}

export default function VideoFilters({ selectedCategory, searchQuery }: VideoFiltersProps) {
  const categories = ['All', 'Literature', 'Poetry', 'Review', 'Recitation', 'Upcoming'];

  return (
    <div className="mb-8 flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center liquid-glass p-3 rounded-[var(--radius-xl)]">
      {/* Search */}
      <form className="relative w-full sm:w-80 group" action="/videos" method="GET">
        <Search
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--foreground)]/35 group-focus-within:text-[var(--primary)] transition-colors"
          size={16}
        />
        <input
          type="text"
          name="q"
          defaultValue={searchQuery}
          placeholder="Search videos..."
          className="w-full pl-10 pr-4 h-10 rounded-[var(--radius-md)] bg-[var(--surface-200)] border border-[var(--glass-border)] focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] outline-none transition-all text-[var(--foreground)] placeholder:text-[var(--foreground)]/30 text-sm"
        />
        <button type="submit" className="sr-only">Search</button>
      </form>

      {/* Category pills */}
      <div className="flex gap-1.5 flex-wrap">
        {categories.map((category) => (
          <a
            key={category}
            href={category === 'All' ? '/videos' : `/videos?category=${encodeURIComponent(category)}`}
            className={`px-3.5 py-1.5 rounded-full text-[0.65rem] font-bold transition-all whitespace-nowrap uppercase tracking-wide ${
              category === selectedCategory
                ? 'bg-[var(--primary)] text-white shadow-[var(--shadow-sm)]'
                : 'bg-[var(--surface-200)] text-[var(--foreground)]/55 hover:bg-[var(--primary)]/10 hover:text-[var(--primary)] border border-[var(--glass-border)]'
            }`}
          >
            {category}
          </a>
        ))}
      </div>
    </div>
  );
}
