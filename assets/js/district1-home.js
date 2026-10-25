(() => {
  'use strict';

  const locations = Array.isArray(window.Q1Locations) ? window.Q1Locations : [];
  const grid = document.getElementById('q1-listings-grid');
  const searchInput = document.getElementById('q1-search-input');
  const categorySelect = document.getElementById('q1-category-select');
  const searchForm = document.getElementById('q1-search-form');
  const clearButton = document.getElementById('q1-clear-search');
  const count = document.getElementById('q1-results-count');
  const noResults = document.getElementById('q1-no-results');
  const mapElement = document.getElementById('q1-leaflet-map');
  const mapStatus = document.getElementById('q1-map-status');

  const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, ch => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[ch]));

  function normalize(value) {
    return String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  }

 function cardMarkup(item) {
    return `
      <article class="listing surface lift q1-location-card" data-q1-open="${escapeHtml(item.id)}" style="cursor: pointer;">
        <div class="listing-media q1-card-media">
          <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" loading="lazy" decoding="async">
          <span class="q1-card-category">${escapeHtml(item.categoryName)}</span>
        </div>
        <div class="listing-body q1-card-body">
          <h3 class="listing-title">${escapeHtml(item.name)}</h3>
          <p class="q1-card-address">${escapeHtml(item.address)}</p>
          <p class="q1-card-description">${escapeHtml(item.description)}</p>
          <div class="q1-card-actions">
            <span class="q1-detail-button">Xem thông tin →</span>
            <a class="q1-directions-link" href="${escapeHtml(item.mapsUrl)}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation();">Chỉ đường ↗</a>
          </div>
        </div>
      </article>`;
  }

  function getFilteredLocations() {
    const query = normalize(searchInput?.value);
    const category = categorySelect?.value || 'all';
    return locations.filter(item => {
      const haystack = normalize([item.name, item.categoryName, item.address, item.description].join(' '));
      return (!query || haystack.includes(query)) && (category === 'all' || item.category === category);
    });
  }

  function renderListings() {
    if (!grid) return;
    const filtered = getFilteredLocations();
    grid.innerHTML = filtered.map(cardMarkup).join('');
    if (count) {
      const total = filtered.length;
      count.innerHTML = `Hiển thị <strong>${total}</strong> / ${locations.length} điểm đến`;
    }
    if (noResults) noResults.hidden = filtered.length !== 0;
  }

grid?.addEventListener('click', event => {
    // Nếu người dùng bấm vào nút Chỉ đường thì để trình duyệt mở Google Maps bình thường
    if (event.target.closest('.q1-directions-link')) return;

    // Tìm thẻ card gần nhất được nhấp vào để mở thông tin
    const card = event.target.closest('[data-q1-open]');
    if (card && typeof window.openQ1Location === 'function') {
      window.openQ1Location(card.dataset.q1Open);
    }
  });

  grid?.addEventListener('click', event => {
    const button = event.target.closest('[data-q1-open]');
    if (button && typeof window.openQ1Location === 'function') {
      window.openQ1Location(button.dataset.q1Open);
    }
  });

  searchInput?.addEventListener('input', renderListings);
  categorySelect?.addEventListener('change', renderListings);
  searchForm?.addEventListener('submit', event => { event.preventDefault(); renderListings(); });
  clearButton?.addEventListener('click', () => {
    if (searchInput) searchInput.value = '';
    if (categorySelect) categorySelect.value = 'all';
    renderListings();
    searchInput?.focus();
  });

  document.querySelectorAll('[data-guide-category]').forEach(link => {
    link.addEventListener('click', () => {
      if (categorySelect) categorySelect.value = link.dataset.guideCategory;
      renderListings();
    });
  });

  renderListings();

  // Leaflet map setup
  if (!mapElement) return;
  if (typeof window.L === 'undefined') {
    if (mapStatus) mapStatus.textContent = 'Không tải được thư viện bản đồ. Vui lòng kiểm tra kết nối mạng.';
    return;
  }

  const located = locations.filter(item => Array.isArray(item.coordinates) && item.coordinates.length === 2 && item.coordinates.every(Number.isFinite));
  if (!located.length) {
    if (mapStatus) mapStatus.textContent = 'Chưa có tọa độ bản đồ cho các địa điểm này.';
    return;
  }

  const map = L.map(mapElement, { scrollWheelZoom: false, zoomControl: true }).setView([10.7751, 106.6997], 14);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap contributors</a>'
  }).addTo(map);

  const markers = L.featureGroup().addTo(map);

  function popupNode(item) {
    const root = document.createElement('div');
    root.className = 'q1-popup';
    const image = document.createElement('img');
    image.src = item.image;
    image.alt = item.name;
    image.loading = 'lazy';
    image.addEventListener('error', () => { image.style.visibility = 'hidden'; }, { once: true });
    
    const details = document.createElement('div');
    const title = document.createElement('h3');
    title.textContent = item.name;
    const address = document.createElement('p');
    address.textContent = item.address;
    
    const actions = document.createElement('div');
    actions.className = 'q1-popup-actions';
    
    const detailButton = document.createElement('button');
    detailButton.type = 'button';
    detailButton.textContent = 'Thông tin';
    detailButton.addEventListener('click', () => {
      if (typeof window.openQ1Location === 'function') window.openQ1Location(item.id);
    });

    const mapsLink = document.createElement('a');
    mapsLink.href = item.mapsUrl;
    mapsLink.target = '_blank';
    mapsLink.rel = 'noopener noreferrer';
    mapsLink.textContent = 'Google Maps ↗';

    actions.append(detailButton, mapsLink);
    details.append(title, address, actions);
    root.append(image, details);
    return root;
  }

  located.forEach(item => {
    const marker = L.marker(item.coordinates, { title: item.name, alt: item.name });
    marker.bindPopup(() => popupNode(item), { maxWidth: 330 });
    marker.addTo(markers);
  });

  if (located.length > 1) {
    map.fitBounds(markers.getBounds().pad(0.12), { maxZoom: 15 });
  }

  if (mapStatus) mapStatus.classList.add('is-hidden');

  window.addEventListener('load', () => map.invalidateSize(), { once: true });
  window.addEventListener('resize', () => map.invalidateSize(), { passive: true });
})();