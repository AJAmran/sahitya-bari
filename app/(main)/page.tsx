import dbConnect from '@/lib/mongodb';
import Video from '@/lib/models/Video';
import BlogPost from '@/lib/models/BlogPost';
import Hero from '@/components/Hero';
import FeaturedSpotlight from '@/components/FeaturedSpotlight';
import VideoCard from '@/components/VideoCard';
import BlogCard from '@/components/BlogCard';
import AudioSection from '@/components/AudioSection';
import NewsletterForm from '@/components/NewsletterForm';
import { formatDuration } from '@/lib/utils';
import { Search, ArrowRight, TrendingUp, Sparkles, Filter } from 'lucide-react';
import Link from 'next/link';
import { getSiteSettings } from '@/app/actions/settings';

// Fallback Mock Data
const MOCK_VIDEOS = [
  {
    id: '1',
    title: 'রবীন্দ্রনাথের শেষের কবিতা | Shesher Kobita Review',
    slug: 'shesher-kobita-review',
    thumbnail: 'https://picsum.photos/seed/rabindranath/640/360',
    views: '125K',
    duration: '15:24',
    publishedAt: new Date('2023-10-15').toISOString(),
    category: 'Literature'
  },
  {
    id: '2',
    title: 'জীবনানন্দ দাশের বনলতা সেন | Banalata Sen Analysis',
    slug: 'banalata-sen-analysis',
    thumbnail: 'https://picsum.photos/seed/jibonananda/640/360',
    views: '98K',
    duration: '12:45',
    publishedAt: new Date('2023-11-20').toISOString(),
    category: 'Poetry'
  },
  {
    id: '3',
    title: 'হুমায়ূন আহমেদের সেরা ১০টি বই | Top 10 Humayun Ahmed Books',
    slug: 'top-10-humayun-ahmed',
    thumbnail: 'https://picsum.photos/seed/humayun/640/360',
    views: '210K',
    duration: '18:30',
    publishedAt: new Date('2023-09-05').toISOString(),
    category: 'Review'
  },
  {
    id: '4',
    title: 'সুনীল গঙ্গোপাধ্যায়ের শ্রেষ্ঠ কবিতা | Best Poems of Sunil',
    slug: 'sunil-gangopadhyay-poems',
    thumbnail: 'https://picsum.photos/seed/sunil/640/360',
    views: '85K',
    duration: '10:15',
    publishedAt: new Date('2023-12-05').toISOString(),
    category: 'Recitation'
  }
];

const MOCK_BLOGS = [
  {
    id: '1',
    title: 'বাংলা সাহিত্যের আধুনিক যুগ ও তার বিবর্তন',
    slug: 'modern-bengali-literature',
    excerpt: 'উনবিংশ শতাব্দীর শেষ ভাগ থেকে শুরু করে বর্তমান সময় পর্যন্ত বাংলা সাহিত্যের যে বিবর্তন ঘটেছে, তা নিয়েই আজকের আলোচনা।',
    coverImage: 'https://picsum.photos/seed/literature/800/600',
    author: 'Khalid Ibne Wadud',
    publishedAt: new Date('2023-12-01').toISOString(),
    category: 'সাহিত্য'
  },
  {
    id: '2',
    title: 'কবিতা আবৃত্তির কিছু টিপস',
    slug: 'poetry-recitation-tips',
    excerpt: 'কবিতা আবৃত্তি কেবল পাঠ নয়, এটি একটি শিল্প। কীভাবে সঠিক উচ্চারণে ও আবেগে কবিতা পাঠ করবেন?',
    coverImage: 'https://picsum.photos/seed/poetry/800/600',
    author: 'Admin',
    publishedAt: new Date('2023-12-10').toISOString(),
    category: 'কবিতা'
  },
  {
    id: '3',
    title: 'বইমেলা ২০২৪: কী কী নতুন বই আসছে?',
    slug: 'book-fair-2024',
    excerpt: 'আসন্ন বইমেলায় কোন কোন লেখকের নতুন বই আসছে এবং পাঠকদের প্রত্যাশা কী?',
    coverImage: 'https://picsum.photos/seed/bookfair/800/600',
    author: 'Editor',
    publishedAt: new Date('2023-12-15').toISOString(),
    category: 'খ খবর'
  }
];

async function getPopularVideos() {
  try {
    await dbConnect();
    const videos = await Video.find({ isPopular: true })
      .sort({ publishedAt: -1 })
      .limit(4)
      .lean();

    if (videos && videos.length > 0) {
      return videos.map((v: any) => ({
        id: v._id.toString(),
        title: v.title,
        slug: v.youtubeId || v._id.toString(),
        thumbnail: v.thumbnail || '',
        views: v.views || '0',
        duration: formatDuration(v.duration || ''),
        publishedAt: v.publishedAt.toISOString(),
        category: v.category || 'Video'
      }));
    }
    // If no popular videos marked, return latest as fallback
    return await getLatestVideos();
  } catch (error) {
    console.error("Failed to fetch popular videos:", error);
    return MOCK_VIDEOS;
  }
}

