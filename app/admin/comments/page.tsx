import dbConnect from "@/lib/mongodb";
import Comment from "@/lib/models/Comment";
import { format } from "date-fns";
import { MessageSquare, Trash2, Reply, ShieldCheck, User, AtSign, Calendar, ArrowUpRight, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { getAllComments, deleteComment, toggleCommentApproval } from "@/app/actions/comments";
import DeleteForm from "@/components/admin/DeleteForm";
import AdminCommentReply from "@/components/admin/AdminCommentReply";


export default async function AdminCommentsPage() {
    const comments = await getAllComments();

    return (
        <div className="space-y-10">
            <div className="space-y-1">
                <h1 className="text-4xl font-black text-[var(--foreground)] tracking-tight">Community Feedback</h1>
                <p className="text-[var(--foreground)]/50 font-medium">Manage and respond to reader interactions.</p>
            </div>

            <div className="bg-[var(--surface-100)]/40 backdrop-blur-xl rounded-[var(--radius-xl)] border border-[var(--glass-border)] overflow-hidden shadow-2xl shadow-black/5">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-[var(--glass-border)]">
                                <th className="px-8 py-6 text-xs font-black text-[var(--foreground)]/40 uppercase tracking-widest">Contributor</th>
                                <th className="px-8 py-6 text-xs font-black text-[var(--foreground)]/40 uppercase tracking-widest">Narrative Content</th>
                                <th className="px-8 py-6 text-xs font-black text-[var(--foreground)]/40 uppercase tracking-widest">Timestamp</th>
                                <th className="px-8 py-6 text-xs font-black text-[var(--foreground)]/40 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--glass-border)]/50">
                            {comments.map((comment: any) => (
                                <tr key={comment._id} className="group hover:bg-[var(--primary)]/[0.02] transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] shadow-sm">
                                                <User size={18} />
                                            </div>
                                            <div className="space-y-0.5">
                                                <p className="text-sm font-bold text-[var(--foreground)] line-clamp-1">{comment.author}</p>
                                                <div className="flex items-center gap-1.5 text-xs text-[var(--foreground)]/50 font-medium lowercase italic">
                                                    <AtSign size={10} />
                                                    {comment.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="max-w-md space-y-3">
                                            <div className="flex flex-col gap-1">
                                                <Link
                                                    href={`/blog/${comment.blogPostId?.slug}`}
                                                    target="_blank"
                                                    className="text-xs font-black uppercase tracking-widest text-[var(--primary)] hover:underline flex items-center gap-1"
                                                >
                                                    {comment.blogPostId?.title || "Unknown Manuscript"}
                                                    <ArrowUpRight size={14} />
                                                </Link>
                                                <p className="text-sm text-[var(--foreground)]/70 leading-relaxed line-clamp-2">
                                                    {comment.content}
                                                </p>
                                            </div>
                                            {comment.replies && comment.replies.length > 0 && (
                                                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[var(--success)]">
                                                    <ShieldCheck size={14} />
                                                    <span>{comment.replies.length} Responses Synced</span>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2 text-[var(--foreground)]/40 font-bold text-xs">
                                            <Calendar size={12} />
                                            {format(new Date(comment.createdAt), 'MMM d, h:mm a')}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <AdminCommentReply commentId={comment._id} />
                                            <DeleteForm action={deleteComment.bind(null, comment._id)}>
                                                <button
                                                    type="submit"
                                                    className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--surface-200)] flex items-center justify-center text-[var(--foreground)]/40 hover:bg-[var(--destructive)] hover:text-white transition-all shadow-sm"
                                                    title="Delete Comment"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </DeleteForm>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {comments.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-8 py-24 text-center">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-16 h-16 rounded-[var(--radius-lg)] bg-[var(--surface-200)] flex items-center justify-center text-[var(--foreground)]/10">
                                                <MessageSquare size={32} />
                                            </div>
                                            <div className="space-y-1">
                                                <h3 className="text-xl font-bold text-[var(--foreground)]">Silence in the Hall</h3>
                                                <p className="text-sm text-[var(--foreground)]/40 font-medium">No comments have been cataloged yet.</p>
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
