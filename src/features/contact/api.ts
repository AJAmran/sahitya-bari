import dbConnect from "@/lib/mongodb";
import ContactMessage from "@/lib/models/ContactMessage";
// @ts-ignore - Next.js 16 feature
import { cacheLife } from "next/cache";
import { serialize } from "@/lib/serialize";

/**
 * Fetch contact messages with pagination and caching
 */
export async function getMessages({ page = 1, limit = 10 } = {}) {
  'use cache';
  cacheLife('hours');
  
  try {
    await dbConnect();
    const skip = (page - 1) * limit;
    const [messages, total] = await Promise.all([
      ContactMessage.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      ContactMessage.countDocuments()
    ]);
    return {
      messages: serialize(messages),
      total,
      totalPages: Math.ceil(total / limit)
    };
  } catch (error) {
    console.error("Failed to fetch contact messages:", error);
    return { messages: [], total: 0, totalPages: 0 };
  }
}
/**
 * Fetch contact messages for admin (fresh data, no cache)
 */
export async function getMessagesFresh({ page = 1, limit = 10 } = {}) {
  try {
    await dbConnect();
    const skip = (page - 1) * limit;
    const [messages, total] = await Promise.all([
      ContactMessage.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      ContactMessage.countDocuments()
    ]);
    return {
      messages: serialize(messages),
      total,
      totalPages: Math.ceil(total / limit)
    };
  } catch (error) {
    console.error("Failed to fetch fresh contact messages:", error);
    return { messages: [], total: 0, totalPages: 0 };
  }
}
