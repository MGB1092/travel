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
      memo: "09:00~22:00 (토 야간 개장) · 퍼레이드 11:00 · 14:00 · 19:30 · 자세한 건 위 '공룡엑스포 안내'" },
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
        { time: "09:30", type: "move", title: "출발 → 고성 공룡엑스포", memo: "주차 무료 · 입장권은 현장 QR로 구매 가능" },
        { time: "10:45", type: "sight", title: "공룡엑스포 도착 · 입장", place: "경남고성공룡세계엑스포", memo: "도착 시간은 이동 거리에 따라 · 당일 재입장 가능" },
        { time: "11:00", type: "sight", title: "🦕 공룡 퍼레이드 (1회차)", memo: "놓치면 14:00 회차" },
        { time: "11:30", type: "sight", title: "야외 화석발굴 체험", memo: "올해 새로 생긴 인기 체험 · 줄이 길어요" },
        { time: "12:30", type: "food", title: "점심 · 엑스포장" },
        { time: "13:30", type: "sight", title: "공룡 먹이주기 · 코스튬 · 주제관", memo: "주제관: 움직이는 공룡 · 4D · XR" },
        { time: "14:00", type: "sight", title: "🦕 공룡 퍼레이드 (2회차)" },
        { time: "15:00", type: "sight", title: "발자국화석관(5D) · 공룡놀이마을 · 바닥 미술 놀이터", memo: "공룡 라이브 쇼 · 서커스는 현장 시간표 확인" },
        { time: "18:00", type: "food", title: "저녁" },
        { time: "19:30", type: "sight", title: "(선택) 야간 퍼레이드 · 불꽃쇼 · 빛의 정원", memo: "토요일 야간 개장 · 불꽃쇼 시간은 현장 확인 · 22:00 폐장" },
        { time: "20:30", type: "move", title: "고성 → 진주", memo: "시간은 내비로 확인 · 야간 프로그램 안 보면 더 일찍 출발" },
        { time: "21:30", type: "stay", title: "진주 뉴그랜드호텔 체크인", place: "진주 뉴그랜드호텔", memo: "체크인 15:00부터라 늦게 가도 OK" }
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

  // 정보 탭 "공룡엑스포 안내" (goseong-jinju.html 에서 그림) · 검색으로 확인한 내용이라 현장 시간표가 우선
  expo: {
    title: "🦕 공룡엑스포 안내 · 10/24(토)",
    note: "2026 경남고성공룡세계엑스포 · 9/22~11/1 · 당항포관광지 (고성군 회화면) · 공연 시간은 바뀔 수 있으니 현장·공식 누리집 확인",
    schedule: [
      ["09:00", "개장", "토요일 야간 개장"],
      ["11:00", "🦕 공룡 퍼레이드 1회차", "매일"],
      ["14:00", "🦕 공룡 퍼레이드 2회차", "매일"],
      ["종일", "라이브 쇼 · 서커스 · 주제관 · 화석발굴", "회차 시간 현장 확인"],
      ["저녁", "✨ 빛의 정원", "야간 개장 시"],
      ["19:30", "🌙 야간 공룡 퍼레이드", "야간 개장일"],
      ["?", "🎆 불꽃쇼", "매주 토요일 · 시간 현장 확인"],
      ["21:00", "발권 · 입장 마감", ""],
      ["22:00", "폐장", ""]
    ],
    programs: [
      { icon: "⛏️", name: "대형 야외 화석발굴 체험장", memo: "🆕 붓으로 흙을 털어 공룡 뼈 찾기 · 인기 많아 줄이 길어요" },
      { icon: "🎨", name: "바닥 미술 놀이터", memo: "🆕 해안도로를 도화지 삼아 그림 그리기" },
      { icon: "🧩", name: "다이노 퍼즐", memo: "🆕" },
      { icon: "🦖", name: "공룡 먹이주기", memo: "올해 공룡 수 두 배 · 대기 짧아짐" },
      { icon: "🦕", name: "공룡 코스튬", memo: "공룡으로 변신하기" },
      { icon: "🏛️", name: "엑스포 주제관", memo: "움직이는 공룡 · 4D 영상 · XR" },
      { icon: "👣", name: "한반도공룡발자국화석관 (5D)", memo: "상설" },
      { icon: "🏡", name: "공룡놀이마을", memo: "상설" },
      { icon: "🎪", name: "공룡 라이브 쇼 · 라이브가든 · 서커스", memo: "시간은 현장 확인" }
    ],
    tips: [
      "입장료: 성인 19,000원 · 소인(36개월~18세) 13,000원 · 36개월 미만 무료 (증빙 필요)",
      "주차 무료 · 현장 QR로 입장권 구매 · 당일 재입장 가능",
      "입장권 3만 원 이상 구매 시 고성사랑상품권 혜택",
      "반입 금지: 킥보드 · 화기류 · 텐트 · 반려동물"
    ],
    tel: "0556707400",
    telLabel: "055-670-7400",
    link: { label: "공식 누리집 열기", url: "https://www.gngsctf.or.kr/dinoexpo/index.goseong" }
  },

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
    // 고성 / 진주로 나눠 보기 (검색으로 찾은 곳이라 가기 전에 영업 여부 확인)
    groups: [
      { key: "goseong", title: "🦕 고성 · 당항포 근처", short: "🦕 고성" },
      { key: "jinju", title: "🏯 진주", short: "🏯 진주" }
    ],
    items: [
      { group: "goseong", name: "엑스포장 안 먹거리 🦕", memo: "행사장 안 식당·매점 · 공룡빵 · 디노카페" },
      { group: "goseong", name: "당항포그린횟집 🐟", place: "당항포그린횟집, 경남 고성군 회화면 당항만로 967",
        memo: "고성군 모범음식점 · 회덮밥 · 매운탕 · 바다 전망 · 엑스포장 근처 · ☎ 055-673-2456" },
      { group: "goseong", name: "둘리왕새우 🦐", place: "둘리왕새우 경남 고성군 회화면",
        memo: "대하구이 · 당항포관광지 근처 · 다이닝코드 ★4.6" },
      { group: "goseong", name: "바다횟집 🌊", place: "바다횟집, 경남 고성군 회화면 당항만로 1037",
        memo: "물회 · 바다 전망 · 회화면 당항만로 1037" },
      { group: "goseong", name: "통영짬뽕 🍜", place: "통영짬뽕 경남 고성군 회화면 당항리",
        memo: "짬뽕 · 회화면 당항리 · 다이닝코드 ★4.3" },
      { group: "jinju", name: "하연옥 (진주냉면 · 육전) 🍜", place: "하연옥 본점, 경남 진주시 진주대로 1317-20",
        memo: "육전 올린 진주냉면으로 유명 · 80년 전통 · 대기 있을 수 있음" },
      { group: "jinju", name: "황포냉면 🍜", place: "황포냉면 진주", memo: "현지인 입소문 진주냉면 · 양 푸짐" },
      { group: "jinju", name: "진주냉면 산홍 본점 🍜", place: "진주냉면 산홍 본점", memo: "진주 교방음식 연구가가 운영 · 밑반찬 푸짐" },
      { group: "jinju", name: "천황식당 (진주비빔밥) 🍚", place: "천황식당 진주", memo: "육회비빔밥 · 냉면 · 평일에도 대기 있음" },
      { group: "jinju", name: "제일식당 (진주비빔밥 · 해장국) 🍲", place: "제일식당 진주중앙시장", memo: "진주중앙시장 안 · 육회비빔밥 · 선지국밥" }
    ]
  },

  checklist: [
    "신분증", "공룡엑스포 입장권", "숙소 예약 확인", "결혼식 옷 · 축의금", "충전기 · 보조배터리", "편한 신발 (엑스포)", "얇은 겉옷", "상비약", "물티슈"
  ]
};
