"use client";

import { useState, useEffect } from 'react';
import { Save, Loader2, Sparkles, Globe, Share2, Type, Layout, CheckCircle2 } from 'lucide-react';
import { getSiteSettings } from '../api';
import { updateSiteSettings } from '../actions';
import { toast } from 'sonner';

export default function SettingsForm() {
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [settings, setSettings] = useState<Record<string, string>>({});

    useEffect(() => {
        getSiteSettings().then((data) => {
            setSettings(data);
            setFetching(false);
        });
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            siteTitle: formData.get('siteTitle') as string,
            heroTitle: formData.get('heroTitle') as string,
            heroSubtitle: formData.get('heroSubtitle') as string,
            youtubeUrl: formData.get('youtubeUrl') as string,
            facebookUrl: formData.get('facebookUrl') as string,
        };

        try {
            await updateSiteSettings(data);
            toast.success('Settings updated successfully', {
                icon: <CheckCircle2 className="text-green-500" />
            });
        } catch (error) {
            toast.error('Failed to update settings');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="relative">
                    <div className="w-12 h-12 rounded-[var(--radius-full)] border-4 border-[var(--primary)]/20 border-t-[var(--primary)] animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-[var(--radius-full)] bg-[var(--primary)] animate-pulse" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Branding Section */}
            <section className="bg-[var(--surface-100)]/40 backdrop-blur-xl rounded-[var(--radius-xl)] border border-[var(--glass-border)] p-10 space-y-8 shadow-2xl shadow-[var(--primary)]/5">
                <div className="flex items-center gap-4 pb-6 border-b border-[var(--glass-border)]">
                    <div className="w-12 h-12 rounded-[var(--radius-md)] bg-[var(--info)]/10 flex items-center justify-center text-[var(--info)]">
                        <Globe size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold tracking-tight">Branding & Identity</h2>
                        <p className="text-xs text-[var(--foreground)]/40 font-medium">Define how your brand appears across the web.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    <div className="space-y-2">
                        <label className="text-sm font-black text-[var(--foreground)]/60 uppercase tracking-widest flex items-center gap-2">
                            <Type size={14} className="text-[var(--primary)]" />
                            Site Title
                        </label>
                        <input
                            name="siteTitle"
                            type="text"
                            defaultValue={settings.siteTitle || "সাহিত্য বাড়ি"}
                            className="w-full px-6 py-4 rounded-[var(--radius-md)] border border-[var(--glass-border)] bg-[var(--surface-200)]/50 text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] focus:bg-[var(--surface-100)] transition-all outline-none font-bold placeholder-[var(--foreground)]/20 shadow-inner"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                        <div className="space-y-2">
                            <label className="text-sm font-black text-[var(--foreground)]/60 uppercase tracking-widest flex items-center gap-2">
                                <Layout size={14} className="text-[var(--primary)]" />
                                Hero Heading
                            </label>
                            <input
                                name="heroTitle"
                                type="text"
                                defaultValue={settings.heroTitle || "সাহিত্যের অঙিনায় আপনাকে স্বাগতম"}
                                className="w-full px-6 py-4 rounded-[var(--radius-md)] border border-[var(--glass-border)] bg-[var(--surface-200)]/50 text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] focus:bg-[var(--surface-100)] transition-all outline-none font-bold placeholder-[var(--foreground)]/20 shadow-inner"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-black text-[var(--foreground)]/60 uppercase tracking-widest flex items-center gap-2">
                                <Sparkles size={14} className="text-[var(--primary)]" />
                                Hero Description
                            </label>
                            <textarea
                                name="heroSubtitle"
                                defaultValue={settings.heroSubtitle || "Exploring the depths of Bengali literature, poetry, and storytelling. Join our community of literature lovers."}
                                rows={1}
                                className="w-full px-6 py-4 rounded-[var(--radius-md)] border border-[var(--glass-border)] bg-[var(--surface-200)]/50 text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] focus:bg-[var(--surface-100)] transition-all outline-none font-bold placeholder-[var(--foreground)]/20 shadow-inner resize-none"
                                autoFocus={false}
                                onInput={(e) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    target.style.height = 'auto';
                                    target.style.height = target.scrollHeight + 'px';
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Connection Section */}
            <section className="bg-[var(--surface-100)]/40 backdrop-blur-xl rounded-[var(--radius-xl)] border border-[var(--glass-border)] p-10 space-y-8 shadow-2xl shadow-[var(--primary)]/5">
                <div className="flex items-center gap-4 pb-6 border-b border-[var(--glass-border)]">
                    <div className="w-12 h-12 rounded-[var(--radius-md)] bg-[var(--secondary)]/10 flex items-center justify-center text-[var(--secondary)]">
                        <Share2 size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold tracking-tight">Social Integrations</h2>
                        <p className="text-xs text-[var(--foreground)]/40 font-medium">Connect your platform with external social networks.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-sm font-black text-[var(--foreground)]/60 uppercase tracking-widest">
                            YouTube Channel URL
                        </label>
                        <div className="relative group">
                            <input
                                name="youtubeUrl"
                                type="url"
                                defaultValue={settings.youtubeUrl || ""}
                                placeholder="https://youtube.com/@sahityabari"
                                className="w-full pl-14 pr-6 py-4 rounded-[var(--radius-md)] border border-[var(--glass-border)] bg-[var(--surface-200)]/50 text-[var(--foreground)] focus:ring-2 focus:ring-[var(--destructive)] focus:bg-[var(--surface-100)] transition-all outline-none font-bold placeholder-[var(--foreground)]/20 shadow-inner"
                            />
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-[var(--radius-sm)] bg-[var(--destructive)]/10 flex items-center justify-center text-[var(--destructive)]">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-black text-[var(--foreground)]/60 uppercase tracking-widest">
                            Facebook Page URL
                        </label>
                        <div className="relative group">
                            <input
                                name="facebookUrl"
                                type="url"
                                defaultValue={settings.facebookUrl || ""}
                                placeholder="https://facebook.com/sahityabari"
                                className="w-full pl-14 pr-6 py-4 rounded-[var(--radius-md)] border border-[var(--glass-border)] bg-[var(--surface-200)]/50 text-[var(--foreground)] focus:ring-2 focus:ring-[var(--info)] focus:bg-[var(--surface-100)] transition-all outline-none font-bold placeholder-[var(--foreground)]/20 shadow-inner"
                            />
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-[var(--radius-sm)] bg-[var(--info)]/10 flex items-center justify-center text-[var(--info)]">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="flex justify-end pt-8">
                <button
                    type="submit"
                    disabled={loading}
                    className="group btn-ios flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white rounded-[var(--radius-lg)] font-black shadow-2xl shadow-[var(--primary)]/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-6 h-6 animate-spin" />
                            <span>Deploying...</span>
                        </>
                    ) : (
                        <>
                            <Save size={22} className="group-hover:rotate-12 transition-transform" />
                            <span>Synchronize Changes</span>
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
