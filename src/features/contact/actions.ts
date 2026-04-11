"use server"

import dbConnect from "@/lib/mongodb"
import ContactMessage from "@/lib/models/ContactMessage"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().optional(),
  message: z.string().min(5, "Message must be at least 5 characters"),
})

export async function submitContact(formData: FormData) {
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
    revalidatePath("/admin/messages")
    return { success: true, message: "Message sent successfully!" }
  } catch (error) {
    console.error("Contact submission error:", error)
    return { success: false, error: "Failed to send message." }
  }
}

export async function deleteMessage(id: string) {
    await dbConnect()
    await ContactMessage.findByIdAndDelete(id)
    revalidatePath("/admin/messages")
}

export async function toggleRead(id: string, currentRead: boolean) {
    await dbConnect()
    await ContactMessage.findByIdAndUpdate(id, { $set: { isRead: !currentRead } })
    revalidatePath("/admin/messages")
}
