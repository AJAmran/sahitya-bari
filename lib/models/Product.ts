import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
    trim: true,
  },
  slug: {
    type: String,
    required: [true, 'Please provide a slug'],
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a product description'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a product price'],
  },
  images: {
    type: [String],
    default: [],
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: ['Clothing', 'Books', 'Accessories', 'Merchandise'],
    default: 'Clothing'
  },
  stock: {
    type: Number,
    default: 0,
  },
  sizes: {
    type: [String],
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'ONE SIZE'],
    default: []
  },
  colors: {
    type: [String],
    default: []
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

// Update the updatedAt before saving
ProductSchema.pre('save', function() {
  (this as any).updatedAt = new Date();
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
