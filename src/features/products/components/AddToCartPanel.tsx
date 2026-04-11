"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingBag, Share2, Check } from "lucide-react";
import { useCart } from "@/components/providers/CartProvider";
import { cn } from "@/lib/utils";

interface AddToCartPanelProps {
  product: any;
}

export default function AddToCartPanel({ product }: AddToCartPanelProps) {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0] || "");
  const [selectedColor, setSelectedColor] = useState<string>(product.colors?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      productId: product._id || product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0],
      quantity,
      size: selectedSize,
      color: selectedColor,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-10 py-10 border-y border-[var(--glass-border)]">
      {/* Size Selection */}
      {product.sizes?.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--foreground)]/40">Select Dimension</label>
            <button className="text-[10px] font-black text-[var(--primary)] uppercase tracking-widest border-b border-[var(--primary)]/20 hover:border-[var(--primary)] transition-all">Size Blueprint</button>
          </div>
          <div className="flex flex-wrap gap-3">
            {product.sizes.map((size: string) => (
              <button 
                key={size}
                onClick={() => setSelectedSize(size)}
                className={cn(
                  "min-w-[56px] h-[56px] rounded-2xl border flex items-center justify-center text-xs font-black transition-all active:scale-90",
                  selectedSize === size
                    ? "border-[var(--primary)] text-[var(--primary)] bg-[var(--primary)]/10 shadow-[var(--shadow-sm)]"
                    : "border-[var(--glass-border)] hover:border-[var(--primary)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/5"
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Color Spectrum */}
      {product.colors?.length > 0 && (
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--foreground)]/40">Color Spectrum</label>
          <div className="flex flex-wrap gap-4">
            {product.colors.map((color: string) => (
              <button 
                key={color}
                onClick={() => setSelectedColor(color)}
                className={cn(
                  "group relative w-10 h-10 rounded-full border-2 transition-all hover:scale-110 active:scale-90",
                  selectedColor === color ? "border-[var(--primary)] scale-110 shadow-[var(--shadow-sm)]" : "border-white shadow-xl"
                )}
                style={{ backgroundColor: color.toLowerCase() === 'white' ? '#fff' : color.toLowerCase() === 'black' ? '#000' : color.toLowerCase() }}
              >
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-[var(--foreground)]">
                  {color}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity Controller */}
      <div className="space-y-4 pt-4">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--foreground)]/40">Quantity Selection</label>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1 p-1 bg-[var(--surface-200)]/50 rounded-2xl border border-[var(--glass-border)]">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 rounded-xl hover:bg-white/50 transition-all flex items-center justify-center text-[var(--foreground)]/40 hover:text-[var(--primary)]"
            >
              <Minus size={16} />
            </button>
            <span className="w-12 text-center text-base font-black">{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 rounded-xl hover:bg-white/50 transition-all flex items-center justify-center text-[var(--foreground)]/40 hover:text-[var(--primary)]"
            >
              <Plus size={16} />
            </button>
          </div>
          <p className="text-[10px] font-bold text-[var(--foreground)]/40 uppercase tracking-widest">
            {product.stock > 0 ? "In stock & ready to ship" : "Temporarily out of stock"}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-6">
        <button 
          disabled={product.stock === 0}
          onClick={handleAddToCart}
          className={cn(
            "md:col-span-9 h-[72px] rounded-[1.25rem] flex items-center justify-center gap-4 font-black text-sm uppercase tracking-[.3em] transition-all",
            product.stock === 0
              ? "bg-[var(--surface-200)] text-[var(--foreground)]/40 cursor-not-allowed"
              : added
                ? "bg-green-600 text-white shadow-2xl shadow-green-600/30"
                : "bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white shadow-2xl shadow-[var(--primary)]/30 hover:scale-[1.02] active:scale-[0.98]"
          )}
        >
          {added ? (
            <>
              <Check size={20} className="animate-in zoom-in" />
              <span>Acquired</span>
            </>
          ) : (
            <>
              <ShoppingBag size={20} />
              <span>Begin Acquisition</span>
            </>
          )}
        </button>
        <button className="md:col-span-3 h-[72px] rounded-[1.25rem] bg-[var(--surface-100)] border border-[var(--glass-border)] flex items-center justify-center text-[var(--foreground)]/40 hover:text-[var(--primary)] hover:border-[var(--primary)]/30 hover:bg-[var(--surface-200)] transition-all">
          <Share2 size={24} />
        </button>
      </div>
    </div>
  );
}
