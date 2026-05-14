import { useState } from 'react';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import FadeIn from '../components/ui/FadeIn';
import SacredGeoBg from '../components/ui/SacredGeoBg';
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
    <div
      className="relative bg-dark-bg overflow-hidden"
      style={{ padding: '80px clamp(16px, 4vw, 48px)' }}
    >
      <SacredGeoBg opacity={0.025} />
      <div className="relative z-10 max-w-[1100px] mx-auto">
        <FadeIn>
          <div className="text-center mb-14">
            <span className="font-accent uppercase tracking-[0.3em] text-[11px] text-gold-dim">
              Reach Out
            </span>
            <h1
              className="font-display font-light text-cream m-0"
              style={{ fontSize: 'clamp(36px, 5vw, 64px)', marginTop: 12, letterSpacing: '-0.01em' }}
            >
              Get in <span className="text-gold">Touch</span>
            </h1>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          <FadeIn delay={0.1}>
            <div>
              {submitted ? (
                <div className="bg-card-dark border border-gold-border rounded p-8 text-center">
                  <div
                    className="rounded-full border border-gold-border mx-auto mb-4 flex items-center justify-center"
                    style={{ width: 56, height: 56 }}
                  >
                    <svg className="w-7 h-7 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 className="font-display font-light text-cream text-xl m-0 mb-2">
                    Transmission Received
                  </h3>
                  <p className="font-body text-warm-gray m-0">
                    We'll get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <Input label="Name" name="name" placeholder="Your name" required />
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                  />
                  <Select
                    label="Subject"
                    name="subject"
                    options={CONTACT_SUBJECTS}
                    placeholder="Select a subject"
                    defaultValue=""
                    required
                  />
                  <Textarea
                    label="Message"
                    name="message"
                    placeholder="How can we help you?"
                    rows={5}
                    required
                  />
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="space-y-8">
              <div>
                <div className="font-accent uppercase tracking-[0.2em] text-[11px] text-gold-dim mb-2">
                  Contact Info
                </div>
                <p className="font-body text-cream">info@example.com</p>
              </div>
              <div>
                <div className="font-accent uppercase tracking-[0.2em] text-[11px] text-gold-dim mb-2">
                  Location
                </div>
                <p className="font-body text-cream">Sedona, Arizona</p>
              </div>
              <div>
                <div className="font-accent uppercase tracking-[0.2em] text-[11px] text-gold-dim mb-2">
                  Hours
                </div>
                <p className="font-body text-cream m-0">Monday – Friday: 9am – 5pm</p>
                <p className="font-body text-cream m-0">Saturday: 10am – 2pm</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
