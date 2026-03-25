import Image from 'next/image';
import { Award, BookOpen, Users, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-36 pb-12 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-[var(--primary)]/10 rounded-[var(--radius-full)] blur-3xl -z-10 animate-pulse" />

      {/* Hero Section */}
      <div className="site-container">
      <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <h1 className="text-4xl md:text-6xl font-black font-bengali text-[var(--foreground)] mb-6 leading-tight tracking-tight">
          আমাদের <span className="text-gradient">গল্প</span>
        </h1>
        <p className="text-lg text-[var(--foreground)]/60 max-w-3xl mx-auto font-medium leading-relaxed">
          Sahitya Bari is a platform dedicated to preserving and promoting the rich heritage of Bengali literature.
          We believe in the power of stories to connect, inspire, and transform lives.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
        <div className="bg-[var(--surface-100)]/40 backdrop-blur-xl p-10 rounded-[var(--radius-xl)] border border-[var(--glass-border)] shadow-2xl shadow-[var(--primary)]/5 hover:scale-[1.02] transition-all duration-500 group">
          <div className="w-16 h-16 bg-[var(--primary)]/10 rounded-[var(--radius-md)] flex items-center justify-center text-[var(--primary)] mb-6 group-hover:scale-110 transition-transform shadow-inner">
            <BookOpen size={32} />
          </div>
          <h2 className="text-2xl font-black text-[var(--foreground)] mb-4 tracking-tight">Our Mission</h2>
          <p className="text-[var(--foreground)]/70 font-medium leading-relaxed">
            To create a digital sanctuary for literature lovers where they can explore classic and contemporary works,
            engage in meaningful discussions, and discover new voices in the literary world.
          </p>
        </div>

        <div className="bg-[var(--surface-100)]/40 backdrop-blur-xl p-10 rounded-[var(--radius-xl)] border border-[var(--glass-border)] shadow-2xl shadow-[var(--secondary)]/5 hover:scale-[1.02] transition-all duration-500 group">
          <div className="w-16 h-16 bg-[var(--secondary)]/10 rounded-[var(--radius-md)] flex items-center justify-center text-[var(--secondary)] mb-6 group-hover:scale-110 transition-transform shadow-inner">
            <Heart size={32} />
          </div>
          <h2 className="text-2xl font-black text-[var(--foreground)] mb-4 tracking-tight">Our Vision</h2>
          <p className="text-[var(--foreground)]/70 font-medium leading-relaxed">
            To become the leading platform for Bengali literature globally, fostering a community that values
            culture, creativity, and intellectual growth.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
        {[
          { label: 'Active Readers', value: '10K+', icon: Users, color: 'text-[var(--primary)]' },
          { label: 'Books Reviewed', value: '500+', icon: BookOpen, color: 'text-[var(--success)]' },
          { label: 'Literary Awards', value: '12', icon: Award, color: 'text-[var(--warning)]' },
          { label: 'Community Members', value: '25K+', icon: Heart, color: 'text-[var(--destructive)]' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-[var(--surface-100)]/40 backdrop-blur-xl p-8 rounded-[var(--radius-lg)] border border-[var(--glass-border)] text-center hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 shadow-lg">
              <div className={`mx-auto w-14 h-14 flex items-center justify-center rounded-[var(--radius-full)] bg-[var(--surface-200)] mb-4 ${stat.color} shadow-inner`}>
                <Icon size={24} />
              </div>
              <h3 className="text-3xl font-black text-[var(--foreground)] mb-1 tracking-tighter">{stat.value}</h3>
              <p className="text-xs text-[var(--foreground)]/50 font-bold uppercase tracking-widest">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-black font-bengali text-[var(--foreground)] mb-12 tracking-tight">
          Meet the <span className="text-[var(--primary)]">Team</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            { name: 'Khalid Ibne Wadud', role: 'Founder & Editor', image: 'https://picsum.photos/seed/khalid/400/400' },
            { name: 'Sarah Ahmed', role: 'Content Strategist', image: 'https://picsum.photos/seed/sarah/400/400' },
            { name: 'Rahim Uddin', role: 'Community Manager', image: 'https://picsum.photos/seed/rahim/400/400' },
          ].map((member, index) => (
            <div key={index} className="group relative overflow-hidden rounded-[var(--radius-xl)] bg-[var(--surface-100)]/40 backdrop-blur-xl border border-[var(--glass-border)] shadow-2xl hover:shadow-[var(--primary)]/10 transition-all duration-500">
              <div className="aspect-[4/5] relative overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
                </div>
              </div>
              <div className="p-8 text-center bg-[var(--surface-100)]/80 backdrop-blur-md border-t border-[var(--glass-border)]">
                <h3 className="text-xl font-black text-[var(--foreground)] tracking-tight mb-1">{member.name}</h3>
                <p className="text-[var(--primary)] text-xs font-bold uppercase tracking-widest">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}