async function getUpcomingVideos() {
  try {
    await dbConnect();
    const videos = await Video.find({ isUpcoming: true })
      .sort({ publishedAt: -1 })
      .limit(4)
      .lean();

    if (videos && videos.length > 0) {
      return videos.map((v: any) => ({
        id: v._id.toString(),
        title: v.title,
        slug: v.youtubeId || v._id.toString(),
        thumbnail: v.thumbnail || '',
        views: v.views || '0',
        duration: formatDuration(v.duration || ''),
        publishedAt: v.publishedAt.toISOString(),
        category: v.category || 'Upcoming'
      }));
    }
    return []; // Return empty if none
  } catch (error) {
    console.error("Failed to fetch upcoming videos:", error);
    return [];
  }
}

async function getLatestVideos() {
  try {
    await dbConnect();
    const videos = await Video.find()
      .sort({ publishedAt: -1 })
      .limit(4)
      .lean();

    if (videos && videos.length > 0) {
      return videos.map((v: any) => ({
        id: v._id.toString(),
        title: v.title,
        slug: v.youtubeId || v._id.toString(),
        thumbnail: v.thumbnail || '',
        views: v.views || '0',
        duration: formatDuration(v.duration || ''),
        publishedAt: v.publishedAt.toISOString(),
        category: v.category || 'Video'
      }));
    }
    return MOCK_VIDEOS;
  } catch (e) {
    return MOCK_VIDEOS;
  }
}

async function getVideos() {
  return await getLatestVideos();
}

async function getBlogs() {
  try {
    await dbConnect();
    const blogs = await BlogPost.find()
      .sort({ publishedAt: -1 })
      .limit(3)
      .lean();

    if (blogs && blogs.length > 0) {
      return blogs.map((b: any) => ({
        id: b._id.toString(),
        title: b.title,
        slug: b.slug,
        excerpt: b.excerpt || '',
        coverImage: b.coverImage || '',
        author: b.author,
        publishedAt: b.publishedAt.toISOString(),
        category: b.category
      }));
    }
    return MOCK_BLOGS;
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return MOCK_BLOGS;
  }
}


