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
    if (event.target.closest('.q1-directions-link')) return;
    const card = event.target.closest('[data-q1-open]');
    if (card && typeof window.openQ1Location === 'function') {
      window.openQ1Location(card.dataset.q1Open);
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

  // =========================================================================
  // 50-SPOT QUẬN 1 CAFÉ, ROOFTOP & HANGOUT SCROLLABLE DIRECTORY
  // =========================================================================
  const IMG = {
    cocktail1: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=500&q=80',
    cocktail2: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=500&q=80',
    rooftop:   'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=500&q=80',
    coffee1:   'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=500&q=80',
    coffee2:   'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=500&q=80',
    pourOver:  'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=500&q=80',
    vintage:   'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=500&q=80',
    garden:    'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=500&q=80',
    matcha:    'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=500&q=80'
  };

  const CAFE_SPOTS = [
    { id: 'eon51', cat: 'rooftop', catLabel: '🍸 Rooftop / Đêm', name: 'EON51 Café & Lounge', address: 'Tầng 51, Bitexco Financial Tower, 2 Hải Triều, Quận 1', signature: 'Signature Cocktail, Set Trà Chiều Tầng 51', price: '200k - 500k', hours: '08:00 - 23:30', image: IMG.cocktail1, desc: 'Không gian sang trọng trên tầng 51 tháp Bitexco với tầm nhìn toàn cảnh 360 độ bao quát trung tâm Sài Gòn và sông Sài Gòn.' },
    { id: 'banana-mama', cat: 'rooftop', catLabel: '🍸 Rooftop / Đêm', name: 'Banana Mama Rooftop & Kitchen', address: 'Tầng 10, 102 ABC Cống Quỳnh, Phạm Ngũ Lão, Quận 1', signature: 'Passion Mojito, Burger Bò Nướng', price: '130k - 280k', hours: '16:00 - 02:00', image: IMG.cocktail2, desc: 'Rooftop phong cách nhiệt đới trẻ trung với ánh đèn ấm áp, nhạc chill và góc ngắm hoàng hôn cực đẹp giữa lòng Quận 1.' },
    { id: 'bach-dang-lounge', cat: 'rooftop', catLabel: '🌆 Rooftop / Đêm', name: 'Bến Bạch Đằng Riverside Lounge', address: '02 Tôn Đức Thắng, Bến Nghé, Quận 1', signature: 'Cà Phê Dừa Đá Xay, Cocktail Nhiệt Đới', price: '90k - 220k', hours: '07:30 - 00:00', image: IMG.rooftop, desc: 'Tọa độ hóng gió sông Sài Gòn ngay bến Bạch Đằng, nhìn thẳng sang cầu Ba Son và đường chân trời Thủ Thiêm.' },
    { id: 'chill-skybar', cat: 'rooftop', catLabel: '🍸 Rooftop / Đêm', name: 'Chill Skybar', address: 'Tầng 26, AB Tower, 76A Lê Lai, Bến Thành, Quận 1', signature: 'Saigon Sunset, Smoked Old Fashioned', price: '250k - 600k', hours: '17:30 - 02:00', image: IMG.cocktail1, desc: 'Một trong những skybar biểu tượng của Sài Gòn với sân thượng ngoài trời thoáng đãng và không khí sôi động về đêm.' },
    { id: 'social-club-rooftop', cat: 'rooftop', catLabel: '🍸 Rooftop / Đêm', name: 'Social Club Rooftop', address: 'Tầng 24, Hôtel des Arts Saigon, 76-78 Nguyễn Thị Minh Khai, Quận 1', signature: 'Artisan Gin Tonic, Tapas Địa Trung Hải', price: '220k - 550k', hours: '15:00 - 00:00', image: IMG.rooftop, desc: 'Không gian rooftop tinh tế phong cách Đông Dương đương đại bên hồ bơi vô cực trên cao.' },
    { id: 'zion-sky-lounge', cat: 'rooftop', catLabel: '🍸 Rooftop / Đêm', name: 'Zion Sky Lounge & Dining', address: '87A Hàm Nghi, Nguyễn Thái Bình, Quận 1', signature: 'Yuzu Highball, Bò Wagyu Nướng Đá', price: '220k - 500k', hours: '17:30 - 02:30', image: IMG.cocktail2, desc: 'Không gian mở hiện đại kết hợp ẩm thực và âm nhạc, nổi bật với hiệu ứng ánh sáng về đêm.' },
    { id: 'blank-lounge', cat: 'rooftop', catLabel: '🌆 Rooftop / Đêm', name: 'The View Rooftop Bar', address: '195 Bùi Viện, Phạm Ngũ Lão, Quận 1', signature: 'Bia Thủ Công, Khoai Tây Chiên Phô Mai', price: '80k - 190k', hours: '16:00 - 02:00', image: IMG.rooftop, desc: 'Góc nhìn từ trên cao xuống toàn cảnh phố đi bộ Bùi Viện nhộn nhịp, giá cả dễ chịu.' },
    { id: 'chang-vang-rooftop', cat: 'rooftop', catLabel: '🌆 Rooftop / Đêm', name: 'Chạng Vạng Rooftop', address: 'Tầng thượng 43/15 Nguyễn Thị Minh Khai, Bến Nghé, Quận 1', signature: 'Trà Đào Cam Sả, Cocktails Nhẹ', price: '65k - 140k', hours: '16:30 - 00:30', image: IMG.cocktail2, desc: 'Sân thượng mộc mạc ấm cúng dành cho những buổi trò chuyện nhẹ nhàng dưới ánh đèn dây.' },
    { id: 'magnetic-rooftop', cat: 'rooftop', catLabel: '🍸 Rooftop / Đêm', name: 'Twilight Rooftop Sài Gòn', address: '72/4 Nguyễn Đình Chiểu, Đa Kao, Quận 1', signature: 'Cider Táo, Gà Rán Sốt Cay', price: '70k - 160k', hours: '16:00 - 00:00', image: IMG.cocktail1, desc: 'Quán rooftop bình dân khu Đa Kao với không gian thoáng mát, thường có đêm nhạc acoustic cuối tuần.' },
    { id: 'saigon-saigon-bar', cat: 'rooftop', catLabel: '🍸 Rooftop / Đêm', name: 'Saigon Saigon Rooftop Bar', address: 'Tầng 9, Caravelle Saigon, 19-23 Công trường Lam Sơn, Quận 1', signature: 'Miss Saigon Cocktail, Nhạc Live', price: '190k - 420k', hours: '16:00 - 01:00', image: IMG.rooftop, desc: 'Quán bar sân thượng mang dấu ấn lịch sử từ năm 1959, nhìn trực diện Nhà hát Thành phố.' },
    { id: 'on-top-bar', cat: 'rooftop', catLabel: '🍸 Rooftop / Đêm', name: 'Shri Lifestyle Dining', address: 'Tầng 23, Centec Tower, 72-74 Nguyễn Thị Minh Khai, Quận 1', signature: 'Lychee Martini, Hải Sản Nướng', price: '200k - 480k', hours: '17:00 - 00:00', image: IMG.cocktail1, desc: 'Khu vườn trên cao giữa trung tâm Quận 1 với không gian kính và ban công ngoài trời lãng mạn.' },
    { id: 'm-bar-majestic', cat: 'rooftop', catLabel: '🌆 Rooftop / Đêm', name: 'M.Bar — Hotel Majestic Saigon', address: 'Tầng 8, 1 Đồng Khởi, Bến Nghé, Quận 1', signature: 'Mojito Cổ Điển, Nhạc Flamenco', price: '180k - 390k', hours: '16:00 - 00:00', image: IMG.rooftop, desc: 'Ban công cổ điển nhìn thẳng ra bến Bạch Đằng và sông Sài Gòn lộng gió.' },

    { id: 'okio-cang', cat: 'specialty', catLabel: '☕ Cà phê đặc sản', name: 'Okkio Caffe — Lê Lợi', address: '120-122 Lê Lợi, Phường Bến Thành, Quận 1', signature: 'Cà Phê Trứng, Cold Brew Cam Vàng', price: '65k - 115k', hours: '07:30 - 22:00', image: IMG.coffee1, desc: 'Quán cà phê specialty nổi tiếng với cầu thang xoắn ốc nghệ thuật và hương vị cà phê rang xay chuẩn mực.' },
    { id: 'workshop-coffee', cat: 'specialty', catLabel: '☕ Cà phê đặc sản', name: 'The Workshop Coffee', address: 'Tầng 2, 27 Ngô Đức Kế, Bến Nghé, Quận 1', signature: 'Pour Over V60, Flat White', price: '65k - 120k', hours: '08:00 - 21:00', image: IMG.pourOver, desc: 'Không gian trần cao thoáng đãng với quầy bar pha chế thủ công 360 độ giữa trung tâm phố Ngô Đức Kế.' },
    { id: 'shin-coffee', cat: 'specialty', catLabel: '☕ Cà phê đặc sản', name: 'SHIN Heritage Coffee', address: '13 Nguyễn Thiệp, Bến Nghé, Quận 1', signature: 'Cà Phê Phin Đặc Sản, Hand Drip', price: '60k - 110k', hours: '07:30 - 22:00', image: IMG.coffee2, desc: 'Tôn vinh hạt cà phê Việt Nam chất lượng cao từ các vùng trồng nổi tiếng như Cầu Đất, Sơn La.' },
    { id: 'bosgaurus', cat: 'specialty', catLabel: '☕ Cà phê đặc sản', name: 'Bosgaurus Coffee Roasters', address: '12 Nguyễn Siêu, Bến Nghé, Quận 1', signature: 'Cà Phê Sữa Đá Đặc Sản, Espresso Tonic', price: '75k - 135k', hours: '07:30 - 21:00', image: IMG.pourOver, desc: 'Thương hiệu rang xay tiên phong với phong cách tối giản, chú trọng trải nghiệm hương vị nguyên bản.' },
    { id: 'little-hanoi-egg', cat: 'specialty', catLabel: '☕ Cà phê đặc sản', name: 'Little HaNoi Egg Coffee', address: '119/5 Yersin, Phạm Ngũ Lão, Quận 1', signature: 'Cà Phê Trứng Truyền Thống, Bánh Mì Bơ', price: '45k - 85k', hours: '08:00 - 21:30', image: IMG.coffee1, desc: 'Lớp kem trứng đánh bông mịn béo ngậy hòa quyện cùng cà phê phin đậm đà trong con hẻm nhỏ yên tĩnh.' },
    { id: 'lacaph', cat: 'specialty', catLabel: '☕ Cà phê đặc sản', name: 'Lacàph Coffee Experiences Space', address: '220A Nguyễn Công Trứ, Nguyễn Thái Bình, Quận 1', signature: 'Phin Con Panna, Cà Phê Mật Hoa Dừa', price: '60k - 115k', hours: '08:00 - 18:00', image: IMG.coffee2, desc: 'Không gian trải nghiệm văn hóa cà phê Việt kết hợp trưng bày tư liệu và xưởng rang.' },
    { id: 'bel-coffee', cat: 'specialty', catLabel: '☕ Cà phê đặc sản', name: 'B.E.L Specialty Coffee', address: '42 Lý Tự Trọng, Bến Nghé, Quận 1', signature: 'Dirty Latte, Cascara Trà Vỏ Cà Phê', price: '60k - 105k', hours: '07:30 - 21:30', image: IMG.pourOver, desc: 'Quán nhỏ xinh ngập ánh nắng, phù hợp cho những buổi sáng làm việc hoặc đọc sách.' },
    { id: 'katinat-dong-khoi', cat: 'specialty', catLabel: '☕ Cà phê đặc sản', name: 'Katinat Saigon Kafe — Đồng Khởi', address: '91 Đồng Khởi, Bến Nghé, Quận 1', signature: 'Trà Sữa Chôm Chôm, Bơ Già Dừa Non', price: '45k - 79k', hours: '07:00 - 23:00', image: IMG.coffee1, desc: 'Góc ngã tư sầm uất bậc nhất Quận 1, lý tưởng để ngồi ngắm dòng người qua lại.' },
    { id: 'phuc-long-mac-thi-buoi', cat: 'specialty', catLabel: '☕ Cà phê đặc sản', name: 'Phúc Long Heritage — Mạc Thị Bưởi', address: '63 Mạc Thị Bưởi, Bến Nghé, Quận 1', signature: 'Trà Đào Phúc Long, Cà Phê Phin Sữa Đá', price: '45k - 75k', hours: '07:00 - 22:30', image: IMG.matcha, desc: 'Cửa hàng lâu đời mang hương vị trà và cà phê quen thuộc của người Sài Gòn.' },
    { id: 'cong-caphe-hai-ba-trung', cat: 'specialty', catLabel: '☕ Cà phê đặc sản', name: 'Cộng Cà Phê — Nhà Thờ Đức Bà', address: '26 Lý Tự Trọng, Bến Nghé, Quận 1', signature: 'Cốt Dừa Cà Phê, Cốt Dừa Cốm Xanh', price: '45k - 75k', hours: '07:00 - 23:00', image: IMG.coffee2, desc: 'Ban công nhìn ra hàng me xanh mát góc Lý Tự Trọng – Đồng Khởi.' },
    { id: 'three-oclock-nguyen-du', cat: 'specialty', catLabel: '☕ Cà phê đặc sản', name: 'Three O’Clock — Nguyễn Du', address: '22 Nguyễn Du, Bến Nghé, Quận 1', signature: 'Trà Lài Hạnh Nhân, Cà Phê Sữa Tươi', price: '42k - 72k', hours: 'Mở cửa 24/7', image: IMG.coffee1, desc: 'Quán cà phê mở xuyên đêm 24/7 quen thuộc của sinh viên và người làm việc sáng tạo.' },
    { id: 'cheo-leo-cafe', cat: 'specialty', catLabel: '☕ Cà phê đặc sản', name: 'Cà Phê Vợt Ba Lù — Chợ Dân Sinh', address: 'Khu Chợ Dân Sinh, Nguyễn Thái Bình, Quận 1', signature: 'Cà Phê Vợt Kho Truyền Thống', price: '25k - 40k', hours: '06:00 - 17:00', image: IMG.coffee2, desc: 'Nét văn hóa cà phê vợt rang củi đặc trưng Sài Gòn xưa với hương thơm khói mộc mạc.' },
    { id: 'every-half', cat: 'specialty', catLabel: '☕ Cà phê đặc sản', name: 'Every Half Coffee Roasters', address: '6E Ngô Thời Nhiệm / Tú Xương, Quận 1', signature: 'Oat Milk Latte, Filter Ethiopia', price: '65k - 110k', hours: '07:30 - 21:00', image: IMG.pourOver, desc: 'Quán cà phê rang xay hiện đại với không gian ấm áp, phục vụ các dòng hạt đơn nguồn.' },
    { id: 'sorella-matcha', cat: 'specialty', catLabel: '☕ Cà phê đặc sản', name: 'Japanit Matcha & Coffee House', address: '130 Trần Hưng Đạo, Phạm Ngũ Lão, Quận 1', signature: 'Matcha Uji Latte, Bingsu Trà Xanh', price: '55k - 115k', hours: '09:00 - 22:30', image: IMG.matcha, desc: 'Chuyên các món trà xanh Nhật Bản chuẩn vị Uji kết hợp tráng miệng thanh mát.' },

    { id: 'saigon-oi', cat: 'heritage', catLabel: '🏛️ Chung cư & Hoài cổ', name: 'Saigon Ơi Cafe — Chung cư 42 Nguyễn Huệ', address: 'Tầng 5, 42 Nguyễn Huệ, Bến Nghé, Quận 1', signature: 'Trà Hoa Nhài, Sinh Tố Bơ Sáp', price: '65k - 110k', hours: '08:30 - 22:30', image: IMG.vintage, desc: 'Chiếc ban công nhiều cây xanh nhìn thẳng xuống phố đi bộ Nguyễn Huệ sôi động.' },
    { id: 'partea-tea-room', cat: 'heritage', catLabel: '🏛️ Chung cư & Hoài cổ', name: 'Partea — English Tearoom', address: 'Tầng 4, 42 Nguyễn Huệ, Bến Nghé, Quận 1', signature: 'Trà Anh Quốc Thảo Mộc, Bánh Scone', price: '75k - 140k', hours: '09:00 - 22:00', image: IMG.vintage, desc: 'Phòng trà phong cách vintage châu Âu với hàng chục bộ ấm tách sứ hoa cổ điển.' },
    { id: 'the-letter-cafe', cat: 'heritage', catLabel: '🏛️ Chung cư & Hoài cổ', name: 'The Letter Coffee', address: 'Tầng 6, 42 Nguyễn Huệ, Bến Nghé, Quận 1', signature: 'Trà Vải Hoa Hồng, Cà Phê Sữa Đá', price: '60k - 105k', hours: '08:30 - 22:30', image: IMG.vintage, desc: 'Không gian mang sắc vàng Hội An ấm áp ẩn mình trên tầng 6 chung cư 42 Nguyễn Huệ.' },
    { id: 'thinker-dreamer', cat: 'heritage', catLabel: '🏛️ Chung cư & Hoài cổ', name: 'Thinker & Dreamer Coffee', address: 'Tầng 4, 42 Nguyễn Huệ, Bến Nghé, Quận 1', signature: 'Cold Brew Tonic, Bánh Croissant', price: '65k - 115k', hours: '09:00 - 22:00', image: IMG.coffee1, desc: 'Quán nhỏ tối giản giàu chất nghệ thuật với góc ban công ngắm trọn trung tâm Sài Gòn.' },
    { id: 'mockingbird-cafe', cat: 'heritage', catLabel: '🏛️ Chung cư & Hoài cổ', name: 'Mockingbird Coffee — Tôn Thất Đạm', address: 'Tầng 4, 14 Tôn Thất Đạm, Nguyễn Thái Bình, Quận 1', signature: 'Cà Phê Sữa Tươi Sương Sáo, Đá Me', price: '55k - 95k', hours: '09:00 - 22:00', image: IMG.vintage, desc: 'Nằm trong khu chung cư cũ Tôn Thất Đạm đầy chất điện ảnh, yên bình tách biệt khỏi phố xá.' },
    { id: 'things-cafe', cat: 'heritage', catLabel: '🏛️ Chung cư & Hoài cổ', name: 'Things Living Room', address: 'Tầng 1, 14 Tôn Thất Đạm, Nguyễn Thái Bình, Quận 1', signature: 'Cà Phê Phin, Trà Gừng Mật Ong', price: '50k - 85k', hours: '09:00 - 21:30', image: IMG.vintage, desc: 'Căn hộ cũ được bài trí như phòng khách gia đình thập niên 1980 với sách cũ và đồ gốm.' },
    { id: 'hoang-thi-cafe', cat: 'heritage', catLabel: '🏛️ Chung cư & Hoài cổ', name: 'Hoàng Thị Café', address: 'Tầng 1, 14 Tôn Thất Đạm, Nguyễn Thái Bình, Quận 1', signature: 'Bạc Xỉu Đá, Trà Cúc Đường Phèn', price: '45k - 80k', hours: '08:00 - 22:00', image: IMG.vintage, desc: 'Không gian ngập tràn âm nhạc Trịnh Công Sơn và những kỷ vật Sài Gòn xưa.' },
    { id: 'banh-mi-cafe-co', cat: 'heritage', catLabel: '🏛️ Chung cư & Hoài cổ', name: 'Cà Phê Cô Ba Đồng Khởi', address: 'Tầng 1, 2-4-6 Đồng Khởi, Bến Nghé, Quận 1', signature: 'Cà Phê Sữa Sài Gòn, Chè Khúc Bạch', price: '65k - 125k', hours: '07:30 - 23:00', image: IMG.vintage, desc: 'Tái hiện không gian Sài Gòn thập niên 1960 với gạch bông, radio cổ và ban công nhìn ra bến Bạch Đằng.' },
    { id: 'ru-nam-bistro', cat: 'heritage', catLabel: '🏛️ Chung cư & Hoài cổ', name: 'RuNam d’Or', address: '3 Công xã París, Bến Nghé, Quận 1', signature: 'Cà Phê Phin RuNam, Set Bánh Ngọt Việt', price: '110k - 240k', hours: '07:00 - 23:00', image: IMG.coffee1, desc: 'Biệt thự Pháp cổ nằm ngay bên cạnh Nhà thờ Đức Bà và Bưu điện Trung tâm.' },
    { id: 'lam-cafe', cat: 'heritage', catLabel: '🏛️ Chung cư & Hoài cổ', name: 'L’Usine Lê Lợi', address: '70B Lê Lợi, Bến Thành, Quận 1', signature: 'Brunch Kiểu Âu, Cappuccino', price: '85k - 195k', hours: '07:30 - 22:00', image: IMG.vintage, desc: 'Tổ hợp cà phê, ẩm thực và cửa hàng thiết kế mang hơi thở Sài Gòn Đông Dương.' },
    { id: 'tonkin-garden', cat: 'heritage', catLabel: '🏛️ Chung cư & Hoài cổ', name: 'Tonkin Specialty Coffee', address: '91 Lý Tự Trọng, Bến Thành, Quận 1', signature: 'Cà Phê Trứng Muối, Cà Phê Dừa', price: '55k - 95k', hours: '07:30 - 21:30', image: IMG.coffee2, desc: 'Không gian Đông Dương ấm cúng với tường gạch mộc và quầy pha chế tinh tế.' },
    { id: 'saigon-retro', cat: 'heritage', catLabel: '🏛️ Chung cư & Hoài cổ', name: 'Saigon Retro Cafe', address: 'Tầng 1, 55 Trần Quốc Toản / Khu Tân Định, Quận 1', signature: 'Đá Me Hạt Dẻ, Cà Phê Đen Đá', price: '40k - 75k', hours: '08:00 - 22:00', image: IMG.vintage, desc: 'Bộ sưu tập đĩa than, máy cassette và poster điện ảnh Sài Gòn xưa.' },
    { id: 'book-street-cafe', cat: 'heritage', catLabel: '🏛️ Chung cư & Hoài cổ', name: 'Cà Phê Sách Phương Nam', address: 'Đường sách Nguyễn Văn Bình, Bến Nghé, Quận 1', signature: 'Cà Phê Sữa Đá, Trà Cam Quế', price: '45k - 80k', hours: '08:00 - 21:30', image: IMG.garden, desc: 'Ngồi nhâm nhi cà phê dưới tán cây cổ thụ giữa không gian đường sách yên bình.' },

    { id: 'khanh-casa', cat: 'hidden', catLabel: '🌿 Sân vườn & Góc yên', name: 'Khanhcasa Tea House', address: '46-48-50 Đồng Khởi, Bến Nghé, Quận 1', signature: 'Trà Hoa Hồng, Bánh Tart Trái Cây', price: '95k - 190k', hours: '08:00 - 22:30', image: IMG.garden, desc: 'Không gian trà chiều sang trọng với giếng trời tràn ngập ánh sáng và cây xanh.' },
    { id: 'so-o-cafe', cat: 'hidden', catLabel: '🌿 Sân vườn & Góc yên', name: 'Sori Cafe & More', address: '20 Tú Xương / Khu Biệt Thự Quận 1', signature: 'Trà Oolong Nhài Sữa, Croissant Hạnh Nhân', price: '65k - 120k', hours: '07:30 - 22:30', image: IMG.garden, desc: 'Biệt thự trắng cổ điển với khoảng sân vườn rợp bóng cây xanh mát.' },
    { id: 'dabao-concept', cat: 'hidden', catLabel: '🌿 Sân vườn & Góc yên', name: 'Dabao Concept — Cố Đô', address: '18 Tú Xương / Công Trường Quốc Tế, Quận 1', signature: 'Trà Sen Vàng, Cà Phê Muối Huế', price: '60k - 110k', hours: '07:00 - 22:00', image: IMG.garden, desc: 'Kiến trúc nhà vườn gợi nhớ nét trầm mặc cố đô giữa lòng đô thị hiện đại.' },
    { id: 'nha-ba-tuan', cat: 'hidden', catLabel: '🌿 Sân vườn & Góc yên', name: 'Nấp Saigon', address: '3/5 Nguyễn Văn Thủ, Đa Kao, Quận 1', signature: 'Cà Phê Trứng, Trà Gạo Rang', price: '55k - 95k', hours: '08:00 - 21:00', image: IMG.garden, desc: 'Quán cà phê ẩn mình trong con hẻm nhỏ khu Đa Kao với phong cách tối giản kiểu Nhật.' },
    { id: 'o-rom-cafe', cat: 'hidden', catLabel: '🌿 Sân vườn & Góc yên', name: 'Oromia Coffee & Lounge', address: '85 Phan Kế Bính, Đa Kao, Quận 1', signature: 'Trà Trái Cây Nhiệt Đới, Mì Ý Sốt Kem', price: '70k - 150k', hours: '07:30 - 23:00', image: IMG.garden, desc: 'Khu vườn nhiệt đới nhiều cây xanh, hồ cá koi và các góc ngồi riêng tư.' },
    { id: 'trung-nguyen-legend', cat: 'hidden', catLabel: '🌿 Sân vườn & Góc yên', name: 'Trung Nguyên Legend — Nguyễn Văn Chiêm', address: '7 Nguyễn Văn Chiêm, Bến Nghé, Quận 1', signature: 'Cà Phê Năng Lượng, Sách Quý', price: '55k - 115k', hours: '06:30 - 22:00', image: IMG.coffee1, desc: 'Không gian sân vườn rộng rãi ngay sau lưng Nhà thờ Đức Bà, rợp bóng cây cổ thụ.' },
    { id: 'tram-cafe', cat: 'hidden', catLabel: '🌿 Sân vườn & Góc yên', name: 'Trầm Coffee', address: '100 Trần Huy Liệu / Khu Thị Nghè, Quận 1', signature: 'Cà Phê Phin, Nước Ép Tươi', price: '45k - 85k', hours: '07:00 - 22:30', image: IMG.garden, desc: 'Lối vào rợp bóng trúc xanh và dòng suối nhỏ tạo cảm giác tách biệt hoàn toàn tiếng còi xe.' },
    { id: 'the-organik-house', cat: 'hidden', catLabel: '🌿 Sân vườn & Góc yên', name: 'Mùa Cà Phê — Đa Kao', address: '52 Nguyễn Bỉnh Khiêm, Đa Kao, Quận 1', signature: 'Bạc Xỉu Cốt Dừa, Trà Vải Hạt Chia', price: '45k - 80k', hours: '07:30 - 22:00', image: IMG.garden, desc: 'Góc phố nhiều cây xanh gần Thảo Cầm Viên, không gian nhẹ nhàng để đọc sách.' },
    { id: 'kefi-cafe', cat: 'hidden', catLabel: '🌿 Sân vườn & Góc yên', name: 'Beanthere Cafe', address: '42/7 Hồ Hảo Hớn, Cô Giang, Quận 1', signature: 'Cold Brew Đào, Bánh Tiramisu', price: '55k - 105k', hours: '08:00 - 22:00', image: IMG.garden, desc: 'Khoảng sân ngập nắng ẩn sau con hẻm nhỏ đường Hồ Hảo Hớn, rất được giới trẻ yêu thích.' },
    { id: 'chuyen-cafe', cat: 'hidden', catLabel: '🌿 Sân vườn & Góc yên', name: 'Chuyện Cà Phê — Hoàng Sa', address: '115 Hoàng Sa, Đa Kao, Quận 1', signature: 'Cà Phê Sữa Tươi, Trà Tắc Mật Ong', price: '38k - 68k', hours: '07:00 - 22:30', image: IMG.coffee2, desc: 'Nằm dọc bờ kênh Nhiêu Lộc – Thị Nghè rợp bóng cây xanh mát mẻ cả ngày.' },
    { id: 'ngoi-cafe', cat: 'hidden', catLabel: '🌿 Sân vườn & Góc yên', name: 'Ngồi Cà Phê — Nguyễn Đình Chiểu', address: '21B Nguyễn Đình Chiểu, Đa Kao, Quận 1', signature: 'Cà Phê Muối, Matcha Đá Xay', price: '45k - 85k', hours: '07:30 - 22:00', image: IMG.matcha, desc: 'Không gian gỗ ấm áp trong hẻm yên tĩnh, phù hợp học tập và làm việc nhóm.' }
  ];

  CAFE_SPOTS.forEach(spot => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(spot.name + ' ' + spot.address)}`;
    spot.mapsUrl = mapsUrl;
    if (!locations.some(loc => loc.id === spot.id)) {
      locations.push({
        id: spot.id,
        name: spot.name,
        category: spot.cat,
        categoryName: spot.catLabel,
        image: spot.image,
        address: spot.address,
        description: `${spot.desc} Món đặc trưng: ${spot.signature}.`,
        hours: spot.hours,
        ticket: `Mức giá tham khảo: ${spot.price}`,
        mapsUrl
      });
    }
  });

  const cafeScrollList = document.getElementById('q1-cafe-scroll-list');
  const cafeCountEl = document.getElementById('q1-cafe-count');
  const cafeSearchInput = document.getElementById('q1-cafe-search');
  const cafeResetBtn = document.getElementById('q1-cafe-reset');
  const cafePills = document.querySelectorAll('[data-cafe-cat]');

  if (!cafeScrollList) return;

  let activeCafeCat = 'all';
  const savedCafeIds = new Set(JSON.parse(localStorage.getItem('q1_saved_cafes') || '[]'));

  function persistSaved() {
    try {
      localStorage.setItem('q1_saved_cafes', JSON.stringify([...savedCafeIds]));
    } catch (_) {}
  }

  function renderCafeDirectory() {
    const q = normalize(cafeSearchInput?.value);
    const filtered = CAFE_SPOTS.filter(spot => {
      const matchesCat =
        activeCafeCat === 'all' ||
        (activeCafeCat === 'saved' ? savedCafeIds.has(spot.id) : spot.cat === activeCafeCat);
      if (!matchesCat) return false;
      if (!q) return true;
      const hay = normalize([spot.name, spot.address, spot.signature, spot.catLabel].join(' '));
      return hay.includes(q);
    });

    if (cafeCountEl) {
      cafeCountEl.textContent = `Đang hiển thị ${filtered.length} / ${CAFE_SPOTS.length} địa điểm`;
    }

    if (!filtered.length) {
      cafeScrollList.innerHTML = `<div class="q1-dir-empty">Không tìm thấy quán phù hợp với bộ lọc hiện tại. Hãy bấm <strong>Đặt lại bộ lọc</strong> để xem toàn bộ ${CAFE_SPOTS.length} địa điểm.</div>`;
      return;
    }

    cafeScrollList.innerHTML = filtered.map(spot => {
      const isSaved = savedCafeIds.has(spot.id);
      return `
        <article class="q1-dir-card" data-q1-open="${escapeHtml(spot.id)}">
          <div class="q1-dir-thumb">
            <img src="${escapeHtml(spot.image)}" alt="${escapeHtml(spot.name)}" loading="lazy" decoding="async">
            <button type="button" class="q1-dir-fav ${isSaved ? 'is-saved' : ''}" data-fav-id="${escapeHtml(spot.id)}" aria-label="Lưu địa điểm ${escapeHtml(spot.name)}" title="Lưu yêu thích">
              ${isSaved ? '♥' : '♡'}
            </button>
          </div>

          <div class="q1-dir-info">
            <span class="q1-dir-cat">${escapeHtml(spot.catLabel)}</span>
            <h3 class="q1-dir-title">${escapeHtml(spot.name)}</h3>
            <p class="q1-dir-addr">${escapeHtml(spot.address)}</p>
            <p class="q1-dir-sig">★ ${escapeHtml(spot.signature)}</p>
          </div>

          <div class="q1-dir-aside">
            <span class="q1-dir-price">${escapeHtml(spot.price)}</span>
            <div class="q1-dir-btns">
              <button type="button" class="q1-dir-btn-detail" data-q1-open="${escapeHtml(spot.id)}">Chi tiết</button>
              <a class="q1-dir-btn-maps" href="${escapeHtml(spot.mapsUrl)}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation();">Chỉ đường ↗</a>
            </div>
          </div>
        </article>`;
    }).join('');
  }

  cafeScrollList.addEventListener('click', event => {
    const favBtn = event.target.closest('[data-fav-id]');
    if (favBtn) {
      event.stopPropagation();
      const id = favBtn.dataset.favId;
      if (savedCafeIds.has(id)) {
        savedCafeIds.delete(id);
      } else {
        savedCafeIds.add(id);
      }
      persistSaved();
      renderCafeDirectory();
      return;
    }

    if (event.target.closest('.q1-dir-btn-maps')) return;

    const card = event.target.closest('[data-q1-open]');
    if (card && typeof window.openQ1Location === 'function') {
      window.openQ1Location(card.dataset.q1Open);
    }
  });

  cafePills.forEach(pill => {
    pill.addEventListener('click', () => {
      cafePills.forEach(p => p.classList.remove('is-active'));
      pill.classList.add('is-active');
      activeCafeCat = pill.dataset.cafeCat || 'all';
      cafeScrollList.scrollTop = 0;
      renderCafeDirectory();
    });
  });

  cafeSearchInput?.addEventListener('input', () => {
    cafeScrollList.scrollTop = 0;
    renderCafeDirectory();
  });

  cafeResetBtn?.addEventListener('click', () => {
    activeCafeCat = 'all';
    if (cafeSearchInput) cafeSearchInput.value = '';
    cafePills.forEach(p => p.classList.toggle('is-active', p.dataset.cafeCat === 'all'));
    cafeScrollList.scrollTop = 0;
    renderCafeDirectory();
  });

  renderCafeDirectory();
})();
