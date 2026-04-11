import { LayoutDashboard, Video, FileText, MessageSquare, Mail, ShoppingBag, Settings } from "lucide-react";
import AdminMobileNavItem from "./AdminMobileNavItem";

export default function AdminBottomNav() {
  return (
    <div className="lg:hidden fixed bottom-6 left-6 right-6 z-50">
      <nav className="bg-[var(--surface-100)]/90 backdrop-blur-3xl border border-[var(--glass-border)] px-4 py-2 rounded-[2.5rem] shadow-2xl shadow-black/10 flex items-center justify-between ring-1 ring-white/10 overflow-hidden">
        <AdminMobileNavItem href="/admin" icon={<LayoutDashboard size={20} />} label="Home" />
        <AdminMobileNavItem href="/admin/videos" icon={<Video size={20} />} label="Videos" />
        <AdminMobileNavItem href="/admin/blogs" icon={<FileText size={20} />} label="Blogs" />
        <AdminMobileNavItem href="/admin/comments" icon={<MessageSquare size={20} />} label="Feed" />
        <AdminMobileNavItem href="/admin/messages" icon={<Mail size={20} />} label="Inbox" />
        <AdminMobileNavItem href="/admin/products" icon={<ShoppingBag size={20} />} label="Store" />
        <AdminMobileNavItem href="/admin/settings" icon={<Settings size={20} />} label="Setup" />
      </nav>
    </div>
  );
}
