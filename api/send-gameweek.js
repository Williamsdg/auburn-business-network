// Away game schedule - all sports
const AWAY_GAMES = [
  // Football
  { sport: 'Football', date: '2026-09-05', opponent: 'Baylor', city: 'Atlanta', state: 'GA', venue: 'Mercedes-Benz Stadium (Aflac Kickoff)' },
  { sport: 'Football', date: '2026-10-03', opponent: 'Tennessee', city: 'Knoxville', state: 'TN', venue: 'Neyland Stadium' },
  { sport: 'Football', date: '2026-10-17', opponent: 'Georgia', city: 'Athens', state: 'GA', venue: 'Sanford Stadium' },
  { sport: 'Football', date: '2026-10-31', opponent: 'Ole Miss', city: 'Oxford', state: 'MS', venue: 'Vaught-Hemingway Stadium' },
  { sport: 'Football', date: '2026-11-14', opponent: 'Mississippi State', city: 'Starkville', state: 'MS', venue: 'Davis Wade Stadium' },
  { sport: 'Football', date: '2026-11-28', opponent: 'Alabama', city: 'Tuscaloosa', state: 'AL', venue: 'Bryant-Denny Stadium' },
  // Baseball
  { sport: 'Baseball', date: '2026-02-20', opponent: 'KSU/FSU/Louisville', city: 'Arlington', state: 'TX', venue: 'Globe Life Field' },
  { sport: 'Baseball', date: '2026-03-13', opponent: 'Missouri', city: 'Columbia', state: 'MO', venue: '' },
  { sport: 'Baseball', date: '2026-03-27', opponent: 'Alabama', city: 'Tuscaloosa', state: 'AL', venue: 'Sewell-Thomas Stadium' },
  { sport: 'Baseball', date: '2026-03-31', opponent: 'Georgia Tech', city: 'Atlanta', state: 'GA', venue: '' },
  { sport: 'Baseball', date: '2026-04-17', opponent: 'Florida', city: 'Gainesville', state: 'FL', venue: '' },
  { sport: 'Baseball', date: '2026-05-01', opponent: 'Texas A&M', city: 'College Station', state: 'TX', venue: '' },
  { sport: 'Baseball', date: '2026-05-08', opponent: 'Mississippi State', city: 'Starkville', state: 'MS', venue: '' },
  // Softball
  { sport: 'Softball', date: '2026-03-13', opponent: 'Oklahoma', city: 'Norman', state: 'OK', venue: '' },
  { sport: 'Softball', date: '2026-03-17', opponent: 'South Alabama', city: 'Mobile', state: 'AL', venue: '' },
  { sport: 'Softball', date: '2026-04-03', opponent: 'Arkansas', city: 'Fayetteville', state: 'AR', venue: '' },
  { sport: 'Softball', date: '2026-04-17', opponent: 'Florida', city: 'Gainesville', state: 'FL', venue: '' },
  { sport: 'Softball', date: '2026-04-22', opponent: 'Troy', city: 'Troy', state: 'AL', venue: '' },
  { sport: 'Softball', date: '2026-04-30', opponent: 'LSU', city: 'Baton Rouge', state: 'LA', venue: '' },
  // Gymnastics
  { sport: 'Gymnastics', date: '2026-01-16', opponent: 'Arkansas', city: 'Fayetteville', state: 'AR', venue: '' },
  { sport: 'Gymnastics', date: '2026-02-13', opponent: 'LSU', city: 'Baton Rouge', state: 'LA', venue: '' },
  { sport: 'Gymnastics', date: '2026-02-27', opponent: 'Oklahoma', city: 'Norman', state: 'OK', venue: '' },
  { sport: 'Gymnastics', date: '2026-03-08', opponent: 'Elevate the Stage', city: 'Huntsville', state: 'AL', venue: 'Von Braun Center' },
  // Track & Field
  { sport: 'Track', date: '2026-01-09', opponent: 'Blazer Invitational', city: 'Birmingham', state: 'AL', venue: 'CrossPlex' },
  { sport: 'Track', date: '2026-01-17', opponent: 'Samford Open', city: 'Birmingham', state: 'AL', venue: 'CrossPlex' },
  { sport: 'Track', date: '2026-01-30', opponent: 'Bob Pollock Invitational', city: 'Clemson', state: 'SC', venue: '' },
  { sport: 'Track', date: '2026-03-20', opponent: 'Yellow Jacket Invite', city: 'Atlanta', state: 'GA', venue: '' },
  { sport: 'Track', date: '2026-03-27', opponent: 'Pepsi Florida Relays', city: 'Gainesville', state: 'FL', venue: '' },
  // Basketball (placeholder dates - update when schedule releases)
  { sport: 'Basketball', date: '2026-01-10', opponent: 'SEC Opponent', city: 'TBD', state: 'TBD', venue: '' },
];

function getGameDate(dateStr) {
  return new Date(dateStr + 'T12:00:00');
}

function formatDate(dateStr) {
  const d = getGameDate(dateStr);
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
}

