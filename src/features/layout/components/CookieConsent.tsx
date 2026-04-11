"use client";

import { useState, useEffect } from "react";
import { X, Check, ShieldAlert, Cookie } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CookiePreferences {
    essential: boolean; // Always true
    analytics: boolean;
    marketing: boolean;
}

export default function CookieConsent() {
    const [showBanner, setShowBanner] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [preferences, setPreferences] = useState<CookiePreferences>({
        essential: true,
        analytics: true,
        marketing: false,
    });

    useEffect(() => {
        // Check if user has already set preferences
        const savedConsent = localStorage.getItem("cookie_consent");
        if (!savedConsent) {
            // Slight delay before showing banner enhances the UX
            const timer = setTimeout(() => setShowBanner(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAcceptAll = () => {
        const fullConsent = { essential: true, analytics: true, marketing: true };
        savePreferences(fullConsent);
    };

    const handleAcceptSelected = () => {
        savePreferences(preferences);
    };

    const handleRejectAll = () => {
        const minimalConsent = { essential: true, analytics: false, marketing: false };
        savePreferences(minimalConsent);
    };

    const savePreferences = (prefs: CookiePreferences) => {
        localStorage.setItem("cookie_consent", JSON.stringify(prefs));
        
        // Also set a secure, httponly compliant cookie for cross-subdomain
        document.cookie = `cookie_consent=true; max-age=31536000; path=/; SameSite=Lax${process.env.NODE_ENV === "production" ? "; Secure" : ""}`;
        
        // You would typically trigger GTM or analytics initialization here
        if (prefs.analytics) {
            window.dispatchEvent(new Event("analytics_consent_granted"));
        }
        
        setShowBanner(false);
        setTimeout(() => setShowOptions(false), 500); // Reset options after exit animation
    };

    if (!showBanner) return null;

    return (
        <AnimatePresence>
            {showBanner && (
                <motion.div
                    initial={{ y: 200, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 200, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 25 }}
                    className="fixed bottom-[var(--space-4)] left-1/2 -translate-x-1/2 z-[100] w-full max-w-2xl px-[var(--space-2)]"
                >
                    <div className="liquid-glass rounded-[var(--radius-xl)] p-[var(--space-3)] sm:p-[var(--space-4)] shadow-2xl flex flex-col gap-[var(--space-3)] border border-[var(--glass-border)]">
                        {!showOptions ? (
                            <>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-[var(--radius-md)] bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] flex-shrink-0 mt-1">
                                        <Cookie size={24} />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <h3 className="text-xl font-black text-[var(--foreground)] tracking-tight">Privacy & Cookies</h3>
                                        <p className="text-sm text-[var(--foreground)]/60 font-medium leading-relaxed">
                                            We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking &quot;Accept All&quot;, you consent to our use of cookies.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mt-2">
                                    <button
                                        onClick={handleAcceptAll}
                                        className="btn-ios w-full sm:w-auto flex-1 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white px-6 py-3 rounded-[var(--radius-full)] font-bold shadow-xl shadow-[var(--primary)]/20"
                                    >
                                        Accept All
                                    </button>
                                    <button
                                        onClick={handleRejectAll}
                                        className="btn-ios w-full sm:w-auto flex-1 bg-[var(--surface-200)] text-[var(--foreground)] px-6 py-3 rounded-[var(--radius-full)] font-bold border border-[var(--glass-border)] hover:bg-[var(--surface-300)] transition-colors"
                                    >
                                        Reject Non-Essential
                                    </button>
                                    <button
                                        onClick={() => setShowOptions(true)}
                                        className="w-full sm:w-auto text-[10px] uppercase font-black tracking-widest text-[var(--foreground)]/40 hover:text-[var(--primary)] transition-colors py-2 px-4"
                                    >
                                        Manage
                                    </button>
                                </div>
                            </>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="space-y-4"
                            >
                                <div className="flex items-center justify-between pb-2 border-b border-[var(--glass-border)]">
                                    <h3 className="text-lg font-black text-[var(--foreground)]">Cookie Preferences</h3>
                                    <button 
                                        onClick={() => setShowOptions(false)}
                                        className="text-[var(--foreground)]/40 hover:text-[var(--foreground)] transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                                    <div className="flex items-center justify-between p-3 rounded-[var(--radius-md)] bg-[var(--surface-200)] border border-[var(--glass-border)]">
                                        <div className="pr-4">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="font-bold text-[var(--foreground)] text-sm">Essential</h4>
                                                <ShieldAlert size={14} className="text-[var(--success)]" />
                                            </div>
                                            <p className="text-xs text-[var(--foreground)]/50">Required for the website to function properly. Cannot be disabled.</p>
                                        </div>
                                        <div className="w-10 h-6 bg-[var(--success)]/20 border border-[var(--success)]/50 rounded-[var(--radius-full)] relative flex-shrink-0 cursor-not-allowed">
                                            <div className="absolute top-1/2 -translate-y-1/2 right-[3px] bg-[var(--success)] w-4 h-4 rounded-[var(--radius-full)] flex items-center justify-center">
                                                <Check size={10} className="text-white" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-3 rounded-[var(--radius-md)] border border-[var(--glass-border)] hover:bg-[var(--surface-200)] transition-colors cursor-pointer" onClick={() => setPreferences(prev => ({...prev, analytics: !prev.analytics}))}>
                                        <div className="pr-4">
                                            <h4 className="font-bold text-[var(--foreground)] text-sm mb-1">Analytics</h4>
                                            <p className="text-xs text-[var(--foreground)]/50">Helps us understand how visitors interact with our website.</p>
                                        </div>
                                        <div className={`w-10 h-6 rounded-[var(--radius-full)] border transition-all relative flex-shrink-0 ${preferences.analytics ? 'bg-[var(--primary)] border-[var(--primary)]' : 'bg-[var(--surface-300)] border-[var(--glass-border)]'}`}>
                                            <div className={`absolute top-[3px] bg-white w-4 h-4 rounded-[var(--radius-full)] shadow-sm transition-all ${preferences.analytics ? 'translate-x-5' : 'translate-x-[3px]'}`} />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-3 rounded-[var(--radius-md)] border border-[var(--glass-border)] hover:bg-[var(--surface-200)] transition-colors cursor-pointer" onClick={() => setPreferences(prev => ({...prev, marketing: !prev.marketing}))}>
                                        <div className="pr-4">
                                            <h4 className="font-bold text-[var(--foreground)] text-sm mb-1">Marketing</h4>
                                            <p className="text-xs text-[var(--foreground)]/50">Used to deliver advertisements more relevant to you and your interests.</p>
                                        </div>
                                        <div className={`w-10 h-6 rounded-[var(--radius-full)] border transition-all relative flex-shrink-0 ${preferences.marketing ? 'bg-[var(--primary)] border-[var(--primary)]' : 'bg-[var(--surface-300)] border-[var(--glass-border)]'}`}>
                                            <div className={`absolute top-[3px] bg-white w-4 h-4 rounded-[var(--radius-full)] shadow-sm transition-all ${preferences.marketing ? 'translate-x-5' : 'translate-x-[3px]'}`} />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 pt-4">
                                    <button
                                        onClick={handleAcceptSelected}
                                        className="btn-ios flex-1 bg-[var(--primary)] text-white px-6 py-3 rounded-[var(--radius-full)] font-bold shadow-lg shadow-[var(--primary)]/20"
                                    >
                                        Save Preferences
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
