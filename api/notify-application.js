export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const RESEND_KEY = process.env.RESEND_API_KEY;
  const app = req.body;

  if (!app || !app.businessName) {
    return res.status(400).json({ error: 'Application data required' });
  }

  const isOnline = app.businessType === 'online';
  const locationText = isOnline ? 'Online Business' : `${app.city}, ${app.state}`;
  const addressText = isOnline ? 'N/A — Online Business' : app.address;

  const socialLinks = [
    app.instagram ? `Instagram: ${app.instagram}` : null,
    app.facebook ? `Facebook: ${app.facebook}` : null,
    app.twitter ? `X/Twitter: ${app.twitter}` : null,
    app.tiktok ? `TikTok: ${app.tiktok}` : null,
  ].filter(Boolean);
  const socialHtml = socialLinks.length > 0
    ? socialLinks.map(s => `<span style="display:inline-block;padding:4px 10px;background:rgba(242,101,34,0.1);border-radius:4px;font-size:12px;color:#F26522;margin:2px 4px 2px 0;">${s}</span>`).join('')
    : '<span style="color:rgba(255,255,255,0.3);font-size:13px;">None provided</span>';

  const emailHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#020e1f;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#020e1f;">
<tr><td align="center" style="padding:32px 16px;">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

<!-- Header -->
<tr><td style="background:linear-gradient(135deg,#03244d,#0a3a6b);padding:32px 36px;border-radius:14px 14px 0 0;text-align:center;">
  <img src="https://buyauburn.com/assets/images/email-logo-wide.png" alt="Buy Auburn" width="180" style="width:180px;height:auto;border-radius:8px;margin-bottom:12px;">
  <h1 style="color:#fff;font-size:22px;margin:0 0 4px;font-weight:800;">New Business Application</h1>
  <p style="color:rgba(255,255,255,0.5);font-size:13px;margin:0;">A new business wants to join the Buy Auburn Network</p>
</td></tr>

