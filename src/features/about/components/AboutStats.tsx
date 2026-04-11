import { Award, BookOpen, Users, Heart } from 'lucide-react';

const STATS = [
  { label: 'Active Readers', value: '10K+', icon: Users, color: 'text-[var(--primary)]' },
  { label: 'Books Reviewed', value: '500+', icon: BookOpen, color: 'text-[var(--success)]' },
  { label: 'Literary Awards', value: '12', icon: Award, color: 'text-[var(--warning)]' },
  { label: 'Community Members', value: '25K+', icon: Heart, color: 'text-[var(--destructive)]' },
];

export default function AboutStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
      {STATS.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="glass-card p-5 rounded-[var(--radius-lg)] text-center hover:-translate-y-1.5 hover:shadow-[var(--shadow-pro)] transition-all duration-400">
            <div className={`mx-auto w-11 h-11 flex items-center justify-center rounded-full bg-[var(--surface-200)] mb-3 ${stat.color}`}>
              <Icon size={20} />
            </div>
            <h3 className="text-2xl font-black text-[var(--foreground)] mb-0.5 tracking-tighter">{stat.value}</h3>
            <p className="text-[0.65rem] text-[var(--foreground)]/50 font-bold uppercase tracking-widest">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
}
