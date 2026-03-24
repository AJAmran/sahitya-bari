import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube, Mail, Heart } from 'lucide-react';
import NewsletterForm from './NewsletterForm';

interface FooterProps {
  youtubeUrl?: string;
  facebookUrl?: string;
}

export default function Footer({ youtubeUrl, facebookUrl }: FooterProps) {
  return (
    <footer className="relative mt-20 border-t border-[var(--glass-border)] frosted-glass">
      <div className="site-container py-16 w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-[var(--radius-full)] bg-gradient-to-tr from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:shadow-[var(--primary)]/50 transition-all duration-300">
                SB
              </div>
              <h3 className="text-2xl font-bold font-bengali text-gradient">
                সাহিত্য বাড়ি
              </h3>
            </Link>
            <p className="text-[var(--foreground)]/70 text-base leading-relaxed max-w-md font-light">
              Exploring the depths of literature, culture, and storytelling. Join us on a journey through words and emotions, connecting the past with the future.
            </p>
            <div className="flex space-x-4 pt-2">
              {[
                { icon: Facebook, color: "hover:text-blue-600", href: facebookUrl || "#" },
                { icon: Instagram, color: "hover:text-pink-600", href: "#" },
                { icon: Twitter, color: "hover:text-sky-500", href: "#" },
                { icon: Youtube, color: "hover:text-red-600", href: youtubeUrl || "https://youtube.com" }
              ].map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.href}
                    className={`p-3 rounded-[var(--radius-full)] bg-[var(--surface-100)] border border-[var(--glass-border)] text-[var(--foreground)]/60 ${social.color} hover:bg-[var(--surface-200)] transition-all duration-300 hover:-translate-y-1 shadow-sm`}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-[var(--foreground)] uppercase tracking-widest mb-6">
              Explore
            </h4>
            <ul className="space-y-4">
              {[
                { name: 'All Videos', href: '/videos' },
                { name: 'Blog Posts', href: '/blog' },
                { name: 'About Us', href: '/about' },
                { name: 'Contact', href: '/contact' }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-[var(--foreground)]/70 hover:text-[var(--primary)] text-sm transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-[var(--radius-full)] bg-[var(--primary)]/0 group-hover:bg-[var(--primary)] transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-bold text-[var(--foreground)] uppercase tracking-widest mb-6">
              Newsletter
            </h4>
            <p className="text-[var(--foreground)]/70 text-sm mb-6 font-light">
              Subscribe to get the latest literary gems delivered to your inbox.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[var(--glass-border)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[var(--foreground)]/60 text-sm font-light">
            &copy; {new Date().getFullYear()} Sahitya Bari. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
