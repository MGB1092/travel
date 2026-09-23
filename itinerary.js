// 여행 일정 데이터 — 이 파일만 수정하면 페이지 내용이 바뀝니다.
// time: "HH:MM", type: move | food | sight | stay | shop | etc
// place 가 있으면 구글 지도 링크가 자동으로 붙습니다.
window.TRIP = {
  title: "도쿄 4박 5일",
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
    // 도쿄 10월 평년값 (일본 기상청 1991–2020 기준, 대략값)
    normal: { max: 22, min: 15, note: "비 오는 날 약 3일에 1번 · 얇은 겉옷 추천" }
  },

  info: [
    { icon: "✈️", label: "가는 편", value: "KE703 · 10/8 08:30 인천 → 10:50 나리타" },
    { icon: "✈️", label: "오는 편", value: "KE704 · 10/12 17:40 나리타 → 20:20 인천" },
    { icon: "🏨", label: "숙소", value: "신주쿠 그레이서리 호텔", place: "Hotel Gracery Shinjuku" },
    { icon: "💴", label: "환율 메모", value: "100엔 ≈ 900원" },
    { icon: "🚨", label: "긴급 연락처", value: "주일 한국대사관 +81-3-3455-2601", tel: "+81334552601" }
  ],

  days: [
    {
      date: "2026-10-08",
      title: "도착 & 신주쿠",
      items: [
        { time: "08:30", type: "move", title: "인천공항 출발", memo: "2시간 전 도착" },
        { time: "10:50", type: "move", title: "나리타 공항 도착", memo: "스카이라이너로 이동" },
        { time: "13:00", type: "stay", title: "호텔 체크인 (짐 맡기기)", place: "Hotel Gracery Shinjuku" },
        { time: "13:30", type: "food", title: "점심 · 후운지 츠케멘", place: "Fuunji Shinjuku" },
        { time: "15:00", type: "sight", title: "신주쿠 교엔", place: "Shinjuku Gyoen", memo: "입장료 500엔" },
        { time: "18:30", type: "sight", title: "도쿄도청 전망대 야경", place: "Tokyo Metropolitan Government Building" },
        { time: "20:00", type: "food", title: "저녁 · 오모이데요코초", place: "Omoide Yokocho" }
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
      title: "쇼핑 & 귀국",
      items: [
        { time: "10:00", type: "stay", title: "체크아웃" },
        { time: "10:30", type: "shop", title: "긴자 쇼핑", place: "Ginza Six" },
        { time: "13:00", type: "food", title: "점심 · 스시", place: "Ginza" },
        { time: "15:00", type: "move", title: "나리타 공항 이동", memo: "넥스 탑승" },
        { time: "17:40", type: "move", title: "나리타 출발" }
      ]
    }
  ],

  checklist: [
    "여권", "항공권 e-티켓", "엔화 / 트래블 카드", "eSIM 또는 포켓와이파이",
    "돼지코 어댑터", "보조배터리", "여행자 보험", "상비약"
  ]
};
