"use server"

import dbConnect from "@/lib/mongodb"
import SiteSettings from "@/lib/models/SiteSettings"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { cache } from "react"

const settingsSchema = z.object({
  siteTitle: z.string().optional(),
  heroTitle: z.string().optional(),
  heroSubtitle: z.string().optional(),
  youtubeUrl: z.string().url().optional().or(z.literal("")),
  facebookUrl: z.string().url().optional().or(z.literal("")),
})

export interface SiteSettingsMap {
  siteTitle: string
  heroTitle: string
  heroSubtitle: string
  youtubeUrl: string
  facebookUrl: string
  [key: string]: string
}

const DEFAULT_SETTINGS: SiteSettingsMap = {
  siteTitle: "Sahitya Bari | সাহিত্য বাড়ি",
  heroTitle: "সাহিত্যের অঙিনায় আপনাকে স্বাগতম",
  heroSubtitle: "Exploring the depths of Bengali literature, poetry, and storytelling. Join our community of literature lovers.",
  youtubeUrl: "",
  facebookUrl: "",
}

export const getSiteSettings = cache(async (): Promise<SiteSettingsMap> => {
  try {
    await dbConnect()
    const settings = await SiteSettings.find().lean()
    const settingsMap: SiteSettingsMap = { ...DEFAULT_SETTINGS }
    settings.forEach((s: any) => {
      settingsMap[s.key] = s.value
    })
    return settingsMap
  } catch (error) {
    console.error("Failed to fetch site settings, using defaults:", error)
    return DEFAULT_SETTINGS
  }
})

export async function updateSiteSettings(data: z.infer<typeof settingsSchema>) {
  const result = settingsSchema.safeParse(data)
  if (!result.success) {
    throw new Error("Invalid data")
  }

  await dbConnect()
  const updates = []
  for (const [key, value] of Object.entries(result.data)) {
    if (value !== undefined) {
      updates.push(
        SiteSettings.findOneAndUpdate(
          { key },
          { $set: { value } },
          { upsert: true, returnDocument: 'after' }
        )
      )
    }
  }

  await Promise.all(updates)
  revalidatePath("/")
  revalidatePath("/admin/settings")
}

