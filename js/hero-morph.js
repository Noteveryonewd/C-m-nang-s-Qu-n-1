(() => {
  'use strict';

  const hero = document.getElementById('govnHeroMorph');
  const cardsContainer = document.getElementById('heroCardsContainer');
  const drawer = document.getElementById('hmDetailDrawer');

  if (
    !hero ||
    !cardsContainer ||
    !drawer ||
    hero.dataset.hmInitialized === 'true'
  ) return;

  hero.dataset.hmInitialized = 'true';

  const LOCATIONS = [
    {
      id: 'independence-palace',
      name: 'Dinh Độc Lập',
      category: 'historical',
      categoryName: 'Di tích lịch sử',
      coordinates: [10.777, 106.6954],
      image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/20190923%20Independence%20Palace-2.jpg?width=1000',
      address: '135 Nam Kỳ Khởi Nghĩa, Phường Bến Thành, Quận 1',
      description: 'Dinh Thống Nhất hay Dinh Độc Lập là một công trình kiến trúc đặc sắc tại trung tâm Quận 1, từng là nơi ở và làm việc của Tổng thống Việt Nam Cộng hòa, đánh dấu mốc lịch sử trọng đại ngày 30/04/1975.',
      hours: '07:30 - 16:30 hàng ngày',
      ticket: '40.000 VNĐ / người lớn',
      mapsUrl: 'https://maps.google.com/?q=Dinh+Doc+Lap+Quan+1'
    },
    {
      id: 'ben-thanh-market',
      name: 'Chợ Bến Thành',
      category: 'culture',
      categoryName: 'Văn hóa & Mua sắm',
      coordinates: [10.7724, 106.698],
      image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/2023-12-10%20B%E1%BA%BFn%20Th%C3%A0nh%20Market%20%28Ch%E1%BB%A3%20B%E1%BA%BFn%20Th%C3%A0nh%29%2001.jpg?width=1000',
      address: 'Chợ Bến Thành, Phường Bến Thành, Quận 1',
      description: 'Biểu tượng giao thương lâu đời bậc nhất Sài Gòn với tháp đồng hồ đặc trưng bốn mặt, nơi bày bán đa dạng các mặt hàng thủ công mỹ nghệ, quà lưu niệm và ẩm thực truyền thống.',
      hours: '06:00 - 18:00 (Chợ đêm đến 22:00)',
      ticket: 'Miễn phí tham quan',
      mapsUrl: 'https://maps.google.com/?q=Cho+Ben+Thanh+Quan+1'
    },
    {
      id: 'central-post-office',
      name: 'Bưu điện Trung tâm Sài Gòn',
      category: 'architecture',
      categoryName: 'Kiến trúc Pháp',
      coordinates: [10.7798, 106.6992],
      image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/20190923%20Saigon%20Central%20Post%20Office-1.jpg?width=1000',
      address: '2 Công xã París, Bến Nghé, Quận 1',
      description: 'Công trình kiến trúc tiêu biểu kết hợp phong cách Gothic, Renaissance và phương Đông do kiến trúc sư Gustave Eiffel thiết kế vào cuối thế kỷ 19.',
      hours: '07:00 - 19:00 hàng ngày',
      ticket: 'Miễn phí tham quan',
      mapsUrl: 'https://maps.google.com/?q=Buu+dien+Trung+tam+Sai+Gon'
    },
    {
      id: 'notre-dame-cathedral',
      name: 'Nhà thờ Đức Bà Sài Gòn',
      category: 'architecture',
      categoryName: 'Kiến trúc Pháp',
      coordinates: [10.7798, 106.6992],
      image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/2023-12-10%20Notre-Dame%20Cathedral%20Basilica%20of%20Saigon%20%28Nh%C3%A0%20th%E1%BB%9D%20ch%C3%ADnh%20t%C3%B2a%20%C4%90%E1%BB%A9c%20B%C3%A0%20S%C3%A0i%20G%C3%B2n%29%2002.jpg?width=1000',
      address: '1 Công xã París, Bến Nghé, Quận 1',
      description: 'Ngôi thánh đường cổ kính với vật liệu xây dựng nhập khẩu trực tiếp từ Pháp, nổi bật với đôi tháp chuông uy nghi giữa lòng trung tâm thành phố.',
      hours: 'Đang trùng tu (chỉ tham quan bên ngoài)',
      ticket: 'Miễn phí',
      mapsUrl: 'https://maps.google.com/?q=Nha+tho+Duc+Ba+Sai+Gon'
    },
    {
      id: 'nguyen-hue-walking-street',
      name: 'Phố đi bộ Nguyễn Huệ',
      category: 'entertainment',
      categoryName: 'Giải trí & Check-in',
      coordinates: [10.7745, 106.703],
      image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/20180413%20215356Nguy%E1%BB%85n%20Hu%E1%BB%87%20Walking%20Street.jpg?width=1000',
      address: 'Đường Nguyễn Huệ, Bến Nghé, Quận 1',
      description: 'Tuyến phố đi bộ hiện đại nhộn nhịp nhất thành phố với đài phun nước nghệ thuật, không gian cà phê chung cư cũ độc đáo và các sự kiện âm nhạc lớn.',
      hours: 'Cả ngày (Sôi động nhất về đêm)',
      ticket: 'Miễn phí',
      mapsUrl: 'https://maps.google.com/?q=Pho+di+bo+Nguyen+Hue'
    },
    {
      id: 'saigon-opera-house',
      name: 'Nhà hát Thành phố',
      category: 'architecture',
      categoryName: 'Kiến trúc Pháp',
      coordinates: [10.7766, 106.7031],
      image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Saigon%20Opera%20House%2C%20front.jpg?width=1000',
      address: '07 Công trường Lam Sơn, Bến Nghé, Quận 1',
      description: 'Nhà hát lớn mang phong cách kiến trúc Tây Âu thuộc địa đầu thế kỷ 20, là trung tâm biểu diễn nghệ thuật hàn lâm hàng đầu của thành phố.',
      hours: 'Tùy theo lịch biểu diễn nghệ thuật',
      ticket: 'Tùy suất diễn',
      mapsUrl: 'https://maps.google.com/?q=Nha+hat+Thanh+pho+Ho+Chi+Minh'
    },
    {
      id: 'bitexco-financial-tower',
      name: 'Tháp Tài chính Bitexco',
      category: 'modern',
      categoryName: 'Kiến trúc hiện đại',
      coordinates: [10.7717, 106.7042],
      image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Bitexco%20financial%20tower.jpg?width=1000',
      address: '02 Hải Triều, Bến Nghé, Quận 1',
      description: 'Biểu tượng vươn cao của Sài Gòn với thiết kế lấy cảm hứng từ búp sen truyền thống, sở hữu đài quan sát Saigon SkyDeck toàn cảnh thành phố.',
      hours: '09:30 - 21:30 hàng ngày',
      ticket: '200.000 VNĐ (SkyDeck)',
      mapsUrl: 'https://maps.google.com/?q=Bitexco+Financial+Tower'
    },
    {
      id: 'bach-dang-wharf',
      name: 'Bến Bạch Đằng',
      category: 'entertainment',
      categoryName: 'Giải trí & Check-in',
      coordinates: [10.7712, 106.7075],
      image: 'https://immivietnam.com/Content/Uploads/images/Blog/2022/hcm/Bach-Dang-Wharf_Park.jpg',
      address: 'Đường Tôn Đức Thắng, Bến Nghé, Quận 1',
      description: 'Khu vực bờ sông Sài Gòn đã được nâng cấp khang trang, là bến đỗ WaterBus và điểm ngắm hoàng hôn, cầu Ba Son tuyệt đẹp.',
      hours: 'Cả ngày',
      ticket: 'Miễn phí',
      mapsUrl: 'https://maps.google.com/?q=Ben+Bach+Dang+Quan+1'
    },
    {
      id: 'peoples-committee',
      name: 'UBND Thành phố Hồ Chí Minh',
      category: 'architecture',
      categoryName: 'Kiến trúc Pháp',
      coordinates: [10.7769, 106.7004],
      image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/2023-12-10%20Ho%20Chi%20Minh%20City%20Hall%2001.jpg?width=1000',
      address: '86 Lê Thánh Tôn, Bến Nghé, Quận 1',
      description: 'Trụ sở Ủy ban Nhân dân TP. Hồ Chí Minh là tòa nhà kiến trúc kiểu Tây Âu kết hợp phong cách Phục Hưng tuyệt đẹp, được xây dựng từ năm 1909.',
      hours: 'Không mở cửa tham quan bên trong',
      ticket: 'Chỉ ngắm kiến trúc bên ngoài',
      mapsUrl: 'https://maps.google.com/?q=UBND+TP+Ho+Chi+Minh'
    },
    {
      id: 'nguyen-van-binh-book-street',
      name: 'Đường sách Nguyễn Văn Bình',
      category: 'culture',
      categoryName: 'Văn hóa & Mua sắm',
      coordinates: [10.7802, 106.6995],
      image: 'https://teach.emg.vn/wp-content/uploads/2022/12/nguyen-van-binh-book-street-teaching-jobs-in-ho-chi-minh-city-teach.emg_.vn_.jpg',
      address: 'Đường Nguyễn Văn Bình, Bến Nghé, Quận 1',
      description: 'Không gian văn hóa đọc nổi tiếng nằm ngay cạnh Nhà thờ Đức Bà, quy tụ nhiều nhà sách uy tín, quán cà phê sách và không gian sinh hoạt văn nghệ.',
      hours: '08:00 - 22:00 hàng ngày',
      ticket: 'Miễn phí',
      mapsUrl: 'https://maps.google.com/?q=Duong+sach+Nguyen+Van+Binh'
    },
    {
      id: 'cafe-apartment-42',
      name: 'Chung cư 42 Nguyễn Huệ',
      category: 'entertainment',
      categoryName: 'Giải trí & Check-in',
      coordinates: [10.7738, 106.7043],
      image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/42%20Nguyen%20Hue%20Boulevard%2C%20Saigon%20%2853547606514%29.jpg?width=1000',
      address: '42 Nguyễn Huệ, Bến Nghé, Quận 1',
      description: 'Tòa chung cư cũ được cải tạo thành tổ hợp quán cà phê, cửa hàng thời trang và không gian làm việc sáng tạo độc đáo bậc nhất giữa phố đi bộ.',
      hours: '08:00 - 22:30 hàng ngày',
      ticket: 'Miễn phí (tùy dịch vụ quán)',
      mapsUrl: 'https://maps.google.com/?q=42+Nguyen+Hue+Quan+1'
    },
    {
      id: 'hcmc-museum',
      name: 'Bảo tàng Thành phố Hồ Chí Minh',
      category: 'historical',
      categoryName: 'Di tích lịch sử',
      coordinates: [10.7766, 106.6991],
      image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Ho%20Chi%20Minh%20City%20Museum.jpg?width=1000',
      address: '65 Lý Tự Trọng, Bến Nghé, Quận 1',
      description: 'Tòa nhà mang phong cách kiến trúc tân cổ điển châu Âu đặc sắc, trưng bày các hiện vật phong phú về lịch sử hình thành và phát triển của Sài Gòn - TP.HCM.',
      hours: '08:00 - 17:00 hàng ngày',
      ticket: '30.000 VNĐ',
      mapsUrl: 'https://maps.google.com/?q=Bao+tang+TP+Ho+Chi+Minh'
    },
    {
      id: 'hcmc-museum-of-fine-arts',
      name: 'Bảo tàng Mỹ thuật TP.HCM',
      category: 'culture',
      categoryName: 'Văn hóa & Mua sắm',
      coordinates: [10.7689, 106.6985],
      image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Museum_of_Fine_Arts%2C_HCMC.jpg?width=1000',
      address: '97A Phó Đức Chính, Nguyễn Thái Bình, Quận 1',
      description: 'Biệt thự kiến trúc kết hợp Pháp - Á tinh tế, là nơi lưu giữ và trưng bày hàng ngàn tác phẩm mỹ thuật, điêu khắc giá trị của thành phố và quốc gia.',
      hours: '08:00 - 17:00 hàng ngày',
      ticket: '30.000 VNĐ',
      mapsUrl: 'https://maps.google.com/?q=Bao+tang+My+thuat+TP+Ho+Chi+Minh'
    },
    {
      id: 'mariamman-temple',
      name: 'Chùa Bà Mariamman',
      category: 'historical',
      categoryName: 'Di tích lịch sử',
      coordinates: [10.7719, 106.6957],
      image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/2023-12-10%20Mariamman%20Temple%2C%20Ho%20Chi%20Minh%20City%2001.jpg?width=1000',
      address: '45 Trương Định, Phường Bến Thành, Quận 1',
      description: 'Ngôi đền Hindu giáo linh thiêng được xây dựng từ cuối thế kỷ 19 bởi cộng đồng người gốc Ấn, nổi bật với kiến trúc chạm trổ thần linh tinh xảo.',
      hours: '07:00 - 19:00 hàng ngày',
      ticket: 'Miễn phí (cúng dường tùy tâm)',
      mapsUrl: 'https://maps.google.com/?q=Chua+Ba+Mariamman'
    },
    {
      id: 'bui-vien-street',
      name: 'Phố đi bộ Bùi Viện',
      category: 'entertainment',
      categoryName: 'Giải trí & Check-in',
      coordinates: [10.7678, 106.6933],
      image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Bui%20Vien%20Street%2C%20Ho%20Chi%20Minh%20City%2C%20at%20night%2C%202023%20%2804%29.jpg?width=1000',
      address: 'Khu phố Tây Bùi Viện, Phạm Ngũ Lão, Quận 1',
      description: 'Tuyến phố không ngủ sầm uất và nhộn nhịp nhất về đêm tại Sài Gòn, tập trung đông đảo du khách quốc tế với âm nhạc, ẩm thực và các hoạt động giải trí sôi động.',
      hours: 'Từ 18:00 đến đêm khuya',
      ticket: 'Miễn phí vào phố',
      mapsUrl: 'https://maps.google.com/?q=Pho+di+bo+Bui+Vien'
    },
    {
      id: 'tao-dan-park',
      name: 'Công viên Tao Đàn',
      category: 'entertainment',
      categoryName: 'Giải trí & Check-in',
      coordinates: [10.7747, 106.6925],
      image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/2023-12-10%20Tao%20%C4%90%C3%A0n%20Park%2C%20Saigon%2001.jpg?width=1000',
      address: 'Trương Định / Nguyễn Thị Minh Khai, Bến Thành, Quận 1',
      description: 'Lá phổi xanh mát rượi giữa lòng Quận 1 với hàng cây cổ thụ hàng chục năm tuổi, không gian tập thể dục, đền tưởng niệm các vua Hùng và CLB chim cảnh.',
      hours: 'Cả ngày',
      ticket: 'Miễn phí',
      mapsUrl: 'https://maps.google.com/?q=Cong+vien+Tao+Dan'
    }
  ];

  window.Q1Locations = LOCATIONS;

  const LOCATION_DETAILS = {
    'independence-palace': {
      story: 'Dinh Độc Lập là một dấu mốc quan trọng trong lịch sử hiện đại Việt Nam. Công trình hiện nay mang phong cách kiến trúc hiện đại, do kiến trúc sư Ngô Viết Thụ thiết kế; không gian nội thất giữ nguyên vẹn cấu trúc lịch sử từ thập niên 1960.',
      highlights: ['Kiến trúc hiện đại kết hợp truyền thống', 'Các phòng khánh tiết và phòng làm việc nguyên bản', 'Khuôn viên vườn cổ thụ và hầm chỉ huy'],
      tip: 'Nên dành khoảng 2 tiếng để tham quan kỹ toàn bộ các tầng và khu vực hầm ngầm.',
      duration: '1,5 - 2,5 giờ',
      bestTime: 'Buổi sáng'
    },
    'ben-thanh-market': {
      story: 'Chợ Bến Thành không chỉ là trung tâm mua sắm sầm uất mà còn là nhân chứng cho bao đổi thay của Sài Gòn. Tháp đồng hồ bốn mặt phía cửa Nam đã trở thành biểu tượng nhận diện không thể nhầm lẫn.',
      highlights: ['Tháp đồng hồ biểu tượng lịch sử', 'Khu vực thủ công mỹ nghệ và quà lưu niệm', 'Khu ẩm thực truyền thống phong phú'],
      tip: 'Nên thỏa thuận giá cả lịch sự khi mua sắm các mặt hàng lưu niệm tại chợ.',
      duration: '45 - 90 phút',
      bestTime: 'Buổi sáng hoặc chiều tối'
    },
    'central-post-office': {
      story: 'Được thiết kế bởi kiến trúc sư lừng danh Gustave Eiffel, Bưu điện Trung tâm Sài Gòn gây ấn tượng mạnh với vòm mái khung sắt uốn cong đậm chất Âu châu cuối thế kỷ 19.',
      highlights: ['Mặt tiền vàng cổ điển và vòm mái khung thép lớn', 'Hệ thống bản đồ lịch sử bên trong sảnh', 'Trải nghiệm gửi thiệp bưu điện truyền thống'],
      tip: 'Kết hợp tham quan cùng Nhà thờ Đức Bà và đường sách ngay bên cạnh.',
      duration: '30 - 45 phút',
      bestTime: 'Sáng sớm'
    },
    'notre-dame-cathedral': {
      story: 'Ngôi thánh đường tôn giáo lâu đời với gạch Marseille đỏ rực nhập khẩu trực tiếp từ Pháp, mang đến dáng vẻ uy nghiêm, cổ kính giữa trung tâm thành phố.',
      highlights: ['Đôi tháp chuông đôi biểu tượng', 'Kiến trúc tường gạch không trát độc đáo', 'Không gian quảng trường thoáng đãng'],
      tip: 'Công trình đang trong quá trình trùng tu lớn, du khách có thể ngắm kiến trúc tuyệt đẹp từ bên ngoài.',
      duration: '20 - 30 phút',
      bestTime: 'Buổi sáng sớm'
    },
    'nguyen-hue-walking-street': {
      story: 'Trục đường đi bộ trung tâm nối từ trụ sở UBND Thành phố hướng ra bờ sông Sài Gòn, là nơi diễn ra các hoạt động văn hóa, lễ hội và giải trí sôi động nhất về đêm.',
      highlights: ['Đài phun nước nghệ thuật trung tâm', 'Tổ hợp chung cư cà phê độc đáo dọc tuyến phố', 'Không gian sự kiện và biểu diễn âm nhạc đường phố'],
      tip: 'Ghé thăm vào dịp cuối tuần khi phố đi bộ cấm xe hoàn toàn để tận hưởng trọn vẹn không khí.',
      duration: '1 - 2 giờ',
      bestTime: 'Chiều tối và đêm'
    },
    'saigon-opera-house': {
      story: 'Nhà hát Thành phố là kiệt tác kiến trúc điêu khắc Tây Âu thời thuộc địa, nơi tổ chức các chương trình nghệ thuật hàn lâm chất lượng cao.',
      highlights: ['Mặt tiền chạm trổ hoa văn tinh xảo', 'Bậc thềm đá lớn hướng ra Công trường Lam Sơn', 'Các buổi hòa nhạc và múa đương đại'],
      tip: 'Kiểm tra lịch diễn trước nếu bạn muốn thưởng thức một chương trình nghệ thuật bên trong.',
      duration: '30 phút (tham quan ngoài)',
      bestTime: 'Hoàng hôn'
    },
    'bitexco-financial-tower': {
      story: 'Lấy cảm hứng từ hình búp sen vươn cao, tháp tài chính Bitexco từng là biểu tượng cho sự trỗi dậy hiện đại của Sài Gòn thế kỷ 21.',
      highlights: ['Kiến trúc búp sen độc đáo', 'Bãi đáp trực thăng nhô ra giữa không trung', 'Đài quan sát Saigon SkyDeck ngắm trọn thành phố'],
      tip: 'Lên đài quan sát vào lúc chiều tà để ngắm trọn hoàng hôn và thành phố lên đèn.',
      duration: '1 - 1,5 giờ',
      bestTime: 'Chiều muộn (17:00 - 18:30)'
    },
    'bach-dang-wharf': {
      story: 'Khu công viên bờ sông được chỉnh trang hiện đại, mang lại góc nhìn thoáng đãng hướng ra sông Sài Gòn và cầu Ba Son.',
      highlights: ['Lối đi dạo bờ sông lộng gió', 'Bến tàu buýt đường thủy (WaterBus)', 'Góc ngắm hoàng hôn tuyệt đẹp'],
      tip: 'Thử trải nghiệm tuyến WaterBus vào buổi chiều để ngắm nhìn thành phố từ góc nhìn trên mặt nước.',
      duration: '45 - 60 phút',
      bestTime: 'Hoàng hôn'
    },
    'peoples-committee': {
      story: 'Trụ sở UBND TP.HCM là dinh thự mang phong cách kiến trúc Phục Hưng pha trộn nghệ thuật trang trí Pháp, hoàn thành năm 1909.',
      highlights: ['Mặt tiền chạm khắc phù điêu vô cùng tỉ mỉ', 'Hệ thống chiếu sáng nghệ thuật về đêm', 'Khuôn viên tượng đài Bác Hồ trang nghiêm'],
      tip: 'Công trình không mở cửa tham quan bên trong, góc chụp đẹp nhất là từ đầu phố đi bộ Nguyễn Huệ.',
      duration: '20 - 30 phút',
      bestTime: 'Ban đêm khi thắp sáng đèn'
    },
    'nguyen-van-binh-book-street': {
      story: 'Con đường ngập tràn cây xanh dành riêng cho văn hóa đọc, quy tụ các nhà xuất bản uy tín và quán cà phê sách yên tĩnh.',
      highlights: ['Không gian sách đa dạng từ nhiều nhà xuất bản', 'Các quán cà phê sách thư giãn', 'Sự kiện giao lưu tác giả cuối tuần'],
      tip: 'Nơi lý tưởng để tìm mua những ấn phẩm văn hóa và tìm một góc tĩnh lặng giữa phố thị.',
      duration: '45 - 60 phút',
      bestTime: 'Buổi sáng'
    },
    'cafe-apartment-42': {
      story: 'Tòa chung cư cũ được thổi hồn mới thành tổ hợp các quán cà phê, cửa hàng thời trang sáng tạo mang phong cách vintage.',
      highlights: ['Nhiều quán cà phê phong cách độc đáo ở mỗi tầng', 'Góc ban công nhìn trực diện xuống phố đi bộ', 'Kiến trúc chung cư hoài cổ đặc trưng'],
      tip: 'Có thể sử dụng thang máy (có tính phí nhỏ) hoặc đi cầu thang bộ để khám phá các tầng.',
      duration: '1 - 1,5 giờ',
      bestTime: 'Chiều hoặc tối'
    },
    'hcmc-museum': {
      story: 'Tòa bảo tàng mang phong cách tân cổ điển lộng lẫy, từng là Dinh Gia Long, trưng bày nhiều tư liệu quý giá về lịch sử hình thành Sài Gòn.',
      highlights: ['Kiến trúc tân cổ điển châu Âu tráng lệ', 'Các phòng trưng bày lịch sử và khảo cổ', 'Khu vườn và hành lang chụp ảnh hoài cổ'],
      tip: 'Điểm đến lý tưởng cho những ai yêu thích lịch sử và nhiếp ảnh kiến trúc.',
      duration: '1 - 2 giờ',
      bestTime: 'Buổi sáng'
    },
    'hcmc-museum-of-fine-arts': {
      story: 'Biệt thự kết hợp phong cách kiến trúc Á - Âu tinh tế, từng thuộc về gia đình thương gia sản nghiệp lớn, nay là bảo tàng mỹ thuật hàng đầu.',
      highlights: ['Kiến trúc dinh thự cổ với giếng trời và thang máy xưa', 'Bộ sưu tập hội họa và điêu khắc giá trị', 'Không gian nghệ thuật yên bình, nên thơ'],
      tip: 'Góc cầu thang uốn lượn và các khung cửa sổ màu sắc là điểm check-in được yêu thích.',
      duration: '1,5 - 2 giờ',
      bestTime: 'Buổi sáng'
    },
    'mariamman-temple': {
      story: 'Ngôi đền Hindu giáo của cộng đồng người gốc Ấn với kiến trúc tháp cổng chạm trổ hàng trăm vị thần vô cùng sống động và rực rỡ.',
      highlights: ['Cổng gopuram chạm trổ các vị thần tinh xảo', 'Không gian tâm linh truyền thống Ấn Độ', 'Nghi thức cúng dường đặc trưng'],
      tip: 'Cần ăn mặc lịch sự, giữ trật tự và xin phép trước khi chụp ảnh các khu vực bên trong.',
      duration: '20 - 30 phút',
      bestTime: 'Ban ngày'
    },
    'bui-vien-street': {
      story: 'Khu phố Tây nổi tiếng với không khí sôi động, âm nhạc náo nhiệt và ẩm thực đường phố đa dạng phục vụ du khách quốc tế.',
      highlights: ['Không khí về đêm cực kỳ náo nhiệt', 'Ẩm thực đường phố đa dạng', 'Các quán bar và âm nhạc sống động'],
      tip: 'Cẩn thận bảo quản tư trang cá nhân do khu vực thường xuyên đông đúc.',
      duration: '1,5 - 3 giờ',
      bestTime: 'Từ 20:00 trở đi'
    },
    'tao-dan-park': {
      story: 'Lá phổi xanh yên bình giữa trung tâm Quận 1 với hàng cây cổ thụ hàng chục năm tuổi, nơi người dân tập thể dục và thư giãn.',
      highlights: ['Hàng cây cổ thụ rợp bóng mát', 'Đền tưởng niệm các Vua Hùng trang nghiêm', 'Không gian sinh hoạt cộng đồng thư thái'],
      tip: 'Ghé thăm vào sáng sớm để cảm nhận trọn vẹn nhịp sống trong lành của người dân thành phố.',
      duration: '45 - 60 phút',
      bestTime: 'Sáng sớm (06:00 - 08:00)'
    }
  };

  const MORPH_END = 600;
  const MAX_SCROLL = 1800;
  const IDLE_SPIN = 8;
  const ENABLE_MOUSE_PROGRESS = false;

  const intro = hero.querySelector('.hm-intro');
  const districtTitle = hero.querySelector('.hm-district-title');
  const arc = hero.querySelector('.hm-arc-content');
  const bg = hero.querySelector('.hm-bg');
  const drawerPanel = drawer.querySelector('.hm-drawer-panel');

  const reduced = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  let W = hero.clientWidth;
  let H = hero.clientHeight;

  let phase = reduced ? 'circle' : 'intro';

  let virtual = 0;
  let mouseX = 0;
  let lastMouseX = 0;
  let idleDeg = 0;
  let sMorph = 0;
  let sRot = 0;
  let sPar = 0;
  let sIntro = 1;
  let sDistrict = 0;
  let animationHandle = 0;
  let touchY = 0;
  let last = performance.now();
  let previousFocus = null;

  if (districtTitle) {
    districtTitle.style.opacity = sDistrict.toFixed(3);
  }

  if (!reduced) {
    hero.classList.add('hm-intro-hold');
  }

  const clamp = (value, min, max) =>
    Math.min(Math.max(value, min), max);

  const lerp = (a, b, t) =>
    a * (1 - t) + b * t;

  function makeCard(item) {
    const card = document.createElement('a');

    card.className = 'hm-card';
    card.href = item.mapsUrl;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    card.dataset.id = item.id;
    card.setAttribute('aria-label', `Xem thông tin ${item.name}`);

    const name = document.createElement('span');
    name.className = 'hm-name';
    name.textContent = item.name;

    const flip = document.createElement('span');
    flip.className = 'hm-flip';

    const front = document.createElement('span');
    front.className = 'hm-face hm-front';

    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.name;
    img.loading = 'lazy';
    img.decoding = 'async';

    const fallback = document.createElement('span');
    fallback.className = 'hm-image-fallback';
    fallback.textContent = item.name;

    img.addEventListener('error', () => {
      img.style.display = 'none';
      fallback.style.display = 'flex';
    }, { once: true });

    const shade = document.createElement('span');
    shade.className = 'hm-shade';

    front.append(img, fallback, shade);

    const back = document.createElement('span');
    back.className = 'hm-face hm-back';

    const title = document.createElement('span');
    title.className = 'k';
    title.textContent = item.name;

    const action = document.createElement('span');
    action.className = 'v';
    action.textContent = 'Khám phá →';

    back.append(title, action);
    flip.append(front, back);
    card.append(name, flip);

    card.addEventListener('click', event => {
      if (
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey ||
        event.button !== 0
      ) return;

      event.preventDefault();
      openDrawer(item.id);
    });

    return card;
  }

  function renderCards() {
    const fragment = document.createDocumentFragment();

    LOCATIONS.forEach(item => {
      fragment.appendChild(makeCard(item));
    });

    cardsContainer.replaceChildren(fragment);
  }

  function openDrawer(id) {
    const item = LOCATIONS.find(location => location.id === id);
    if (!item) return;

    previousFocus = document.activeElement;

    const details = LOCATION_DETAILS[item.id] || {};
    const image = drawer.querySelector('#hmDrawerImg');

    image.classList.remove('hm-drawer-image-missing');
    image.src = item.image;
    image.alt = item.name;

    image.onerror = () => {
      image.removeAttribute('src');
      image.alt = `Ảnh minh họa: ${item.name}`;
      image.classList.add('hm-drawer-image-missing');
    };

    drawer.querySelector('#hmDrawerCategory').textContent = item.categoryName;
    drawer.querySelector('#hmDrawerTitle').textContent = item.name;
    drawer.querySelector('#hmDrawerAddress').textContent = item.address;
    drawer.querySelector('#hmDrawerDesc').textContent = item.description;
    drawer.querySelector('#hmDrawerStory').textContent = details.story || item.description;
    drawer.querySelector('#hmDrawerVisitTime').textContent = details.duration || 'Tùy theo lịch trình cá nhân';
    drawer.querySelector('#hmDrawerBestTime').textContent = details.bestTime || 'Kiểm tra điều kiện thực tế';
    drawer.querySelector('#hmDrawerTips').textContent = details.tip || 'Hãy xác nhận thông tin trước khi khởi hành.';

    const highlights = drawer.querySelector('#hmDrawerHighlights');
    highlights.replaceChildren();

    (details.highlights || []).forEach(point => {
      const li = document.createElement('li');
      li.textContent = point;
      highlights.appendChild(li);
    });

    drawer.querySelector('#hmDrawerHours').textContent = item.hours;
    drawer.querySelector('#hmDrawerTicket').textContent = item.ticket;
    drawer.querySelector('#hmDrawerMapsLink').href = item.mapsUrl;

    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    document.documentElement.style.overflow = 'hidden';

    drawerPanel.focus({ preventScroll: true });
  }

  window.openQ1Location = openDrawer;

  function closeDrawer() {
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    document.documentElement.style.overflow = '';

    if (
      previousFocus &&
      typeof previousFocus.focus === 'function'
    ) {
      previousFocus.focus({ preventScroll: true });
    }
  }

  drawer.addEventListener('click', event => {
    if (event.target.closest('[data-hm-close]')) {
      closeDrawer();
    }
  });

  document.addEventListener('keydown', event => {
    if (
      event.key === 'Escape' &&
      drawer.classList.contains('is-open')
    ) {
      closeDrawer();
    }
  });

  const cards = [];
  let scatter = [];
  let cur = [];

  const ringOf = [];
  const posInRing = [];
  const ringCount = [0, 0];

  function setupPositions() {
    W = hero.clientWidth;
    H = hero.clientHeight;

    scatter = cards.map(() => ({
      x: (Math.random() - 0.5) * W * 1.4,
      y: (Math.random() - 0.5) * H * 1.4,
      r: (Math.random() - 0.5) * 180,
      s: 0.6,
      o: 0
    }));

    cur = scatter.map(position => ({ ...position }));
  }

  cardsContainer.addEventListener('dragstart', event => {
    event.preventDefault();
  });

  renderCards();
  cards.push(...hero.querySelectorAll('.hm-card'));

  if (!cards.length || !intro || !arc) return;

  cards.forEach((card, index) => {
    const ring = index % 2 === 0 ? 0 : 1;

    ringOf[index] = ring;
    posInRing[index] = ringCount[ring]++;
  });

  setupPositions();

  if (!reduced) {
    window.setTimeout(() => {
      phase = 'circle';
    }, 400);

    window.setTimeout(() => {
      hero.classList.remove('hm-intro-hold');
    }, 1200);
  } else {
    hero.classList.remove('hm-intro-hold');
  }

  function heroAtTop() {
    return hero.getBoundingClientRect().top > -40;
  }

  function consume(delta) {
    const isMobile = window.innerWidth < 768;
    const down = delta > 0;

    if (isMobile) {
      const activeHero = heroAtTop();
      const nextVirtual = clamp(
        virtual + delta,
        0,
        MAX_SCROLL
      );

      if (activeHero && nextVirtual !== virtual) {
        virtual = nextVirtual;
        return true;
      }

      return false;
    }

    if (
      (down && virtual < MAX_SCROLL) ||
      (!down && virtual > 0 && heroAtTop())
    ) {
      virtual = clamp(
        virtual + delta,
        0,
        MAX_SCROLL
      );

      return true;
    }

    return false;
  }

  hero.addEventListener('wheel', event => {
    if (consume(event.deltaY)) {
      event.preventDefault();
    }
  }, { passive: false });

  hero.addEventListener('touchstart', event => {
    if (event.touches.length) {
      touchY = event.touches[0].clientY;
    }
  }, { passive: true });

  hero.addEventListener('touchmove', event => {
    if (!event.touches.length) return;

    const y = event.touches[0].clientY;
    const delta = (touchY - y) * 1.7;

    touchY = y;

    if (consume(delta)) {
      event.preventDefault();
    }
  }, { passive: false });

  hero.addEventListener('pointerdown', event => {
    if (event.pointerType !== 'touch') return;
    touchY = event.clientY;
  }, { passive: true });

  hero.addEventListener('pointermove', event => {
    if (event.pointerType !== 'touch') return;

    const delta = (touchY - event.clientY) * 1.7;
    touchY = event.clientY;

    if (consume(delta)) {
      event.preventDefault();
    }
  }, { passive: false });

  hero.addEventListener('mousemove', event => {
    const rect = hero.getBoundingClientRect();

    const currentX =
      ((event.clientX - rect.left) / rect.width * 2 - 1) * 100;

    if (
      ENABLE_MOUSE_PROGRESS &&
      currentX > lastMouseX &&
      virtual < MAX_SCROLL &&
      heroAtTop()
    ) {
      virtual = clamp(
        virtual + (currentX - lastMouseX) * 1.2,
        0,
        MAX_SCROLL
      );
    }

    lastMouseX = currentX;
    mouseX = currentX;
  });

  hero.addEventListener('mouseleave', () => {
    lastMouseX = 0;
  });

  window.addEventListener('resize', () => {
    const oldW = W;
    setupPositions();
    if ((oldW < 768) !== (W < 768)) {
      virtual = 0;
    }
  }, { passive: true });

  function tick(now) {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;

    const k = reduced ? 1 : 1 - Math.exp(-dt * 6);
    const kc = reduced ? 1 : 1 - Math.exp(-dt * 5.5);

    sMorph += (
      clamp(virtual / MORPH_END, 0, 1) - sMorph
    ) * k;

    sRot += (
      clamp(
        (virtual - MORPH_END) / (MAX_SCROLL - MORPH_END),
        0,
        1
      ) - sRot
    ) * k;

    sPar += (mouseX - sPar) * k;

    if (bg && !reduced) {
      bg.style.transform = `translateX(${(-sPar * 0.12).toFixed(1)}px)`;
    }

    if (!reduced && phase === 'circle') {
      idleDeg = (
        idleDeg + dt * IDLE_SPIN * (1 - sMorph)
      ) % 360;
    }

    const isMobile = W < 768;
    const cardW = cards[0]?.offsetWidth || 120;
    const cardH = cards[0]?.offsetHeight || 160;

    const outerR = isMobile
      ? W * 0.45
      : Math.min(
          ringCount[0] * (cardW + 16) / (2 * Math.PI),
          W * 0.35
        );

    const innerR = outerR * 0.55;

    const centerDrop = Math.max(
      0,
      outerR + cardH / 2 + 10 - H / 2
    );

    const arcR = Math.min(W, H * 1.5) * (isMobile ? 1.3 : 1.0);
    const arcCenterY = H * (isMobile ? 0.35 : 0.25) + arcR - H / 2;

    const spread = isMobile ? 140 : 210;
    const startAngle = -90 - spread / 2;
    const step = spread / Math.max(1, cards.length - 1);
    const shuffle = -sRot * spread * 0.8;
    const arcScale = isMobile ? 1.15 : 1.35;

    for (let i = 0; i < cards.length; i++) {
      let target;

      if (phase === 'intro' || phase === 'scatter') {
        target = scatter[i];
      } else {
        const ring = ringOf[i];
        const radius = ring === 0 ? outerR : innerR;
        const ringScale = ring === 0 ? 1 : 0.92;
        const spin = ring === 0 ? idleDeg : -idleDeg * 1.35;

        const cAng = (posInRing[i] / ringCount[ring]) * 360 + spin;
        const cRad = cAng * Math.PI / 180;

        const rawAng = startAngle + i * step + shuffle;
        const centeredAng = rawAng - (-90);

        const wrappedAng =
          ((centeredAng + spread / 2) % spread + spread) %
            spread - spread / 2;

        const aAng = -90 + wrappedAng;
        const aRad = aAng * Math.PI / 180;

        target = {
          x: lerp(
            Math.cos(cRad) * radius,
            Math.cos(aRad) * arcR + sPar,
            sMorph
          ),
          y: lerp(
            Math.sin(cRad) * radius + centerDrop,
            Math.sin(aRad) * arcR + arcCenterY,
            sMorph
          ),
          r: lerp(cAng + 90, aAng + 90, sMorph),
          s: lerp(ringScale, arcScale, sMorph),
          o: 1
        };
      }

      const current = cur[i];

      current.x += (target.x - current.x) * kc;
      current.y += (target.y - current.y) * kc;
      current.r += (target.r - current.r) * kc;
      current.s += (target.s - current.s) * kc;
      current.o += (target.o - current.o) * kc;

      cards[i].style.transform =
        `translate(${current.x.toFixed(2)}px, ` +
        `${current.y.toFixed(2)}px) ` +
        `rotate(${current.r.toFixed(2)}deg) ` +
        `scale(${current.s.toFixed(3)})`;

      cards[i].style.opacity = current.o.toFixed(3);
    }

    const introTarget = clamp(1 - sMorph * 2.5, 0, 1);
    sIntro += (introTarget - sIntro) * k;
    intro.style.opacity = sIntro.toFixed(3);
    intro.style.transform = `translate(-50%, calc(-50% + ${centerDrop.toFixed(1)}px))`;

    // QUẬN 1 TITLE: Stays visible across the entire card layout, fading out only upon exit
    if (districtTitle) {
      const titleStart = 0.05;
      const titleFadeInEnd = 0.2;
      const titleFadeOutStart = 0.92;
      const titleEnd = 1.0;

      let titleTarget = 0;
      if (sMorph >= titleStart && sMorph <= titleEnd) {
        if (sMorph <= titleFadeInEnd) {
          titleTarget = (sMorph - titleStart) / (titleFadeInEnd - titleStart);
        } else if (sMorph <= titleFadeOutStart) {
          titleTarget = 1;
        } else {
          titleTarget = 1 - (sMorph - titleFadeOutStart) / (titleEnd - titleFadeOutStart);
        }
      }
      titleTarget = clamp(titleTarget, 0, 1);

      sDistrict += (titleTarget - sDistrict) * k;
      districtTitle.style.opacity = sDistrict.toFixed(3);

      const rise = (1 - sDistrict) * 14;
      districtTitle.style.transform = `translate(-50%, calc(-50% + ${rise.toFixed(1)}px))`;
    }

    const arcT = clamp((sMorph - 0.8) / 0.2, 0, 1);
    arc.style.opacity = arcT.toFixed(3);
    arc.style.transform = `translate(-50%, ${(1 - arcT) * 20}px)`;

    animationHandle = requestAnimationFrame(tick);
  }

  if (animationHandle) {
    cancelAnimationFrame(animationHandle);
  }

  animationHandle = requestAnimationFrame(tick);
})();