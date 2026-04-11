"use server"

import dbConnect from "@/lib/mongodb"
import SiteSettings from "@/lib/models/SiteSettings"
// @ts-ignore - Next.js 16 feature
import { cacheLife } from "next/cache"
import { serialize } from "@/lib/serialize"
import { connection } from "next/server"

export interface SiteSettingsMap {
  siteTitle: string
  heroTitle: string
  heroSubtitle: string
  youtubeUrl: string
  facebookUrl: string
  [key: string]: string
}

const DEFAULT_SETTINGS: SiteSettingsMap = {
  siteTitle: "Sahitya Bari | সাহিত্য বাড়ি",
  heroTitle: "সাহিত্যের অঙিনায় আপনাকে স্বাগতম",
  heroSubtitle: "Exploring the depths of Bengali literature, poetry, and storytelling. Join our community of literature lovers.",
  youtubeUrl: "",
  facebookUrl: "",
}

import ContactMessage from "@/lib/models/ContactMessage"
import NewsletterSubscription from "@/lib/models/NewsletterSubscription"
import Comment from "@/lib/models/Comment"
import VideoModel from "@/lib/models/Video"
import BlogPost from "@/lib/models/BlogPost"
import FeaturedSpotlight from "@/lib/models/FeaturedSpotlight"

/**
 * Fetch site settings with caching
 */
export async function getSiteSettings(): Promise<SiteSettingsMap> {
  'use cache';
  cacheLife('days');
  
  try {
    await dbConnect()
    const settings = await SiteSettings.find().lean()
    const settingsMap: SiteSettingsMap = { ...DEFAULT_SETTINGS }
    settings.forEach((s: any) => {
      settingsMap[s.key] = s.value
    })
    return settingsMap
  } catch (error) {
    console.error("Failed to fetch site settings, using defaults:", error)
    return DEFAULT_SETTINGS
  }
}

/**
 * Fetch dashboard data with caching
 */
export async function getDashboardData() {
    'use cache';
    cacheLife('hours');
    
    try {
        await dbConnect();
        
        const [
            videoCount,
            blogCount,
            spotlightCount,
            messageCount,
            unreadMessageCount,
            subscriberCount,
            commentCount,
            recentVideos,
            recentBlogs,
            recentComments
        ] = await Promise.all([
            VideoModel.countDocuments(),
            BlogPost.countDocuments(),
            FeaturedSpotlight.countDocuments(),
            ContactMessage.countDocuments(),
            ContactMessage.countDocuments({ isRead: false }),
            NewsletterSubscription.countDocuments({ isActive: true }),
            Comment.countDocuments(),
            VideoModel.find().sort({ publishedAt: -1 }).limit(2).lean(),
            BlogPost.find().sort({ publishedAt: -1 }).limit(2).lean(),
            Comment.find().sort({ createdAt: -1 }).limit(2).lean(),
        ]);

        return {
            videoCount,
            blogCount,
            spotlightCount,
            messageCount,
            unreadMessageCount,
            subscriberCount,
            commentCount,
            recentVideos: serialize(recentVideos),
            recentBlogs: serialize(recentBlogs),
            recentComments: serialize(recentComments)
        };
    } catch (error) {
        console.error("Dashboard data fetch error:", error);
        return {
            videoCount: 0,
            blogCount: 0,
            spotlightCount: 0,
            messageCount: 0,
            unreadMessageCount: 0,
            subscriberCount: 0,
            commentCount: 0,
            recentVideos: [],
            recentBlogs: [],
            recentComments: []
        };
    }
}

/**
 * Fetch dashboard data for admin (fresh data, no cache)
 */
export async function getDashboardDataFresh() {
    await connection();
    try {
        await dbConnect();
        
        const [
            videoCount,
            blogCount,
            spotlightCount,
            messageCount,
            unreadMessageCount,
            subscriberCount,
            commentCount,
            recentVideos,
            recentBlogs,
            recentComments
        ] = await Promise.all([
            VideoModel.countDocuments(),
            BlogPost.countDocuments(),
            FeaturedSpotlight.countDocuments(),
            ContactMessage.countDocuments(),
            ContactMessage.countDocuments({ isRead: false }),
            NewsletterSubscription.countDocuments({ isActive: true }),
            Comment.countDocuments(),
            VideoModel.find().sort({ publishedAt: -1 }).limit(2).lean(),
            BlogPost.find().sort({ publishedAt: -1 }).limit(2).lean(),
            Comment.find().sort({ createdAt: -1 }).limit(2).lean(),
        ]);

        return {
            videoCount,
            blogCount,
            spotlightCount,
            messageCount,
            unreadMessageCount,
            subscriberCount,
            commentCount,
            recentVideos: serialize(recentVideos),
            recentBlogs: serialize(recentBlogs),
            recentComments: serialize(recentComments)
        };
    } catch (error) {
        console.error("Dashboard data fetch error:", error);
        return {
            videoCount: 0,
            blogCount: 0,
            spotlightCount: 0,
            messageCount: 0,
            unreadMessageCount: 0,
            subscriberCount: 0,
            commentCount: 0,
            recentVideos: [],
            recentBlogs: [],
            recentComments: []
        };
    }
}
