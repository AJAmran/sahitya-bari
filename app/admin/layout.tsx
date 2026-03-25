import Link from "next/link";
import { auth, signOut } from "@/lib/auth-node";
import { redirect } from "next/navigation";
import {
  LayoutDashboard,
  Video,
  FileText,
  Star,
  Mail,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  Cpu,
  ShoppingBag
} from "lucide-react";
import AdminSidebarItem from "@/components/admin/AdminSidebarItem";
import AdminMobileNavItem from "@/components/admin/AdminMobileNavItem";
import { ThemeToggle } from "@/components/ThemeToggle";


export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session || session.user.role !== "ADMIN") {
    redirect("/auth/signin");
  }

  return (
    <div className="flex min-h-screen bg-[var(--background)] transition-colors duration-500 ease-in-out antialiased admin-suite">
      {/* Sidebar — Desktop only */}
      <aside className="w-80 hidden lg:flex flex-col border-r border-[var(--glass-border)] bg-[var(--surface-100)]/90 backdrop-blur-3xl sticky top-0 h-screen overflow-y-auto z-50 shadow-2xl shadow-black/5">
        <div className="p-8 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-[1.25rem] overflow-hidden shadow-2xl shadow-[var(--primary)]/20 transition-all duration-500 group-hover:scale-105 group-hover:rotate-3 active:scale-95">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
            </div>
            <div className="min-w-0">
              <h1 className="text-xl font-black font-bengali text-gradient leading-none truncate">সাহিত্য বাড়ি</h1>
              <p className="text-[10px] text-[var(--foreground)]/30 uppercase tracking-[0.2em] font-black mt-1.5 flex items-center gap-1.5">
                <ShieldCheck size={10} className="text-[var(--primary)]/60" />
                Admin Suite
              </p>
            </div>
          </Link>
          <div className="shrink-0 scale-90">
            <ThemeToggle />
          </div>
        </div>

        <nav className="flex-1 px-5 space-y-1">
          <div className="px-3 pb-3 pt-4 flex items-center gap-2 text-[10px] font-black text-[var(--foreground)]/30 uppercase tracking-[0.25em]">
            <TrendingUp size={12} className="opacity-40" />
            Management
          </div>

          <div className="space-y-0.5">
            <AdminSidebarItem
              href="/admin"
              icon={<LayoutDashboard size={18} />}
              label="Dashboard"
            />
            <AdminSidebarItem
              href="/admin/videos"
              icon={<Video size={18} />}
              label="Videos"
            />
            <AdminSidebarItem
              href="/admin/blogs"
              icon={<FileText size={18} />}
              label="Blogs"
            />
            <AdminSidebarItem
              href="/admin/comments"
              icon={<MessageSquare size={18} />}
              label="Comments"
            />
            <AdminSidebarItem
              href="/admin/spotlight"
              icon={<Star size={18} />}
              label="Spotlight"
            />
            <AdminSidebarItem
              href="/admin/products"
              icon={<ShoppingBag size={18} />}
              label="Store"
            />
          </div>

          <div className="px-3 pb-3 pt-8 flex items-center gap-2 text-[10px] font-black text-[var(--foreground)]/30 uppercase tracking-[0.25em]">
            <Users size={12} className="opacity-40" />
            Engagement
          </div>

          <div className="space-y-0.5">
            <AdminSidebarItem
              href="/admin/messages"
              icon={<Mail size={18} />}
              label="Messages"
            />
            <AdminSidebarItem
              href="/admin/subscribers"
              icon={<Users size={18} />}
              label="Subscribers"
            />
          </div>

          <div className="px-3 pb-3 pt-8 flex items-center gap-2 text-[10px] font-black text-[var(--foreground)]/30 uppercase tracking-[0.25em]">
            <Cpu size={12} className="opacity-40" />
            System
          </div>

          <div className="space-y-0.5 pb-8">
            <AdminSidebarItem
              href="/admin/settings"
              icon={<Settings size={18} />}
              label="Settings"
            />
          </div>
        </nav>

        <div className="p-5 mt-auto bg-gradient-to-t from-[var(--surface-200)]/40 to-transparent pt-10">
          <div className="p-5 rounded-3xl bg-[var(--surface-100)] border border-[var(--glass-border)] shadow-xl shadow-black/5 space-y-5 transition-all duration-300 hover:shadow-2xl hover:shadow-[var(--primary)]/5">
            <div className="flex items-center gap-3">
              <div className="relative group/avatar">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] p-[1px] shadow-lg">
                  <div className="w-full h-full bg-[var(--surface-100)] rounded-[calc(1rem-1px)] flex items-center justify-center text-[var(--primary)] font-black text-xl transition-all group-hover/avatar:scale-105">
                    {session.user.name?.[0] || "A"}
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-[var(--surface-100)] shadow-sm" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black truncate text-[var(--foreground)]">{session.user.name}</p>
                <div className="flex items-center gap-1.5 opacity-40">
                  <ShieldCheck size={10} className="text-[var(--primary)]" />
                  <p className="text-[9px] uppercase tracking-wider font-black">Authorized</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/"
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl text-[9px] font-black uppercase tracking-wider text-[var(--foreground)]/50 hover:text-[var(--primary)] hover:bg-[var(--primary)]/5 transition-all border border-[var(--glass-border)] hover:border-[var(--primary)]/10"
              >
                <ExternalLink size={14} />
                Site
              </Link>
              <form
                action={async () => {
                  "use server"
                  await signOut({ redirectTo: "/auth/signin" })
                }}
                className="flex-1"
              >
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-1.5 p-2.5 rounded-xl text-[9px] font-black uppercase tracking-wider text-[var(--foreground)]/50 hover:text-[var(--destructive)] hover:bg-[var(--destructive)]/5 transition-all border border-[var(--glass-border)] hover:border-[var(--destructive)]/10"
                >
                  <LogOut size={14} />
                  Exit
                </button>
              </form>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen relative">
        {/* Mobile Header - Glassmorphic */}
        <header className="lg:hidden h-20 border-b border-[var(--glass-border)] bg-[var(--surface-100)]/80 backdrop-blur-2xl sticky top-0 z-40 px-6 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center text-white font-black text-sm shadow-xl shadow-[var(--primary)]/20 group">
              <ShieldCheck size={20} className="group-active:scale-90 transition-transform" />
            </div>
            <div>
              <h1 className="font-black text-base tracking-tight text-[var(--foreground)] leading-none">Control Center</h1>
              <p className="text-[9px] text-[var(--foreground)]/30 uppercase font-black mt-1.5 tracking-widest flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-[var(--primary)] animate-pulse" />
                System Active
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="w-[1px] h-6 bg-[var(--glass-border)] mx-1" />
            <form
              action={async () => {
                "use server"
                await signOut({ redirectTo: "/auth/signin" })
              }}
            >
              <button
                type="submit"
                className="w-11 h-11 rounded-2xl bg-[var(--surface-200)]/80 flex items-center justify-center text-[var(--foreground)]/40 hover:bg-[var(--destructive)]/10 hover:text-[var(--destructive)] transition-all active:scale-90"
                title="Sign Out"
              >
                <LogOut size={18} />
              </button>
            </form>
          </div>
        </header>

        <main className="flex-1 p-6 sm:p-8 md:p-10 lg:p-14 transition-all duration-500 overflow-x-hidden min-h-screen pb-32 lg:pb-14">
          <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {children}
          </div>
        </main>

        {/* Mobile Bottom Navigation - iOS Style Floating Bar */}
        <div className="lg:hidden fixed bottom-6 left-6 right-6 z-50">
          <nav className="bg-[var(--surface-100)]/90 backdrop-blur-3xl border border-[var(--glass-border)] px-4 py-2 rounded-[2.5rem] shadow-2xl shadow-black/10 flex items-center justify-between ring-1 ring-white/10 overflow-hidden">
            <AdminMobileNavItem
              href="/admin"
              icon={<LayoutDashboard size={20} />}
              label="Home"
            />
            <AdminMobileNavItem
              href="/admin/videos"
              icon={<Video size={20} />}
              label="Videos"
            />
            <AdminMobileNavItem
              href="/admin/blogs"
              icon={<FileText size={20} />}
              label="Blogs"
            />
            <AdminMobileNavItem
              href="/admin/comments"
              icon={<MessageSquare size={20} />}
              label="Feed"
            />
            <AdminMobileNavItem
              href="/admin/messages"
              icon={<Mail size={20} />}
              label="Inbox"
            />
            <AdminMobileNavItem
              href="/admin/products"
              icon={<ShoppingBag size={20} />}
              label="Store"
            />
            <AdminMobileNavItem
              href="/admin/settings"
              icon={<Settings size={20} />}
              label="Setup"
            />
          </nav>
        </div>
      </div>
    </div>
  );
}

