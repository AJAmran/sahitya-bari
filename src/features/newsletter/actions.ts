"use server"

import dbConnect from "@/lib/mongodb"
import NewsletterSubscription from "@/lib/models/NewsletterSubscription"
import { revalidatePath } from "next/cache"
// @ts-ignore - Next.js 16 feature
import { cacheLife } from "next/cache"
import { z } from "zod"

const newsletterSchema = z.object({
    email: z.string().email("Invalid email address"),
})

export async function subscribeNewsletter(formData: FormData) {
    const email = formData.get("email") as string

    const result = newsletterSchema.safeParse({ email })

    if (!result.success) {
        return { success: false, error: result.error.issues[0].message }
    }

    try {
        await dbConnect()
        await NewsletterSubscription.findOneAndUpdate(
            { email: result.data.email },
            { $set: { isActive: true } },
            { upsert: true, returnDocument: 'after' }
        )

        revalidatePath("/")
        return { success: true, message: "Successfully subscribed to the newsletter!" }
    } catch (error) {
        console.error("Newsletter subscription error:", error)
        return { success: false, error: "An error occurred. Please try again later." }
    }
}

export async function deleteSubscriber(id: string) {
    await dbConnect()
    await NewsletterSubscription.findByIdAndDelete(id)
    revalidatePath("/admin/subscribers")
}

