import { Mail, Phone, MapPin } from 'lucide-react';

const contacts = [
  {
    Icon: Mail,
    colorVar: 'primary',
    title: 'Email Us',
    subtitle: 'Our friendly team is here.',
    content: <a href="mailto:contact@sahityabari.com" className="text-[var(--primary)] font-bold text-sm hover:underline">contact@sahityabari.com</a>,
  },
  {
    Icon: MapPin,
    colorVar: 'secondary',
    title: 'Visit Us',
    subtitle: 'Come say hello at our office.',
    content: <p className="text-[var(--foreground)]/75 text-sm font-medium">123 Literature Lane, Dhaka, Bangladesh</p>,
  },
  {
    Icon: Phone,
    colorVar: 'accent',
    title: 'Call Us',
    subtitle: 'Mon–Fri from 8am to 5pm.',
    content: <a href="tel:+8801234567890" className="text-[var(--accent)] font-bold text-sm hover:underline">+880 1234 567 890</a>,
  },
];

export default function ContactInfo() {
  return (
    <div className="lg:col-span-2 space-y-3">
      {contacts.map(({ Icon, colorVar, title, subtitle, content }) => (
        <div
          key={title}
          className="glass-card p-5 sm:p-6 rounded-[var(--radius-xl)] hover:bg-[var(--surface-100)] transition-all group cursor-pointer"
        >
          <div className="flex items-start gap-4">
            <div
              className="p-2.5 rounded-[var(--radius-md)] shrink-0 group-hover:scale-105 transition-transform"
              style={{ background: `oklch(from var(--${colorVar}) l c h / 0.1)`, color: `var(--${colorVar})` }}
            >
              <Icon size={20} />
            </div>
            <div className="space-y-0.5 min-w-0">
              <h3 className="text-sm font-black text-[var(--foreground)] tracking-tight">{title}</h3>
              <p className="text-[0.65rem] text-[var(--foreground)]/45 font-bold uppercase tracking-widest">{subtitle}</p>
              <div className="pt-1">{content}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
