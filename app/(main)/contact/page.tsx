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
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-[var(--radius-full)] blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-[var(--radius-full)] blur-3xl -z-10 animate-pulse delay-1000" />

      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold font-bengali text-gray-900 dark:text-white mb-4 leading-tight">
          যোগাযোগ <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">করুন</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-light">
          We&apos;d love to hear from you. Whether you have a question, feedback, or just want to say hello.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Contact Form */}
        <div className="bg-[var(--surface-100)]/40 backdrop-blur-xl p-10 rounded-[var(--radius-xl)] border border-[var(--glass-border)] shadow-2xl shadow-black/5">
          <h2 className="text-2xl font-black text-[var(--foreground)] mb-8 tracking-tight uppercase tracking-[0.1em]">Send us a Message</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 h-12 rounded-[var(--radius-md)] bg-[var(--surface-200)]/50 border border-[var(--glass-border)] focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)] outline-none transition-all backdrop-blur-sm text-[var(--foreground)] placeholder-[var(--foreground)]/20 shadow-inner"
                  placeholder="Your Name"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 h-12 rounded-[var(--radius-md)] bg-[var(--surface-200)]/50 border border-[var(--glass-border)] focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)] outline-none transition-all backdrop-blur-sm text-[var(--foreground)] placeholder-[var(--foreground)]/20 shadow-inner"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full px-4 h-12 rounded-[var(--radius-md)] bg-[var(--surface-200)]/50 border border-[var(--glass-border)] focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)] outline-none transition-all backdrop-blur-sm text-[var(--foreground)] placeholder-[var(--foreground)]/20 shadow-inner"
                placeholder="What is this regarding?"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full px-4 py-3 rounded-[var(--radius-md)] bg-[var(--surface-200)]/50 border border-[var(--glass-border)] focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)] outline-none transition-all backdrop-blur-sm resize-none text-[var(--foreground)] placeholder-[var(--foreground)]/20 shadow-inner"
                placeholder="Your message here..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white font-black rounded-[var(--radius-md)] shadow-2xl shadow-[var(--primary)]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-[10px] disabled:opacity-50 disabled:cursor-not-allowed"
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
        <div className="space-y-6 lg:pt-12">
          <div className="bg-[var(--surface-100)]/40 backdrop-blur-xl p-8 rounded-[var(--radius-xl)] border border-[var(--glass-border)] shadow-xl hover:bg-[var(--surface-200)]/60 transition-all group cursor-pointer">
            <div className="flex items-start gap-6">
              <div className="p-4 bg-[var(--primary)]/10 text-[var(--primary)] rounded-[var(--radius-md)] group-hover:scale-110 transition-transform shadow-inner">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="text-lg font-black text-[var(--foreground)] mb-1 tracking-tight">Email Us</h3>
                <p className="text-[var(--foreground)]/40 text-xs font-bold uppercase tracking-widest mb-2">Our friendly team is here to help.</p>
                <a href="mailto:contact@sahityabari.com" className="text-[var(--primary)] font-black hover:underline tracking-tight">contact@sahityabari.com</a>
              </div>
            </div>
          </div>

          <div className="bg-[var(--surface-100)]/40 backdrop-blur-xl p-8 rounded-[var(--radius-xl)] border border-[var(--glass-border)] shadow-xl hover:bg-[var(--surface-200)]/60 transition-all group cursor-pointer">
            <div className="flex items-start gap-6">
              <div className="p-4 bg-[var(--secondary)]/10 text-[var(--secondary)] rounded-[var(--radius-md)] group-hover:scale-110 transition-transform shadow-inner">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="text-lg font-black text-[var(--foreground)] mb-1 tracking-tight">Visit Us</h3>
                <p className="text-[var(--foreground)]/40 text-xs font-bold uppercase tracking-widest mb-2">Come say hello at our office.</p>
                <p className="text-[var(--foreground)]/80 font-black tracking-tight">123 Literature Lane, Dhaka, Bangladesh</p>
              </div>
            </div>
          </div>

          <div className="bg-[var(--surface-100)]/40 backdrop-blur-xl p-8 rounded-[var(--radius-xl)] border border-[var(--glass-border)] shadow-xl hover:bg-[var(--surface-200)]/60 transition-all group cursor-pointer">
            <div className="flex items-start gap-6">
              <div className="p-4 bg-[var(--accent)]/10 text-[var(--accent)] rounded-[var(--radius-md)] group-hover:scale-110 transition-transform shadow-inner">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="text-lg font-black text-[var(--foreground)] mb-1 tracking-tight">Call Us</h3>
                <p className="text-[var(--foreground)]/40 text-xs font-bold uppercase tracking-widest mb-2">Mon-Fri from 8am to 5pm.</p>
                <a href="tel:+8801234567890" className="text-[var(--accent)] font-black hover:underline tracking-tight">+880 1234 567 890</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
