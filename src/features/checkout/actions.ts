'use server';

import dbConnect from '@/lib/mongodb';
import Order from '@/lib/models/Order';
import { revalidatePath } from 'next/cache';
import { connection } from 'next/server';

// Fetch all orders for admin
export async function getAdminOrders() {
  await connection();
  try {
    await dbConnect();
    // Sort logic usually is latest first
    const orders = await Order.find().sort({ createdAt: -1 }).lean();
    return { success: true, orders: JSON.parse(JSON.stringify(orders)) };
  } catch (error: any) {
    console.error("Failed to get orders:", error);
    return { success: false, error: error.message || "Failed to fetch orders" };
  }
}

// Update order status
export async function updateOrderStatus(orderId: string, status: string) {
  try {
    await dbConnect();
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { $set: { status, updatedAt: new Date() } },
      { new: true }
    );
    
    if (!updatedOrder) {
      return { success: false, error: "Order not found" };
    }
    
    revalidatePath('/admin/orders');
    return { success: true, order: JSON.parse(JSON.stringify(updatedOrder)) };
  } catch (error: any) {
    console.error("Failed to update order status:", error);
    return { success: false, error: error.message || "Failed to update order" };
  }
}

export async function createOrder(orderData: any) {
  try {
    await dbConnect();
    
    // In a real production app, we would verify product prices against the DB here
    // to prevent tampering before creating the order.

    const newOrder = new Order({
      items: orderData.items,
      subtotal: orderData.subtotal,
      shippingFee: orderData.shippingFee,
      total: orderData.total,
      paymentMethod: orderData.paymentMethod,
      shippingDetails: orderData.shippingDetails,
      status: 'pending',
      paymentStatus: 'pending'
    });

    const savedOrder = await newOrder.save();
    
    // Convert to plain object to pass to client
    const plainOrder = JSON.parse(JSON.stringify(savedOrder));
    
    revalidatePath('/admin/orders');
    
    return { success: true, order: plainOrder };
  } catch (error: any) {
    console.error("Order creation failed:", error);
    return { success: false, error: error.message || "Failed to process order" };
  }
}
