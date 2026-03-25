import VideoCard from '@/components/VideoCard';
import { Video, Search, Sparkles, TrendingUp } from 'lucide-react';
import dbConnect from '@/lib/mongodb';
import VideoModel from '@/lib/models/Video';
import { formatDuration } from '@/lib/utils';
// Fallback Mock Data
const MOCK_VIDEOS = [
  {
    id: '1',
    title: 'রবীন্দ্রনাথের শেষের কবিতা | Shesher Kobita Review',
    slug: 'shesher-kobita-review',
    thumbnail: 'https://picsum.photos/seed/rabindranath/640/360',
    views: '125K',
    duration: '15:24',
    publishedAt: '2023-10-15',
    category: 'Literature'
  },
  {
    id: '2',
    title: 'জীবনানন্দ দাশের বনলতা সেন | Banalata Sen Analysis',
    slug: 'banalata-sen-analysis',
    thumbnail: 'https://picsum.photos/seed/jibonananda/640/360',
    views: '98K',
    duration: '12:45',
    publishedAt: '2023-11-20',
    category: 'Poetry'
  },
  {
    id: '3',
    title: 'হুমায়ূন আহমেদের সেরা ১০টি বই | Top 10 Humayun Ahmed Books',
    slug: 'top-10-humayun-ahmed',
    thumbnail: 'https://picsum.photos/seed/humayun/640/360',
    views: '210K',
    duration: '18:30',
    publishedAt: '2023-09-05',
    category: 'Review'
  },
  {
    id: '4',
    title: 'সুনীল গঙ্গোপাধ্যায়ের শ্রেষ্ঠ কবিতা | Best Poems of Sunil',
    slug: 'sunil-gangopadhyay-poems',
    thumbnail: 'https://picsum.photos/seed/sunil/640/360',
    views: '85K',
    duration: '10:15',
    publishedAt: '2023-12-05',
    category: 'Recitation'
  },
  {
    id: '5',
    title: 'শরৎচন্দ্রের চরিত্রহীন | Charitraheen Analysis',
    slug: 'charitraheen-analysis',
    thumbnail: 'https://picsum.photos/seed/sarat/640/360',
    views: '76K',
    duration: '14:50',
    publishedAt: '2023-08-18',
    category: 'Literature'
  },
  {
    id: '6',
    title: 'মাইকেল মধুসূদনের মেঘনাদবধ কাব্য',
    slug: 'meghnad-badh-kabya',
    thumbnail: 'https://picsum.photos/seed/michael/640/360',
    views: '62K',
    duration: '22:10',
    publishedAt: '2023-07-12',
    category: 'Poetry'
  }
];


interface VideoListingPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function VideoListingPage({ searchParams }: VideoListingPageProps) {
  const params = await searchParams;
  const selectedCategory = (params.category as string) || 'All';
  const searchQuery = (params.q as string) || '';

  let upcomingVideos: any[] = [];
  let popularVideos: any[] = [];
  let allVideos: any[] = [];

