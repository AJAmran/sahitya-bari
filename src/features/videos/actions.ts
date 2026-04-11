"use server"

import dbConnect from "@/lib/mongodb"
import Video from "@/lib/models/Video"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { extractYoutubeId } from "./api"

const videoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  youtubeLink: z.string().optional().or(z.literal("")),
  description: z.string().optional(),
  category: z.string().default("Literature"),
  thumbnail: z.string().optional().or(z.literal("")),
  isUpcoming: z.boolean().default(false),
  isPopular: z.boolean().default(false),
})

export async function createVideo(formData: FormData) {
  const data = videoSchema.parse({
    title: formData.get("title"),
    youtubeLink: formData.get("youtubeLink"),
    description: formData.get("description"),
    category: formData.get("category"),
    thumbnail: formData.get("thumbnail"),
    isUpcoming: formData.get("isUpcoming") === "on",
    isPopular: formData.get("isPopular") === "on",
  })

  let youtubeId = extractYoutubeId(data.youtubeLink);
  
  // Use provided thumbnail or auto-generate if youtubeId exists
  let thumbnail = data.thumbnail || "";
  if (!thumbnail && youtubeId) {
    thumbnail = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
  }

  await dbConnect()
  await Video.create({
    title: data.title,
    youtubeId: youtubeId || undefined,
    description: data.description || "",
    category: data.category,
    isUpcoming: data.isUpcoming,
    isPopular: data.isPopular,
    thumbnail,
    views: "0",
    duration: "",
    publishedAt: new Date(),
  })

  revalidatePath("/")
  revalidatePath("/videos")
  revalidatePath("/admin/videos")
}

export async function deleteVideo(id: string) {
  await dbConnect()
  await Video.findByIdAndDelete(id)
  revalidatePath("/")
  revalidatePath("/videos")
  revalidatePath("/admin/videos")
}

export async function toggleUpcoming(id: string) {
  await dbConnect()
  const video = await Video.findById(id)
  if (video) {
    video.isUpcoming = !video.isUpcoming
    await video.save()
    revalidatePath("/")
    revalidatePath("/videos")
    revalidatePath("/admin/videos")
  }
}

export async function togglePopular(id: string) {
  await dbConnect()
  const video = await Video.findById(id)
  if (video) {
    video.isPopular = !video.isPopular
    await video.save()
    revalidatePath("/")
    revalidatePath("/videos")
    revalidatePath("/admin/videos")
  }
}

export async function updateVideo(id: string, formData: FormData) {
  const data = videoSchema.parse({
    title: formData.get("title"),
    youtubeLink: formData.get("youtubeLink"),
    description: formData.get("description"),
    category: formData.get("category"),
    thumbnail: formData.get("thumbnail"),
    isUpcoming: formData.get("isUpcoming") === "on",
    isPopular: formData.get("isPopular") === "on",
  })

  let youtubeId = extractYoutubeId(data.youtubeLink);
  
  // Use provided thumbnail or auto-generate if youtubeId exists
  let thumbnail = data.thumbnail || "";
  if (!thumbnail && youtubeId) {
    thumbnail = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
  }

  await dbConnect()
  await Video.findByIdAndUpdate(id, {
    title: data.title,
    youtubeId: youtubeId || undefined,
    description: data.description || "",
    category: data.category,
    isUpcoming: data.isUpcoming,
    isPopular: data.isPopular,
    thumbnail,
  })

  revalidatePath("/")
  revalidatePath("/videos")
  revalidatePath("/admin/videos")
}
