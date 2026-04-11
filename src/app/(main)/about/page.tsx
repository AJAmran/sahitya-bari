import { BookOpen, Heart } from 'lucide-react';
import AboutStats from '@/features/about/components/AboutStats';
import TeamSection from '@/features/about/components/TeamSection';
import { SectionHeader } from '@/components/ui/SectionHeader';

export const metadata = {
  title: 'About Us | Sahitya Bari',
  description: 'Learn about the Sahitya Bari mission, our story, and the team preserving Bengali literary heritage.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-28 pb-10 relative overflow-hidden">
      <div className="absolute top-16 left-0 w-64 h-64 bg-[var(--primary)]/8 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="site-container">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <SectionHeader
            pillLabel="Our Story"
            pillIcon={BookOpen}
            pillVariant="primary"
            titleBengali="আমাদের"
            titleGradient="গল্প"
            className="items-center"
            description="Sahitya Bari is a platform dedicated to preserving and promoting the rich heritage of Bengali literature. We believe in the power of stories to connect, inspire, and transform lives."
          />
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          <div className="glass-card p-6 rounded-[var(--radius-xl)] hover:bg-[var(--surface-100)] transition-all duration-400 group">
            <div className="w-11 h-11 bg-[var(--primary)]/10 rounded-[var(--radius-md)] flex items-center justify-center text-[var(--primary)] mb-4 group-hover:scale-105 transition-transform">
              <BookOpen size={22} />
            </div>
            <h2 className="text-lg font-black text-[var(--foreground)] mb-2.5 tracking-tight">Our Mission</h2>
            <p className="text-sm text-[var(--foreground)]/65 font-medium leading-relaxed">
              To create a digital sanctuary for literature lovers where they can explore classic and contemporary works,
              engage in meaningful discussions, and discover new voices in the literary world.
            </p>
          </div>

          <div className="glass-card p-6 rounded-[var(--radius-xl)] hover:bg-[var(--surface-100)] transition-all duration-400 group">
            <div className="w-11 h-11 bg-[var(--secondary)]/10 rounded-[var(--radius-md)] flex items-center justify-center text-[var(--secondary)] mb-4 group-hover:scale-105 transition-transform">
              <Heart size={22} />
            </div>
            <h2 className="text-lg font-black text-[var(--foreground)] mb-2.5 tracking-tight">Our Vision</h2>
            <p className="text-sm text-[var(--foreground)]/65 font-medium leading-relaxed">
              To become the leading platform for Bengali literature globally, fostering a community that values
              culture, creativity, and intellectual growth.
            </p>
          </div>
        </div>

        {/* Statistics Section */}
        <AboutStats />

        {/* Team Section */}
        <TeamSection />
      </div>
    </div>
  );
}
