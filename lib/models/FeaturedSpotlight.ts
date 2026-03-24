import mongoose from 'mongoose';

const FeaturedSpotlightSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        subtitle: {
            type: String,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        buttonText: {
            type: String,
        },
        buttonLink: {
            type: String,
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

export default mongoose.models.FeaturedSpotlight || mongoose.model('FeaturedSpotlight', FeaturedSpotlightSchema);
