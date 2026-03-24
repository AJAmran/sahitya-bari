import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Convert ISO 8601 duration (e.g. PT15M24S) to human-readable (15:24)
 */
export function formatDuration(isoDuration: string | null | undefined): string {
  if (!isoDuration) return "—"
  if (!isoDuration.startsWith("PT")) return isoDuration // Already formatted

  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!match) return isoDuration

  const hours = match[1] ? parseInt(match[1]) : 0
  const minutes = match[2] ? parseInt(match[2]) : 0
  const seconds = match[3] ? parseInt(match[3]) : 0

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }
  return `${minutes}:${seconds.toString().padStart(2, "0")}`
}

/**
 * Format raw view count string to human-readable (e.g. "1234567" → "1.2M")
 */
export function formatViews(views: string | null | undefined): string {
  if (!views) return "0"
  const num = parseInt(views)
  if (isNaN(num)) return views
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`
  return num.toLocaleString()
}

