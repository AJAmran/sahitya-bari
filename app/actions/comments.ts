"use server"

import dbConnect from "@/lib/mongodb"
import Comment from "@/lib/models/Comment"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { auth } from "@/lib/auth-node"

const commentSchema = z.object({
    blogPostId: z.string().min(1),
    author: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    content: z.string().min(1, "Comment content is required"),
})

const replySchema = z.object({
    commentId: z.string().min(1),
    content: z.string().min(1, "Reply content is required"),
})

export async function submitComment(data: z.infer<typeof commentSchema>) {
    const result = commentSchema.safeParse(data);
    if (!result.success) {
        throw new Error("Invalid data");
    }

    await dbConnect();
    const comment = await Comment.create(result.data);

    revalidatePath("/blog/[slug]", "page");
    return JSON.parse(JSON.stringify(comment));
}

export async function submitReply(data: z.infer<typeof replySchema>) {
    const session = await auth();
    if (session?.user?.role !== 'ADMIN') {
        throw new Error("Unauthorized: Only admins can reply.");
    }

    const result = replySchema.safeParse(data);
    if (!result.success) {
        throw new Error("Invalid data");
    }

    await dbConnect();
    const comment = await Comment.findByIdAndUpdate(
        result.data.commentId,
        {
            $push: {
                replies: {
                    author: "Admin", // Force author to Admin for server-side security
                    content: result.data.content,
                    createdAt: new Date()
                }
            }
        },
        { new: true }
    );

    if (!comment) throw new Error("Comment not found");

    revalidatePath("/blog/[slug]", "page");
    return JSON.parse(JSON.stringify(comment));
}

export async function getComments(blogPostId: string) {
    await dbConnect();
    const comments = await Comment.find({ blogPostId })
        .sort({ createdAt: -1 })
        .lean();

    return JSON.parse(JSON.stringify(comments));
}

export async function getAllComments() {
    const session = await auth();
    if (session?.user?.role !== 'ADMIN') {
        throw new Error("Unauthorized");
    }

    await dbConnect();
    const comments = await Comment.find()
        .populate("blogPostId", "title slug")
        .sort({ createdAt: -1 })
        .lean();

    return JSON.parse(JSON.stringify(comments));
}

export async function deleteComment(id: string) {
    const session = await auth();
    if (session?.user?.role !== 'ADMIN') {
        throw new Error("Unauthorized");
    }

    await dbConnect();
    await Comment.findByIdAndDelete(id);
    revalidatePath("/blog/[slug]", "page");
    revalidatePath("/admin/comments");
}

export async function toggleCommentApproval(id: string) {
    const session = await auth();
    if (session?.user?.role !== 'ADMIN') {
        throw new Error("Unauthorized");
    }

    await dbConnect();
    const comment = await Comment.findById(id);
    if (!comment) throw new Error("Comment not found");

    comment.isApproved = !comment.isApproved;
    await comment.save();

    revalidatePath("/blog/[slug]", "page");
    revalidatePath("/admin/comments");
}
