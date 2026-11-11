// Interest list for the Throw More Clay series (/clay/interest).
// Emails each sign-up to Charles through Resend, with the person's address as reply-to,
// so the list lives in his inbox and nothing is stored on the site.
//
// Stays switched off (responds 503) until all three are set in Vercel:
//   RESEND_API_KEY         API key from resend.com, with fellowvector.com verified as a sending domain
//   INTEREST_NOTIFY_EMAIL  where sign-ups are delivered
//   INTEREST_FROM_EMAIL    sender on the verified domain, e.g. "Fellow Vector <list@fellowvector.com>"

const LIMITS = { name: 120, email: 254, make: 1000 };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  const { RESEND_API_KEY, INTEREST_NOTIFY_EMAIL, INTEREST_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !INTEREST_NOTIFY_EMAIL || !INTEREST_FROM_EMAIL) {
    return res.status(503).json({ error: 'not_configured' });
  }

  const body = readBody(req.body);
  if (!body) return res.status(400).json({ error: 'invalid_body' });

  // Honeypot: people never see this field, so a value means a bot. Answer as if it worked.
  if (oneLine(body.website, 200)) return res.status(200).json({ ok: true });

  const name = oneLine(body.name, LIMITS.name);
  const email = oneLine(body.email, LIMITS.email);
  const make = multiLine(body.make, LIMITS.make);

  if (!name || !EMAIL_PATTERN.test(email)) {
    return res.status(400).json({ error: 'invalid_fields' });
  }

  const text = [
    'New sign-up for the Throw More Clay interest list.',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Wants to make: ${make || '(left blank)'}`,
    '',
    'Reply to this email to write to them directly.',
  ].join('\n');

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: INTEREST_FROM_EMAIL,
        to: [INTEREST_NOTIFY_EMAIL],
        reply_to: email,
        subject: `Throw More Clay interest: ${name}`,
        text,
      }),
    });

    if (!response.ok) return res.status(502).json({ error: 'send_failed' });
    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: 'internal_error' });
  }
}

function readBody(raw) {
  if (raw && typeof raw === 'object') return raw;
  if (typeof raw !== 'string') return null;
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch {
    return null;
  }
}

// Collapses control characters and newlines so a value can't break a header or subject line.
function oneLine(value, max) {
  if (typeof value !== 'string') return '';
  return value.replace(/[\u0000-\u001f\u007f]+/g, ' ').trim().slice(0, max);
}

function multiLine(value, max) {
  if (typeof value !== 'string') return '';
  return value
    .replace(/\r\n?/g, '\n')
    .replace(/[\u0000-\u0009\u000b-\u001f\u007f]+/g, ' ')
    .trim()
    .slice(0, max);
}
