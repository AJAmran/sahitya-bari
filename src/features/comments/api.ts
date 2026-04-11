import dbConnect from "@/lib/mongodb";
import Comment from "@/lib/models/Comment";
// @ts-ignore - Next.js 16 feature
import { cacheLife } from "next/cache";
import { auth } from "@/lib/auth-node";
import { serialize } from "@/lib/serialize";

/**
 * Fetch comments for a specific blog post
 */
export async function getComments(blogPostId: string) {
    'use cache';
    cacheLife('hours');

    try {
        await dbConnect();
        const comments = await Comment.find({ blogPostId })
            .sort({ createdAt: -1 })
            .lean();

        return serialize(comments);
    } catch (error) {
        console.error("Failed to fetch comments:", error);
        return [];
    }
}

/**
 * Fetch all comments for admin dashboard
 */
export async function getAllComments({ page = 1, limit = 10 } = {}) {
    try {
        const session = await auth();
        if (session?.user?.role !== 'ADMIN') {
            throw new Error("Unauthorized");
        }

        await dbConnect();
        const skip = (page - 1) * limit;
        
        const [comments, total] = await Promise.all([
            Comment.find()
                .populate("blogPostId", "title slug")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            Comment.countDocuments()
        ]);

        return {
            comments: serialize(comments),
            totalPages: Math.ceil(total / limit),
            total
        };
    } catch (error: any) {
        // Suppress logs for dynamic bailout during prerendering
        const isDynamicError = error?.digest?.includes('HANGING_PROMISE_REJECTION') || 
                              error?.message?.includes('headers()');
        if (!isDynamicError) {
            console.error("Failed to fetch all comments:", error);
        }
        return { comments: [], totalPages: 0, total: 0 };
    }
}
