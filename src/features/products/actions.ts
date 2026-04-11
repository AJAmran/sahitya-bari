'use server'

import dbConnect from '@/lib/mongodb';
import Product from '@/lib/models/Product';
import { revalidatePath } from 'next/cache';

export async function createProduct(data: any) {
  try {
    await dbConnect();
    const product = await Product.create(data);
    revalidatePath('/admin/products');
    revalidatePath('/shop');
    return { success: true, product: JSON.parse(JSON.stringify(product)) };
  } catch (error: any) {
    console.error('Error creating product:', error);
    return { success: false, error: error.message };
  }
}

export async function updateProduct(id: string, data: any) {
  try {
    await dbConnect();
    const product = await Product.findByIdAndUpdate(id, data, { new: true });
    revalidatePath('/admin/products');
    revalidatePath(`/admin/products/${id}/edit`);
    revalidatePath('/shop');
    return { success: true, product: JSON.parse(JSON.stringify(product)) };
  } catch (error: any) {
    console.error('Error updating product:', error);
    return { success: false, error: error.message };
  }
}

export async function deleteProduct(id: string) {
  try {
    await dbConnect();
    await Product.findByIdAndDelete(id);
    revalidatePath('/admin/products');
    revalidatePath('/shop');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting product:', error);
    return { success: false, error: error.message };
  }
}

