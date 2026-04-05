export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const RESEND_KEY = process.env.RESEND_API_KEY;
  const { businessName, ownerName, email, paymentLink, priceLabel } = req.body;

  if (!email || !businessName) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const emailHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#020e1f;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#020e1f;">
<tr><td align="center" style="padding:32px 16px;">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

<!-- Header -->
<tr><td style="background:linear-gradient(135deg,#03244d,#0a3a6b);padding:40px 36px;border-radius:14px 14px 0 0;text-align:center;">
  <img src="https://buyauburn.com/assets/images/email-logo-wide.png" alt="Buy Auburn" width="180" style="width:180px;height:auto;border-radius:8px;margin-bottom:16px;">
  <h1 style="color:#fff;font-size:26px;margin:0 0 6px;font-weight:800;">You're Approved!</h1>
  <p style="color:#F26522;font-size:14px;margin:0;font-weight:600;letter-spacing:2px;">WAR EAGLE</p>
</td></tr>

<!-- Body -->
<tr><td style="background:#071e3d;padding:36px;">
  <p style="color:rgba(255,255,255,0.75);font-size:15px;line-height:1.7;margin:0 0 24px;">
    Hey ${ownerName || 'there'},
  </p>
  <p style="color:rgba(255,255,255,0.75);font-size:15px;line-height:1.7;margin:0 0 24px;">
    Great news! <strong style="color:#fff;">${businessName}</strong> has been approved for the Buy Auburn Network. You're one step away from reaching Auburn fans nationwide.
  </p>

  <div style="background:rgba(0,0,0,0.25);border-radius:12px;padding:24px;border:1px solid rgba(242,101,34,0.15);margin-bottom:24px;text-align:center;">
    <p style="color:rgba(255,255,255,0.4);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;margin:0 0 8px;">Your Listing Fee</p>
    <p style="color:#fff;font-size:28px;font-weight:800;margin:0 0 4px;">${priceLabel || '$300/year'}</p>
    <p style="color:#f59e0b;font-size:13px;font-weight:600;margin:0;">Less than $1/day to reach the Auburn family</p>
  </div>

  <p style="color:rgba(255,255,255,0.75);font-size:15px;line-height:1.7;margin:0 0 8px;">
    Complete your payment below and your listing will go live within 24 hours:
  </p>

  <div style="text-align:center;margin:28px 0;">
    <a href="${paymentLink}" style="display:inline-block;background:#F26522;color:#fff;padding:16px 40px;border-radius:8px;font-weight:700;font-size:16px;text-decoration:none;">Complete Payment</a>
  </div>

  <p style="color:rgba(255,255,255,0.4);font-size:13px;text-align:center;margin:0 0 24px;">
    Or copy this link: <a href="${paymentLink}" style="color:#F26522;text-decoration:none;word-break:break-all;">${paymentLink}</a>
  </p>

  <h3 style="color:#fff;font-size:15px;margin:0 0 12px;font-weight:700;">What happens after payment?</h3>
  <table cellpadding="0" cellspacing="0" style="width:100%;">
    <tr>
      <td style="padding:8px 0;vertical-align:top;width:28px;">
        <div style="width:22px;height:22px;background:rgba(242,101,34,0.15);border-radius:6px;text-align:center;line-height:22px;">
          <span style="color:#F26522;font-size:12px;">&#10003;</span>
        </div>
      </td>
      <td style="padding:8px 0 8px 10px;color:rgba(255,255,255,0.65);font-size:14px;">
        Your listing goes live on the <a href="https://buyauburn.com/directory.html" style="color:#F26522;text-decoration:none;">Auburn Business Directory</a>
      </td>
    </tr>
    <tr>
      <td style="padding:8px 0;vertical-align:top;width:28px;">
        <div style="width:22px;height:22px;background:rgba(242,101,34,0.15);border-radius:6px;text-align:center;line-height:22px;">
          <span style="color:#F26522;font-size:12px;">&#10003;</span>
        </div>
      </td>
      <td style="padding:8px 0 8px 10px;color:rgba(255,255,255,0.65);font-size:14px;">
        You'll be included in Away Game Alert emails to subscribers
      </td>
    </tr>
    <tr>
      <td style="padding:8px 0;vertical-align:top;width:28px;">
        <div style="width:22px;height:22px;background:rgba(242,101,34,0.15);border-radius:6px;text-align:center;line-height:22px;">
          <span style="color:#F26522;font-size:12px;">&#10003;</span>
        </div>
      </td>
      <td style="padding:8px 0 8px 10px;color:rgba(255,255,255,0.65);font-size:14px;">
        Auburn fans traveling nationwide will find your business
      </td>
    </tr>
  </table>
</td></tr>

<!-- Footer -->
<tr><td style="background:#03244d;padding:24px 36px;text-align:center;border-top:2px solid #F26522;border-radius:0 0 14px 14px;">
  <p style="color:rgba(255,255,255,0.3);font-size:12px;margin:0 0 4px;">Buy Auburn Network — Wherever Auburn Goes, We Go</p>
  <p style="color:rgba(255,255,255,0.2);font-size:11px;margin:0 0 8px;">buyauburn.com</p>
  <p style="color:rgba(255,255,255,0.15);font-size:10px;margin:0;"><a href="https://buyauburn.com/unsubscribe.html?email=${encodeURIComponent(email)}" style="color:rgba(255,255,255,0.2);text-decoration:underline;">Unsubscribe</a></p>
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
        to: [email],
        subject: `You're Approved! Complete Your ${businessName} Listing — Buy Auburn Network`,
        html: emailHtml
      })
    });

    if (!emailRes.ok) {
      const err = await emailRes.text();
      console.error('Resend error:', err);
      return res.status(500).json({ error: 'Failed to send email' });
    }
  } catch (err) {
    console.error('Email error:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }

  return res.status(200).json({ success: true });
}