function buildGameEmailHtml(game, businesses) {
  const bizCards = businesses.slice(0, 4).map(b => `
    <tr><td style="background:#03244d;border-radius:10px;padding:18px;border-left:3px solid #F26522;margin-bottom:8px;">
      <h3 style="color:#fff;font-size:15px;margin:0 0 3px;font-weight:700;">${b.name}</h3>
      <p style="color:#f59e0b;font-size:11px;margin:0 0 6px;font-weight:600;text-transform:uppercase;">${b.industry}</p>
      <p style="color:rgba(255,255,255,0.55);font-size:13px;line-height:1.5;margin:0 0 6px;">${b.bio ? b.bio.substring(0, 120) + '...' : ''}</p>
      <p style="color:rgba(255,255,255,0.35);font-size:11px;margin:0;">${b.address || b.location} | ${b.owner}</p>
    </td></tr>
    <tr><td style="height:8px;"></td></tr>
  `).join('');

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#020e1f;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#020e1f;">
<tr><td align="center" style="padding:32px 16px;">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

<tr><td style="background:linear-gradient(135deg,#03244d,#0a3a6b);padding:36px;border-radius:14px 14px 0 0;text-align:center;">
  <img src="https://buyauburn.com/assets/images/email-logo-wide.png" alt="Buy Auburn" width="180" style="width:180px;height:auto;border-radius:8px;margin-bottom:14px;">
  <p style="color:rgba(255,255,255,0.4);font-size:11px;text-transform:uppercase;letter-spacing:2px;margin:0 0 6px;">GAME WEEK</p>
  <h1 style="color:#fff;font-size:24px;margin:0 0 4px;font-weight:800;">Auburn vs ${game.opponent}</h1>
  <p style="color:#F26522;font-size:14px;margin:0;font-weight:600;">${game.sport}</p>
  <p style="color:rgba(255,255,255,0.45);font-size:13px;margin:8px 0 0;">${formatDate(game.date)} — ${game.city}, ${game.state}</p>
  ${game.venue ? '<p style="color:rgba(255,255,255,0.3);font-size:12px;margin:4px 0 0;">' + game.venue + '</p>' : ''}
</td></tr>

<tr><td style="background:#071e3d;padding:32px 36px;">
  <p style="color:rgba(255,255,255,0.65);font-size:14px;line-height:1.7;margin:0 0 24px;">
    War Eagle! The Tigers head to ${game.city} this week. Here are Auburn-owned businesses near the game to support while you're in town.
  </p>

  <p style="color:#F26522;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;margin:0 0 12px;">Auburn Businesses in ${game.city}</p>

  <table width="100%" cellpadding="0" cellspacing="0">
    ${bizCards.length > 0 ? bizCards : '<tr><td style="color:rgba(255,255,255,0.4);font-size:13px;padding:20px;text-align:center;">No businesses listed in ' + game.city + ' yet — <a href="https://buyauburn.com/apply.html" style="color:#F26522;">know one? Tell them to apply!</a></td></tr>'}
  </table>

  <div style="text-align:center;margin-top:20px;">
    <a href="https://buyauburn.com/directory.html?state=${game.state}" style="display:inline-block;background:#F26522;color:#fff;padding:12px 28px;border-radius:8px;font-weight:700;font-size:13px;text-decoration:none;">View All ${game.state} Businesses →</a>
  </div>
</td></tr>

<tr><td style="background:#03244d;padding:20px 36px;text-align:center;border-top:2px solid #F26522;border-radius:0 0 14px 14px;">
  <p style="color:rgba(255,255,255,0.3);font-size:11px;margin:0 0 4px;">Auburn Business Network — Wherever Auburn Goes, We Go</p>
  <p style="color:rgba(255,255,255,0.2);font-size:10px;margin:0;">buyauburn.com</p>
</td></tr>

</table>
</td></tr>
</table>
</body></html>`;
}

export default async function handler(req, res) {
  // Protect with a secret key
  const authHeader = req.headers.authorization;
  if (authHeader !== `Bearer ${process.env.RESEND_API_KEY}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY;
  const RESEND_KEY = process.env.RESEND_API_KEY;

  // Find games happening in the next 7-8 days
  const now = new Date();
  const nextWeek = new Date(now.getTime() + 8 * 24 * 60 * 60 * 1000);
  const inSixDays = new Date(now.getTime() + 6 * 24 * 60 * 60 * 1000);

  const upcomingGames = AWAY_GAMES.filter(g => {
    const gDate = getGameDate(g.date);
    return gDate >= inSixDays && gDate <= nextWeek;
  });

  if (upcomingGames.length === 0) {
    return res.status(200).json({ message: 'No upcoming away games this week', sent: 0 });
  }

  // Get subscribers
  const subRes = await fetch(`${SUPABASE_URL}/rest/v1/subscribers?select=*`, {
    headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
  });
  const subscribers = await subRes.json();

  // Get businesses
  const bizRes = await fetch(`${SUPABASE_URL}/rest/v1/businesses?status=eq.active&select=*`, {
    headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
  });
  const businesses = await bizRes.json();

  let totalSent = 0;

  for (const game of upcomingGames) {
    // Find subscribers who selected this sport
    const recipients = subscribers.filter(s => {
      if (!s.sports || s.sports.length === 0) return true;
      return s.sports.includes(game.sport) || s.sports.includes('All');
    });

    if (recipients.length === 0) continue;

    // Find businesses in that state
    const nearbyBiz = businesses.filter(b =>
      b.state === game.state ||
      (b.location && b.location.includes(game.state))
    );

    const html = buildGameEmailHtml(game, nearbyBiz);

    // Send in batches of 50
    for (let i = 0; i < recipients.length; i += 50) {
      const batch = recipients.slice(i, i + 50);

      for (const sub of batch) {
        try {
          await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
              from: 'Auburn Business Network <noreply@buyauburn.com>',
              to: [sub.email],
              subject: `🏈 Game Week: Auburn ${game.sport} at ${game.city} — Auburn Businesses Near You`,
              html: html
            })
          });
          totalSent++;
        } catch (err) {
          console.error(`Failed to send to ${sub.email}:`, err);
        }
      }
    }
  }

  return res.status(200).json({ message: `Sent ${totalSent} game week emails`, games: upcomingGames.map(g => g.opponent) });
}