  try {
    await dbConnect();

    // Fetch Sections
    const [dbUpcoming, dbPopular, dbAll] = await Promise.all([
      VideoModel.find({ isUpcoming: true }).sort({ publishedAt: -1 }).limit(4).lean(),
      VideoModel.find({ isPopular: true }).sort({ publishedAt: -1 }).limit(4).lean(),
      VideoModel.find(selectedCategory !== 'All' ? { category: selectedCategory } : {})
        .sort({ publishedAt: -1 })
        .lean()
    ]);

    const formatVideo = (v: any) => ({
      id: v._id.toString(),
      title: v.title,
      slug: v.youtubeId || v._id.toString(),
      youtubeId: v.youtubeId,
      thumbnail: v.thumbnail || '',
      views: v.views || '0',
      duration: formatDuration(v.duration || ''),
      publishedAt: v.publishedAt.toISOString(),
      category: v.category || 'Video'
    });

    upcomingVideos = (dbUpcoming as any[]).map(formatVideo);
    popularVideos = (dbPopular as any[]).map(formatVideo);
    allVideos = (dbAll as any[]).map(formatVideo);

    // Filter by search if exists
    if (searchQuery) {
      allVideos = allVideos.filter(v => v.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    if (allVideos.length === 0 && !searchQuery && selectedCategory === 'All') {
      allVideos = MOCK_VIDEOS;
    }
  } catch (error) {
    console.error("Video fetch error:", error);
    allVideos = MOCK_VIDEOS;
  }

  const categories = ['All', ...new Set(allVideos.map(v => v.category))];

  return (
    <div className="min-h-screen pt-36 pb-16">
      <div className="site-container">
      {/* Header */}
      <div className="mb-12 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[var(--primary)]/10 rounded-[var(--radius-full)] blur-3xl -z-10 animate-pulse pointer-events-none" />
        <h1 className="text-4xl sm:text-5xl font-black font-bengali text-[var(--foreground)] mb-4 leading-tight tracking-tight">
          সকল <span className="text-gradient">ভিডিও</span>
        </h1>
        <p className="text-base text-[var(--foreground)]/60 max-w-2xl mx-auto font-light leading-relaxed">
          Watch literature discussions, poetry recitations, and book reviews.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-12 flex flex-col md:flex-row gap-4 justify-between items-center liquid-glass p-4 rounded-[var(--radius-xl)]">
        <form className="relative w-full md:w-96 group" action="/videos" method="GET">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--foreground)]/40 group-focus-within:text-[var(--primary)] transition-colors" size={20} />
          <input
            type="text"
            name="q"
            defaultValue={searchQuery}
            placeholder="Search videos..."
            className="w-full pl-12 pr-4 py-3 rounded-[var(--radius-md)] bg-[var(--surface-200)]/50 border border-[var(--glass-border)] focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)] outline-none transition-all backdrop-blur-sm text-[var(--foreground)] placeholder-[var(--foreground)]/20 shadow-inner"
          />
          <button type="submit" className="sr-only">Search</button>
        </form>

        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide flex-wrap justify-center md:justify-start">
          {categories.map((category) => (
            <a
              key={category}
              href={category === 'All' ? '/videos' : `/videos?category=${encodeURIComponent(category)}`}
              className={`px-4 py-2 rounded-[var(--radius-full)] text-xs font-bold transition-all whitespace-nowrap uppercase tracking-wider ${category === selectedCategory
                ? 'bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/30'
                : 'bg-[var(--surface-200)] text-[var(--foreground)]/60 hover:bg-[var(--primary)]/10 hover:text-[var(--primary)] border border-[var(--glass-border)]'
                }`}
            >
              {category}
            </a>
          ))}
        </div>
      </div>

      {/* Featured Sections - Only show when not searching/filtering */}
      {!searchQuery && selectedCategory === 'All' && (
        <div className="space-y-20 mb-24">
          {/* Upcoming Section */}
          {upcomingVideos.length > 0 && (
            <section className="relative group">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-[var(--radius-lg)] bg-[#AF52DE]/10 flex items-center justify-center text-[#AF52DE] shadow-inner">
                  <Sparkles size={20} className="animate-pulse" />
                </div>
                <div>
                  <h2 className="text-2xl font-black font-bengali text-[var(--foreground)]">আসন্ন ভিডিও</h2>
                  <p className="text-[10px] font-black text-[var(--foreground)]/30 uppercase tracking-widest">Premiering Soon</p>
                </div>
                <div className="flex-1 h-[1px] bg-gradient-to-r from-[var(--glass-border)] to-transparent ml-4" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {upcomingVideos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </section>
          )}

          {/* Popular Section */}
          {popularVideos.length > 0 && (
            <section className="relative group">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-[var(--radius-lg)] bg-[#FF9500]/10 flex items-center justify-center text-[#FF9500] shadow-inner">
                  <TrendingUp size={20} className="animate-bounce" />
                </div>
                <div>
                  <h2 className="text-2xl font-black font-bengali text-[var(--foreground)]">জনপ্রিয় ভিডিও</h2>
                  <p className="text-[10px] font-black text-[var(--foreground)]/30 uppercase tracking-widest">Audience Favorites</p>
                </div>
                <div className="flex-1 h-[1px] bg-gradient-to-r from-[var(--glass-border)] to-transparent ml-4" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {popularVideos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {/* Main Library Section */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-[var(--radius-lg)] bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] shadow-inner">
            <Video size={20} />
          </div>
          <div>
            <h2 className="text-2xl font-black font-bengali text-[var(--foreground)]">
              {searchQuery ? 'অনুসন্ধানের ফলাফল' : selectedCategory !== 'All' ? `${selectedCategory} আর্কাইভ` : 'ভিডিও আর্কাইভ'}
            </h2>
            <p className="text-[10px] font-black text-[var(--foreground)]/30 uppercase tracking-widest">Complete Library</p>
          </div>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-[var(--glass-border)] to-transparent ml-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {allVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>

        {allVideos.length === 0 && (
          <div className="text-center py-24 bg-[var(--surface-100)]/40 rounded-[var(--radius-3xl)] border border-dashed border-[var(--glass-border)]">
            <Video size={48} className="mx-auto text-[var(--foreground)]/10 mb-4" />
            <p className="text-[var(--foreground)]/40 font-bold uppercase tracking-widest text-sm">No videos found in this sequence</p>
          </div>
        )}
      </section>
      </div>
    </div>
  );
}
