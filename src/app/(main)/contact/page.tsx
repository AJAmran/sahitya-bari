import ContactForm from '@/features/contact/components/ContactForm';
import ContactInfo from '@/features/contact/components/ContactInfo';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Mail } from 'lucide-react';

export const metadata = {
  title: 'Contact Us | Sahitya Bari',
  description: 'Get in touch with the Sahitya Bari team for inquiries, feedback, or collabrations.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-36 pb-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--primary)]/10 rounded-[var(--radius-full)] blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--secondary)]/10 rounded-[var(--radius-full)] blur-3xl -z-10 animate-pulse delay-1000" />

      <div className="site-container">
        <div className="flex flex-col items-center text-center mb-14">
          <SectionHeader 
            pillLabel="Get In Touch"
            pillIcon={Mail}
            pillVariant="primary"
            titleBengali="যোগাযোগ"
            titleGradient="করুন"
            className="items-center"
            description="We'd love to hear from you. Whether you have a question, feedback, or just want to say hello."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
    </div>
  );
}
