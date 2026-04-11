"use client";

import { useCart } from "@/components/providers/CartProvider";
import { X, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartDrawer() {
  const { isCartOpen, closeCart, items, updateQuantity, removeItem, getCartTotal } = useCart();
  const [isClient, setIsClient] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
  }, []);

  // Handle body scroll locking
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isCartOpen]);

  if (!isClient) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] z-[101] bg-[var(--background)] border-l border-[var(--glass-border)] shadow-2xl flex flex-col transition-transform duration-500 ease-[var(--ease-ios)] ${isCartOpen ? 'translate-x-0' : 'translate-x-[100%]'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--glass-border)]">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} className="text-[var(--primary)]" />
            <h2 className="text-xl font-black font-bengali tracking-tight">Your Cart</h2>
            <span className="w-5 h-5 rounded-full bg-[var(--surface-200)] flex items-center justify-center text-[0.6rem] font-bold">
              {items.length}
            </span>
          </div>
          <button 
            onClick={closeCart}
            className="w-8 h-8 rounded-full bg-[var(--surface-100)] flex items-center justify-center text-[var(--foreground)]/50 hover:text-[var(--foreground)] hover:bg-[var(--surface-200)] transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-50 space-y-4">
              <ShoppingBag size={48} className="text-[var(--primary)]/30" />
              <p className="text-sm font-bold uppercase tracking-widest">Your cart is empty</p>
              <button onClick={closeCart} className="text-[var(--primary)] text-xs font-bold underline">Continue Shopping</button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 rounded-2xl bg-[var(--surface-50)] border border-[var(--glass-border)]">
                <div className="relative w-20 h-24 rounded-xl overflow-hidden shrink-0 bg-[var(--surface-100)]">
                  {item.image ? (
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[var(--foreground)]/20">img</div>
                  )}
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="text-sm font-bold line-clamp-1">{item.name}</h4>
                      <p className="text-[0.65rem] text-[var(--foreground)]/50 font-medium uppercase mt-0.5">
                        {item.size && `Size: ${item.size} `}
                        {item.color && `| Color: ${item.color}`}
                      </p>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-[var(--foreground)]/30 hover:text-[var(--destructive)] transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center bg-[var(--surface-200)] rounded-lg p-1">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-[var(--foreground)]/60 hover:text-[var(--foreground)] hover:bg-[var(--surface-300)] rounded-md transition-colors"
                      >
                        <Minus size={10} />
                      </button>
                      <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-[var(--foreground)]/60 hover:text-[var(--foreground)] hover:bg-[var(--surface-300)] rounded-md transition-colors"
                      >
                        <Plus size={10} />
                      </button>
                    </div>
                    <div className="text-sm font-black tracking-tight">৳{item.price * item.quantity}</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-[var(--glass-border)] bg-[var(--surface-50)]">
            <div className="flex items-center justify-between font-black text-lg tracking-tight mb-6">
              <span>Subtotal</span>
              <span>৳{getCartTotal().toLocaleString()}</span>
            </div>
            <Link 
              href="/checkout"
              onClick={closeCart}
              className="w-full h-12 flex items-center justify-center gap-2 bg-[var(--foreground)] text-[var(--background)] font-black text-[0.7rem] uppercase tracking-widest rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              Secure Checkout
              <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
