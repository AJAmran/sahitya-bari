import BlogCard from '@/components/BlogCard';
import Link from 'next/link';
import { BookOpen, Search } from 'lucide-react';
import dbConnect from '@/lib/mongodb';
import BlogPost from '@/lib/models/BlogPost';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Sahitya Bari',
  description: 'Read insightful articles, reviews, and literary analyses from the Sahitya Bari team.',
};

// Fallback Mock Data (used when database is empty)
const MOCK_BLOGS = [
  {
    title: 'বাংলা সাহিত্যের আধুনিক যুগ ও তার বিবর্তন',
    slug: 'modern-bengali-literature',
    excerpt: 'উনবিংশ শতাব্দীর শেষ ভাগ থেকে শুরু করে বর্তমান সময় পর্যন্ত বাংলা সাহিত্যের যে বিবর্তন ঘটেছে, তা নিয়েই আজকের আলোচনা।',
    coverImage: 'https://picsum.photos/seed/literature/800/600',
    author: 'Khalid Ibne Wadud',
    publishedAt: '2023-12-01',
    category: 'সাহিত্য'
  },
  {
    title: 'কবিতা আবৃত্তির কিছু টিপস',
    slug: 'poetry-recitation-tips',
    excerpt: 'কবিতা আবৃত্তি কেবল পাঠ নয়, এটি একটি শিল্প। কীভাবে সঠিক উচ্চারণে ও আবেগে কবিতা পাঠ করবেন?',
    coverImage: 'https://picsum.photos/seed/poetry/800/600',
    author: 'Admin',
    publishedAt: '2023-12-10',
    category: 'কবিতা'
  },
  {
    title: 'বইমেলা ২০২৪: কী কী নতুন বই আসছে?',
    slug: 'book-fair-2024',
    excerpt: 'আসন্ন বইমেলায় কোন কোন লেখকের নতুন বই আসছে এবং পাঠকদের প্রত্যাশা কী?',
    coverImage: 'https://picsum.photos/seed/bookfair/800/600',
    author: 'Editor',
    publishedAt: '2023-12-15',
    category: 'খবর'
  },
  {
    title: 'মানিক বন্দ্যোপাধ্যায়ের ছোটগল্পে বাস্তবতা',
    slug: 'manik-bandyopadhyay-stories',
    excerpt: 'মানিক বন্দ্যোপাধ্যায়ের ছোটগল্পে নিম্নবিত্ত মানুষের জীবনসংগ্রাম ও মনস্তাত্ত্বিক বিশ্লেষণ।',
    coverImage: 'https://picsum.photos/seed/manik/800/600',
    author: 'Guest Writer',
    publishedAt: '2023-11-28',
    category: 'সমালোচনা'
  },
  {
    title: 'রবীন্দ্রসঙ্গীতের ভাব ও ভাষা',
    slug: 'rabindra-sangeet-meaning',
    excerpt: 'রবীন্দ্রসঙ্গীতের কথা ও সুরের মাঝে যে গভীর দর্শন লুকিয়ে আছে, তা নিয়ে একটি বিশ্লেষণ।',
    coverImage: 'https://picsum.photos/seed/music/800/600',
    author: 'Music Lover',
    publishedAt: '2023-11-15',
    category: 'সঙ্গীত'
  },
  {
    title: 'নজরুলের গানে প্রেম ও বিদ্রোহ',
    slug: 'nazrul-songs-love-rebellion',
    excerpt: 'কাজী নজরুল ইসলামের গানে প্রেম ও বিদ্রোহ কীভাবে সমান্তরালভাবে এসেছে?',
    coverImage: 'https://picsum.photos/seed/nazrul-song/800/600',
    author: 'Researcher',
    publishedAt: '2023-11-05',
    category: 'সঙ্গীত'
  }
];

interface BlogListingPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BlogListingPage({ searchParams }: BlogListingPageProps) {
  const params = await searchParams;
  const selectedCategory = (params.category as string) || 'All';
  const searchQuery = (params.q as string) || '';

