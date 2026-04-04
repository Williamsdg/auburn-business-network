// Rate limiting: track submissions per IP
const submissions = new Map();
const RATE_LIMIT = 5; // max submissions
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip) {
  const now = Date.now();
  const record = submissions.get(ip);

  if (!record) {
    submissions.set(ip, { count: 1, start: now });
    return false;
  }

  // Reset window if expired
  if (now - record.start > RATE_WINDOW) {
    submissions.set(ip, { count: 1, start: now });
    return false;
  }

  if (record.count >= RATE_LIMIT) {
    return true;
  }

  record.count++;
  return false;
}

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of submissions) {
    if (now - record.start > RATE_WINDOW) {
      submissions.delete(ip);
    }
  }
}, 10 * 60 * 1000); // every 10 minutes

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';

  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many submissions. Please try again later.' });
  }

  const app = req.body;
  if (!app || !app.business_name || !app.email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY;

  try {
    const subRes = await fetch(`${SUPABASE_URL}/rest/v1/applications`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({
        business_name: app.business_name,
        industry: app.industry,
        city: app.city,
        state: app.state,
        address: app.address,
        website: app.website || null,
        bio: app.bio,
        owner_name: app.owner_name,
        email: app.email,
        phone: app.phone,
        auburn_connection: app.auburn_connection,
        logo_url: app.logo_url || null,
        instagram: app.instagram || null,
        twitter: app.twitter || null,
        facebook: app.facebook || null,
        tiktok: app.tiktok || null,
        business_type: app.business_type || 'local',
        referral_name: app.referral_name || null,
        referral_code: app.referral_code || null,
        show_phone: app.show_phone !== false
      })
    });

    if (!subRes.ok) {
      const err = await subRes.text();
      console.error('Supabase error:', err);
      return res.status(500).json({ error: 'Failed to save application' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Application submission error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
