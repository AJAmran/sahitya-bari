"use server"

import dbConnect from "@/lib/mongodb";
import NewsletterSubscription from "@/lib/models/NewsletterSubscription";
// @ts-ignore - Next.js 16 feature
import { cacheLife } from "next/cache";
import { serialize } from "@/lib/serialize";
import { connection } from "next/server";

/**
 * Fetch all subscribers with caching
 */
export async function getSubscribers() {
  'use cache';
  cacheLife('hours');
  
  try {
    await dbConnect()
    const subscribers = await NewsletterSubscription.find()
      .sort({ createdAt: -1 })
      .lean()
    return serialize(subscribers)
  } catch (error) {
    console.error("Failed to fetch subscribers:", error);
    return [];
  }
}
/**
 * Fetch all subscribers for admin (fresh data, no cache)
 */
export async function getSubscribersFresh() {
  await connection();
  try {
    await dbConnect()
    const subscribers = await NewsletterSubscription.find()
      .sort({ createdAt: -1 })
      .lean()
    return serialize(subscribers)
  } catch (error) {
    console.error("Failed to fetch fresh subscribers:", error);
    return [];
  }
}
