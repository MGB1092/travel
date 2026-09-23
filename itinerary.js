// 여행 일정 데이터 — 이 파일만 수정하면 페이지 내용이 바뀝니다.
// time: "HH:MM", type: flight | move | food | sight | stay | shop | etc
// place 가 있으면 구글 지도 링크가 자동으로 붙습니다.
window.TRIP = {
  title: "가을이네 가족 도쿄 4박5일 여행",
  subtitle: "가을 도쿄 산책 여행",
  startDate: "2026-10-08",
  endDate: "2026-10-12",
  members: ["나", "친구"],

  // 날씨: 예보(약 16일 이내)가 있으면 실시간 예보, 없으면 평년 기후값을 보여줍니다.
  weather: {
    city: "도쿄",
    lat: 35.6895,
    lon: 139.6917,
    timezone: "Asia/Tokyo",
    link: { label: "AccuWeather에서 자세히 보기", url: "https://www.accuweather.com/ko/jp/tokyo/226396/daily-weather-forecast/226396" },
    // 도쿄 10월 평년값 (일본 기상청 1991–2020 기준, 대략값)
    normal: { max: 22, min: 15, note: "비 오는 날 약 3일에 1번 · 얇은 겉옷 추천" }
  },

  // 환율: 실시간(무료 API, 하루 1회 이상 갱신) 조회 실패 시 fallback 사용 (1엔당 원)
  exchange: {
    from: "JPY", to: "KRW", fallback: 9.0,
    link: { label: "네이버 실시간 환율 보기", url: "https://search.naver.com/search.naver?query=%EC%97%94%ED%99%94+%ED%99%98%EC%9C%A8" }
  },

  info: [
    { icon: "🛫", label: "가는 편 · 10/8(목)", value: "RF322 · 09:30 청주(CJJ) → 11:50 나리타(NRT) T3", memo: "에어로케이항공 · 일반석 · A320 · 기내식 불포함" },
    { icon: "🛬", label: "오는 편 · 10/12(월)", value: "RF321 · 13:05 나리타(NRT) T3 → 15:30 청주(CJJ)", memo: "에어로케이항공 · 일반석 · A320 · 기내식 불포함 · 시간은 현지 기준" },
    { icon: "🏨", label: "숙소", value: "신주쿠 그레이서리 호텔", place: "Hotel Gracery Shinjuku" },
    { icon: "🚨", label: "긴급 연락처", value: "주일 한국대사관 +81-3-3455-2601", tel: "+81334552601" }
  ],

  days: [
    {
      date: "2026-10-08",
      title: "도착 & 신주쿠",
      items: [
        { time: "07:30", type: "move", title: "청주국제공항 도착", place: "Cheongju International Airport", memo: "출발 2시간 전 · 기내식 없으니 간단히 요기" },
        { time: "09:30", type: "flight", title: "RF322 청주 출발", memo: "에어로케이항공 · A320" },
        { time: "11:50", type: "flight", title: "나리타 T3 도착", place: "Narita Airport Terminal 3", memo: "입국심사 후 제2터미널역까지 도보 약 15분" },
        { time: "13:30", type: "move", title: "스카이라이너 → 신주쿠", memo: "닛포리 환승 · 약 1시간 30분" },
        { time: "15:00", type: "stay", title: "호텔 체크인", place: "Hotel Gracery Shinjuku" },
        { time: "15:30", type: "food", title: "늦은 점심 · 후운지 츠케멘", place: "Fuunji Shinjuku" },
        { time: "17:00", type: "sight", title: "도쿄도청 전망대 (노을 & 야경)", place: "Tokyo Metropolitan Government Building", memo: "무료" },
        { time: "19:00", type: "food", title: "저녁 · 오모이데요코초", place: "Omoide Yokocho" }
      ]
    },
    {
      date: "2026-10-09",
      title: "아사쿠사 & 스카이트리",
      items: [
        { time: "09:30", type: "sight", title: "센소지", place: "Senso-ji" },
        { time: "11:00", type: "shop", title: "나카미세 거리 간식", place: "Nakamise Shopping Street" },
        { time: "12:30", type: "food", title: "점심 · 텐동", place: "Tendon Masaru Asakusa" },
        { time: "14:30", type: "sight", title: "스카이트리 전망대", place: "Tokyo Skytree", memo: "온라인 예매 완료" },
        { time: "19:00", type: "food", title: "저녁 · 몬자야키", place: "Tsukishima Monja Street" }
      ]
    },
    {
      date: "2026-10-10",
      title: "시부야 & 하라주쿠",
      items: [
        { time: "10:00", type: "sight", title: "메이지 신궁", place: "Meiji Jingu" },
        { time: "11:30", type: "shop", title: "다케시타 거리", place: "Takeshita Street" },
        { time: "13:00", type: "food", title: "점심 · 오모테산도 카페", place: "Omotesando" },
        { time: "16:00", type: "sight", title: "시부야 스카이", place: "Shibuya Sky", memo: "일몰 시간대 예약" },
        { time: "19:00", type: "food", title: "저녁 · 야키토리", place: "Nonbei Yokocho Shibuya" }
      ]
    },
    {
      date: "2026-10-11",
      title: "가마쿠라 당일치기",
      items: [
        { time: "09:00", type: "move", title: "신주쿠 → 가마쿠라", memo: "JR 쇼난신주쿠 라인 약 1시간" },
        { time: "10:30", type: "sight", title: "쓰루가오카 하치만구", place: "Tsurugaoka Hachimangu" },
        { time: "12:00", type: "food", title: "점심 · 시라스동", place: "Komachi-dori Kamakura" },
        { time: "13:30", type: "sight", title: "가마쿠라 대불", place: "Kotoku-in" },
        { time: "15:30", type: "sight", title: "에노덴 타고 가마쿠라코코마에 바다", place: "Kamakurakokomae Station" },
        { time: "19:30", type: "food", title: "저녁 · 신주쿠 이자카야", place: "Shinjuku" }
      ]
    },
    {
      date: "2026-10-12",
      title: "귀국",
      items: [
        { time: "08:00", type: "food", title: "아침 · 호텔 근처 편의점/카페" },
        { time: "09:00", type: "stay", title: "체크아웃 후 공항으로", memo: "신주쿠 → 나리타 약 1시간 30분" },
        { time: "11:00", type: "move", title: "나리타 T3 도착 · 탑승 수속", place: "Narita Airport Terminal 3", memo: "기내식 없으니 공항 푸드코트에서 점심" },
        { time: "13:05", type: "flight", title: "RF321 나리타 출발", memo: "에어로케이항공 · A320" },
        { time: "15:30", type: "flight", title: "청주국제공항 도착", memo: "한국 시간" }
      ]
    }
  ],

  checklist: [
    "여권", "항공권 e-티켓", "엔화 / 트래블 카드", "eSIM 또는 포켓와이파이",
    "돼지코 어댑터", "보조배터리", "여행자 보험", "상비약"
  ]
};
