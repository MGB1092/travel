// 여행 일정 데이터 — 이 파일만 수정하면 페이지 내용이 바뀝니다.
// time: "HH:MM", type: flight | move | food | sight | stay | shop | etc
// place 가 있으면 구글 지도 링크가 자동으로 붙습니다.
window.TRIP = {
  title: "가을이네 가족 도쿄 4박5일 여행",
  subtitle: "秋の東京 · 단풍 물든 도쿄로",
  photo: "images/family.jpg",   // 상단 사진 (지우면 사진 없이 표시)
  startDate: "2026-10-08",
  endDate: "2026-10-12",

  // 날씨: 예보(약 16일 이내)가 있으면 실시간 예보, 없으면 평년 기후값을 보여줍니다.
  weather: {
    city: "도쿄",
    lat: 35.6895,
    lon: 139.6917,
    timezone: "Asia/Tokyo",
    link: { label: "AccuWeather에서 자세히 보기", url: "https://www.accuweather.com/ko/jp/tokyo/226396/october-weather/226396?year=2026" },
    // 도쿄 10월 평년값 (일본 기상청 1991–2020 기준, 대략값)
    normal: { max: 22, min: 15, note: "아침저녁 쌀쌀하니 얇은 겉옷 추천" }
  },

  // 환율: 실시간(무료 API, 하루 1회 이상 갱신) 조회 실패 시 fallback 사용 (1엔당 원)
  exchange: {
    from: "JPY", to: "KRW", fallback: 9.0,
    link: { label: "네이버 실시간 환율 보기", url: "https://search.naver.com/search.naver?query=%EC%97%94%ED%99%94+%ED%99%98%EC%9C%A8" }
  },

  info: [
    { icon: "🛫", label: "가는 편 · 10/8(목)", value: "RF322 · 09:30 청주(CJJ) → 11:50 나리타(NRT) T3", memo: "에어로케이항공 · 일반석 · A320 · 기내식 불포함" },
    { icon: "🛬", label: "오는 편 · 10/12(월)", value: "RF321 · 13:05 나리타(NRT) T3 → 15:30 청주(CJJ)", memo: "에어로케이항공 · 일반석 · A320 · 기내식 불포함 · 시간은 현지 기준" },
    { icon: "🏨", label: "숙소 · 10/8(목)~10/10(토) 2박", value: "호텔 오쿠라 도쿄 베이 ★5", place: "Hotel Okura Tokyo Bay", tel: "+81473553344",
      memo: "치바현 우라야스시 마이하마 1-8 · 체크인 15:00부터 · 체크아웃 12:00까지 · ☎ +81 47-355-3344" },
    { icon: "🏠", label: "숙소 · 10/10(토)~10/12(월) 2박", value: "시부야 아파트 (Shibuya Crossing 5mins walk COZY BRIGHT COMFY PAD 35sqm)", place: "2-20-26 Dogenzaka, Shibuya, Tokyo",
      memo: "도쿄도 시부야구 도겐자카 2-20-26 · 체크인 16:00~24:00 · 체크아웃 11:00까지 · 출입 방법은 예약 앱의 '체크인 안내' 확인" },
    { icon: "🚨", label: "긴급 연락처", value: "주일 한국대사관 +81-3-3455-2601", tel: "+81334552601" }
  ],

  days: [
    {
      date: "2026-10-08",
      title: "도착 & 마이하마",
      items: [
        { time: "07:30", type: "move", title: "청주국제공항 도착", place: "Cheongju International Airport", memo: "출발 2시간 전 · 기내식 없으니 간단히 요기" },
        { time: "09:30", type: "flight", title: "RF322 청주 출발", memo: "에어로케이항공 · A320" },
        { time: "11:50", type: "flight", title: "나리타 T3 도착", place: "Narita Airport Terminal 3", memo: "입국심사 · Visit Japan Web QR 준비" },
        { time: "12:30", type: "food", title: "점심 · 나리타 T3 푸드코트", place: "Narita Airport Terminal 3 Food Court" },
        { time: "13:30", type: "move", title: "공항 리무진버스 → 도쿄 디즈니 리조트 호텔", memo: "호텔 앞 하차 · 약 1시간~1시간 30분 · 시간표는 미리 확인" },
        { time: "15:00", type: "stay", title: "호텔 오쿠라 도쿄 베이 체크인", place: "Hotel Okura Tokyo Bay", memo: "체크인 15:00부터 · 마이하마 1-8" },
        { time: "16:30", type: "shop", title: "이크스피아리 산책", place: "Ikspiari", memo: "마이하마역 앞 쇼핑몰 · 디즈니 리조트 라인으로 이동" },
        { time: "18:30", type: "food", title: "저녁 · 이크스피아리 레스토랑", place: "Ikspiari" }
      ]
    },
    {
      date: "2026-10-09",
      title: "도쿄 디즈니랜드 🏰",
      items: [
        { time: "07:30", type: "food", title: "호텔 조식", place: "Hotel Okura Tokyo Bay" },
        { time: "08:15", type: "move", title: "디즈니 리조트 라인 → 도쿄 디즈니랜드 스테이션", place: "Bayside Station", memo: "호텔 옆 베이사이드역 · 모노레일 프리패스 있으면 편리" },
        { time: "08:30", type: "sight", title: "입장 대기", place: "Tokyo Disneyland", memo: "개장 시간은 공식 앱에서 확인" },
        { time: "09:00", type: "sight", title: "입장 · 인기 어트랙션부터", memo: "공식 앱으로 대기시간 확인 · 필요하면 프리미어 액세스" },
        { time: "12:00", type: "food", title: "점심 · 파크 안 레스토랑", memo: "모바일 오더 이용하면 줄이 짧아요" },
        { time: "14:00", type: "sight", title: "낮 퍼레이드", memo: "공연 시간은 앱에서 확인 · 30분 전 자리 잡기" },
        { time: "18:00", type: "food", title: "저녁 · 파크 안" },
        { time: "19:30", type: "sight", title: "야간 퍼레이드 · 일렉트리컬 퍼레이드 드림라이츠", memo: "시간은 앱에서 확인" },
        { time: "21:00", type: "move", title: "폐장 후 호텔로", memo: "디즈니 리조트 라인 → 베이사이드역" }
      ]
    },
    {
      date: "2026-10-10",
      title: "시부야로 이동",
      items: [
        { time: "11:30", type: "stay", title: "호텔 오쿠라 도쿄 베이 체크아웃", place: "Hotel Okura Tokyo Bay", memo: "체크아웃 12:00까지" },
        { time: "12:00", type: "move", title: "마이하마 → 시부야", memo: "JR 게이요선 · 도쿄역 환승 · 약 1시간" },
        { time: "13:00", type: "stay", title: "시부야역 코인로커에 짐 보관", place: "Shibuya Station", memo: "숙소 체크인이 16:00부터라 짐은 역에 · 큰 캐리어는 짐 보관 서비스 예약 추천" },
        { time: "14:00", type: "sight", title: "메이지 신궁", place: "Meiji Jingu" },
        { time: "15:00", type: "shop", title: "다케시타 거리", place: "Takeshita Street" },
        { time: "16:30", type: "sight", title: "시부야 스카이", place: "Shibuya Sky", memo: "일몰 시간대 예약 추천" },
        { time: "18:00", type: "stay", title: "짐 찾아서 숙소 체크인", place: "2-20-26 Dogenzaka, Shibuya, Tokyo", memo: "시부야 스크램블 교차로에서 도보 5분 · 체크인 16:00~24:00" },
        { time: "19:00", type: "food", title: "저녁 · 야키토리", place: "Nonbei Yokocho Shibuya" }
      ]
    },
    {
      date: "2026-10-11",
      title: "가마쿠라 당일치기",
      items: [
        { time: "09:00", type: "move", title: "시부야 → 가마쿠라", place: "Shibuya Station", memo: "JR 쇼난신주쿠 라인 · 약 1시간" },
        { time: "10:30", type: "sight", title: "쓰루가오카 하치만구", place: "Tsurugaoka Hachimangu" },
        { time: "12:00", type: "food", title: "점심 · 시라스동", place: "Komachi-dori Kamakura" },
        { time: "13:30", type: "sight", title: "가마쿠라 대불", place: "Kotoku-in" },
        { time: "15:30", type: "sight", title: "에노덴 타고 가마쿠라코코마에 바다", place: "Kamakurakokomae Station" },
        { time: "19:30", type: "food", title: "저녁 · 시부야 이자카야", place: "Shibuya" }
      ]
    },
    {
      date: "2026-10-12",
      title: "귀국",
      items: [
        { time: "08:00", type: "food", title: "아침 · 숙소 근처 편의점/카페" },
        { time: "08:45", type: "stay", title: "숙소 체크아웃", memo: "체크아웃 11:00까지" },
        { time: "09:15", type: "move", title: "나리타 익스프레스(N'EX) · 시부야 → 나리타", place: "Shibuya Station", memo: "약 1시간 20분 · 공항 제2터미널역에서 T3까지 도보 약 15분 · 열차 시간은 예약 내역 확인" },
        { time: "11:00", type: "move", title: "나리타 T3 도착 · 탑승 수속", place: "Narita Airport Terminal 3", memo: "기내식 없으니 공항 푸드코트에서 점심" },
        { time: "13:05", type: "flight", title: "RF321 나리타 출발", memo: "에어로케이항공 · A320" },
        { time: "15:30", type: "flight", title: "청주국제공항 도착", memo: "한국 시간" }
      ]
    }
  ],

  // 준비물 공유 저장소 (Firebase Realtime Database 주소). 비워 두면 각자 기기에만 저장됩니다.
  shared: {
    dbUrl: "https://gaeul-tokyo-default-rtdb.asia-southeast1.firebasedatabase.app",
    path: "trips/gaeul-tokyo-2026/checklist"
  },

  // 전리품(사 올 것) 목록 · 준비물과 같은 방식으로 가족 공유
  // (Firebase 보안 규칙 trips/$trip/checklist 에 맞춘 경로)
  loot: {
    path: "trips/gaeul-tokyo-2026-loot/checklist",
    items: ["위스키", "지숙이 가방", "가을이 옷"]
  },

  // 먹어 볼 음식 목록 · 가족 공유
  food: {
    path: "trips/gaeul-tokyo-2026-food/checklist",
    reviewsPath: "trips/gaeul-tokyo-2026-food/reviews",   // 식당별 한줄평 (Firebase 규칙에 reviews 허용 필요)
    reviewers: ["지숙", "성민"],   // 한줄평 쓰는 사람 (순서대로 한 줄씩)
    // 구글 "내 지도" 공유 링크를 넣으면 '한 번에 보기' 버튼이 이 지도로 연결됩니다 (maps/food.csv 가져오기용)
    myMapUrl: "https://www.google.com/maps/d/viewer?mid=1rR5zbNyqZDSh_iP17IfdCnWubDckUNw",
    items: [
      { name: "Aigre Douce (에그르 두스) 🍰", place: "Aigre Douce, 3-22-13 Shimoochiai, Shinjuku City, Tokyo",
        memo: "프렌치 파티세리 · ★4.4 · 신주쿠구 시모오치아이 3-22-13 · 11:00 오픈 (휴무일 확인)" },
      { name: "스아게 수프카레 시부야점 🍛", place: "Hokkaido Soup Curry Suage Shibuya",
        memo: "홋카이도 수프카레 · ★4.6 · ¥1,000–2,000 · 22:00까지 · 시부야 숙소 근처 (10/10~11 저녁 추천)" },
      { name: "TANUKI APPETIZING (타누키 에피타이징) 🥯", place: "TANUKI APPETIZING, 4-10-5 Kachidoki, Chuo City, Tokyo 104-0054",
        memo: "베이글 · 과일 샌드 · ★4.1 · ¥1,000–2,000 · 포장 가능 · PayPay · 주오구 가치도키 4-10-5 としの荘 (팀랩 플래닛 근처)" },
      { name: "아임 도넛? 하라주쿠 (I'm donut?) 🍩", place: "I'm donut? Harajuku, 1-14-24 Jingumae, Shibuya City, Tokyo",
        memo: "생도넛 · ★3.8 · ¥1–1,000 · 20:00까지 · 시부야구 진구마에 1-14-24 · 하라주쿠역 근처 (10/10 다케시타 거리 때 들르기 좋음)" },
      { name: "츠지한 니혼바시 본점 (つじ半) 🐟", place: "Tsujihan Nihonbashi, 3-1-15 Nihonbashi, Chuo City, Tokyo 103-0027",
        memo: "해산물 덮밥 (제이타쿠동) · ★4.4 · ¥2,000–3,000 · 💴 현금만 · 예약 불가 (줄 서기) · 주오구 니혼바시 3-1-15 久栄ビル 1F · 도쿄역 근처" },
      { name: "초네 (닌교초) 🍡", url: "https://maps.google.com/?cid=5794026808577077147", memo: "시라타마 오구라 안미츠" },
      { name: "아마잇코 (니시오기쿠보) 🍧", url: "https://maps.google.com/?cid=16955808462236171765", memo: "빙수" },
      { name: "고리야 피스 (기치조지) 🍧", url: "https://maps.google.com/?cid=9771766898175161857", memo: "시오캐러멜 빙수" },
      { name: "사가미야 (아카사카) 🫘", url: "https://maps.google.com/?cid=14582914307384988011", memo: "마메칸 · 포장만 가능" },
      { name: "우메무라 (아사쿠사) 🫘", url: "https://maps.google.com/?cid=4072143533749967631", memo: "마메칸" },
      { name: "이리에 (몬젠나카초) 🫘", url: "https://maps.google.com/?cid=14918058566965092458", memo: "마메칸" },
      { name: "세이주켄 (닌교초) 🥞", url: "https://maps.google.com/?cid=10022352208666162034", memo: "도라야키" },
      { name: "커피 천국 (아사쿠사) 🥞", url: "https://maps.google.com/?cid=6611867868462597657", memo: "핫케이크" },
      { name: "곤도라 (구단시타) 🍰", url: "https://maps.google.com/?cid=2904081546841130358", memo: "파운드케이크" },
      { name: "류드파시 (가쿠게이다이가쿠) 🍫", url: "https://maps.google.com/?cid=4759764989400896555", memo: "에클레어" },
      { name: "에세 두에 (아카사카) 🍮", url: "https://maps.google.com/?cid=16679687002163026740", memo: "푸딩" },
      { name: "미니멀 (도미가야/시부야) 🍫", url: "https://maps.google.com/?cid=14529353184513351834", memo: "초콜릿" },
      { name: "쓰루세 (유시마) 🍡", url: "https://maps.google.com/?cid=10455331451798373841", memo: "마메다이후쿠" },
      { name: "와구리야 (야나카) 🌰", url: "https://maps.google.com/?cid=6611789924566567085", memo: "몽블랑" },
      "스시 (회전초밥)", "라멘", "규카츠", "텐동", "야키토리", "몬자야키",
      "시라스동 (가마쿠라)", "디즈니 추로스 & 팝콘", "편의점 디저트 · 에그샌드", "멜론빵"
    ]
  },

  checklist: [
    "여권", "항공권 e-티켓", "디즈니랜드 티켓 (10/9 날짜 지정) · 공식 앱 설치", "나리타 익스프레스(N'EX) 예약", "Visit Japan Web 등록 (가족 모두 · QR 캡처)", "엔화 / 트래블 카드", "eSIM 또는 포켓와이파이",
    "돼지코 어댑터", "보조배터리", "여행자 보험", "상비약"
  ]
};
