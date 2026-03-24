"use server"

import dbConnect from "@/lib/mongodb"
import ContactMessage from "@/lib/models/ContactMessage"
import { z } from "zod"

const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    subject: z.string().optional(),
    message: z.string().min(10, "Message must be at least 10 characters"),
})

export async function sendContactMessage(formData: FormData) {
    const data = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        subject: formData.get("subject") as string,
        message: formData.get("message") as string,
    }

    const result = contactSchema.safeParse(data)

    if (!result.success) {
        return { success: false, error: result.error.issues[0].message }
    }

    try {
        await dbConnect()
        await ContactMessage.create(result.data)

        return { success: true, message: "Your message has been sent successfully!" }
    } catch (error) {
        console.error("Contact message error:", error)
        return { success: false, error: "An error occurred. Please try again later." }
    }
}
