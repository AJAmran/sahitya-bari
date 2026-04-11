"use server"

import dbConnect from "@/lib/mongodb";
import VideoModel from "@/lib/models/Video";
import BlogPost from "@/lib/models/BlogPost";
import FeaturedSpotlight from "@/lib/models/FeaturedSpotlight";
import ContactMessage from "@/lib/models/ContactMessage";
import NewsletterSubscription from "@/lib/models/NewsletterSubscription";
import Comment from "@/lib/models/Comment";
// @ts-ignore - Next.js 16 feature
import { cacheLife, revalidatePath } from "next/cache";

import SiteSettings from "@/lib/models/SiteSettings"
import { z } from "zod"

const settingsSchema = z.object({
  siteTitle: z.string().optional(),
  heroTitle: z.string().optional(),
  heroSubtitle: z.string().optional(),
  youtubeUrl: z.string().url().optional().or(z.literal("")),
  facebookUrl: z.string().url().optional().or(z.literal("")),
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
