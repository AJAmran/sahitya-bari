import dbConnect from "@/lib/mongodb";
import BlogPost from "@/lib/models/BlogPost";
// @ts-ignore - Next.js 16 feature
import { cacheLife } from "next/cache";
import { serialize } from "@/lib/serialize";
import { connection } from "next/server";

/**
 * Fetch blog posts with filtering and pagination
 */
/**
 * Fetch blog posts for admin (fresh data, no cache)
 */
export async function getBlogsFresh({ 
  page = 1, 
  limit = 10,
  category = "All",
  query_str = ""
} = {}) {
  await connection();
  try {
    await dbConnect();
    const skip = (page - 1) * limit;

    const query: any = {};
    if (category && category !== 'All') {
      query.category = category;
    }
    if (query_str) {
      query.$or = [
        { title: { $regex: query_str, $options: 'i' } },
        { excerpt: { $regex: query_str, $options: 'i' } },
      ];
    }

    const [blogs, total] = await Promise.all([
        BlogPost.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),
        BlogPost.countDocuments(query)
    ]);

    return {
        blogs: serialize(blogs),
        total,
        totalPages: Math.ceil(total / limit)
    };
  } catch (error) {
    console.error("Fresh blog fetch error:", error);
    return { blogs: [], total: 0, totalPages: 0 };
  }
}

/**
 * Fetch blog posts with filtering and pagination (cached for public site)
 */
export async function getBlogs({ 
    page = 1, 
    limit = 6, 
    category = "All", 
    query_str = "" 
} = {}) {
  'use cache';
  cacheLife('hours');
  
  try {
    await dbConnect();
    const skip = (page - 1) * limit;

    const query: any = {};
    if (category && category !== 'All') {
      query.category = category;
    }
    if (query_str) {
      query.$or = [
        { title: { $regex: query_str, $options: 'i' } },
        { excerpt: { $regex: query_str, $options: 'i' } },
      ];
    }

    const [blogs, total] = await Promise.all([
        BlogPost.find(query)
            .sort({ publishedAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),
        BlogPost.countDocuments(query)
    ]);

    return {
        blogs: serialize(blogs),
        total,
        totalPages: Math.ceil(total / limit)
    };
  } catch (error) {
    console.error("Blog fetch error:", error);
    return { blogs: [], total: 0, totalPages: 0 };
  }
}

/**
 * Fetch a single blog post by slug with decoding support
 */
export async function getBlogPost(slug: string) {
  'use cache';
  cacheLife('days');
  
  try {
    const decodedSlug = decodeURIComponent(slug);
    await dbConnect();
    const blog = await BlogPost.findOne({
      $or: [{ slug: slug }, { slug: decodedSlug }]
    }).lean();
    
    return serialize(blog);
  } catch (error) {
    console.error(`Failed to fetch blog post ${slug}:`, error);
    return null;
  }
}

/**
 * Fetch related blog posts by category
 */
export async function getRelatedPosts(category: string, currentId: string) {
  'use cache';
  cacheLife('days');
  
  try {
    await dbConnect();
    const rawRelatedPosts = await BlogPost.find({
      category: category,
      _id: { $ne: currentId },
    })
      .sort({ publishedAt: -1 })
      .limit(3)
      .lean();

    return serialize(rawRelatedPosts);
  } catch (error) {
    console.error("Failed to fetch related posts:", error);
    return [];
  }
}
