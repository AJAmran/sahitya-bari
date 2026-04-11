import dbConnect from '@/lib/mongodb';
import Product from '@/lib/models/Product';
// @ts-ignore - Next.js 16 feature
import { cacheLife } from 'next/cache';
import { serialize } from '@/lib/serialize';

/**
 * Fetch a single product by slug
 */
export async function getProduct(slug: string) {
  'use cache';
  cacheLife('hours');
  
  try {
    await dbConnect();
    const product = await Product.findOne({ slug, isActive: true }).lean();
    return serialize(product);
  } catch (error) {
    console.error(`Error getting product ${slug}:`, error);
    return null;
  }
}

/**
 * Fetch related products excluding current one
 */
export async function getRelatedProducts(category: string, currentId: string, limit = 4) {
  'use cache';
  cacheLife('hours');
  
  try {
    await dbConnect();
    const products = await Product.find({ 
      category, 
      _id: { $ne: currentId },
      isActive: true 
    }).limit(limit).lean();

    return serialize(products);
  } catch (error) {
    console.error('Error getting related products:', error);
    return [];
  }
}

/**
 * Fetch active products with caching
 */
export async function getActiveProducts() {
  'use cache';
  cacheLife('hours');
  
  try {
    await dbConnect();
    const products = await Product.find({ isActive: true }).sort({ createdAt: -1 }).lean();
    return serialize(products);
  } catch (error) {
    console.error('Error getting active products:', error);
    return [];
  }
}

/**
 * Fetch products with pagination and optional filtering
 */
export async function getProducts({ 
  page = 1, 
  limit = 9, 
  query = {} 
}: { page?: number; limit?: number; query?: Record<string, unknown> } = {}) {
  'use cache';
  cacheLife('hours');
  
  try {
    await dbConnect();
    const skip = (page - 1) * limit;
    const [products, total] = await Promise.all([
      Product.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Product.countDocuments(query)
    ]);
    return {
      products: serialize(products),
      total,
      totalPages: Math.ceil(total / limit)
    };
  } catch (error) {
    console.error('Error getting products:', error);
    return { products: [], total: 0, totalPages: 0 };
  }
}

/**
 * Fetch products for admin (fresh data, no cache)
 */
export async function getProductsFresh({ 
  page = 1, 
  limit = 10,
  query = {}
}: { page?: number; limit?: number; query?: Record<string, unknown> } = {}) {
  try {
    await dbConnect();
    const skip = (page - 1) * limit;
    const [products, total] = await Promise.all([
      Product.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Product.countDocuments(query)
    ]);
    return {
      products: serialize(products),
      total,
      totalPages: Math.ceil(total / limit)
    };
  } catch (error) {
    console.error('Error getting fresh products:', error);
    return { products: [], total: 0, totalPages: 0 };
  }
}
