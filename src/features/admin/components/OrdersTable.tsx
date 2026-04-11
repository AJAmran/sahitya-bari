"use client";

import { useState } from "react";
import { format } from "date-fns";
import { 
  PackageCheck, 
  Search, 
  MoreVertical, 
  Package, 
  Truck, 
  CheckCircle2, 
  XOctagon, 
  Clock,
  Eye,
  Loader2
} from "lucide-react";
import { updateOrderStatus } from "@/features/checkout/actions";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface OrdersTableProps {
  initialOrders: any[];
}

export default function OrdersTable({ initialOrders }: OrdersTableProps) {
  const [orders, setOrders] = useState(initialOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingOrderId, setLoadingOrderId] = useState<string | null>(null);

  const getStatusConfig = (status: string) => {
    switch(status) {
      case "pending": return { icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" };
      case "processing": return { icon: Package, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" };
      case "shipped": return { icon: Truck, color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/20" };
      case "delivered": return { icon: CheckCircle2, color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/20" };
      case "cancelled": return { icon: XOctagon, color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20" };
      default: return { icon: PackageCheck, color: "text-gray-500", bg: "bg-gray-500/10", border: "border-gray-500/20" };
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setLoadingOrderId(orderId);
    try {
      const result = await updateOrderStatus(orderId, newStatus);
      if (result.success) {
        setOrders(orders.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
        toast.success(`Order status updated to ${newStatus}`);
      } else {
        toast.error("Failed to update status");
      }
    } catch {
      toast.error("Network error");
    } finally {
      setLoadingOrderId(null);
    }
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.shippingDetails?.fullName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-[1.5rem] bg-[var(--surface-100)] border border-[var(--glass-border)] shadow-sm">
          <p className="text-[10px] uppercase font-black tracking-widest text-[var(--foreground)]/40 mb-2">Total Orders</p>
          <p className="text-3xl font-black">{orders.length}</p>
        </div>
        <div className="p-6 rounded-[1.5rem] bg-[var(--surface-100)] border border-[var(--glass-border)] shadow-sm">
          <p className="text-[10px] uppercase font-black tracking-widest text-[var(--foreground)]/40 mb-2">Pending</p>
          <p className="text-3xl font-black text-amber-500">{orders.filter(o => o.status === "pending").length}</p>
        </div>
        <div className="p-6 rounded-[1.5rem] bg-[var(--surface-100)] border border-[var(--glass-border)] shadow-sm">
          <p className="text-[10px] uppercase font-black tracking-widest text-[var(--foreground)]/40 mb-2">Total Revenue</p>
          <p className="text-3xl font-black text-[var(--primary)] text-gradient">
            ৳{orders.filter(o => o.status !== "cancelled").reduce((acc, curr) => acc + curr.total, 0).toLocaleString()}
          </p>
        </div>
        <div className="p-6 rounded-[1.5rem] bg-[var(--surface-100)] border border-[var(--glass-border)] shadow-sm">
          <p className="text-[10px] uppercase font-black tracking-widest text-[var(--foreground)]/40 mb-2">Delivered</p>
          <p className="text-3xl font-black text-green-500">{orders.filter(o => o.status === "delivered").length}</p>
        </div>
      </div>

      <div className="p-6 rounded-[2rem] bg-[var(--surface-100)] border border-[var(--glass-border)] shadow-sm space-y-6">
        {/* Table Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h2 className="text-xl font-black font-bengali">Order Management</h2>
          <div className="relative w-full sm:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--foreground)]/40" />
            <input 
              type="text" 
              placeholder="Search ID or Customer..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 bg-[var(--surface-200)] border border-[var(--glass-border)] rounded-xl pl-10 pr-4 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 transition-all text-[var(--foreground)]"
            />
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--glass-border)]">
                <th className="px-4 py-3 text-[10px] uppercase font-black tracking-widest text-[var(--foreground)]/40">Order ID</th>
                <th className="px-4 py-3 text-[10px] uppercase font-black tracking-widest text-[var(--foreground)]/40">Date</th>
                <th className="px-4 py-3 text-[10px] uppercase font-black tracking-widest text-[var(--foreground)]/40">Customer</th>
                <th className="px-4 py-3 text-[10px] uppercase font-black tracking-widest text-[var(--foreground)]/40">Total</th>
                <th className="px-4 py-3 text-[10px] uppercase font-black tracking-widest text-[var(--foreground)]/40">Status</th>
                <th className="px-4 py-3 text-[10px] uppercase font-black tracking-widest text-[var(--foreground)]/40 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-12 text-center text-sm font-bold text-[var(--foreground)]/40">No records found.</td></tr>
              ) : filteredOrders.map((order) => {
                const config = getStatusConfig(order.status);
                const Icon = config.icon;
                return (
                  <tr key={order._id} className="border-b border-[var(--glass-border)]/50 hover:bg-[var(--surface-200)]/30 transition-colors group">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="font-mono text-xs font-bold bg-[var(--primary)]/10 text-[var(--primary)] px-2 py-1 rounded-md">{order.orderNumber}</span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="text-xs font-bold text-[var(--foreground)]/70">{format(new Date(order.createdAt), "MMM d, yyyy")}</span>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <p className="text-sm font-bold truncate max-w-[150px]">{order.shippingDetails?.fullName}</p>
                        <p className="text-[10px] text-[var(--foreground)]/40 truncate max-w-[150px]">{order.shippingDetails?.city}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="text-sm font-black font-mono">৳{order.total}</span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] uppercase font-black tracking-widest", config.bg, config.border, config.color)}>
                        {loadingOrderId === order._id ? <Loader2 size={12} className="animate-spin" /> : <Icon size={12} />}
                        {order.status}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end items-center gap-2">
                        {/* Status Select */}
                        <select 
                          className="bg-[var(--surface-200)] border border-[var(--glass-border)] text-[0.65rem] font-bold uppercase p-1.5 rounded-lg focus:outline-none"
                          value={order.status}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          disabled={loadingOrderId === order._id}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                        <button className="p-2 text-[var(--foreground)]/40 hover:text-[var(--primary)] hover:bg-[var(--primary)]/10 rounded-lg transition-colors">
                          <Eye size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
