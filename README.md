# 여행 일정 모바일 웹

빌드 없이 동작하는 정적 모바일 웹페이지입니다.

- `itinerary.js` — 여행 제목·날짜·일정·정보·준비물 데이터 (이 파일만 수정하면 됩니다)
- `index.html`, `style.css`, `app.js` — 화면

## 기능
- 출발까지 D-day / 여행 중 N일차 표시
- 일자별 탭 + 타임라인, 오늘 일정은 현재 진행 중인 항목 강조
- 장소별 구글 지도 링크, 긴급 연락처 전화 걸기
- 준비물 체크리스트 (브라우저에 저장)
- 도쿄 날씨: 실시간 예보(Open-Meteo, 약 16일 이내), 그 밖의 날은 10월 평년값
- 엔화 환율: ExchangeRate-API → Frankfurter 순으로 조회, 엔→원 계산기
- 가을 일본 테마(단풍·青海波·후지산/도리이), 다크 모드 지원

## 실행
`index.html`을 브라우저로 열거나, GitHub Pages로 배포하면 휴대폰에서 바로 볼 수 있습니다.

## 준비물 공유 (Firebase Realtime Database)
`itinerary.js`의 `shared.dbUrl`에 Firebase Realtime Database 주소를 넣으면 체크 상태가 접속한 모든 사람에게 실시간 공유됩니다.
비워 두면 각 기기에만 저장됩니다. 권장 보안 규칙:

```json
{
  "rules": {
    "trips": { "$trip": { "checklist": {
      ".read": true, ".write": true,
      "$item": { ".validate": "newData.isBoolean()" }
    } } }
  }
}
```
