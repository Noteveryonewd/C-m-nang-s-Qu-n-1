/*
 * Quận 1 Hero Morph
 * Preserves the 16 destinations, location detail drawer,
 * ring animation, reversible ring-to-arc transition,
 * and shared location data for the listings/map.
 */
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

  // --------------------------------------------------
  // 1. LOCATION DATA
  // --------------------------------------------------

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

  // Shared data used by the listing section and map controller.
  window.Q1Locations = LOCATIONS;

  // --------------------------------------------------
  // 2. ADDITIONAL DETAIL FOR THE POPUP
  // --------------------------------------------------

  const LOCATION_DETAILS = {
    'independence-palace': {
      story: 'Dinh Độc Lập là một dấu mốc quan trọng trong lịch sử hiện đại Việt Nam. Công trình hiện nay mang phong cách kiến trúc hiện đại Việt Nam, do kiến trúc sư Ngô Viết Thụ thiết kế; khuôn viên và các không gian bên trong giúp người tham quan tiếp cận nhiều lớp lịch sử của thành phố.',
      highlights: [
        'Kiến trúc hiện đại và cách tổ chức không gian đặc trưng',
        'Các phòng nghi lễ, phòng làm việc và khu trưng bày theo tuyến tham quan',
        'Khuôn viên xanh cùng địa điểm gắn với sự kiện ngày 30/4/1975'
      ],
      tip: 'Nếu muốn xem nội thất, hãy kiểm tra loại vé và khu vực mở cửa trước khi đi. Dành thêm thời gian nếu bạn muốn đọc bảng giới thiệu thay vì chỉ chụp ảnh bên ngoài.',
      duration: 'Khoảng 1,5–2,5 giờ',
      bestTime: 'Buổi sáng hoặc đầu giờ chiều'
    },
    'ben-thanh-market': {
      story: 'Chợ Bến Thành là một biểu tượng thương mại quen thuộc của Sài Gòn. Ngoài kiến trúc mặt tiền với tháp đồng hồ, bên trong chợ tập trung các quầy hàng thủ công, quà lưu niệm, vải vóc và đồ ăn; trải nghiệm có thể khác nhau tùy khu vực và từng sạp.',
      highlights: [
        'Mặt tiền và tháp đồng hồ mang tính biểu tượng',
        'Các quầy hàng quà lưu niệm, hàng thủ công và sản vật',
        'Khu ẩm thực để thử một số món ăn Việt Nam'
      ],
      tip: 'Hỏi giá trước khi mua, giữ đồ cá nhân cẩn thận ở nơi đông người và mang theo tiền mặt mệnh giá nhỏ nếu cần. Giá và giờ của từng quầy có thể khác nhau.',
      duration: 'Khoảng 45–90 phút',
      bestTime: 'Buổi sáng; chiều tối nếu muốn xem khu chợ đêm gần đó'
    },
    'central-post-office': {
      story: 'Bưu điện Trung tâm Sài Gòn là công trình cuối thế kỷ XIX nổi bật với mặt tiền màu vàng, mái vòm lớn và các chi tiết trang trí mang phong cách châu Âu. Không gian bên trong cũng đáng chú ý với trần cao và những bản đồ lịch sử trang trí trên tường.',
      highlights: [
        'Mặt tiền và các chi tiết kiến trúc bên ngoài',
        'Không gian mái vòm rộng bên trong',
        'Các bản đồ trang trí và quầy dịch vụ bưu chính, tùy hoạt động hiện có'
      ],
      tip: 'Địa điểm này thường được ghé cùng Nhà thờ Đức Bà và Đường sách Nguyễn Văn Bình. Giữ lối đi thông thoáng cho khách sử dụng dịch vụ và hỏi trước khi chụp ảnh những khu vực hạn chế.',
      duration: 'Khoảng 20–40 phút',
      bestTime: 'Buổi sáng hoặc giữa các khung giờ cao điểm'
    },
    'notre-dame-cathedral': {
      story: 'Nhà thờ Đức Bà là công trình tôn giáo tiêu biểu từ thời Pháp thuộc, hoàn thành vào năm 1880 và nổi bật với gạch đỏ cùng hai tháp chuông. Khu vực quảng trường phía trước cũng là điểm nhận diện quen thuộc trong cảnh quan trung tâm thành phố.',
      highlights: [
        'Mặt tiền gạch đỏ và hai tháp chuông',
        'Không gian quảng trường phía trước nhà thờ',
        'Vị trí gần Bưu điện Trung tâm và Đường sách Nguyễn Văn Bình'
      ],
      tip: 'Tình trạng trùng tu và việc tiếp cận bên trong có thể thay đổi. Hãy kiểm tra thông báo tại chỗ trước khi lên kế hoạch; nếu chỉ tham quan bên ngoài, tránh cản trở người đi bộ.',
      duration: 'Khoảng 15–30 phút nếu tham quan bên ngoài',
      bestTime: 'Buổi sáng, khi ánh sáng thuận cho ảnh mặt tiền'
    },
    'nguyen-hue-walking-street': {
      story: 'Phố đi bộ Nguyễn Huệ là trục không gian công cộng rộng ở trung tâm, kết nối khu vực tòa nhà UBND Thành phố với hướng sông Sài Gòn. Nơi đây thường là điểm hẹn để dạo bộ, ngắm kiến trúc và theo dõi các hoạt động cộng đồng hoặc sự kiện theo mùa.',
      highlights: [
        'Trục đi bộ rộng và tầm nhìn về các công trình trung tâm',
        'Tượng đài Chủ tịch Hồ Chí Minh và khu vực quảng trường',
        'Quán cà phê, cửa hàng và các hoạt động công cộng quanh tuyến phố'
      ],
      tip: 'Buổi tối và dịp có sự kiện có thể rất đông. Nếu đi theo nhóm, thống nhất điểm hẹn và để ý thông báo giao thông khi có chương trình lớn.',
      duration: 'Khoảng 30–75 phút',
      bestTime: 'Cuối buổi chiều đến tối'
    },
    'saigon-opera-house': {
      story: 'Nhà hát Thành phố được xây dựng vào cuối thế kỷ XIX và đầu thế kỷ XX theo phong cách kiến trúc sân khấu châu Âu. Công trình tiếp tục là địa điểm biểu diễn nghệ thuật; trải nghiệm bên trong phụ thuộc vào lịch chương trình và vé của từng buổi diễn.',
      highlights: [
        'Mặt tiền giàu chi tiết trang trí và bậc thềm phía trước',
        'Vị trí ở khu vực Công trường Lam Sơn',
        'Các buổi biểu diễn nghệ thuật khi có chương trình phù hợp'
      ],
      tip: 'Nếu muốn vào trong, hãy tra lịch diễn và mua vé qua kênh chính thức trước. Ngắm bên ngoài không đồng nghĩa với quyền vào khu vực biểu diễn.',
      duration: 'Khoảng 15–30 phút bên ngoài; lâu hơn nếu xem biểu diễn',
      bestTime: 'Cuối chiều; hoặc theo giờ ghi trên vé'
    },
    'bitexco-financial-tower': {
      story: 'Bitexco Financial Tower là một điểm nhấn của đường chân trời trung tâm với hình khối thon cao và bãi đáp trực thăng nhô ra bên thân tháp. Tòa nhà thể hiện giai đoạn phát triển đô thị hiện đại của thành phố; hoạt động tham quan đài quan sát là dịch vụ riêng với điều kiện và giá vé có thể thay đổi.',
      highlights: [
        'Hình dáng tòa tháp dễ nhận ra trong đường chân trời',
        'Góc nhìn từ khu vực xung quanh tòa nhà',
        'Đài quan sát SkyDeck nếu đang mở và bạn có vé hợp lệ'
      ],
      tip: 'Kiểm tra website/kênh chính thức của SkyDeck để xác nhận giờ, giá và tình trạng mở cửa. Tầm nhìn có thể bị ảnh hưởng bởi mưa, mây hoặc sương mù.',
      duration: 'Khoảng 30–90 phút, tùy có lên đài quan sát hay không',
      bestTime: 'Cuối buổi chiều nếu thời tiết quang'
    },
    'bach-dang-wharf': {
      story: 'Bến Bạch Đằng là không gian công cộng dọc bờ sông Sài Gòn, phù hợp để nghỉ chân và nhìn dòng sông cùng các công trình bên kia bờ. Khu vực cũng kết nối với một số dịch vụ đường thủy; giờ chạy và điểm lên xuống cần xem theo lịch vận hành thực tế.',
      highlights: [
        'Lối dạo bộ ven sông và khu vực ngồi nghỉ',
        'Tầm nhìn về sông Sài Gòn và cầu Ba Son',
        'Kết nối với dịch vụ tàu buýt đường sông tại khu vực lân cận'
      ],
      tip: 'Nếu định đi WaterBus, kiểm tra tuyến, bến lên tàu và giờ chuyến trước khi đến. Buổi tối giữ khoảng cách an toàn với mép nước và để ý thời tiết.',
      duration: 'Khoảng 30–60 phút',
      bestTime: 'Cuối buổi chiều đến lúc hoàng hôn'
    },
    'peoples-committee': {
      story: 'Tòa nhà UBND Thành phố Hồ Chí Minh là công trình hành chính đầu thế kỷ XX với mặt tiền trang trí theo phong cách kiến trúc châu Âu. Công trình nằm ở đầu tuyến Nguyễn Huệ và thường được ngắm từ không gian công cộng phía trước; đây là trụ sở làm việc chứ không phải điểm tham quan tự do bên trong.',
      highlights: [
        'Mặt tiền và các chi tiết trang trí kiến trúc',
        'Góc nhìn dọc phố đi bộ Nguyễn Huệ',
        'Vị trí gần Nhà hát Thành phố và các công trình trung tâm khác'
      ],
      tip: 'Hãy xem công trình từ khu vực công cộng và tôn trọng hướng dẫn an ninh. Không mặc định rằng khách du lịch được phép vào bên trong.',
      duration: 'Khoảng 10–25 phút',
      bestTime: 'Sáng sớm hoặc cuối buổi chiều để dạo bộ khu vực xung quanh'
    },
    'nguyen-van-binh-book-street': {
      story: 'Đường sách Nguyễn Văn Bình là tuyến phố đi bộ nhỏ dành cho hoạt động đọc sách và giao lưu văn hóa, nằm gần Nhà thờ Đức Bà và Bưu điện Trung tâm. Các gian hàng, nhà sách và chương trình giao lưu tạo nên trải nghiệm chậm rãi hơn so với những trục mua sắm đông đúc.',
      highlights: [
        'Các nhà sách và quầy sách từ nhiều đơn vị xuất bản',
        'Không gian ngồi đọc và quán cà phê tùy cửa hàng',
        'Sự kiện giới thiệu sách hoặc giao lưu khi có lịch tổ chức'
      ],
      tip: 'Lịch sự kiện và giờ của từng gian hàng có thể khác nhau. Khi có sự kiện, hãy giữ lối đi thông thoáng và hỏi nhân viên trước khi chụp ảnh hoạt động riêng.',
      duration: 'Khoảng 30–60 phút',
      bestTime: 'Buổi sáng hoặc đầu giờ tối'
    },
    'cafe-apartment-42': {
      story: 'Chung cư 42 Nguyễn Huệ là tòa nhà cũ được nhiều cửa hàng, quán cà phê và không gian sáng tạo sử dụng. Sức hấp dẫn của nơi này đến từ mặt đứng nhiều ban công và việc mỗi tầng có thể mang một phong cách riêng; các cửa hàng hoạt động độc lập.',
      highlights: [
        'Mặt đứng chung cư nhìn từ phố đi bộ Nguyễn Huệ',
        'Các quán cà phê, cửa hàng và studio theo từng tầng',
        'Góc nhìn xuống phố từ những cơ sở cho phép khách ngồi'
      ],
      tip: 'Giờ mở cửa, điều kiện sử dụng thang máy và mức chi tiêu phụ thuộc từng cửa hàng hoặc đơn vị quản lý. Hãy xem bảng thông tin tại lối vào và xin phép trước khi chụp bên trong cửa hàng.',
      duration: 'Khoảng 45–90 phút',
      bestTime: 'Chiều hoặc tối; chọn quán cụ thể trước nếu cần chỗ ngồi'
    },
    'hcmc-museum': {
      story: 'Bảo tàng Thành phố Hồ Chí Minh nằm trong một công trình kiến trúc lịch sử từng được biết đến với tên Dinh Gia Long. Các phòng trưng bày giới thiệu nhiều khía cạnh của quá trình hình thành và phát triển đô thị, đời sống văn hóa và lịch sử khu vực thành phố.',
      highlights: [
        'Kiến trúc và không gian bên trong tòa nhà lịch sử',
        'Các chủ đề về Sài Gòn – Gia Định và TP. Hồ Chí Minh',
        'Hiện vật, tư liệu và trưng bày theo từng phòng'
      ],
      tip: 'Chủ đề trưng bày, một số phòng mở cửa và giá vé có thể thay đổi. Kiểm tra thông báo của bảo tàng trước chuyến đi, nhất là khi bạn muốn xem một chuyên đề cụ thể.',
      duration: 'Khoảng 60–120 phút',
      bestTime: 'Buổi sáng hoặc đầu giờ chiều'
    },
    'hcmc-museum-of-fine-arts': {
      story: 'Bảo tàng Mỹ thuật TP.HCM kết hợp bộ sưu tập nghệ thuật với một tòa nhà có giá trị kiến trúc riêng. Người tham quan có thể gặp nhiều hình thức sáng tác như hội họa, điêu khắc và nghệ thuật trang trí; các tác phẩm được trưng bày có thể thay đổi theo phòng và đợt tổ chức.',
      highlights: [
        'Tòa nhà lịch sử với chi tiết kiến trúc Pháp – Á',
        'Các phòng trưng bày hội họa, điêu khắc và mỹ thuật ứng dụng',
        'Không gian hành lang, cầu thang và chi tiết trang trí của tòa nhà'
      ],
      tip: 'Tuân thủ quy định về chụp ảnh, khoảng cách với tác phẩm và các khu vực hạn chế. Nếu có triển lãm tạm thời, kiểm tra thông tin vé và giờ mở cửa trước khi đến.',
      duration: 'Khoảng 60–120 phút',
      bestTime: 'Buổi sáng, khi bạn có thể tham quan thong thả'
    },
    'mariamman-temple': {
      story: 'Chùa Bà Mariamman là ngôi đền Hindu gắn với cộng đồng người Tamil và đời sống tín ngưỡng đa dạng ở Sài Gòn. Cổng tháp với các hình tượng thần linh nhiều màu sắc là điểm nổi bật, nhưng nơi đây trước hết vẫn là không gian thờ tự đang được sử dụng.',
      highlights: [
        'Tháp cổng với tượng và chi tiết trang trí Hindu',
        'Không gian tín ngưỡng gắn với cộng đồng người Tamil',
        'Một ví dụ về sự đa dạng văn hóa và tôn giáo trong thành phố'
      ],
      tip: 'Ăn mặc lịch sự, giữ yên lặng và hỏi trước khi chụp ảnh bên trong. Tôn trọng người đang hành lễ và làm theo hướng dẫn của người quản lý đền.',
      duration: 'Khoảng 15–30 phút',
      bestTime: 'Ban ngày; tránh gây cản trở vào thời điểm hành lễ'
    },
    'bui-vien-street': {
      story: 'Phố đi bộ Bùi Viện nổi tiếng với hoạt động ăn uống và giải trí về đêm, cùng nhiều quán bar, nhà hàng và âm nhạc đường phố. Đây là một không gian rất sôi động, khác biệt rõ với các điểm tham quan lịch sử yên tĩnh hơn trong khu vực.',
      highlights: [
        'Không khí phố đêm và hoạt động ăn uống',
        'Nhiều lựa chọn giải trí tập trung dọc tuyến phố',
        'Sự nhộn nhịp và giao lưu của du khách quốc tế'
      ],
      tip: 'Khu vực có thể ồn và đông người. Giữ điện thoại, túi xách cẩn thận; hỏi rõ giá trước khi gọi món hoặc sử dụng dịch vụ và sắp xếp phương tiện về trước.',
      duration: 'Khoảng 45–120 phút',
      bestTime: 'Buổi tối; kiểm tra thông tin hạn chế giao thông vào ngày có tổ chức phố đi bộ'
    },
    'tao-dan-park': {
      story: 'Công viên Tao Đàn là khoảng xanh lâu năm giữa trung tâm, với lối đi dưới tán cây và không gian cho sinh hoạt ngoài trời. Công viên thường được người dân sử dụng để đi bộ, tập thể dục và nghỉ ngơi; khu vực Đền tưởng niệm các Vua Hùng cũng là điểm đáng chú ý.',
      highlights: [
        'Lối đi bộ và tán cây tạo bóng mát',
        'Không gian sinh hoạt, tập thể dục của người dân địa phương',
        'Đền tưởng niệm các Vua Hùng trong khuôn viên'
      ],
      tip: 'Đi giày phù hợp để dạo bộ, mang nước khi trời nóng và tôn trọng các không gian tưởng niệm. Một số hoạt động đặc biệt có thể khiến lối đi hoặc khu vực tiếp cận thay đổi.',
      duration: 'Khoảng 30–60 phút',
      bestTime: 'Sáng sớm hoặc cuối buổi chiều'
    }
  };

  // --------------------------------------------------
  // 3. ANIMATION SETTINGS
  // --------------------------------------------------

  window.Q1Locations = LOCATIONS;

  const MORPH_END = 600;
  const MAX_SCROLL = 1800;
  const IDLE_SPIN = 8;

  // Opening sequence timing, measured from when the rings begin.
  const INTRO_FADE_DELAY_MS = 1300;
  const INTRO_FADE_MS = 650;

  // Leave a short pause after the intro disappears before revealing
  // the district title.
  const TITLE_DELAY_MS =
    INTRO_FADE_DELAY_MS + INTRO_FADE_MS + 250;

  const TITLE_FADE_IN_MS = 650;

  // Disable mouse-driven progress so moving the cursor cannot
  // accidentally advance the ring-to-arc transition.
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

  // In reduced-motion mode, show the district title immediately.
  // Otherwise, this clock starts when the cards form their rings.
  let circleStartedAt = reduced
    ? performance.now() - TITLE_DELAY_MS - TITLE_FADE_IN_MS
    : null;

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

  // --------------------------------------------------
  // 4. CREATE LOCATION CARDS
  // --------------------------------------------------

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
      // Allow modified clicks to open Google Maps normally.
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

  // --------------------------------------------------
  // 5. LOCATION DETAIL DRAWER
  // --------------------------------------------------

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
      image.alt = `Ảnh minh họa chưa tải được: ${item.name}`;
      image.classList.add('hm-drawer-image-missing');
    };

    image.onload = () => {
      image.classList.remove('hm-drawer-image-missing');
    };

    drawer.querySelector('#hmDrawerCategory').textContent =
      item.categoryName;

    drawer.querySelector('#hmDrawerTitle').textContent =
      item.name;

    drawer.querySelector('#hmDrawerAddress').textContent =
      item.address;

    drawer.querySelector('#hmDrawerDesc').textContent =
      item.description;

    drawer.querySelector('#hmDrawerStory').textContent =
      details.story || item.description;

    drawer.querySelector('#hmDrawerVisitTime').textContent =
      details.duration || 'Tùy theo sở thích và lịch trình';

    drawer.querySelector('#hmDrawerBestTime').textContent =
      details.bestTime || 'Kiểm tra điều kiện thực tế trước khi đi';

    drawer.querySelector('#hmDrawerTips').textContent =
      details.tip || 'Kiểm tra thông tin mới nhất trước chuyến đi.';

    const highlights = drawer.querySelector('#hmDrawerHighlights');
    highlights.replaceChildren();

    (details.highlights || []).forEach(point => {
      const li = document.createElement('li');
      li.textContent = point;
      highlights.appendChild(li);
    });

    drawer.querySelector('#hmDrawerHours').textContent =
      item.hours;

    drawer.querySelector('#hmDrawerTicket').textContent =
      item.ticket;

    drawer.querySelector('#hmDrawerMapsLink').href =
      item.mapsUrl;

    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    document.documentElement.style.overflow = 'hidden';

    drawerPanel.focus({ preventScroll: true });
  }

  // Used by listing cards and map popups.
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

  // --------------------------------------------------
  // 6. POSITION AND RING DATA
  // --------------------------------------------------

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

  // Begin forming the rings and start the title clock.
  if (!reduced) {
    window.setTimeout(() => {
      phase = 'circle';
      circleStartedAt = performance.now();
    }, 400);

    window.setTimeout(() => {
      hero.classList.remove('hm-intro-hold');
    }, 1200);
  } else {
    hero.classList.remove('hm-intro-hold');
  }

  // --------------------------------------------------
  // 7. SCROLL, TOUCH AND MOUSE INPUT
  // --------------------------------------------------

  function heroAtTop() {
    return hero.getBoundingClientRect().top > -40;
  }

  function consume(delta) {
    if (W < 768) return false;

    const down = delta > 0;

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
    const delta = (touchY - y) * 2;

    touchY = y;

    if (consume(delta)) {
      event.preventDefault();
    }
  }, { passive: false });

  hero.addEventListener('mousemove', event => {
    const rect = hero.getBoundingClientRect();

    const currentX =
      ((event.clientX - rect.left) / rect.width * 2 - 1) * 100;

    // Mouse movement only affects parallax, not morph progress.
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

  // --------------------------------------------------
  // 8. ANIMATION LOOP
  // --------------------------------------------------

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
      bg.style.transform =
        `translateX(${(-sPar * 0.12).toFixed(1)}px)`;
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

    const arcR = Math.min(W, H * 1.5) *
      (isMobile ? 1.3 : 1.0);

    const arcCenterY =
      H * (isMobile ? 0.35 : 0.25) + arcR - H / 2;

    const spread = isMobile ? 140 : 210;
    const startAngle = -90 - spread / 2;
    const step = spread / Math.max(1, cards.length - 1);
    const shuffle = -sRot * spread * 0.8;
    const arcScale = isMobile ? 1.15 : 1.35;

    for (let i = 0; i < cards.length; i++) {
      let target;

      // Keep the initial scatter while the opening title is visible.
      if (phase === 'intro' || phase === 'scatter') {
        target = scatter[i];
      } else {
        const ring = ringOf[i];
        const radius = ring === 0 ? outerR : innerR;
        const ringScale = ring === 0 ? 1 : 0.92;
        const spin = ring === 0 ? idleDeg : -idleDeg * 1.35;

        const cAng =
          (posInRing[i] / ringCount[ring]) * 360 + spin;

        const cRad = cAng * Math.PI / 180;

        // Preserve the wrapped curved-arc arrangement.
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

    // -----------------------------------------------
    // INTRODUCTION: FADE AWAY BEFORE THE DISTRICT TITLE
    // -----------------------------------------------

    const elapsedSinceCircle = circleStartedAt === null
      ? 0
      : now - circleStartedAt;

    const introTimeOpacity = 1 - clamp(
      (elapsedSinceCircle - INTRO_FADE_DELAY_MS) /
        INTRO_FADE_MS,
      0,
      1
    );

    // Also allow scrolling forward to fade the introduction sooner.
    const introScrollOpacity = clamp(
      1 - sMorph * 2,
      0,
      1
    );

    const introTarget = Math.min(
      introTimeOpacity,
      introScrollOpacity
    );

    sIntro += (introTarget - sIntro) * k;

    intro.style.opacity = sIntro.toFixed(3);

    intro.style.transform =
      `translate(-50%, calc(-50% + ${centerDrop.toFixed(1)}px))`;

    // -----------------------------------------------
    // QUẬN 1 TITLE: DELAYED REVEAL, REVERSIBLE ON SCROLL
    // -----------------------------------------------

    if (districtTitle) {
      const elapsed = circleStartedAt === null
        ? 0
        : now - circleStartedAt;

      // Wait for the intro to fade out, then reveal the title.
      const entryTarget = clamp(
        (elapsed - TITLE_DELAY_MS) / TITLE_FADE_IN_MS,
        0,
        1
      );

      // Fade out only as the ring-to-arc transition approaches its end.
      // Because this is based on sMorph, reversing scroll restores it.
      const morphFade = 1 - clamp(
        (sMorph - 0.82) / 0.18,
        0,
        1
      );

      const titleTarget = entryTarget * morphFade;

      sDistrict += (titleTarget - sDistrict) * k;

      districtTitle.style.opacity = sDistrict.toFixed(3);

      const rise = (1 - sDistrict) * 14;

      districtTitle.style.transform =
        `translate(-50%, calc(-50% + ${rise.toFixed(1)}px)`;
    }

    // -----------------------------------------------
    // ARC LABEL
    // -----------------------------------------------

    const arcT = clamp(
      (sMorph - 0.8) / 0.2,
      0,
      1
    );

    arc.style.opacity = arcT.toFixed(3);

    arc.style.transform =
      `translate(-50%, ${(1 - arcT) * 20}px)`;

    animationHandle = requestAnimationFrame(tick);
  }

  if (animationHandle) {
    cancelAnimationFrame(animationHandle);
  }

  animationHandle = requestAnimationFrame(tick);
})();