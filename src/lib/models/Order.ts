import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  image: { type: String },
  size: { type: String },
  color: { type: String }
}, { _id: false });

const OrderSchema = new mongoose.Schema({
  orderNumber: { type: String, unique: true },
  items: [OrderItemSchema],
  subtotal: { type: Number, required: true },
  shippingFee: { type: Number, required: true },
  total: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['cod', 'online'],
    default: 'cod'
  },
  shippingDetails: {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    notes: { type: String }
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

OrderSchema.pre('save', function() {
  if (!this.orderNumber) {
    // Generate a simple unique order number (e.g., SB-2026-XXXX)
    const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
    this.orderNumber = `SB-${new Date().getFullYear()}-${randomStr}`;
  }
  (this as any).updatedAt = new Date();
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
