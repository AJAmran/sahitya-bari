"use client";

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X, Youtube } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';

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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div className="site-container pt-3 sm:pt-[var(--space-2)]">
        <nav
          className={cn(
            "w-full rounded-[var(--radius-full)] transition-all duration-500 border border-transparent pointer-events-auto",
            scrolled
              ? "bg-[var(--surface-100)]/95 dark:bg-[var(--surface-50)]/90 backdrop-blur-2xl shadow-2xl py-1.5 sm:py-2 px-4 sm:px-6 border-[var(--glass-border)]"
              : "bg-transparent py-3 sm:py-4 px-0"
          )}
        >
          <div className="flex items-center justify-between min-h-[48px]">
            {/* Logo */}
            <Logo />

            {/* Desktop Menu */}
            <DesktopMenu pathname={pathname} />

            {/* Right Side Icons */}
            <div className="hidden md:flex items-center gap-3">
              <YoutubeLink url={youtubeUrl} />
              <ThemeToggle className="w-10 h-10 rounded-full bg-[var(--surface-100)] border border-[var(--glass-border)] hover:bg-[var(--surface-200)] shadow-md" />
            </div>

            {/* Mobile Menu Button */}
            <MobileMenuButton isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>

          {/* Mobile Menu Content */}
          <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} pathname={pathname} />
        </nav>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <Link href="/" className="flex items-center group min-h-[44px]">
      <div className="relative h-10 sm:h-11 w-auto transition-all duration-300">
        <Image
          src="/sb-logo.png"
          alt="Sahitya Bari"
          className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105"
          width={280}
          height={72}
          quality={100}
          priority
        />
      </div>
    </Link>
  );
}

function DesktopMenu({ pathname }: { pathname: string }) {
  return (
    <div className="hidden md:flex items-center gap-[var(--space-1)] bg-[var(--surface-100)] dark:bg-[var(--surface-50)] rounded-[var(--radius-full)] p-1 border border-[var(--glass-border)] backdrop-blur-sm">
      {navLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={cn(
              "relative px-5 h-[40px] flex items-center justify-center rounded-full text-sm font-bold transition-all duration-300 min-w-[80px]",
              isActive 
                ? "text-white shadow-xl" 
                : "text-[var(--foreground)]/75 hover:text-[var(--primary)] hover:bg-[var(--surface-200)]/60 dark:hover:bg-[var(--surface-200)]/50"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="nav-pill"
                className="absolute inset-0 bg-[var(--primary)] rounded-[var(--radius-full)] shadow-lg"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative z-10">{link.name}</span>
          </Link>
        );
      })}
    </div>
  );
}

function YoutubeLink({ url }: { url?: string }) {
  return (
    <a
      href={url || "https://youtube.com"}
      target="_blank"
      rel="noreferrer"
      className="w-11 h-11 flex items-center justify-center rounded-full bg-[var(--surface-100)] text-[var(--foreground)]/70 hover:text-red-600 hover:bg-[var(--surface-200)] transition-all duration-300"
      aria-label="Visit YouTube Channel"
    >
      <Youtube size={20} />
    </a>
  );
}

function MobileMenuButton({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (v: boolean) => void }) {
  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-11 h-11 flex items-center justify-center rounded-full bg-[var(--surface-100)] text-[var(--foreground)] hover:bg-[var(--surface-200)] transition-colors"
        aria-label="Toggle Menu"
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
    </div>
  );
}

function MobileMenu({ isOpen, setIsOpen, pathname }: { isOpen: boolean, setIsOpen: (v: boolean) => void, pathname: string }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0, marginTop: 0 }}
          animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
          exit={{ opacity: 0, height: 0, marginTop: 0 }}
          transition={{ ease: [0.32, 0.72, 0, 1], duration: 0.4 }}
          className="md:hidden overflow-hidden frosted-glass rounded-[2rem] border border-[var(--glass-border)] shadow-2xl"
        >
          <div className="p-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-5 py-3 rounded-2xl text-base font-medium transition-all",
                  pathname === link.href
                    ? "bg-[var(--primary)]/10 text-[var(--primary)] font-bold"
                    : "text-[var(--foreground)]/80 hover:bg-[var(--surface-200)]"
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center justify-between px-5 py-4 mt-2 border-t border-[var(--glass-border)]">
              <span className="text-sm font-medium text-[var(--foreground)]/60 uppercase tracking-widest">Theme</span>
              <ThemeToggle className="w-10 h-10" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
