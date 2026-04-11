import { Play, Pause, Headphones, Music } from 'lucide-react';
import Image from 'next/image';

const AUDIO_TRACKS = [
  {
    title: 'বিদ্রোহী - কাজী নজরুল ইসলাম',
    artist: 'আবৃত্তি: শিমুল মুস্তাফা',
    duration: '4:30',
    cover: 'https://picsum.photos/seed/bidrohi/300/300',
  },
  {
    title: 'সোনার তরী - রবীন্দ্রনাথ ঠাকুর',
    artist: 'আবৃত্তি: ব্রততী বন্দ্যোপাধ্যায়',
    duration: '3:45',
    cover: 'https://picsum.photos/seed/sonartori/300/300',
  },
  {
    title: 'বনলতা সেন - জীবনানন্দ দাশ',
    artist: 'আবৃত্তি: সৌমিত্র চট্টোপাধ্যায়',
    duration: '2:50',
    cover: 'https://picsum.photos/seed/banalata/300/300',
  }
];

export default function AudioSection() {
  return (
    <section className="py-10 md:py-14 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[var(--primary)]/5 to-transparent pointer-events-none" />

      <div className="site-container relative z-10 w-full">
        <div className="flex flex-col md:flex-row items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-[var(--primary)] font-bold mb-2 uppercase tracking-[0.2em] text-[0.65rem]">
              <Headphones size={14} />
              <span>Audio Corner</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black font-bengali text-[var(--foreground)] leading-tight">
              আবৃত্তি ও <span className="text-gradient">শ্রুতি নাটক</span>
            </h2>
          </div>
          <button className="px-5 h-10 rounded-[var(--radius-lg)] border border-[var(--glass-border)] text-[var(--foreground)]/65 hover:bg-[var(--surface-100)] hover:text-[var(--primary)] transition-all text-[0.7rem] font-bold uppercase tracking-widest min-w-[100px]">
            Listen All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {AUDIO_TRACKS.map((track, idx) => (
            <div key={idx} className="glass-card group relative rounded-[var(--radius-xl)] p-2 hover:-translate-y-1 transition-all duration-400 flex items-center gap-3 shadow-[var(--shadow-sm)]">
              <div className="relative w-[4.5rem] h-[4.5rem] rounded-[var(--radius-lg)] overflow-hidden shrink-0">
                <Image
                  src={track.cover}
                  alt={track.title}
                  fill
                  sizes="72px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 flex items-center justify-center text-white backdrop-blur-sm rounded-full bg-white/20">
                    <Play size={14} fill="currentColor" />
                  </div>
                </div>
              </div>
              <div className="flex-1 min-w-0 py-1 pr-2">
                <h3 className="font-black text-[var(--foreground)] truncate font-bengali text-sm mb-0.5 group-hover:text-[var(--primary)] transition-colors">
                  {track.title}
                </h3>
                <p className="text-[0.65rem] font-medium text-[var(--foreground)]/55 truncate mb-1.5 uppercase tracking-wider">
                  {track.artist}
                </p>
                <div className="flex items-center gap-1.5 text-[0.65rem] font-bold text-[var(--foreground)]/40">
                  <Music size={12} />
                  <span>{track.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
