"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "motion/react";

export function ThemeToggle() {
    const { setTheme, theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    // Avoid hydration mismatch
    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <>
                <div className="absolute -inset-0.5 rounded-[var(--radius-xl)] bg-gradient-to-tr from-[var(--primary)] to-[var(--secondary)] opacity-50 blur-sm flex" />
                <div className="relative">
                    <div className="w-10 h-10 rounded-[var(--radius-xl)] bg-[var(--surface-200)]/50 border border-[var(--glass-border)]" />
                </div>
            </>
        );
    }

    const toggleTheme = () => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
    };

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="group relative w-10 h-10 flex items-center justify-center rounded-[var(--radius-xl)] bg-[var(--surface-200)]/50 border border-[var(--glass-border)] text-[var(--foreground)] hover:bg-[var(--primary)] hover:text-white transition-all duration-300"
            aria-label="Toggle theme"
        >
            <AnimatePresence mode="wait">
                {resolvedTheme === "dark" ? (
                    <motion.div
                        key="moon"
                        initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                        <Moon size={18} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="sun"
                        initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                        <Sun size={18} />
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="absolute inset-0 z-0">
                <span className="absolute inset-0 bg-[var(--primary)] blur-lg opacity-0 group-hover:opacity-20 transition-opacity rounded-[var(--radius-xl)]" />
            </div>
        </button>
    );
}
