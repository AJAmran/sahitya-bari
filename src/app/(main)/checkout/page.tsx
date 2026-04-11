import { Metadata } from 'next';
import CheckoutForm from '@/features/checkout/components/CheckoutForm';

export const metadata: Metadata = {
  title: 'Secure Checkout | Sahitya Bari',
  description: 'Complete your acquisition.',
};

export default function CheckoutPage() {
  return (
    <div className="min-h-screen pt-36 pb-20 bg-[var(--background)]">
      {/* Background Decorative */}
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0">
        <div className="absolute top-[10%] -left-[10%] w-[40vw] h-[40vw] bg-[var(--primary)]/10 blur-[120px] rounded-full" />
      </div>

      <div className="site-container relative z-10">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-5xl font-black font-bengali text-[var(--foreground)] tracking-tight">
              Secure <span className="text-gradient">Checkout</span>
            </h1>
            <p className="text-sm font-bold uppercase tracking-widest text-[var(--foreground)]/50">
              Provide your details to complete the order
            </p>
          </div>

          <CheckoutForm />
        </div>
      </div>
    </div>
  );
}
