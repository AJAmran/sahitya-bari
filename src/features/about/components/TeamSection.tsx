import Image from 'next/image';

const MEMBERS = [
  { name: 'Khalid Ibne Wadud', role: 'Founder & Editor', image: 'https://picsum.photos/seed/khalid/400/400' },
  { name: 'Sarah Ahmed', role: 'Content Strategist', image: 'https://picsum.photos/seed/sarah/400/400' },
  { name: 'Rahim Uddin', role: 'Community Manager', image: 'https://picsum.photos/seed/rahim/400/400' },
];

export default function TeamSection() {
  return (
    <div className="text-center mb-10">
      <h2 className="text-3xl md:text-4xl font-black font-bengali text-[var(--foreground)] mb-8 tracking-tight">
        Meet the <span className="text-[var(--primary)]">Team</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MEMBERS.map((member, index) => (
          <div key={index} className="glass-card group relative overflow-hidden rounded-[var(--radius-xl)] shadow-[var(--shadow-sm)] hover:-translate-y-1 transition-all duration-400">
            <div className="aspect-[4/5] relative overflow-hidden">
              <Image
                src={member.image}
                alt={member.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-5 text-center bg-[var(--surface-50)]/80 backdrop-blur-md border-t border-[var(--glass-border)]">
              <h3 className="text-lg font-black text-[var(--foreground)] tracking-tight mb-0.5">{member.name}</h3>
              <p className="text-[var(--primary)] text-[0.65rem] font-bold uppercase tracking-widest">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
