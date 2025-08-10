import FadeIn from '@/components/fade-in';
import ContactHeader from '@/components/contact/contact-header';
import ContactForm from '@/components/contact/contact-form';

export default function Contact() {
  return (
    <div className="space-y-8">
      <FadeIn>
        <ContactHeader />
      </FadeIn>
      <FadeIn delay={0.2}>
        <ContactForm />
      </FadeIn>
    </div>
  );
}
