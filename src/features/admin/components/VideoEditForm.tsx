"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Video, Youtube, Type, AlignLeft, Tag, Loader2, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { updateVideo } from '@/features/videos/actions';
import { toast } from 'sonner';

export default function VideoEditForm({ video }: { video: any }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const toastId = toast.loading('Updating video repository...');

        try {
            const formData = new FormData(e.currentTarget);
            await updateVideo(video._id, formData);
            toast.success('Video updated successfully!', { id: toastId, icon: <CheckCircle2 className="text-green-500" /> });
            router.push('/admin/videos');
            router.refresh();
        } catch (error) {
            console.error('Failed to update video:', error);
            toast.error('Failed to update video. Please verify the data.', { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-10">
            <div className="flex flex-col gap-4">
                <Link
                    href="/admin/videos"
                    className="flex items-center gap-2 text-xs font-bold text-[var(--foreground)]/40 hover:text-[var(--primary)] transition-colors w-fit group"
                >
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Library
                </Link>
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-[var(--radius-md)] bg-[var(--secondary)]/10 flex items-center justify-center text-[var(--secondary)]">
                        <Video size={24} />
                    </div>
                    <h1 className="text-2xl lg:text-3xl font-black text-[var(--foreground)] tracking-tight">Refine Video Details</h1>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-[var(--surface-100)]/40 backdrop-blur-xl rounded-[var(--radius-xl)] border border-[var(--glass-border)] p-10 space-y-8 shadow-2xl shadow-[var(--primary)]/5">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-[var(--foreground)]/30 uppercase tracking-[0.2em] flex items-center gap-2">
                                <Type size={14} className="text-[var(--primary)]" />
                                Formal Title
                            </label>
                            <input
                                name="title"
                                type="text"
                                required
                                defaultValue={video.title}
                                placeholder="Enter the official video title..."
                                className="w-full bg-[var(--surface-200)]/50 rounded-[var(--radius-md)] border border-[var(--glass-border)] px-6 py-4 text-xl font-black text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] transition-all outline-none shadow-inner placeholder-[var(--foreground)]/10"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-[var(--foreground)]/30 uppercase tracking-[0.2em] flex items-center gap-2">
                                <AlignLeft size={14} className="text-[var(--primary)]" />
                                Comprehensive Description
                            </label>
                            <textarea
                                name="description"
                                rows={6}
                                defaultValue={video.description}
                                placeholder="Detail the contents or transcript summary..."
                                className="w-full bg-[var(--surface-200)]/50 rounded-[var(--radius-lg)] border border-[var(--glass-border)] p-8 text-base font-medium text-[var(--foreground)]/60 placeholder-[var(--foreground)]/10 focus:ring-2 focus:ring-[var(--primary)] transition-all outline-none h-64 resize-none shadow-inner"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-[var(--surface-100)]/40 backdrop-blur-xl rounded-[var(--radius-xl)] border border-[var(--glass-border)] p-8 space-y-8 shadow-2xl shadow-[var(--primary)]/5">
                        <h3 className="text-sm font-black text-[var(--foreground)]/50 uppercase tracking-[0.2em] pb-4 border-b border-[var(--glass-border)]">Platform Meta</h3>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-[var(--foreground)]/30 uppercase tracking-widest flex items-center gap-2">
                                    <Youtube size={14} className="text-[#FF0000]" />
                                    YouTube Link
                                </label>
                                <input
                                    name="youtubeLink"
                                    type="url"
                                    defaultValue={video.youtubeId ? `https://www.youtube.com/watch?v=${video.youtubeId}` : ''}
                                    placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                                    className="w-full bg-[var(--surface-200)]/50 rounded-[var(--radius-md)] border border-[var(--glass-border)] px-4 py-3 text-xs font-bold text-[var(--foreground)] focus:ring-2 focus:ring-[var(--destructive)] transition-all outline-none shadow-inner placeholder-[var(--foreground)]/20"
                                />
                                <p className="text-[10px] text-[var(--foreground)]/40 font-medium italic">Optional for upcoming videos</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black text-[var(--foreground)]/30 uppercase tracking-widest flex items-center gap-2">
                                    <AlignLeft size={12} />
                                    Thumbnail / Image Link
                                </label>
                                <input
                                    name="thumbnail"
                                    type="url"
                                    defaultValue={video.thumbnail}
                                    placeholder="e.g. https://images.unsplash.com/photo-..."
                                    className="w-full bg-[var(--surface-200)]/50 rounded-[var(--radius-md)] border border-[var(--glass-border)] px-4 py-3 text-xs font-bold text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] transition-all outline-none shadow-inner"
                                />
                                <p className="text-[10px] text-[var(--foreground)]/40 font-medium italic">Required if no YouTube link is provided</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black text-[var(--foreground)]/30 uppercase tracking-widest flex items-center gap-2">
                                    <Tag size={12} />
                                    Classification
                                </label>
                                <select
                                    name="category"
                                    defaultValue={video.category}
                                    className="w-full bg-[var(--surface-200)]/50 rounded-[var(--radius-md)] border border-[var(--glass-border)] px-4 py-3 text-xs font-bold text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] transition-all outline-none appearance-none"
                                >
                                    <option>Literature</option>
                                    <option>Poetry</option>
                                    <option>Review</option>
                                    <option>Recitation</option>
                                    <option>News</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-[var(--glass-border)]">
                            <label className="text-xs font-black text-[var(--foreground)]/30 uppercase tracking-widest flex items-center gap-2">
                                Feature Status
                            </label>
                            <div className="flex flex-col gap-3">
                                <label className="flex items-center gap-3 cursor-pointer group/toggle">
                                    <div className="relative">
                                        <input type="checkbox" name="isUpcoming" defaultChecked={video.isUpcoming} className="sr-only peer" />
                                        <div className="w-10 h-6 bg-[var(--surface-300)] rounded-[var(--radius-full)] border border-[var(--glass-border)] peer peer-checked:bg-[var(--secondary)] peer-checked:border-[var(--secondary)] transition-all after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:shadow-sm after:rounded-[var(--radius-full)] after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4"></div>
                                    </div>
                                    <span className="text-xs font-bold text-[var(--foreground)]/60 group-hover/toggle:text-[var(--secondary)] transition-colors">Set as Upcoming</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer group/toggle">
                                    <div className="relative">
                                        <input type="checkbox" name="isPopular" defaultChecked={video.isPopular} className="sr-only peer" />
                                        <div className="w-10 h-6 bg-[var(--surface-300)] rounded-[var(--radius-full)] border border-[var(--glass-border)] peer peer-checked:bg-[var(--warning)] peer-checked:border-[var(--warning)] transition-all after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:shadow-sm after:rounded-[var(--radius-full)] after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4"></div>
                                    </div>
                                    <span className="text-xs font-bold text-[var(--foreground)]/60 group-hover/toggle:text-[var(--warning)] transition-colors">Mark as Popular</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[var(--surface-100)]/40 backdrop-blur-xl rounded-[var(--radius-xl)] border border-[var(--glass-border)] p-8 space-y-6 shadow-2xl shadow-[var(--primary)]/5">
                        <div className="flex flex-col gap-3">
                            <button
                                type="submit"
                                disabled={loading}
                                className="group btn-ios flex items-center justify-center gap-3 w-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white py-5 rounded-[var(--radius-lg)] font-black shadow-2xl shadow-[var(--primary)]/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                            >
                                {loading ? <Loader2 size={24} className="animate-spin" /> : <Save size={24} className="group-hover:rotate-12 transition-transform" />}
                                <span>Update Record</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="btn-ios flex items-center justify-center gap-3 w-full bg-[var(--surface-200)]/50 border border-[var(--glass-border)] text-[var(--foreground)] py-4 rounded-[var(--radius-lg)] font-bold hover:bg-[var(--surface-300)]/50 transition-all text-sm"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
