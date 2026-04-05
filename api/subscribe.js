export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, sports, preferred_industries } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY;
  const RESEND_KEY = process.env.RESEND_API_KEY;

  // Save to Supabase
  try {
    const subRes = await fetch(`${SUPABASE_URL}/rest/v1/subscribers`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates'
      },
      body: JSON.stringify({ email, sports: sports || [], preferred_industries: preferred_industries || ['All'] })
    });

    if (!subRes.ok) {
      const err = await subRes.text();
      console.error('Supabase error:', err);
    }
  } catch (err) {
    console.error('Supabase save error:', err);
  }

  // Send welcome email
  try {
    const sportsList = (sports && sports.length > 0) ? sports.join(', ') : 'All Sports';

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Buy Auburn Network <noreply@buyauburn.com>',
        to: [email],
        subject: '🏈 Welcome to Buy Auburn — War Eagle!',
        html: `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#020e1f;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#020e1f;">
<tr><td align="center" style="padding:32px 16px;">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

<!-- Header -->
<tr><td style="background:linear-gradient(135deg,#03244d,#0a3a6b);padding:40px 36px;border-radius:14px 14px 0 0;text-align:center;">
  <img src="https://buyauburn.com/assets/images/email-logo-wide.png" alt="Buy Auburn" width="180" style="width:180px;height:auto;border-radius:8px;margin-bottom:16px;">
  <h1 style="color:#fff;font-size:26px;margin:0 0 6px;font-weight:800;">Welcome to Buy Auburn!</h1>
  <p style="color:#F26522;font-size:14px;margin:0;font-weight:600;letter-spacing:2px;">WAR EAGLE</p>
</td></tr>

<!-- Body -->
<tr><td style="background:#071e3d;padding:36px;">
  <p style="color:rgba(255,255,255,0.75);font-size:15px;line-height:1.7;margin:0 0 24px;">
    You're officially part of the Buy Auburn Network family. Before every away game, we'll send you Auburn-owned businesses near that city — restaurants, shops, and services run by people in the Auburn family.
  </p>

  <div style="background:rgba(0,0,0,0.2);border-radius:10px;padding:20px;border-left:3px solid #F26522;margin-bottom:20px;">
    <p style="color:#F26522;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;margin:0 0 6px;">Your Sports</p>
    <p style="color:#fff;font-size:15px;font-weight:600;margin:0;">${sportsList}</p>
  </div>

  <h3 style="color:#fff;font-size:15px;margin:0 0 12px;font-weight:700;">What to expect:</h3>
  <table cellpadding="0" cellspacing="0" style="width:100%;">
    <tr>
      <td style="padding:8px 0;vertical-align:top;width:28px;">
        <div style="width:22px;height:22px;background:rgba(242,101,34,0.15);border-radius:6px;text-align:center;line-height:22px;">
          <span style="color:#F26522;font-size:12px;">&#10003;</span>
        </div>
      </td>
      <td style="padding:8px 0 8px 10px;color:rgba(255,255,255,0.65);font-size:14px;">
        <strong style="color:#fff;">Game week emails</strong> — Auburn businesses near every away game city, sent 1 week before kickoff
      </td>
    </tr>
    <tr>
      <td style="padding:8px 0;vertical-align:top;width:28px;">
        <div style="width:22px;height:22px;background:rgba(242,101,34,0.15);border-radius:6px;text-align:center;line-height:22px;">
          <span style="color:#F26522;font-size:12px;">&#10003;</span>
        </div>
      </td>
      <td style="padding:8px 0 8px 10px;color:rgba(255,255,255,0.65);font-size:14px;">
        <strong style="color:#fff;">Only your sports</strong> — We only send for the sports you selected
      </td>
    </tr>
    <tr>
      <td style="padding:8px 0;vertical-align:top;width:28px;">
        <div style="width:22px;height:22px;background:rgba(242,101,34,0.15);border-radius:6px;text-align:center;line-height:22px;">
          <span style="color:#F26522;font-size:12px;">&#10003;</span>
        </div>
      </td>
      <td style="padding:8px 0 8px 10px;color:rgba(255,255,255,0.65);font-size:14px;">
        <strong style="color:#fff;">Support the family</strong> — Every business is Auburn-owned and verified
      </td>
    </tr>
  </table>

  <div style="text-align:center;margin-top:28px;">
    <a href="https://buyauburn.com/directory.html" style="display:inline-block;background:#F26522;color:#fff;padding:14px 32px;border-radius:8px;font-weight:700;font-size:14px;text-decoration:none;">Browse the Directory →</a>
  </div>
</td></tr>

<!-- Footer -->
<tr><td style="background:#03244d;padding:24px 36px;text-align:center;border-top:2px solid #F26522;border-radius:0 0 14px 14px;">
  <p style="color:rgba(255,255,255,0.3);font-size:12px;margin:0 0 4px;">Buy Auburn Network — Wherever Auburn Goes, We Go</p>
  <p style="color:rgba(255,255,255,0.2);font-size:11px;margin:0;">buyauburn.com</p>
</td></tr>

</table>
</td></tr>
</table>
</body></html>`
      })
    });
  } catch (err) {
    console.error('Email send error:', err);
  }

  return res.status(200).json({ success: true });
}
