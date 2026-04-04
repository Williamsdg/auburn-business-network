/* ============================================
   Auburn Business Network - Shared Utilities
   ============================================ */

// Escape HTML to prevent XSS
function esc(str) {
  if (!str) return '';
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

// SVG Icons used throughout the site
const ICONS = {
  location: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  phone: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  email: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  globe: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  user: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  arrow: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
  search: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  lock: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  check: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  external: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
  directions: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>`
};

// Industry-specific icons (inline SVGs for card/modal headers)
const INDUSTRY_ICONS = {
  'Construction': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 18l5-5 2 2-5 5z"/><path d="M7 13l3-3 2 2-3 3z"/><path d="M14 6l4-4 4 4-4 4z"/><path d="M10 10l4-4"/></svg>`,
  'Financial Services': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
  'Food & Beverage': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`,
  'Real Estate': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  'Technology': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
  'Legal': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v19"/><path d="M5 8l7-5 7 5"/><path d="M3 18h18"/><path d="M4 21h16"/></svg>`,
  'Home Services': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
  'Creative Services': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>`,
  'Automotive': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H20a2 2 0 0 1 2 2v2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M12 17h-3m8 0h2"/></svg>`,
  'Healthcare': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
  'Marketing': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  'Health & Fitness': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  'Insurance': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  'Other': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`
};

// Auburn-branded gradient color for all cards
const AUBURN_COLOR = 'linear-gradient(135deg, #03244d 0%, #0a3a6b 60%, #F26522 100%)';

// Logo color palettes per industry
const LOGO_PALETTES = {
  'Construction': { bg: '#1a1a2e', accent: '#F26522', text: '#fff' },
  'Financial Services': { bg: '#0a1628', accent: '#C9A84C', text: '#C9A84C' },
  'Food & Beverage': { bg: '#2d1810', accent: '#F26522', text: '#fff' },
  'Real Estate': { bg: '#0a3a6b', accent: '#fff', text: '#fff' },
  'Technology': { bg: '#0f172a', accent: '#38bdf8', text: '#38bdf8' },
  'Legal': { bg: '#1c1917', accent: '#C9A84C', text: '#C9A84C' },
  'Home Services': { bg: '#14532d', accent: '#4ade80', text: '#fff' },
  'Creative Services': { bg: '#3b0764', accent: '#c084fc', text: '#c084fc' },
  'Automotive': { bg: '#1a1a2e', accent: '#ef4444', text: '#fff' },
  'Healthcare': { bg: '#0c4a6e', accent: '#38bdf8', text: '#fff' },
  'Marketing': { bg: '#4c0519', accent: '#fb7185', text: '#fff' },
  'Health & Fitness': { bg: '#14532d', accent: '#F26522', text: '#fff' },
  'Insurance': { bg: '#0a1628', accent: '#60a5fa', text: '#60a5fa' },
  'Other': { bg: '#1a1a2e', accent: '#F26522', text: '#fff' }
};

// Generate a unique hash from string for variety
function hashStr(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// Get business initials (first letter of first 2 words)
function getInitials(name) {
  return name.split(/\s+/).filter(w => w.length > 0 && w[0] === w[0].toUpperCase()).slice(0, 2).map(w => w[0]).join('');
}

// Generate SVG logo for a business
function generateLogo(business) {
  const initials = getInitials(business.name);
  const palette = LOGO_PALETTES[business.industry] || LOGO_PALETTES['Other'];
  const h = hashStr(business.name);
  const style = h % 6; // 6 different logo styles

  const svgStyles = {
    // Style 0: Circle with initials
    0: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="54" fill="${palette.bg}" stroke="${palette.accent}" stroke-width="3"/>
      <text x="60" y="68" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-weight="800" font-size="36" fill="${palette.text}">${initials}</text>
    </svg>`,
    // Style 1: Rounded square with accent bar
    1: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="8" width="104" height="104" rx="20" fill="${palette.bg}" stroke="${palette.accent}" stroke-width="2"/>
      <rect x="8" y="8" width="104" height="6" rx="3" fill="${palette.accent}"/>
      <text x="60" y="72" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-weight="800" font-size="38" fill="${palette.text}">${initials}</text>
    </svg>`,
    // Style 2: Diamond shape
    2: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="18" y="18" width="84" height="84" rx="8" fill="${palette.bg}" stroke="${palette.accent}" stroke-width="2.5" transform="rotate(45 60 60)"/>
      <text x="60" y="68" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-weight="800" font-size="32" fill="${palette.text}">${initials}</text>
    </svg>`,
    // Style 3: Circle with inner ring
    3: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="54" fill="${palette.bg}"/>
      <circle cx="60" cy="60" r="46" fill="none" stroke="${palette.accent}" stroke-width="1.5" stroke-dasharray="4 3"/>
      <text x="60" y="68" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-weight="800" font-size="34" fill="${palette.text}">${initials}</text>
    </svg>`,
    // Style 4: Hexagon
    4: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <polygon points="60,6 110,30 110,90 60,114 10,90 10,30" fill="${palette.bg}" stroke="${palette.accent}" stroke-width="2.5"/>
      <text x="60" y="68" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-weight="800" font-size="34" fill="${palette.text}">${initials}</text>
    </svg>`,
    // Style 5: Square with side accent
    5: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="8" width="104" height="104" rx="12" fill="${palette.bg}" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
      <rect x="8" y="8" width="5" height="104" rx="2" fill="${palette.accent}"/>
      <text x="64" y="72" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-weight="800" font-size="38" fill="${palette.text}">${initials}</text>
    </svg>`
  };

  return svgStyles[style];
}

function getIndustryIcon(industry) {
  return INDUSTRY_ICONS[industry] || INDUSTRY_ICONS['Other'];
}

function getIndustryColor() {
  return AUBURN_COLOR;
}

// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }
});

// Create a business card HTML
function createBusinessCard(business) {
  const icon = getIndustryIcon(business.industry);
  const color = getIndustryColor(business.industry);
  const contactActions = [];

  if (business.phone) {
    contactActions.push(`<a href="tel:${esc(business.phone)}" class="contact-action" title="Call" onclick="event.stopPropagation()">${ICONS.phone}</a>`);
  }
  if (business.contact) {
    contactActions.push(`<a href="mailto:${esc(business.contact)}" class="contact-action" title="Email" onclick="event.stopPropagation()">${ICONS.email}</a>`);
  }
  if (business.website) {
    contactActions.push(`<a href="${esc(business.website)}" target="_blank" rel="noopener" class="contact-action" title="Website" onclick="event.stopPropagation()">${ICONS.globe}</a>`);
  }
  if (business.instagram) {
    const igUrl = business.instagram.startsWith('http') ? business.instagram : 'https://instagram.com/' + business.instagram.replace('@','');
    contactActions.push(`<a href="${igUrl}" target="_blank" rel="noopener" class="contact-action" title="Instagram" onclick="event.stopPropagation()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg></a>`);
  }
  if (business.facebook) {
    const fbUrl = business.facebook.startsWith('http') ? business.facebook : 'https://facebook.com/' + business.facebook;
    contactActions.push(`<a href="${fbUrl}" target="_blank" rel="noopener" class="contact-action" title="Facebook" onclick="event.stopPropagation()"><svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>`);
  }
  if (business.twitter) {
    const xUrl = business.twitter.startsWith('http') ? business.twitter : 'https://x.com/' + business.twitter.replace('@','');
    contactActions.push(`<a href="${xUrl}" target="_blank" rel="noopener" class="contact-action" title="X" onclick="event.stopPropagation()"><svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>`);
  }
  if (business.tiktok) {
    const ttUrl = business.tiktok.startsWith('http') ? business.tiktok : 'https://tiktok.com/@' + business.tiktok.replace('@','');
    contactActions.push(`<a href="${ttUrl}" target="_blank" rel="noopener" class="contact-action" title="TikTok" onclick="event.stopPropagation()"><svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.61a8.21 8.21 0 0 0 4.76 1.51v-3.45a4.85 4.85 0 0 1-1-.02z"/></svg></a>`);
  }

  return `
    <div class="business-card" data-id="${business.id}" onclick="openBusinessModal('${business.id}')">
      <div class="card-inner">
        <div class="card-top-bar">
          <span class="card-type-badge">${esc(business.industry)}</span>
          <span class="card-we-badge">BA</span>
        </div>
        <div class="card-art" style="background:${business.logo_url ? 'transparent' : color}">
          ${business.logo_url
            ? `<img src="${business.logo_url}" alt="${business.name} logo" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0;z-index:2;border-radius:8px;">`
            : `<div class="card-logo">${generateLogo(business)}</div><div class="card-art-icon">${icon}</div><div class="card-art-pattern"></div>`
          }
        </div>
        <div class="card-name-bar">
          <h3>${esc(business.name)}</h3>
          <span class="card-verified-dot" title="Auburn Verified"></span>
        </div>
        <div class="card-desc">
          <p>${esc(business.bio)}</p>
        </div>
        <div class="card-stats">
          <div class="card-stat">
            <span class="stat-icon">${ICONS.location}</span>
            <span class="stat-text">${esc(business.location)}</span>
          </div>
          <div class="card-stat">
            <span class="stat-icon">${ICONS.user}</span>
            <span class="stat-text">${esc(business.owner)}</span>
          </div>
        </div>
        <div class="card-bottom">
          <span class="card-brand">Auburn Business Network</span>
          <div class="card-contact-actions">${contactActions.join('')}</div>
        </div>
      </div>
    </div>
  `;
}

// Business detail modal
function openBusinessModal(id) {
  const business = getBusinessById(id);
  if (!business) return;

  const icon = getIndustryIcon(business.industry);
  const color = getIndustryColor(business.industry);
  const websiteLink = business.website
    ? `<a href="${esc(business.website)}" target="_blank" rel="noopener">${esc(business.website.replace('https://', ''))} ${ICONS.external}</a>`
    : 'N/A';
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address || business.location)}`;

  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal">
      <div class="modal-header" style="background:${color};${business.logo_url ? 'position:relative;overflow:hidden;' : ''}">
        ${business.logo_url ? '<img src="' + business.logo_url + '" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.2;">' : ''}
        <button class="modal-close" onclick="closeModal(this)">&times;</button>
        ${business.logo_url
          ? '<img src="' + business.logo_url + '" style="width:64px;height:64px;border-radius:14px;object-fit:cover;border:2px solid rgba(255,255,255,0.2);margin-bottom:16px;position:relative;z-index:1;">'
          : '<div class="modal-icon">' + icon + '</div>'
        }
        <h2 style="position:relative;z-index:1;">${esc(business.name)}</h2>
        <span class="modal-industry" style="position:relative;z-index:1;">${esc(business.industry)}</span>
      </div>
      <div class="modal-body">
        <div class="modal-info-row">
          ${ICONS.location}
          <div>
            <div class="info-label">Address</div>
            <div class="info-value">${esc(business.address || business.location)}</div>
          </div>
        </div>
        <div class="modal-info-row">
          ${ICONS.user}
          <div>
            <div class="info-label">Owner</div>
            <div class="info-value">${esc(business.owner)}</div>
          </div>
        </div>
        <div class="modal-info-row">
          ${ICONS.email}
          <div>
            <div class="info-label">Contact</div>
            <div class="info-value"><a href="mailto:${esc(business.contact)}">${esc(business.contact)}</a></div>
          </div>
        </div>
        <div class="modal-info-row">
          ${ICONS.phone}
          <div>
            <div class="info-label">Phone</div>
            <div class="info-value"><a href="tel:${esc(business.phone)}">${esc(business.phone)}</a></div>
          </div>
        </div>
        <div class="modal-info-row">
          ${ICONS.globe}
          <div>
            <div class="info-label">Website</div>
            <div class="info-value">${websiteLink}</div>
          </div>
        </div>
        <div class="modal-bio">
          <h4>About</h4>
          <p>${esc(business.bio)}</p>
        </div>
      </div>
      ${(business.instagram || business.facebook || business.twitter || business.tiktok) ? `
      <div style="padding:16px 32px;border-top:1px solid rgba(255,255,255,0.06);display:flex;gap:10px;align-items:center;">
        <span style="font-size:0.75rem;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:1px;font-weight:600;">Follow</span>
        ${business.instagram ? `<a href="${business.instagram.startsWith('http') ? business.instagram : 'https://instagram.com/' + business.instagram.replace('@','')}" target="_blank" rel="noopener" style="width:34px;height:34px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);border-radius:8px;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.6);transition:0.2s;" onmouseover="this.style.background='#E1306C';this.style.color='#fff';this.style.borderColor='#E1306C'" onmouseout="this.style.background='rgba(255,255,255,0.06)';this.style.color='rgba(255,255,255,0.6)';this.style.borderColor='rgba(255,255,255,0.08)'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg></a>` : ''}
        ${business.facebook ? `<a href="${business.facebook.startsWith('http') ? business.facebook : 'https://facebook.com/' + business.facebook}" target="_blank" rel="noopener" style="width:34px;height:34px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);border-radius:8px;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.6);transition:0.2s;" onmouseover="this.style.background='#1877F2';this.style.color='#fff';this.style.borderColor='#1877F2'" onmouseout="this.style.background='rgba(255,255,255,0.06)';this.style.color='rgba(255,255,255,0.6)';this.style.borderColor='rgba(255,255,255,0.08)'"><svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>` : ''}
        ${business.twitter ? `<a href="${business.twitter.startsWith('http') ? business.twitter : 'https://x.com/' + business.twitter.replace('@','')}" target="_blank" rel="noopener" style="width:34px;height:34px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);border-radius:8px;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.6);transition:0.2s;" onmouseover="this.style.background='#000';this.style.color='#fff';this.style.borderColor='#333'" onmouseout="this.style.background='rgba(255,255,255,0.06)';this.style.color='rgba(255,255,255,0.6)';this.style.borderColor='rgba(255,255,255,0.08)'"><svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>` : ''}
        ${business.tiktok ? `<a href="${business.tiktok.startsWith('http') ? business.tiktok : 'https://tiktok.com/@' + business.tiktok.replace('@','')}" target="_blank" rel="noopener" style="width:34px;height:34px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);border-radius:8px;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.6);transition:0.2s;" onmouseover="this.style.background='#000';this.style.color='#fff';this.style.borderColor='#333'" onmouseout="this.style.background='rgba(255,255,255,0.06)';this.style.color='rgba(255,255,255,0.6)';this.style.borderColor='rgba(255,255,255,0.08)'"><svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.61a8.21 8.21 0 0 0 4.76 1.51v-3.45a4.85 4.85 0 0 1-1-.02z"/></svg></a>` : ''}
      </div>` : ''}
      <div class="modal-actions">
        ${business.phone ? `<a href="tel:${esc(business.phone)}" class="btn btn-primary">Call Now ${ICONS.phone}</a>` : ''}
        ${business.website ? `<a href="${esc(business.website)}" target="_blank" rel="noopener" class="btn btn-secondary">Visit Website</a>` : ''}
        <a href="${mapsUrl}" target="_blank" rel="noopener" class="btn btn-outline">Get Directions</a>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';

  requestAnimationFrame(() => {
    modal.classList.add('active');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal(modal.querySelector('.modal-close'));
  });

  const escHandler = (e) => {
    if (e.key === 'Escape') {
      closeModal(modal.querySelector('.modal-close'));
      document.removeEventListener('keydown', escHandler);
    }
  };
  document.addEventListener('keydown', escHandler);
}

function closeModal(btn) {
  const overlay = btn.closest('.modal-overlay');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
  setTimeout(() => overlay.remove(), 300);
}
