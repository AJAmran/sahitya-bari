import dbConnect from "@/lib/mongodb";
import Video from "@/lib/models/Video";
// @ts-ignore - Next.js 16 feature
import { cacheLife } from "next/cache";
import { serialize } from "@/lib/serialize";
import { connection } from "next/server";

/**
 * Fetch videos with filtering and pagination
 */
/**
 * Fetch videos for admin (fresh data, no cache)
 */
export async function getVideosFresh({ 
  page = 1, 
  limit = 10,
  category = "All",
  query = ""
} = {}) {
  await connection();
  try {
    await dbConnect();
    const skip = (page - 1) * limit;
    
    const filter: any = {};
    if (category !== "All") {
        filter.category = category;
    }
    if (query) {
        filter.title = { $regex: query, $options: 'i' };
    }

    const [videos, total] = await Promise.all([
        Video.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),
        Video.countDocuments(filter)
    ]);

    return {
        videos: serialize(videos),
        total,
        totalPages: Math.ceil(total / limit)
    };
  } catch (error) {
    console.error("Failed to fetch fresh videos:", error);
    return { videos: [], total: 0, totalPages: 0 };
  }
}

/**
 * Fetch videos with filtering and pagination (cached for public site)
 */
export async function getVideos({ 
    page = 1, 
    limit = 8, 
    category = "All", 
    query = "" 
} = {}) {
  'use cache';
  cacheLife('hours');
  
  try {
    await dbConnect();
    const skip = (page - 1) * limit;
    
    const filter: any = {};
    if (category !== "All") {
        filter.category = category;
    }
    if (query) {
        filter.title = { $regex: query, $options: 'i' };
    }

    const [videos, total] = await Promise.all([
        Video.find(filter)
            .sort({ publishedAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),
        Video.countDocuments(filter)
    ]);

    return {
        videos: serialize(videos),
        total,
        totalPages: Math.ceil(total / limit)
    };
  } catch (error) {
    console.error("Failed to fetch videos:", error);
    return { videos: [], total: 0, totalPages: 0 };
  }
}


/**
 * Fetch popular videos with caching
 */
export async function getPopularVideos() {
  'use cache';
  cacheLife('hours');
  try {
    await dbConnect();
    const videos = await Video.find({ isPopular: true })
      .sort({ publishedAt: -1 })
      .limit(4)
      .lean();

    return serialize(videos);
  } catch (error) {
    console.error("Failed to fetch popular videos:", error);
    return [];
  }
}

/**
 * Fetch upcoming videos with caching
 */
export async function getUpcomingVideos() {
  'use cache';
  cacheLife('hours');
  try {
    await dbConnect();
    const videos = await Video.find({ isUpcoming: true })
      .sort({ publishedAt: -1 })
      .limit(4)
      .lean();

    return serialize(videos);
  } catch (error) {
    console.error("Failed to fetch upcoming videos:", error);
    return [];
  }
}

/**
 * Fetch latest videos with caching
 */
export async function getLatestVideos(limit = 4) {
  'use cache';
  cacheLife('hours');
  try {
    await dbConnect();
    const videos = await Video.find()
      .sort({ publishedAt: -1 })
      .limit(limit)
      .lean();

    return serialize(videos);
  } catch (e) {
    console.error("Failed to fetch latest videos:", e);
    return [];
  }
}

/**
 * Helper to extract YouTube ID from URL
 */
export function extractYoutubeId(url: string | null | undefined) {
  if (!url) return undefined;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : undefined;
}

/**
 * Fetch a single video by slug, youtubeId, or ID
 */
export async function getVideo(slug: string) {
  'use cache';
  cacheLife('days');
  
  try {
    await dbConnect();
    const query: any = { $or: [{ slug }, { youtubeId: slug }] };
    
    // Check if slug is a valid MongoDB ID
    const isValidId = /^[0-9a-fA-F]{24}$/.test(slug);
    if (isValidId) {
      query.$or.push({ _id: slug });
    }

    const video = await Video.findOne(query).lean();
    return serialize(video);
  } catch (error) {
    console.error(`Failed to fetch video ${slug}:`, error);
    return null;
  }
}

/**
 * Fetch related videos excluding the current one
 */
export async function getRelatedVideos(currentId: string, limit = 4) {
  'use cache';
  cacheLife('hours');
  
  try {
    await dbConnect();
    const videos = await Video.find({
      _id: { $ne: currentId },
    })
      .sort({ publishedAt: -1 })
      .limit(limit)
      .lean();

    return serialize(videos);
  } catch (error) {
    console.error("Failed to fetch related videos:", error);
    return [];
  }
}
