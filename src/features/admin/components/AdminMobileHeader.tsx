import { ShieldCheck, LogOut } from "lucide-react";
import { ThemeToggle } from "@/features/layout/components/ThemeToggle";
import { signOut } from "@/lib/auth-node";

export default function AdminMobileHeader() {
  return (
    <header className="lg:hidden h-20 border-b border-[var(--glass-border)] bg-[var(--surface-100)]/80 backdrop-blur-2xl sticky top-0 z-40 px-6 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center text-white font-black text-sm shadow-xl shadow-[var(--primary)]/20 group">
          <ShieldCheck size={20} className="group-active:scale-90 transition-transform" />
        </div>
        <div>
          <h1 className="font-black text-base tracking-tight text-[var(--foreground)] leading-none">Control Center</h1>
          <p className="text-[9px] text-[var(--foreground)]/30 uppercase font-black mt-1.5 tracking-widest flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-[var(--primary)] animate-pulse" />
            System Active
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <div className="w-[1px] h-6 bg-[var(--glass-border)] mx-1" />
        <form
          action={async () => {
            "use server"
            await signOut({ redirectTo: "/auth/signin" })
          }}
        >
          <button
            type="submit"
            className="w-11 h-11 rounded-2xl bg-[var(--surface-200)]/80 flex items-center justify-center text-[var(--foreground)]/40 hover:bg-[var(--destructive)]/10 hover:text-[var(--destructive)] transition-all active:scale-90"
            title="Sign Out"
          >
            <LogOut size={18} />
          </button>
        </form>
      </div>
    </header>
  );
}
