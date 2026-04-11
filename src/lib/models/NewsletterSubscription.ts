import mongoose from 'mongoose';

const NewsletterSubscriptionSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.NewsletterSubscription || mongoose.model('NewsletterSubscription', NewsletterSubscriptionSchema);
