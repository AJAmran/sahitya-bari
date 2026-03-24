"use client"

import { useState } from "react"
import { subscribeNewsletter } from "@/app/actions/newsletter"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

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
                toast.success(result.message)
                    ; (e.target as HTMLFormElement).reset()
            } else {
                toast.error(result.error)
            }
        } catch {
            toast.error("Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    if (variant === "section") {
        return (
            <form className="flex flex-col sm:flex-row gap-[var(--space-2)] max-w-lg mx-auto" onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    required
                    placeholder="Enter your email address"
                    className="flex-1 px-6 h-12 rounded-[var(--radius-full)] bg-[var(--surface-100)] border border-[var(--glass-border)] text-[var(--foreground)] placeholder-[var(--foreground)]/40 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 backdrop-blur-sm transition-all shadow-inner"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="btn-ios px-8 h-12 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white font-bold rounded-[var(--radius-full)] hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[var(--primary)]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : "Subscribe"}
                </button>
            </form>
        )
    }

    return (
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                className="w-full px-4 h-12 rounded-[var(--radius-xl)] bg-[var(--surface-100)] border border-[var(--glass-border)] focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)] outline-none text-sm transition-all backdrop-blur-sm placeholder:[var(--foreground)]/40 text-[var(--foreground)] shadow-inner"
            />
            <button
                type="submit"
                disabled={loading}
                className="btn-ios px-4 py-3 bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white rounded-[var(--radius-xl)] text-sm font-bold transition-all shadow-lg shadow-[var(--primary)]/20 hover:shadow-[var(--primary)]/40 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? <Loader2 className="animate-spin mx-auto" size={18} /> : "Subscribe"}
            </button>
        </form>
    )
}
