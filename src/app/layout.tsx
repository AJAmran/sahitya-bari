import type { Metadata } from 'next';
import { Inter, Noto_Sans_Bengali } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/features/layout/components/theme-provider';
import { Toaster } from 'sonner';
import { getSiteSettings } from '@/features/admin/api';
import CookieConsent from '@/features/layout/components/CookieConsent';
import { Suspense } from 'react';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  variable: '--font-bengali',
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: settings.siteTitle || 'Sahitya Bari | সাহিত্য বাড়ি',
    description: settings.heroSubtitle || 'Exploring Literature & Culture',
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <html lang="bn" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${notoSansBengali.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="mesh-bg" />
          <Suspense fallback={null}>
            {children}
          </Suspense>
          <Toaster
            position="top-right"
            richColors
            closeButton
            toastOptions={{
              duration: 4000,
            }}
          />
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  );
}
