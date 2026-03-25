"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface AdminMobileNavItemProps {
    href: string;
    icon: React.ReactNode;
    label: string;
}

export default function AdminMobileNavItem({ href, icon, label }: AdminMobileNavItemProps) {
    const pathname = usePathname();
    const isActive = pathname === href || (href !== "/admin" && pathname.startsWith(href));

    return (
        <Link 
            href={href} 
            className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-[var(--radius-sm)] transition-all duration-300 min-w-16 group relative",
                isActive ? "text-[var(--primary)]" : "text-[var(--foreground)]/40 hover:text-[var(--primary)]/60"
            )}
        >
            {isActive && (
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-b-full shadow-sm shadow-[var(--primary)]/20" />
            )}
            
            <div className={cn(
                "transition-transform duration-300",
                isActive ? "scale-110" : "group-hover:scale-105"
            )}>
                {icon}
            </div>
            <span className={cn(
                "text-[10px] font-black uppercase tracking-widest transition-opacity duration-300",
                isActive ? "opacity-100" : "opacity-60 group-hover:opacity-100"
            )}>
                {label}
            </span>
        </Link>
    );
}
