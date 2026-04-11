import Footer from "@/features/layout/components/Footer";
import Navbar from "@/features/layout/components/Navbar";
import { getSiteSettings } from "@/features/admin/api";

export default async function MainLayout({
    children
}: {
    children: React.ReactNode
}) {
    const settings = await getSiteSettings();

    return (
        <>
            <Navbar
                youtubeUrl={settings.youtubeUrl}
                siteTitle={settings.siteTitle}
            />
            <main className="min-h-screen flex-grow">{children}</main>
            <Footer
                youtubeUrl={settings.youtubeUrl}
                facebookUrl={settings.facebookUrl}
            />
        </>
    );
}