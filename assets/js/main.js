/* ============================================
   Auburn Business Network - Shared Utilities
   ============================================ */

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
  external: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`
};

// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }
});

// Create a business card HTML
function createBusinessCard(business) {
  const initial = business.name.charAt(0);
  return `
    <div class="business-card" data-id="${business.id}" onclick="openBusinessModal(${business.id})">
      <div class="card-header">
        <div class="card-initial">${initial}</div>
        <h3>${business.name}</h3>
        <span class="card-industry">${business.industry}</span>
      </div>
      <div class="card-body">
        <div class="card-location">
          ${ICONS.location}
          <span>${business.location}</span>
        </div>
        <p class="card-bio">${business.bio}</p>
      </div>
      <div class="card-footer">
        <span class="view-btn">View Details ${ICONS.arrow}</span>
        <div class="card-tags">
          <span class="tag">${business.industry}</span>
        </div>
      </div>
    </div>
  `;
}

// Business detail modal
function openBusinessModal(id) {
  const business = getBusinessById(id);
  if (!business) return;

  const initial = business.name.charAt(0);
  const websiteLink = business.website
    ? `<a href="${business.website}" target="_blank" rel="noopener">${business.website.replace('https://', '')} ${ICONS.external}</a>`
    : 'N/A';

  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <button class="modal-close" onclick="closeModal(this)">&times;</button>
        <div class="modal-initial">${initial}</div>
        <h2>${business.name}</h2>
        <span class="modal-industry">${business.industry}</span>
      </div>
      <div class="modal-body">
        <div class="modal-info-row">
          ${ICONS.location}
          <div>
            <div class="info-label">Address</div>
            <div class="info-value">${business.address || business.location}</div>
          </div>
        </div>
        <div class="modal-info-row">
          ${ICONS.user}
          <div>
            <div class="info-label">Owner</div>
            <div class="info-value">${business.owner}</div>
          </div>
        </div>
        <div class="modal-info-row">
          ${ICONS.email}
          <div>
            <div class="info-label">Contact</div>
            <div class="info-value"><a href="mailto:${business.contact}">${business.contact}</a></div>
          </div>
        </div>
        <div class="modal-info-row">
          ${ICONS.phone}
          <div>
            <div class="info-label">Phone</div>
            <div class="info-value"><a href="tel:${business.phone}">${business.phone}</a></div>
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
          <p>${business.bio}</p>
        </div>
      </div>
      <div class="modal-actions">
        ${business.website ? `<a href="${business.website}" target="_blank" rel="noopener" class="btn btn-primary">Visit Website ${ICONS.external}</a>` : ''}
        <a href="mailto:${business.contact}" class="btn btn-secondary">Send Email</a>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';

  // Animate in
  requestAnimationFrame(() => {
    modal.classList.add('active');
  });

  // Close on overlay click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal(modal.querySelector('.modal-close'));
  });

  // Close on Escape
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
