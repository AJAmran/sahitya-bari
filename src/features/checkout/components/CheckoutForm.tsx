"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCart } from "@/components/providers/CartProvider";
import { createOrder } from "../actions";
import { toast } from "sonner";
import { Loader2, ArrowRight, ShieldCheck, MapPin, CreditCard, ShoppingBag, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const checkoutSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Valid phone number is required"),
  address: z.string().min(10, "Full address is required"),
  city: z.string().min(2, "City is required"),
  postalCode: z.string().min(4, "Postal code is required"),
  notes: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutForm() {
  const { items, getCartTotal, clearCart } = useCart();
  const [isClient, setIsClient] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successOrder, setSuccessOrder] = useState<any>(null);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
  }, []);

  const shippingFee = items.length > 0 ? 60 : 0; // Hardcoded standard shipping
  const total = getCartTotal() + shippingFee;

  const onSubmit = async (data: CheckoutFormValues) => {
    if (items.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Processing order securely...");
    
    // Simulate slight delay for premium feel
    await new Promise(r => setTimeout(r, 800));

    try {
      const orderData = {
        items,
        subtotal: getCartTotal(),
        shippingFee,
        total,
        paymentMethod: 'cod', // Hardcoded to Cash on Delivery for now
        shippingDetails: data,
      };

      const result = await createOrder(orderData);

      if (result.success) {
        toast.success("Order placed successfully!", { id: toastId });
        setSuccessOrder(result.order);
        clearCart();
      } else {
        toast.error(result.error || "Order failed", { id: toastId });
      }
    } catch (error) {
      toast.error("Network error. Please try again.", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isClient) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-[var(--primary)]" /></div>;

  if (successOrder) {
    return (
      <div className="glass-card rounded-[2rem] p-12 text-center space-y-8 animate-in fade-in zoom-in duration-500 max-w-2xl mx-auto shadow-2xl">
        <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 size={48} className="text-green-500" />
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-4xl font-black font-bengali text-[var(--foreground)]">Order Confirmed</h2>
          <p className="text-[var(--foreground)]/60">
            Thank you for your acquisition. Your order <span className="font-mono text-[var(--primary)] font-bold">{successOrder.orderNumber}</span> is being processed.
          </p>
        </div>
        <div className="pt-8">
          <Link href="/shop" className="inline-flex items-center gap-3 px-8 h-14 bg-[var(--foreground)] text-[var(--background)] rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform">
            <ShoppingBag size={16} />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="glass-card rounded-[2rem] p-16 text-center space-y-6">
        <ShoppingBag size={48} className="mx-auto text-[var(--foreground)]/20" />
        <h2 className="text-xl font-black">Your cart is empty</h2>
        <Link href="/shop" className="inline-block text-[var(--primary)] underline font-bold uppercase text-xs tracking-widest">
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
      {/* Checkout Form */}
      <div className="lg:col-span-7">
        <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          
          <div className="glass-card rounded-[2rem] p-6 sm:p-10 space-y-8">
            <div className="flex items-center gap-3 text-[var(--primary)] border-b border-[var(--glass-border)] pb-4">
              <MapPin size={20} />
              <h3 className="text-sm font-black uppercase tracking-widest">Shipping Details</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--foreground)]/50">Full Name</label>
                <input {...register("fullName")} className="w-full h-12 bg-[var(--surface-200)]/50 border border-[var(--glass-border)] rounded-xl px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 transition-all font-medium" placeholder="John Doe" />
                {errors.fullName && <p className="text-red-500 text-[10px] uppercase font-bold">{errors.fullName.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--foreground)]/50">Phone Number</label>
                <input {...register("phone")} className="w-full h-12 bg-[var(--surface-200)]/50 border border-[var(--glass-border)] rounded-xl px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 transition-all font-medium" placeholder="+880 1XXXXXXXXX" />
                {errors.phone && <p className="text-red-500 text-[10px] uppercase font-bold">{errors.phone.message}</p>}
              </div>
              <div className="sm:col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--foreground)]/50">Email Address</label>
                <input {...register("email")} type="email" className="w-full h-12 bg-[var(--surface-200)]/50 border border-[var(--glass-border)] rounded-xl px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 transition-all font-medium" placeholder="john@example.com" />
                {errors.email && <p className="text-red-500 text-[10px] uppercase font-bold">{errors.email.message}</p>}
              </div>
              <div className="sm:col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--foreground)]/50">Street Address</label>
                <input {...register("address")} className="w-full h-12 bg-[var(--surface-200)]/50 border border-[var(--glass-border)] rounded-xl px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 transition-all font-medium" placeholder="House 12, Road 4, Block C" />
                {errors.address && <p className="text-red-500 text-[10px] uppercase font-bold">{errors.address.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--foreground)]/50">City/District</label>
                <input {...register("city")} className="w-full h-12 bg-[var(--surface-200)]/50 border border-[var(--glass-border)] rounded-xl px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 transition-all font-medium" placeholder="Dhaka" />
                {errors.city && <p className="text-red-500 text-[10px] uppercase font-bold">{errors.city.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--foreground)]/50">Postal Code</label>
                <input {...register("postalCode")} className="w-full h-12 bg-[var(--surface-200)]/50 border border-[var(--glass-border)] rounded-xl px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 transition-all font-medium" placeholder="1212" />
                {errors.postalCode && <p className="text-red-500 text-[10px] uppercase font-bold">{errors.postalCode.message}</p>}
              </div>
              <div className="sm:col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--foreground)]/50">Order Notes (Optional)</label>
                <textarea {...register("notes")} className="w-full h-24 bg-[var(--surface-200)]/50 border border-[var(--glass-border)] rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 transition-all font-medium resize-none" placeholder="Any special instructions for delivery..." />
              </div>
            </div>
          </div>
          
          <div className="glass-card rounded-[2rem] p-6 sm:p-10 space-y-6">
            <div className="flex items-center justify-between border-b border-[var(--glass-border)] pb-4">
              <div className="flex items-center gap-3 text-[var(--primary)]">
                <CreditCard size={20} />
                <h3 className="text-sm font-black uppercase tracking-widest">Payment Method</h3>
              </div>
              <ShieldCheck size={20} className="text-[var(--success)] opacity-50" />
            </div>
            
            <div className="relative overflow-hidden rounded-xl border-2 border-[var(--primary)] bg-[var(--primary)]/5 p-5 cursor-pointer flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border-[5px] border-[var(--primary)] bg-transparent" />
                  <span className="font-bold">Cash on Delivery (COD)</span>
                </div>
                <span className="text-[10px] font-black uppercase text-[var(--primary)] bg-[var(--primary)]/10 px-2 py-1 rounded">Selected</span>
            </div>
            <div className="relative overflow-hidden rounded-xl border border-[var(--glass-border)] bg-[var(--surface-100)]/50 p-5 cursor-not-allowed flex items-center justify-between opacity-60">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-[var(--foreground)]/20 bg-transparent" />
                  <span className="font-bold">Credit/Debit Card (Stripe)</span>
                </div>
                <span className="text-[10px] font-black uppercase text-[var(--foreground)]/40 px-2 py-1 bg-[var(--surface-300)] rounded">Coming Soon</span>
            </div>
          </div>
        </form>
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-5">
        <div className="glass-card rounded-[2rem] p-6 sm:p-8 lg:sticky lg:top-32 shadow-[var(--shadow-pro)]">
          <div className="flex items-center gap-3 mb-8 border-b border-[var(--glass-border)] pb-4">
             <ShoppingBag size={20} className="text-[var(--foreground)]/50" />
             <h3 className="text-sm font-black uppercase tracking-widest">Order Summary</h3>
          </div>

          <div className="space-y-5 mb-8 max-h-[40vh] overflow-y-auto pr-2 scrollbar-thin">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 group">
                <div className="relative w-16 h-20 rounded-xl overflow-hidden bg-[var(--surface-200)] shrink-0 border border-[var(--glass-border)]">
                  {item.image && <Image src={item.image} alt={item.name} fill className="object-cover" />}
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <h4 className="text-sm font-bold line-clamp-1">{item.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-medium text-[var(--foreground)]/60">Qty: {item.quantity}</span>
                    {(item.size || item.color) && (
                      <span className="text-[10px] font-medium text-[var(--foreground)]/60 uppercase">
                        • {item.size} {item.color}
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-black font-mono tracking-tight text-[var(--primary)] mt-1">
                    ৳{item.price * item.quantity}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 pt-6 border-t border-[var(--glass-border)] font-medium">
            <div className="flex justify-between text-sm text-[var(--foreground)]/70">
              <span>Subtotal</span>
              <span>৳{getCartTotal().toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm text-[var(--foreground)]/70">
              <span>Standard Shipping</span>
              <span>৳{shippingFee}</span>
            </div>
            <div className="flex justify-between text-xl font-black font-mono pt-4 border-t border-[var(--glass-border)] tracking-tight">
              <span>Total</span>
              <span className="text-[var(--primary)]">৳{total.toLocaleString()}</span>
            </div>
          </div>

          <button
            type="submit"
            form="checkout-form"
            disabled={isSubmitting}
            className="w-full h-14 mt-8 rounded-2xl bg-[var(--foreground)] text-[var(--background)] font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <ShieldCheck size={18} />}
            {isSubmitting ? "Processing..." : "Place Secure Order"}
          </button>
        </div>
      </div>
    </div>
  );
}
