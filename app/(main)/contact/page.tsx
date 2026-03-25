"use client"

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import { sendContactMessage } from '@/app/actions/contact';
import { toast } from 'sonner';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    try {
      const result = await sendContactMessage(formData);
      if (result.success) {
        toast.success(result.message);
        (e.target as HTMLFormElement).reset();
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen pt-36 pb-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--primary)]/10 rounded-[var(--radius-full)] blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--secondary)]/10 rounded-[var(--radius-full)] blur-3xl -z-10 animate-pulse delay-1000" />

      <div className="site-container">
        <div className="text-center mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--primary)] mb-3">Get In Touch</p>
          <h1 className="text-4xl sm:text-5xl font-black font-bengali text-[var(--foreground)] mb-4 leading-tight">
            যোগাযোগ <span className="text-gradient">করুন</span>
          </h1>
          <p className="text-base text-[var(--foreground)]/60 max-w-2xl mx-auto font-light leading-relaxed">
            We&apos;d love to hear from you. Whether you have a question, feedback, or just want to say hello.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Contact Form */}
          <div className="lg:col-span-3 glass-card p-8 sm:p-10 rounded-[var(--radius-xl)]">
            <h2 className="text-xl font-black text-[var(--foreground)] mb-8 tracking-tight uppercase tracking-[0.1em]">Send us a Message</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="block text-xs font-bold uppercase tracking-widest text-[var(--foreground)]/50">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 h-12 rounded-[var(--radius-md)] bg-[var(--surface-200)]/50 border border-[var(--glass-border)] focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)] outline-none transition-all text-[var(--foreground)] placeholder:text-[var(--foreground)]/30 text-sm"
                    placeholder="Your Name"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-[var(--foreground)]/50">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 h-12 rounded-[var(--radius-md)] bg-[var(--surface-200)]/50 border border-[var(--glass-border)] focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)] outline-none transition-all text-[var(--foreground)] placeholder:text-[var(--foreground)]/30 text-sm"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-widest text-[var(--foreground)]/50">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 h-12 rounded-[var(--radius-md)] bg-[var(--surface-200)]/50 border border-[var(--glass-border)] focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)] outline-none transition-all text-[var(--foreground)] placeholder:text-[var(--foreground)]/30 text-sm"
                  placeholder="What is this regarding?"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="block text-xs font-bold uppercase tracking-widest text-[var(--foreground)]/50">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-[var(--radius-md)] bg-[var(--surface-200)]/50 border border-[var(--glass-border)] focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)] outline-none transition-all resize-none text-[var(--foreground)] placeholder:text-[var(--foreground)]/30 text-sm"
                  placeholder="Your message here..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white font-black rounded-[var(--radius-md)] shadow-xl shadow-[var(--primary)]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-[11px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="glass-card p-7 rounded-[var(--radius-xl)] hover:bg-[var(--surface-100)] transition-all group cursor-pointer">
              <div className="flex items-start gap-5">
                <div className="p-3 bg-[var(--primary)]/10 text-[var(--primary)] rounded-[var(--radius-md)] group-hover:scale-110 transition-transform shrink-0">
                  <Mail size={22} />
                </div>
                <div>
                  <h3 className="text-base font-black text-[var(--foreground)] mb-1 tracking-tight">Email Us</h3>
                  <p className="text-[var(--foreground)]/50 text-xs font-bold uppercase tracking-widest mb-2">Our friendly team is here.</p>
                  <a href="mailto:contact@sahityabari.com" className="text-[var(--primary)] font-bold text-sm hover:underline">contact@sahityabari.com</a>
                </div>
              </div>
            </div>

            <div className="glass-card p-7 rounded-[var(--radius-xl)] hover:bg-[var(--surface-100)] transition-all group cursor-pointer">
              <div className="flex items-start gap-5">
                <div className="p-3 bg-[var(--secondary)]/10 text-[var(--secondary)] rounded-[var(--radius-md)] group-hover:scale-110 transition-transform shrink-0">
                  <MapPin size={22} />
                </div>
                <div>
                  <h3 className="text-base font-black text-[var(--foreground)] mb-1 tracking-tight">Visit Us</h3>
                  <p className="text-[var(--foreground)]/50 text-xs font-bold uppercase tracking-widest mb-2">Come say hello at our office.</p>
                  <p className="text-[var(--foreground)]/80 text-sm font-medium">123 Literature Lane, Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-7 rounded-[var(--radius-xl)] hover:bg-[var(--surface-100)] transition-all group cursor-pointer">
              <div className="flex items-start gap-5">
                <div className="p-3 bg-[var(--accent)]/10 text-[var(--accent)] rounded-[var(--radius-md)] group-hover:scale-110 transition-transform shrink-0">
                  <Phone size={22} />
                </div>
                <div>
                  <h3 className="text-base font-black text-[var(--foreground)] mb-1 tracking-tight">Call Us</h3>
                  <p className="text-[var(--foreground)]/50 text-xs font-bold uppercase tracking-widest mb-2">Mon–Fri from 8am to 5pm.</p>
                  <a href="tel:+8801234567890" className="text-[var(--accent)] font-bold text-sm hover:underline">+880 1234 567 890</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
