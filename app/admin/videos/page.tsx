import dbConnect from "@/lib/mongodb"
import Video from "@/lib/models/Video"
import { format } from "date-fns"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Trash2, Play, Eye, Clock, Calendar, Sparkles, Flame, Plus, Edit3 } from "lucide-react"
import { deleteVideo, toggleUpcoming, togglePopular } from "@/app/actions/video"
import DeleteForm from "@/components/admin/DeleteForm"
import { formatDuration, formatViews } from "@/lib/utils"


async function handleDelete(id: string) {
  "use server"
  await deleteVideo(id)
}

export default async function AdminVideosPage() {
  await dbConnect()
  const rawVideos = await Video.find()
    .sort({ publishedAt: -1 })
    .lean()

  const videos = rawVideos.map((video: any) => ({
    ...video,
    id: video._id.toString(),
    publishedAt: video.publishedAt.toISOString(),
  }))

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-[var(--foreground)] tracking-tight">Video Library</h1>
          <p className="text-[var(--foreground)]/50 font-medium">Manage your video content library.</p>
        </div>
        <Link
          href="/admin/videos/new"
          className="btn-ios flex items-center gap-2 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white px-6 py-3 rounded-[var(--radius-lg)] font-bold shadow-xl shadow-[var(--primary)]/20 hover:scale-105 active:scale-95"
        >
          <Plus size={20} />
          Add Video
        </Link>
      </div>

      <div className="bg-[var(--surface-100)]/40 backdrop-blur-xl rounded-[var(--radius-xl)] border border-[var(--glass-border)] overflow-hidden shadow-2xl shadow-black/5 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--glass-border)]">
                <th className="px-8 py-6 text-xs font-black text-[var(--foreground)]/40 uppercase tracking-widest">YouTube Content</th>
                <th className="px-8 py-6 text-xs font-black text-[var(--foreground)]/40 uppercase tracking-widest">Performance</th>
                <th className="px-8 py-6 text-xs font-black text-[var(--foreground)]/40 uppercase tracking-widest">Feature Status</th>
                <th className="px-8 py-6 text-xs font-black text-[var(--foreground)]/40 uppercase tracking-widest">Publish Date</th>
                <th className="px-8 py-6 text-xs font-black text-[var(--foreground)]/40 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--glass-border)]/50">
              {videos.map((video) => (
                <tr key={video.id} className="group hover:bg-[var(--primary)]/[0.02] transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-6">
                      <div className="relative w-32 h-20 rounded-[var(--radius-md)] overflow-hidden bg-[var(--surface-200)] flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-500">
                        {video.thumbnail ? (
                          <>
                            <Image
                              src={video.thumbnail}
                              alt={video.title}
                              fill
                              className="object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <Play size={24} className="text-white fill-white" />
                            </div>
                          </>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[var(--foreground)]/20 text-xs font-bold">MISSING</div>
                        )}
                      </div>
                      <div className="max-w-xs space-y-1">
                        <p className="text-sm font-bold text-[var(--foreground)] line-clamp-2 leading-snug group-hover:text-[var(--primary)] transition-colors">
                          {video.title}
                        </p>
                        <div className="flex items-center gap-2 text-xs font-bold text-[var(--foreground)]/50 uppercase tracking-tighter">
                          <span className="px-2 py-0.5 rounded-[var(--radius-xl)] bg-[var(--surface-200)]">ID: {video.youtubeId}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-8 h-8 rounded-[var(--radius-sm)] bg-[var(--info)]/10 flex items-center justify-center text-[var(--info)]">
                          <Eye size={14} />
                        </div>
                        <span className="font-bold text-[var(--foreground)]">{formatViews(video.views)}</span>
                        <span className="text-xs font-bold text-[var(--foreground)]/50 uppercase">Views</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-8 h-8 rounded-[var(--radius-sm)] bg-[var(--secondary)]/10 flex items-center justify-center text-[var(--secondary)]">
                          <Clock size={14} />
                        </div>
                        <span className="font-bold text-[var(--foreground)]">{formatDuration(video.duration)}</span>
                        <span className="text-xs font-bold text-[var(--foreground)]/50 uppercase">Duration</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <form action={toggleUpcoming.bind(null, video.id)}>
                        <button
                          type="submit"
                          className={`w-10 h-10 rounded-[var(--radius-md)] flex items-center justify-center transition-all ${video.isUpcoming ? "bg-[var(--secondary)] text-white shadow-lg shadow-[var(--secondary)]/20" : "bg-[var(--surface-200)] text-[var(--foreground)]/40 hover:bg-[var(--secondary)]/10 hover:text-[var(--secondary)]"}`}
                          title={video.isUpcoming ? "Remove from Upcoming" : "Set as Upcoming"}
                        >
                          <Sparkles size={18} />
                        </button>
                      </form>
                      <form action={togglePopular.bind(null, video.id)}>
                        <button
                          type="submit"
                          className={`w-10 h-10 rounded-[var(--radius-md)] flex items-center justify-center transition-all ${video.isPopular ? "bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent)]/20" : "bg-[var(--surface-200)] text-[var(--foreground)]/40 hover:bg-[var(--accent)]/10 hover:text-[var(--accent)]"}`}
                          title={video.isPopular ? "Remove from Popular" : "Set as Popular"}
                        >
                          <Flame size={18} />
                        </button>
                      </form>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-8 h-8 rounded-[var(--radius-sm)] bg-[var(--success)]/10 flex items-center justify-center text-[var(--success)]">
                        <Calendar size={14} />
                      </div>
                      <div className="flex flex-col leading-tight">
                        <span className="font-bold text-[var(--foreground)]">{format(new Date(video.publishedAt), "MMM d, yyyy")}</span>
                        <span className="text-xs font-bold text-[var(--foreground)]/50 uppercase tracking-tighter">{format(new Date(video.publishedAt), "h:mm a")}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 transition-all duration-300">
                      <a
                        href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--surface-200)] flex items-center justify-center text-[var(--foreground)]/60 hover:bg-[var(--primary)] hover:text-white transition-all hover:rotate-12"
                        title="View on YouTube"
                      >
                        <ExternalLink size={18} />
                      </a>
                      <Link
                        href={`/admin/videos/${video.id}/edit`}
                        className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--surface-200)] flex items-center justify-center text-[var(--foreground)]/60 hover:bg-[var(--secondary)] hover:text-white transition-all hover:-rotate-12"
                        title="Edit Video"
                      >
                        <Edit3 size={18} />
                      </Link>
                      <DeleteForm action={handleDelete.bind(null, video.id)}>
                        <button
                          type="submit"
                          className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--surface-200)] flex items-center justify-center text-[var(--foreground)]/60 hover:bg-[var(--destructive)] hover:text-white transition-all hover:-rotate-12"
                          title="Remove Video"
                        >
                          <Trash2 size={18} />
                        </button>
                      </DeleteForm>
                    </div>
                  </td>
                </tr>
              ))}
              {videos.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-8 py-24 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-[var(--radius-lg)] bg-[var(--surface-200)] flex items-center justify-center text-[var(--foreground)]/20">
                        <Play size={32} />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold text-[var(--foreground)]">Empty Library</h3>
                        <p className="text-sm text-[var(--foreground)]/40 font-medium">Sync with your YouTube channel to populate your dashboard.</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
