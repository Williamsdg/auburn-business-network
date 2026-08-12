/* ============================================
   Auburn Business Network - Data Layer
   Fetches from Supabase, falls back to cache
   ============================================ */

// Cache for loaded data
let _businessesCache = [];
let _industriesCache = [];

// Fetch all active businesses from Supabase
// Selects only the columns the public cards/modal need — skips heavy/admin-only
// fields (payment_status, application_id, created_at) to shrink payload.
async function loadBusinesses() {
  try {
    const { data, error } = await db
      .from('businesses')
      .select('id, name, industry, address, location, state, locations, website, bio, owner, contact, phone, lat, lng, logo_url, instagram, twitter, facebook, tiktok')
      .order('name');

    if (error) throw error;
    _businessesCache = data || [];
  } catch (err) {
    console.error('Error loading businesses:', err);
    _businessesCache = [];
  }
  return _businessesCache;
}

// Get unique industries from loaded businesses
function getIndustries() {
  const industries = [...new Set(_businessesCache.map(b => b.industry))].sort();
  return industries;
}

// Get random featured businesses
function getFeaturedBusinesses(count = 4) {
  const shuffled = [..._businessesCache].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Search and filter businesses
function getLocations() {
  const locations = [...new Set(_businessesCache.map(b => b.location))].sort();
  return locations;
}

function searchBusinesses({ query = '', industry = '', location = '' } = {}) {
  return _businessesCache.filter(b => {
    const matchesQuery = !query ||
      b.name.toLowerCase().includes(query.toLowerCase()) ||
      b.bio.toLowerCase().includes(query.toLowerCase()) ||
      b.owner.toLowerCase().includes(query.toLowerCase()) ||
      b.industry.toLowerCase().includes(query.toLowerCase()) ||
      b.location.toLowerCase().includes(query.toLowerCase());

    const matchesIndustry = !industry || b.industry === industry;
    const matchesLocation = !location || b.location === location;

    return matchesQuery && matchesIndustry && matchesLocation;
  });
}

// Get single business by ID
function getBusinessById(id) {
  return _businessesCache.find(b => b.id === id);
}

// Submit a new application
async function submitApplication(formData) {
  const { data, error } = await db
    .from('applications')
    .insert([{
      business_name: formData.businessName,
      industry: formData.industry,
      city: formData.city,
      state: formData.state,
      address: formData.address,
      locations: Array.isArray(formData.locations) ? formData.locations : [],
      website: formData.website || null,
      bio: formData.bio,
      owner_name: formData.ownerName,
      email: formData.email,
      phone: formData.phone,
      auburn_connection: formData.auburnConnection,
      logo_url: formData.logoUrl || null,
      instagram: formData.instagram || null,
      twitter: formData.twitter || null,
      facebook: formData.facebook || null,
      tiktok: formData.tiktok || null,
      business_type: formData.businessType || 'local',
      referral_name: formData.referralName || null,
      referral_code: formData.referralCode || null,
      show_phone: formData.showPhone !== false
    }]);

  if (error) throw error;
  return data;
}

// ---- Logo upload (shared by apply form + admin) ----

// Resize/re-encode an image before upload. Cards render logos at ~150px, so
// anything beyond maxDim px is wasted bytes — a raw phone photo can be 5MB+.
// SVGs and already-small files pass through untouched.
async function compressLogoFile(file, maxDim = 800, quality = 0.82) {
  if (file.type === 'image/svg+xml' || file.size < 150 * 1024) return file;

  const img = await new Promise((resolve, reject) => {
    const el = new Image();
    el.onload = () => resolve(el);
    el.onerror = () => reject(new Error('Could not read image file'));
    el.src = URL.createObjectURL(file);
  });

  const scale = Math.min(1, maxDim / Math.max(img.naturalWidth, img.naturalHeight));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(img.naturalWidth * scale);
  canvas.height = Math.round(img.naturalHeight * scale);
  canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
  URL.revokeObjectURL(img.src);

  // WebP keeps PNG transparency at JPEG-like sizes; fall back to the original
  // format (preserving alpha) on browsers without WebP encoding.
  let blob = await new Promise(r => canvas.toBlob(r, 'image/webp', quality));
  if (!blob || blob.type !== 'image/webp') {
    const fallback = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
    blob = await new Promise(r => canvas.toBlob(r, fallback, quality));
  }
  if (!blob || blob.size >= file.size) return file;
  return blob;
}

// Compress + upload a logo to Supabase Storage, returns the public URL.
// Filenames are unique, so the file is immutable — cache it for a year.
async function uploadLogoToStorage(file) {
  const compressed = await compressLogoFile(file);
  const ext = { 'image/webp': 'webp', 'image/png': 'png', 'image/jpeg': 'jpg', 'image/svg+xml': 'svg' }[compressed.type]
    || (file.name || 'logo.jpg').split('.').pop().toLowerCase();
  const fileName = Date.now() + '-' + Math.random().toString(36).slice(2, 8) + '.' + ext;

  const { error } = await db.storage
    .from('business-logos')
    .upload(fileName, compressed, {
      cacheControl: '31536000',
      contentType: compressed.type || undefined,
      upsert: false
    });
  if (error) throw error;

  const { data: urlData } = db.storage
    .from('business-logos')
    .getPublicUrl(fileName);
  return urlData.publicUrl;
}

// Submit a travel alert subscription
async function submitTravelSubscription({ email, state, city, services, sports }) {
  const { data, error } = await db
    .from('travel_subscriptions')
    .insert([{ email, state, city: city || null, services, sports: sports || [] }]);

  if (error) throw error;
  return data;
}

// ---- Admin functions (require auth) ----

// Sign in admin
async function adminSignIn(email, password) {
  const { data, error } = await db.auth.signInWithPassword({
    email,
    password
  });
  if (error) throw error;
  return data;
}

// Sign out admin
async function adminSignOut() {
  const { error } = await db.auth.signOut();
  if (error) throw error;
}

// Get current session
async function getSession() {
  const { data: { session } } = await db.auth.getSession();
  return session;
}

// Fetch all applications (admin only)
async function loadApplications() {
  const { data, error } = await db
    .from('applications')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

// Fetch ALL businesses including unpaid (admin only)
async function loadAllBusinesses() {
  const { data, error } = await db
    .from('businesses')
    .select('*')
    .order('name');

  if (error) throw error;
  return data || [];
}

// Update application status
async function updateApplicationStatus(id, status) {
  const { data, error } = await db
    .from('applications')
    .update({ status })
    .eq('id', id);

  if (error) throw error;
  return data;
}

// Approve application and create business listing
async function approveAndCreateBusiness(application) {
  // Update application status
  await updateApplicationStatus(application.id, 'approved');

  // Carry the locations array through; if the application predates the field,
  // synthesize one from its primary city/state/address.
  let locations = Array.isArray(application.locations) ? application.locations : [];
  if (locations.length === 0 && (application.city || application.address)) {
    locations = [{
      city: application.city || null,
      state: application.state || null,
      address: application.address || null,
      lat: null,
      lng: null
    }];
  }

  // Create business listing (unpaid until they pay)
  const { data, error } = await db
    .from('businesses')
    .insert([{
      name: application.business_name,
      industry: application.industry,
      address: application.address,
      location: (application.city && application.state) ? `${application.city}, ${application.state}` : 'Auburn, AL',
      locations: locations,
      website: application.website,
      bio: application.bio,
      owner: application.owner_name,
      contact: application.email,
      phone: application.show_phone !== false ? application.phone : null,
      status: 'active',
      payment_status: 'unpaid',
      application_id: application.id,
      logo_url: application.logo_url || null,
      instagram: application.instagram || null,
      twitter: application.twitter || null,
      facebook: application.facebook || null,
      tiktok: application.tiktok || null
    }]);

  if (error) throw error;
  return data;
}

// Fetch all travel subscriptions (admin only)
async function loadTravelSubscriptions() {
  const { data, error } = await db
    .from('travel_subscriptions')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

// Delete a travel subscription (admin only)
async function deleteTravelSubscription(id) {
  const { data, error } = await db
    .from('travel_subscriptions')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return data;
}

// Delete a business (admin only)
async function deleteBusiness(id) {
  const { data, error } = await db
    .from('businesses')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return data;
}

// Update business payment status
async function updateBusinessPayment(id, paymentStatus) {
  const { data, error } = await db
    .from('businesses')
    .update({ payment_status: paymentStatus })
    .eq('id', id);

  if (error) throw error;
  return data;
}

// ---- Podcast Segments ----

// Extract Spotify episode ID from a full URL. Returns null if it doesn't look right.
function extractSpotifyEpisodeId(url) {
  if (!url) return null;
  const m = String(url).match(/\/episode\/([A-Za-z0-9]{16,32})/);
  return m ? m[1] : null;
}

// Fetch Spotify oEmbed metadata (title, artwork). No API key required.
async function fetchSpotifyOEmbed(spotifyUrl) {
  const oembedUrl = 'https://open.spotify.com/oembed?url=' + encodeURIComponent(spotifyUrl);
  const res = await fetch(oembedUrl);
  if (!res.ok) throw new Error('Spotify oEmbed lookup failed (' + res.status + ')');
  return res.json();
}

// Load podcasts that should appear on the public homepage.
async function loadVisiblePodcasts() {
  const { data, error } = await db
    .from('podcasts')
    .select('id, spotify_url, spotify_id, title, artwork_url, description, position, business_id')
    .eq('is_visible', true)
    .order('position', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

// Load every podcast for the admin view, including hidden ones.
async function loadAllPodcasts() {
  const { data, error } = await db
    .from('podcasts')
    .select('*')
    .order('position', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

// Add a podcast from a Spotify URL. Auto-fills title + artwork via oEmbed.
async function addPodcast(spotifyUrl) {
  const spotifyId = extractSpotifyEpisodeId(spotifyUrl);
  if (!spotifyId) throw new Error("That doesn't look like a Spotify episode URL.");

  let title = '';
  let artwork_url = '';
  try {
    const meta = await fetchSpotifyOEmbed(spotifyUrl);
    title = meta.title || '';
    artwork_url = meta.thumbnail_url || '';
  } catch (_) {
    // Non-fatal — episode still gets saved with what we have.
  }

  const { data, error } = await db
    .from('podcasts')
    .insert([{
      spotify_url: spotifyUrl,
      spotify_id: spotifyId,
      title,
      artwork_url,
      is_visible: true
    }])
    .select();

  if (error) throw error;
  return data && data[0];
}

async function deletePodcast(id) {
  const { error } = await db.from('podcasts').delete().eq('id', id);
  if (error) throw error;
}

async function updatePodcast(id, fields) {
  const { error } = await db.from('podcasts').update(fields).eq('id', id);
  if (error) throw error;
}
