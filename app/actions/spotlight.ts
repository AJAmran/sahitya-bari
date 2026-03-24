"use server"

import dbConnect from "@/lib/mongodb"
import FeaturedSpotlight from "@/lib/models/FeaturedSpotlight"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const spotlightSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().optional(),
  description: z.string().min(1),
  image: z.string().optional(),
  buttonText: z.string().optional(),
  buttonLink: z.string().optional(),
  isActive: z.boolean().default(true),
})

export async function getActiveSpotlight() {
  await dbConnect()
  const spotlight = await FeaturedSpotlight.findOne({ isActive: true }).lean()
  return JSON.parse(JSON.stringify(spotlight))
}

export async function createSpotlight(data: z.infer<typeof spotlightSchema>) {
  const result = spotlightSchema.safeParse(data)
  if (!result.success) {
    throw new Error("Invalid data")
  }

  await dbConnect()

  // If this one is active, deactivate others
  if (result.data.isActive) {
    await FeaturedSpotlight.updateMany({ isActive: true }, { $set: { isActive: false } })
  }

  const spotlight = await FeaturedSpotlight.create(result.data)

  revalidatePath("/")
  revalidatePath("/admin/spotlight")
  return JSON.parse(JSON.stringify(spotlight))
}

export async function updateSpotlight(id: string, data: z.infer<typeof spotlightSchema>) {
  const result = spotlightSchema.safeParse(data)
  if (!result.success) {
    throw new Error("Invalid data")
  }

  await dbConnect()

  // If setting to active, deactivate others
  if (result.data.isActive) {
    await FeaturedSpotlight.updateMany(
      { isActive: true, _id: { $ne: id } },
      { $set: { isActive: false } }
    )
  }

  const spotlight = await FeaturedSpotlight.findByIdAndUpdate(
    id,
    { $set: result.data },
    { returnDocument: 'after' }
  ).lean()

  revalidatePath("/")
  revalidatePath("/admin/spotlight")
  return JSON.parse(JSON.stringify(spotlight))
}

export async function deleteSpotlight(id: string) {
  await dbConnect()
  await FeaturedSpotlight.findByIdAndDelete(id)
  revalidatePath("/")
  revalidatePath("/admin/spotlight")
}

export async function toggleSpotlightStatus(id: string, isActive: boolean) {
  await dbConnect()

  if (isActive) {
    await FeaturedSpotlight.updateMany({ isActive: true }, { $set: { isActive: false } })
  }

  await FeaturedSpotlight.findByIdAndUpdate(id, { $set: { isActive } })

  revalidatePath("/")
  revalidatePath("/admin/spotlight")
}
