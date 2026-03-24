import mongoose from 'mongoose';

const ReplySchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
        default: 'Admin'
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const CommentSchema = new mongoose.Schema(
    {
        blogPostId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'BlogPost',
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        replies: [ReplySchema],
        isApproved: {
            type: Boolean,
            default: true, // Auto-approve for now unless specified
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Comment || mongoose.model('Comment', CommentSchema);
