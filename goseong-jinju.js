// 고성 · 진주 1박2일 여행 데이터 — 이 파일만 수정하면 goseong-jinju.html 내용이 바뀝니다.
// (화면은 도쿄 여행과 같은 app.js · style.css 를 함께 씁니다)
// time: "HH:MM", type: flight | move | food | sight | stay | shop | etc
// place 가 있으면 구글 지도 링크가 자동으로 붙습니다.
window.TRIP = {
  title: "가을이네 고성 · 진주 1박2일 여행",
  subtitle: "공룡엑스포 가는 고성, 남강 따라 진주",
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
    { icon: "🦕", label: "공룡엑스포 · 10/24(토)", value: "경남고성공룡세계엑스포", place: "경남고성공룡세계엑스포",
      memo: "오전부터 저녁까지 · 입장권·공연 시간 미리 확인" },
    { icon: "🏨", label: "숙소 · 10/24(토) 1박", value: "진주 뉴그랜드호텔", place: "진주 뉴그랜드호텔",
      memo: "체크인 15:00부터 · 체크아웃 11:00까지" },
    { icon: "💐", label: "결혼식 · 10/25(일) 11:00", value: "진주 동방호텔 3층", place: "진주 동방호텔",
      memo: "호텔 체크아웃 후 바로 이동" },
    { icon: "🚨", label: "긴급 연락처", value: "119 (화재·구급) · 112 (경찰)", tel: "119" }
  ],

  days: [
    {
      date: "2026-10-24",
      title: "고성 공룡엑스포 🦕",
      items: [
        { time: "09:30", type: "move", title: "출발 → 고성 공룡엑스포" },
        { time: "11:00", type: "sight", title: "공룡엑스포 관람", place: "경남고성공룡세계엑스포", memo: "도착 시간은 이동 거리에 따라 · 공연·체험 시간표 확인" },
        { time: "12:30", type: "food", title: "점심 · 엑스포장" },
        { time: "14:00", type: "sight", title: "공룡엑스포 계속 · 공연 · 체험", memo: "가을이 사진 많이 찍기 📸" },
        { time: "18:00", type: "food", title: "엑스포 마무리 · 저녁" },
        { time: "19:00", type: "move", title: "고성 → 진주", memo: "시간은 내비로 확인" },
        { time: "20:00", type: "stay", title: "진주 뉴그랜드호텔 체크인", place: "진주 뉴그랜드호텔", memo: "체크인 15:00부터라 늦게 가도 OK" }
      ]
    },
    {
      date: "2026-10-25",
      title: "진주 · 결혼식 참석 💐",
      items: [
        { time: "08:30", type: "food", title: "아침" },
        { time: "10:15", type: "stay", title: "호텔 체크아웃", place: "진주 뉴그랜드호텔", memo: "체크아웃 11:00까지 · 결혼식 가기 전에 짐 챙겨 나오기" },
        { time: "10:30", type: "move", title: "동방호텔로 이동", place: "진주 동방호텔" },
        { time: "11:00", type: "etc", title: "결혼식 참석 · 동방호텔 3층", place: "진주 동방호텔" },
        { time: "12:00", type: "food", title: "피로연 식사" },
        { time: "14:00", type: "sight", title: "(여유 있으면) 진주성 · 촉석루 · 남강 산책", place: "진주성" },
        { time: "16:00", type: "move", title: "집으로" }
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
    "신분증", "공룡엑스포 입장권", "숙소 예약 확인", "결혼식 옷 · 축의금", "충전기 · 보조배터리", "편한 신발 (엑스포)", "얇은 겉옷", "상비약", "물티슈"
  ]
};
