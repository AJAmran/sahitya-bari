import dbConnect from "@/lib/mongodb"
import FeaturedSpotlight from "@/lib/models/FeaturedSpotlight"
import { Plus, Edit3, Trash2, Star, Calendar, CheckCircle2, XCircle, Sparkles, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { deleteSpotlight, toggleSpotlightStatus } from "@/app/actions/spotlight";
import { format } from 'date-fns';
import DeleteForm from "@/components/admin/DeleteForm";
import { revalidatePath } from "next/cache";

async function handleDelete(id: string) {
  "use server"
  await deleteSpotlight(id)
  revalidatePath("/admin/spotlight")
}

export default async function AdminSpotlightPage() {
  await dbConnect();
  const rawSpotlights = await FeaturedSpotlight.find()
    .sort({ createdAt: -1 })
    .lean();

  const spotlights = rawSpotlights.map((s: any) => ({
    ...s,
    id: s._id.toString(),
    createdAt: s.createdAt.toISOString(),
  }));

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-2xl lg:text-3xl font-black text-[var(--foreground)] tracking-tight">Featured Spotlight</h1>
          <p className="text-[var(--foreground)]/50 font-medium">Prioritize your most important content announcements.</p>
        </div>
        <Link
          href="/admin/spotlight/new"
          className="btn-ios flex items-center gap-2 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white px-6 py-3 rounded-[var(--radius-full)] font-bold shadow-xl shadow-[var(--primary)]/20 hover:scale-105 active:scale-95"
        >
          <Plus size={20} />
          Create Spotlight
        </Link>
      </div>

      <div className="bg-[var(--surface-100)]/40 backdrop-blur-xl rounded-[var(--radius-xl)] border border-[var(--glass-border)] overflow-hidden shadow-2xl shadow-[var(--primary)]/5 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--glass-border)]">
                <th className="px-8 py-6 text-xs font-black text-[var(--foreground)]/40 uppercase tracking-widest">Promotion Details</th>
                <th className="px-8 py-6 text-xs font-black text-[var(--foreground)]/40 uppercase tracking-widest">Display Status</th>
                <th className="px-8 py-6 text-xs font-black text-[var(--foreground)]/40 uppercase tracking-widest">Created Date</th>
                <th className="px-8 py-6 text-xs font-black text-[var(--foreground)]/40 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--glass-border)]/50">
              {spotlights.map((spotlight) => (
                <tr key={spotlight.id} className="group hover:bg-[var(--primary)]/[0.02] transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 rounded-[var(--radius-md)] bg-[var(--warning)]/10 flex items-center justify-center text-[var(--warning)] shadow-inner group-hover:rotate-6 transition-transform">
                        {spotlight.image ? <ImageIcon size={20} /> : <Star size={20} />}
                      </div>
                      <div className="max-w-xs space-y-1">
                        <p className="text-base font-bold text-[var(--foreground)] leading-snug group-hover:text-[var(--primary)] transition-colors">
                          {spotlight.title}
                        </p>
                        <p className="text-xs text-[var(--foreground)]/40 font-medium line-clamp-1">{spotlight.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      {spotlight.isActive ? (
                        <div className="flex items-center gap-1.5 text-xs font-black text-[var(--success)] uppercase tracking-tighter bg-[var(--success)]/10 px-3 py-1.5 rounded-[var(--radius-full)] border border-[var(--success)]/20">
                          <CheckCircle2 size={14} />
                          Active Now
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-xs font-black text-[var(--foreground)]/40 uppercase tracking-tighter bg-[var(--surface-200)] px-3 py-1.5 rounded-[var(--radius-full)] border border-[var(--glass-border)]">
                          <XCircle size={14} />
                          Inactive
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-sm text-[var(--foreground)]/60">
                      <Calendar size={14} className="text-[var(--primary)]" />
                      <span className="font-bold">{format(new Date(spotlight.createdAt), 'MMM d, yyyy')}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 transition-all duration-300">
                      <Link
                        href={`/admin/spotlight/${spotlight.id}/edit`}
                        className="w-10 h-10 rounded-[var(--radius-sm)] bg-[var(--surface-200)] flex items-center justify-center text-[var(--foreground)]/60 hover:bg-[var(--secondary)] hover:text-white transition-all hover:-rotate-12"
                        title="Edit Spotlight"
                      >
                        <Edit3 size={18} />
                      </Link>
                      <DeleteForm action={handleDelete.bind(null, spotlight.id)}>
                        <button
                          type="submit"
                          className="w-10 h-10 rounded-[var(--radius-sm)] bg-[var(--surface-200)] flex items-center justify-center text-[var(--foreground)]/60 hover:bg-[var(--destructive)] hover:text-white transition-all hover:rotate-12"
                          title="Remove Spotlight"
                        >
                          <Trash2 size={18} />
                        </button>
                      </DeleteForm>
                    </div>
                  </td>
                </tr>
              ))}
              {spotlights.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-8 py-24 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-[var(--radius-lg)] bg-[var(--surface-200)] flex items-center justify-center text-[var(--foreground)]/30">
                        <Star size={32} />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold text-[var(--foreground)]">No Active Promotions</h3>
                        <p className="text-sm text-[var(--foreground)]/40 font-medium">Highlight your best content on the homepage.</p>
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
  );
}
