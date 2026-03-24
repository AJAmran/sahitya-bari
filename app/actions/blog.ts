"use server"

import dbConnect from "@/lib/mongodb"
import BlogPost from "@/lib/models/BlogPost"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const blogSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().optional(),
  content: z.string().min(1),
  coverImage: z.string().optional(),
  category: z.string().min(1),
  author: z.string().min(1),
})

export async function createBlogPost(data: z.infer<typeof blogSchema>) {
  const result = blogSchema.safeParse(data)
  if (!result.success) {
    throw new Error("Invalid data")
  }

  await dbConnect()
  const blog = await BlogPost.create({
    ...result.data,
    publishedAt: new Date(),
  })

  revalidatePath("/admin/blogs")
  revalidatePath("/blog")
  return JSON.parse(JSON.stringify(blog))
}

export async function updateBlogPost(id: string, data: z.infer<typeof blogSchema>) {
  const result = blogSchema.safeParse(data)
  if (!result.success) {
    throw new Error("Invalid data")
  }

  await dbConnect()
  const blog = await BlogPost.findByIdAndUpdate(
    id,
    { $set: result.data },
    { returnDocument: 'after' }
  ).lean()

  if (!blog) throw new Error("Blog not found")

  revalidatePath("/admin/blogs")
  revalidatePath("/blog")
  revalidatePath(`/blog/${blog.slug}`)
  return JSON.parse(JSON.stringify(blog))
}

export async function deleteBlogPost(id: string) {
  await dbConnect()
  await BlogPost.findByIdAndDelete(id)
  revalidatePath("/admin/blogs")
  revalidatePath("/blog")
}
