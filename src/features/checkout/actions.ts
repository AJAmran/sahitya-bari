'use server';

import dbConnect from '@/lib/mongodb';
import Order from '@/lib/models/Order';
import { revalidatePath } from 'next/cache';

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
