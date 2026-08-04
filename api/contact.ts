import { Resend } from 'resend';

type VercelRequest = {
  method?: string;
  body?: Record<string, unknown>;
};

type VercelResponse = {
  setHeader: (name: string, value: string) => void;
  status: (code: number) => {
    json: (body: Record<string, string>) => unknown;
  };
};

declare const process: {
  env: Record<string, string | undefined>;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Method not allowed.' });
  }

  const { name, email, subject, message, website } = request.body ?? {};
  const normalizedName = typeof name === 'string' ? name.trim() : '';
  const normalizedEmail = typeof email === 'string' ? email.trim() : '';
  const normalizedSubject = typeof subject === 'string' ? subject.trim() : '';
  const normalizedMessage = typeof message === 'string' ? message.trim() : '';
  const normalizedWebsite = typeof website === 'string' ? website.trim() : '';

  if (normalizedWebsite) {
    return response.status(200).json({ message: 'Message sent successfully.' });
  }

  if (!normalizedName || !normalizedEmail || !normalizedMessage) {
    return response.status(400).json({
      error: 'Name, email, and message are required.',
    });
  }

  if (!emailPattern.test(normalizedEmail)) {
    return response.status(400).json({ error: 'Enter a valid email address.' });
  }

  if (normalizedName.length > 100 || normalizedSubject.length > 150 || normalizedMessage.length > 5000) {
    return response.status(400).json({ error: 'One or more fields are too long.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_EMAIL;

  if (!apiKey || !recipient) {
    return response.status(503).json({
      error: 'The contact form is temporarily unavailable. Please email me directly.',
    });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: 'Portfolio contact <onboarding@resend.dev>',
      to: recipient,
      replyTo: normalizedEmail,
      subject: normalizedSubject
        ? `Portfolio inquiry: ${normalizedSubject}`
        : `Portfolio inquiry from ${normalizedName}`,
      text: [
        `Name: ${normalizedName}`,
        `Email: ${normalizedEmail}`,
        normalizedSubject ? `Subject: ${normalizedSubject}` : '',
        '',
        normalizedMessage,
      ]
        .filter(Boolean)
        .join('\n'),
    });

    if (error) {
      return response.status(502).json({
        error: 'The message could not be sent. Please email me directly.',
      });
    }

    return response.status(200).json({ message: 'Message sent successfully.' });
  } catch {
    return response.status(500).json({
      error: 'Something went wrong while sending your message. Please email me directly.',
    });
  }
}
