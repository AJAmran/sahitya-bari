import { auth } from "@/lib/auth-node";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import AdminSidebar from "@/features/admin/components/AdminSidebar";
import AdminMobileHeader from "@/features/admin/components/AdminMobileHeader";
import AdminBottomNav from "@/features/admin/components/AdminBottomNav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let session = null;
  try {
    session = await auth();
  } catch (error: any) {
    if (error?.digest?.includes('HANGING_PROMISE_REJECTION') || error?.message?.includes('headers()')) {
      session = null;
    } else {
      throw error;
    }
  }

  if (!session || session.user.role !== "ADMIN") {
    redirect("/auth/signin");
  }

  return (
    <div className="flex min-h-screen bg-[var(--background)] transition-colors duration-500 ease-in-out antialiased admin-suite">
      <AdminSidebar session={session} />

      <div className="flex-1 flex flex-col min-h-screen relative">
        <AdminMobileHeader />

        <main className="flex-1 p-6 sm:p-8 md:p-10 lg:p-14 transition-all duration-500 overflow-x-hidden min-h-screen pb-32 lg:pb-14">
          <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <Suspense fallback={
              <div className="space-y-8 animate-pulse">
                <div className="h-12 w-48 bg-[var(--surface-300)] rounded-xl" />
                <div className="h-96 w-full bg-[var(--surface-200)] rounded-3xl" />
              </div>
            }>
              {children}
            </Suspense>
          </div>
        </main>

        <AdminBottomNav />
      </div>
    </div>
  );
}
