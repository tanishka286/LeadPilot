import { Resend } from 'resend';

export async function sendEmail(to: string, subject: string, text: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not defined');
  }

  const from = process.env.EMAIL_FROM;
  if (!from) {
    throw new Error('EMAIL_FROM is not defined');
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: [to],
    subject,
    text,
  });

  if (error) {
    throw new Error(error.message);
  }
}
