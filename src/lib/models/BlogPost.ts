import mongoose from 'mongoose';

const BlogPostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        excerpt: {
            type: String,
        },
        content: {
            type: String,
            required: true,
        },
        coverImage: {
            type: String,
        },
        author: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        publishedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.BlogPost || mongoose.model('BlogPost', BlogPostSchema);
