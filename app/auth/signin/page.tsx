"use client";

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Key, Loader2, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError(result.error === "CredentialsSignin" ? "Invalid email or password" : result.error);
        setLoading(false);
      } else {
        router.push('/admin');
      }
    } catch (err) {
      setError("An unexpected error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-[var(--surface-50)] dark:bg-[#000000]">
      {/* Background decoration */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[var(--primary)]/10 blur-[120px] rounded-[var(--radius-full)]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--secondary)]/10 blur-[120px] rounded-[var(--radius-full)]" />

      <div className="max-w-md w-full relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-3 group mb-6">
            <div className="w-14 h-14 rounded-[var(--radius-lg)] bg-gradient-to-tr from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center text-white font-bold text-xl shadow-2xl shadow-[var(--primary)]/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
              SB
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-black font-bengali text-gradient leading-none">সাহিত্য বাড়ি</h1>
              <p className="text-[10px] text-[var(--foreground)]/40 uppercase tracking-[0.2em] font-bold mt-1">Digital Archives</p>
            </div>
          </Link>
          <h2 className="text-4xl font-black text-[var(--foreground)] tracking-tight mb-2">Welcome Back</h2>
          <p className="text-[var(--foreground)]/50 font-medium">Access your administrative command center.</p>
        </div>

        <div className="bg-[var(--surface-100)]/60 backdrop-blur-3xl p-10 rounded-[var(--radius-xl)] border border-[var(--glass-border)] shadow-2xl shadow-black/5">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-[#FF3B30]/10 border border-[#FF3B30]/20 text-[#FF3B30] p-4 rounded-[var(--radius-md)] text-xs font-bold uppercase tracking-wide flex items-center gap-3 animate-in fade-in zoom-in duration-300">
                <AlertCircle size={18} />
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[var(--foreground)]/30 uppercase tracking-[0.2em] flex items-center gap-2 px-1">
                  <Mail size={12} />
                  Identifier
                </label>
                <div className="relative group">
                  <input
                    type="email"
                    required
                    className="w-full bg-[var(--surface-200)]/50 border border-[var(--glass-border)] rounded-[var(--radius-md)] px-6 py-4 text-sm font-bold text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] focus:bg-[var(--surface-100)] transition-all outline-none placeholder-[var(--foreground)]/20 shadow-inner"
                    placeholder="admin@sahitya-bari.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-[var(--foreground)]/30 uppercase tracking-[0.2em] flex items-center gap-2 px-1">
                  <Key size={12} />
                  Access Token
                </label>
                <div className="relative group">
                  <input
                    type="password"
                    required
                    className="w-full bg-[var(--surface-200)]/50 border border-[var(--glass-border)] rounded-[var(--radius-md)] px-6 py-4 text-sm font-bold text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] focus:bg-[var(--surface-100)] transition-all outline-none placeholder-[var(--foreground)]/20 shadow-inner"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex items-center justify-center gap-3 py-5 px-6 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white text-sm font-black rounded-[var(--radius-xl)] shadow-2xl shadow-[var(--primary)]/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>Initialize Dashboard</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <div className="pt-2 text-center">
              <p className="text-[10px] text-[var(--foreground)]/30 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                <Sparkles size={10} />
                Secure Administrative Channel
              </p>
            </div>
          </form>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-[10px] font-black text-[var(--foreground)]/40 uppercase tracking-widest hover:text-[var(--primary)] transition-colors">
            Return to Public Repository
          </Link>
        </div>
      </div>
    </div>
  );
}
