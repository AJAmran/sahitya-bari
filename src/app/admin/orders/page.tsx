import { getAdminOrders } from "@/features/checkout/actions";
import OrdersTable from "@/features/admin/components/OrdersTable";
import { PackageCheck } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Order Management | Sahitya Bari",
};

export default async function AdminOrdersPage() {
  const result = await getAdminOrders();
  const initialOrders = result.success ? result.orders : [];

  return (
    <div className="p-6 md:p-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center text-white shadow-lg shadow-[var(--primary)]/30">
              <PackageCheck size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-black font-bengali text-[var(--foreground)] tracking-tight">
                Order <span className="text-gradient">Command</span>
              </h1>
              <p className="text-sm font-bold uppercase tracking-widest text-[var(--foreground)]/50">
                Track and fulfillment management center.
              </p>
            </div>
          </div>
        </header>

        <OrdersTable initialOrders={initialOrders} />
      </div>
    </div>
  );
}
