export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

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
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        business_name: app.business_name,
        industry: app.industry,
        city: app.city,
        state: app.state,
        address: app.address,
        locations: Array.isArray(app.locations) ? app.locations : [],
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
