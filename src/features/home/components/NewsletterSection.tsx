import NewsletterForm from '@/features/newsletter/components/NewsletterForm';

export default function NewsletterSection() {
  return (
    <section className="py-14 sm:py-20">
      <div className="site-container">
        <div className="max-w-2xl mx-auto relative overflow-hidden rounded-[2rem] liquid-glass text-center py-12 sm:py-16 px-6 sm:px-10 group">
          {/* Ambient glows */}
          <div className="absolute inset-0 opacity-25 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_50%_0%,oklch(52%_0.09_120/0.15),transparent_60%)] group-hover:scale-110 transition-transform duration-1000" />
            <div className="absolute bottom-0 right-0 w-3/4 h-3/4 bg-[radial-gradient(ellipse_at_100%_100%,oklch(72%_0.06_75/0.12),transparent_60%)]" />
          </div>

          <div className="relative z-10">
            {/* Badge */}
            <span className="inline-flex items-center py-1 px-4 rounded-full bg-[var(--surface-200)] border border-[var(--glass-border)] text-[var(--primary)] text-[0.65rem] font-black uppercase tracking-widest mb-5 backdrop-blur-md">
              Stay Connected
            </span>

            {/* Heading */}
            <h2 className="text-xl sm:text-2xl font-black font-bengali text-[var(--foreground)] mb-3 leading-snug">
              সাহিত্য প্রেমীদের জন্য
            </h2>

            {/* Body */}
            <p className="text-[var(--foreground)]/60 mb-8 text-sm sm:text-base font-medium leading-relaxed max-w-md mx-auto">
              Join our newsletter to get the latest updates, book reviews, and literary discussions delivered straight to your inbox.
            </p>

            <NewsletterForm variant="section" />
          </div>
        </div>
      </div>
    </section>
  );
}
