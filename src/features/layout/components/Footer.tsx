import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import NewsletterForm from '@/features/newsletter/components/NewsletterForm';
import CurrentYear from '@/components/ui/CurrentYear';

interface FooterProps {
  youtubeUrl?: string;
  facebookUrl?: string;
}

const navLinks = [
  { name: 'Motion Pixels', href: '/videos' },
  { name: 'Ink & Paper', href: '/blog' },
  { name: 'The Archive', href: '/about' },
  { name: 'Reach Out', href: '/contact' },
];

const socialLinks = (youtubeUrl?: string, facebookUrl?: string) => [
  { icon: Facebook, href: facebookUrl || '#' },
  { icon: Instagram, href: '#' },
  { icon: Twitter, href: '#' },
  { icon: Youtube, href: youtubeUrl || 'https://youtube.com' },
];

export default function Footer({ youtubeUrl, facebookUrl }: FooterProps) {
  const socials = socialLinks(youtubeUrl, facebookUrl);

  return (
    <footer className="relative mt-12 sm:mt-16 py-10 sm:py-14 border-t border-[var(--glass-border)] overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-[var(--primary)]/4 blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[160px] bg-[var(--secondary)]/4 blur-[80px]" />
      </div>

      <div className="site-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 lg:gap-12">

          {/* Brand */}
          <div className="col-span-1 sm:col-span-2 md:col-span-5 space-y-5">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-[var(--foreground)] flex items-center justify-center text-[var(--background)] font-black text-sm shadow-[var(--shadow-sm)] group-hover:bg-[var(--primary)] transition-all duration-400 shrink-0">
                SB
              </div>
              <h3 className="text-xl font-black font-bengali text-[var(--foreground)] tracking-tight">
                সাহিত্য <span className="text-gradient">বাড়ি</span>
              </h3>
            </Link>

            <p className="text-sm text-[var(--foreground)]/55 leading-relaxed max-w-xs font-medium">
              A curated sanctuary for the soul of Bengali literature.
              Blending heritage with modern digital storytelling.
            </p>

            {/* Social Icons */}
            <div className="flex gap-2.5 pt-1">
              {socials.map(({ icon: Icon, href }, idx) => (
                <a
                  key={idx}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-9 h-9 rounded-full border border-[var(--glass-border)] flex items-center justify-center text-[var(--foreground)]/50 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--primary)] hover:text-[var(--primary)]"
                >
                  <Icon size={15} className="relative z-10" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="col-span-1 md:col-span-3">
            <h4 className="text-[0.8rem] font-black text-[var(--foreground)]/35 uppercase tracking-[0.3em] mb-5">
              Navigation
            </h4>
            <ul className="space-y-3.5">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="flex items-center text-sm font-medium text-[var(--foreground)]/60 hover:text-[var(--primary)] transition-colors group"
                  >
                    <span className="w-0 group-hover:w-2.5 h-px bg-[var(--primary)] mr-0 group-hover:mr-2 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1 md:col-span-4">
            <h4 className="text-[0.8rem] font-black text-[var(--foreground)]/35 uppercase tracking-[0.3em] mb-5">
              Community Sync
            </h4>
            <p className="text-sm text-[var(--foreground)]/50 mb-4 font-medium leading-relaxed">
              Join our weekly literary insights and curated thoughts.
            </p>
            <div className="glass-card p-3 rounded-[var(--radius-lg)]">
              <NewsletterForm variant="footer" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 sm:mt-12 pt-6 border-t border-[var(--glass-border)] flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2.5 text-[0.6rem] font-black uppercase tracking-widest text-[var(--foreground)]/25">
            <span>&copy; <CurrentYear /> Sahitya Bari</span>
            <span className="w-1 h-1 rounded-full bg-[var(--primary)]" />
            <span>Crafted with precision</span>
          </div>

          <div className="flex items-center gap-5">
            {['/privacy', '/terms'].map((href) => (
              <Link
                key={href}
                href={href}
                className="text-[0.6rem] font-black uppercase tracking-widest text-[var(--foreground)]/25 hover:text-[var(--primary)] transition-colors"
              >
                {href.slice(1).charAt(0).toUpperCase() + href.slice(2)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}