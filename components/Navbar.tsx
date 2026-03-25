"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, Youtube } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Videos', href: '/videos' },
  { name: 'Blog', href: '/blog' },
  { name: 'Shop', href: '/shop' },
];

interface NavbarProps {
  youtubeUrl?: string;
  siteTitle?: string;
}

export default function Navbar({ youtubeUrl, siteTitle }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div className="site-container pt-[var(--space-2)]">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          className={cn(
            "w-full rounded-[var(--radius-full)] transition-all duration-300 border border-transparent pointer-events-auto",
            scrolled
              ? "liquid-glass shadow-lg shadow-[var(--glass-shadow)] py-[var(--space-1)] px-[var(--space-4)]"
              : "bg-transparent py-[var(--space-2)] px-0"
          )}
        >
          <div className="flex items-center justify-between min-h-[44px]">
            {/* Logo */}
            <Link href="/" className="flex items-center group min-h-[44px]">
              <div className="relative h-20 w-auto transition-all duration-300">
                <img
                  src="/logo-horzontal.png"
                  alt="Sahitya Bari"
                  className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                  width={420}
                  height={235}
                />
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-[var(--space-1)] bg-[var(--surface-100)] rounded-[var(--radius-full)] p-1 border border-[var(--glass-border)] backdrop-blur-sm">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "relative px-[var(--space-3)] h-[40px] flex items-center justify-center rounded-[var(--radius-full)] text-sm font-medium transition-all duration-300 min-w-[80px]",
                      isActive
                        ? "text-white shadow-md"
                        : "text-[var(--foreground)]/70 hover:text-[var(--foreground)] hover:bg-[var(--surface-200)]"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-[var(--primary)] rounded-[var(--radius-full)]"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Right Side Icons */}
            <div className="hidden md:flex items-center gap-[var(--space-2)]">
              <a
                href={youtubeUrl || "https://youtube.com"}
                target="_blank"
                rel="noreferrer"
                className="w-[44px] h-[44px] flex items-center justify-center rounded-[var(--radius-full)] bg-[var(--surface-100)] text-[var(--foreground)]/70 hover:text-red-600 hover:bg-[var(--surface-200)] transition-all duration-300"
              >
                <Youtube size={20} />
              </a>

              {mounted && (
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="w-[44px] h-[44px] flex items-center justify-center rounded-[var(--radius-full)] bg-[var(--surface-100)] text-[var(--foreground)]/70 hover:bg-[var(--surface-200)] hover:text-[var(--primary)] transition-all duration-300"
                  aria-label="Toggle Dark Mode"
                >
                  {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-[44px] h-[44px] flex items-center justify-center rounded-[var(--radius-full)] bg-[var(--surface-100)] text-[var(--foreground)] hover:bg-[var(--surface-200)] transition-colors"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ ease: [0.32, 0.72, 0, 1] }}
                className="md:hidden overflow-hidden frosted-glass rounded-[var(--radius-xl)] border border-[var(--glass-border)] shadow-xl"
              >
                <div className="p-[var(--space-2)] space-y-[var(--space-1)]">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "block px-[var(--space-3)] py-[var(--space-2)] rounded-[var(--radius-md)] text-base font-medium transition-all min-h-[44px] flex items-center",
                        pathname === link.href
                          ? "bg-[var(--primary)]/10 text-[var(--primary)]"
                          : "text-[var(--foreground)]/80 hover:bg-[var(--surface-200)]"
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <div className="flex items-center justify-between px-[var(--space-3)] py-[var(--space-2)] mt-[var(--space-1)] border-t border-[var(--glass-border)] min-h-[44px]">
                    <span className="text-sm font-medium text-[var(--foreground)]/60">Appearance</span>
                    {mounted && (
                      <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="flex items-center gap-2 px-[var(--space-2)] py-[var(--space-1)] rounded-[var(--radius-full)] bg-[var(--surface-200)] text-xs font-medium text-[var(--foreground)] min-h-[32px]"
                      >
                        {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
                        <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>
    </div>
  );
}