  let blogs: any[] = [];
  try {
    await dbConnect();

    const query: any = {};
    if (selectedCategory !== 'All') {
      query.category = selectedCategory;
    }
    if (searchQuery) {
      query.$or = [
        { title: { $regex: searchQuery, $options: 'i' } },
        { excerpt: { $regex: searchQuery, $options: 'i' } },
      ];
    }

    const dbBlogs = await BlogPost.find(query)
      .sort({ publishedAt: -1 })
      .lean();

    if (dbBlogs && dbBlogs.length > 0) {
      blogs = dbBlogs.map((b: any) => ({
        title: b.title,
        slug: b.slug,
        excerpt: b.excerpt || '',
        coverImage: b.coverImage || 'https://picsum.photos/seed/default/800/600',
        author: b.author,
        publishedAt: b.publishedAt.toISOString().split('T')[0],
        category: b.category,
      }));
    } else {
      blogs = MOCK_BLOGS;
    }
  } catch (error) {
    console.error("Blog fetch error:", error);
    blogs = MOCK_BLOGS;
  }

  // Get unique categories for filter
  const allCategories = ['All', ...new Set(blogs.map(b => b.category))];

  return (
    <div className="min-h-screen pt-36 pb-16">
      <div className="site-container">
      {/* Header */}
      <div className="mb-12 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[var(--secondary)]/10 rounded-[var(--radius-full)] blur-3xl -z-10 animate-pulse pointer-events-none" />
        <h1 className="text-4xl sm:text-5xl font-black font-bengali text-[var(--foreground)] mb-4 leading-tight">
          আমাদের{' '}
          <span className="text-gradient">ব্লগ সমূহ</span>
        </h1>
        <p className="text-base text-[var(--foreground)]/60 max-w-2xl mx-auto font-light leading-relaxed">
          Read insightful articles, reviews, and literary analyses from our team.
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-12 flex flex-col md:flex-row gap-4 justify-between items-center liquid-glass p-4 rounded-[var(--radius-xl)]">
        <form className="relative w-full md:w-96 group" action="/blog" method="GET">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--foreground)]/40 group-focus-within:text-[var(--primary)] transition-colors" size={20} />
          <input
            type="text"
            name="q"
            defaultValue={searchQuery}
            placeholder="Search articles..."
            className="w-full pl-12 pr-4 py-3 rounded-[var(--radius-md)] bg-[var(--surface-200)]/50 border border-[var(--glass-border)] focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)] outline-none transition-all backdrop-blur-sm text-[var(--foreground)] placeholder-[var(--foreground)]/20 shadow-inner"
          />
          {/* Hidden submit on enter */}
          <button type="submit" className="sr-only">Search</button>
        </form>

        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide flex-wrap justify-center md:justify-start">
          {allCategories.map((category) => (
            <Link
              key={category}
              href={category === 'All' ? '/blog' : `/blog?category=${encodeURIComponent(category)}`}
              className={`px-4 py-2 rounded-[var(--radius-full)] text-xs font-bold transition-all whitespace-nowrap uppercase tracking-wider ${category === selectedCategory
                ? 'bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/30'
                : 'bg-[var(--surface-200)] text-[var(--foreground)]/60 hover:bg-[var(--primary)]/10 hover:text-[var(--primary)] border border-[var(--glass-border)]'
                }`}
            >
              {category}
            </Link>
          ))}
        </div>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {blogs.map((post, index) => (
          <BlogCard key={post.slug + index} post={post} />
        ))}
      </div>

      {blogs.length === 0 && (
        <div className="text-center py-24 bg-[var(--surface-100)]/40 rounded-[var(--radius-xl)] border border-dashed border-[var(--glass-border)]">
          <BookOpen size={48} className="mx-auto text-[var(--foreground)]/10 mb-4" />
          <p className="text-[var(--foreground)]/40 font-bold uppercase tracking-widest text-sm">No articles found</p>
          {searchQuery && (
            <Link href="/blog" className="mt-4 inline-block text-[var(--primary)] text-sm font-bold hover:underline">Clear search</Link>
          )}
        </div>
      )}
      </div>
    </div>
  );
}
