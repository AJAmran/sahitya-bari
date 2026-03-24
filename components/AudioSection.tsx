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
    <section className="py-[var(--space-10)] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[var(--accent)]/10 to-transparent pointer-events-none" />

      <div className="site-container relative z-10 w-full">
        <div className="flex flex-col md:flex-row items-end justify-between mb-[var(--space-6)] gap-[var(--space-4)]">
          <div>
            <div className="flex items-center gap-[var(--space-1)] text-[var(--accent)] font-semibold mb-[var(--space-1)] uppercase tracking-wider text-xs">
              <Headphones size={16} />
              <span>Audio Corner</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-bengali text-[var(--foreground)] leading-tight">
              আবৃত্তি ও <span className="text-gradient">শ্রুতি নাটক</span>
            </h2>
          </div>
          <button className="px-[var(--space-4)] h-[44px] rounded-[var(--radius-full)] border border-[var(--glass-border)] text-[var(--foreground)]/70 hover:bg-[var(--surface-200)] transition-colors text-sm font-medium min-w-[120px]">
            Listen All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--space-4)]">
          {AUDIO_TRACKS.map((track, idx) => (
            <div key={idx} className="group relative frosted-glass rounded-[var(--radius-md)] p-[var(--space-2)] card-hover flex items-center gap-[var(--space-3)]">
              <div className="relative w-20 h-20 rounded-[var(--radius-sm)] overflow-hidden flex-shrink-0">
                <Image
                  src={track.cover}
                  alt={track.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500 ease-[var(--ease-ios)]"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 bg-white/90 rounded-[var(--radius-full)] flex items-center justify-center text-[var(--accent)] shadow-lg">
                    <Play size={14} fill="currentColor" />
                  </div>
                </div>
              </div>
              <div className="flex-1 min-w-0 py-[var(--space-1)]">
                <h3 className="font-bold text-[var(--foreground)] truncate font-bengali text-[length:var(--text-body)] mb-[var(--space-1)]">
                  {track.title}
                </h3>
                <p className="text-sm text-[var(--foreground)]/60 truncate mb-[var(--space-1)]">
                  {track.artist}
                </p>
                <div className="flex items-center gap-[var(--space-1)] text-xs text-[var(--foreground)]/40">
                  <Music size={12} />
                  <span>{track.duration}</span>
                </div>
              </div>

              {/* Progress Bar (Visual Only) */}
              <div className="absolute bottom-0 left-[var(--space-2)] right-[var(--space-2)] h-1 bg-[var(--surface-300)] rounded-[var(--radius-full)] overflow-hidden mb-[-2px] opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="h-full w-1/3 bg-[var(--accent)] rounded-[var(--radius-full)]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
