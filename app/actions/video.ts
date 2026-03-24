"use server"

import dbConnect from "@/lib/mongodb"
import Video from "@/lib/models/Video"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const videoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  youtubeLink: z.string().url("Must be a valid YouTube URL"),
  description: z.string().optional(),
  category: z.string().default("Literature"),
  thumbnail: z.string().optional(),
  isUpcoming: z.boolean().default(false),
  isPopular: z.boolean().default(false),
})

function extractYoutubeId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export async function createVideo(formData: FormData) {
  const data = videoSchema.parse({
    title: formData.get("title"),
    youtubeLink: formData.get("youtubeLink"),
    description: formData.get("description"),
    category: formData.get("category"),
    isUpcoming: formData.get("isUpcoming") === "on",
    isPopular: formData.get("isPopular") === "on",
  })

  let youtubeId = extractYoutubeId(data.youtubeLink);
  if (!youtubeId) {
    throw new Error("Invalid YouTube URL");
  }

  // Auto-generate thumbnail from YouTube ID
  const thumbnail = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`

  await dbConnect()
  await Video.create({
    title: data.title,
    youtubeId: youtubeId,
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
export async function getVideo(id: string) {
  await dbConnect();
  const video = await Video.findById(id).lean();
  if (!video) return null;
  return JSON.parse(JSON.stringify(video));
}

export async function updateVideo(id: string, formData: FormData) {
  const data = videoSchema.parse({
    title: formData.get("title"),
    youtubeLink: formData.get("youtubeLink"),
    description: formData.get("description"),
    category: formData.get("category"),
    isUpcoming: formData.get("isUpcoming") === "on",
    isPopular: formData.get("isPopular") === "on",
  })

  let youtubeId = extractYoutubeId(data.youtubeLink);
  if (!youtubeId) {
    throw new Error("Invalid YouTube URL");
  }

  // Auto-generate thumbnail from YouTube ID
  const thumbnail = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`

  await dbConnect()
  await Video.findByIdAndUpdate(id, {
    title: data.title,
    youtubeId: youtubeId,
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
