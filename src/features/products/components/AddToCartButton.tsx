"use client";

import { useState } from "react";
import { useCart } from "@/components/providers/CartProvider";
import { ShoppingBag, Loader2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
  product: any;
  selectedSize?: string;
  selectedColor?: string;
  className?: string;
}

export default function AddToCartButton({ product, selectedSize, selectedColor, className }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    // Basic validation
    if (product.sizes?.length > 0 && !selectedSize) {
      alert("Please select a size first");
      return;
    }
    
    setIsAdding(true);
    
    // Simulate slight network delay for premium feel
    setTimeout(() => {
      addItem({
        productId: product._id || product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0],
        quantity: 1,
        size: selectedSize,
        color: selectedColor,
      });
      
      setIsAdding(false);
      setAdded(true);
      
      setTimeout(() => setAdded(false), 2000);
    }, 400);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding || product.stock === 0}
      className={cn(
        "relative h-14 w-full rounded-2xl flex items-center justify-center gap-3 font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 overflow-hidden shadow-[var(--shadow-pro)]",
        product.stock === 0
          ? "bg-[var(--surface-200)] text-[var(--foreground)]/40 cursor-not-allowed"
          : added 
            ? "bg-green-600 text-white shadow-green-600/20"
            : "bg-[var(--foreground)] text-[var(--background)] hover:scale-[1.02] active:scale-[0.98]",
        className
      )}
    >
      {isAdding ? (
        <Loader2 size={16} className="animate-spin" />
      ) : added ? (
        <>
          <Check size={16} className="animate-in zoom-in" />
          <span>Added To Cart</span>
        </>
      ) : product.stock === 0 ? (
        <span>Out of Stock</span>
      ) : (
        <>
          <ShoppingBag size={16} />
          <span>Acquire Now</span>
        </>
      )}
    </button>
  );
}
