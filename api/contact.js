import { Resend } from 'resend';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const contactEmail = process.env.CONTACT_EMAIL;

  const subjectLabels = {
    general: 'General Inquiry',
    services: 'Services Inquiry',
    retreats: 'Retreat Inquiry',
  };

  await resend.emails.send({
    from: 'Contact Form <onboarding@resend.dev>',
    to: [contactEmail],
    subject: `${subjectLabels[subject] || subject} from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subjectLabels[subject] || subject}\n\nMessage:\n${message}`,
    replyTo: email,
  });

  res.status(200).json({ success: true });
}
