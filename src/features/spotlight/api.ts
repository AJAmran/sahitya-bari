import dbConnect from "@/lib/mongodb";
import FeaturedSpotlight from "@/lib/models/FeaturedSpotlight";
// @ts-ignore - Next.js 16 feature
import { cacheLife } from "next/cache";
import { serialize } from "@/lib/serialize";

/**
 * Fetch the active spotlight with caching
 */
export async function getActiveSpotlight() {
  'use cache';
  cacheLife('hours');
  
  try {
    await dbConnect()
    const spotlight = await FeaturedSpotlight.findOne({ isActive: true }).lean()
    return serialize(spotlight)
  } catch (error) {
    console.error("Failed to fetch active spotlight:", error);
    return null;
  }
}

/**
 * Fetch all spotlights for admin with caching
 */
export async function getAllSpotlights({ page = 1, limit = 10 } = {}) {
  'use cache';
  cacheLife('hours');
  
  try {
    await dbConnect()
    const skip = (page - 1) * limit;
    
    const [spotlights, total] = await Promise.all([
      FeaturedSpotlight.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      FeaturedSpotlight.countDocuments()
    ]);
    
    return {
      spotlights: serialize(spotlights),
      totalPages: Math.ceil(total / limit),
      total
    };
  } catch (error) {
    console.error("Failed to fetch all spotlights:", error);
    return { spotlights: [], totalPages: 0, total: 0 };
  }
}
/**
 * Fetch all spotlights for admin (fresh data, no cache)
 */
export async function getAllSpotlightsFresh({ page = 1, limit = 10 } = {}) {
  try {
    await dbConnect()
    const skip = (page - 1) * limit;
    
    const [spotlights, total] = await Promise.all([
      FeaturedSpotlight.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      FeaturedSpotlight.countDocuments()
    ]);
    
    return {
      spotlights: serialize(spotlights),
      totalPages: Math.ceil(total / limit),
      total
    };
  } catch (error) {
    console.error("Failed to fetch fresh spotlights:", error);
    return { spotlights: [], totalPages: 0, total: 0 };
  }
}
