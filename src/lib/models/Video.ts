import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema(
    {
        youtubeId: {
            type: String,
            required: false,
            unique: true,
            sparse: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        thumbnail: {
            type: String,
        },
        views: {
            type: String,
        },
        duration: {
            type: String,
        },
        publishedAt: {
            type: Date,
            required: true,
        },
        category: {
            type: String,
        },
        isUpcoming: {
            type: Boolean,
            default: false,
        },
        isPopular: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Video || mongoose.model('Video', VideoSchema);
