// 고성 · 진주 1박2일 여행 데이터 — 이 파일만 수정하면 goseong-jinju.html 내용이 바뀝니다.
// (화면은 도쿄 여행과 같은 app.js · style.css 를 함께 씁니다)
// time: "HH:MM", type: flight | move | food | sight | stay | shop | etc
// place 가 있으면 구글 지도 링크가 자동으로 붙습니다.
window.TRIP = {
  title: "가을이네 고성 · 진주 1박2일 여행",
  subtitle: "공룡 발자국 따라 고성, 남강 따라 진주",
  startDate: "2026-10-24",
  endDate: "2026-10-25",

  // 날씨: 예보(약 16일 이내)가 있으면 실시간 예보, 없으면 평년 기후값을 보여줍니다.
  weather: {
    city: "진주",
    lat: 35.1800,
    lon: 128.1076,
    timezone: "Asia/Seoul",
    normal: { max: 21, min: 9, note: "일교차가 크니 겉옷 챙기기" }
  },

  info: [
    { icon: "🚗", label: "이동", value: "고성 → 진주", memo: "출발지·이동수단 정해지면 수정" },
    { icon: "🏨", label: "숙소 · 10/24(토) 1박", value: "미정", memo: "예약하면 이름·주소·체크인 시간 넣기" },
    { icon: "🚨", label: "긴급 연락처", value: "119 (화재·구급) · 112 (경찰)", tel: "119" }
  ],

  days: [
    {
      date: "2026-10-24",
      title: "고성 · 공룡 나라 🦕",
      items: [
        { time: "08:00", type: "move", title: "출발 → 고성", memo: "출발 시간·경로는 정해지면 수정" },
        { time: "11:30", type: "sight", title: "고성공룡박물관", place: "고성공룡박물관", memo: "상족암군립공원 안 · 관람 시간·휴관일 확인" },
        { time: "12:30", type: "food", title: "점심" },
        { time: "14:00", type: "sight", title: "상족암 해안 산책 · 공룡 발자국 화석", place: "상족암군립공원", memo: "썰물 때 해안 동굴·발자국 보기 좋아요 · 물때 확인" },
        { time: "17:00", type: "stay", title: "숙소 체크인", memo: "숙소 정해지면 장소 넣기" },
        { time: "18:30", type: "food", title: "저녁" }
      ]
    },
    {
      date: "2026-10-25",
      title: "진주 · 진주성과 남강 🏯",
      items: [
        { time: "09:00", type: "stay", title: "체크아웃 · 진주로 이동" },
        { time: "10:30", type: "sight", title: "진주성 · 촉석루", place: "진주성", memo: "남강 바라보며 성곽 산책" },
        { time: "11:30", type: "sight", title: "국립진주박물관", place: "국립진주박물관", memo: "진주성 안" },
        { time: "12:30", type: "food", title: "점심 · 진주냉면", place: "하연옥 본점 진주", memo: "육전 곁들이기" },
        { time: "14:00", type: "sight", title: "남강 산책", place: "진주 남강" },
        { time: "15:30", type: "move", title: "집으로" }
      ]
    }
  ],

  // 준비물 공유 저장소 (도쿄 여행과 같은 Firebase, 경로만 다름)
  shared: {
    dbUrl: "https://gaeul-tokyo-default-rtdb.asia-southeast1.firebasedatabase.app",
    path: "trips/gaeul-goseong-jinju-2026/checklist"
  },

  // 정보 탭 맨 위 "여행 총평" · 사람별 한 줄
  summary: {
    title: "📝 여행 총평",
    path: "trips/gaeul-goseong-jinju-2026-summary/reviews",
    people: ["성민", "가을", "지숙"]
  },

  // 먹어 볼 음식 목록 · 가족 공유
  food: {
    path: "trips/gaeul-goseong-jinju-2026-food/checklist",
    reviewsPath: "trips/gaeul-goseong-jinju-2026-food/reviews",
    reviewers: ["지숙", "성민"],
    items: [
      { name: "하연옥 (진주냉면 · 육전) 🍜", place: "하연옥 본점 진주", memo: "해물 육수 진주냉면 · 육전" },
      { name: "천황식당 (진주비빔밥) 🍚", place: "천황식당 진주", memo: "오래된 진주비빔밥집" },
      { name: "제일식당 (진주비빔밥 · 해장국) 🍲", place: "제일식당 진주중앙시장", memo: "진주중앙시장 안" }
    ]
  },

  checklist: [
    "신분증", "숙소 예약 확인", "충전기 · 보조배터리", "편한 신발 (상족암 바위길)", "얇은 겉옷", "상비약", "물티슈"
  ]
};
