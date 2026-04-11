import { format } from "date-fns"
import { Trash2, Mail, MailOpen, CheckCircle, Clock, AtSign, Calendar, Sparkles } from "lucide-react"
import DeleteForm from "@/features/admin/components/DeleteForm"
import { getMessagesFresh } from "@/features/contact/api"
import { deleteMessage, toggleRead } from "@/features/contact/actions"
import { Pagination } from "@/components/ui/Pagination"

interface AdminMessagesPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function AdminMessagesPage({ searchParams }: AdminMessagesPageProps) {
    const params = await searchParams;
    const currentPage = Number(params.page) || 1;
    const { messages, total, totalPages } = await getMessagesFresh({ page: currentPage, limit: 10 });
    const unreadCount = messages.filter((m: any) => !m.isRead).length;

    return (
        <div className="space-y-10">
            {/* Header section with Stats */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-2xl lg:text-3xl font-black text-[var(--foreground)] tracking-tight">Inbox</h1>
                    <p className="text-[var(--foreground)]/50 font-medium">Manage inquiries and feedback from your readers.</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="px-6 py-3 rounded-[var(--radius-md)] bg-[var(--warning)]/10 border border-[var(--warning)]/20 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-[var(--radius-sm)] bg-[var(--warning)] flex items-center justify-center text-white shadow-lg shadow-[var(--warning)]/20">
                            <Clock size={16} />
                        </div>
                        <div>
                            <p className="text-xs font-black text-[var(--warning)] uppercase tracking-widest leading-none mb-1">Unread</p>
                            <p className="text-xl font-black text-[var(--foreground)] leading-none">{unreadCount}</p>
                        </div>
                    </div>
                    <div className="px-6 py-3 rounded-[var(--radius-md)] bg-[var(--info)]/10 border border-[var(--info)]/20 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-[var(--radius-sm)] bg-[var(--info)] flex items-center justify-center text-[var(--surface-100)] shadow-lg shadow-[var(--info)]/20">
                            <Mail size={16} />
                        </div>
                        <div>
                            <p className="text-xs font-black text-[var(--info)] uppercase tracking-widest leading-none mb-1">Total</p>
                            <p className="text-xl font-black text-[var(--foreground)] leading-none">{total}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                {messages.map((message: any) => (
                    <div
                        key={message._id}
                        className={`group relative bg-[var(--surface-100)]/40 backdrop-blur-xl rounded-[var(--radius-xl)] border transition-all duration-500 hover:scale-[1.005] hover:shadow-2xl ${message.isRead
                            ? "border-[var(--glass-border)] opacity-80"
                            : "border-[var(--primary)]/30 shadow-xl shadow-[var(--primary)]/5 ring-1 ring-[var(--primary)]/10"
                            }`}
                    >
                        <div className="p-8">
                            <div className="flex flex-col lg:flex-row gap-8">
                                {/* Left Info Column */}
                                <div className="lg:w-72 space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-14 h-14 rounded-[var(--radius-md)] flex items-center justify-center shadow-lg transition-transform group-hover:rotate-6 ${message.isRead ? "bg-[var(--surface-300)] text-[var(--foreground)]/40" : "bg-gradient-to-tr from-[var(--primary)] to-[var(--secondary)] text-white"
                                            }`}>
                                            {message.isRead ? <MailOpen size={24} /> : <Mail size={24} />}
                                        </div>
                                        <div>
                                            <h4 className="font-black text-[var(--foreground)] tracking-tight">{message.name}</h4>
                                            <p className="text-xs text-[var(--foreground)]/40 font-medium flex items-center gap-1">
                                                <AtSign size={10} />
                                                {message.email}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-3 pt-4 border-t border-[var(--glass-border)]">
                                        <div className="flex items-center gap-3 text-xs font-bold text-[var(--foreground)]/30 uppercase tracking-tighter">
                                            <Calendar size={14} className="text-[var(--primary)]" />
                                            {format(new Date(message.createdAt), "MMM d, yyyy")}
                                        </div>
                                        <div className="flex items-center gap-3 text-xs font-bold text-[var(--foreground)]/30 uppercase tracking-tighter">
                                            <Clock size={14} className="text-[var(--primary)]" />
                                            {format(new Date(message.createdAt), "h:mm a")}
                                        </div>
                                    </div>
                                </div>

                                {/* Content Column */}
                                <div className="flex-1 space-y-4">
                                    <div className="flex items-start justify-between gap-4">
                                        <h3 className={`text-xl font-black tracking-tight leading-tight ${message.isRead ? "text-[var(--foreground)]/60" : "text-[var(--foreground)]"}`}>
                                            {message.subject || "Inquiry from Website"}
                                        </h3>
                                        {!message.isRead && (
                                            <span className="flex items-center gap-1.5 text-xs font-black text-[var(--warning)] uppercase tracking-tighter bg-[var(--warning)]/10 px-3 py-1.5 rounded-[var(--radius-full)] border border-[var(--warning)]/20 whitespace-nowrap">
                                                <Sparkles size={14} />
                                                New Message
                                            </span>
                                        )}
                                    </div>

                                    <div className="bg-[var(--surface-200)]/30 rounded-[var(--radius-lg)] p-6 border border-[var(--glass-border)] shadow-inner">
                                        <p className="text-[var(--foreground)]/70 text-base leading-relaxed whitespace-pre-line font-medium">
                                            {message.message}
                                        </p>
                                    </div>
                                </div>

                                {/* Actions Column */}
                                <div className="flex lg:flex-col items-center justify-end gap-3 shrink-0">
                                    <form action={toggleRead.bind(null, message._id, message.isRead)}>
                                        <button
                                            type="submit"
                                            className={`w-12 h-12 rounded-[var(--radius-md)] flex items-center justify-center transition-all duration-300 ${message.isRead
                                                ? "bg-[var(--surface-200)] text-[var(--foreground)]/40 hover:bg-[var(--primary)]/10 hover:text-[var(--primary)]"
                                                : "bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/20 hover:scale-110 active:scale-95"
                                                }`}
                                            title={message.isRead ? "Mark as unread" : "Mark as read"}
                                        >
                                            <CheckCircle size={24} />
                                        </button>
                                    </form>
                                    <DeleteForm action={deleteMessage.bind(null, message._id)}>
                                        <button
                                            type="submit"
                                            className="w-12 h-12 rounded-[var(--radius-md)] bg-[var(--surface-200)] text-[var(--foreground)]/40 flex items-center justify-center hover:bg-[var(--destructive)] hover:text-white transition-all duration-300 hover:rotate-12 active:scale-95"
                                            title="Delete message"
                                        >
                                            <Trash2 size={24} />
                                        </button>
                                    </DeleteForm>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {messages.length === 0 && (
                    <div className="bg-[var(--surface-100)]/40 backdrop-blur-xl rounded-[var(--radius-xl)] border border-[var(--glass-border)] p-24 text-center">
                        <div className="w-24 h-24 rounded-[var(--radius-lg)] bg-[var(--surface-200)] flex items-center justify-center text-[var(--foreground)]/10 mx-auto mb-8 shadow-inner">
                            <Mail size={48} />
                        </div>
                        <h3 className="text-3xl font-black text-[var(--foreground)] tracking-tight mb-2">Clean Inbox</h3>
                        <p className="text-lg text-[var(--foreground)]/40 font-medium">No messages to display. Check back later!</p>
                    </div>
                )}
            </div>

            {totalPages > 1 && (
              <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl="/admin/messages" />
            )}
        </div>
    )
}
