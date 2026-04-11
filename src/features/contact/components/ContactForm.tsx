"use client"

import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { submitContact } from '../actions';
import { toast } from 'sonner';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    try {
      const result = await submitContact(formData);
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

  const inputClass =
    "w-full px-4 h-11 rounded-[var(--radius-md)] bg-[var(--surface-200)] dark:bg-[var(--surface-200)] border border-[var(--glass-border)] focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] outline-none transition-all text-[var(--foreground)] placeholder:text-[var(--foreground)]/30 text-sm";

  return (
    <div className="lg:col-span-3 glass-card p-6 sm:p-8 rounded-[var(--radius-2xl)]">
      <h2 className="text-base font-black text-[var(--foreground)] mb-6 uppercase tracking-widest">
        Send us a Message
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Name + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="name" className="block text-[0.65rem] font-bold uppercase tracking-widest text-[var(--foreground)]/50">
              Name
            </label>
            <input type="text" id="name" name="name" required className={inputClass} placeholder="Your Name" />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-[0.65rem] font-bold uppercase tracking-widest text-[var(--foreground)]/50">
              Email
            </label>
            <input type="email" id="email" name="email" required className={inputClass} placeholder="your@email.com" />
          </div>
        </div>

        {/* Subject */}
        <div className="space-y-1.5">
          <label htmlFor="subject" className="block text-[0.65rem] font-bold uppercase tracking-widest text-[var(--foreground)]/50">
            Subject
          </label>
          <input type="text" id="subject" name="subject" className={inputClass} placeholder="What is this regarding?" />
        </div>

        {/* Message */}
        <div className="space-y-1.5">
          <label htmlFor="message" className="block text-[0.65rem] font-bold uppercase tracking-widest text-[var(--foreground)]/50">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="w-full px-4 py-3 rounded-[var(--radius-md)] bg-[var(--surface-200)] dark:bg-[var(--surface-200)] border border-[var(--glass-border)] focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] outline-none transition-all resize-none text-[var(--foreground)] placeholder:text-[var(--foreground)]/30 text-sm"
            placeholder="Your message here..."
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white font-black rounded-[var(--radius-md)] shadow-[var(--shadow-primary)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 uppercase tracking-widest text-xs disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={16} />
              Sending...
            </>
          ) : (
            <>
              <Send size={15} />
              Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
}
