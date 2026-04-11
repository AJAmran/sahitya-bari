"use client";

import { useState } from "react";
import { Reply, Send, X, Loader2, ShieldCheck, CheckCircle2 } from "lucide-react";
import { submitReply } from "@/features/comments/actions";
import { toast } from "sonner";

export default function AdminCommentReply({ commentId }: { commentId: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState("");

    const handleReply = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;

        setLoading(true);
        const toastId = toast.loading("Transmitting response...");

        try {
            await submitReply({ commentId, content });
            toast.success("Response published successfully", { id: toastId, icon: <CheckCircle2 className="text-green-500" /> });
            setIsOpen(false);
            setContent("");
        } catch (error) {
            toast.error("Failed to transmit response", { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="w-10 h-10 rounded-[var(--radius-sm)] bg-[var(--surface-200)] flex items-center justify-center text-[var(--foreground)]/40 hover:bg-[var(--primary)] hover:text-white transition-all shadow-sm group"
                title="Reply to Comment"
            >
                <Reply size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-0">
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
                        onClick={() => setIsOpen(false)}
                    />

                    <div className="relative w-full max-w-lg bg-[var(--surface-100)] rounded-[var(--radius-xl)] border border-[var(--glass-border)] shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden">
                        <div className="p-8 space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-[var(--radius-sm)] bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]">
                                        <ShieldCheck size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black text-[var(--foreground)] tracking-tight">System Response</h3>
                                        <p className="text-xs font-black text-[var(--foreground)]/50 uppercase tracking-widest">Formal Editorial Feedback</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-8 h-8 rounded-[var(--radius-lg)] flex items-center justify-center text-[var(--foreground)]/20 hover:bg-[var(--surface-300)] hover:text-[var(--foreground)] transition-all"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <form onSubmit={handleReply} className="space-y-6">
                                <div className="space-y-2">
                                    <textarea
                                        required
                                        rows={5}
                                        placeholder="Type your official response here..."
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        className="w-full bg-[var(--surface-200)]/50 rounded-[var(--radius-md)] border border-[var(--glass-border)] p-6 text-sm font-medium text-[var(--foreground)]/80 focus:ring-2 focus:ring-[var(--primary)] outline-none transition-all resize-none shadow-inner placeholder-[var(--foreground)]/30"
                                    />
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsOpen(false)}
                                        className="flex-1 py-4 rounded-[var(--radius-md)] bg-[var(--surface-200)] text-[var(--foreground)] text-[10px] font-black uppercase tracking-widest hover:bg-[var(--surface-300)] transition-all"
                                    >
                                        Discard
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading || !content.trim()}
                                        className="flex-[2] py-4 rounded-[var(--radius-md)] bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-[var(--primary)]/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                                    >
                                        {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                                        <span>Transmit Response</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
