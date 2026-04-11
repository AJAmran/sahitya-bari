import Link from "next/link"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

interface PaginationProps {
  currentPage: number
  totalPages: number
  baseUrl: string
}

export function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  const getPages = () => {
    const pages = []
    const delta = 1

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        pages.push(i)
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...')
      }
    }
    return pages
  }

  if (totalPages <= 1) return null

  return (
    <nav className="flex items-center justify-center gap-10 mt-28 mb-16">
      <Link
        href={`${baseUrl}?page=${currentPage - 1}`}
        className={cn(
          "h-14 w-14 flex items-center justify-center rounded-full border border-[var(--glass-border)] transition-all hover:bg-[var(--surface-100)] active:scale-90",
          currentPage <= 1 && "opacity-20 pointer-events-none"
        )}
      >
        <ChevronLeft size={20} />
      </Link>

      <div className="flex items-center gap-4">
        {getPages().map((page, i) => (
          <div key={i}>
            {page === '...' ? (
              <div className="w-10 h-10 flex items-center justify-center text-[var(--foreground)]/20">
                <MoreHorizontal size={18} />
              </div>
            ) : (
              <Link
                href={`${baseUrl}?page=${page}`}
                className={cn(
                  "w-12 h-12 flex items-center justify-center rounded-full text-xs font-black uppercase tracking-widest transition-all",
                  currentPage === page
                    ? "bg-[var(--foreground)] text-[var(--background)] shadow-2xl"
                    : "text-[var(--foreground)]/40 hover:text-[var(--primary)]"
                )}
              >
                {String(page).padStart(2, '0')}
              </Link>
            )}
          </div>
        ))}
      </div>

      <Link
        href={`${baseUrl}?page=${currentPage + 1}`}
        className={cn(
          "h-14 w-14 flex items-center justify-center rounded-full border border-[var(--glass-border)] transition-all hover:bg-[var(--surface-100)] active:scale-90",
          currentPage >= totalPages && "opacity-20 pointer-events-none"
        )}
      >
        <ChevronRight size={20} />
      </Link>
    </nav>
  )
}
