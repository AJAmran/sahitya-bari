import { BookOpen, Star, Award } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getActiveSpotlight } from '@/app/actions/spotlight';

export default async function FeaturedSpotlight() {
  const spotlight = await getActiveSpotlight();

  if (!spotlight) return null;

  return (
    <section className="py-[var(--space-10)]">
      <div className="site-container">
        <div className="relative rounded-[2rem] overflow-hidden liquid-glass shadow-2xl shadow-[var(--glass-shadow)]">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <Image
              src={spotlight.image || "https://picsum.photos/seed/library/1920/1080"}
              alt="Background"
              fill
              className="object-cover opacity-10 dark:opacity-20 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--surface-300)] via-[var(--surface-200)] to-transparent" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-[var(--space-6)] lg:gap-[var(--space-12)] p-[var(--space-6)] md:p-[var(--space-10)] items-center">
            <div className="space-y-[var(--space-4)]">
              <div className="inline-flex items-center gap-[var(--space-1)] px-[var(--space-2)] py-[var(--space-1)] rounded-[var(--radius-full)] bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--accent)] text-sm font-bold uppercase tracking-widest">
                <Award size={16} />
                <span>Featured Spotlight</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold font-bengali text-[var(--foreground)] leading-tight">
                {spotlight.title}
                {spotlight.subtitle && (
                  <span className="block text-lg mt-[var(--space-1)] text-[var(--foreground)]/60 font-normal">
                    {spotlight.subtitle}
                  </span>
                )}
              </h2>

              <p className="text-[length:var(--text-body)] text-[var(--foreground)]/80 leading-relaxed max-w-xl">
                {spotlight.description}
              </p>

              <div className="flex flex-wrap gap-[var(--space-2)]">
                {spotlight.buttonText && spotlight.buttonLink && (
                  <Link
                    href={spotlight.buttonLink}
                    className="btn-ios px-[var(--space-4)] h-[56px] flex items-center justify-center bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white font-bold shadow-lg shadow-[var(--accent)]/20 hover:scale-105 rounded-[var(--radius-md)] min-w-[160px]"
                  >
                    {spotlight.buttonText}
                  </Link>
                )}
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative w-[400px] h-[500px] mx-auto transform rotate-6 hover:rotate-0 transition-all duration-500 ease-[var(--ease-spring)]">
                <Image
                  src={spotlight.image || "https://picsum.photos/seed/humayun_ahmed/600/800"}
                  alt={spotlight.title}
                  fill
                  className="object-cover rounded-[var(--radius-md)] shadow-2xl shadow-black/20 border-4 border-[var(--surface-100)]"
                />
                {/* Decorative Elements */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[var(--accent)] rounded-[var(--radius-full)] blur-[80px] opacity-40" />
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-[var(--secondary)] rounded-[var(--radius-full)] blur-[80px] opacity-40" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
