"use client"

import { useState } from "react"
import { subscribeNewsletter } from "../actions"
import { toast } from "sonner"
import { Loader2, ArrowRight } from "lucide-react"

interface NewsletterFormProps {
  variant?: "footer" | "section"
}

export default function NewsletterForm({ variant = "footer" }: NewsletterFormProps) {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    try {
      const result = await subscribeNewsletter(formData)
      if (result.success) {
        toast.success(result.message);
        (e.target as HTMLFormElement).reset()
      } else {
        toast.error(result.error)
      }
    } catch {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  /* ── Section variant (hero-style pill input) ── */
  if (variant === "section") {
    return (
      <form className="w-full max-w-lg mx-auto" onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-1.5 rounded-2xl bg-[var(--surface-50)] dark:bg-[var(--surface-100)] border border-[var(--glass-border)] focus-within:border-[var(--primary)]/50 transition-all duration-300 shadow-[var(--shadow-pro)]">
          <input
            type="email"
            name="email"
            required
            placeholder="আপনার ইমেইল ঠিকানা লিখুন..."
            className="flex-1 px-5 bg-transparent border-none outline-none text-[var(--foreground)] placeholder:text-[var(--foreground)]/38 font-medium h-11 text-sm min-w-0"
          />
          <button
            type="submit"
            disabled={loading}
            className="h-11 px-6 bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--primary)] hover:text-white font-black uppercase tracking-widest text-[0.65rem] rounded-xl transition-all duration-250 disabled:opacity-50 active:scale-95 flex items-center justify-center gap-2 shrink-0"
          >
            {loading
              ? <Loader2 className="animate-spin" size={15} />
              : <><span>Subscribe</span><ArrowRight size={14} /></>
            }
          </button>
        </div>
      </form>
    )
  }

  /* ── Footer variant (stacked) ── */
  return (
    <form className="space-y-2.5" onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        required
        placeholder="Enter your email"
        className="w-full px-4 h-10 rounded-[var(--radius-md)] bg-[var(--surface-200)] dark:bg-[var(--surface-200)] border border-[var(--glass-border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/15 outline-none text-sm font-medium transition-all placeholder:text-[var(--foreground)]/30 text-[var(--foreground)]"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full h-10 bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--primary)] hover:text-white rounded-[var(--radius-md)] text-[0.65rem] font-black uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95"
      >
        {loading
          ? <Loader2 className="animate-spin" size={14} />
          : <><span>Join Newsletter</span><ArrowRight size={13} /></>
        }
      </button>
    </form>
  )
}
