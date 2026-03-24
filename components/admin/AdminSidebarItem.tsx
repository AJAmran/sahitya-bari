"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface AdminSidebarItemProps {
    href: string;
    icon: React.ReactNode;
    label: string;
}

export default function AdminSidebarItem({ href, icon, label }: AdminSidebarItemProps) {
    const pathname = usePathname();
    const isActive = pathname === href || (href !== "/admin" && pathname.startsWith(href));

    return (
        <Link
            href={href}
            className={cn(
                "relative flex items-center gap-3 px-4 py-3 rounded-[var(--radius-md)] text-sm font-medium transition-all duration-300 group overflow-hidden",
                isActive
                    ? "text-white shadow-lg shadow-[var(--primary)]/20"
                    : "text-[var(--foreground)]/60 hover:text-[var(--foreground)] hover:bg-[var(--surface-200)]/80"
            )}
        >
            {isActive && (
                <motion.div
                    layoutId="admin-nav-pill"
                    className="absolute inset-0 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]"
                    initial={false}
                    transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 38
                    }}
                />
            )}

            <span className={cn(
                "relative z-10 transition-transform duration-300 group-hover:scale-110",
                isActive ? "text-white" : "text-[var(--foreground)]/40 group-hover:text-[var(--primary)]"
            )}>
                {icon}
            </span>

            <span className="relative z-10">{label}</span>

            {isActive && (
                <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="relative z-10 ml-auto"
                >
                    <div className="w-1.5 h-1.5 rounded-[var(--radius-full)] bg-white shadow-sm" />
                </motion.span>
            )}
        </Link>
    );
}