export default async function Home() {
  const settings = await getSiteSettings();
  const popularVideos = await getPopularVideos();
  const upcomingVideos = await getUpcomingVideos();
  const blogs = await getBlogs();

  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)] selection:bg-[var(--primary)] selection:text-white overflow-x-hidden">
      <Hero
        title={settings.heroTitle}
        subtitle={settings.heroSubtitle}
        youtubeUrl={settings.youtubeUrl}
      />

      {/* Search & Filter Bar - Floating iOS Style */}
      <div className="sticky top-24 z-40 mb-[var(--space-4)] -mt-[var(--space-4)]">
        <div className="site-container w-full">
          <form action="/blog" method="GET" className="max-w-4xl mx-auto liquid-glass rounded-[var(--radius-full)] p-[var(--space-1)] flex items-center gap-[var(--space-1)] transition-all duration-300 hover:shadow-xl shadow-lg pointer-events-auto">
            <div className="flex-1 flex items-center gap-[var(--space-2)] px-[var(--space-2)]">
              <Search className="text-[var(--foreground)]/40" size={20} />
              <input
                type="text"
                name="q"
                placeholder="Search for poems, stories, or authors..."
                className="w-full bg-transparent border-none outline-none text-[var(--foreground)] placeholder-[var(--foreground)]/40 font-medium h-[44px]"
              />
            </div>
            <div className="h-8 w-[1px] bg-[var(--glass-border)]" />
            <Link href="/blog" className="flex items-center gap-2 px-[var(--space-2)] h-[44px] rounded-[var(--radius-full)] hover:bg-[var(--surface-200)] text-[var(--foreground)]/70 transition-colors text-sm font-medium min-w-[44px]">
              <Filter size={16} />
              <span className="hidden sm:inline">Filters</span>
            </Link>
            <button type="submit" className="btn-ios px-[var(--space-3)] h-[44px] bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white rounded-[var(--radius-full)] font-medium shadow-lg shadow-[var(--primary)]/20 min-w-[44px]">
              Search
            </button>
          </form>
        </div>
      </div>

      <FeaturedSpotlight />

      {/* Upcoming Videos Section - Premium Edition */}
      {upcomingVideos.length > 0 && (
        <section className="py-[var(--space-12)] relative overflow-hidden">
          {/* Section Background Decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-full pointer-events-none opacity-[0.03] dark:opacity-[0.05]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,oklch(40%_0.10_145),transparent_70%)]" />
          </div>

          <div className="site-container relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-[var(--space-8)] gap-6">
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-24 h-24 bg-[var(--accent)]/20 rounded-[var(--radius-full)] blur-[60px] animate-pulse" />
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[var(--radius-full)] bg-[var(--accent)]/10 text-[var(--accent)] text-[10px] font-black uppercase tracking-[0.2em] border border-[var(--accent)]/20 mb-3 backdrop-blur-sm">
                  <Sparkles size={12} className="animate-pulse" />
                  <span>Premiering Soon</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-bengali text-[var(--foreground)] tracking-tight leading-[1.2]">
                  আসন্ন <span className="text-[var(--accent)]">ভিডিও</span>
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-[var(--accent)] to-transparent rounded-[var(--radius-full)] mt-4" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-[var(--space-4)] sm:gap-[var(--space-6)]">
              {upcomingVideos.map((video: any, idx: number) => (
                <div key={video.id} className="col-span-1 md:col-span-1 lg:col-span-3 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both" style={{ animationDelay: `${idx * 150}ms` }}>
                  <VideoCard video={video} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Popular Videos Section - Premium Edition */}
      <section className="py-[var(--space-12)] relative overflow-hidden">
        {/* Section Background Decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-full pointer-events-none opacity-[0.03] dark:opacity-[0.05]">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,oklch(65%_0.10_50),transparent_70%)]" />
        </div>

        <div className="site-container relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-[var(--space-8)] gap-6">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-24 h-24 bg-[var(--accent-warm)]/20 rounded-[var(--radius-full)] blur-[60px] animate-pulse" />
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[var(--radius-full)] bg-[var(--accent-warm)]/10 text-[var(--accent-warm)] text-[10px] font-black uppercase tracking-[0.2em] border border-[var(--accent-warm)]/20 mb-3 backdrop-blur-sm">
                <TrendingUp size={12} className="animate-bounce" />
                <span>Trending Now</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-bengali text-[var(--foreground)] tracking-tight leading-[1.2]">
                জনপ্রিয় <span className="text-[var(--accent-warm)]">ভিডিও</span>
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-[var(--accent-warm)] to-transparent rounded-[var(--radius-full)] mt-4" />
            </div>

            <Link
              href="/videos"
              className="flex items-center gap-3 px-6 h-[48px] rounded-[var(--radius-full)] frosted-glass border border-[var(--glass-border)] text-[var(--foreground)] hover:bg-[var(--primary)] hover:text-white transition-all duration-500 font-bold text-[10px] uppercase tracking-widest group shadow-lg hover:shadow-[var(--primary)]/10"
            >
              <span>Explore Library</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-[var(--space-4)] sm:gap-[var(--space-6)]">
            {popularVideos.map((video: any, idx: number) => (
              <div key={video.id} className="col-span-1 md:col-span-1 lg:col-span-3 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both" style={{ animationDelay: `${idx * 150}ms` }}>
                <VideoCard video={video} />
              </div>
            ))}
          </div>

          <div className="mt-[var(--space-10)] text-center sm:hidden">
            <Link href="/videos" className="btn-ios inline-flex items-center justify-center gap-3 w-full h-[56px] bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white font-black uppercase tracking-widest text-xs rounded-[var(--radius-full)] shadow-2xl shadow-[var(--primary)]/20">
              Explore Library <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <AudioSection />

      {/* Blog Section */}
      <section className="py-[var(--space-10)] relative">
        {/* Section Background Highlight */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--surface-100)] to-transparent pointer-events-none" />

        <div className="site-container relative z-10">
          <div className="flex items-end justify-between mb-[var(--space-6)]">
            <div>
              <div className="flex items-center gap-2 text-[var(--secondary)] font-semibold mb-2 uppercase tracking-wider text-xs">
                <Sparkles size={16} />
                <span>Latest Insights</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-bengali text-[var(--foreground)] leading-tight">
                সাম্প্রতিক <span className="text-gradient">ব্লগ</span>
              </h2>
            </div>
            <Link
              href="/blog"
              className="hidden sm:flex items-center gap-2 px-5 h-[44px] rounded-[var(--radius-full)] frosted-glass text-[var(--foreground)] hover:bg-[var(--surface-200)] hover:text-[var(--secondary)] transition-all btn-ios group"
            >
              <span className="font-medium">Read More</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* 12-Column Grid Implementation */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-[var(--space-4)]">
            {blogs.map((post: any) => (
              <div key={post.id} className="col-span-1 md:col-span-1 lg:col-span-4">
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-[var(--space-10)]">
        <div className="site-container">
          <div className="max-w-5xl mx-auto relative overflow-hidden rounded-[2.5rem] liquid-glass text-center py-[var(--space-10)] px-[var(--space-4)] group">
            {/* Animated Background */}
            <div className="absolute inset-0 opacity-30 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,oklch(52%_0.09_120/0.1),transparent_70%)] group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,oklch(72%_0.06_75/0.1),transparent_60%)] animate-pulse" />
            </div>

            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="inline-block py-1 px-3 rounded-[var(--radius-full)] bg-[var(--surface-200)] border border-[var(--glass-border)] text-[var(--primary)] text-xs font-bold uppercase tracking-widest mb-[var(--space-3)] backdrop-blur-md">
                Stay Connected
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-bengali text-[var(--foreground)] mb-[var(--space-3)] leading-tight">
                সাহিত্য প্রেমীদের জন্য
              </h2>
              <p className="text-[var(--foreground)]/70 mb-[var(--space-5)] text-lg font-light leading-relaxed">
                Join our newsletter to get the latest updates, book reviews, and literary discussions delivered straight to your inbox.
              </p>

              <NewsletterForm variant="section" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
