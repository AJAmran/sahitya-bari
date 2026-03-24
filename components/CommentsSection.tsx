"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import { submitComment, submitReply, deleteComment, toggleCommentApproval } from "@/app/actions/comments"
import { MessageSquare, Send, User, AtSign, Loader2, Reply, ShieldCheck, Quote, Trash2, Eye, EyeOff } from "lucide-react"
import { format } from "date-fns"
import { MotionDiv } from "@/components/Motion"

const commentFormSchema = z.object({
    author: z.string().min(1, "Name required"),
    email: z.string().email("Invalid email"),
    content: z.string().min(5, "Comment too short"),
})

const replyFormSchema = z.object({
    content: z.string().min(1, "Reply empty"),
})

interface CommentItemProps {
    comment: any
    isAdmin: boolean
    blogPostId: string
}

function CommentItem({ comment, isAdmin }: CommentItemProps) {
    const [showReplyForm, setShowReplyForm] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(replyFormSchema),
    })

    const onReplySubmit = async (data: any) => {
        setSubmitting(true)
        const toastId = toast.loading("Sending...")
        try {
            await submitReply({
                commentId: comment._id,
                content: data.content
            })
            toast.success("Reply posted", { id: toastId })
            reset()
            setShowReplyForm(false)
        } catch (error) {
            toast.error("Error", { id: toastId })
        } finally {
            setSubmitting(false)
        }
    }

    const handleDelete = async () => {
        if (!confirm("Remove this entry permanently?")) return
        const toastId = toast.loading("Removing...")
        try {
            await deleteComment(comment._id)
            toast.success("Entry removed", { id: toastId })
        } catch (error) {
            toast.error("Failed to remove", { id: toastId })
        }
    }

    const handleToggleApproval = async () => {
        const toastId = toast.loading("Updating status...")
        try {
            await toggleCommentApproval(comment._id)
            toast.success("Status updated", { id: toastId })
        } catch (error) {
            toast.error("Update failed", { id: toastId })
        }
    }

    return (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="p-5 rounded-[var(--radius-3xl)] bg-[var(--surface-50)] border border-[var(--glass-border)] hover:bg-[var(--surface-100)] transition-all">
                <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-[var(--radius-xl)] bg-[var(--surface-200)] border border-[var(--glass-border)] flex items-center justify-center text-[var(--foreground)]/20 shrink-0">
                        <User size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-4 mb-2">
                            <div>
                                <h4 className="text-sm font-black font-bengali text-[var(--foreground)] truncate">{comment.author}</h4>
                                <p className="text-[8px] uppercase font-black tracking-widest text-[var(--foreground)]/30 flex items-center gap-2">
                                    {format(new Date(comment.createdAt), 'MMM d, h:mm a')}
                                    {!comment.isApproved && (
                                        <span className="px-1.5 py-0.5 rounded bg-[var(--destructive)]/10 text-[var(--destructive)] border border-[var(--destructive)]/10">Hidden</span>
                                    )}
                                </p>
                            </div>
                            {isAdmin && (
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={handleToggleApproval}
                                        className={`p-2 rounded-[var(--radius-lg)] transition-all ${comment.isApproved ? 'hover:bg-[var(--warning)]/5 text-[var(--warning)]' : 'bg-[var(--primary)]/10 text-[var(--primary)]'}`}
                                        title={comment.isApproved ? "Hide Comment" : "Approve Comment"}
                                    >
                                        {comment.isApproved ? <EyeOff size={14} /> : <Eye size={14} />}
                                    </button>
                                    <button
                                        onClick={() => setShowReplyForm(!showReplyForm)}
                                        className="p-2 rounded-[var(--radius-lg)] hover:bg-[var(--primary)]/5 text-[var(--primary)] transition-all"
                                        title="Reply as Admin"
                                    >
                                        <Reply size={14} />
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="p-2 rounded-[var(--radius-lg)] hover:bg-[var(--destructive)]/5 text-[var(--destructive)] transition-all"
                                        title="Delete Permanently"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            )}
                        </div>
                        <p className="text-[var(--foreground)]/80 leading-relaxed text-sm font-light">
                            {comment.content}
                        </p>
                    </div>
                </div>
            </div>

            {showReplyForm && (
                <div className="ml-8 p-5 rounded-[var(--radius-2xl)] bg-[var(--primary)]/[0.02] border border-[var(--glass-border)] space-y-3">
                    <div className="flex items-center gap-2 text-[var(--primary)]">
                        <ShieldCheck size={14} />
                        <span className="text-[9px] font-black uppercase tracking-widest">ADMIN RESPONSE</span>
                    </div>
                    <form onSubmit={handleSubmit(onReplySubmit)} className="space-y-4">
                        <textarea
                            {...register("content")}
                            placeholder="Type your response..."
                            className="w-full bg-[var(--surface-200)]/50 rounded-[var(--radius-md)] border border-[var(--glass-border)] p-4 text-sm font-medium text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)]/30 outline-none h-24 transition-all resize-none shadow-inner placeholder-[var(--foreground)]/20"
                        />
                        <div className="flex items-center justify-end gap-4">
                            <button
                                type="button"
                                onClick={() => setShowReplyForm(false)}
                                className="text-[9px] font-black uppercase tracking-widest text-[var(--foreground)]/30 hover:text-[var(--foreground)]/50"
                            >
                                Discard
                            </button>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="bg-[var(--foreground)] text-[var(--background)] px-5 py-2 rounded-[var(--radius-lg)] text-[9px] font-black uppercase tracking-widest flex items-center gap-2"
                            >
                                {submitting ? <Loader2 size={12} className="animate-spin" /> : <Send size={12} />}
                                <span>Publish</span>
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {comment.replies && comment.replies.length > 0 && (
                <div className="ml-8 space-y-4 border-l border-[var(--glass-border)] pl-6">
                    {comment.replies.map((reply: any, idx: number) => (
                        <div key={idx} className="flex gap-3 items-start">
                            <div className="w-8 h-8 rounded-[var(--radius-lg)] bg-[var(--primary)]/5 border border-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] shrink-0">
                                <ShieldCheck size={14} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <h5 className="text-xs font-black text-[var(--foreground)] font-bengali">{reply.author}</h5>
                                    <span className="px-1.5 py-0.5 rounded bg-[var(--primary)]/10 text-[var(--primary)] text-[7px] font-black uppercase border border-[var(--primary)]/10">Verified</span>
                                </div>
                                <div className="text-[var(--foreground)]/70 text-sm font-light leading-relaxed p-4 rounded-[var(--radius-xl)] bg-[var(--surface-50)] border border-[var(--glass-border)] relative">
                                    <Quote size={10} className="absolute top-2 right-2 text-[var(--primary)] opacity-10" />
                                    {reply.content}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

interface CommentsSectionProps {
    blogPostId: string
    initialComments: any[]
    isAdmin?: boolean
}

export default function CommentsSection({ blogPostId, initialComments, isAdmin = false }: CommentsSectionProps) {
    const [submitting, setSubmitting] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(commentFormSchema),
        defaultValues: { author: "", email: "", content: "" }
    })

    const onSubmit = async (data: any) => {
        setSubmitting(true)
        const toastId = toast.loading("Processing...")
        try {
            await submitComment({ ...data, blogPostId })
            toast.success("Success", { id: toastId })
            reset()
        } catch (error) {
            toast.error("Error", { id: toastId })
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="mt-20 pt-12 border-t border-[var(--glass-border)]">
            <div className="space-y-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--glass-border)] pb-8">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-black font-bengali text-[var(--foreground)]">সংবাদ বিনিময়</h2>
                        <p className="text-sm font-light text-[var(--foreground)]/40 leading-relaxed">
                            Join the dialogue. Share your perspectives.
                        </p>
                    </div>
                    <div className="px-4 py-2 rounded-[var(--radius-full)] bg-[var(--surface-50)] border border-[var(--glass-border)] text-[9px] font-black uppercase tracking-widest text-[var(--primary)]">
                        {initialComments.length} Registered Thoughts
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-12 items-start">
                    {/* Left Column: Form */}
                    <div className="lg:col-span-5 lg:sticky lg:top-36">
                        <div className="p-7 rounded-[2rem] bg-[var(--surface-50)] border border-[var(--glass-border)] space-y-6">
                            <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-[var(--foreground)]/20">New Entry</h3>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[8px] font-black uppercase tracking-widest text-[var(--foreground)]/30 pl-1">Name</label>
                                        <div className="relative">
                                            <User size={12} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--foreground)]/20" />
                                            <input
                                                {...register("author")}
                                                placeholder="Your Name"
                                                className="w-full bg-[var(--surface-200)]/50 rounded-[var(--radius-md)] border border-[var(--glass-border)] pl-10 pr-4 h-12 text-sm font-medium text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)]/30 outline-none transition-all placeholder:text-[var(--foreground)]/20 shadow-inner"
                                            />
                                        </div>
                                        {errors.author && <p className="text-red-500 text-[8px] font-bold uppercase pl-1">{String(errors.author.message)}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[8px] font-black uppercase tracking-widest text-[var(--foreground)]/30 pl-1">Email</label>
                                        <div className="relative">
                                            <AtSign size={12} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--foreground)]/20" />
                                            <input
                                                {...register("email")}
                                                placeholder="Your Email"
                                                className="w-full bg-[var(--surface-200)]/50 rounded-[var(--radius-md)] border border-[var(--glass-border)] pl-10 pr-4 h-12 text-sm font-medium text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)]/30 outline-none transition-all placeholder:text-[var(--foreground)]/20 shadow-inner"
                                            />
                                        </div>
                                        {errors.email && <p className="text-red-500 text-[8px] font-bold uppercase pl-1">{String(errors.email.message)}</p>}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[8px] font-black uppercase tracking-widest text-[var(--foreground)]/30 pl-1">Comment</label>
                                    <textarea
                                        {...register("content")}
                                        placeholder="Type your thoughts..."
                                        className="w-full bg-[var(--surface-200)]/50 rounded-[var(--radius-md)] border border-[var(--glass-border)] p-5 text-sm font-medium text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)]/30 outline-none h-36 transition-all resize-none placeholder:text-[var(--foreground)]/20 shadow-inner"
                                    />
                                    {errors.content && <p className="text-red-500 text-[8px] font-bold uppercase pl-1">{String(errors.content.message)}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full py-4 rounded-[var(--radius-xl)] bg-[var(--foreground)] text-[var(--background)] font-black text-[9px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 active:scale-95 transition-all"
                                >
                                    {submitting ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                                    <span>Transmit Entry</span>
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Right Column: List */}
                    <div className="lg:col-span-7 space-y-6">
                        {initialComments.length === 0 ? (
                            <div className="text-center py-20 rounded-[2.5rem] border border-dashed border-[var(--glass-border)]">
                                <MessageSquare size={32} className="text-[var(--foreground)]/10 mx-auto mb-4" />
                                <h3 className="text-[10px] font-black text-[var(--foreground)]/20 uppercase tracking-[0.3em]">No Entries Yet</h3>
                            </div>
                        ) : (
                            <div className="space-y-8">
                                {initialComments.map((comment) => (
                                    <CommentItem
                                        key={comment._id}
                                        comment={comment}
                                        isAdmin={isAdmin}
                                        blogPostId={blogPostId}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
