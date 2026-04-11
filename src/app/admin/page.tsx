import {
  Video,
  BookOpen,
  Mail,
  TrendingUp,
  Plus,
  ArrowRight,
  Clock,
  Settings,
  ShieldCheck,
  ChevronRight,
  MessageSquare
} from "lucide-react";
import Link from "next/link";
import { getDashboardDataFresh } from "@/features/admin/api";
import RelativeTime from "@/components/ui/RelativeTime";

export default async function AdminDashboard() {
  const data = await getDashboardDataFresh();
  const {
    videoCount,
    blogCount,
    messageCount,
    unreadMessageCount,
    commentCount,
    recentVideos,
    recentBlogs,
    recentComments
  } = data;

  const stats = [
    { title: "Content Videos", value: videoCount, icon: Video, color: "text-[var(--info)]", bg: "bg-[var(--info)]/10", border: "border-[var(--info)]/20" },
    { title: "Published Blogs", value: blogCount, icon: BookOpen, color: "text-[var(--secondary)]", bg: "bg-[var(--secondary)]/10", border: "border-[var(--secondary)]/20" },
    { title: "Commentary Hub", value: commentCount, icon: MessageSquare, color: "text-[var(--success)]", bg: "bg-[var(--success)]/10", border: "border-[var(--success)]/20" },
    { title: "New Messages", value: unreadMessageCount, icon: Mail, color: "text-[var(--warning)]", bg: "bg-[var(--warning)]/10", border: "border-[var(--warning)]/20", subtitle: `${messageCount} total` },
  ];

  const activities = [
    ...recentVideos.map((v: any) => ({
      id: v._id,
      type: 'video',
      title: v.title,
      date: v.publishedAt,
      action: 'New video synced'
    })),
    ...recentBlogs.map((b: any) => ({
      id: b._id,
      type: 'blog',
      title: b.title,
      date: b.publishedAt,
      action: 'New article published'
    })),
    ...recentComments.map((c: any) => ({
      id: c._id,
      type: 'comment',
      title: c.author,
      date: c.createdAt,
      action: 'New reader engagement'
    }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[var(--radius-full)] bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold uppercase tracking-widest border border-[var(--primary)]/20 shadow-sm shadow-[var(--primary)]/5">
            <ShieldCheck size={14} />
            Verified Admin Access
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-[var(--foreground)] tracking-tight">Dashboard Overview</h1>
          <p className="text-base text-[var(--foreground)]/50 font-medium">Monitoring the pulse of <span className="font-bold text-[var(--primary)]">Sahitya Bari</span> digital ecosystem.</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/blogs/new"
            className="btn-ios flex items-center gap-2 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white px-8 py-3.5 rounded-[var(--radius-full)] font-black shadow-2xl shadow-[var(--primary)]/20 hover:scale-[1.05] active:scale-[0.98] transition-all"
          >
            <Plus size={18} />
            Compose Post
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className={`p-8 bg-[var(--surface-100)]/40 backdrop-blur-xl rounded-[var(--radius-xl)] border ${stat.border} shadow-2xl shadow-black/5 transition-all duration-500 hover:scale-[1.02] group animate-in fade-in slide-in-from-bottom-8`}
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className={`p-4 rounded-[var(--radius-md)] ${stat.bg} ${stat.color} transition-all duration-700 group-hover:rotate-12 group-hover:scale-110 shadow-lg shadow-black/5`}>
                  <Icon size={24} />
                </div>
                <div className="flex items-center gap-1.5 text-xs font-black text-[var(--foreground)]/40 uppercase tracking-tighter">
                  <TrendingUp size={16} className="text-[var(--success)]" />
                  <span>Real-time</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="admin-metric text-[var(--foreground)]">{stat.value}</div>
                <div className="admin-label text-[var(--foreground)]">{stat.title}</div>
                {stat.subtitle && (
                   <div className="text-[9px] text-[var(--foreground)]/40 font-bold mt-1.5 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-[var(--radius-full)] bg-[var(--primary)]" />
                    {stat.subtitle}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Sections */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-10">
        <div className="xl:col-span-3 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="flex items-center gap-3">
              Recent Activity
              <span className="admin-label px-2.5 py-1 rounded-[var(--radius-full)] bg-[var(--surface-200)] text-[var(--foreground)] border border-[var(--glass-border)] opacity-100">Live</span>
            </h2>
            <Link href="/admin/blogs" className="text-sm font-black text-[var(--primary)] flex items-center gap-1 uppercase tracking-wider hover:translate-x-1 transition-transform">
              View Journal <ArrowRight size={16} />
            </Link>
          </div>

          <div className="bg-[var(--surface-100)]/40 backdrop-blur-xl rounded-[var(--radius-xl)] border border-[var(--glass-border)] p-4 shadow-2xl shadow-black/5">
            {activities.length > 0 ? activities.map((activity: any, i: number) => (
              <div key={activity.id} className={`flex items-center gap-6 p-6 group transition-all duration-300 hover:bg-[var(--surface-200)]/50 rounded-[var(--radius-lg)] ${i !== activities.length - 1 ? "mb-1" : ""}`}>
                <div className={`w-14 h-14 rounded-[var(--radius-md)] flex items-center justify-center text-white shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3 ${activity.type === 'video' ? "bg-gradient-to-br from-[var(--destructive)] to-[var(--accent)]" :
                  activity.type === 'comment' ? "bg-gradient-to-br from-[var(--success)] to-emerald-400" :
                    "bg-gradient-to-br from-[var(--secondary)] to-blue-400"
                  }`}>
                  {activity.type === 'video' ? <Video size={22} /> :
                    activity.type === 'comment' ? <MessageSquare size={22} /> :
                      <BookOpen size={22} />}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-black text-[var(--foreground)] text-base leading-tight truncate group-hover:text-[var(--primary)] transition-colors">{activity.title}</h4>
                  <p className="text-xs text-[var(--foreground)]/50 font-bold uppercase tracking-widest mt-1">{activity.action}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs font-black text-[var(--foreground)]/50 uppercase tracking-tighter whitespace-nowrap bg-[var(--surface-200)] px-3 py-1.5 rounded-[var(--radius-full)] border border-[var(--glass-border)]">
                    <RelativeTime date={activity.date} />
                  </div>
                </div>
              </div>
            )) : (
              <div className="p-20 text-center space-y-4">
                <div className="w-16 h-16 rounded-[var(--radius-full)] bg-[var(--surface-200)] flex items-center justify-center text-[var(--foreground)]/40 mx-auto">
                  <Clock size={32} />
                </div>
                <p className="text-sm font-bold text-[var(--foreground)]/50 uppercase tracking-widest">No recent data detected</p>
              </div>
            )}
          </div>
        </div>

        <div className="xl:col-span-2 space-y-6">
          <h2 className="text-2xl font-black px-2">Action Center</h2>
          <div className="grid grid-cols-1 gap-4">
            <ShortcutCard
              href="/admin/videos/new"
              icon={<Video size={24} />}
              title="Add New Video"
              desc="Manually add a video"
              color="from-[var(--info)] to-[var(--primary)]"
              delay={100}
            />
            <ShortcutCard
              href="/admin/blogs"
              icon={<BookOpen size={24} />}
              title="Content Review"
              desc="Audit pending manuscripts"
              color="from-[var(--secondary)] to-[var(--accent)]"
              delay={200}
            />
            <ShortcutCard
              href="/admin/messages"
              icon={<Mail size={24} />}
              title="User Terminal"
              desc="Manage reader interactions"
              color="from-[var(--warning)] to-[var(--accent)]"
              delay={300}
            />
            <ShortcutCard
              href="/admin/settings"
              icon={<Settings size={24} />}
              title="System Protocol"
              desc="Configure global parameters"
              color="from-[var(--foreground)]/40 to-[var(--foreground)]/60"
              delay={400}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ShortcutCard({ href, icon, title, desc, color, delay }: any) {
  return (
    <Link
      href={href}
      className="group relative bg-[var(--surface-100)]/40 backdrop-blur-xl rounded-[var(--radius-lg)] border border-[var(--glass-border)] p-6 flex items-center gap-6 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:bg-[var(--surface-200)]/80 animate-in fade-in slide-in-from-right-8"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`w-16 h-16 rounded-[var(--radius-md)] bg-gradient-to-tr ${color} flex items-center justify-center text-white shadow-2xl shadow-[var(--primary)]/10 transition-all duration-700 group-hover:rotate-[15deg] group-hover:scale-110`}>
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="text-[var(--foreground)] tracking-tight group-hover:text-[var(--primary)] transition-colors inline-block">{title}</h3>
        <p className="admin-label leading-none mt-1.5 block">{desc}</p>
      </div>
      <div className="w-10 h-10 rounded-[var(--radius-full)] bg-[var(--surface-200)] flex items-center justify-center text-[var(--foreground)]/40 transition-all duration-500 group-hover:bg-[var(--primary)] group-hover:text-white group-hover:scale-110">
        <ChevronRight size={20} />
      </div>
    </Link>
  );
}
