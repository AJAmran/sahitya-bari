import SettingsForm from '@/features/admin/components/SettingsForm';

export default function AdminSettingsPage() {
  return (
    <div className="space-y-12 max-w-5xl animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="space-y-1">
        <h1 className="text-2xl lg:text-3xl font-black text-[var(--foreground)] tracking-tight">System Configuration</h1>
        <p className="text-[var(--foreground)]/50 font-medium">Control global branding and platform parameters.</p>
      </div>

      <SettingsForm />
    </div>
  );
}
