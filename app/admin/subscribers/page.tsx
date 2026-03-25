import dbConnect from "@/lib/mongodb"
import NewsletterSubscription from "@/lib/models/NewsletterSubscription"
import { format } from "date-fns"
import { Trash2, UserPlus, Mail, Calendar, CheckCircle2, XCircle, Search } from "lucide-react"
import { revalidatePath } from "next/cache"
import DeleteForm from "@/components/admin/DeleteForm"

async function deleteSubscriber(id: string) {
    "use server"
    await dbConnect()
    await NewsletterSubscription.findByIdAndDelete(id)
    revalidatePath("/admin/subscribers")
}

export default async function AdminSubscribersPage() {
    await dbConnect()
    const rawSubscribers = await NewsletterSubscription.find()
        .sort({ createdAt: -1 })
        .lean()

    const subscribers = rawSubscribers.map((s: any) => ({
        ...s,
        id: s._id.toString(),
        createdAt: s.createdAt.toISOString(),
    }))

    return (
        <div className="space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-2xl lg:text-3xl font-black text-[var(--foreground)] tracking-tight">Subscribers</h1>
                    <p className="text-[var(--foreground)]/50 font-medium">Manage your growing newsletter audience.</p>
                </div>
                <div className="px-6 py-3 rounded-[var(--radius-md)] bg-[var(--success)]/10 border border-[var(--success)]/20 flex items-center gap-3 shadow-sm">
                    <div className="w-8 h-8 rounded-[var(--radius-sm)] bg-[var(--success)] flex items-center justify-center text-white shadow-lg shadow-[var(--success)]/20">
                        <UserPlus size={16} />
                    </div>
                    <div>
                        <p className="text-xs font-black text-[var(--success)] uppercase tracking-widest leading-none mb-1">Active List</p>
                        <p className="text-xl font-black text-[var(--foreground)] leading-none">{subscribers.length}</p>
                    </div>
                </div>
            </div>

            <div className="bg-[var(--surface-100)]/40 backdrop-blur-xl rounded-[var(--radius-xl)] border border-[var(--glass-border)] overflow-hidden shadow-2xl shadow-black/5 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-[var(--glass-border)]">
                                <th className="px-8 py-6 text-xs font-black text-[var(--foreground)]/40 uppercase tracking-widest">Subscriber Identity</th>
                                <th className="px-8 py-6 text-xs font-black text-[var(--foreground)]/40 uppercase tracking-widest">Contact Status</th>
                                <th className="px-8 py-6 text-xs font-black text-[var(--foreground)]/40 uppercase tracking-widest">Joined Date</th>
                                <th className="px-8 py-6 text-xs font-black text-[var(--foreground)]/40 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--glass-border)]/50">
                            {subscribers.map((subscriber) => (
                                <tr key={subscriber.id} className="group hover:bg-[var(--primary)]/[0.02] transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-[var(--radius-sm)] bg-[var(--surface-200)] flex items-center justify-center text-[var(--primary)] shadow-inner">
                                                <Mail size={18} />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-base font-bold text-[var(--foreground)] leading-tight">{subscriber.email}</span>
                                                <span className="text-xs text-[var(--foreground)]/50 font-medium uppercase tracking-tighter mt-1">Verified User</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            {subscriber.isActive ? (
                                                <div className="flex items-center gap-1.5 text-xs font-black text-[var(--success)] uppercase tracking-tighter bg-[var(--success)]/10 px-3 py-1.5 rounded-[var(--radius-full)] border border-[var(--success)]/20">
                                                    <CheckCircle2 size={14} />
                                                    Active
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
                                            <div className="flex flex-col leading-tight">
                                                <span className="font-bold">{format(new Date(subscriber.createdAt), "MMM d, yyyy")}</span>
                                                <span className="text-xs font-bold text-[var(--foreground)]/50 uppercase tracking-tighter">Subscription Start</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2 transition-all duration-300">
                                            <DeleteForm action={deleteSubscriber.bind(null, subscriber.id)}>
                                                <button
                                                    type="submit"
                                                    className="w-10 h-10 rounded-[var(--radius-sm)] bg-[var(--surface-200)] flex items-center justify-center text-[var(--foreground)]/40 hover:bg-[var(--destructive)] hover:text-white transition-all duration-300 hover:rotate-12 active:scale-95"
                                                    title="Remove Subscriber"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </DeleteForm>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {subscribers.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-8 py-24 text-center">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-16 h-16 rounded-[var(--radius-lg)] bg-[var(--surface-200)] flex items-center justify-center text-[var(--foreground)]/20">
                                                <UserPlus size={32} />
                                            </div>
                                            <div className="space-y-1">
                                                <h3 className="text-xl font-bold text-[var(--foreground)]">No Subscribers</h3>
                                                <p className="text-sm text-[var(--foreground)]/40 font-medium">Your audience list is currently empty.</p>
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
