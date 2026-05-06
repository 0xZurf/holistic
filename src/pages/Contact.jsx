import { useState } from 'react';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import { CONTACT_SUBJECTS } from '../lib/constants';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="section-padding">
      <div className="container-main max-w-4xl">
        <div className="text-center mb-12">
          <p className="font-accent text-sage text-lg mb-2">Reach Out</p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-charcoal">
            Get in Touch
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
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
                <Input label="Name" placeholder="Your name" required />
                <Input label="Email" type="email" placeholder="your@email.com" required />
                <Select
                  label="Subject"
                  options={CONTACT_SUBJECTS}
                  placeholder="Select a subject"
                  defaultValue=""
                  required
                />
                <Textarea label="Message" placeholder="How can we help you?" rows={5} required />
                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            )}
          </div>

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
        </div>
      </div>
    </div>
  );
}
