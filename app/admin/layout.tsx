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
  ChevronRight
} from "lucide-react";
import AdminSidebarItem from "@/components/admin/AdminSidebarItem";
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
    <div className="flex min-h-screen bg-[var(--background)] transition-colors duration-500 ease-in-out">
      {/* Sidebar — Desktop only */}
      <aside className="w-72 hidden lg:flex flex-col border-r border-[var(--glass-border)] bg-[var(--surface-100)]/90 backdrop-blur-3xl sticky top-0 h-screen overflow-y-auto z-50">
        <div className="p-8 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-[var(--radius-md)] overflow-hidden shadow-xl shadow-[var(--primary)]/10 transition-all duration-300 group-hover:scale-105 active:scale-95">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl font-black font-bengali text-gradient leading-none truncate">সাহিত্য বাড়ি</h1>
              <p className="text-[10px] text-[var(--foreground)]/40 uppercase tracking-widest font-black mt-1">Admin Control</p>
            </div>
          </Link>
          <div className="shrink-0">
            <ThemeToggle />
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1.5">
          <div className="px-4 py-3 text-xs font-black text-[var(--foreground)]/40 uppercase tracking-wider">Management</div>

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

          <div className="pt-6 px-4 py-3 text-xs font-black text-[var(--foreground)]/40 uppercase tracking-wider">Engagement</div>

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

          <div className="pt-6 px-4 py-3 text-xs font-black text-[var(--foreground)]/40 uppercase tracking-wider">System</div>

          <AdminSidebarItem
            href="/admin/settings"
            icon={<Settings size={18} />}
            label="Settings"
          />
        </nav>

        <div className="p-4 mt-auto">
          <div className="p-4 rounded-[var(--radius-lg)] bg-[var(--surface-200)]/60 border border-[var(--glass-border)] shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-[var(--radius-full)] bg-gradient-to-br from-[var(--surface-300)] to-[var(--surface-200)] border border-[var(--glass-border)] flex items-center justify-center overflow-hidden shadow-sm">
                <div className="w-full h-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] font-black text-lg">
                  {session.user.name?.[0] || "A"}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black truncate text-[var(--foreground)]">{session.user.name}</p>
                <p className="text-xs text-[var(--foreground)]/60 truncate uppercase tracking-tight font-bold">System Administrator</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Link
                href="/"
                className="flex-1 flex items-center justify-center gap-1.5 p-2 rounded-[var(--radius-sm)] text-xs font-black uppercase tracking-wider text-[var(--foreground)]/60 hover:text-[var(--primary)] hover:bg-[var(--primary)]/10 transition-all border border-transparent hover:border-[var(--primary)]/20"
              >
                <ExternalLink size={14} />
                Website
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
                  className="w-full flex items-center justify-center gap-1.5 p-2 rounded-[var(--radius-sm)] text-xs font-black uppercase tracking-wider text-[var(--foreground)]/60 hover:text-[var(--destructive)] hover:bg-[var(--destructive)]/10 transition-all border border-transparent hover:border-[var(--destructive)]/20"
                >
                  <LogOut size={14} />
                  Sign Out
                </button>
              </form>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile Header */}
        <header className="lg:hidden h-16 border-b border-[var(--glass-border)] bg-[var(--surface-100)]/90 backdrop-blur-xl sticky top-0 z-40 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[var(--radius-sm)] bg-gradient-to-tr from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center text-white font-bold text-sm shadow-lg">SB</div>
            <div>
              <h1 className="font-bold text-sm tracking-tight text-[var(--foreground)]">Admin Control</h1>
              <p className="text-xs text-[var(--foreground)]/40 uppercase font-black">Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <form
              action={async () => {
                "use server"
                await signOut({ redirectTo: "/auth/signin" })
              }}
            >
              <button
                type="submit"
                className="w-9 h-9 rounded-[var(--radius-sm)] bg-[var(--surface-200)] flex items-center justify-center text-[var(--foreground)]/60 hover:bg-[var(--destructive)]/10 hover:text-[var(--destructive)] transition-all"
                title="Sign Out"
              >
                <LogOut size={16} />
              </button>
            </form>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-10 lg:p-12 transition-colors duration-500 overflow-x-hidden pb-24 lg:pb-12">
          <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            {children}
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[var(--surface-100)]/95 backdrop-blur-3xl border-t border-[var(--glass-border)] px-2 py-2 safe-area-bottom">
          <div className="flex items-center justify-around">
            <Link href="/admin" className="flex flex-col items-center gap-1 p-2 rounded-[var(--radius-sm)] hover:bg-[var(--primary)]/10 transition-colors group">
              <LayoutDashboard size={20} className="text-[var(--foreground)]/50 group-hover:text-[var(--primary)] transition-colors" />
              <span className="text-xs font-black uppercase tracking-wider text-[var(--foreground)]/40 group-hover:text-[var(--primary)] transition-colors">Home</span>
            </Link>
            <Link href="/admin/videos" className="flex flex-col items-center gap-1 p-2 rounded-[var(--radius-sm)] hover:bg-[var(--primary)]/10 transition-colors group">
              <Video size={20} className="text-[var(--foreground)]/50 group-hover:text-[var(--primary)] transition-colors" />
              <span className="text-xs font-black uppercase tracking-wider text-[var(--foreground)]/40 group-hover:text-[var(--primary)] transition-colors">Videos</span>
            </Link>
            <Link href="/admin/blogs" className="flex flex-col items-center gap-1 p-2 rounded-[var(--radius-sm)] hover:bg-[var(--primary)]/10 transition-colors group">
              <FileText size={20} className="text-[var(--foreground)]/50 group-hover:text-[var(--primary)] transition-colors" />
              <span className="text-xs font-black uppercase tracking-wider text-[var(--foreground)]/40 group-hover:text-[var(--primary)] transition-colors">Blogs</span>
            </Link>
            <Link href="/admin/comments" className="flex flex-col items-center gap-1 p-2 rounded-[var(--radius-sm)] hover:bg-[var(--primary)]/10 transition-colors group">
              <MessageSquare size={20} className="text-[var(--foreground)]/50 group-hover:text-[var(--primary)] transition-colors" />
              <span className="text-xs font-black uppercase tracking-wider text-[var(--foreground)]/40 group-hover:text-[var(--primary)] transition-colors">Dialogue</span>
            </Link>
            <Link href="/admin/messages" className="flex flex-col items-center gap-1 p-2 rounded-[var(--radius-sm)] hover:bg-[var(--primary)]/10 transition-colors group">
              <Mail size={20} className="text-[var(--foreground)]/50 group-hover:text-[var(--primary)] transition-colors" />
              <span className="text-xs font-black uppercase tracking-wider text-[var(--foreground)]/40 group-hover:text-[var(--primary)] transition-colors">Inbox</span>
            </Link>
            <Link href="/admin/settings" className="flex flex-col items-center gap-1 p-2 rounded-[var(--radius-sm)] hover:bg-[var(--primary)]/10 transition-colors group">
              <Settings size={20} className="text-[var(--foreground)]/50 group-hover:text-[var(--primary)] transition-colors" />
              <span className="text-xs font-black uppercase tracking-wider text-[var(--foreground)]/40 group-hover:text-[var(--primary)] transition-colors">Config</span>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