<!-- Business Card -->
<tr><td style="background:#071e3d;padding:28px 36px;">
  <div style="background:rgba(0,0,0,0.25);border-radius:12px;border:1px solid rgba(242,101,34,0.15);padding:24px;margin-bottom:20px;">
    <table cellpadding="0" cellspacing="0" style="width:100%;">
      <tr>
        ${app.logoUrl ? `<td style="width:64px;vertical-align:top;padding-right:16px;">
          <img src="${app.logoUrl}" width="60" height="60" style="width:60px;height:60px;border-radius:10px;object-fit:cover;display:block;" alt="Logo">
        </td>` : ''}
        <td style="vertical-align:top;">
          <h2 style="color:#fff;font-size:20px;margin:0 0 4px;font-weight:700;">${app.businessName}</h2>
          <p style="color:#F26522;font-size:13px;font-weight:600;margin:0 0 12px;">${app.industry} ${isOnline ? '&middot; Online' : ''}</p>
        </td>
      </tr>
    </table>

    <table cellpadding="0" cellspacing="0" style="width:100%;margin-top:4px;">
      <tr>
        <td style="padding:8px 0;vertical-align:top;width:100px;">
          <span style="color:rgba(255,255,255,0.4);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Location</span>
        </td>
        <td style="padding:8px 0;color:rgba(255,255,255,0.8);font-size:14px;">${locationText}</td>
      </tr>
      ${!isOnline ? `<tr>
        <td style="padding:8px 0;vertical-align:top;width:100px;">
          <span style="color:rgba(255,255,255,0.4);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Address</span>
        </td>
        <td style="padding:8px 0;color:rgba(255,255,255,0.8);font-size:14px;">${addressText}</td>
      </tr>` : ''}
      <tr>
        <td style="padding:8px 0;vertical-align:top;width:100px;">
          <span style="color:rgba(255,255,255,0.4);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Website</span>
        </td>
        <td style="padding:8px 0;color:rgba(255,255,255,0.8);font-size:14px;">${app.website ? `<a href="${app.website}" style="color:#F26522;text-decoration:none;">${app.website}</a>` : 'Not provided'}</td>
      </tr>
      <tr>
        <td style="padding:8px 0;vertical-align:top;width:100px;">
          <span style="color:rgba(255,255,255,0.4);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Type</span>
        </td>
        <td style="padding:8px 0;color:rgba(255,255,255,0.8);font-size:14px;">${isOnline ? 'Online Business' : 'Local Storefront'}</td>
      </tr>
    </table>
  </div>

  <!-- Description -->
  <div style="margin-bottom:20px;">
    <p style="color:rgba(255,255,255,0.4);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin:0 0 6px;">Business Description</p>
    <p style="color:rgba(255,255,255,0.75);font-size:14px;line-height:1.6;margin:0;background:rgba(0,0,0,0.15);padding:14px;border-radius:8px;border-left:3px solid #F26522;">${app.bio}</p>
  </div>

  <!-- Auburn Connection -->
  <div style="margin-bottom:20px;">
    <p style="color:rgba(255,255,255,0.4);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin:0 0 6px;">Auburn Connection</p>
    <p style="color:rgba(255,255,255,0.75);font-size:14px;line-height:1.6;margin:0;background:rgba(0,0,0,0.15);padding:14px;border-radius:8px;border-left:3px solid #F26522;">${app.auburnConnection}</p>
  </div>

  <!-- Referral -->
  ${app.referralName || app.referralCode ? `
  <div style="background:rgba(34,197,94,0.08);border:1px solid rgba(34,197,94,0.15);border-radius:10px;padding:16px;margin-bottom:20px;">
    <p style="color:#22c55e;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin:0 0 8px;">Referral</p>
    ${app.referralName ? `<p style="color:rgba(255,255,255,0.8);font-size:14px;margin:0 0 4px;"><strong>Referred by:</strong> ${app.referralName}</p>` : ''}
    ${app.referralCode ? `<p style="color:rgba(255,255,255,0.8);font-size:14px;margin:0;"><strong>Code:</strong> <span style="color:#22c55e;font-weight:600;">${app.referralCode}</span></p>` : ''}
  </div>
  ` : ''}

  <!-- Owner Info -->
  <div style="background:rgba(0,0,0,0.2);border-radius:10px;padding:16px;margin-bottom:20px;">
    <p style="color:rgba(255,255,255,0.4);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin:0 0 10px;">Owner Details</p>
    <table cellpadding="0" cellspacing="0" style="width:100%;">
      <tr>
        <td style="padding:4px 0;color:rgba(255,255,255,0.5);font-size:13px;width:70px;">Name</td>
        <td style="padding:4px 0;color:#fff;font-size:14px;font-weight:600;">${app.ownerName}</td>
      </tr>
      <tr>
        <td style="padding:4px 0;color:rgba(255,255,255,0.5);font-size:13px;">Email</td>
        <td style="padding:4px 0;"><a href="mailto:${app.email}" style="color:#F26522;font-size:14px;text-decoration:none;">${app.email}</a></td>
      </tr>
      <tr>
        <td style="padding:4px 0;color:rgba(255,255,255,0.5);font-size:13px;">Phone</td>
        <td style="padding:4px 0;"><a href="tel:${app.phone}" style="color:#F26522;font-size:14px;text-decoration:none;">${app.phone}</a></td>
      </tr>
    </table>
  </div>

  <!-- Social Media -->
  <div style="margin-bottom:24px;">
    <p style="color:rgba(255,255,255,0.4);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin:0 0 8px;">Social Media</p>
    <div>${socialHtml}</div>
  </div>

  <!-- CTA -->
  <div style="text-align:center;">
    <a href="https://buyauburn.com/admin.html" style="display:inline-block;background:#F26522;color:#fff;padding:14px 36px;border-radius:8px;font-weight:700;font-size:14px;text-decoration:none;">Review in Admin Dashboard</a>
  </div>
</td></tr>

<!-- Footer -->
<tr><td style="background:#03244d;padding:20px 36px;text-align:center;border-top:2px solid #F26522;border-radius:0 0 14px 14px;">
  <p style="color:rgba(255,255,255,0.3);font-size:12px;margin:0 0 4px;">Buy Auburn Network — Admin Notification</p>
  <p style="color:rgba(255,255,255,0.2);font-size:11px;margin:0;">buyauburn.com</p>
</td></tr>

</table>
</td></tr>
</table>
</body></html>`;

  try {
    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Buy Auburn Network <noreply@buyauburn.com>',
        to: ['thebarnauburn@gmail.com', 'Dylan@williamsdigital.io'],
        subject: `New Application: ${app.businessName} — ${app.industry}`,
        html: emailHtml
      })
    });

    if (!emailRes.ok) {
      const err = await emailRes.text();
      console.error('Resend error:', err);
    }
  } catch (err) {
    console.error('Email notification error:', err);
  }

  return res.status(200).json({ success: true });
}
