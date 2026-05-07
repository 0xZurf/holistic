import { useState } from 'react';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import FadeIn from '../components/ui/FadeIn';
import { useToast } from '../components/ui/Toast';
import { submitContact } from '../lib/api';
import { CONTACT_SUBJECTS } from '../lib/constants';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const addToast = useToast();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.target);
    try {
      await submitContact({
        name: form.get('name'),
        email: form.get('email'),
        subject: form.get('subject'),
        message: form.get('message'),
      });
      setSubmitted(true);
    } catch (err) {
      addToast(err.message || 'Failed to send message. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="section-padding">
      <div className="container-main max-w-4xl">
        <FadeIn>
          <div className="text-center mb-12">
            <p className="font-accent text-sage text-lg mb-2">Reach Out</p>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold text-charcoal">
              Get in Touch
            </h1>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <FadeIn delay={100}>
            <div>
              {submitted ? (
                <div className="bg-sage/10 rounded-2xl p-8 text-center">
                  <svg className="w-12 h-12 text-sage mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <h3 className="font-display text-xl font-semibold text-charcoal mb-2">Message Sent!</h3>
                  <p className="text-charcoal/60">We'll get back to you as soon as possible.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <Input label="Name" name="name" placeholder="Your name" required />
                  <Input label="Email" name="email" type="email" placeholder="your@email.com" required />
                  <Select
                    label="Subject"
                    name="subject"
                    options={CONTACT_SUBJECTS}
                    placeholder="Select a subject"
                    defaultValue=""
                    required
                  />
                  <Textarea label="Message" name="message" placeholder="How can we help you?" rows={5} required />
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="space-y-8">
              <div>
                <h3 className="font-display text-lg font-semibold text-charcoal mb-2">Contact Info</h3>
                <p className="text-charcoal/60">info@example.com</p>
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-charcoal mb-2">Location</h3>
                <p className="text-charcoal/60">Sedona, Arizona</p>
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-charcoal mb-2">Hours</h3>
                <p className="text-charcoal/60">Monday – Friday: 9am – 5pm</p>
                <p className="text-charcoal/60">Saturday: 10am – 2pm</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
