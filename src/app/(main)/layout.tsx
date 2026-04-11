import Footer from "@/features/layout/components/Footer";
import Navbar from "@/features/layout/components/Navbar";
import { getSiteSettings } from "@/features/admin/api";
import { CartProvider } from "@/components/providers/CartProvider";
import CartDrawer from "@/components/ui/CartDrawer";
export default async function MainLayout({
    children
}: {
    children: React.ReactNode
}) {
    const settings = await getSiteSettings();

    return (
        <CartProvider>
            <CartDrawer />
            <Navbar
                youtubeUrl={settings.youtubeUrl}
                siteTitle={settings.siteTitle}
            />
            <main className="min-h-screen flex-grow">{children}</main>
            <Footer
                youtubeUrl={settings.youtubeUrl}
                facebookUrl={settings.facebookUrl}
            />
        </CartProvider>
    );
}