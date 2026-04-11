import { Suspense } from 'react';
import { getSiteSettings } from '@/features/admin/api';
import FeaturedSpotlight from '@/features/spotlight/components/FeaturedSpotlight';
import AudioSection from '@/features/videos/components/AudioSection';

/* Home Feature Components */
import Hero from '@/features/home/components/Hero';
import HomeSearch from '@/features/home/components/HomeSearch';
import UpcomingVideos from '@/features/home/components/UpcomingVideos';
import PopularVideos from '@/features/home/components/PopularVideos';
import LatestBlogs from '@/features/home/components/LatestBlogs';
import NewsletterSection from '@/features/home/components/NewsletterSection';

export default async function Home() {
  const settings = await getSiteSettings();

  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)] selection:bg-[var(--primary)] selection:text-white overflow-x-hidden">
      <Hero
        title={settings.heroTitle}
        subtitle={settings.heroSubtitle}
      />
      
      <HomeSearch />

      <FeaturedSpotlight />

      {/* Upcoming Videos Section */}
      <Suspense fallback={<HomeSectionFallback label="upcoming features" />}>
        <UpcomingVideos />
      </Suspense>

      {/* Popular Videos Section */}
      <Suspense fallback={<HomeSectionFallback label="trending videos" />}>
        <PopularVideos />
      </Suspense>

      <AudioSection />

      {/* Blog Section */}
      <Suspense fallback={<HomeSectionFallback label="latest stories" />}>
        <LatestBlogs />
      </Suspense>

      <NewsletterSection />
    </div>
  );
}

function HomeSectionFallback({ label }: { label: string }) {
  return (
    <div className="site-container py-20 text-center opacity-50 animate-pulse font-medium tracking-widest uppercase text-xs">
      Loading {label}...
    </div>
  );
}
