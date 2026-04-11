"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={cn(
        "w-10 h-10 rounded-[var(--radius-xl)] bg-[var(--surface-200)]/50 border border-[var(--glass-border)] animate-pulse",
        className
      )} />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "group relative w-10 h-10 flex items-center justify-center rounded-[var(--radius-xl)] bg-[var(--surface-200)]/50 border border-[var(--glass-border)] text-[var(--foreground)] hover:bg-[var(--primary)] hover:text-white transition-all duration-300 overflow-hidden",
        className
      )}
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isDark ? "moon" : "sun"}
          initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
          transition={{ duration: 0.25, ease: "circOut" }}
          className="relative z-10"
        >
          {isDark ? <Moon size={18} /> : <Sun size={18} />}
        </motion.div>
      </AnimatePresence>
      
      {/* Background Effect */}
      <div className="absolute inset-0 z-0">
        <span className="absolute inset-0 bg-[var(--primary)] blur-lg opacity-0 group-hover:opacity-20 transition-opacity" />
      </div>
    </button>
  );
}
