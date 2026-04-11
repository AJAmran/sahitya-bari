"use client";

import { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { useCart } from "@/components/providers/CartProvider";
import { cn } from "@/lib/utils";

interface QuickAddToCartProps {
  product: any;
  className?: string;
}

export default function QuickAddToCart({ product, className }: QuickAddToCartProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation
    e.stopPropagation();

    addItem({
      productId: product._id || product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0],
      quantity: 1,
      size: product.sizes?.[0] || 'Default',
      color: product.colors?.[0] || 'Default',
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (product.stock === 0) return null;

  return (
    <button
      onClick={handleQuickAdd}
      className={cn(
        "absolute bottom-4 right-4 z-10 w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-xl border border-[var(--glass-border)] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0",
        added
          ? "bg-green-500 text-white border-green-500 shadow-green-500/20"
          : "bg-black/60 backdrop-blur-xl text-white hover:bg-[var(--primary)] hover:border-[var(--primary)] hover:scale-110 active:scale-95",
        className
      )}
      aria-label="Quick add to cart"
    >
      {added ? <Check size={16} className="animate-in zoom-in" /> : <ShoppingBag size={16} />}
    </button>
  );
}
